# survey-library · angular · 23.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45092599916

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 848 | = today | −3% | −17% |
| complexLogic/answer/type | 423 | = today | +2% | −16% |
| complexLogic/load/paint | 1575 | = today | +1% | 🟢 **−30%** |
| expressions/load/paint | 4141 | = today | 0% | −21% |
| large/load/paint | 591 | = today | −6% | −21% |
| manyPages/load/paint | 716 | = today | −4% | −9% |
| manyPages/pages/next10 | 419 | = today | −4% | −12% |
| records-10k/load/paint | 1468 | = today | −26% | −11% |
| records-10k/records/edit-cell@orders | 300 | = today | −20% | +4% |
| records-10k/records/sort-header@orders | 269 | = today | −7% | 🟢 **−59%** |
| records-1k/load/paint | 886 | = today | −8% | −18% |
| records-plain/records/sort-header@orders30 | 94.8 | = today | 🟢 **−37%** | 🟢 **−85%** |
| records-plain/records/sort-header@ordersPaged | 49.8 | = today | 🟢 **−31%** | 🟢 **−79%** |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/edit-cell@orders | jsHeapGrowth | 70.42 | — | 🟢 **119.12** | 🟢 **120.93** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **1260** |
|  | nodeGrowth | 0 | — | = | 🟢 **41348** |
|  | jsHeapGrowth | 330.925 | — | 293.96 | 🟢 **31885.91** |
|  | blinkHeapGrowth | 31.15 | — | 31.12 | 🟢 **9558.09** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **900** |
|  | nodeGrowth | 0 | — | = | 🟢 **37992** |
|  | jsHeapGrowth | 129.60500000000002 | — | 135.59 | 🟢 **12743.25** |
|  | blinkHeapGrowth | 11.1 | — | 31.99 | 🟢 **8333.13** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **300** |
|  | nodeGrowth | 0 | — | = | 🟢 **12665** |
|  | jsHeapGrowth | 97.725 | — | 96.19 | 🟢 **4356.04** |
|  | blinkHeapGrowth | 9.76 | — | 10.05 | 🟢 **2796.85** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −26% | −25% | −28% | −26% | −26% | −26% | 🔴 |
| records-plain/records/sort-header@orders30 | −37% | −34% | −32% | −40% | −34% | −39% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −31% | −29% | −32% | −33% | −32% | −31% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −30% | −30% | −30% | −29% | −29% | −31% | 🟢 |
| records-10k/records/sort-header@orders | −59% | −58% | −60% | −59% | −60% | −59% | 🟢 |
| records-plain/records/sort-header@orders30 | −85% | −85% | −85% | −85% | −84% | −84% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −79% | −79% | −79% | −79% | −79% | −79% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 339.44 → 348.05 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 295.73 → 343.3 (heap), blinkHeapGrowth -2.09 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (7D): jsHeapGrowth 191.37 → 199.56 (heap), blinkHeapGrowth 2.31 → 2.47 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 187.76 → 201.03 (heap), blinkHeapGrowth 1.46 → 1.95 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
