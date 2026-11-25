# survey-library · angular · 25.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45523195696

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 476 | −1% | −2% | 🟢 **−18%** |
| complexLogic/answer/type | 437 | −1% | −2% | 🟢 **−15%** |
| complexLogic/load/paint | 1746 | 0% | +3% | 🟢 **−28%** |
| expressions/load/paint | 4096 | 0% | +1% | 🟢 **−21%** |
| large/load/paint | 592 | 0% | +1% | 🟢 **−20%** |
| manyPages/load/paint | 517 | 0% | +2% | −8% |
| manyPages/pages/next10 | 491 | −2% | −5% | 🟢 **−13%** |
| records-10k/load/paint | 1447 | 0% | 🟢 **−27%** | 🟢 **−10%** |
| records-10k/records/edit-cell@orders | 541 | 0% | 🟢 **−20%** | +6% |
| records-10k/records/sort-header@orders | 456 | 0% | −6% | 🟢 **−54%** |
| records-1k/load/paint | 915 | 0% | −9% | 🟢 **−17%** |
| records-plain/records/sort-header@orders30 | 169 | 0% | 🟢 **−35%** | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 47.3 | +3% | 🟢 **−31%** | 🟢 **−80%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.01 | 71.95 | 🟢 **119.95** | 🟢 **118.71** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1260** |
|  | nodeGrowth | 0 | = | = | 🟢 **41348** |
|  | jsHeapGrowth | 332.42 | 331.46 | 299.21 | 🟢 **31885.21** |
|  | blinkHeapGrowth | 26.91 | = | = | 🟢 **9562.16** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **900** |
|  | nodeGrowth | 0 | = | = | 🟢 **37992** |
|  | jsHeapGrowth | 172.3 | 173.27 | 159.4 | 🟢 **12741.88** |
|  | blinkHeapGrowth | 36.06 | = | 50.24 | 🟢 **8374.7** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **300** |
|  | nodeGrowth | 0 | = | = | 🟢 **12665** |
|  | jsHeapGrowth | 99.72 | 99.83 | 97.51 | 🟢 **4354.39** |
|  | blinkHeapGrowth | 9.76 | = | 10.35 | 🟢 **2796.86** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −28%..−27% | −27% | −27% | −27% | −28% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | −20% | −24%..−16% | −18% | −23% | −21% | −18% | −20% | 🟢 |
| records-plain/records/sort-header@orders30 | −35% | −35%..−33% | −34% | −35% | −34% | −33% | −34% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −31% | −35%..−26% | −32% | −27% | −29% | −32% | −31% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −18% | −20%..−15% | −16% | −18% | −19% | −17% | −17% | 🟢 |
| complexLogic/answer/type | −15% | −20%..−9% | −10% | −17% | −16% | −16% | −14% | 🟢 |
| complexLogic/load/paint | −28% | −34%..−21% | −27% | −25% | −26% | −28% | −33% | 🟢 |
| expressions/load/paint | −21% | −25%..−18% | −21% | −22% | −18% | −23% | −22% | 🟢 |
| large/load/paint | −20% | −22%..−19% | −19% | −21% | −21% | −20% | −20% | 🟢 |
| manyPages/pages/next10 | −13% | −16%..−8% | −13% | −10% | −11% | −11% | −15% | 🟢 |
| records-10k/load/paint | −10% | −12%..−9% | −10% | −10% | −11% | −11% | −11% | 🟢 |
| records-10k/records/sort-header@orders | −54% | −55%..−53% | −54% | −53% | −54% | −53% | −54% | 🟢 |
| records-1k/load/paint | −17% | −21%..−15% | −17% | −20% | −17% | −17% | −17% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −83%..−81% | −82% | −82% | −82% | −82% | −81% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −80% | −80%..−79% | −80% | −80% | −80% | −80% | −79% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 344.8 → 344.2 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 330.45 → 343.59 (heap), blinkHeapGrowth -2.2 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 295 → 345.62 (heap), blinkHeapGrowth -2.09 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 199.31 → 199.64 (heap), blinkHeapGrowth 1.57 → 1.28 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 190.79 → 199.53 (heap), blinkHeapGrowth 1.44 → 1.17 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 187.57 → 199.48 (heap), blinkHeapGrowth 1.71 → 2.24 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), blinkHeapGrowth -3.4 → -3.54 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
