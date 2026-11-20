# survey-library · react · 20.11.2026 10:09 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44716813729

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 716 | +2% | +1% | 🟢 **−46%** |
| complexLogic/answer/first | 231 | +3% | +1% | 🟢 **−55%** |
| complexLogic/answer/type | 413 | 0% | +4% | 🟢 **−71%** |
| complexLogic/load/paint | 1510 | +1% | +1% | 🟢 **−65%** |
| expressions/load/paint | 6048 | +1% | +2% | 🟢 **−26%** |
| large/load/paint | 1072 | +1% | −7% | −22% |
| manyPages/load/paint | 469 | +3% | 0% | −9% |
| manyPages/pages/locale | 68.7 | 0% | +4% | −16% |
| manyPages/pages/next10 | 276 | 0% | −2% | −8% |
| manyPages/pages/preview | 5737 | −2% | −1% | −22% |
| records-10k/load/paint | 1272 | +1% | 🟢 **−27%** | −3% |
| records-10k/records/add-row@orders | 395 | −1% | 0% | 🔴 **+49%** |
| records-10k/records/edit-cell@orders | 539 | 0% | +1% | +29% |
| records-10k/records/filter-set@orders | 483 | 0% | −1% | −4% |
| records-10k/records/last@orders | 238 | +2% | +1% | n/a¹ |
| records-10k/records/next@orders | 436 | 0% | +3% | n/a² |
| records-10k/records/sort-header@orders | 275 | +2% | +1% | n/a³ |
| records-1k/load/paint | 727 | 0% | −4% | −10% |
| records-1k/records/next@ordersPanel | 47.3 | 0% | +2% | n/a⁴ |
| records-plain/records/next@panelsPaged | 46.4 | +2% | 0% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 183 | +3% | +3% | 🟢 **−74%** |
| records-plain/records/sort-1@panelsPaged | 48.1 | +1% | 0% | 🟢 **−71%** |
| records-plain/records/sort-header@orders30 | 126 | +1% | +1% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 45.5 | −1% | 0% | n/a⁶ |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: check failed: the sort button of total
- ⁴ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁵ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]
- ⁶ Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| calculations/load/paint | expressionRuns | 2401 | = | = | 🟢 **4772** |
| complexLogic/answer/first | conditionRuns | 222 | = | = | 🟢 **4896** |
| complexLogic/answer/first | expressionRuns | 251 | = | = | 🟢 **2034** |
| complexLogic/answer/type | conditionRuns | 52 | = | = | 🟢 **14688** |
| complexLogic/answer/type | expressionRuns | 256 | = | = | 🟢 **5854** |
| complexLogic/answer/type | layoutCount | 2 | 🟢 **6** | 🟢 **6** | 🟢 **6** |
| complexLogic/answer/type | recalcStyleCount | 2 | 🟢 **7** | 🟢 **7** | 🟢 **7** |
| manyPages/pages/locale | layoutCount | 3 | 🟢 **6** | 🟢 **6** | 🟢 **6** |
| manyPages/pages/locale | recalcStyleCount | 3 | 🟢 **6** | 🟢 **6** | 🟢 **6** |
| manyPages/pages/next10 | layoutCount | 16 | 🟢 **26** | 🟢 **26** | 🟢 **26** |
| manyPages/pages/next10 | recalcStyleCount | 16 | 🟢 **26** | 🟢 **26** | 🟢 **26** |
| records-10k/load/paint | expressionRuns | 80940 | = | = | 🔴 **490** |
| records-10k/records/add-row@orders | expressionRuns | 20555 | = | = | 🔴 **164** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **2070** |
| records-10k/records/add-row@orders | nodeGrowth | 0 | = | = | 🟢 **12064** |
| records-10k/records/add-row@orders | jsHeapGrowth | 251.59 | 264.62 | 265.21 | 🟢 **23243.82** |
| records-10k/records/add-row@orders | blinkHeapGrowth | 3.41 | 2.98 | 3.06 | 🟢 **6007.11** |
| records-10k/records/edit-cell@orders | expressionRuns | 20848 | = | = | 🔴 **278** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 88.07 | 94.54 | 95.97 | 🟢 **138.96** |
| records-10k/records/edit-cell@orders | blinkHeapGrowth | -30.94 | -31.4 | -39.1 | 🟢 **8.09** |
| records-10k/records/filter-set@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1440** |
| records-10k/records/filter-set@orders | nodeGrowth | 0 | = | = | 🟢 **8242** |
| records-10k/records/filter-set@orders | jsHeapGrowth | 271.57 | 267.13 | 258.31 | 🟢 **15527.02** |
| records-10k/records/filter-set@orders | blinkHeapGrowth | 2.56 | = | -1.51 | 🟢 **4036.83** |
| records-1k/load/paint | expressionRuns | 8940 | = | = | 🔴 **490** |
| records-plain/records/sort-1@panels30 | expressionRuns | 30 | = | = | 🟢 **60** |
| records-plain/records/sort-1@panels30 | panelsCreated | 0 | = | = | 🟢 **30** |
| records-plain/records/sort-1@panels30 | layoutCount | 2 | = | = | 🟢 **301** |
| records-plain/records/sort-1@panels30 | recalcStyleCount | 2 | = | = | 🟢 **301** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3420** |
| records-plain/records/sort-1@panels30 | nodeGrowth | 0 | = | = | 🟢 **16724** |
| records-plain/records/sort-1@panels30 | jsHeapGrowth | 154.39 | 158.2 | 159.87 | 🟢 **13156.92** |
| records-plain/records/sort-1@panels30 | blinkHeapGrowth | 38.24 | 38.07 | 35.72 | 🟢 **7014.51** |
| records-plain/records/sort-1@panelsPaged | expressionRuns | 1000 | = | = | 🔴 **20** |
| records-plain/records/sort-1@panelsPaged | panelsCreated | 0 | = | = | 🟢 **10** |
| records-plain/records/sort-1@panelsPaged | layoutCount | 2 | = | = | 🟢 **91** |
| records-plain/records/sort-1@panelsPaged | recalcStyleCount | 2 | = | = | 🟢 **91** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1140** |
| records-plain/records/sort-1@panelsPaged | nodeGrowth | 0 | = | = | 🟢 **5572** |
| records-plain/records/sort-1@panelsPaged | jsHeapGrowth | 111.57 | 108.63 | 110.58 | 🟢 **4534.66** |
| records-plain/records/sort-1@panelsPaged | blinkHeapGrowth | 17.51 | 17.62 | 17.57 | 🟢 **2342.81** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −28% | −27% | −27% | −27% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −46% | −47% | −46% | −46% | −47% | −46% | 🟢 |
| complexLogic/answer/first | −55% | −57% | −54% | −56% | −54% | −57% | 🟢 |
| complexLogic/answer/type | −71% | −71% | −72% | −72% | −71% | −71% | 🟢 |
| complexLogic/load/paint | −65% | −64% | −64% | −64% | −65% | −65% | 🟢 |
| expressions/load/paint | −26% | −28% | −26% | −25% | −27% | −26% | 🟢 |
| records-10k/records/add-row@orders | +49% | +50% | +50% | +48% | +51% | +49% | 🟢 |
| records-10k/records/edit-cell@orders | +29% | +29% | +28% | +27% | +25% | +29% | 🔴 |
| records-plain/records/sort-1@panels30 | −74% | −74% | −74% | −73% | −73% | −74% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −71% | −72% | −71% | −71% | −71% | −70% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): layoutCount 19 → 18 (render), recalcStyleCount 20 → 19 (render)
- complexLogic/answer/first (1D): recalcStyleCount 3 → 2 (render), jsHeapGrowth 405.95 → 406.16 (heap), blinkHeapGrowth -2.32 → -6.74 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 3 → 2 (render), jsHeapGrowth 384.97 → 402.04 (heap), blinkHeapGrowth -2.18 → -11.17 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 3 → 2 (render), jsHeapGrowth 316.17 → 406.69 (heap), blinkHeapGrowth 1.86 → -11.16 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 295.9 → 312.06 (heap), blinkHeapGrowth -14.31 → -27.94 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 288.68 → 309.76 (heap), blinkHeapGrowth -16.57 → -27.99 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 255.41 → 312.79 (heap), blinkHeapGrowth 1.86 → -27.94 (heap)
- expressions/load/paint (30D): layoutCount 14 → 13 (render), recalcStyleCount 15 → 14 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 38.54 → 41.93 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 38.64 → 42.15 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/locale (30D): jsHeapGrowth 49.32 → 42.43 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/next10 (1D): blinkHeapGrowth 0.99 → 1.99 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 144.19 → 142.14 (heap), blinkHeapGrowth 1.98 → 2 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 147.86 → 142.54 (heap), blinkHeapGrowth 2.13 → 2.04 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 551.57 → 578.73 (heap), blinkHeapGrowth 6.38 → 5.93 (heap)
- manyPages/pages/preview (7D): jsHeapGrowth 549.96 → 575.97 (heap), blinkHeapGrowth 6.24 → 6.44 (heap)
- manyPages/pages/preview (30D): jsHeapGrowth 556.3 → 577.34 (heap), blinkHeapGrowth 6.21 → 6.05 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work)
- records-10k/records/add-row@orders (1D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (1D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-10k/records/last@orders (1D): jsHeapGrowth 296.39 → 303.19 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 290 → 304.61 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 170.73 → 168.22 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 163.11 → 167.8 (heap), blinkHeapGrowth 27.56 → 27.49 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 268.02 → 271.63 (heap), blinkHeapGrowth 30.76 → 30.85 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 261.2 → 271.71 (heap), blinkHeapGrowth 30.45 → 30.28 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 99.14 → 102.69 (heap), blinkHeapGrowth 18.42 → 18.43 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 104.07 → 102.52 (heap), blinkHeapGrowth 18.45 → 18.43 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 105.77 → 107.56 (heap), blinkHeapGrowth 5.02 → -0.84 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 106.96 → 107.66 (heap)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 124.46 → 129.41 (heap), blinkHeapGrowth 27.1 → 27.18 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 122.41 → 129.65 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 95.25 → 97.71 (heap), blinkHeapGrowth 8.36 → 9.39 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 95.38 → 99.45 (heap), blinkHeapGrowth 8.36 → 9.39 (heap)

Δ = today / build − 1.
