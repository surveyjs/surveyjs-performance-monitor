# survey-library · survey-js-ui · 23.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45092599916

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 396 | = today | 0% | −20% |
| complexLogic/answer/first | 225 | = today | +2% | −19% |
| complexLogic/answer/type | 394 | = today | +3% | −15% |
| complexLogic/load/paint | 1543 | = today | 0% | 🟢 **−30%** |
| expressions/load/paint | 3863 | = today | +2% | −24% |
| large/load/paint | 553 | = today | −6% | −21% |
| manyPages/load/paint | 478 | = today | −2% | −9% |
| manyPages/pages/locale | 62.7 | = today | −3% | −17% |
| manyPages/pages/next10 | 284 | = today | 0% | −5% |
| records-10k/load/paint | 1291 | = today | 🟢 **−27%** | −9% |
| records-10k/records/add-row@orders | 292 | = today | −3% | 🔴 **+38%** |
| records-10k/records/edit-cell@orders | 295 | = today | +2% | +22% |
| records-10k/records/filter-set@orders | 490 | = today | −2% | −2% |
| records-10k/records/last@orders | 239 | = today | 0% | n/a¹ |
| records-10k/records/next@orders | 237 | = today | +1% | n/a² |
| records-10k/records/sort-header@orders | 258 | = today | +1% | 🟢 **−51%** |
| records-1k/load/paint | 728 | = today | −5% | −16% |
| records-1k/records/next@ordersPanel | 55.3 | = today | +5% | n/a³ |
| records-plain/records/next@panelsPaged | 44.9 | = today | 0% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 107 | = today | +1% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 49.1 | = today | +2% | 🟢 **−73%** |
| records-plain/records/sort-header@orders30 | 174 | = today | +1% | 🟢 **−75%** |
| records-plain/records/sort-header@ordersPaged | 72.8 | = today | −1% | 🟢 **−72%** |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁴ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **6715** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 235.225 | — | 260.26 | 🟢 **26248.86** |
|  | blinkHeapGrowth | 1.76 | — | 1.9 | 🟢 **6667.84** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 70.9 | — | 86.69 | 🟢 **132.97** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **4680** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 261.41499999999996 | — | 258.06 | 🟢 **17536.98** |
|  | blinkHeapGrowth | 1.2 | — | -2.87 | 🟢 **4505.42** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | — | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 262.83 | — | 🟢 **2469.29** | 🟢 **25903.12** |
|  | blinkHeapGrowth | 30.27 | — | 🟢 **315.73** | 🟢 **6587.29** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **8280** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 117.095 | — | 116.11 | 🟢 **19244.38** |
|  | blinkHeapGrowth | 43.3 | — | = | 🟢 **7708.09** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **2760** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 103.7 | — | 103.63 | 🟢 **6554.8** |
|  | blinkHeapGrowth | 16.58 | — | 16.37 | 🟢 **2571.07** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6120** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 145.45 | — | 141.27 | 🟢 **13279.78** |
|  | blinkHeapGrowth | 36.12 | — | = | 🟢 **5650.11** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2040** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 96.445 | — | 91.88 | 🟢 **4546.1** |
|  | blinkHeapGrowth | 10.39 | — | = | 🟢 **1903.51** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −26% | −27% | −28% | −27% | −28% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −30% | −29% | −30% | −29% | −30% | −30% | 🟢 |
| records-10k/records/add-row@orders | +38% | +39% | +33% | +42% | +44% | +37% | 🟢 |
| records-10k/records/sort-header@orders | −51% | −51% | −50% | −51% | −52% | −52% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −77% | −79% | −79% | −77% | −78% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −73% | −73% | −73% | −73% | −74% | −74% | 🟢 |
| records-plain/records/sort-header@orders30 | −75% | −75% | −75% | −76% | −76% | −74% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −72% | −72% | −71% | −71% | −71% | −71% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 339.89 → 327.39 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 281.99 → 325.9 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 304.82 → 296.55 (heap), blinkHeapGrowth -22.71 → -25.93 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 280.77 → 297.33 (heap), blinkHeapGrowth -25.06 → -25.36 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.45 → 40.04 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.16 → 40.04 (heap), blinkHeapGrowth 2.46 → 2.16 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 139.32 → 132.85 (heap), blinkHeapGrowth 1.8 → 1.78 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 131.81 → 126.87 (heap), blinkHeapGrowth 1.77 → 1.78 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 268.01 → 280.15 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 145.13 → 151.11 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 98.25 → 96.9 (heap), blinkHeapGrowth 17.65 → 17.7 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 101.1 → 103.01 (heap), blinkHeapGrowth -19.17 → -1.87 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
