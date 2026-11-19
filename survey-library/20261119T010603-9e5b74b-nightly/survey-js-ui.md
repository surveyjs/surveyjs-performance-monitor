# survey-library · survey-js-ui · 19.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44434251526

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 401 | 0% | −1% | 🟢 **−59%** ʳ |
| complexLogic/answer/first | 363 | +2% | +1% | 🟢 **−94%** ʳ |
| complexLogic/answer/type | 403 | +1% | +2% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 2718 | −2% | −2% | 🟢 **−80%** ʳ |
| expressions/load/paint | 3896 | −1% | +2% | 🟢 **−36%** ʳ |
| large/load/paint | 526 | +1% | −8% | −27% |
| manyPages/load/paint | 839 | 0% | −5% | −11% |
| manyPages/pages/locale | 57.5 | −3% | −1% | −17% |
| manyPages/pages/next10 | 233 | 0% | +1% | −6% |
| records-10k/load/paint | 1562 | −23% | −20% | +22% ⚑ |
| records-10k/records/add-row@orders | 288 | −2% | −2% | n/a¹ |
| records-10k/records/edit-cell@orders | 421 | +1% | +2% | n/a¹ |
| records-10k/records/filter-set@orders | 480 | −1% | −1% | n/a¹ |
| records-10k/records/last@orders | 247 | +1% | +1% | n/a¹ |
| records-10k/records/next@orders | 424 | +1% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 341 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 707 | −7% | −6% | +2% ⚑ |
| records-1k/records/next@ordersPanel | 48.4 | +1% | −2% | n/a¹ |
| records-plain/records/next@panelsPaged | 50.9 | +1% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 113 | −3% | −1% | n/a² |
| records-plain/records/sort-1@panelsPaged | 48.3 | −1% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 120 | +1% | +1% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 45 | +2% | 0% | n/a³ |

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
| calculations/load/paint | 30D | 408 | 988 | −59% | −60% | −58% | −59% | −59% | −59% | yes |
| complexLogic/answer/first | 30D | 361 | 6202 | −94% | −94% | −94% | −94% | −94% | −94% | yes |
| complexLogic/answer/type | 30D | 406 | 13815 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 2720 | 13698 | −80% | −80% | −80% | −80% | −80% | −80% | yes |
| expressions/load/paint | 30D | 3862 | 6077 | −36% | −37% | −38% | −36% | −35% | −36% | yes |
| large/load/paint | 30D | 527 | 722 | −27% | −23% | −26% | −28% | −28% | −28% | no |

## Work counters (information)
- calculations/load/paint (30D): expressionRuns 5169 → 2401
- complexLogic/answer/first (30D): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/type (30D): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (30D): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (30D): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
