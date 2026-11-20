# survey-library · vue3 · 20.11.2026 10:09 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44716813729

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 613 | +2% | +2% | 🟢 **−43%** |
| complexLogic/answer/type | 372 | +2% | +3% | 🟢 **−73%** |
| complexLogic/load/paint | 2878 | +1% | 0% | 🟢 **−59%** |
| expressions/load/paint | 4029 | +1% | +1% | −26% |
| large/load/paint | 1107 | +2% | −6% | −22% |
| manyPages/load/paint | 497 | +4% | 0% | −6% |
| manyPages/pages/next10 | 316 | −2% | −4% | −10% |
| records-10k/load/paint | 1408 | 0% | 🟢 **−27%** | −2% |
| records-10k/records/edit-cell@orders | 547 | −1% | −1% | 🔴 **+59%** |
| records-10k/records/sort-header@orders | 293 | +1% | +2% | n/a¹ |
| records-1k/load/paint | 822 | +1% | −4% | −8% |
| records-plain/records/sort-header@orders30 | 96.1 | 0% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 50.1 | −1% | −2% | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| calculations/load/paint | expressionRuns | 2401 | = | = | 🟢 **4772** |
| complexLogic/answer/type | conditionRuns | 52 | = | = | 🟢 **14688** |
| complexLogic/answer/type | expressionRuns | 256 | = | = | 🟢 **5854** |
| complexLogic/answer/type | blinkHeapGrowth | -28.05 | 6.86 | -26.51 | 🟢 **1.91** |
| records-10k/load/paint | expressionRuns | 80940 | = | = | 🔴 **490** |
| records-10k/records/edit-cell@orders | expressionRuns | 20848 | = | = | 🔴 **278** |
| records-1k/load/paint | expressionRuns | 8940 | = | = | 🔴 **490** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −26% | −26% | −28% | −26% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −43% | −44% | −43% | −43% | −43% | −44% | 🟢 |
| complexLogic/answer/type | −73% | −73% | −74% | −73% | −73% | −72% | 🟢 |
| complexLogic/load/paint | −59% | −59% | −59% | −59% | −59% | −59% | 🟢 |
| expressions/load/paint | −26% | −25% | −27% | −26% | −25% | −25% | 🔴 |
| records-10k/records/edit-cell@orders | +59% | +60% | +59% | +61% | +57% | +60% | 🟢 |

## Counters (information)
- complexLogic/answer/type (1D): jsHeapGrowth 322.56 → 329.58 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 320.08 → 331.27 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 316.13 → 331.25 (heap)
- manyPages/pages/next10 (1D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 146.05 → 133.45 (heap), blinkHeapGrowth 0.98 → -6.28 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 145.28 → 135.64 (heap), blinkHeapGrowth -7.09 → -2.09 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 207.45 → 135.81 (heap), blinkHeapGrowth -10.73 → 0.33 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 79.59 → 62.46 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.56 → 62.1 (heap), blinkHeapGrowth -3.41 → -3.55 (heap)
- records-10k/records/edit-cell@orders (30D): jsHeapGrowth 71.26 → 62.73 (heap), blinkHeapGrowth 0.66 → -3.55 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 315.86 → 316.96 (heap), blinkHeapGrowth -25.15 → -25.05 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 307.22 → 317.47 (heap), blinkHeapGrowth -22.65 → -25.15 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 116.74 → 116.28 (heap), blinkHeapGrowth 17.88 → 26.92 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 116.01 → 116.85 (heap), blinkHeapGrowth 16.68 → 17.8 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 91.07 → 89.29 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 91.17 → 88.16 (heap)

Δ = today / build − 1.
