#!/usr/bin/env bash
# The host side of the nightly performance run (README.md): options, lock, git mirror, image, prepare, gate, container,
# load sampler, posting to Discord, crash posts. The container side is src/nightly.ts.
#   run.sh [--nightly] [--ref <ref>] [--label <text>] [--suites core,react,survey-js-ui] [--only <ids>] [--record]
#          [--bisect <good>..<bad>] [--no-gate] [--dry-post] [--no-bisect] [--reinstall]
# Never add `set -x`: the webhook must not reach a log. It goes to curl through a config read from a process
# substitution, so it is never in argv or ps either.
# What the host trusts (README.md, The host and the containers): the containers run survey-library's code and its npm
# dependencies, and they write the whole state directory. So the host never runs git or any other program there, never
# writes there, and reads from there only whether a few files exist and the regular files of a ready Discord message,
# which it copies to its own folder first. Its own files (the git mirror, the lock, the logs, the load samples, the gate
# result, the messages it posts) live in PERF_HOST_DIR, which no container can write.
set -u -o pipefail

STATE="${PERF_STATE_DIR:-/srv/surveyjs-performance-monitor}"
HOST_DIR="${PERF_HOST_DIR:-/var/lib/surveyjs-performance-monitor-host}"
# A bare mirror of survey-library: the host resolves refs and reads package.json here; the prepare container fetches
# from it, read-only.
MIRROR="$HOST_DIR/mirror.git"
# This checkout of surveyjs-performance-monitor: nightly.ts, gate.ts and the Dockerfile come from here (read-only inside).
SERVICE="$(cd "$(dirname "$(readlink -f "$0")")/.." && pwd -P)"
ENV_FILE="${PERF_ENV_FILE:-/etc/surveyjs-perf/perf.env}"
# real, inside, stage
. "$SERVICE/bin/host-lib.sh"

NIGHTLY=0 REF="origin/master" LABEL="" SUITES="core,react,survey-js-ui" ONLY="" RECORD=0 BISECT="" NO_GATE=0 DRY=0 NO_BISECT=0 REINSTALL=0
die() { echo "run.sh: $*" >&2; exit 2; }
need() { [ $# -ge 2 ] && [ -n "$2" ] || die "$1 needs a value"; }
while [ $# -gt 0 ]; do
  case "$1" in
    --nightly) NIGHTLY=1 ;;
    --ref) need "$@"; REF="$2"; shift ;;
    --label) need "$@"; LABEL="$2"; shift ;;
    --suites) need "$@"; SUITES="$2"; shift ;;
    --only) need "$@"; ONLY="$2"; shift ;;
    --record) RECORD=1 ;;
    --bisect) need "$@"; BISECT="$2"; shift ;;
    --no-gate) NO_GATE=1 ;;
    --dry-post) DRY=1 ;;
    --no-bisect) NO_BISECT=1 ;;
    --reinstall) REINSTALL=1 ;;
    -h|--help) sed -n '2,5p' "$0"; exit 0 ;;
    *) die "unknown option $1" ;;
  esac
  shift
done
[ -n "$BISECT" ] && [ -z "$ONLY" ] && die "--bisect needs --only <id>"
[ -n "$BISECT" ] && [ "$RECORD" = 1 ] && die "--bisect and --record do not go together"
case "$BISECT" in ''|?*..?*) ;; *) die "--bisect takes <good>..<bad>" ;; esac
KIND="on-demand"
[ "$NIGHTLY" = 1 ] && KIND="nightly"
[ "$RECORD" = 1 ] && KIND="record"

# The folders: the state directory apart from everything the host keeps or runs.
[ -d "$STATE" ] || die "$STATE does not exist (PERF_STATE_DIR): see README.md, Bootstrap"
[ -d "$MIRROR" ] || die "no git mirror at $MIRROR (PERF_HOST_DIR): see README.md, Bootstrap"
state_real=$(real "$STATE")
host_real=$(real "$HOST_DIR")
env_dir_real=$(real "$(dirname "$ENV_FILE")")
inside "$env_dir_real" "$state_real" && die "$ENV_FILE is inside the state directory, which the containers write: move it out (PERF_ENV_FILE)"
inside "$host_real" "$state_real" && die "$HOST_DIR is inside the state directory, which the containers write: move it out (PERF_HOST_DIR)"
inside "$state_real" "$host_real" && die "the state directory is inside $HOST_DIR: keep the two apart"
inside "$SERVICE" "$state_real" && die "$SERVICE is inside the state directory, which the containers write: run run.sh from a checkout outside it"

