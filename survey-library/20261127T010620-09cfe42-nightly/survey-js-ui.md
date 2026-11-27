# survey-library · survey-js-ui · 27.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45920610067

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 554 | −2% | −2% | +2% |
| complexLogic/answer/first | 226 | −5% | −3% | +1% |
| complexLogic/answer/type | 392 | −2% | −2% | +2% |
| complexLogic/load/paint | 1470 | −2% | −1% | 0% |
| expressions/load/paint | 3761 | −5% | −5% | −4% |
| large/load/paint | 754 | −4% | −4% | −9% |
| manyPages/load/paint | 454 | −5% | −2% | −4% |
| manyPages/pages/locale | 53.8 | +1% | +2% | −14% |
| manyPages/pages/next10 | 231 | −2% | −1% | +2% |
| records-10k/load/paint | 1316 | +2% | +1% | +2% |
| records-10k/records/add-row@orders | 528 | +3% | +3% | 🔴 **+63%** |
| records-10k/records/edit-cell@orders | 555 | +4% | +2% | 🔴 **+26%** |
| records-10k/records/filter-set@orders | 501 | +1% | +3% | 🔴 **+12%** |
| records-10k/records/last@orders | 279 | +4% | +5% | 🟢 **−38%** |
| records-10k/records/next@orders | 242 | +5% | +2% | 🟢 **−45%** |
| records-10k/records/sort-header@orders | 441 | +2% | +4% | 🟢 **−35%** |
| records-1k/load/paint | 742 | 0% | 0% | −4% |
| records-1k/records/next@ordersPanel | 49 | −5% | +2% | 🟢 **−78%** |
| records-plain/records/next@panelsPaged | 48.9 | +1% | +2% | 🟢 **−71%** |
| records-plain/records/sort-1@panels30 | 99.9 | +3% | 0% | 🟢 **−79%** |
| records-plain/records/sort-1@panelsPaged | 50.7 | −3% | 0% | 🟢 **−72%** |
| records-plain/records/sort-header@orders30 | 98.9 | +3% | 0% | 🟢 **−73%** |
| records-plain/records/sort-header@ordersPaged | 44.6 | 0% | 0% | 🟢 **−69%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | jsHeapGrowth | 333.91 | 289.83 | 297.07 | 🔴 **248.95** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **5983** |
|  | nodeGrowth | 0 | = | = | 🟢 **10417** |
|  | jsHeapGrowth | 241.01 | 238.37 | 237.11 | 🟢 **25781.24** |
|  | blinkHeapGrowth | 2.11 | = | 1.75 | 🟢 **5973.49** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.68 | 72 | 71 | 🟢 **131.52** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 262.43 | 261.01 | 260.43 | 🟢 **17225.6** |
|  | blinkHeapGrowth | -3 | 1.2 | 1.45 | 🟢 **4099.49** |
| records-10k/records/last@orders | listenerGrowth | 0 | = | = | 🟢 **4000** |
|  | nodeGrowth | 0 | = | = | 🟢 **6934** |
|  | jsHeapGrowth | 479.29 | 480.38 | 🔴 **277.68** | 🟢 **17118.54** |
|  | blinkHeapGrowth | 39.13 | 28.71 | 27.99 | 🟢 **3987.54** |
| records-10k/records/next@orders | listenerGrowth | 0 | = | = | 🟢 **4200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 156.14 | 151.05 | 149.75 | 🟢 **17308.04** |
|  | blinkHeapGrowth | 31.39 | = | = | 🟢 **4085.84** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **5992** |
|  | nodeGrowth | 0 | = | = | 🟢 **10392** |
|  | jsHeapGrowth | 462.7 | 463.11 | 🔴 **262.86** | 🟢 **25448.24** |
|  | blinkHeapGrowth | 26.46 | = | = | 🟢 **5977.51** |
| records-1k/records/next@ordersPanel | listenerGrowth | 0 | = | = | 🟢 **2440** |
|  | nodeGrowth | 0 | = | = | 🟢 **4878** |
|  | jsHeapGrowth | 97.62 | 96.3 | 95.99 | 🟢 **11135.38** |
|  | blinkHeapGrowth | 17.49 | 17.29 | 17.4 | 🟢 **2478.77** |
| records-plain/records/next@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2460** |
|  | nodeGrowth | 0 | = | = | 🟢 **5010** |
|  | jsHeapGrowth | 105.57 | 104.83 | 105.02 | 🟢 **7330.05** |
|  | blinkHeapGrowth | 12.6 | = | -9.48 | 🟢 **2350.55** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **7380** |
|  | nodeGrowth | 0 | = | = | 🟢 **15044** |
|  | jsHeapGrowth | 117.15 | 120.15 | 114.65 | 🟢 **21392.36** |
|  | blinkHeapGrowth | 43.3 | = | = | 🟢 **7046.87** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2460** |
|  | nodeGrowth | 0 | = | = | 🟢 **5012** |
|  | jsHeapGrowth | 110.53 | 107.01 | 105.85 | 🟢 **7266.26** |
|  | blinkHeapGrowth | 16.58 | = | = | 🟢 **2350.26** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **5640** |
|  | nodeGrowth | 0 | = | = | 🟢 **9984** |
|  | jsHeapGrowth | 119.85 | 115.76 | 113.26 | 🟢 **12945.21** |
|  | blinkHeapGrowth | 27.19 | = | 11.93 | 🟢 **5298.57** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **1880** |
|  | nodeGrowth | 0 | = | = | 🟢 **3330** |
|  | jsHeapGrowth | 97.04 | 99.13 | 96.05 | 🟢 **4421.44** |
|  | blinkHeapGrowth | 9.57 | = | = | 🟢 **1766.18** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/records/add-row@orders | +63% | +54%..+70% | +67% | +59% | +59% | +66% | +60% | 🟢 |
| records-10k/records/edit-cell@orders | +26% | +21%..+34% | +24% | +30% | +32% | +25% | +26% | 🟢 |
| records-10k/records/filter-set@orders | +12% | +10%..+13% | +12% | +11% | +10% | +12% | +12% | 🟢 |
| records-10k/records/last@orders | −38% | −40%..−36% | −37% | −38% | −39% | −38% | −37% | 🟢 |
| records-10k/records/next@orders | −45% | −49%..−43% | −44% | −45% | −46% | −48% | −46% | 🟢 |
| records-10k/records/sort-header@orders | −35% | −39%..−30% | −31% | −35% | −34% | −36% | −37% | 🟢 |
| records-1k/records/next@ordersPanel | −78% | −80%..−77% | −78% | −79% | −77% | −79% | −79% | 🟢 |
| records-plain/records/next@panelsPaged | −71% | −75%..−67% | −74% | −73% | −71% | −69% | −69% | 🟢 |
| records-plain/records/sort-1@panels30 | −79% | −80%..−77% | −80% | −79% | −79% | −79% | −78% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −72% | −74%..−69% | −73% | −72% | −73% | −72% | −69% | 🟢 |
| records-plain/records/sort-header@orders30 | −73% | −74%..−73% | −74% | −73% | −73% | −74% | −73% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −69% | −70%..−69% | −70% | −70% | −69% | −69% | −69% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 2397 → 2401 (work), conditionsPasses 3 → 4 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (1D): jsHeapGrowth 312.88 → 296.61 (heap)
- complexLogic/answer/first (7D): jsHeapGrowth 326.43 → 296.69 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 311.57 → 296.97 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/type (1D): blinkHeapGrowth -25.12 → -25.54 (heap)
- complexLogic/answer/type (7D): blinkHeapGrowth -28.38 → -26.02 (heap)
- complexLogic/answer/type (30D): blinkHeapGrowth 2.43 → -25.5 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 39.89 → 38.09 (heap), blinkHeapGrowth 2.02 → 2.32 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 39.49 → 38.13 (heap), blinkHeapGrowth 2.16 → 2.31 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 51.63 → 38.28 (heap), blinkHeapGrowth 2.46 → 2.16 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 116.46 → 117.63 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 119.7 → 115.54 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 125.01 → 114.99 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (1D): blinkHeapGrowth -29.44 → 0.66 (heap)
- records-10k/records/edit-cell@orders (7D): blinkHeapGrowth -25.69 → 0.66 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/next@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (30D): conditionRuns 20 → 10 (work), expressionRuns 40 → 20 (work), panelsCreated 10 → 0 (work), layoutCount 61 → 1 (render), recalcStyleCount 61 → 1 (render)
- records-plain/records/next@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 61 → 1 (render), recalcStyleCount 61 → 1 (render)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
