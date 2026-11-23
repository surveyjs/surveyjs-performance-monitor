# survey-library · react · 23.11.2026 07:20 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45130286152

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 396 | = today | +1% | 🟢 **−21%** |
| complexLogic/answer/first | 416 | = today | +2% | 🟢 **−17%** |
| complexLogic/answer/type | 508 | = today | +3% | 🟢 **−16%** |
| complexLogic/load/paint | 1555 | = today | 0% | 🟢 **−30%** |
| expressions/load/paint | 6385 | = today | +2% | 🟢 **−23%** |
| large/load/paint | 558 | = today | 🟢 **−6%** | 🟢 **−21%** |
| manyPages/load/paint | 469 | = today | −1% | 🟢 **−9%** |
| manyPages/pages/locale | 56.2 | = today | +2% | −18% |
| manyPages/pages/next10 | 314 | = today | −4% | −8% |
| manyPages/pages/preview | 4409 | = today | 🟢 **−24%** | 🟢 **−37%** |
| records-10k/load/paint | 2145 | = today | 🟢 **−25%** | −4% |
| records-10k/records/add-row@orders | 298 | = today | 0% | 🔴 **+37%** |
| records-10k/records/edit-cell@orders | 313 | = today | −1% | 🔴 **+30%** |
| records-10k/records/filter-set@orders | 821 | = today | −1% | +1% |
| records-10k/records/last@orders | 242 | = today | +1% | n/a¹ |
| records-10k/records/next@orders | 423 | = today | −1% | n/a² |
| records-10k/records/sort-header@orders | 249 | = today | −1% | 🟢 **−50%** |
| records-1k/load/paint | 736 | = today | −4% | 🟢 **−15%** |
| records-1k/records/next@ordersPanel | 50.3 | = today | 0% | n/a³ |
| records-plain/records/next@panelsPaged | 78.5 | = today | −1% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 113 | = today | +3% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 49.8 | = today | +5% | 🟢 **−70%** |
| records-plain/records/sort-header@orders30 | 155 | = today | +3% | 🟢 **−76%** |
| records-plain/records/sort-header@ordersPaged | 51.1 | = today | +6% | 🟢 **−72%** |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁴ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]

🔴 slower · 🟢 faster: a change of 5% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/first | jsHeapGrowth | 409.24 | — | 390.23 | 🔴 **320.1** |
| manyPages/pages/next10 | blinkHeapGrowth | -33.510000000000005 | — | 🟢 **3.64** | 2.17 |
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **2070** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 251.88 | — | 270.93 | 🟢 **23577.04** |
|  | blinkHeapGrowth | 2.54 | — | 2.68 | 🟢 **5958.01** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 87.68 | — | 92.17 | 🟢 **134.73** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **1440** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 271.605 | — | 260.38 | 🟢 **15716.74** |
|  | blinkHeapGrowth | -1.65 | — | -1.51 | 🟢 **4036.82** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **2064** |
|  | nodeGrowth | 0 | — | = | 🟢 **12012** |
|  | jsHeapGrowth | 271.9 | — | 262.98 | 🟢 **23264.69** |
|  | blinkHeapGrowth | 30.51 | — | 30.51 | 🟢 **5910.23** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **3420** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 127.66 | — | 129.27 | 🟢 **13283.3** |
|  | blinkHeapGrowth | 43.36 | — | = | 🟢 **7010** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **1140** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 112.33500000000001 | — | 110.68 | 🟢 **4585.37** |
|  | blinkHeapGrowth | 17.525 | — | 17.61 | 🟢 **2342.38** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **1980** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 147.345 | — | 142.82 | 🟢 **11127.38** |
|  | blinkHeapGrowth | 32.48 | — | = | 🟢 **5142.09** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **660** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 100.625 | — | 94.84 | 🟢 **3827.53** |
|  | blinkHeapGrowth | -5.3149999999999995 | — | -4.58 | 🟢 **1703.78** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −6% | −8%..−3% | −4% | −7% | −6% | −6% | −4% | 🟢 |
| manyPages/pages/preview | −24% | −27%..−23% | −26% | −25% | −24% | −26% | −24% | 🟢 |
| records-10k/load/paint | −25% | −27%..−23% | −26% | −24% | −24% | −26% | −24% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −21% | −21%..−19% | −20% | −20% | −20% | −21% | −21% | 🟢 |
| complexLogic/answer/first | −17% | −23%..−10% | −16% | −18% | −11% | −18% | −19% | 🟢 |
| complexLogic/answer/type | −16% | −20%..−13% | −15% | −17% | −18% | −19% | −15% | 🟢 |
| complexLogic/load/paint | −30% | −31%..−29% | −29% | −30% | −30% | −30% | −31% | 🟢 |
| expressions/load/paint | −23% | −25%..−22% | −24% | −24% | −23% | −23% | −24% | 🟢 |
| large/load/paint | −21% | −24%..−19% | −23% | −21% | −21% | −19% | −21% | 🟢 |
| manyPages/load/paint | −9% | −12%..−6% | −8% | −11% | −10% | −8% | −8% | 🟢 |
| manyPages/pages/locale | −18% | −25%..−10% | −17% | −22% | −12% | −19% | −19% | 🔴 |
| manyPages/pages/next10 | −8% | −12%..−2% | −4% | −8% | −9% | −5% | −9% | 🔴 |
| manyPages/pages/preview | −37% | −42%..−34% | −39% | −40% | −35% | −38% | −36% | 🟢 |
| records-10k/records/add-row@orders | +37% | +35%..+41% | +38% | +38% | +40% | +36% | +37% | 🟢 |
| records-10k/records/edit-cell@orders | +30% | +20%..+45% | +41% | +32% | +28% | +32% | +25% | 🟢 |
| records-10k/records/sort-header@orders | −50% | −51%..−48% | −50% | −49% | −49% | −50% | −50% | 🟢 |
| records-1k/load/paint | −15% | −16%..−14% | −15% | −15% | −15% | −15% | −15% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −78%..−76% | −77% | −77% | −77% | −77% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −70% | −72%..−69% | −70% | −70% | −72% | −70% | −71% | 🟢 |
| records-plain/records/sort-header@orders30 | −76% | −76%..−75% | −75% | −75% | −76% | −75% | −75% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −72% | −75%..−69% | −71% | −74% | −72% | −71% | −71% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth -1.96 → -2.13 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth 2.1 → -2.19 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 289.68 → 313.01 (heap), blinkHeapGrowth -2.21 → -2.29 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 263.5 → 313.78 (heap), blinkHeapGrowth -2.21 → -2.35 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 37.8 → 42.09 (heap), blinkHeapGrowth 2.53 → 2.36 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.16 → 42.71 (heap), blinkHeapGrowth 2.67 → 2.32 (heap)
- manyPages/pages/next10 (7D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 145.95 → 145.5 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 148.87 → 144.21 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 551.29 → 578.5 (heap), blinkHeapGrowth 8.04 → 6.33 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 554.23 → 581.49 (heap), blinkHeapGrowth 6.78 → 6.27 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 287.91 → 303.73 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 163.07 → 169.82 (heap), blinkHeapGrowth 27.5 → 27.36 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 103.63 → 103.2 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 121.87 → 121.2 (heap), blinkHeapGrowth 27.35 → 15.25 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 93 → 2 (render), recalcStyleCount 93 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
