# The host's checks of the folders and of the messages the container writes, sourced by run.sh and test/host.test.sh.
# Bash; no state of its own.

# real <dir>: its physical path (links resolved), or the argument when it does not exist.
real() { (cd "$1" 2>/dev/null && pwd -P) || echo "$1"; }

# inside <path> <dir>: the path is the dir or under it (both physical).
inside() { case "$1/" in "$2"/*) return 0 ;; esac; return 1; }

# stage <message dir> <out dir> <physical path the message dir must have>: prints the out dir, a fresh copy of the
# message's regular files with plain names ([A-Za-z0-9._-], no leading dot), or fails. The container wrote the message:
# a link anywhere on the way to the folder, or a link inside it (to the env file, say), is never followed, and files.txt
# may name only files of the copy. The post then reads only the copy, which no container can change.
stage() {
  local src="$1" out="$2" expect="$3" f name
  [ -d "$src" ] && [ "$(cd "$src" 2>/dev/null && pwd -P)" = "$expect" ] || return 1
  rm -rf "$out" && mkdir -p "$out" || return 1
  while IFS= read -r -d '' f; do
    name="${f##*/}"
    case "$name" in ''|.*|*[!A-Za-z0-9._-]*) continue ;; esac
    cp -P -- "$f" "$out/$name" || return 1
  done < <(find -P "$src" -mindepth 1 -maxdepth 1 -type f -print0)
  # A file swapped for a link after find is copied as the link (cp -P): keep regular files only.
  find -P "$out" -mindepth 1 ! -type f -exec rm -rf -- {} +
  [ -f "$out/payload.json" ] && [ -f "$out/files.txt" ] || return 1
  while IFS= read -r f; do
    [ -n "$f" ] || continue
    case "$f" in .*|*[!A-Za-z0-9._-]*) return 1 ;; esac
    [ -f "$out/$f" ] && [ ! -L "$out/$f" ] || return 1
  done < "$out/files.txt"
  echo "$out"
}

# budget_of <prepare.log>: the sum of the suites' budgets in minutes, from the last whole `budget: <B>` line of the log,
# 10 to 120; otherwise 26 (10 + 8 + 8, the budgets before) with a warning. The prepare container wrote the log: grep
# and arithmetic only.
budget_of() {
  local b
  b=$(grep -aE '^budget: [0-9]{1,3}$' "$1" 2>/dev/null | tail -n 1 | sed 's/^budget: //')
  [ -n "$b" ] && b=$((10#$b))
  if [ -n "$b" ] && [ "$b" -ge 10 ] && [ "$b" -le 120 ]; then
    echo "$b"
    return 0
  fi
  echo "host-lib: no budget line of 10 to 120 minutes in $1: using 26" >&2
  echo 26
}

# limit_min <budget> <record|nightly|on-demand> [bisect]: the container's time limit in minutes. The suites take 1.5 times
# their budgets and the build 6 (45 at 26); a record runs 5 rounds plus 45; a night or a bisect gets 40 for the bisect,
# and every run 30 to spare.
limit_min() {
  local b="$1" s
  s=$(( (3 * b + 1) / 2 + 6 ))
  case "$2" in
    record) echo $((5 * b + 45)) ;;
    nightly) echo $((s + 40 + 30)) ;;
    *) [ -n "${3:-}" ] && s=$((s + 40)); echo $((s + 30)) ;;
  esac
}
