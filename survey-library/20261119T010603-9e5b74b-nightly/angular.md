# survey-library · angular · 19.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44434251526

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 489 | 0% | −1% | 🟢 **−54%** ʳ |
| complexLogic/answer/type | 420 | +1% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1557 | −1% | 0% | 🟢 **−84%** ʳ |
| expressions/load/paint | 6469 | 0% | 0% | 🟢 **−32%** ʳ |
| large/load/paint | 578 | −1% | −7% | 🟢 **−26%** ʳ |
| manyPages/load/paint | 563 | +1% | −6% | −7% |
| manyPages/pages/next10 | 621 | +1% | 0% | −6% |
| records-10k/load/paint | 2075 | −24% | −23% | +12% ⚑ |
| records-10k/records/edit-cell@orders | 374 | +1% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 509 | 0% | +1% | n/a¹ |
| records-1k/load/paint | 942 | −5% | −4% | +3% ⚑ |
| records-plain/records/sort-header@orders30 | 149 | −1% | +2% | n/a² |
| records-plain/records/sort-header@ordersPaged | 102 | 0% | +2% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction
⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today

## ⚑ jsonErrors differ
- records-10k/load/paint (30D): jsonErrors differ from today
- records-1k/load/paint (30D): jsonErrors differ from today

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 485 | 1062 | −54% | −54% | −54% | −55% | −54% | −55% | yes |
| complexLogic/answer/type | 30D | 398 | 13221 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 1529 | 9743 | −84% | −84% | −84% | −84% | −84% | −84% | yes |
| expressions/load/paint | 30D | 6459 | 9559 | −32% | −32% | −32% | −33% | −32% | −33% | yes |
| large/load/paint | 30D | 573 | 777 | −26% | −27% | −25% | −25% | −26% | −26% | yes |

## Work counters (information)
- calculations/load/paint (30D): expressionRuns 5169 → 2401
- complexLogic/answer/type (30D): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (30D): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (30D): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
