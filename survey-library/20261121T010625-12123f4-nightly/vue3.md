# survey-library · vue3 · 21.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44848104594

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 848 | −2% | 0% | −18% |
| complexLogic/answer/type | 388 | −5% | +8% | 🟢 **−44%** |
| complexLogic/load/paint | 1593 | 0% | −1% | 🟢 **−33%** |
| expressions/load/paint | 4060 | 0% | +3% | 🟢 **−27%** |
| large/load/paint | 1068 | 0% | −8% | −23% |
| manyPages/load/paint | 487 | 0% | −2% | −9% |
| manyPages/pages/next10 | 297 | +2% | −2% | −10% |
| records-10k/load/paint | 1370 | 0% | 🟢 **−27%** | −3% |
| records-10k/records/edit-cell@orders | 302 | +1% | 0% | 🔴 **+55%** |
| records-10k/records/sort-header@orders | 266 | 0% | +3% | n/a¹ |
| records-1k/load/paint | 985 | +3% | −6% | −8% |
| records-plain/records/sort-header@orders30 | 92.6 | +1% | −1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 45.6 | −2% | 0% | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | blinkHeapGrowth | -28.04 | -27.36 | -26.37 | 🟢 **-2.12** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −26% | −28% | −26% | −28% | −25% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/answer/type | −44% | −44% | −45% | −47% | −44% | −44% | 🟢 |
| complexLogic/load/paint | −33% | −32% | −33% | −33% | −33% | −34% | 🟢 |
| expressions/load/paint | −27% | −26% | −27% | −26% | −27% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | +55% | +54% | +58% | +58% | +48% | +55% | 🟢 |

## Counters (information)
- calculations/load/paint (1D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 327.15 → 330.99 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 322.18 → 330.93 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 313.79 → 332.4 (heap)
- expressions/load/paint (1D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 133.93 → 136.55 (heap), blinkHeapGrowth -48.04 → -43.13 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 146.69 → 135.06 (heap), blinkHeapGrowth -39.19 → -41.67 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 141.54 → 135.57 (heap), blinkHeapGrowth -32.25 → 1.79 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 58.77 → 58.81 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 75.14 → 59.84 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 69.13 → 58.06 (heap), blinkHeapGrowth 0.74 → 0.66 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 317.01 → 316.93 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 308.19 → 316.97 (heap), blinkHeapGrowth -22.07 → -25.06 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 116.94 → 116.35 (heap), blinkHeapGrowth 15 → 17.9 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 115.91 → 116.17 (heap), blinkHeapGrowth 16.47 → 14.82 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 88.93 → 87.6 (heap), blinkHeapGrowth -22.93 → -19.15 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 91.6 → 87.71 (heap), blinkHeapGrowth -21.02 → 8.19 (heap)

Δ = today / build − 1.
