# survey-library · vue3 · 17.11.2026 23:20 UTC

> CPU: Intel Xeon 6975P-C × 75, AMD EPYC 9V74 × 21, AMD EPYC 7763 × 15, AMD EPYC 9V45 × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3, INTEL XEON PLATINUM 8573C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44198421945

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 2637 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 931 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 925 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 1936 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 434 | 0% | +1% | 🟢 **−57%** ʳ |
| complexLogic/answer/type | 472 | −1% | +3% | 🟢 **−96%** ʳ |
| complexLogic/load/paint | 1503 | −1% | −1% | 🟢 **−85%** ʳ |
| expressions/load/paint | 6169 | 0% | +1% | 🟢 **−36%** ʳ |
| large/load/paint | 596 | −3% | −3% | 🟢 **−54%** ʳ |
| manyPages/load/paint | 492 | 0% | 0% | 🟢 **−29%** ʳ |
| manyPages/pages/next10 | 470 | −1% | +5% | −10% |
| records-10k/load/paint | 1933 | 0% | 0% | +26% ⚑ |
| records-10k/records/edit-cell@orders | 300 | −2% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 285 | +1% | −1% | n/a¹ |
| records-1k/load/paint | 854 | 0% | +1% | −25% ⚑ |
| records-plain/records/sort-header@orders30 | 95.1 | +2% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 49.1 | −1% | +2% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −57% · −57% · −57% · −57% · −57% → −57% (435 / 1013 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −96% · −96% · −97% · −97% → −96% (465 / 13252 ms) — every repeat agrees
- complexLogic/load/paint (month): −85% · −85% · −85% · −85% · −85% → −85% (1518 / 10005 ms) — every repeat agrees
- expressions/load/paint (month): −36% · −36% · −35% · −36% · −36% → −36% (6206 / 9650 ms) — every repeat agrees
- large/load/paint (month): −53% · −54% · −55% · −53% · −54% → −54% (598 / 1286 ms) — every repeat agrees
- manyPages/load/paint (month): −29% · −29% · −28% · −30% · −31% → −29% (488 / 691 ms) — every repeat agrees
- records-10k/load/paint (month): +20% · +20% · +27% · +26% · +28% → +26% (1933 / 1530 ms) — not every repeat agrees
- records-1k/load/paint (month): −25% · −25% · −25% · −25% · −25% → −25% (854 / 1140 ms) — not every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
