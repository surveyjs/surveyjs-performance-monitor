# survey-library · angular · 28.11.2026 01:06 UTC

> cancelled: 3 scenarios not measured · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46091383335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 470 | 0% | +1% | −1% |
| complexLogic/answer/type | 617 | +2% | −4% | +1% |
| complexLogic/load/paint | 2759 | +1% | −1% | 0% |
| expressions/load/paint | 4042 | 0% | −4% | 0% |
| large/load/paint | 536 | 0% | −5% | −8% |
| manyPages/load/paint | 503 | −1% | 0% | −2% |
| manyPages/pages/next10 | 571 | −1% | −4% | −4% |
| records-10k/load/paint | 2046 | 0% | +2% | +8% |
| records-10k/records/edit-cell@orders | 315 | 0% | +2% | 🔴 **+17%** |
| records-10k/records/sort-header@orders | 358 | −1% | 0% | 🟢 **−44%** |
| records-1k/load/paint | 1345 | 0% | 0% | −5% |
| records-plain/records/sort-header@orders30 | 102 | 0% | +1% | 🟢 **−81%** |
| records-plain/records/sort-header@ordersPaged | 47.6 | +1% | 0% | 🟢 **−76%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | jsHeapGrowth | 388.64 | 389.28 | 346.87 | 🔴 **223.01** |
| manyPages/pages/next10 | blinkHeapGrowth | -9.17 | 2.88 | 2.63 | 🟢 **58.26** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 75.51 | 75.05 | 72.28 | 🟢 **119.33** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1260** |
|  | nodeGrowth | 0 | = | = | 🟢 **38288** |
|  | jsHeapGrowth | 531.73 | 532.54 | 🔴 **330.83** | 🟢 **31303.09** |
|  | blinkHeapGrowth | 27.28 | 26.91 | = | 🟢 **8838.36** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **900** |
|  | nodeGrowth | 0 | = | = | 🟢 **35952** |
|  | jsHeapGrowth | 136.47 | 136.71 | 129.25 | 🟢 **12571.77** |
|  | blinkHeapGrowth | 26.92 | = | 36.66 | 🟢 **7946.29** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **300** |
|  | nodeGrowth | 0 | = | = | 🟢 **11985** |
|  | jsHeapGrowth | 103.97 | 103.52 | 97.58 | 🟢 **4308.3** |
|  | blinkHeapGrowth | 9.76 | = | = | 🟢 **2636.65** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/records/edit-cell@orders | +17% | +11%..+21% | +18% | +15% | +17% | +12% | +19% | 🟢 |
| records-10k/records/sort-header@orders | −44% | −45%..−43% | −44% | −44% | −44% | −44% | −45% | 🟢 |
| records-plain/records/sort-header@orders30 | −81% | −82%..−80% | −81% | −81% | −81% | −81% | −81% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −76% | −77%..−74% | −75% | −76% | −76% | −76% | −76% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (30D): blinkHeapGrowth -2.11 → -2.22 (heap)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 200.64 → 200.08 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 201.06 → 198.62 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 185.4 → 198.54 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
