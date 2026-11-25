# survey-library · vue3 · 25.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45523195696

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 821 | 0% | +2% | 🟢 **−16%** |
| complexLogic/answer/type | 407 | +5% | +4% | 🟢 **−14%** |
| complexLogic/load/paint | 1578 | +1% | +1% | 🟢 **−30%** |
| expressions/load/paint | 4898 | 0% | +1% | 🟢 **−23%** |
| large/load/paint | 1086 | 0% | +1% | 🟢 **−21%** |
| manyPages/load/paint | 488 | +1% | +4% | −9% |
| manyPages/pages/next10 | 300 | −2% | −4% | 🟢 **−11%** |
| records-10k/load/paint | 2587 | +1% | 🟢 **−22%** | +1% |
| records-10k/records/edit-cell@orders | 549 | 0% | −1% | 🔴 **+54%** |
| records-10k/records/sort-header@orders | 294 | +1% | 0% | 🟢 **−52%** |
| records-1k/load/paint | 810 | 0% | −5% | 🟢 **−13%** |
| records-plain/records/sort-header@orders30 | 108 | +1% | +1% | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 48.3 | −2% | −1% | 🟢 **−76%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/edit-cell@orders | blinkHeapGrowth | -3.55 | = | = | 🔴 **-40.59** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **7240** |
|  | nodeGrowth | 0 | = | = | 🟢 **23968** |
|  | jsHeapGrowth | 470.99 | 🔴 **317.67** | 🔴 **315.38** | 🟢 **51914** |
|  | blinkHeapGrowth | -25.03 | -25.1 | -29.07 | 🟢 **7730.84** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6480** |
|  | nodeGrowth | 0 | = | = | 🟢 **22332** |
|  | jsHeapGrowth | 115.76 | 116.69 | 115.92 | 🟢 **36448.95** |
|  | blinkHeapGrowth | 26.92 | = | = | 🟢 **6698.99** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2160** |
|  | nodeGrowth | 0 | = | = | 🟢 **7445** |
|  | jsHeapGrowth | 89.53 | 90.74 | 92.66 | 🟢 **12278.49** |
|  | blinkHeapGrowth | 8.86 | = | -22.86 | 🟢 **2254.56** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −22% | −24%..−21% | −23% | −24% | −22% | −22% | −22% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −16% | −17%..−16% | −16% | −17% | −16% | −16% | −17% | 🟢 |
| complexLogic/answer/type | −14% | −17%..−11% | −12% | −15% | −14% | −15% | −16% | 🟢 |
| complexLogic/load/paint | −30% | −32%..−28% | −29% | −31% | −30% | −30% | −30% | 🟢 |
| expressions/load/paint | −23% | −24%..−22% | −23% | −23% | −23% | −22% | −23% | 🟢 |
| large/load/paint | −21% | −23%..−20% | −22% | −21% | −22% | −22% | −21% | 🟢 |
| manyPages/pages/next10 | −11% | −18%..−4% | −6% | −11% | −15% | −12% | −12% | 🟢 |
| records-10k/records/edit-cell@orders | +54% | +45%..+62% | +60% | +56% | +50% | +50% | +52% | 🟢 |
| records-10k/records/sort-header@orders | −52% | −53%..−50% | −51% | −52% | −52% | −53% | −52% | 🟢 |
| records-1k/load/paint | −13% | −14%..−12% | −13% | −13% | −12% | −12% | −13% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −82%..−82% | −82% | −82% | −82% | −82% | −82% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −76% | −78%..−75% | −77% | −77% | −76% | −76% | −75% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 331.75 → 329.56 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 323.97 → 334.26 (heap), blinkHeapGrowth -25.44 → -2.3 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 323.32 → 333.79 (heap), blinkHeapGrowth -2.16 → 6.49 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 136.18 → 135.24 (heap), blinkHeapGrowth -43.72 → -42.85 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 143.09 → 133.57 (heap), blinkHeapGrowth 4.09 → 1.84 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 141.09 → 134.61 (heap), blinkHeapGrowth 11.69 → 0.4 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 59.81 → 60.3 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.1 → 61 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 73.03 → 60.1 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
