# survey-library · survey-js-ui · 17.11.2026 20:28 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 7763 × 27, AMD EPYC 9V74 × 21, AMD EPYC 9V45 × 9, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44169583629

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 3969 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1530 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1531 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2588 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 777 | −1% | 0% | 🟢 **−53%** ʳ |
| complexLogic/answer/first | 234 | 0% | +4% | 🟢 **−95%** ʳ |
| complexLogic/answer/type | 496 | 0% | −2% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1579 | −1% | 0% | 🟢 **−84%** ʳ |
| expressions/load/paint | 3873 | +1% | 0% | 🟢 **−40%** ʳ |
| large/load/paint | 1120 | −2% | −1% | 🟢 **−51%** ʳ |
| manyPages/load/paint | 517 | −1% | −2% | −25% |
| manyPages/pages/locale | 93.3 | −4% | −1% | −24% |
| manyPages/pages/next10 | 213 | +1% | 0% | −9% |
| records-10k/load/paint | 2482 | 0% | 0% | +25% ⚑ |
| records-10k/records/add-row@orders | 517 | −1% | +1% | n/a¹ |
| records-10k/records/edit-cell@orders | 475 | −1% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 631 | 0% | −1% | n/a¹ |
| records-10k/records/last@orders | 243 | 0% | +1% | n/a¹ |
| records-10k/records/next@orders | 229 | +1% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 253 | −1% | −2% | n/a¹ |
| records-1k/load/paint | 767 | +1% | 0% | 🟢 **−28%** ʳ ⚑ |
| records-1k/records/next@ordersPanel | 90.9 | +1% | +1% | n/a¹ |
| records-plain/records/next@panelsPaged | 45.7 | +3% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 139 | +1% | −1% | n/a² |
| records-plain/records/sort-1@panelsPaged | 87 | −3% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 143 | 0% | −1% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 79.6 | 0% | −2% | n/a³ |

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
- calculations/load/paint (month): −53% · −53% · −54% · −53% · −53% → −53% (780 / 1658 ms) — every repeat agrees
- complexLogic/answer/first (month): −96% · −95% · −95% · −95% · −95% → −95% (239 / 4505 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (490 / 14393 ms) — every repeat agrees
- complexLogic/load/paint (month): −85% · −84% · −84% · −84% · −85% → −84% (1591 / 10206 ms) — every repeat agrees
- expressions/load/paint (month): −41% · −41% · −40% · −40% · −40% → −40% (3866 / 6491 ms) — every repeat agrees
- large/load/paint (month): −51% · −51% · −51% · −50% · −50% → −51% (1119 / 2262 ms) — every repeat agrees
- manyPages/load/paint (month): −23% · −25% · −28% · −24% · −27% → −25% (517 / 693 ms) — not every repeat agrees
- records-1k/load/paint (month): −28% · −27% · −27% · −28% · −27% → −28% (766 / 1058 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