# The env file: plain KEY=value lines, no quotes, parsed line by line (never sourced); never under the state directory.
PERF_DISCORD_WEBHOOK="" PERF_DISCORD_ROLE_ID="" PERF_CPUS="" PERF_MEMORY="8g" PERF_MAX_BUSY_CORES="1.0" PERF_MAX_OTHER_CORES="1.0"
PERF_GATE_MAX_MIN="60" PERF_KEEP_DAYS="90"
if [ -f "$ENV_FILE" ]; then
  mode=$(stat -c %a "$ENV_FILE" 2>/dev/null || echo 600)
  [ "$mode" = 600 ] || echo "run.sh: $ENV_FILE should be chmod 600 (is $mode)" >&2
  while IFS= read -r line || [ -n "$line" ]; do
    line="${line%$'\r'}"
    case "$line" in ''|'#'*) continue ;; esac
    key="${line%%=*}"
    val="${line#*=}"
    case "$key" in
      PERF_DISCORD_WEBHOOK|PERF_DISCORD_ROLE_ID|PERF_CPUS|PERF_MEMORY|PERF_MAX_BUSY_CORES|PERF_MAX_OTHER_CORES|PERF_GATE_MAX_MIN|PERF_KEEP_DAYS)
        printf -v "$key" '%s' "$val" ;;
      *) echo "run.sh: $ENV_FILE: unknown key $key" >&2 ;;
    esac
  done < "$ENV_FILE"
fi
[ "$DRY" = 1 ] || [ -n "$PERF_DISCORD_WEBHOOK" ] || die "PERF_DISCORD_WEBHOOK is not set in $ENV_FILE (or use --dry-post)"

mkdir -p "$HOST_DIR/tmp" "$HOST_DIR/runs"
# RUN: this run's folder in PERF_HOST_DIR; HIST: its history folder in the state directory, which the container writes.
RUN=""
HIST=""
RUN_ID="$(date -u +%Y%m%dT%H%M%S)-$KIND"
CPID=""
SPID=""
GPID=""
# A post may take 5 minutes; the one after a stop signal must fit systemd's TimeoutStopSec=90 with the docker stop.
POST_MAX_TIME=300

# --- posting -------------------------------------------------------------------------------------------------------

# post_dir <message dir> <n>: payload.json plus the files of files.txt; 429: wait Retry-After, retry up to 3 times.
# The message dir is always in PERF_HOST_DIR (stage, post_text). The reason of a failure goes to $RUN/post-failed-<n>.
post_dir() {
  local dir="$1" n="$2" url hdr body code rc i ra
  local -a files=()
  i=0
  if [ -f "$dir/files.txt" ]; then
    while IFS= read -r f; do
      [ -n "$f" ] || continue
      files+=(-F "files[$i]=@$f")
      i=$((i + 1))
    done < "$dir/files.txt"
  fi
  if [ "$DRY" = 1 ]; then
    echo "--- dry post $n ($dir)"
    echo "curl --fail-with-body -sS --connect-timeout 30 --max-time 300 -D <hdr> -K <(printf 'url = \"%s\"\\n' '<webhook>?wait=true') -F 'payload_json=<payload.json;type=application/json' ${files[*]}"
    cat "$dir/payload.json"; echo
    [ -n "$RUN" ] && echo "$RUN_ID" > "$RUN/posted-$n"
    return 0
  fi
  url="$PERF_DISCORD_WEBHOOK"
  case "$url" in *\?*) url="$url&wait=true" ;; *) url="$url?wait=true" ;; esac
  hdr=$(mktemp "$HOST_DIR/tmp/hdr.XXXXXX")
  body=$(mktemp "$HOST_DIR/tmp/body.XXXXXX")
  for attempt in 1 2 3 4; do
    code=$(cd "$dir" && curl --fail-with-body -sS --connect-timeout 30 --max-time "$POST_MAX_TIME" -o "$body" -w '%{http_code}' -D "$hdr" \
      -K <(printf 'url = "%s"\n' "$url") -F 'payload_json=<payload.json;type=application/json' "${files[@]}")
    rc=$?
    if [ "$rc" = 0 ]; then
      [ -n "$RUN" ] && echo "$RUN_ID" > "$RUN/posted-$n"
      rm -f "$hdr" "$body"
      return 0
    fi
    if [ "$code" = 429 ] && [ "$attempt" -lt 4 ]; then
      ra=$(grep -i '^retry-after:' "$hdr" | tail -1 | tr -d '\r' | awk '{print $2}')
      ra="${ra%%.*}"
      case "$ra" in ''|*[!0-9]*) ra=5 ;; esac
      sleep $((ra + 1))
      continue
    fi
    break
  done
  echo "run.sh: posting $dir failed (HTTP $code); the payload is kept" >&2
  head -c 500 "$body" >&2; echo >&2
  [ -n "$RUN" ] && echo "HTTP ${code:-000}" > "$RUN/post-failed-$n"
  rm -f "$hdr" "$body"
  return 1
}

