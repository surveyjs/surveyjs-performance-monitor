# survey-library · survey-js-ui · 28.11.2026 01:06 UTC

> cancelled: 3 scenarios not measured · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46091383335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 781 | 0% | +1% | −2% |
| complexLogic/answer/first | 215 | −3% | −2% | 0% |
| complexLogic/answer/type | 347 | −1% | −6% | +6% |
| complexLogic/load/paint | 1586 | +1% | 0% | +2% |
| expressions/load/paint | 3637 | 0% | −3% | −4% |
| large/load/paint | 912 | 0% | −5% | −8% |
| manyPages/load/paint | 463 | +1% | −1% | 0% |
| manyPages/pages/locale | 87.9 | 0% | +1% | −14% |
| manyPages/pages/next10 | 224 | +1% | −1% | +2% |
| records-10k/load/paint | 1332 | 0% | +2% | +4% |
| records-10k/records/add-row@orders | 302 | 0% | +2% | 🔴 **+60%** |
| records-10k/records/edit-cell@orders | 307 | 0% | +2% | 🔴 **+28%** |
| records-10k/records/filter-set@orders | 643 | 0% | +3% | 🔴 **+25%** |
| records-10k/records/last@orders | 479 | +1% | +4% | 🟢 **−35%** |
| records-10k/records/next@orders | 330 | +1% | +6% | 🟢 **−34%** |
| records-10k/records/sort-header@orders | 269 | 0% | +3% | 🟢 **−36%** |
| records-1k/load/paint | 751 | 0% | 0% | −1% |
| records-1k/records/next@ordersPanel | 92.4 | −9% | −1% | 🟢 **−73%** |
| records-plain/records/next@panelsPaged | 45 | −2% | +1% | 🟢 **−72%** |
| records-plain/records/sort-1@panels30 | 114 | −4% | −1% | 🟢 **−78%** |
| records-plain/records/sort-1@panelsPaged | 89.5 | +1% | +1% | 🟢 **−66%** |
| records-plain/records/sort-header@orders30 | 99.9 | 0% | 0% | 🟢 **−74%** |
| records-plain/records/sort-header@ordersPaged | 46.3 | −1% | +2% | 🟢 **−68%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **5983** |
|  | nodeGrowth | 0 | = | = | 🟢 **10417** |
|  | jsHeapGrowth | 239.47 | 240.88 | 235.24 | 🟢 **25795.6** |
|  | blinkHeapGrowth | 1.76 | 1.75 | = | 🟢 **6013.63** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 71.13 | 70.45 | 70.4 | 🟢 **133.91** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 261.86 | 261.35 | 259.79 | 🟢 **17234.96** |
|  | blinkHeapGrowth | -3.01 | -3.01 | -3.01 | 🟢 **4099.48** |
| records-10k/records/last@orders | listenerGrowth | 0 | = | = | 🟢 **4000** |
|  | nodeGrowth | 0 | = | = | 🟢 **6934** |
|  | jsHeapGrowth | 479.69 | 482.11 | 🔴 **281.28** | 🟢 **17133.27** |
|  | blinkHeapGrowth | 38.22 | = | = | 🟢 **3987.54** |
| records-10k/records/next@orders | listenerGrowth | 0 | = | = | 🟢 **4200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 155.98 | 156.41 | 150.31 | 🟢 **17313.44** |
|  | blinkHeapGrowth | 31.39 | 52.17 | 60.88 | 🟢 **4085.83** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **5992** |
|  | nodeGrowth | 0 | = | = | 🟢 **10392** |
|  | jsHeapGrowth | 463.17 | 462.74 | 🔴 **263.05** | 🟢 **25469.01** |
|  | blinkHeapGrowth | 30.63 | = | = | 🟢 **5977.46** |
| records-1k/records/next@ordersPanel | listenerGrowth | 0 | = | = | 🟢 **2440** |
|  | nodeGrowth | 0 | = | = | 🟢 **4878** |
|  | jsHeapGrowth | 119.84 | 119.81 | 120.39 | 🟢 **11167.75** |
|  | blinkHeapGrowth | 26.18 | 26.19 | = | 🟢 **2479.08** |
| records-plain/records/next@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2460** |
|  | nodeGrowth | 0 | = | = | 🟢 **5010** |
|  | jsHeapGrowth | 108.05 | 106.82 | 103.94 | 🟢 **7327.48** |
|  | blinkHeapGrowth | -16.98 | -18.48 | -2 | 🟢 **2350.52** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **7380** |
|  | nodeGrowth | 0 | = | = | 🟢 **15044** |
|  | jsHeapGrowth | 114.86 | 116.01 | 119.01 | 🟢 **21398.44** |
|  | blinkHeapGrowth | 43.3 | = | = | 🟢 **7046.67** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2460** |
|  | nodeGrowth | 0 | = | = | 🟢 **5012** |
|  | jsHeapGrowth | 127.04 | 127.26 | 121.33 | 🟢 **7290.31** |
|  | blinkHeapGrowth | 19.83 | 19.84 | 19.83 | 🟢 **2417.83** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **5640** |
|  | nodeGrowth | 0 | = | = | 🟢 **9984** |
|  | jsHeapGrowth | 120.14 | 120.28 | 111.69 | 🟢 **12956.52** |
|  | blinkHeapGrowth | 22.23 | = | 18.85 | 🟢 **5298.57** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **1880** |
|  | nodeGrowth | 0 | = | = | 🟢 **3330** |
|  | jsHeapGrowth | 98.02 | 95.39 | 95.61 | 🟢 **4421.84** |
|  | blinkHeapGrowth | 9.86 | = | = | 🟢 **1766.18** |

