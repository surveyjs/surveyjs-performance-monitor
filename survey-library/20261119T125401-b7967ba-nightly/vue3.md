# survey-library · vue3 · 19.11.2026 12:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44528144116

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 609 | −1% | +1% | 🟢 **−52%** 🟢 **work** ʳ |
| complexLogic/answer/type | 669 | 0% | −1% | 🟢 **−97%** 🟢 **work** ʳ |
| complexLogic/load/paint | 2838 | 0% | −1% | 🟢 **−79%** ʳ |
| expressions/load/paint | 3943 | 0% | +1% | 🟢 **−36%** ʳ |
| large/load/paint | 550 | −1% | −8% | 🟢 **−26%** ʳ |
| manyPages/load/paint | 454 | 0% | −3% | −11% |
| manyPages/pages/next10 | 517 | 0% | −6% | −9% |
| records-10k/load/paint | 1346 | 🟢 **−26%** ʳ | 🟢 **−27%** ʳ | +7% 🔴 **work** ⚑ |
| records-10k/records/edit-cell@orders | 301 | −1% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 512 | −1% | 0% | n/a¹ |
| records-1k/load/paint | 1073 | −6% | −5% | +8% 🔴 **work** ⚑ |
| records-plain/records/sort-header@orders30 | 185 | +3% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 48.6 | −1% | 0% | n/a² |

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
| calculations/load/paint | 30D | 610 | 1261 | −52% | −52% | −50% | −51% | −52% | −52% | yes |
| complexLogic/answer/type | 30D | 661 | 19720 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 2849 | 13780 | −79% | −79% | −80% | −79% | −79% | −79% | yes |
| expressions/load/paint | 30D | 3957 | 6204 | −36% | −36% | −36% | −36% | −36% | −36% | yes |
| large/load/paint | 30D | 553 | 750 | −26% | −25% | −27% | −27% | −26% | −26% | yes |
| records-10k/load/paint | 1D | 1347 | 1830 | −26% | −26% | −26% | −26% | −25% | −27% | yes |
| records-10k/load/paint | 7D | 1342 | 1835 | −27% | −27% | −27% | −27% | −26% | −27% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 5169 → 2401 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 7024 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40040 → 40080 (work), expressionRuns 320 → 80940 (work), panelsCreated 0 → 10 (work)
- records-1k/load/paint (30D): conditionRuns 4040 → 4080 (work), expressionRuns 320 → 8940 (work), panelsCreated 0 → 10 (work)

Δ = today / build − 1.
