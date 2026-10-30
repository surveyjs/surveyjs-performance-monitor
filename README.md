# surveyjs-performance-monitor

The nightly performance server of survey-library. Every night a Docker container on the perf server builds
survey-library's `master`, runs its performance suites (survey-core alone in Node, React 19 and survey-js-ui in headless
Chromium), compares them with a reference, posts the result to Discord and bisects a new regression to its PR.

The suites (fixtures, scenarios, the runners) live in survey-library under `perf/`. This repository runs and judges
them through survey-library's runner contract (`perf/CONTRACT.md` there): `node perf/manifest.ts` names the suites,
their ids, budgets and commands, and every suite run writes one result file.

## Layout

| path | what |
|---|---|
| `src/nightly.ts` | the container side of a run: installs, builds, suites, compare, reruns, Discord payloads, state, bisect |
| `src/judge/` | baseline, the reference ratchet, compare, `known.json`, the bisect step rule |
| `src/library/` | survey-library's runner contract: the manifest and the result file |
| `src/plan.ts`, `bisect.ts`, `discord.ts`, `gate.ts`, `install-key.ts`, `pr.ts` | the night's plan, the bisect search, the messages, the load gate, install keys, PR numbers |
| `bin/run.sh`, `bin/host-lib.sh` | the host side: lock, git mirror, image, prepare, gate, container, load sampler, posting; the host's checks of what a container wrote |
| `docker/`, `systemd/` | the image and the timer |
| `test/` | unit tests; `host.test.sh` for the host's checks; `test/testdata/` holds a real manifest and a real core result file of survey-library |

## Development

```bash
npm install
npm test                                   # unit tests
npm run lint && npm run typecheck
SURVEY_LIBRARY_DIR=../survey-library npm test   # also checks that checkout's manifest
bash test/host.test.sh                          # the host's checks (Linux)
```

The code is TypeScript that Node 22.18+ runs directly (type stripping): no build, no runtime dependency.

## Running locally

Build survey-library first: in `packages/survey-core` `npm run build && npm run build:i18n && npm run build:icons &&
npm run build:linter`, then `npm run build` in `packages/survey-react-ui` and `packages/survey-js-ui`.

* `PERF_STATE_DIR=<tmp> node src/nightly.ts --runner <survey-library> --dry-post --suites core,react` runs a whole
  night locally against `origin/master` of that checkout in `<tmp>/work/target`, and prints the Discord payloads
  instead of posting them.
* `npm run baseline -- <suite> <result.json>...` and `npm run compare -- <result.json>` build a local baseline from
  result files of survey-library's `npm run perf` / `npm run perf:ci` and judge a run. `PERF_STATE_DIR` sets where
  baselines live (default `results/state` in this checkout).

## The server

### Host prerequisites

bash, util-linux `flock`, coreutils `timeout`, curl 7.76 or newer, git, Docker (the user that runs the tests is in the
`docker` group) on cgroup v2. Check `docker info -f '{{.CgroupDriver}} {{.CgroupVersion}}'`: `systemd 2` or
`cgroupfs 2`. Node is not needed on the host.

### Bootstrap

Three folders, kept apart (`run.sh` refuses one inside another):

| folder | owner | what | in the containers |
|---|---|---|---|
| `/opt/surveyjs-performance-monitor` | root | this repository at a release tag; `run.sh` runs from here | read-only |
| `/var/lib/surveyjs-performance-monitor-host` (`PERF_HOST_DIR`) | perf | the host's own files: a bare git mirror of survey-library, `run.lock`, `running.json`, `runs/<run>/` (`nightly.log`, `load.jsonl`, `gate.json`, `prepare.log`, `outbox/`, `posted-*`) | the mirror and the run's own folder, read-only |
| `/srv/surveyjs-performance-monitor` (`PERF_STATE_DIR`) | perf | the containers' working folder: their clone of survey-library, `work/`, `baselines/`, `history/`, `known.json`, ... | read-write |

