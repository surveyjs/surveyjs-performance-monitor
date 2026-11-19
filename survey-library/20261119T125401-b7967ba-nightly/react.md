# survey-library · react · 19.11.2026 12:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44528144116

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 389 | 0% | 0% | 🟢 **−61%** 🟢 **work** ʳ |
| complexLogic/answer/first | 375 | +1% | 0% | 🟢 **−94%** 🟢 **work** ʳ |
| complexLogic/answer/type | 666 | 0% | +1% | 🟢 **−97%** 🟢 **work** ʳ |
| complexLogic/load/paint | 2240 | −1% | −2% | 🟢 **−80%** ʳ |
| expressions/load/paint | 3753 | 0% | +2% | 🟢 **−37%** ʳ |
| large/load/paint | 878 | −2% | −8% | 🟢 **−29%** ʳ |
| manyPages/load/paint | 515 | −1% | −5% | −10% |
| manyPages/pages/locale | 54.8 | +1% | +4% | −19% |
| manyPages/pages/next10 | 289 | 0% | +2% | −8% |
| manyPages/pages/preview | 6039 | +2% | +1% | −20% |
| records-10k/load/paint | 1258 | 🟢 **−28%** ʳ | 🟢 **−27%** ʳ | +8% 🔴 **work** ⚑ |
| records-10k/records/add-row@orders | 402 | +1% | 0% | n/a¹ |
| records-10k/records/edit-cell@orders | 403 | 0% | +1% | n/a¹ |
| records-10k/records/filter-set@orders | 467 | −3% | −2% | n/a¹ |
| records-10k/records/last@orders | 243 | −1% | +1% | n/a¹ |
| records-10k/records/next@orders | 235 | +2% | −1% | n/a¹ |
| records-10k/records/sort-header@orders | 449 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 710 | −6% | −5% | +3% 🔴 **work** ⚑ |
| records-1k/records/next@ordersPanel | 46.9 | −1% | −4% | n/a¹ |
| records-plain/records/next@panelsPaged | 45.8 | −1% | +2% | n/a² |
| records-plain/records/sort-1@panels30 | 182 | +1% | −2% | n/a² |
| records-plain/records/sort-1@panelsPaged | 46.1 | 0% | −1% | n/a² |
| records-plain/records/sort-header@orders30 | 88 | +1% | 0% | n/a³ |
| records-plain/records/sort-header@ordersPaged | 77.4 | +1% | +2% | n/a³ |

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
| calculations/load/paint | 30D | 385 | 983 | −61% | −61% | −61% | −60% | −61% | −61% | yes |
| complexLogic/answer/first | 30D | 374 | 6416 | −94% | −94% | −94% | −94% | −94% | −94% | yes |
| complexLogic/answer/type | 30D | 652 | 18941 | −97% | −96% | −97% | −97% | −97% | −96% | yes |
| complexLogic/load/paint | 30D | 2234 | 11117 | −80% | −80% | −80% | −80% | −80% | −80% | yes |
| expressions/load/paint | 30D | 3704 | 5839 | −37% | −36% | −36% | −36% | −37% | −37% | yes |
| large/load/paint | 30D | 889 | 1248 | −29% | −28% | −30% | −29% | −28% | −28% | yes |
| records-10k/load/paint | 1D | 1250 | 1746 | −28% | −28% | −32% | −28% | −28% | −27% | yes |
| records-10k/load/paint | 7D | 1259 | 1737 | −27% | −28% | −29% | −28% | −27% | −27% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 5169 → 2401 (work)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2418 → 251 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 7024 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40040 → 40080 (work), expressionRuns 320 → 80940 (work), panelsCreated 0 → 10 (work)
- records-1k/load/paint (30D): conditionRuns 4040 → 4080 (work), expressionRuns 320 → 8940 (work), panelsCreated 0 → 10 (work)

Δ = today / build − 1.
