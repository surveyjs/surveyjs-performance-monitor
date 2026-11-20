# survey-library · vue3 · 20.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44651017293

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 430 | +2% | +1% | 🟢 **−49%** 🟢 **work** ʳ |
| complexLogic/answer/type | 577 | +4% | +5% | 🟢 **−71%** 🟢 **work** ʳ |
| complexLogic/load/paint | 2847 | 0% | 0% | 🟢 **−59%** ʳ |
| expressions/load/paint | 3926 | −1% | +3% | −26% |
| large/load/paint | 576 | +1% | −6% | −21% |
| manyPages/load/paint | 465 | +2% | −3% | −7% |
| manyPages/pages/next10 | 304 | −2% | −6% | −10% |
| records-10k/load/paint | 1342 | −1% | 🟢 **−26%** ʳ | −3% 🔴 **work** |
| records-10k/records/edit-cell@orders | 497 | 0% | −2% | 🔴 **+51%** 🔴 **work** ʳ |
| records-10k/records/sort-header@orders | 284 | 0% | +1% | n/a¹ |
| records-1k/load/paint | 1012 | −2% | −3% | −7% 🔴 **work** |
| records-plain/records/sort-header@orders30 | 88.4 | +1% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 45 | −5% | +2% | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 429 | 834 | −49% | −48% | −48% | −49% | −49% | −49% | yes |
| complexLogic/answer/type | 30D | 524 | 1778 | −71% | −72% | −71% | −71% | −72% | −71% | yes |
| complexLogic/load/paint | 30D | 2861 | 7027 | −59% | −59% | −62% | −59% | −60% | −59% | yes |
| expressions/load/paint | 30D | 3974 | 5365 | −26% | −26% | −25% | −27% | −25% | −27% | no |
| records-10k/load/paint | 7D | 1349 | 1834 | −26% | −27% | −26% | −26% | −26% | −26% | yes |
| records-10k/records/edit-cell@orders | 30D | 496 | 329 | +51% | +48% | +49% | +56% | +46% | +53% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)

Δ = today / build − 1.
