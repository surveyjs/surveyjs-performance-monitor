#!/usr/bin/env bash
# The host's checks (bin/host-lib.sh) against what a container can leave in the state directory: links to host files,
# a linked message folder or parent, odd names, files.txt naming what is not there. Linux (CI, WSL): bash test/host.test.sh
set -u
here="$(cd "$(dirname "$0")" && pwd -P)"
. "$here/../bin/host-lib.sh"

fails=0
ok() { echo "ok   $1"; }
bad() { echo "FAIL $1"; fails=$((fails + 1)); }
expect_ok() { local name="$1"; shift; if "$@" >/dev/null; then ok "$name"; else bad "$name"; fi; }
expect_fail() { local name="$1"; shift; if "$@" >/dev/null 2>&1; then bad "$name"; else ok "$name"; fi; }

t=$(mktemp -d)
trap 'rm -rf "$t"' EXIT
t=$(real "$t")
state="$t/state"
host="$t/host"
mkdir -p "$state/history/r1/discord" "$host/runs/r1" "$t/etc"
echo "PERF_DISCORD_WEBHOOK=https://discord.example/secret" > "$t/etc/perf.env"

# A fresh, plain message: payload.json, files.txt, ready and one attachment.
message() {
  rm -rf "$state/history/r1/discord/1-result"
  mkdir -p "$state/history/r1/discord/1-result"
  local m="$state/history/r1/discord/1-result"
  echo '{"content":"x"}' > "$m/payload.json"
  printf 'summary.md\n' > "$m/files.txt"
  echo "# summary" > "$m/summary.md"
  touch "$m/ready"
  echo "$m"
}
out="$host/runs/r1/outbox/1"
expect="$state/history/r1/discord/1-result"

m=$(message)
expect_ok "a plain message is staged" stage "$m" "$out" "$expect"
expect_ok "  with its attachment" test -f "$out/summary.md" -a ! -L "$out/summary.md"

m=$(message)
ln -s "$t/etc/perf.env" "$m/env.txt"
expect_ok "a link inside the message is left out" stage "$m" "$out" "$expect"
expect_fail "  and not copied" test -e "$out/env.txt"

m=$(message)
ln -s "$t/etc/perf.env" "$m/env.txt"
printf 'summary.md\nenv.txt\n' > "$m/files.txt"
expect_fail "files.txt naming a link is refused" stage "$m" "$out" "$expect"

m=$(message)
rm "$m/payload.json"
ln -s "$t/etc/perf.env" "$m/payload.json"
expect_fail "payload.json as a link is refused" stage "$m" "$out" "$expect"

for name in "../etc/perf.env" "$t/etc/perf.env" ".hidden" "a b"; do
  m=$(message)
  printf 'summary.md\n%s\n' "$name" > "$m/files.txt"
  expect_fail "files.txt naming '$name' is refused" stage "$m" "$out" "$expect"
done

m=$(message)
echo "x" > "$m/.hidden"
echo "x" > "$m/a b"
expect_ok "odd file names are left out" stage "$m" "$out" "$expect"
expect_fail "  .hidden" test -e "$out/.hidden"
expect_fail "  a b" test -e "$out/a b"

# The message folder itself is a link to a host folder with the same shape.
mkdir -p "$t/etc/1-result"
cp "$m/payload.json" "$m/files.txt" "$m/ready" "$t/etc/1-result/"
echo "x" > "$t/etc/1-result/summary.md"
rm -rf "$state/history/r1/discord/1-result"
ln -s "$t/etc/1-result" "$state/history/r1/discord/1-result"
expect_fail "a linked message folder is refused" stage "$state/history/r1/discord/1-result" "$out" "$expect"

# A parent of the message folder is a link.
rm -rf "$state/history/r1/discord"
ln -s "$t/etc" "$state/history/r1/discord"
expect_fail "a linked parent folder is refused" stage "$state/history/r1/discord/1-result" "$out" "$expect"

expect_fail "a missing message is refused" stage "$state/history/r2/discord/1-result" "$host/runs/r2/outbox/1" "$state/history/r2/discord/1-result"

expect_ok "inside: the folder itself" inside "$state" "$state"
expect_ok "inside: a subfolder" inside "$state/history" "$state"
expect_fail "inside: a sibling with the same prefix" inside "$t/state-other" "$state"
expect_fail "inside: the parent" inside "$t" "$state"
ln -s "$state" "$t/state-link"
expect_ok "real resolves a link" test "$(real "$t/state-link")" = "$state"

# run.sh refuses folders the containers could write, before it takes the lock or runs docker.
runsh() { PERF_STATE_DIR="$1" PERF_HOST_DIR="$2" PERF_ENV_FILE="$3" bash "$here/../bin/run.sh" --dry-post 2>&1; }
refused() { local name="$1" pattern="$2"; shift 2; local text; text=$(runsh "$@"); if [ $? = 2 ] && [[ "$text" == *"$pattern"* ]]; then ok "$name"; else bad "$name: $text"; fi; }
s2="$t/s2"
h2="$t/h2"
mkdir -p "$s2" "$h2/mirror.git" "$t/etc2"
refused "run.sh: no state directory" "does not exist" "$t/none" "$h2" "$t/etc2/perf.env"
refused "run.sh: no mirror" "no git mirror" "$s2" "$t/none" "$t/etc2/perf.env"
mkdir -p "$s2/host/mirror.git"
refused "run.sh: the host folder inside the state directory" "PERF_HOST_DIR" "$s2" "$s2/host" "$t/etc2/perf.env"
mkdir -p "$h2/state"
refused "run.sh: the state directory inside the host folder" "keep the two apart" "$h2/state" "$h2" "$t/etc2/perf.env"
refused "run.sh: the env file inside the state directory" "PERF_ENV_FILE" "$s2" "$h2" "$s2/perf.env"
ln -s "$s2" "$t/s2-link"
refused "run.sh: the env file inside the state directory through a link" "PERF_ENV_FILE" "$s2" "$h2" "$t/s2-link/perf.env"

[ "$fails" = 0 ] && echo "host checks: all passed" || echo "host checks: $fails failed"
[ "$fails" = 0 ]
