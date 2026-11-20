# survey-library · vue3 · 20.11.2026 11:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44731394759

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 844 | +2% | +2% | 🟢 **−41%** |
| complexLogic/answer/type | 412 | +3% | +3% | 🟢 **−71%** |
| complexLogic/load/paint | 1591 | +2% | 0% | 🟢 **−63%** |
| expressions/load/paint | 4637 | +1% | +2% | 🟢 **−27%** |
| large/load/paint | 556 | +1% | −7% | −21% |
| manyPages/load/paint | 521 | +4% | −1% | −4% |
| manyPages/pages/next10 | 292 | −1% | −3% | −8% |
| records-10k/load/paint | 1377 | +1% | 🟢 **−26%** | −3% |
| records-10k/records/edit-cell@orders | 560 | −1% | 0% | 🔴 **+58%** |
| records-10k/records/sort-header@orders | 289 | −1% | +1% | n/a¹ |
| records-1k/load/paint | 800 | 0% | −4% | −8% |
| records-plain/records/sort-header@orders30 | 105 | −1% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 47.4 | 0% | −1% | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | blinkHeapGrowth | -28.27 | -27.88 | -27.91 | 🟢 **1.91** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −26% | −26% | −27% | −28% | −26% | −26% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −41% | −41% | −42% | −41% | −41% | −41% | 🟢 |
| complexLogic/answer/type | −71% | −72% | −71% | −71% | −72% | −71% | 🟢 |
| complexLogic/load/paint | −63% | −64% | −64% | −63% | −64% | −63% | 🟢 |
| expressions/load/paint | −27% | −26% | −27% | −27% | −26% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | +58% | +59% | +57% | +54% | +59% | +60% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/type (1D): jsHeapGrowth 321.76 → 331.92 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 320.75 → 330.45 (heap)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work), jsHeapGrowth 312.51 → 334.92 (heap)
- manyPages/pages/next10 (1D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 147.46 → 136.08 (heap), blinkHeapGrowth 1.79 → 1.83 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 144.22 → 135.54 (heap), blinkHeapGrowth 1.82 → 1.79 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 144.42 → 134.06 (heap), blinkHeapGrowth -54.69 → -43.06 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 76.56 → 61.13 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.82 → 60.32 (heap), blinkHeapGrowth -3.41 → -3.55 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 68.22 → 59.89 (heap), blinkHeapGrowth -34.36 → -3.55 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 313.43 → 318.13 (heap), blinkHeapGrowth -25.15 → -25.13 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 307.53 → 318.31 (heap), blinkHeapGrowth -27.31 → -25.13 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 117.06 → 116.47 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 116.09 → 116.52 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 91.59 → 87.8 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 90.93 → 87.43 (heap)

Δ = today / build − 1.