```bash
sudo git clone https://github.com/surveyjs/surveyjs-performance-monitor /opt/surveyjs-performance-monitor
sudo git -C /opt/surveyjs-performance-monitor checkout <tag>
H=/var/lib/surveyjs-performance-monitor-host
S=/srv/surveyjs-performance-monitor
sudo install -d -m 700 -o perf -g perf $H $S
sudo -u perf git clone --quiet --bare https://github.com/surveyjs/survey-library $H/mirror.git
sudo -u perf git --git-dir=$H/mirror.git config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
sudo -u perf git --git-dir=$H/mirror.git fetch --prune origin
sudo install -D -m 600 -o perf -g perf /dev/null /etc/surveyjs-perf/perf.env   # then fill it, see below
```

The env file (`PERF_ENV_FILE`, default `/etc/surveyjs-perf/perf.env`) holds plain `KEY=value` lines, no quotes; `run.sh`
parses it line by line:

```
PERF_DISCORD_WEBHOOK=https://discord.com/api/webhooks/<id>/<token>
PERF_DISCORD_ROLE_ID=<role to mention on a new regression>
PERF_CPUS=4-7,12-15
PERF_MEMORY=12g
PERF_MAX_BUSY_CORES=1.0
PERF_MAX_OTHER_CORES=1.0
PERF_GATE_MAX_MIN=60
PERF_KEEP_DAYS=90
```

The env file stays **outside** the state directory, and `run.sh` refuses an env file inside it. The webhook is never
passed to a container, and curl reads it from a process substitution, so it is not in `ps` either.

### The host and the containers

The containers run survey-library's code (`master`, or any branch given with `--ref`) and its npm dependencies with their
install scripts, and they write the whole state directory. Whatever is there can be a link, a rewritten git config or a
file that changes while the host reads it. So the host:

* runs git only in its own mirror (`git --git-dir=$PERF_HOST_DIR/mirror.git`: fetch, rev-parse, `show <sha>:package.json`),
  never in the state directory; the prepare container fetches the state directory's clone from the mirror, read-only;
* runs no program from the state directory: `nightly.ts`, `gate.ts` and the Dockerfile come from this checkout;
* writes nothing there: its lock, its logs, the load samples and the gate result go to its own run folder, which the
  night container sees read-only;
* reads from there only whether a few files exist, and a ready Discord message, which it first copies to
  `runs/<run>/outbox/<n>` taking regular files with plain names only (`bin/host-lib.sh`; a link, a linked folder on the
  way, or a `files.txt` naming anything else is refused and posted as such). curl reads only that copy.

`test/host.test.sh` checks these rules against links and odd names (Linux: `bash test/host.test.sh`).

### Keeping other work off `PERF_CPUS`

The container runs in its own `perf.slice`. Move everything else off the perf cores:

```bash
systemctl set-property system.slice AllowedCPUs=0-3,8-11
systemctl set-property user.slice AllowedCPUs=0-3,8-11
systemctl set-property machine.slice AllowedCPUs=0-3,8-11   # only if VMs run on the box
```

Pin whole physical cores, both SMT siblings (`lscpu -e` shows them). Set the `performance` governor if the host
allows it (`cpupower frequency-set -g performance`). A night still checks the load: before it starts, the gate waits
until the host is below `PERF_MAX_BUSY_CORES` for 5 minutes (60 at most), and a suite with other work on the pinned
cores (0.25 core in its busiest minute) or elsewhere (`PERF_MAX_OTHER_CORES`) is `noisy`: counters are judged, times
are not.

### The timer

```bash
sudo cp /opt/surveyjs-performance-monitor/systemd/perf-nightly.* /etc/systemd/system/
sudoedit /etc/systemd/system/perf-nightly.service   # User=, Group=, PERF_STATE_DIR and PERF_HOST_DIR
sudo systemctl daemon-reload && sudo systemctl enable --now perf-nightly.timer
systemctl list-timers perf-nightly.timer            # the next run
```