# post_text <n> <text> [file]: run.sh's own messages, fixed templates with no untrusted text; the file is in PERF_HOST_DIR.
post_text() {
  local n="$1" text="$2" file="${3:-}" dir
  dir=$(mktemp -d "$HOST_DIR/tmp/msg.XXXXXX")
  local json="${text//\\/\\\\}"
  json="${json//\"/\\\"}"
  json="${json//$'\n'/\\n}"
  if [ -n "$file" ] && [ -f "$file" ]; then
    cp "$file" "$dir/"
    basename "$file" > "$dir/files.txt"
    printf '{"content":"%s","embeds":[],"allowed_mentions":{"parse":[]},"attachments":[{"id":0,"filename":"%s"}]}\n' "$json" "$(basename "$file")" > "$dir/payload.json"
  else
    : > "$dir/files.txt"
    printf '{"content":"%s","embeds":[],"allowed_mentions":{"parse":[]}}\n' "$json" > "$dir/payload.json"
  fi
  post_dir "$dir" "$n"
  local rc=$?
  rm -rf "$dir"
  return $rc
}

# After the lock a run that cannot start says so: a missing message must mean the host did not run.
fail() { post_text x "❌ perf $KIND not started: $1"; echo "run.sh: $1" >&2; exit 2; }

# --- 1. lock --------------------------------------------------------------------------------------------------------

exec 9>"$HOST_DIR/run.lock" || die "cannot open $HOST_DIR/run.lock: run as the owner of $HOST_DIR, with its PERF_HOST_DIR"
if [ "$KIND" = nightly ]; then flock -w 1800 9; else flock -n 9; fi || {
  post_text x "⏭️ perf $KIND skipped: another perf run is active"
  exit 1
}
# The container prunes its history after PERF_KEEP_DAYS; the host prunes its own run folders the same way.
find "$HOST_DIR/runs" -mindepth 1 -maxdepth 1 -type d -mtime "+$PERF_KEEP_DAYS" -exec rm -rf -- {} + 2>/dev/null

# --- 2. orphans -----------------------------------------------------------------------------------------------------

if created=$(docker inspect -f '{{.Created}}' perf-run 2>/dev/null); then
  age=$(( $(date +%s) - $(date -d "$created" +%s) ))
  if [ "$age" -lt 14400 ]; then
    post_text x "⚠️ perf $KIND not started: a previous run is still alive since $(date -u -d "$created" +%FT%TZ)"
    exit 1
  fi
  docker rm -f perf-run >/dev/null
fi

# --- 3. did the last run finish? -------------------------------------------------------------------------------------

if [ -f "$HOST_DIR/running.json" ]; then
  last=$(sed -n 's/.*"start": *"\([0-9TZ:.-]*\)".*/\1/p' "$HOST_DIR/running.json" | head -1)
  post_text x "⚠️ the perf run of ${last:-an unknown date} did not finish (a reboot or a kill)"
fi
printf '{"ref":"%s","kind":"%s","start":"%s"}\n' "${REF//\"/}" "$KIND" "$(date -u +%FT%TZ)" > "$HOST_DIR/running.json"

# --- 4. the trap ----------------------------------------------------------------------------------------------------

cleanup() {
  [ -n "$GPID" ] && docker stop -t 5 perf-gate >/dev/null 2>&1
  [ -n "$CPID" ] && docker stop -t 30 perf-run >/dev/null 2>&1
  [ -n "$SPID" ] && kill "$SPID" 2>/dev/null
  rm -f "$HOST_DIR/running.json"
}
# A stop (systemctl stop, a reboot, systemd's TimeoutStartSec) is posted: a missing message must mean the host did not run.
on_signal() {
  trap - EXIT
  cleanup
  POST_MAX_TIME=20
  [ -n "$RUN" ] && tail -n 50 "$RUN/nightly.log" > "$RUN/nightly-log-tail.txt" 2>/dev/null
  post_text x "⛔ perf $KIND $RUN_ID: stopped by a signal (systemctl stop, a reboot or a timeout)" "${RUN:+$RUN/nightly-log-tail.txt}"
  exit 143
}
trap cleanup EXIT
trap on_signal INT TERM

