# survey-library · survey-js-ui · 24.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45302415096

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 406 | 0% | −1% | 🟢 **−19%** |
| complexLogic/answer/first | 297 | +1% | +1% | 🟢 **−17%** |
| complexLogic/answer/type | 384 | +2% | +3% | 🟢 **−16%** |
| complexLogic/load/paint | 1523 | 0% | +1% | 🟢 **−30%** |
| expressions/load/paint | 3891 | −1% | +2% | 🟢 **−25%** |
| large/load/paint | 1097 | 0% | −5% | 🟢 **−22%** |
| manyPages/load/paint | 476 | −1% | 0% | −9% |
| manyPages/pages/locale | 55.8 | +1% | −3% | 🟢 **−23%** |
| manyPages/pages/next10 | 213 | +2% | −1% | −5% |
| records-10k/load/paint | 1283 | 0% | 🟢 **−28%** | −8% |
| records-10k/records/add-row@orders | 281 | +1% | −3% | 🔴 **+37%** |
| records-10k/records/edit-cell@orders | 296 | −1% | −1% | 🔴 **+23%** |
| records-10k/records/filter-set@orders | 495 | +2% | −1% | −3% |
| records-10k/records/last@orders | 241 | +1% | 0% | n/a¹ |
| records-10k/records/next@orders | 234 | +1% | 0% | n/a² |
| records-10k/records/sort-header@orders | 258 | 0% | 0% | 🟢 **−51%** |
| records-1k/load/paint | 743 | 0% | −5% | 🟢 **−15%** |
| records-1k/records/next@ordersPanel | 47.5 | +3% | +2% | n/a³ |
| records-plain/records/next@panelsPaged | 75 | 0% | +4% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 110 | −4% | +2% | 🟢 **−79%** |
| records-plain/records/sort-1@panelsPaged | 68.4 | 0% | +3% | 🟢 **−68%** |
| records-plain/records/sort-header@orders30 | 107 | 0% | +3% | 🟢 **−76%** |
| records-plain/records/sort-header@ordersPaged | 83 | +1% | +3% | 🟢 **−69%** |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁴ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/first | blinkHeapGrowth | -7.07 | 11.34 | 🔴 **-29.12** | -2.18 |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **6715** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 236.68 | 237.31 | 261.91 | 🟢 **26249.1** |
|  | blinkHeapGrowth | 1.76 | = | 1.9 | 🟢 **6669.49** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 68.62 | 68.93 | 83.37 | 🟢 **132.15** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4680** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 262.32 | 261 | 258.29 | 🟢 **17536.85** |
|  | blinkHeapGrowth | -3 | -2.76 | -2.87 | 🟢 **4505.42** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | = | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 263.48 | 262.81 | 🟢 **2467.37** | 🟢 **25901.96** |
|  | blinkHeapGrowth | 30.63 | 30.27 | 🟢 **315.73** | 🟢 **6587.29** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **8280** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 122.73 | 119.6 | 119.62 | 🟢 **19236.45** |
|  | blinkHeapGrowth | 43.3 | = | = | 🟢 **7707.23** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2760** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 102.91 | 102.63 | 101.43 | 🟢 **6562.37** |
|  | blinkHeapGrowth | 16.81 | = | 16.82 | 🟢 **2573.01** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6120** |
|  | nodeGrowth | 0 | = | = | 🟢 **11064** |
|  | jsHeapGrowth | 111.46 | 112.53 | 106.07 | 🟢 **13266.75** |
|  | blinkHeapGrowth | 26.92 | 26.92 | = | 🟢 **5703.79** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2040** |
|  | nodeGrowth | 0 | = | = | 🟢 **3690** |
|  | jsHeapGrowth | 96.29 | 93.62 | 89.59 | 🟢 **4546.22** |
|  | blinkHeapGrowth | 10.09 | = | = | 🟢 **1961.57** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −28% | −30%..−25% | −28% | −28% | −26% | −27% | −29% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −19% | −22%..−17% | −19% | −19% | −19% | −21% | −20% | 🟢 |
| complexLogic/answer/first | −17% | −26%..−8% | −15% | −24% | −20% | −12% | −16% | 🟢 |
| complexLogic/answer/type | −16% | −22%..−12% | −17% | −15% | −19% | −21% | −16% | 🟢 |
| complexLogic/load/paint | −30% | −31%..−29% | −30% | −29% | −29% | −31% | −30% | 🟢 |
| expressions/load/paint | −25% | −27%..−22% | −25% | −23% | −24% | −26% | −26% | 🟢 |
| large/load/paint | −22% | −23%..−20% | −21% | −22% | −22% | −20% | −22% | 🟢 |
| manyPages/pages/locale | −23% | −24%..−21% | −23% | −23% | −24% | −22% | −22% | 🟢 |
| records-10k/records/add-row@orders | +37% | +34%..+42% | +39% | +36% | +40% | +35% | +37% | 🟢 |
| records-10k/records/edit-cell@orders | +23% | +20%..+27% | +23% | +22% | +23% | +27% | +23% | 🟢 |
| records-10k/records/sort-header@orders | −51% | −52%..−50% | −51% | −51% | −50% | −51% | −51% | 🟢 |
| records-1k/load/paint | −15% | −18%..−13% | −14% | −16% | −14% | −16% | −16% | 🟢 |
| records-plain/records/sort-1@panels30 | −79% | −80%..−78% | −79% | −79% | −79% | −80% | −80% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −68% | −69%..−65% | −67% | −66% | −67% | −69% | −68% | 🟢 |
| records-plain/records/sort-header@orders30 | −76% | −78%..−75% | −77% | −78% | −77% | −76% | −76% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −69% | −70%..−68% | −68% | −69% | −69% | −70% | −69% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (1D): jsHeapGrowth 326.98 → 327.38 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 343.31 → 327.24 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 282.49 → 329.74 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 298.84 → 296.66 (heap), blinkHeapGrowth -24.48 → -28.7 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 306.9 → 297.53 (heap), blinkHeapGrowth -2.15 → -26.71 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 280.33 → 299.21 (heap), blinkHeapGrowth -24.98 → -28.39 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 39.35 → 39.82 (heap), blinkHeapGrowth 2.32 → 2.46 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.96 → 40.25 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.18 → 39.99 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 119.81 → 118.98 (heap), blinkHeapGrowth -0.25 → -0.09 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 118.03 → 118.84 (heap), blinkHeapGrowth -0.09 → -0.25 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 122.61 → 119.49 (heap), blinkHeapGrowth 0.65 → -0.07 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 280.98 → 281.07 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 266.44 → 281.39 (heap), blinkHeapGrowth 42.42 → 42.46 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 150.36 → 148.38 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 145.19 → 148.02 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 97.08 → 96.94 (heap), blinkHeapGrowth -7.07 → -8.54 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 97.13 → 97.26 (heap), blinkHeapGrowth -4.81 → -3.51 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 104.7 → 105.08 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 103.16 → 105.26 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
