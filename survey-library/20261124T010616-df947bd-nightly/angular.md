# survey-library · angular · 24.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45302415096

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 489 | +1% | −4% | 🟢 **−17%** |
| complexLogic/answer/type | 391 | +1% | +1% | 🟢 **−18%** |
| complexLogic/load/paint | 1570 | +1% | +2% | 🟢 **−29%** |
| expressions/load/paint | 6579 | −1% | +1% | 🟢 **−23%** |
| large/load/paint | 1180 | 0% | −7% | 🟢 **−21%** |
| manyPages/load/paint | 515 | 0% | −3% | 🟢 **−9%** |
| manyPages/pages/next10 | 356 | −1% | −8% | 🟢 **−15%** |
| records-10k/load/paint | 1407 | 0% | 🟢 **−27%** | 🟢 **−11%** |
| records-10k/records/edit-cell@orders | 320 | 0% | 🟢 **−17%** | +7% |
| records-10k/records/sort-header@orders | 481 | 0% | −6% | 🟢 **−54%** |
| records-1k/load/paint | 1166 | 0% | 🟢 **−10%** | 🟢 **−17%** |
| records-plain/records/sort-header@orders30 | 107 | −2% | 🟢 **−36%** | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 47.6 | +1% | 🟢 **−31%** | 🟢 **−80%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -73.66 | -75.98 | 🟢 **56.91** | 🟢 **1.03** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.22 | 71.02 | 🟢 **118.71** | 🟢 **119** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1260** |
|  | nodeGrowth | 0 | = | = | 🟢 **41348** |
|  | jsHeapGrowth | 331.32 | 331.06 | 293.93 | 🟢 **31890.06** |
|  | blinkHeapGrowth | 26.91 | = | 27.05 | 🟢 **9562.16** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **900** |
|  | nodeGrowth | 0 | = | = | 🟢 **37992** |
|  | jsHeapGrowth | 132.34 | 150.53 | 159.78 | 🟢 **12740.05** |
|  | blinkHeapGrowth | 26.88 | 31.99 | 36.06 | 🟢 **8313.14** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **300** |
|  | nodeGrowth | 0 | = | = | 🟢 **12665** |
|  | jsHeapGrowth | 100.16 | 97.93 | 96.4 | 🟢 **4354.25** |
|  | blinkHeapGrowth | 9.76 | = | 10.35 | 🟢 **2796.86** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −28%..−26% | −27% | −27% | −26% | −28% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | −17% | −21%..−13% | −18% | −19% | −14% | −17% | −17% | 🟢 |
| records-1k/load/paint | −10% | −11%..−10% | −10% | −10% | −10% | −10% | −10% | 🟢 |
| records-plain/records/sort-header@orders30 | −36% | −39%..−34% | −37% | −36% | −38% | −36% | −34% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −31% | −38%..−27% | −37% | −31% | −32% | −32% | −31% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −17% | −18%..−16% | −17% | −17% | −17% | −16% | −17% | 🟢 |
| complexLogic/answer/type | −18% | −24%..−11% | −15% | −19% | −14% | −21% | −19% | 🟢 |
| complexLogic/load/paint | −29% | −30%..−28% | −29% | −29% | −29% | −28% | −29% | 🟢 |
| expressions/load/paint | −23% | −24%..−21% | −23% | −22% | −23% | −23% | −22% | 🟢 |
| large/load/paint | −21% | −23%..−17% | −22% | −20% | −20% | −19% | −19% | 🟢 |
| manyPages/load/paint | −9% | −11%..−7% | −11% | −9% | −8% | −8% | −9% | 🟢 |
| manyPages/pages/next10 | −15% | −16%..−13% | −14% | −15% | −15% | −16% | −14% | 🟢 |
| records-10k/load/paint | −11% | −13%..−9% | −11% | −9% | −11% | −10% | −12% | 🟢 |
| records-10k/records/sort-header@orders | −54% | −55%..−51% | −54% | −52% | −54% | −53% | −54% | 🟢 |
| records-1k/load/paint | −17% | −17%..−16% | −17% | −17% | −17% | −16% | −17% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −83%..−80% | −82% | −81% | −82% | −81% | −82% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −80% | −81%..−79% | −80% | −79% | −79% | −80% | −80% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 347.06 → 344.98 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 345.18 → 346.71 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 298.28 → 345.11 (heap), blinkHeapGrowth -2.09 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 200.15 → 199.56 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 188.45 → 200.43 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 186.39 → 201.92 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