# --- 5. git, in the host's mirror only ------------------------------------------------------------------------------

G=(git --git-dir="$MIRROR")
"${G[@]}" fetch --prune --quiet origin || fail "git fetch failed"
# A ref is origin/<ref> when that exists, else as given (a sha, a tag).
resolve() {
  "${G[@]}" rev-parse --verify -q "origin/$1^{commit}" 2>/dev/null || "${G[@]}" rev-parse --verify -q "$1^{commit}"
}
# The tests always come from master: the prepare container moves work/tool there.
TOOL_SHA=$(resolve master) || fail "the mirror has no origin/master"
if [ -n "$BISECT" ]; then
  GOOD=$(resolve "${BISECT%%..*}") || fail "the good end of --bisect is not a known ref"
  SHA=$(resolve "${BISECT#*..}") || fail "the bad end of --bisect is not a known ref"
  BISECT="$GOOD..$SHA"
else
  SHA=$(resolve "$REF") || fail "--ref is not a known ref"
fi

# --- 6. image -------------------------------------------------------------------------------------------------------

PW=$("${G[@]}" show "$TOOL_SHA:package.json" | sed -n 's/.*"@playwright\/test": *"[^0-9]*\([0-9][0-9.]*\)".*/\1/p' | head -1)
[ -n "$PW" ] || fail "no @playwright/test version in survey-library's package.json"
DSHA=$(sha1sum "$SERVICE/docker/Dockerfile" | cut -c1-7)
IMAGE="surveyjs-perf:$PW-$DSHA"
if ! docker image inspect "$IMAGE" >/dev/null 2>&1; then
  docker build --quiet --build-arg "PW_VERSION=$PW" -t "$IMAGE" "$SERVICE/docker" >/dev/null || fail "docker build of $IMAGE failed"
  if ls "$STATE"/baselines/*.json >/dev/null 2>&1; then
    post_text x "🐳 new image $IMAGE: a new machine key, the next nightly records a baseline"
  else
    post_text x "🐳 new image $IMAGE"
  fi
fi
MACHINE_EXTRA="$IMAGE-cpus${PERF_CPUS:-all}"

# --- 7. the run id and the run folders ------------------------------------------------------------------------------

RUN_ID="$(date -u +%Y%m%dT%H%M%S)-${SHA:0:7}-$([ -n "$BISECT" ] && echo bisect || echo "$KIND")"
RUN="$HOST_DIR/runs/$RUN_ID"
HIST="$STATE/history/$RUN_ID"
[ -e "$RUN" ] && fail "the run folder of $RUN_ID exists"
mkdir -p "$RUN"
printf '{"runId":"%s","ref":"%s","kind":"%s","start":"%s"}\n' "$RUN_ID" "${REF//\"/}" "$KIND" "$(date -u +%FT%TZ)" > "$HOST_DIR/running.json"
echo "run.sh: $RUN_ID, image $IMAGE, run $RUN, history $HIST"

# --- 8. prepare -----------------------------------------------------------------------------------------------------

# A container, without network: the state directory's own clone of survey-library fetches from the mirror, work/tool
# moves to master, and nightly.ts checks the options against the tool's manifest before the gate, so a typo is not found
# an hour later as a crash.
CHECK=(--suites "$SUITES")
[ -n "$ONLY" ] && CHECK+=(--only "$ONLY")
[ -n "$BISECT" ] && CHECK+=(--bisect "$BISECT")
docker run --rm --network none --user "$(id -u):$(id -g)" -v "$STATE:$STATE" -v "$MIRROR:/mirror:ro" -v "$SERVICE:$SERVICE:ro" \
  -e "PERF_STATE_DIR=$STATE" -e "HOME=$STATE/home" "$IMAGE" node "$SERVICE/src/nightly.ts" --prepare --mirror /mirror --tool-sha "$TOOL_SHA" \
  "${CHECK[@]}" > "$RUN/prepare.log" 2>&1 || {
  tail -n 5 "$RUN/prepare.log" >&2
  fail "prepare failed: the options are not valid, or the tool could not be updated (runs/$RUN_ID/prepare.log on the host)"
}
# The sum of the tool's suite budgets, which prepare printed: the container's time limit follows it.
B=$(budget_of "$RUN/prepare.log")

# --- 9. gate --------------------------------------------------------------------------------------------------------

if [ "$NO_GATE" = 0 ]; then
  # In the background with `& wait`, so a stop signal is not held up for up to an hour; the trap stops perf-gate.
  docker run --rm --name perf-gate --network none -v "$SERVICE:$SERVICE:ro" "$IMAGE" node "$SERVICE/src/gate.ts" wait \
    --max-busy "$PERF_MAX_BUSY_CORES" --quiet-min 5 --max-min "$PERF_GATE_MAX_MIN" --interval 10 > "$RUN/gate.out" 2>&1 &
  GPID=$!
  wait "$GPID" || true
  GPID=""
  gate=$(grep '^{' "$RUN/gate.out" | tail -1)
  [ -n "$gate" ] || gate='{"ok":false,"reason":"gate-failed","waitMin":0}'
  echo "$gate" > "$RUN/gate.json"
  echo "run.sh: gate $gate"
fi

# --- 10. the container ----------------------------------------------------------------------------------------------

T=$(limit_min "$B" "$KIND" ${BISECT:+bisect})
# A nightly after a new machine key records (record-pending.json): it gets the record's time.
[ "$KIND" = nightly ] && [ -f "$STATE/record-pending.json" ] && T=$(limit_min "$B" record)
# The run folder is read-only inside: nightly.ts reads the gate result and the load samples there.
ARGS=(--ref "$REF" --sha "$SHA" --suites "$SUITES" --history "$HIST" --host-run /host-run --image "$IMAGE")
[ "$KIND" = nightly ] && ARGS+=(--nightly)
[ "$KIND" = record ] && ARGS+=(--record)
[ -n "$LABEL" ] && ARGS+=(--label "$LABEL")
[ -n "$ONLY" ] && ARGS+=(--only "$ONLY")
[ -n "$BISECT" ] && ARGS+=(--bisect "$BISECT")
[ "$NO_BISECT" = 1 ] && ARGS+=(--no-bisect)
[ "$REINSTALL" = 1 ] && ARGS+=(--reinstall)
DOCKER=(docker run --rm --init --name perf-run --cgroup-parent=perf.slice --user "$(id -u):$(id -g)" --shm-size=2g
  --memory="$PERF_MEMORY" --memory-swap="$PERF_MEMORY" -v "$STATE:$STATE" -v "$SERVICE:$SERVICE:ro" -v "$RUN:/host-run:ro"
  -e "PERF_STATE_DIR=$STATE" -e "PERF_CPUS=$PERF_CPUS" -e "PERF_MAX_OTHER_CORES=$PERF_MAX_OTHER_CORES" -e "PERF_KEEP_DAYS=$PERF_KEEP_DAYS"
  -e "PERF_DISCORD_ROLE_ID=$PERF_DISCORD_ROLE_ID" -e "PERF_MACHINE_EXTRA=$MACHINE_EXTRA" -e "PERF_IMAGE=$IMAGE" -e "TZ=Europe/Berlin" -e "HOME=$STATE/home")
[ -n "$PERF_CPUS" ] && DOCKER+=(--cpuset-cpus="$PERF_CPUS")
# In the background with `& wait`, so the trap runs at once on a signal.
DOCKER+=(-e "PERF_DEADLINE=$(( $(date +%s) + T * 60 ))")
timeout -k 60 "${T}m" "${DOCKER[@]}" "$IMAGE" node "$SERVICE/src/nightly.ts" "${ARGS[@]}" > "$RUN/nightly.log" 2>&1 &
CPID=$!

# --- 11. the sampler ------------------------------------------------------------------------------------------------

sampler() {
  exec 9>&-
  local pid="" cg="" i
  for i in $(seq 1 60); do
    pid=$(docker inspect -f '{{.State.Pid}}' perf-run 2>/dev/null) && [ "${pid:-0}" != 0 ] && break
    sleep 1
  done
  [ -n "$pid" ] && [ "$pid" != 0 ] || { echo "sampler: the container did not start" > "$RUN/sampler.err"; return 1; }
  cg="/sys/fs/cgroup$(sed -n 's/^0:://p' "/proc/$pid/cgroup" | head -1)"
  if [ ! -f "$cg/cpu.stat" ]; then
    echo "sampler: no cpu.stat in $cg (cgroup v2 needed)" | tee "$RUN/sampler.err" >&2
    return 1
  fi
  while kill -0 "$CPID" 2>/dev/null && [ -f "$cg/cpu.stat" ]; do
    local t cpus usage oom
    # The time first, to the nanosecond: an interval is about 5.1 s, and whole seconds would misread it by up to 20%.
    t=$(date +%s.%N)
    cpus=$(grep '^cpu[0-9]' /proc/stat | sed 's/.*/"&"/' | paste -sd, -)
    usage=$(sed -n 's/^usage_usec //p' "$cg/cpu.stat" 2>/dev/null)
    oom=$(sed -n 's/^oom_kill //p' "$cg/memory.events" 2>/dev/null)
    printf '{"t":%s,"cpu":[%s],"usage_usec":%s,"oom_kill":%s}\n' "$t" "$cpus" "${usage:-null}" "${oom:-null}" >> "$RUN/load.jsonl"
    sleep 5
  done
}
sampler &
SPID=$!

