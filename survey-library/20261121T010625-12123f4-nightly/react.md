# survey-library · react · 21.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44848104594

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 382 | 0% | +1% | −22% |
| complexLogic/answer/first | 361 | +1% | 0% | 🟢 **−26%** |
| complexLogic/answer/type | 400 | −1% | +6% | 🟢 **−43%** |
| complexLogic/load/paint | 2841 | 0% | 0% | 🟢 **−31%** |
| expressions/load/paint | 4582 | 0% | +1% | 🟢 **−28%** |
| large/load/paint | 768 | −1% | −7% | −24% |
| manyPages/load/paint | 461 | −1% | −3% | −11% |
| manyPages/pages/locale | 52.8 | +2% | 0% | −18% |
| manyPages/pages/next10 | 331 | 0% | 0% | −6% |
| manyPages/pages/preview | 6116 | −22% | −24% | 🟢 **−41%** |
| records-10k/load/paint | 1296 | +1% | 🟢 **−28%** | −5% |
| records-10k/records/add-row@orders | 298 | 0% | −2% | 🔴 **+45%** |
| records-10k/records/edit-cell@orders | 303 | +2% | +1% | +24% |
| records-10k/records/filter-set@orders | 781 | 0% | −2% | +3% |
| records-10k/records/last@orders | 239 | −1% | −1% | n/a¹ |
| records-10k/records/next@orders | 448 | +1% | +3% | n/a² |
| records-10k/records/sort-header@orders | 243 | 0% | +1% | n/a³ |
| records-1k/load/paint | 727 | 0% | −5% | −11% |
| records-1k/records/next@ordersPanel | 89.6 | +2% | +6% | n/a⁴ |
| records-plain/records/next@panelsPaged | 44.1 | 0% | 0% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 108 | +1% | −2% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 48.5 | 0% | +1% | 🟢 **−71%** |
| records-plain/records/sort-header@orders30 | 144 | −2% | +2% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 56.9 | 0% | +1% | n/a⁶ |

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
| complexLogic/answer/first | jsHeapGrowth | 408.21 | 400.77 | 387.42 | 🔴 **316.26** |
| manyPages/pages/preview | blinkHeapGrowth | 6.27 | 🟢 **79.98** | 🟢 **79.98** | 🟢 **79.82** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **2070** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 252.16 | 251.28 | 267.4 | 🟢 **23466.85** |
|  | blinkHeapGrowth | 2.9 | 3.15 | 2.81 | 🟢 **5958.34** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 86.97 | 88.92 | 93.79 | 🟢 **143.03** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1440** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 271.27 | 270.11 | 258.08 | 🟢 **15668.41** |
|  | blinkHeapGrowth | -1.65 | = | -1.51 | 🟢 **4036.83** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3420** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 127.6 | 129.65 | 128.54 | 🟢 **13193.51** |
|  | blinkHeapGrowth | 43.36 | = | = | 🟢 **7010.77** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 111.78 | 112.5 | 111.21 | 🟢 **4540.66** |
|  | blinkHeapGrowth | 17.48 | = | 17.57 | 🟢 **2341.38** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −28% | −28% | −27% | −28% | −28% | −28% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/answer/first | −26% | −26% | −27% | −25% | −26% | −27% | 🟢 |
| complexLogic/answer/type | −43% | −44% | −42% | −43% | −43% | −42% | 🟢 |
| complexLogic/load/paint | −31% | −31% | −31% | −30% | −31% | −30% | 🟢 |
| expressions/load/paint | −28% | −28% | −28% | −28% | −28% | −28% | 🟢 |
| manyPages/pages/preview | −41% | −41% | −40% | −40% | −41% | −41% | 🟢 |
| records-10k/records/add-row@orders | +45% | +44% | +44% | +45% | +44% | +45% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −77% | −78% | −78% | −77% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −71% | −69% | −71% | −71% | −71% | −72% | 🟢 |

## Counters (information)
- calculations/load/paint (1D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (1D): blinkHeapGrowth -2.25 → -2.19 (heap)
- complexLogic/answer/first (7D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), blinkHeapGrowth -1.97 → -2.19 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth 2.1 → -2.19 (heap)
- complexLogic/answer/type (1D): layoutCount 1 → 2 (render), recalcStyleCount 1 → 2 (render), jsHeapGrowth 312.4 → 316.71 (heap), blinkHeapGrowth -24.04 → -21.65 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 289.78 → 310.66 (heap), blinkHeapGrowth -16.11 → -22.5 (heap)
- complexLogic/answer/type (30D): layoutCount 5 → 1 (render), recalcStyleCount 6 → 1 (render), jsHeapGrowth 257.66 → 312.16 (heap), blinkHeapGrowth -2.17 → -2.35 (heap)
- expressions/load/paint (1D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 41.9 → 42.35 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 37.75 → 42.25 (heap), blinkHeapGrowth 2.62 → 2.46 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.34 → 42.46 (heap), blinkHeapGrowth 2.63 → 2.43 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 143.71 → 142.52 (heap), blinkHeapGrowth -1.1 → 3.71 (heap)
- manyPages/pages/next10 (7D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 145.31 → 142.71 (heap), blinkHeapGrowth 7.08 → -0.69 (heap)
- manyPages/pages/next10 (30D): layoutCount 25 → 16 (render), recalcStyleCount 25 → 16 (render), jsHeapGrowth 147.45 → 144.23 (heap), blinkHeapGrowth -3.39 → -2.59 (heap)
- manyPages/pages/preview (1D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 578.56 → 580.83 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 549.7 → 581.15 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 545.41 → 581.57 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 301.39 → 304.33 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 291.75 → 301.82 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 169.84 → 167.5 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 162.38 → 169.09 (heap), blinkHeapGrowth 27.63 → 27.49 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 272.25 → 272.29 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 265.33 → 273.1 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 126.99 → 127.43 (heap), blinkHeapGrowth 33.98 → 44.26 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 121.54 → 127.44 (heap), blinkHeapGrowth 35.53 → 43.95 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 107.63 → 104.1 (heap), blinkHeapGrowth -0.84 → 3.01 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 107.64 → 108.33 (heap), blinkHeapGrowth 4.3 → 3.06 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 299 → 2 (render), recalcStyleCount 299 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 90 → 2 (render), recalcStyleCount 90 → 2 (render)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 147.1 → 147.22 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 139.57 → 147.11 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 100.21 → 100.83 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 92.86 → 100.49 (heap), blinkHeapGrowth -5.99 → -3.48 (heap)

Δ = today / build − 1.
