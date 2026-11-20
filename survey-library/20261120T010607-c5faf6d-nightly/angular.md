# survey-library · angular · 20.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44651017293

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 480 | −1% | −2% | 🟢 **−48%** 🟢 **work** ʳ |
| complexLogic/answer/type | 435 | −1% | −1% | 🟢 **−71%** 🟢 **work** ʳ |
| complexLogic/load/paint | 2754 | 0% | 0% | 🟢 **−60%** ʳ |
| expressions/load/paint | 5022 | −1% | 0% | 🟢 **−27%** ʳ |
| large/load/paint | 587 | 0% | −7% | −20% |
| manyPages/load/paint | 510 | +4% | −3% | −7% |
| manyPages/pages/next10 | 376 | −7% | −3% | −17% |
| records-10k/load/paint | 2057 | −4% | −26% | −3% 🔴 **work** |
| records-10k/records/edit-cell@orders | 302 | −20% | −19% | +5% 🔴 **work** |
| records-10k/records/sort-header@orders | 261 | −7% | −5% | n/a¹ |
| records-1k/load/paint | 903 | −5% | −8% | −13% 🔴 **work** |
| records-plain/records/sort-header@orders30 | 102 | 🟢 **−34%** ʳ | 🟢 **−35%** ʳ | n/a² |
| records-plain/records/sort-header@ordersPaged | 46.3 | −27% | −30% | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 476 | 908 | −48% | −47% | −48% | −48% | −47% | −48% | yes |
| complexLogic/answer/type | 30D | 422 | 1441 | −71% | −71% | −70% | −70% | −71% | −70% | yes |
| complexLogic/load/paint | 30D | 2756 | 6933 | −60% | −60% | −60% | −60% | −60% | −61% | yes |
| expressions/load/paint | 30D | 4887 | 6711 | −27% | −28% | −27% | −26% | −30% | −27% | yes |
| records-10k/load/paint | 7D | 2024 | 2728 | −26% | −24% | −28% | −25% | −25% | −26% | no |
| records-plain/records/sort-header@orders30 | 1D | 102 | 156 | −34% | −34% | −33% | −36% | −34% | −35% | yes |
| records-plain/records/sort-header@orders30 | 7D | 103 | 157 | −35% | −34% | −33% | −38% | −36% | −36% | yes |
| records-plain/records/sort-header@ordersPaged | 1D | 46 | 62.6 | −27% | −27% | −22% | −25% | −29% | −28% | no |
| records-plain/records/sort-header@ordersPaged | 7D | 46.5 | 66.3 | −30% | −31% | −30% | −25% | −26% | −31% | no |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)

Δ = today / build − 1.
