# survey-library · react · 17.11.2026 23:20 UTC

> CPU: Intel Xeon 6975P-C × 75, AMD EPYC 9V74 × 21, AMD EPYC 7763 × 15, AMD EPYC 9V45 × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3, INTEL XEON PLATINUM 8573C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44198421945

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 6406 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 2339 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 2343 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 3292 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 383 | 0% | +1% | 🟢 **−61%** ʳ |
| complexLogic/answer/first | 269 | +1% | +1% | 🟢 **−94%** ʳ |
| complexLogic/answer/type | 422 | 0% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1673 | 0% | +1% | 🟢 **−80%** ʳ |
| expressions/load/paint | 6158 | −1% | 0% | 🟢 **−37%** ʳ |
| large/load/paint | 561 | −3% | −3% | 🟢 **−56%** ʳ |
| manyPages/load/paint | 534 | −1% | 0% | −27% |
| manyPages/pages/locale | 91.3 | +1% | +1% | −17% |
| manyPages/pages/next10 | 334 | 0% | 0% | −7% |
| manyPages/pages/preview | 8837 | +1% | 0% | −25% |
| records-10k/load/paint | 3138 | 0% | +1% | 🔴 **+26%** ʳ ⚑ |
| records-10k/records/add-row@orders | 290 | 0% | 0% | n/a¹ |
| records-10k/records/edit-cell@orders | 391 | +1% | 0% | n/a¹ |
| records-10k/records/filter-set@orders | 809 | 0% | 0% | n/a¹ |
| records-10k/records/last@orders | 406 | −1% | 0% | n/a¹ |
| records-10k/records/next@orders | 412 | +1% | −2% | n/a¹ |
| records-10k/records/sort-header@orders | 453 | +1% | 0% | n/a¹ |
| records-1k/load/paint | 747 | +1% | 0% | 🟢 **−28%** ʳ ⚑ |
| records-1k/records/next@ordersPanel | 50.6 | +1% | +1% | n/a¹ |
| records-plain/records/next@panelsPaged | 55.5 | 0% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 104 | −2% | +1% | n/a² |
| records-plain/records/sort-1@panelsPaged | 47.4 | +1% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 121 | −1% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 46.1 | +2% | +1% | n/a³ |

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
- calculations/load/paint (month): −62% · −61% · −61% · −61% · −61% → −61% (383 / 988 ms) — every repeat agrees
- complexLogic/answer/first (month): −94% · −94% · −94% · −95% · −94% → −94% (267 / 4552 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (415 / 13190 ms) — every repeat agrees
- complexLogic/load/paint (month): −80% · −80% · −80% · −81% · −81% → −80% (1674 / 8547 ms) — every repeat agrees
- expressions/load/paint (month): −37% · −36% · −37% · −36% · −36% → −37% (6857 / 10818 ms) — every repeat agrees
- large/load/paint (month): −55% · −57% · −54% · −57% · −54% → −56% (561 / 1263 ms) — every repeat agrees
- manyPages/load/paint (month): −29% · −27% · −26% · −28% · −25% → −27% (536 / 737 ms) — not every repeat agrees
- manyPages/pages/preview (month): −25% · −25% · −24% · −26% · −28% → −25% (8808 / 11822 ms) — not every repeat agrees
- records-10k/load/paint (month): +27% · +26% · +26% · +26% · +26% → +26% (3122 / 2478 ms) — every repeat agrees
- records-1k/load/paint (month): −28% · −27% · −28% · −28% · −27% → −28% (749 / 1033 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
