# survey-library · react · 24.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45302415096

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 562 | +1% | +1% | 🟢 **−19%** |
| complexLogic/answer/first | 247 | +1% | +2% | 🟢 **−15%** |
| complexLogic/answer/type | 413 | +3% | +4% | 🟢 **−16%** |
| complexLogic/load/paint | 1519 | 0% | +1% | 🟢 **−30%** |
| expressions/load/paint | 3871 | 0% | +2% | 🟢 **−24%** |
| large/load/paint | 1069 | +1% | −5% | 🟢 **−22%** |
| manyPages/load/paint | 626 | −1% | −1% | −8% |
| manyPages/pages/locale | 54.5 | −1% | +2% | 🟢 **−18%** |
| manyPages/pages/next10 | 258 | +1% | −3% | −7% |
| manyPages/pages/preview | 4601 | 0% | 🟢 **−25%** | 🟢 **−39%** |
| records-10k/load/paint | 1279 | +1% | 🟢 **−28%** | −8% |
| records-10k/records/add-row@orders | 298 | 0% | −2% | 🔴 **+37%** |
| records-10k/records/edit-cell@orders | 293 | +2% | −1% | 🔴 **+25%** |
| records-10k/records/filter-set@orders | 487 | +1% | −1% | −1% |
| records-10k/records/last@orders | 261 | +1% | +1% | n/a¹ |
| records-10k/records/next@orders | 226 | +1% | −1% | n/a² |
| records-10k/records/sort-header@orders | 383 | 0% | 0% | 🟢 **−46%** |
| records-1k/load/paint | 724 | −1% | −5% | 🟢 **−14%** |
| records-1k/records/next@ordersPanel | 53.5 | −4% | −5% | n/a³ |
| records-plain/records/next@panelsPaged | 42.5 | +1% | −2% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 133 | +2% | −1% | 🟢 **−74%** |
| records-plain/records/sort-1@panelsPaged | 81.7 | +1% | +2% | 🟢 **−67%** |
| records-plain/records/sort-header@orders30 | 150 | −1% | 0% | 🟢 **−76%** |
| records-plain/records/sort-header@ordersPaged | 77 | −1% | +2% | 🟢 **−70%** |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **2070** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 252.46 | 252.08 | 269.06 | 🟢 **23586.84** |
|  | blinkHeapGrowth | 2.6 | 2.66 | 2.55 | 🟢 **5958.01** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 86.94 | 86.25 | 93.07 | 🟢 **133.75** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1440** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 273.99 | 272.51 | 258.48 | 🟢 **15735.69** |
|  | blinkHeapGrowth | 2.56 | = | -1.51 | 🟢 **4036.79** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **2064** |
|  | nodeGrowth | 0 | = | = | 🟢 **12012** |
|  | jsHeapGrowth | 271.99 | 272.04 | 263.73 | 🟢 **23267.08** |
|  | blinkHeapGrowth | 26.97 | = | 27.14 | 🟢 **5910.61** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3420** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 157.93 | 152.44 | 159.48 | 🟢 **13284.6** |
|  | blinkHeapGrowth | 53.71 | = | = | 🟢 **7010.89** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 111.63 | 125.23 | 108.95 | 🟢 **4583.85** |
|  | blinkHeapGrowth | 16.85 | = | 16.88 | 🟢 **2344.91** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **1980** |
|  | nodeGrowth | 0 | = | = | 🟢 **11064** |
|  | jsHeapGrowth | 150.57 | 147.14 | 142.65 | 🟢 **11121.25** |
|  | blinkHeapGrowth | 32.48 | = | = | 🟢 **5148.26** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **660** |
|  | nodeGrowth | 0 | = | = | 🟢 **3690** |
|  | jsHeapGrowth | 102.01 | 101.29 | 92.93 | 🟢 **3826.69** |
|  | blinkHeapGrowth | 8.54 | = | 7.51 | 🟢 **1704.65** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/preview | −25% | −26%..−24% | −25% | −25% | −25% | −25% | −25% | 🟢 |
| records-10k/load/paint | −28% | −29%..−25% | −27% | −28% | −26% | −29% | −26% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −19% | −21%..−18% | −19% | −19% | −19% | −20% | −19% | 🟢 |
| complexLogic/answer/first | −15% | −18%..−12% | −14% | −14% | −13% | −16% | −17% | 🟢 |
| complexLogic/answer/type | −16% | −17%..−15% | −16% | −16% | −16% | −15% | −17% | 🟢 |
| complexLogic/load/paint | −30% | −31%..−29% | −31% | −30% | −30% | −29% | −31% | 🟢 |
| expressions/load/paint | −24% | −26%..−22% | −24% | −24% | −26% | −24% | −24% | 🟢 |
| large/load/paint | −22% | −23%..−21% | −22% | −21% | −22% | −22% | −22% | 🟢 |
| manyPages/pages/locale | −18% | −23%..−12% | −15% | −16% | −18% | −21% | −20% | 🟢 |
| manyPages/pages/preview | −39% | −40%..−38% | −39% | −40% | −39% | −39% | −39% | 🟢 |
| records-10k/records/add-row@orders | +37% | +30%..+48% | +45% | +38% | +39% | +37% | +33% | 🟢 |
| records-10k/records/edit-cell@orders | +25% | +20%..+28% | +24% | +23% | +24% | +27% | +22% | 🟢 |
| records-10k/records/sort-header@orders | −46% | −47%..−44% | −46% | −46% | −44% | −46% | −45% | 🟢 |
| records-1k/load/paint | −14% | −16%..−13% | −15% | −16% | −15% | −14% | −14% | 🟢 |
| records-plain/records/sort-1@panels30 | −74% | −76%..−73% | −75% | −74% | −73% | −75% | −74% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −67% | −69%..−66% | −68% | −67% | −67% | −68% | −68% | 🟢 |
| records-plain/records/sort-header@orders30 | −76% | −77%..−76% | −76% | −76% | −76% | −76% | −76% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −70% | −72%..−67% | −68% | −70% | −69% | −71% | −70% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (1D): layoutCount 1 → 0 (render), recalcStyleCount 2 → 1 (render), jsHeapGrowth 402.2 → 405.74 (heap), blinkHeapGrowth -9.62 → -11.1 (heap)
- complexLogic/answer/first (7D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), jsHeapGrowth 388.72 → 406.22 (heap), blinkHeapGrowth -12.54 → -14.6 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 3 → 2 (render), jsHeapGrowth 325.16 → 402.96 (heap), blinkHeapGrowth -32.75 → -14.6 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 310.1 → 309.96 (heap), blinkHeapGrowth -23.81 → -28.01 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 295.15 → 312.12 (heap), blinkHeapGrowth -15.96 → -28.07 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 261.33 → 310.26 (heap), blinkHeapGrowth -2.21 → -28.14 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 43.19 → 42.87 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 37.87 → 42.29 (heap), blinkHeapGrowth 2.37 → 2.47 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.16 → 42.64 (heap), blinkHeapGrowth 2.67 → 2.32 (heap)
- manyPages/pages/next10 (1D): layoutCount 16 → 17 (render), recalcStyleCount 16 → 17 (render), jsHeapGrowth 142.64 → 142.61 (heap), blinkHeapGrowth 0.84 → 0.82 (heap)
- manyPages/pages/next10 (7D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 143.4 → 144.3 (heap), blinkHeapGrowth 0.83 → -0.31 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 146.76 → 142.58 (heap), blinkHeapGrowth 0.97 → 0.82 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 582.3 → 580.9 (heap), blinkHeapGrowth 5.79 → 5.87 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 548.79 → 579.57 (heap), blinkHeapGrowth 6.81 → 5.87 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 555.69 → 579.61 (heap), blinkHeapGrowth 6.71 → 5.6 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 303.41 → 305.68 (heap), blinkHeapGrowth 4.16 → 8.11 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 293.4 → 304.87 (heap), blinkHeapGrowth 7.25 → -0.41 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 167.99 → 167.36 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 160.26 → 168.82 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 102.12 → 102.48 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 103.87 → 102.52 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 107.16 → 108.14 (heap), blinkHeapGrowth 3.12 → 13.88 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 106.9 → 107.93 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 53 → 2 (render), recalcStyleCount 53 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
