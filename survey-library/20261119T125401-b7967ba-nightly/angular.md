# survey-library · angular · 19.11.2026 12:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44528144116

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 598 | +1% | +1% | 🟢 **−47%** 🟢 **work** ʳ |
| complexLogic/answer/type | 634 | −1% | 0% | 🟢 **−97%** 🟢 **work** ʳ |
| complexLogic/load/paint | 1533 | −1% | −1% | 🟢 **−84%** ʳ |
| expressions/load/paint | 6104 | −1% | +2% | 🟢 **−34%** ʳ |
| large/load/paint | 574 | −1% | −7% | 🟢 **−27%** ʳ |
| manyPages/load/paint | 818 | 0% | −6% | −8% |
| manyPages/pages/next10 | 637 | +1% | +2% | −4% |
| records-10k/load/paint | 2068 | −24% | −23% | +12% 🔴 **work** ⚑ |
| records-10k/records/edit-cell@orders | 516 | −2% | +1% | n/a¹ |
| records-10k/records/sort-header@orders | 375 | +1% | 0% | n/a¹ |
| records-1k/load/paint | 1288 | −2% | −3% | +5% 🔴 **work** ⚑ |
| records-plain/records/sort-header@orders30 | 154 | −1% | 0% | n/a² |
| records-plain/records/sort-header@ordersPaged | 65.5 | +1% | +1% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

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
| calculations/load/paint | 30D | 598 | 1120 | −47% | −45% | −46% | −48% | −48% | −45% | yes |
| complexLogic/answer/type | 30D | 639 | 18750 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 1539 | 9807 | −84% | −84% | −84% | −84% | −84% | −84% | yes |
| expressions/load/paint | 30D | 6067 | 9248 | −34% | −35% | −35% | −35% | −34% | −35% | yes |
| large/load/paint | 30D | 564 | 770 | −27% | −27% | −27% | −26% | −25% | −27% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 5169 → 2401 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 7024 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40040 → 40080 (work), expressionRuns 320 → 80940 (work), panelsCreated 0 → 10 (work)
- records-1k/load/paint (30D): conditionRuns 4040 → 4080 (work), expressionRuns 320 → 8940 (work), panelsCreated 0 → 10 (work)

Δ = today / build − 1.
