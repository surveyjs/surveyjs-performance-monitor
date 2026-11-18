# surveyjs-performance-monitor

The nightly performance report of survey-library, run on GitHub Actions (`.github/workflows/night.yml`, code in
`src/gh/`).

## What the night does

Every night it builds four versions of the project: today (midnight UTC of the run's day), yesterday, a week ago and a
month ago. It measures them with the performance suites of the project's current `master` (the runner contract,
`perf/CONTRACT.md` there; only `contract === 2` and `resultSchema === 2` are accepted) and posts one report to Discord:
for each scenario, how much today's build changed against the three older ones.

- Jobs: `plan` decides the builds and the measuring jobs; `build-today` and `build-older` build the commits; `tool`
  prepares the runner; `measure` runs one job per scenario, each on its own worker; `report` writes the one Discord
  message; `post` sends it; `history` keeps the report files.
- One worker per scenario: today and each older build are measured on that one worker, so every compared pair shares
  one machine.
- 5 interleaved repeats, in the order A B B A A B B A A B (A is today, B the older build).
- The highlight rule: delta = today / build − 1 (plus: today is slower). A cell is highlighted when the delta over all
  samples is over 25% and its absolute difference is over `minDelta` (2 ms for `core`, 8 ms for the browser suites),
  and every repeat agrees: each one is over the same threshold in the same direction. A cell that is not confirmed by
  every repeat is not highlighted. A scenario the runner marks `counterOnly` (too short or not repeatable to judge by
  time) shows its time without a highlight; its work counters decide instead (slower when one grew over 2% and over 1,
  faster when they only fell).

The `post` job runs no library code, and the webhook secret is only in its send step.

## Setup

1. Settings → Secrets and variables → Actions → repository secret `PERF_DISCORD_WEBHOOK`: the webhook of the channel.
2. Settings → Actions → General → Workflow permissions: "Read and write" (the `history` job pushes a branch).
3. Repository variable `PERF_SCHEDULE` = `on` starts the schedule (01:00 UTC). A run by hand works regardless.

## Running by hand

Actions → night → Run workflow, or:

```bash
gh workflow run night.yml
gh workflow run night.yml -f dry-post=true
```

A run by hand is a whole night, every suite and every scenario. Its only input, `dry-post`, builds the message and
prints it instead of posting it.

## What the report has

One Discord message per run. Its first line is `📊 nightly`, `🔺 nightly` (something got slower against yesterday) or
`⚠️ nightly` (a build or suite failed, a scenario failed on today, or something is incomplete or not run), then notes:
`cancelled: N scenarios not measured`, `not run (worker failed): <suite> <id> <job url>, ...` and `run: <url>`, and a `deps vs yesterday: ...` line when the dependencies changed.
Embeds: the builds (four commits with links and dates), the commits since yesterday (PR numbers and titles), and one
embed per suite only when something is highlighted against yesterday or a column failed.

Attachments, in this order:

1. `overview.png`: a table `SUITE | 1D | 7D | 30D`, a row per suite. A cell shows `N slower`, `N faster`, `N n/a` (only
   the non-zero ones), `—` when nothing changed, or for a build without a result `= today`, `build failed`,
   `suite failed`, `incomplete N`, `not run`; then `· N ⚑` when present. The suite's name gets `· N failed` when
   scenarios failed on today's build. Every cell stays on one line: a quiet night is 728 px wide, a busy one grows
   wider instead of wrapping. If Chromium gives no PNG, the same summary goes into the message as text.
2. `<suite>.md` for each suite: a table of scenarios (today's time in ms; for the other builds only the delta;
   `🔴 **+31%**` for a highlighted slowdown, `🟢 **−55%**` for a speedup, `n/a¹` with a footnote, `ʳ` when every repeat
   agrees), then the sections for scenarios that failed on today, `jsonErrors` that differ, the repeats of each
   highlighted or unconfirmed cell, the differences of the work counters, the log tails of failed columns, and the last line
   `Δ = today / build − 1.`
3. `results.tar.gz`: all raw result files of the night.
4. The logs of failed builds and suites, up to Discord's 10 files.

Marks:

- `n/a`: the runner skipped the scenario (`not in this build: <api>`), it failed or hung (`timeout 300 s`), or the build
  has no UI package for that suite.
- `ᶜ`: a counter-only scenario, judged by its work counters (`🔴 **work**`, `🟢 **work**`).
- `ʳ`: every repeat agrees with the highlighted delta.
- `⚑`: the build does not know part of the test's JSON (jsonErrors) and measured less work than today.

## History and artifacts

The `history` job commits each run's files to the orphan `history` branch:

```
<project>/<run id>/
  overview.png  <suite>.md  payload.json  cells.json
```

The run's workflow artifacts (reports, `cells.json`, build records, measuring results, logs) are kept for 90 days.

## When a post fails

Open the failed `post` job and re-run that job. "Re-run failed jobs" re-runs every failed job and the jobs that depend
on them, so when only `post` failed it re-runs only `post`, but when a measuring job failed too it re-runs that as well.

## Development

```bash
npm install
npm test                       # unit tests (vitest)
npm run lint && npm run typecheck
```

The code is TypeScript that Node runs directly (type stripping): no build step, no runtime dependency. The night pins
Node 24.15.0; local development needs Node 24 (`package.json` allows 22.18 and later). CI
(`.github/workflows/ci.yml`) runs actionlint, lint, typecheck and the unit tests. `test/testdata/` holds a real manifest and result file of survey-library; `test/fixtures/` holds a fake runner and a
fake project.
