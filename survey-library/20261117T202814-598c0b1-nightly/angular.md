# survey-library · angular · 17.11.2026 20:28 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 7763 × 27, AMD EPYC 9V74 × 21, AMD EPYC 9V45 × 9, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44169583629

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 3043 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1094 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1094 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2267 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 488 | 0% | −1% | 🟢 **−54%** ʳ |
| complexLogic/answer/type | 617 | 0% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 2069 | −1% | +1% | 🟢 **−82%** ʳ |
| expressions/load/paint | 4018 | +1% | +1% | 🟢 **−39%** ʳ |
| large/load/paint | 596 | −3% | −2% | 🟢 **−54%** ʳ |
| manyPages/load/paint | 611 | 0% | 0% | −23% |
| manyPages/pages/next10 | 415 | +3% | +5% | −10% |
| records-10k/load/paint | 2230 | 0% | +1% | +21% ⚑ |
| records-10k/records/edit-cell@orders | 384 | 0% | +2% | n/a¹ |
| records-10k/records/sort-header@orders | 378 | 0% | +1% | n/a¹ |
| records-1k/load/paint | 954 | 0% | +1% | −24% ⚑ |
| records-plain/records/sort-header@orders30 | 269 | +1% | −3% | n/a² |
| records-plain/records/sort-header@ordersPaged | 67.6 | +1% | −1% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −53% · −55% · −53% · −54% · −54% → −54% (501 / 1082 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −96% · −96% → −97% (627 / 18268 ms) — every repeat agrees
- complexLogic/load/paint (month): −81% · −82% · −82% · −81% · −82% → −82% (1999 / 10930 ms) — every repeat agrees
- expressions/load/paint (month): −41% · −40% · −39% · −41% · −39% → −39% (3916 / 6443 ms) — every repeat agrees
- large/load/paint (month): −53% · −54% · −54% · −54% · −54% → −54% (594 / 1281 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
