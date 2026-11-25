# survey-library · react · 25.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45523195696

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 381 | +1% | +2% | 🟢 **−20%** |
| complexLogic/answer/first | 307 | 0% | −1% | 🟢 **−15%** |
| complexLogic/answer/type | 386 | 0% | +1% | 🟢 **−16%** |
| complexLogic/load/paint | 1754 | 0% | 0% | 🟢 **−27%** |
| expressions/load/paint | 3844 | 0% | +1% | 🟢 **−24%** |
| large/load/paint | 1064 | 0% | +1% | 🟢 **−22%** |
| manyPages/load/paint | 491 | −1% | +5% | 🟢 **−10%** |
| manyPages/pages/locale | 59.7 | +4% | +1% | −15% |
| manyPages/pages/next10 | 322 | +3% | −1% | −7% |
| manyPages/pages/preview | 4597 | +1% | 🟢 **−23%** | 🟢 **−39%** |
| records-10k/load/paint | 2368 | 0% | 🟢 **−23%** | +1% |
| records-10k/records/add-row@orders | 514 | +1% | −2% | 🔴 **+47%** |
| records-10k/records/edit-cell@orders | 303 | +1% | 0% | 🔴 **+26%** |
| records-10k/records/filter-set@orders | 428 | 0% | −1% | +5% |
| records-10k/records/last@orders | 233 | 0% | −2% | n/a¹ |
| records-10k/records/next@orders | 239 | +2% | −1% | n/a² |
| records-10k/records/sort-header@orders | 459 | 0% | +1% | 🟢 **−40%** |
| records-1k/load/paint | 737 | +1% | −5% | 🟢 **−15%** |
| records-1k/records/next@ordersPanel | 48.8 | −1% | +4% | n/a³ |
| records-plain/records/next@panelsPaged | 46.3 | 0% | 0% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 101 | −2% | +1% | 🟢 **−78%** |
| records-plain/records/sort-1@panelsPaged | 49.5 | 0% | −1% | 🟢 **−71%** |
| records-plain/records/sort-header@orders30 | 169 | −1% | +1% | 🟢 **−74%** |
| records-plain/records/sort-header@ordersPaged | 78.4 | 0% | +2% | 🟢 **−70%** |

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
| complexLogic/answer/first | jsHeapGrowth | 406.24 | 403.88 | 403.64 | 🔴 **322.72** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **2070** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 254.33 | 249.17 | 267.11 | 🟢 **23571.04** |
|  | blinkHeapGrowth | 3.82 | 3.58 | = | 🟢 **5958.03** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 87.39 | 88.05 | 90.79 | 🟢 **135.44** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1440** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 274.31 | 273.75 | 261.54 | 🟢 **15718.67** |
|  | blinkHeapGrowth | 66.09 | 65.63 | 73.26 | 🟢 **4040.83** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **2064** |
|  | nodeGrowth | 0 | = | = | 🟢 **12012** |
|  | jsHeapGrowth | 274.58 | 273.41 | 267.81 | 🟢 **23266.04** |
|  | blinkHeapGrowth | 28.6 | 27.36 | 28.66 | 🟢 **5910.61** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3420** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 131.47 | 131.74 | 129.32 | 🟢 **13281.18** |
|  | blinkHeapGrowth | 43.36 | = | = | 🟢 **7015.66** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 111.22 | 112.35 | 110.18 | 🟢 **4583.76** |
|  | blinkHeapGrowth | 17.58 | = | 17.62 | 🟢 **2342.44** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **1980** |
|  | nodeGrowth | 0 | = | = | 🟢 **11064** |
|  | jsHeapGrowth | 167.21 | 174.5 | 163.51 | 🟢 **11126.22** |
|  | blinkHeapGrowth | 36.61 | = | = | 🟢 **5142.97** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **660** |
|  | nodeGrowth | 0 | = | = | 🟢 **3690** |
|  | jsHeapGrowth | 100.25 | 103.02 | 92.83 | 🟢 **3825.71** |
|  | blinkHeapGrowth | 8.54 | = | 7.51 | 🟢 **1704.65** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/preview | −23% | −25%..−22% | −24% | −23% | −23% | −22% | −24% | 🟢 |
| records-10k/load/paint | −23% | −24%..−23% | −24% | −23% | −24% | −23% | −24% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −20% | −21%..−19% | −20% | −20% | −20% | −21% | −21% | 🟢 |
| complexLogic/answer/first | −15% | −19%..−12% | −18% | −15% | −13% | −15% | −16% | 🟢 |
| complexLogic/answer/type | −16% | −19%..−14% | −15% | −16% | −18% | −16% | −16% | 🟢 |
| complexLogic/load/paint | −27% | −33%..−19% | −28% | −20% | −27% | −28% | −27% | 🟢 |
| expressions/load/paint | −24% | −26%..−21% | −24% | −24% | −22% | −25% | −23% | 🟢 |
| large/load/paint | −22% | −22%..−21% | −21% | −22% | −21% | −21% | −22% | 🟢 |
| manyPages/load/paint | −10% | −14%..−4% | −9% | −12% | −11% | −8% | −6% | 🟢 |
| manyPages/pages/locale | −15% | −21%..−9% | −18% | −13% | −13% | −18% | −13% | 🔴 |
| manyPages/pages/preview | −39% | −40%..−37% | −40% | −38% | −38% | −38% | −38% | 🟢 |
| records-10k/records/add-row@orders | +47% | +44%..+51% | +46% | +49% | +45% | +47% | +48% | 🟢 |
| records-10k/records/edit-cell@orders | +26% | +20%..+32% | +28% | +21% | +27% | +28% | +25% | 🟢 |
| records-10k/records/sort-header@orders | −40% | −42%..−37% | −41% | −41% | −40% | −40% | −38% | 🟢 |
| records-1k/load/paint | −15% | −17%..−13% | −16% | −15% | −15% | −14% | −14% | 🟢 |
| records-plain/records/sort-1@panels30 | −78% | −79%..−78% | −78% | −78% | −78% | −78% | −79% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −71% | −72%..−69% | −70% | −71% | −71% | −70% | −70% | 🟢 |
| records-plain/records/sort-header@orders30 | −74% | −75%..−74% | −75% | −75% | −74% | −74% | −74% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −70% | −72%..−68% | −69% | −69% | −71% | −70% | −71% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): layoutCount 0 → 1 (render), blinkHeapGrowth -2.23 → -2.31 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth -2.08 → -2.31 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 308.77 → 308.86 (heap), blinkHeapGrowth -22.55 → -20.29 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 288.63 → 310.7 (heap), blinkHeapGrowth -17.03 → -26.27 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 261.71 → 309.79 (heap), blinkHeapGrowth -19.25 → -26.01 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 42.17 → 42.54 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.96 → 41.98 (heap), blinkHeapGrowth 2.53 → 2.47 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.09 → 42.18 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 143.1 → 142.56 (heap), blinkHeapGrowth -9.8 → -0.29 (heap)
- manyPages/pages/next10 (7D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 144.04 → 142.9 (heap), blinkHeapGrowth -13.56 → 4.96 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 148.85 → 142.78 (heap), blinkHeapGrowth 4.36 → 4.14 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 582 → 579.84 (heap), blinkHeapGrowth 5.69 → 5.46 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 548.32 → 578.74 (heap), blinkHeapGrowth 6.43 → 5.59 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 557 → 582.3 (heap), blinkHeapGrowth 6.28 → 6.07 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 305.15 → 306.18 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 294.79 → 304.8 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 168.8 → 168.98 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 168.88 → 167.16 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 103.03 → 102.02 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 102.78 → 102.93 (heap), blinkHeapGrowth 18.42 → 18.44 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 108.41 → 108.08 (heap), blinkHeapGrowth -1.48 → 13.87 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 106.82 → 108.26 (heap), blinkHeapGrowth 13.88 → 13.87 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 54 → 2 (render), recalcStyleCount 54 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