# --- 12. posting ----------------------------------------------------------------------------------------------------

POST_FAILED=0
# One attempt while the container runs (429s are retried inside post_dir), one more after it exits. A message the host
# refuses to stage (a link, a file name outside [A-Za-z0-9._-]) is not posted, and run.sh posts that it was refused.
try_post() { # try_post <n> <message dir in the state directory>
  local out
  [ -f "$2/ready" ] && [ ! -f "$RUN/posted-$1" ] && [ ! -f "$RUN/post-failed-$1" ] || return 0
  # The copy goes to $RUN/outbox/<n>; the message folder must be at its own path, with no link on the way.
  if out=$(stage "$2" "$RUN/outbox/$1" "$state_real/history/$RUN_ID/discord/${2##*/}"); then
    post_dir "$out" "$1" || POST_FAILED=1
  else
    echo "run.sh: message $1 is not a plain folder of regular files with plain names: not posted" >&2
    echo "refused by the host: not a plain folder of regular files" > "$RUN/post-failed-$1"
    POST_FAILED=1
  fi
}
while kill -0 "$CPID" 2>/dev/null; do
  try_post 1 "$HIST/discord/1-result"
  sleep 10
done
wait "$CPID"
EC=$?
CPID=""
docker stop -t 30 perf-run >/dev/null 2>&1
kill "$SPID" 2>/dev/null
SPID=""
rm -f "$RUN/post-failed-1"
POST_FAILED=0
try_post 1 "$HIST/discord/1-result"

