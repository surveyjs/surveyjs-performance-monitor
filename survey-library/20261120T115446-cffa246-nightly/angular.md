# survey-library · angular · 20.11.2026 11:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44731394759

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 484 | −2% | −3% | 🟢 **−47%** |
| complexLogic/answer/type | 424 | 0% | 0% | 🟢 **−71%** |
| complexLogic/load/paint | 1605 | +2% | 0% | 🟢 **−64%** |
| expressions/load/paint | 4780 | −1% | 0% | −25% |
| large/load/paint | 591 | +1% | −7% | −22% |
| manyPages/load/paint | 528 | +1% | −1% | −7% |
| manyPages/pages/next10 | 378 | −8% | −4% | −14% |
| records-10k/load/paint | 1473 | −3% | 🟢 **−27%** | −6% |
| records-10k/records/edit-cell@orders | 309 | −20% | −20% | +4% |
| records-10k/records/sort-header@orders | 480 | −6% | −4% | n/a¹ |
| records-1k/load/paint | 1177 | −6% | −10% | −11% |
| records-plain/records/sort-header@orders30 | 129 | 🟢 **−35%** | 🟢 **−34%** | n/a² |
| records-plain/records/sort-header@ordersPaged | 76.4 | 🟢 **−29%** | 🟢 **−30%** | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -26.23 | 59.7 | 53.74 | 🟢 **2.25** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.93 | 🟢 **119.88** | 🟢 **118.66** | 🟢 **113.3** |

## Repeats 1D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-plain/records/sort-header@orders30 | −35% | −33% | −33% | −37% | −35% | −36% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −29% | −30% | −29% | −29% | −31% | −27% | 🟢 |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −27% | −27% | −27% | −26% | −26% | 🟢 |
| records-plain/records/sort-header@orders30 | −34% | −36% | −32% | −34% | −31% | −33% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −30% | −30% | −30% | −28% | −30% | −29% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −47% | −47% | −47% | −46% | −46% | −48% | 🟢 |
| complexLogic/answer/type | −71% | −70% | −71% | −72% | −71% | −70% | 🟢 |
| complexLogic/load/paint | −64% | −63% | −64% | −64% | −63% | −64% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/type (1D): jsHeapGrowth 318.65 → 345.31 (heap), blinkHeapGrowth -2.2 → -2.22 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 334.82 → 347.25 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work), jsHeapGrowth 291.92 → 344.88 (heap), blinkHeapGrowth 1.97 → -2.22 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 191.89 → 200.26 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 189.1 → 202.97 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 191.51 → 200.39 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 298.26 → 331.5 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 292.95 → 332.04 (heap), blinkHeapGrowth 27.05 → 26.91 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 160.25 → 151.36 (heap), blinkHeapGrowth 36.06 → 31.99 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 158.78 → 151.24 (heap), blinkHeapGrowth 35.25 → 31.99 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 113.88 → 100.32 (heap), blinkHeapGrowth 13.96 → 11.96 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 117.67 → 100.64 (heap), blinkHeapGrowth 13.96 → 11.96 (heap)

Δ = today / build − 1.