`OnCalendar=*-*-* 03:00:00 Europe/Berlin`, `Persistent=false`: a missed night is skipped. A run stopped by a signal
(`systemctl stop`, a clean reboot, `TimeoutStartSec`) posts "stopped by a signal"; one killed outright (power loss,
SIGKILL) leaves `running.json`, and the next run posts "did not finish". A host that was off at 03:00 posts nothing, so
a missing morning message means the host did not run. Without systemd, use cron: `CRON_TZ=Europe/Berlin` and
`0 3 * * *` where cron supports it; otherwise `0 1,2 * * *` UTC with a wrapper that runs `run.sh --nightly` only when
`TZ=Europe/Berlin date +%H` is `03`.

### The first etalon

Once the server is set up: `run.sh --record` (5 interleaved rounds of the three suites: about 1.5 hours at the
steady-state suite times; the limit is 175 minutes). Each suite's baseline is written as soon as its 5 rounds are in;
scenarios with fewer than 4 clean runs are recorded again, at most twice, and only while the extra rounds fit in the
limit. A noisy run is left out, and a record does not start when the gate gave up. Check the spread and the `unstable`
list in its post. Until a baseline exists, a night posts its results without time verdicts.

### Renewing the baseline

`run.sh --record`, or `run.sh --record --only <ids>` for some scenarios. Say why in the channel. A new image (a new
`@playwright/test` in survey-library, or a new Dockerfile here) is a new machine key: once a baseline exists, the next
nightly records the suites by itself (at most twice; after that the post asks for a `--record` by hand).

### On demand

Run them as the owner of the two folders, with the service's folders (the env file is readable only by that user, and
`run.lock` belongs to it):

```bash
R="sudo -u perf PERF_STATE_DIR=/srv/surveyjs-performance-monitor PERF_HOST_DIR=/var/lib/surveyjs-performance-monitor-host /opt/surveyjs-performance-monitor/bin/run.sh"
$R --ref feature/x --label "PR #12345"          # a branch against master's reference
$R --ref feature/x --only records-10k/records/next@orders
$R --bisect v3.2.2..master --only <id>          # search by hand; refs are origin/<ref> first, then tags and shas
$R --dry-post --no-gate                          # build the messages, post nothing
$R --reinstall                                   # reinstall every node_modules folder of the run
```

The options are checked before the gate: a wrong suite or id is posted at once as "not started".

### Updating the server

Read the diff, then `sudo git -C /opt/surveyjs-performance-monitor fetch && sudo git -C /opt/surveyjs-performance-monitor
checkout <tag>`. The tests themselves come from survey-library's `master`, which the prepare step checks out into
`work/tool` before every run.

### What a night does

1. `run.sh` (host): takes `run.lock`, posts a stuck or unfinished previous run, fetches the mirror, builds the image if
   needed (Playwright's version from survey-library's `package.json` on `master`), then:
   * the prepare container: the state directory's clone fetches from the mirror, `work/tool` moves to `master`, and
     `nightly.ts` checks the options against the tool's manifest;
   * the gate; the night container with the load sampler beside it;
   * posts `history/<run>/discord/1-result` and `2-bisect` through its outbox. A crash, a timeout or an out-of-memory
     kill is posted with the last 50 log lines attached.
2. `src/nightly.ts` (container): reads the tool's manifest, installs only when a folder's dependency fields change
   (`install-key.ts`), builds the target, runs the suites one after another, compares them with the reference, reruns
   the suspects twice at the end, writes `known.json`, the ratchet and `last-nightly.json`, and bisects new
   regressions (at most 2 and 40 minutes a night).

The state directory: `repo/`, `work/{tool,target,bisect,builds}`, `baselines/`, `history/`, `known.json`,
`last-nightly.json`, `record-pending.json`, `deps-last.json`, `npm-cache/`, `home/`. History older than
`PERF_KEEP_DAYS` is pruned, in the state directory by the container and in `PERF_HOST_DIR/runs` by `run.sh`.