oom_kills() {
  [ -f "$RUN/load.jsonl" ] || { echo 0; return; }
  local a b
  a=$(head -1 "$RUN/load.jsonl" | sed -n 's/.*"oom_kill":\([0-9]*\).*/\1/p')
  b=$(tail -1 "$RUN/load.jsonl" | sed -n 's/.*"oom_kill":\([0-9]*\).*/\1/p')
  echo $(( ${b:-0} - ${a:-0} ))
}
tail -n 50 "$RUN/nightly.log" > "$RUN/nightly-log-tail.txt" 2>/dev/null
what="crashed (exit $EC)"
{ [ "$EC" = 124 ] || [ "$EC" = 137 ]; } && what="timed out after $T min"
[ "$(oom_kills)" -gt 0 ] && what="out of memory"
handled=0
case "$EC" in 0|1|3) handled=1 ;; esac
if [ ! -f "$RUN/posted-1" ]; then
  if [ "$handled" = 1 ] && [ -f "$RUN/post-failed-1" ]; then
    # The night ended normally but its message was not posted: say so, not "crashed".
    post_text 1 "❌ perf $KIND $RUN_ID: the result message could not be posted ($(cat "$RUN/post-failed-1")); see history/$RUN_ID" || POST_FAILED=1
  else
    post_text 1 "❌ perf $KIND $RUN_ID: $what" "$RUN/nightly-log-tail.txt" || POST_FAILED=1
  fi
elif [ "$handled" = 0 ]; then
  if { [ "$EC" = 124 ] || [ "$EC" = 137 ]; } && [ -f "$HIST/bisect-started" ]; then
    [ -f "$HIST/discord/2-bisect/ready" ] || post_text 2 "⏱️ perf $KIND $RUN_ID: bisect timed out" "$RUN/nightly-log-tail.txt" || POST_FAILED=1
  else
    post_text 2 "❌ perf $KIND $RUN_ID: $what after the result was posted" "$RUN/nightly-log-tail.txt" || POST_FAILED=1
  fi
fi
try_post 2 "$HIST/discord/2-bisect"

echo "run.sh: $RUN_ID done, exit $EC"
[ "$POST_FAILED" = 0 ] || exit 1
case "$EC" in 0|1) exit 0 ;; *) exit 1 ;; esac
