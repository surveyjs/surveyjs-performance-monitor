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
