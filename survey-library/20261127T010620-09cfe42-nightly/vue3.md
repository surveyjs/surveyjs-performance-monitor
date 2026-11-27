# survey-library · vue3 · 27.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45920610067

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 804 | 0% | −1% | +6% |
| complexLogic/answer/type | 386 | −2% | −1% | +4% |
| complexLogic/load/paint | 1527 | −1% | −1% | +2% |
| expressions/load/paint | 3674 | −5% | −5% | −3% |
| large/load/paint | 1015 | −5% | −4% | 🟢 **−9%** |
| manyPages/load/paint | 468 | −2% | −1% | −2% |
| manyPages/pages/next10 | 489 | −1% | −1% | −2% |
| records-10k/load/paint | 1419 | +2% | +2% | +3% |
| records-10k/records/edit-cell@orders | 579 | +2% | +2% | 🔴 **+60%** |
| records-10k/records/sort-header@orders | 297 | +3% | +2% | 🟢 **−44%** |
| records-1k/load/paint | 815 | 0% | 0% | −2% |
| records-plain/records/sort-header@orders30 | 117 | −3% | +2% | 🟢 **−77%** |
| records-plain/records/sort-header@ordersPaged | 47.4 | −1% | +1% | 🟢 **−73%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **6520** |
|  | nodeGrowth | 0 | = | = | 🟢 **21628** |
|  | jsHeapGrowth | 629.5 | 626.68 | 🔴 **318.44** | 🟢 **50139.53** |
|  | blinkHeapGrowth | -25.01 | -29.49 | -25.15 | 🟢 **7081.67** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6000** |
|  | nodeGrowth | 0 | = | = | 🟢 **20772** |
|  | jsHeapGrowth | 140.75 | 138.12 | 138.2 | 🟢 **35236.45** |
|  | blinkHeapGrowth | 32.04 | = | = | 🟢 **6249.56** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2000** |
|  | nodeGrowth | 0 | = | = | 🟢 **6925** |
|  | jsHeapGrowth | 92.21 | 93.11 | 89.54 | 🟢 **11894.61** |
|  | blinkHeapGrowth | 8.86 | -22 | = | 🟢 **2108.62** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −9% | −11%..−8% | −10% | −9% | −10% | −10% | −8% | 🟢 |
| records-10k/records/edit-cell@orders | +60% | +55%..+67% | +64% | +63% | +61% | +59% | +57% | 🟢 |
| records-10k/records/sort-header@orders | −44% | −46%..−42% | −44% | −45% | −42% | −44% | −44% | 🟢 |
| records-plain/records/sort-header@orders30 | −77% | −78%..−74% | −75% | −77% | −76% | −77% | −77% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −75%..−72% | −73% | −75% | −73% | −73% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 2397 → 2401 (work), conditionsPasses 3 → 4 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 331.48 → 345.69 (heap), blinkHeapGrowth -25.31 → -25.05 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 330.14 → 345.1 (heap), blinkHeapGrowth -26.18 → -25.03 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 303.63 → 344.13 (heap), blinkHeapGrowth -24.17 → -25.3 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 132.91 → 135.83 (heap), blinkHeapGrowth 2.37 → 2.74 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 133.57 → 132.82 (heap), blinkHeapGrowth 2.53 → 2.35 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 148.49 → 134.24 (heap), blinkHeapGrowth 2.15 → 2.2 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 65.15 → 68.55 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 61.92 → 68.19 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 70.24 → 66.92 (heap), blinkHeapGrowth -33.82 → -3.55 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
