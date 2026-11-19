# survey-library · vue3 · 19.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44434251526

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 462 | +1% | −1% | 🟢 **−51%** ʳ |
| complexLogic/answer/type | 574 | 0% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1539 | 0% | −1% | 🟢 **−84%** ʳ |
| expressions/load/paint | 3993 | 0% | +1% | 🟢 **−37%** ʳ |
| large/load/paint | 554 | 0% | −8% | −26% |
| manyPages/load/paint | 757 | 0% | −7% | −9% |
| manyPages/pages/next10 | 309 | −1% | −4% | −10% |
| records-10k/load/paint | 1355 | 🟢 **−27%** ʳ | 🟢 **−27%** ʳ | +7% ⚑ |
| records-10k/records/edit-cell@orders | 420 | 0% | +1% | n/a¹ |
| records-10k/records/sort-header@orders | 285 | 0% | +1% | n/a¹ |
| records-1k/load/paint | 794 | −6% | −5% | +4% ⚑ |
| records-plain/records/sort-header@orders30 | 95.1 | +2% | 0% | n/a² |
| records-plain/records/sort-header@ordersPaged | 46.9 | 0% | −2% | n/a² |

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
| calculations/load/paint | 30D | 460 | 939 | −51% | −51% | −52% | −51% | −51% | −52% | yes |
| complexLogic/answer/type | 30D | 575 | 18274 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/paint | 30D | 1539 | 9731 | −84% | −84% | −84% | −84% | −84% | −84% | yes |
| expressions/load/paint | 30D | 3988 | 6298 | −37% | −36% | −38% | −36% | −37% | −36% | yes |
| large/load/paint | 30D | 562 | 763 | −26% | −26% | −26% | −20% | −26% | −28% | no |
| records-10k/load/paint | 1D | 1357 | 1852 | −27% | −30% | −27% | −27% | −26% | −27% | yes |
| records-10k/load/paint | 7D | 1357 | 1851 | −27% | −26% | −27% | −27% | −27% | −26% | yes |

## Work counters (information)
- calculations/load/paint (30D): expressionRuns 5169 → 2401
- complexLogic/answer/type (30D): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (30D): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (30D): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
