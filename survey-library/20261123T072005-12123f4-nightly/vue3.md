# survey-library · vue3 · 23.11.2026 07:20 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45130286152

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 432 | = today | 0% | 🟢 **−16%** |
| complexLogic/answer/type | 368 | = today | +2% | 🟢 **−13%** |
| complexLogic/load/paint | 1560 | = today | 0% | 🟢 **−29%** |
| expressions/load/paint | 3987 | = today | +2% | 🟢 **−24%** |
| large/load/paint | 584 | = today | 🟢 **−6%** | 🟢 **−20%** |
| manyPages/load/paint | 481 | = today | −3% | 🟢 **−8%** |
| manyPages/pages/next10 | 300 | = today | −2% | 🟢 **−11%** |
| records-10k/load/paint | 1905 | = today | 🟢 **−25%** | −2% |
| records-10k/records/edit-cell@orders | 540 | = today | 0% | 🔴 **+47%** |
| records-10k/records/sort-header@orders | 281 | = today | −1% | 🟢 **−53%** |
| records-1k/load/paint | 813 | = today | −4% | 🟢 **−12%** |
| records-plain/records/sort-header@orders30 | 103 | = today | +2% | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 46.2 | = today | 0% | 🟢 **−77%** |

🔴 slower · 🟢 faster: a change of 5% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/edit-cell@orders | blinkHeapGrowth | -3.55 | — | -3.41 | 🔴 **-39.23** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **7240** |
|  | nodeGrowth | 0 | — | = | 🟢 **23968** |
|  | jsHeapGrowth | 318.12 | — | 307.07 | 🟢 **51914.35** |
|  | blinkHeapGrowth | -3.3249999999999993 | — | -22.82 | 🟢 **7730.84** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6480** |
|  | nodeGrowth | 0 | — | = | 🟢 **22332** |
|  | jsHeapGrowth | 116.325 | — | 116.78 | 🟢 **36445.13** |
|  | blinkHeapGrowth | 26.92 | — | = | 🟢 **6707.75** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2160** |
|  | nodeGrowth | 0 | — | = | 🟢 **7445** |
|  | jsHeapGrowth | 88.315 | — | 90.85 | 🟢 **12277.11** |
|  | blinkHeapGrowth | -19.555 | — | -17.75 | 🟢 **2254.57** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −6% | −9%..−2% | −8% | −4% | −4% | −7% | −6% | 🟢 |
| records-10k/load/paint | −25% | −27%..−24% | −27% | −25% | −25% | −24% | −26% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −16% | −18%..−14% | −17% | −15% | −17% | −15% | −16% | 🟢 |
| complexLogic/answer/type | −13% | −21%..−6% | −16% | −11% | −9% | −18% | −16% | 🟢 |
| complexLogic/load/paint | −29% | −31%..−28% | −29% | −29% | −29% | −29% | −30% | 🟢 |
| expressions/load/paint | −24% | −26%..−21% | −25% | −23% | −22% | −23% | −24% | 🟢 |
| large/load/paint | −20% | −21%..−17% | −19% | −19% | −20% | −21% | −19% | 🟢 |
| manyPages/load/paint | −8% | −11%..−5% | −8% | −7% | −8% | −11% | −8% | 🟢 |
| manyPages/pages/next10 | −11% | −16%..−4% | −8% | −12% | −7% | −9% | −14% | 🟢 |
| records-10k/records/edit-cell@orders | +47% | +36%..+56% | +50% | +52% | +41% | +44% | +42% | 🟢 |
| records-10k/records/sort-header@orders | −53% | −53%..−52% | −52% | −53% | −52% | −53% | −53% | 🟢 |
| records-1k/load/paint | −12% | −14%..−11% | −11% | −12% | −14% | −13% | −12% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −83%..−82% | −82% | −82% | −82% | −82% | −82% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −77% | −78%..−76% | −76% | −77% | −77% | −77% | −77% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 309.32 → 331.12 (heap), blinkHeapGrowth -26.34 → -26.7 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 320.2 → 335.34 (heap), blinkHeapGrowth -28.74 → -28.33 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 144.01 → 134.96 (heap), blinkHeapGrowth -38.43 → -48.11 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 143.16 → 135.63 (heap), blinkHeapGrowth 6.83 → -42.29 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.97 → 57.97 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 74.68 → 60.02 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
