# survey-library · react · 19.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44434251526

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 395 | −1% | 0% | 🟢 **−61%** ʳ |
| complexLogic/answer/first | 314 | 0% | +1% | 🟢 **−94%** ʳ |
| complexLogic/answer/type | 415 | −1% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1634 | 0% | −1% | 🟢 **−79%** ʳ |
| expressions/load/paint | 4042 | 0% | +1% | 🟢 **−37%** ʳ |
| large/load/paint | 557 | −1% | −7% | 🟢 **−27%** ʳ |
| manyPages/load/paint | 423 | 0% | −6% | −12% |
| manyPages/pages/locale | 67.8 | +4% | +13% | −15% |
| manyPages/pages/next10 | 200 | 0% | +2% | −11% |
| manyPages/pages/preview | 5947 | 0% | +1% | −20% |
| records-10k/load/paint | 1287 | 🟢 **−28%** ʳ | 🟢 **−27%** ʳ | +7% ⚑ |
| records-10k/records/add-row@orders | 280 | −1% | +1% | n/a¹ |
| records-10k/records/edit-cell@orders | 407 | 0% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 479 | −2% | −2% | n/a¹ |
| records-10k/records/last@orders | 440 | 0% | +1% | n/a¹ |
| records-10k/records/next@orders | 231 | +1% | +1% | n/a¹ |
| records-10k/records/sort-header@orders | 446 | +1% | −1% | n/a¹ |
| records-1k/load/paint | 707 | −6% | −6% | +3% ⚑ |
| records-1k/records/next@ordersPanel | 48 | 0% | −1% | n/a¹ |
| records-plain/records/next@panelsPaged | 43.2 | −1% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 124 | −1% | 0% | n/a² |
| records-plain/records/sort-1@panelsPaged | 49.7 | 0% | −1% | n/a² |
| records-plain/records/sort-header@orders30 | 86.3 | +2% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 81.9 | −1% | +1% | n/a³ |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: paneldynamic.allowSort
- ³ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction
⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today

## ⚑ jsonErrors differ
- records-10k/load/paint (30D): jsonErrors differ from today
- records-1k/load/paint (30D): jsonErrors differ from today

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 390 | 990 | −61% | −60% | −61% | −60% | −61% | −60% | yes |
| complexLogic/answer/first | 30D | 315 | 5173 | −94% | −94% | −94% | −94% | −94% | −94% | yes |
| complexLogic/answer/type | 30D | 411 | 13091 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 1622 | 7766 | −79% | −79% | −79% | −79% | −79% | −79% | yes |
| expressions/load/paint | 30D | 4041 | 6397 | −37% | −37% | −37% | −37% | −36% | −36% | yes |
| large/load/paint | 30D | 560 | 764 | −27% | −27% | −26% | −27% | −26% | −29% | yes |
| records-10k/load/paint | 1D | 1284 | 1774 | −28% | −27% | −27% | −28% | −27% | −28% | yes |
| records-10k/load/paint | 7D | 1288 | 1776 | −27% | −27% | −28% | −28% | −27% | −28% | yes |

## Work counters (information)
- calculations/load/paint (30D): expressionRuns 5169 → 2401
- complexLogic/answer/first (30D): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (30D): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (30D): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (30D): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
