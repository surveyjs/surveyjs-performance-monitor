# survey-library · react · 17.11.2026 21:58 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 9V74 × 26, AMD EPYC 9V45 × 16, AMD EPYC 7763 × 16, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 2 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44185307540

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 6274 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 2256 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 2280 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 3880 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 371 | 0% | +1% | 🟢 **−61%** ʳ |
| complexLogic/answer/first | 402 | −4% | 0% | 🟢 **−94%** ʳ |
| complexLogic/answer/type | 644 | +1% | +2% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 2783 | −2% | 0% | 🟢 **−81%** ʳ |
| expressions/load/paint | 6093 | 0% | 0% | 🟢 **−37%** ʳ |
| large/load/paint | 824 | −1% | −2% | 🟢 **−53%** ʳ |
| manyPages/load/paint | 878 | −1% | 0% | 🟢 **−27%** ʳ |
| manyPages/pages/locale | 53.3 | −1% | +1% | −20% |
| manyPages/pages/next10 | 325 | 0% | +2% | −7% |
| manyPages/pages/preview | 6959 | +1% | 0% | −25% |
| records-10k/load/paint | 2438 | 0% | 0% | 🔴 **+28%** ʳ ⚑ |
| records-10k/records/add-row@orders | 296 | 0% | −1% | n/a¹ |
| records-10k/records/edit-cell@orders | 468 | +1% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 495 | +1% | 0% | n/a¹ |
| records-10k/records/last@orders | 228 | −1% | 0% | n/a¹ |
| records-10k/records/next@orders | 456 | +2% | −2% | n/a¹ |
| records-10k/records/sort-header@orders | 281 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 765 | +1% | +1% | 🟢 **−27%** ʳ ⚑ |
| records-1k/records/next@ordersPanel | 46.6 | −4% | 0% | n/a¹ |
| records-plain/records/next@panelsPaged | 43.4 | −1% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 133 | 0% | 0% | n/a² |
| records-plain/records/sort-1@panelsPaged | 49.3 | +1% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 92.3 | −2% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 46 | −2% | 0% | n/a³ |

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
- calculations/load/paint (month): −62% · −62% · −61% · −61% · −61% → −61% (372 / 965 ms) — every repeat agrees
- complexLogic/answer/first (month): −94% · −94% · −94% · −93% · −94% → −94% (402 / 6436 ms) — every repeat agrees
- complexLogic/answer/type (month): −96% · −97% · −97% · −97% · −97% → −97% (636 / 18568 ms) — every repeat agrees
- complexLogic/load/paint (month): −81% · −81% · −81% · −81% · −81% → −81% (2803 / 14661 ms) — every repeat agrees
- expressions/load/paint (month): −37% · −38% · −38% · −38% · −34% → −37% (6150 / 9815 ms) — every repeat agrees
- large/load/paint (month): −52% · −53% · −52% · −54% · −52% → −53% (834 / 1758 ms) — every repeat agrees
- manyPages/load/paint (month): −27% · −28% · −27% · −27% · −28% → −27% (876 / 1207 ms) — every repeat agrees
- records-10k/load/paint (month): +27% · +27% · +28% · +27% · +28% → +28% (2456 / 1925 ms) — every repeat agrees
- records-1k/load/paint (month): −28% · −27% · −27% · −26% · −27% → −27% (781 / 1065 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
