# survey-library · react · 17.11.2026 20:28 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 7763 × 27, AMD EPYC 9V74 × 21, AMD EPYC 9V45 × 9, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44169583629

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 5694 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 2083 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 2099 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 3175 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 756 | −1% | +1% | 🟢 **−53%** ʳ |
| complexLogic/answer/first | 245 | 0% | 0% | 🟢 **−95%** ʳ |
| complexLogic/answer/type | 389 | +2% | −1% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1536 | −1% | −1% | 🟢 **−85%** ʳ |
| expressions/load/paint | 5864 | 0% | +1% | 🟢 **−39%** ʳ |
| large/load/paint | 1183 | −1% | −1% | 🟢 **−50%** ʳ |
| manyPages/load/paint | 894 | −1% | 0% | 🟢 **−28%** ʳ |
| manyPages/pages/locale | 91.8 | −2% | +1% | −16% |
| manyPages/pages/next10 | 258 | +3% | −1% | −8% |
| manyPages/pages/preview | 6116 | 0% | 0% | −25% |
| records-10k/load/paint | 3177 | 0% | −1% | 🔴 **+27%** ʳ ⚑ |
| records-10k/records/add-row@orders | 291 | +1% | 0% | n/a¹ |
| records-10k/records/edit-cell@orders | 298 | 0% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 488 | +2% | +2% | n/a¹ |
| records-10k/records/last@orders | 441 | 0% | +1% | n/a¹ |
| records-10k/records/next@orders | 415 | +1% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 256 | +2% | −2% | n/a¹ |
| records-1k/load/paint | 747 | +1% | +1% | 🟢 **−28%** ʳ ⚑ |
| records-1k/records/next@ordersPanel | 48.1 | 0% | −1% | n/a¹ |
| records-plain/records/next@panelsPaged | 56.8 | +2% | −2% | n/a² |
| records-plain/records/sort-1@panels30 | 109 | +1% | 0% | n/a² |
| records-plain/records/sort-1@panelsPaged | 48.3 | −3% | +5% | n/a² |
| records-plain/records/sort-header@orders30 | 161 | 0% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 74.6 | 0% | −3% | n/a³ |

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
- calculations/load/paint (month): −54% · −54% · −53% · −53% · −54% → −53% (761 / 1636 ms) — every repeat agrees
- complexLogic/answer/first (month): −95% · −95% · −95% · −94% · −95% → −95% (233 / 4713 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (387 / 13118 ms) — every repeat agrees
- complexLogic/load/paint (month): −85% · −85% · −85% · −85% · −85% → −85% (1529 / 10034 ms) — every repeat agrees
- expressions/load/paint (month): −38% · −39% · −39% · −39% · −38% → −39% (5872 / 9551 ms) — every repeat agrees
- large/load/paint (month): −50% · −50% · −50% · −50% · −50% → −50% (1182 / 2357 ms) — every repeat agrees
- manyPages/load/paint (month): −26% · −29% · −27% · −28% · −29% → −28% (888 / 1230 ms) — every repeat agrees
- manyPages/pages/preview (month): −24% · −26% · −25% · −26% · −25% → −25% (6129 / 8203 ms) — not every repeat agrees
- records-10k/load/paint (month): +31% · +25% · +26% · +27% · +26% → +27% (3175 / 2505 ms) — every repeat agrees
- records-1k/load/paint (month): −27% · −28% · −29% · −28% · −28% → −28% (746 / 1035 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
