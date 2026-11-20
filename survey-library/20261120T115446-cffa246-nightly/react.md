# survey-library · react · 20.11.2026 11:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44731394759

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 395 | +1% | +1% | 🟢 **−51%** |
| complexLogic/answer/first | 253 | 0% | +1% | 🟢 **−54%** |
| complexLogic/answer/type | 426 | +2% | +2% | 🟢 **−71%** |
| complexLogic/load/paint | 1579 | +2% | 0% | 🟢 **−64%** |
| expressions/load/paint | 4863 | +2% | +2% | −28% |
| large/load/paint | 567 | +2% | −7% | −21% |
| manyPages/load/paint | 634 | +3% | −1% | −7% |
| manyPages/pages/locale | 55.2 | −3% | −5% | −19% |
| manyPages/pages/next10 | 216 | −3% | −3% | −7% |
| manyPages/pages/preview | 5884 | −2% | −1% | −22% |
| records-10k/load/paint | 1810 | +1% | −25% | +3% |
| records-10k/records/add-row@orders | 294 | +1% | 0% | 🔴 **+40%** |
| records-10k/records/edit-cell@orders | 308 | −1% | +1% | +23% |
| records-10k/records/filter-set@orders | 634 | 0% | 0% | +2% |
| records-10k/records/last@orders | 238 | +3% | +1% | n/a¹ |
| records-10k/records/next@orders | 232 | +1% | +2% | n/a² |
| records-10k/records/sort-header@orders | 250 | +1% | −1% | n/a³ |
| records-1k/load/paint | 715 | +1% | −5% | −10% |
| records-1k/records/next@ordersPanel | 51.7 | +3% | +3% | n/a⁴ |
| records-plain/records/next@panelsPaged | 45.3 | +1% | 0% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 102 | 0% | −1% | 🟢 **−78%** |
| records-plain/records/sort-1@panelsPaged | 67.3 | +2% | −3% | 🟢 **−68%** |
| records-plain/records/sort-header@orders30 | 178 | +1% | +3% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 40.3 | +2% | +3% | n/a⁶ |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: check failed: the sort button of total
- ⁴ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁵ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]
- ⁶ Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/first | blinkHeapGrowth | -14.6 | -5.02 | -31.51 | 🟢 **1.92** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **2070** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 252.06 | 266.9 | 266.44 | 🟢 **23243.97** |
|  | blinkHeapGrowth | 2.41 | 2.54 | 2.55 | 🟢 **5958.33** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 88.37 | 93.62 | 94.59 | 🟢 **137.98** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1440** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 271.75 | 267.05 | 259.8 | 🟢 **15527.35** |
|  | blinkHeapGrowth | -1.65 | = | -1.51 | 🟢 **4036.83** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3420** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 129.46 | 124.86 | 125.85 | 🟢 **13155.41** |
|  | blinkHeapGrowth | 43.36 | = | = | 🟢 **7010.77** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 112.08 | 107.05 | 110.42 | 🟢 **4532.93** |
|  | blinkHeapGrowth | 16.89 | 16.89 | = | 🟢 **2343.15** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −25% | −25% | −25% | −25% | −25% | −25% | 🔴 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −51% | −51% | −53% | −51% | −51% | −50% | 🟢 |
| complexLogic/answer/first | −54% | −54% | −54% | −55% | −53% | −53% | 🟢 |
| complexLogic/answer/type | −71% | −71% | −70% | −70% | −71% | −71% | 🟢 |
| complexLogic/load/paint | −64% | −64% | −64% | −64% | −64% | −64% | 🟢 |
| expressions/load/paint | −28% | −28% | −29% | −25% | −28% | −28% | 🔴 |
| records-10k/records/add-row@orders | +40% | +45% | +40% | +38% | +44% | +39% | 🟢 |
| records-plain/records/sort-1@panels30 | −78% | −79% | −76% | −77% | −78% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −68% | −67% | −68% | −66% | −69% | −68% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work), layoutCount 19 → 18 (render), recalcStyleCount 20 → 19 (render)
- complexLogic/answer/first (1D): layoutCount 0 → 1 (render), jsHeapGrowth 404.43 → 405.65 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 388.62 → 403.23 (heap)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2034 → 251 (work), recalcStyleCount 3 → 2 (render), jsHeapGrowth 322.97 → 405.83 (heap)
- complexLogic/answer/type (1D): layoutCount 5 → 2 (render), recalcStyleCount 6 → 2 (render), jsHeapGrowth 296.29 → 310.45 (heap), blinkHeapGrowth -16.6 → -2.35 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 289.92 → 310.66 (heap), blinkHeapGrowth -16.53 → -27.74 (heap)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work), layoutCount 6 → 1 (render), recalcStyleCount 7 → 1 (render), jsHeapGrowth 252.4 → 311.14 (heap), blinkHeapGrowth 1.86 → -2.35 (heap)
- expressions/load/paint (30D): layoutCount 14 → 13 (render), recalcStyleCount 15 → 14 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.73 → 42.15 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.68 → 42.08 (heap), blinkHeapGrowth 2.67 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.06 → 42.46 (heap), blinkHeapGrowth 2.67 → 2.32 (heap)
- manyPages/pages/next10 (1D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 129.16 → 129.57 (heap), blinkHeapGrowth 0.84 → 0.88 (heap)
- manyPages/pages/next10 (7D): layoutCount 27 → 17 (render), recalcStyleCount 27 → 17 (render), jsHeapGrowth 129.95 → 129.07 (heap), blinkHeapGrowth -0.05 → -0.06 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 136.8 → 128.62 (heap), blinkHeapGrowth 0.85 → -0.06 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 553.89 → 580.07 (heap), blinkHeapGrowth 6.56 → 6.23 (heap)
- manyPages/pages/preview (7D): jsHeapGrowth 546.08 → 581.65 (heap), blinkHeapGrowth 6.38 → 6.4 (heap)
- manyPages/pages/preview (30D): jsHeapGrowth 558.94 → 581.65 (heap), blinkHeapGrowth 6.46 → 6.52 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (1D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (1D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 296.61 → 305.33 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 288.83 → 303.96 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 166.84 → 170.02 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 162.72 → 169.61 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 269.47 → 271.24 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 261.64 → 272.17 (heap), blinkHeapGrowth 30.51 → 30.42 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 99.63 → 102.53 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 104.61 → 102.54 (heap), blinkHeapGrowth 18.44 → 18.43 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 104.32 → 107.24 (heap), blinkHeapGrowth 1.6 → -0.84 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 107 → 107.92 (heap), blinkHeapGrowth 4.19 → -1.17 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 291 → 2 (render), recalcStyleCount 291 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 93 → 2 (render), recalcStyleCount 93 → 2 (render)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 165.19 → 170.41 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 163.12 → 165.83 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 95.15 → 95.42 (heap), blinkHeapGrowth 8.09 → 9.12 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 93.16 → 100.89 (heap), blinkHeapGrowth 8.09 → 9.12 (heap)

Δ = today / build − 1.
