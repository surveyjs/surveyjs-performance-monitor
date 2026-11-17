# survey-library · survey-js-ui · 17.11.2026 21:58 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 9V74 × 26, AMD EPYC 9V45 × 16, AMD EPYC 7763 × 16, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 2 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44185307540

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 4101 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1559 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1552 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2699 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 391 | −1% | +1% | 🟢 **−60%** ʳ |
| complexLogic/answer/first | 370 | −1% | +1% | 🟢 **−94%** ʳ |
| complexLogic/answer/type | 432 | 0% | +3% | 🟢 **−96%** ʳ |
| complexLogic/load/paint | 2616 | −1% | 0% | 🟢 **−82%** ʳ |
| expressions/load/paint | 6528 | +1% | 0% | 🟢 **−37%** ʳ |
| large/load/paint | 572 | −4% | −2% | 🟢 **−55%** ʳ |
| manyPages/load/paint | 478 | −1% | 0% | 🟢 **−29%** ʳ |
| manyPages/pages/locale | 64.4 | +8% | +3% | −22% |
| manyPages/pages/next10 | 222 | −3% | −1% | −5% |
| records-10k/load/paint | 1808 | 0% | 0% | +14% ⚑ |
| records-10k/records/add-row@orders | 295 | +2% | −1% | n/a¹ |
| records-10k/records/edit-cell@orders | 288 | 0% | +2% | n/a¹ |
| records-10k/records/filter-set@orders | 493 | +3% | 0% | n/a¹ |
| records-10k/records/last@orders | 408 | 0% | −1% | n/a¹ |
| records-10k/records/next@orders | 227 | +1% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 253 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 1064 | 0% | +1% | −18% ⚑ |
| records-1k/records/next@ordersPanel | 48.6 | +2% | +1% | n/a¹ |
| records-plain/records/next@panelsPaged | 60.4 | +2% | +4% | n/a² |
| records-plain/records/sort-1@panels30 | 98.5 | 0% | 0% | n/a² |
| records-plain/records/sort-1@panelsPaged | 49.3 | 0% | +1% | n/a² |
| records-plain/records/sort-header@orders30 | 102 | +2% | −1% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 60.6 | +1% | −1% | n/a³ |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: paneldynamic.allowSort
- ³ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −59% · −60% · −60% · −61% · −60% → −60% (391 / 982 ms) — every repeat agrees
- complexLogic/answer/first (month): −94% · −94% · −94% · −94% · −94% → −94% (368 / 6228 ms) — every repeat agrees
- complexLogic/answer/type (month): −96% · −96% · −96% · −96% · −96% → −96% (413 / 10927 ms) — every repeat agrees
- complexLogic/load/paint (month): −81% · −82% · −82% · −81% · −82% → −82% (2582 / 14034 ms) — every repeat agrees
- expressions/load/paint (month): −41% · −40% · −37% · −37% · −37% → −37% (5931 / 9448 ms) — every repeat agrees
- large/load/paint (month): −56% · −55% · −54% · −55% · −54% → −55% (573 / 1265 ms) — every repeat agrees
- manyPages/load/paint (month): −28% · −30% · −28% · −30% · −30% → −29% (480 / 678 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
