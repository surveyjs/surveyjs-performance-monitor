# survey-library · vue3 · 17.11.2026 21:58 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 9V74 × 26, AMD EPYC 9V45 × 16, AMD EPYC 7763 × 16, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 2 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44185307540

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 2556 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 913 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 909 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 1867 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 429 | +1% | +1% | 🟢 **−57%** ʳ |
| complexLogic/answer/type | 400 | 0% | −1% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1574 | −1% | 0% | 🟢 **−85%** ʳ |
| expressions/load/paint | 3840 | 0% | 0% | 🟢 **−41%** ʳ |
| large/load/paint | 1129 | −2% | −1% | 🟢 **−50%** ʳ |
| manyPages/load/paint | 488 | −1% | 0% | 🟢 **−29%** ʳ |
| manyPages/pages/next10 | 500 | −2% | −1% | −8% |
| records-10k/load/paint | 2592 | 0% | 0% | +25% ⚑ |
| records-10k/records/edit-cell@orders | 337 | +3% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 401 | −2% | +1% | n/a¹ |
| records-1k/load/paint | 875 | −2% | 0% | −16% ⚑ |
| records-plain/records/sort-header@orders30 | 99.7 | +1% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 48.5 | −3% | 0% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −57% · −57% · −58% · −58% · −57% → −57% (426 / 1002 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (398 / 13347 ms) — every repeat agrees
- complexLogic/load/paint (month): −84% · −85% · −84% · −85% · −85% → −85% (1574 / 10170 ms) — every repeat agrees
- expressions/load/paint (month): −41% · −41% · −41% · −41% · −41% → −41% (3783 / 6365 ms) — every repeat agrees
- large/load/paint (month): −50% · −51% · −50% · −50% · −51% → −50% (1133 / 2277 ms) — every repeat agrees
- manyPages/load/paint (month): −30% · −28% · −29% · −30% · −29% → −29% (482 / 681 ms) — every repeat agrees
- records-10k/load/paint (month): +26% · +25% · +26% · +25% · +25% → +25% (2581 / 2059 ms) — not every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
