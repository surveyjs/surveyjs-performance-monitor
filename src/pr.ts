// The PR of a first-parent commit of the project's branch. Subjects come in four shapes: a squash "... (#12145)",
// "Merge pull request #12152 from ..." with the title in the body, direct pushes with no PR ("Release: ...") and
// back-merges ("Merge branch 'x' of ..."). A bare "#N" is never a PR: "fix #12147 (...) (#12151)" is #12151.
import { git } from "./util/git.ts";

export interface CommitPr {
  sha: string;
  pr: number | null;
  title: string;
  url: string;
}

export function prOf(sha: string, subject: string, body: string | undefined, repoUrl: string): CommitPr {
  const merge = /^Merge pull request #(\d+) from /.exec(subject);
  if (merge) {
    const title = (body || "").split(/\r?\n/).map((s: string) => s.trim()).filter((s: string) => !!s)[0] || subject;
    return { sha: sha, pr: Number(merge[1]), title: title, url: repoUrl + "/pull/" + merge[1] };
  }
  const all = subject.match(/\(#(\d+)\)/g);
  if (all) {
    const pr = Number(/\d+/.exec(all[all.length - 1])![0]);
    // The post shows "[#N](url) title": the trailing "(#N)" is not repeated in the title.
    return { sha: sha, pr: pr, title: subject.replace(/\s*\(#\d+\)\s*$/, ""), url: repoUrl + "/pull/" + pr };
  }
  return { sha: sha, pr: null, title: subject, url: repoUrl + "/commit/" + sha };
}

// The first-parent commits of from..to as PRs, newest first, for the post's commit list; a range git cannot
// resolve is an empty list.
export function commitRange(repo: string, from: string, to: string, repoUrl: string): Array<CommitPr> {
  let text = "";
  try {
    text = git(repo, ["log", "--first-parent", "-n", "200", "--format=%H%x00%s%x00%b%x01", from + ".." + to, "--"]);
  } catch(e) {
    return [];
  }
  return text.split("\u0001").map((s: string) => s.replace(/^\r?\n/, "")).filter((s: string) => !!s.trim()).map((s: string) => {
    const [full, subject, body] = s.split("\u0000");
    return prOf(full.trim(), subject, body, repoUrl);
  });
}
