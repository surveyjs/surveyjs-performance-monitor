# survey-library · angular · 27.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45920610067

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 477 | 0% | 0% | +2% |
| complexLogic/answer/type | 400 | −2% | −5% | +1% |
| complexLogic/load/paint | 2942 | 0% | −2% | +1% |
| expressions/load/paint | 3940 | −5% | −5% | 0% |
| large/load/paint | 566 | −4% | −4% | −7% |
| manyPages/load/paint | 733 | −1% | −1% | −4% |
| manyPages/pages/next10 | 598 | −2% | 0% | −4% |
| records-10k/load/paint | 2097 | +2% | +2% | +2% |
| records-10k/records/edit-cell@orders | 472 | +2% | +3% | 🔴 **+16%** |
| records-10k/records/sort-header@orders | 279 | +3% | +4% | 🟢 **−51%** |
| records-1k/load/paint | 923 | 0% | +1% | −8% |
| records-plain/records/sort-header@orders30 | 97.4 | +4% | +1% | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 60.8 | −1% | +2% | 🟢 **−73%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | jsHeapGrowth | 389.09 | 346.48 | 344.77 | 🔴 **241.33** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 74.57 | 71.41 | 69.64 | 🟢 **119.68** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1260** |
|  | nodeGrowth | 0 | = | = | 🟢 **38288** |
|  | jsHeapGrowth | 532.57 | 531.13 | 🔴 **331.3** | 🟢 **31189.27** |
|  | blinkHeapGrowth | 31.15 | 30.76 | 31.15 | 🟢 **8838.49** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **900** |
|  | nodeGrowth | 0 | = | = | 🟢 **35952** |
|  | jsHeapGrowth | 136.73 | 131.82 | 129.83 | 🟢 **12474.26** |
|  | blinkHeapGrowth | 10.14 | 10.06 | = | 🟢 **7947.23** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **300** |
|  | nodeGrowth | 0 | = | = | 🟢 **11985** |
|  | jsHeapGrowth | 103.64 | 100.2 | 97.53 | 🟢 **4278.99** |
|  | blinkHeapGrowth | 9.94 | 9.83 | 9.83 | 🟢 **2636.4** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/records/edit-cell@orders | +16% | +11%..+23% | +20% | +16% | +13% | +17% | +20% | 🟢 |
| records-10k/records/sort-header@orders | −51% | −53%..−50% | −52% | −52% | −51% | −52% | −51% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −82%..−81% | −81% | −82% | −82% | −82% | −82% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −74%..−71% | −73% | −73% | −72% | −73% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 2397 → 2401 (work), conditionsPasses 3 → 4 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (30D): blinkHeapGrowth -2.09 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 200.71 → 198.32 (heap), blinkHeapGrowth 2.89 → 2.67 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 198.1 → 199.62 (heap), blinkHeapGrowth 3.12 → 3 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 188.76 → 201.24 (heap), blinkHeapGrowth 1.41 → 3.06 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (1D): blinkHeapGrowth -33.06 → -32.99 (heap)
- records-10k/records/edit-cell@orders (7D): blinkHeapGrowth -33.12 → -23.61 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), blinkHeapGrowth 0.66 → -33 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