## Repeats 1D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-1k/records/next@ordersPanel | −9% | −18%..+1% | −15% | −10% | −10% | −8% | −2% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/locale | −14% | −21%..−7% | −19% | −14% | −15% | −12% | −10% | 🔴 |
| records-10k/records/add-row@orders | +60% | +56%..+65% | +64% | +62% | +59% | +58% | +61% | 🟢 |
| records-10k/records/edit-cell@orders | +28% | +17%..+42% | +40% | +25% | +27% | +29% | +24% | 🟢 |
| records-10k/records/filter-set@orders | +25% | +19%..+32% | +29% | +26% | +21% | +26% | +25% | 🟢 |
| records-10k/records/last@orders | −35% | −40%..−29% | −33% | −39% | −33% | −33% | −35% | 🟢 |
| records-10k/records/next@orders | −34% | −37%..−32% | −35% | −35% | −36% | −33% | −34% | 🟢 |
| records-10k/records/sort-header@orders | −36% | −38%..−34% | −37% | −37% | −36% | −36% | −35% | 🟢 |
| records-1k/records/next@ordersPanel | −73% | −76%..−71% | −73% | −73% | −75% | −74% | −72% | 🟢 |
| records-plain/records/next@panelsPaged | −72% | −72%..−69% | −70% | −70% | −71% | −70% | −72% | 🟢 |
| records-plain/records/sort-1@panels30 | −78% | −80%..−75% | −77% | −76% | −78% | −79% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −66% | −67%..−65% | −66% | −66% | −66% | −66% | −66% | 🟢 |
| records-plain/records/sort-header@orders30 | −74% | −75%..−73% | −74% | −74% | −73% | −75% | −74% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −68% | −68%..−68% | −68% | −68% | −68% | −68% | −68% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (1D): jsHeapGrowth 298 → 298.81 (heap)
- complexLogic/answer/first (7D): jsHeapGrowth 326.41 → 298.07 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 293.57 → 299.61 (heap), blinkHeapGrowth -2.16 → -2.29 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 337.42 → 326.95 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 296.46 → 332.77 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 259.83 → 336.37 (heap), blinkHeapGrowth -2.16 → -2.29 (heap)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 38.79 → 38.68 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 40.1 → 38.61 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 51.46 → 38.54 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 116.29 → 114.9 (heap), blinkHeapGrowth -0.09 → -0.25 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 120 → 114.56 (heap), blinkHeapGrowth 0.68 → 0.65 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 125.35 → 119.79 (heap), blinkHeapGrowth 0.65 → 0.66 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 6.68 → 0.66 (heap)
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
