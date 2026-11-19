# survey-library · survey-js-ui · 19.11.2026 12:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44528144116

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 659 | 0% | −1% | 🟢 **−57%** 🟢 **work** ʳ |
| complexLogic/answer/first | 217 | −1% | 0% | 🟢 **−95%** 🟢 **work** ʳ |
| complexLogic/answer/type | 388 | 0% | −4% | 🟢 **−97%** 🟢 **work** ʳ |
| complexLogic/load/paint | 2912 | 0% | −2% | 🟢 **−79%** ʳ |
| expressions/load/paint | 3917 | 0% | +2% | 🟢 **−37%** ʳ |
| large/load/paint | 1053 | −1% | −8% | 🟢 **−26%** ʳ |
| manyPages/load/paint | 817 | 0% | −6% | −11% |
| manyPages/pages/locale | 96.2 | 0% | 0% | −20% |
| manyPages/pages/next10 | 217 | +3% | −1% | −9% |
| records-10k/load/paint | 1299 | 🟢 **−28%** ʳ | 🟢 **−27%** ʳ | +7% 🔴 **work** ⚑ |
| records-10k/records/add-row@orders | 295 | −1% | −2% | n/a¹ |
| records-10k/records/edit-cell@orders | 487 | −1% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 491 | −2% | −1% | n/a¹ |
| records-10k/records/last@orders | 244 | −2% | +3% | n/a¹ |
| records-10k/records/next@orders | 362 | +1% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 257 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 1399 | −6% | −5% | +8% 🔴 **work** ⚑ |
| records-1k/records/next@ordersPanel | 86.9 | −4% | −2% | n/a¹ |
| records-plain/records/next@panelsPaged | 47.3 | 0% | 0% | n/a² |
| records-plain/records/sort-1@panels30 | 107 | +1% | 0% | n/a² |
| records-plain/records/sort-1@panelsPaged | 48.1 | 0% | 0% | n/a² |
| records-plain/records/sort-header@orders30 | 182 | −4% | +1% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 80.7 | −1% | +1% | n/a³ |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: paneldynamic.allowSort
- ³ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction
⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today

## ⚑ jsonErrors differ
- records-10k/load/paint (30D): jsonErrors differ from today
- records-1k/load/paint (30D): jsonErrors differ from today

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 659 | 1518 | −57% | −57% | −57% | −56% | −56% | −57% | yes |
| complexLogic/answer/first | 30D | 221 | 4638 | −95% | −96% | −95% | −95% | −95% | −95% | yes |
| complexLogic/answer/type | 30D | 409 | 13814 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 2918 | 14232 | −79% | −79% | −79% | −79% | −79% | −79% | yes |
| expressions/load/paint | 30D | 3959 | 6295 | −37% | −38% | −37% | −37% | −37% | −38% | yes |
| large/load/paint | 30D | 1053 | 1433 | −26% | −27% | −27% | −26% | −26% | −26% | yes |
| records-10k/load/paint | 1D | 1291 | 1790 | −28% | −27% | −28% | −29% | −28% | −27% | yes |
| records-10k/load/paint | 7D | 1299 | 1787 | −27% | −27% | −27% | −28% | −27% | −28% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 5169 → 2401 (work)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2418 → 251 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 7024 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40040 → 40080 (work), expressionRuns 320 → 80940 (work), panelsCreated 0 → 10 (work)
- records-1k/load/paint (30D): conditionRuns 4040 → 4080 (work), expressionRuns 320 → 8940 (work), panelsCreated 0 → 10 (work)

Δ = today / build − 1.
