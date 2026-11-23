# survey-library · angular · 23.11.2026 13:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45179909558

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 490 | = today | −3% | 🟢 **−18%** |
| complexLogic/answer/type | 610 | = today | +2% | 🟢 **−16%** |
| complexLogic/load/paint | 1598 | = today | +1% | 🟢 **−29%** |
| expressions/load/paint | 6450 | = today | +1% | 🟢 **−24%** |
| large/load/paint | 700 | = today | −5% | 🟢 **−20%** |
| manyPages/load/paint | 999 | = today | −5% | −8% |
| manyPages/pages/next10 | 351 | = today | −5% | 🟢 **−15%** |
| records-10k/load/paint | 1450 | = today | 🟢 **−27%** | 🟢 **−10%** |
| records-10k/records/edit-cell@orders | 300 | = today | 🟢 **−21%** | +5% |
| records-10k/records/sort-header@orders | 266 | = today | −6% | 🟢 **−59%** |
| records-1k/load/paint | 1690 | = today | −9% | 🟢 **−17%** |
| records-plain/records/sort-header@orders30 | 96.1 | = today | 🟢 **−36%** | 🟢 **−85%** |
| records-plain/records/sort-header@ordersPaged | 77.6 | = today | 🟢 **−30%** | 🟢 **−77%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -73.66499999999999 | — | 0.67 | 🟢 **1.02** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.015 | — | 🟢 **118.2** | 🟢 **122.01** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **1260** |
|  | nodeGrowth | 0 | — | = | 🟢 **41348** |
|  | jsHeapGrowth | 330.89 | — | 294.36 | 🟢 **31886** |
|  | blinkHeapGrowth | 30.94 | — | = | 🟢 **9558.08** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **900** |
|  | nodeGrowth | 0 | — | = | 🟢 **37992** |
|  | jsHeapGrowth | 129.60000000000002 | — | 134.84 | 🟢 **12748.62** |
|  | blinkHeapGrowth | 11.26 | — | 31.99 | 🟢 **8309** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **300** |
|  | nodeGrowth | 0 | — | = | 🟢 **12665** |
|  | jsHeapGrowth | 100.19 | — | 114.64 | 🟢 **4355.28** |
|  | blinkHeapGrowth | 11.96 | — | 13.96 | 🟢 **2797.71** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −28%..−26% | −26% | −27% | −27% | −27% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | −21% | −26%..−14% | −22% | −22% | −16% | −20% | −22% | 🟢 |
| records-plain/records/sort-header@orders30 | −36% | −42%..−28% | −29% | −36% | −36% | −37% | −38% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −30% | −32%..−28% | −30% | −29% | −29% | −29% | −32% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −18% | −18%..−16% | −17% | −18% | −17% | −17% | −18% | 🟢 |
| complexLogic/answer/type | −16% | −19%..−15% | −16% | −17% | −16% | −16% | −18% | 🟢 |
| complexLogic/load/paint | −29% | −30%..−28% | −29% | −29% | −29% | −29% | −30% | 🟢 |
| expressions/load/paint | −24% | −24%..−23% | −24% | −24% | −24% | −24% | −23% | 🟢 |
| large/load/paint | −20% | −23%..−16% | −17% | −20% | −22% | −20% | −20% | 🟢 |
| manyPages/pages/next10 | −15% | −21%..−5% | −16% | −16% | −13% | −7% | −15% | 🟢 |
| records-10k/load/paint | −10% | −12%..−8% | −10% | −9% | −10% | −11% | −10% | 🟢 |
| records-10k/records/sort-header@orders | −59% | −60%..−58% | −59% | −59% | −59% | −59% | −60% | 🟢 |
| records-1k/load/paint | −17% | −20%..−11% | −15% | −17% | −13% | −18% | −15% | 🟢 |
| records-plain/records/sort-header@orders30 | −85% | −85%..−84% | −84% | −85% | −85% | −85% | −85% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −77% | −78%..−76% | −77% | −77% | −77% | −76% | −77% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 343.7 → 344.74 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 295.59 → 344.23 (heap), blinkHeapGrowth 1.97 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (7D): jsHeapGrowth 192.44 → 201.49 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 187.3 → 200.59 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
