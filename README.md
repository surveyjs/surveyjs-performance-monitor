# surveyjs-performance-monitor

The nightly performance reports of survey-library and survey-creator, run on GitHub Actions
(`.github/workflows/night.yml`, code in `src/gh/`).

## What the night does

One workflow, two nights: survey-library at 01:00 UTC and survey-creator at 03:00 UTC (the project of a run is in its
name and in `PERF_PROJECT`). A Creator build pairs each survey-creator commit with the survey-library commit of the same
midnight-UTC cut-off, so the Creator is always measured against the library of its own day.

Every night it builds four versions of the project: today (midnight UTC of the run's day), yesterday, a week ago and
a month ago (for survey-creator, each version is a pair of commits). It measures them with the performance suites of
the project's current `master` (the runner contract, `perf/CONTRACT.md` there) and posts one report to Discord: for
each scenario, how much today's build changed against the three older ones. The accepted contracts: survey-library's
runner contract 2, and survey-creator's own contract 1 (`product: "creator"`, its `perf/CONTRACT.md`); result schema 2
for both.

- Jobs: `plan` decides the builds and the measuring jobs; `build-today` and `build-older` build the commits; `tool`
  prepares the runner; `measure` runs one job per scenario, each on its own worker; `report` writes the one Discord
  message; `post` sends it; `history` keeps the report files.
- One worker per scenario: today and each older build are measured on that one worker, so every compared pair shares
  one machine.
- 5 interleaved repeats, in the order A B B A A B B A A B (A is today, B the older build).
- The highlight rule: delta = today / build − 1 (plus: today is slower). Each repeat gives l = ln(today / build) of its
  two medians; the change is the mean of l with its 99% t-interval. A cell is highlighted when the change is 5% or
  more and the whole interval is past 2% and past `minDelta` (2 ms for `core`, 8 ms for the browser suites) on the
  same side: confirmed. A change of 5% or more whose interval is not is unconfirmed and not highlighted. Why: on the
  nights of 2026-11-17..20 the repeats of one pair were 1.5–2.4% apart (the median per suite), so the former fixed 25%
  in every repeat left out changes of 5–20% that every repeat showed; replayed on those nights, this rule kept every
  former highlight, and about 0.01 a night would come from the noise alone. A run of one repeat (`PERF_REPEATS=1`) has
  no interval and keeps the former rule: the delta over all samples over 25% and over `minDelta`. A scenario the
  runner marks `counterOnly` (too short or not repeatable to judge by time) shows its time without a highlight; its
  leak and heap counters decide instead.
- The counter rule, for every scenario: only leaks are judged. A `leak` (listeners and nodes kept per sample) or `heap`
  (KB of heap kept per sample) counter changed when one and the same counter did so in every repeat (today's run
  against the build's run of the same repeat), by its kind's threshold: `leak` by 1 or more, `heap` over 25% and over
  16 KB. Slower when one grew, faster when one fell and none grew. `work` (calls in survey-core) and `render` (layouts
  and style recalcs) count the amount of work, whose cost the time shows: they are listed as information and never
  decide. Other kinds (`dom`, and any the runner adds later) are neither listed nor judged, and the counters of a build
  whose jsonErrors differ from today's (⚑: it does other work) are not judged. A cell is slower when its time or its
  leak and heap counters are.

The `post` job runs no library code, and the webhook secret is only in its send step.

## Setup

1. Settings → Secrets and variables → Actions → repository secret `PERF_DISCORD_WEBHOOK`: the webhook of the channel.
2. Settings → Actions → General → Workflow permissions: "Read and write" (the `history` job pushes a branch).
3. Repository variable `PERF_SCHEDULE` = `on` starts both schedules (01:00 UTC survey-library, 03:00 UTC
   survey-creator). A run by hand works regardless.

## Running by hand

Actions → night → Run workflow, or:

```bash
gh workflow run night.yml
gh workflow run night.yml -f project=survey-creator
gh workflow run night.yml -f dry-post=true
```

A run by hand is a whole night, every suite and every scenario. Its inputs: `project` (`survey-library`, the default, or
`survey-creator`) and `dry-post`, which builds the message and prints it instead of posting it.

## What the report has

One Discord message per run. Its first line is `📊 <project> nightly`, `🔺 <project> nightly` (something got slower
against yesterday) or `⚠️ <project> nightly` (a build or suite failed, a scenario failed on today, or something is
incomplete or not run), then notes:
`cancelled: N scenarios not measured`, `not run (worker failed): <suite> <id> <job url>, ...` and `run: <url>`, and a `deps vs yesterday: ...` line when the dependencies changed.
Embeds: the builds (four commits with links and dates; for survey-creator each build names both commits, the creator
commit and the survey-library commit it was paired with), the commits since yesterday (PR numbers and titles; for
survey-creator a second list, "survey-library commits since yesterday (N)"), and one
embed per suite only when something is highlighted against yesterday or a column failed.

Attachments, in this order:

1. `overview.png`: a table `SUITE | 1D | 7D | 30D`, a row per suite. A cell shows `N slower`, `N faster`, `N n/a` (only
   the non-zero ones), `—` when nothing changed, or for a build without a result `= today`, `build failed`,
   `suite failed`, `incomplete N`, `not run`; then `· N ⚑` when present. The suite's name gets `· N failed` when
   scenarios failed on today's build. Every cell stays on one line: a quiet night is 728 px wide, a busy one grows
   wider instead of wrapping. If Chromium gives no PNG, the same summary goes into the message as text.
2. `<suite>.md` for each suite, where the older builds are named `1D`, `7D`, `30D` as in the picture: a table of
   scenarios with their time only (today's time in ms; for the other builds only the delta; `🔴 **+31%**` for a
   highlighted slowdown, `🟢 **−55%**` for a speedup, `n/a¹` with a footnote), then the sections for scenarios that
   failed on today and `jsonErrors` that differ; `Counters`, a table of each scenario's leak and heap counters with a
   verdict in some build (the scenario's name on its first row only; today's value, then each build's value:
   `🔴 **0**` when it decided slower, `🟢 **12064**` faster, the plain value when it changed without a verdict, `=` when
   it did not change, `—` when the build has none); `Repeats 1D`, `Repeats 7D`, `Repeats 30D` for each highlighted or
   unconfirmed cell (the pooled delta, the 99% interval as `+5%..+7%`, a column per repeat, and confirmed: 🟢 when the
   interval clears 2% and `minDelta`, 🔴 when not — then its time is not judged; a run of one repeat has no interval
   column, and confirmed means its repeat agrees); `Counters (information)`, the other differences of the counters, `work` and `render`
   among them (the medians over the repeats, with their kind); the log tails of failed columns; and the last line
   `Δ = today / build − 1.`
3. `results.tar.gz`: all raw result files of the night.
4. The logs of failed builds and suites, up to Discord's 10 files.

Marks:

- `n/a`: the runner skipped the scenario (`not in this build: <api>`), it failed or hung (`timeout 300 s`), or the build
  has no UI package for that suite.
- `ᶜ`: a counter-only scenario: its time is for reference, its verdict is in the Counters table.
- When the leak or heap counters decided a cell, the Discord line shows `<kind>: <name> <build> → <today>` (the counter
  that decided) instead of the delta.
- `⚑`: the build does not know part of the test's JSON (jsonErrors) and measured less work than today; its counters
  are not judged.

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
(`.github/workflows/ci.yml`) runs actionlint, lint, typecheck and the unit tests. `test/testdata/` holds a real manifest and result file of survey-library and the real manifest of survey-creator (`test/testdata/creator-manifest.json`); `test/fixtures/` holds a fake runner, a fake creator runner (`test/fixtures/fake-creator`) and a
fake project.
