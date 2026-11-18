# survey-library · survey-js-ui · 17.11.2026 23:20 UTC

> CPU: Intel Xeon 6975P-C × 75, AMD EPYC 9V74 × 21, AMD EPYC 7763 × 15, AMD EPYC 9V45 × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3, INTEL XEON PLATINUM 8573C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44198421945

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 4148 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1586 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1579 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2611 | 12 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 409 | 0% | +2% | 🟢 **−59%** ʳ |
| complexLogic/answer/first | 218 | −1% | −1% | 🟢 **−95%** ʳ |
| complexLogic/answer/type | 389 | 0% | +2% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 2205 | +1% | +1% | 🟢 **−80%** ʳ |
| expressions/load/paint | 6072 | 0% | +2% | 🟢 **−37%** ʳ |
| large/load/paint | 1149 | −1% | −2% | 🟢 **−50%** ʳ |
| manyPages/load/paint | 647 | 0% | −1% | 🟢 **−28%** ʳ |
| manyPages/pages/locale | 65.5 | +5% | −3% | −21% |
| manyPages/pages/next10 | 205 | +3% | 0% | −8% |
| records-10k/load/paint | 2445 | −1% | 0% | 🔴 **+26%** ʳ ⚑ |
| records-10k/records/add-row@orders | 286 | −1% | 0% | n/a¹ |
| records-10k/records/edit-cell@orders | 302 | −1% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 830 | −1% | +2% | n/a¹ |
| records-10k/records/last@orders | 247 | +1% | +2% | n/a¹ |
| records-10k/records/next@orders | 430 | −1% | +1% | n/a¹ |
| records-10k/records/sort-header@orders | 468 | −1% | 0% | n/a¹ |
| records-1k/load/paint | 787 | 0% | +1% | 🟢 **−27%** ʳ ⚑ |
| records-1k/records/next@ordersPanel | 48.6 | −2% | −1% | n/a¹ |
| records-plain/records/next@panelsPaged | 44.6 | −3% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 134 | 0% | −2% | n/a² |
| records-plain/records/sort-1@panelsPaged | 47.6 | +1% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 97.3 | −1% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 44.3 | +2% | +1% | n/a³ |

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
- calculations/load/paint (month): −59% · −59% · −59% · −59% · −59% → −59% (410 / 1004 ms) — every repeat agrees
- complexLogic/answer/first (month): −95% · −95% · −95% · −95% · −95% → −95% (238 / 4710 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (386 / 13117 ms) — every repeat agrees
- complexLogic/load/paint (month): −81% · −80% · −81% · −80% · −80% → −80% (2238 / 11330 ms) — every repeat agrees
- expressions/load/paint (month): −38% · −37% · −37% · −38% · −36% → −37% (6023 / 9615 ms) — every repeat agrees
- large/load/paint (month): −51% · −50% · −50% · −50% · −50% → −50% (1150 / 2310 ms) — every repeat agrees
- manyPages/load/paint (month): −28% · −29% · −29% · −28% · −27% → −28% (638 / 892 ms) — every repeat agrees
- records-10k/load/paint (month): +25% · +26% · +27% · +26% · +27% → +26% (2446 / 1940 ms) — every repeat agrees
- records-1k/load/paint (month): −27% · −26% · −27% · −26% · −27% → −27% (791 / 1077 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
