# survey-library · react · 23.11.2026 13:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45179909558

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 385 | = today | −1% | 🟢 **−20%** |
| complexLogic/answer/first | 248 | = today | +2% | 🟢 **−15%** |
| complexLogic/answer/type | 397 | = today | +2% | 🟢 **−17%** |
| complexLogic/load/paint | 1559 | = today | −1% | 🟢 **−27%** |
| expressions/load/paint | 7162 | = today | +1% | 🟢 **−16%** |
| large/load/paint | 572 | = today | −6% | 🟢 **−21%** |
| manyPages/load/paint | 476 | = today | −2% | 🟢 **−9%** |
| manyPages/pages/locale | 98.9 | = today | +1% | 🟢 **−16%** |
| manyPages/pages/next10 | 369 | = today | −1% | −8% |
| manyPages/pages/preview | 4586 | = today | 🟢 **−24%** | 🟢 **−39%** |
| records-10k/load/paint | 1292 | = today | 🟢 **−27%** | −8% |
| records-10k/records/add-row@orders | 293 | = today | −2% | 🔴 **+37%** |
| records-10k/records/edit-cell@orders | 563 | = today | 0% | 🔴 **+26%** |
| records-10k/records/filter-set@orders | 482 | = today | −1% | −1% |
| records-10k/records/last@orders | 316 | = today | +1% | n/a¹ |
| records-10k/records/next@orders | 239 | = today | +2% | n/a² |
| records-10k/records/sort-header@orders | 404 | = today | 0% | 🟢 **−44%** |
| records-1k/load/paint | 1373 | = today | −4% | 🟢 **−12%** |
| records-1k/records/next@ordersPanel | 49.2 | = today | +1% | n/a³ |
| records-plain/records/next@panelsPaged | 48.5 | = today | 0% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 109 | = today | +2% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 51.2 | = today | +1% | 🟢 **−70%** |
| records-plain/records/sort-header@orders30 | 88.1 | = today | +2% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 43.5 | = today | 0% | 🟢 **−73%** |

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
| complexLogic/answer/type | blinkHeapGrowth | -25.035 | — | 🟢 **3.75** | -19.25 |
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **2070** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 251.96 | — | 268.53 | 🟢 **23575.42** |
|  | blinkHeapGrowth | 2.54 | — | 2.68 | 🟢 **5958** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 88.22 | — | 94.48 | 🟢 **134.05** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **1440** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 271.5 | — | 262.12 | 🟢 **15715.58** |
|  | blinkHeapGrowth | 2.56 | — | -1.51 | 🟢 **4036.79** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **2064** |
|  | nodeGrowth | 0 | — | = | 🟢 **12012** |
|  | jsHeapGrowth | 272.33 | — | 263.07 | 🟢 **23262.71** |
|  | blinkHeapGrowth | 27.285 | — | 26.98 | 🟢 **5910.6** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **3420** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 127.405 | — | 125.6 | 🟢 **13288.95** |
|  | blinkHeapGrowth | 43.36 | — | = | 🟢 **7010** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **1140** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 109.83500000000001 | — | 108.76 | 🟢 **4583.19** |
|  | blinkHeapGrowth | 17.81 | — | 17.74 | 🟢 **2342.66** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **1980** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 124.47999999999999 | — | 126.01 | 🟢 **11128.11** |
|  | blinkHeapGrowth | 26.865000000000002 | — | 26.81 | 🟢 **5108.88** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **660** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 100.09 | — | 95.79 | 🟢 **3807** |
|  | blinkHeapGrowth | 9.39 | — | 8.36 | 🟢 **1704.3** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/preview | −24% | −26%..−23% | −25% | −24% | −25% | −25% | −24% | 🟢 |
| records-10k/load/paint | −27% | −28%..−26% | −27% | −27% | −27% | −28% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −20% | −22%..−18% | −21% | −19% | −21% | −21% | −19% | 🟢 |
| complexLogic/answer/first | −15% | −17%..−14% | −15% | −16% | −14% | −16% | −15% | 🟢 |
| complexLogic/answer/type | −17% | −24%..−11% | −21% | −18% | −14% | −16% | −19% | 🟢 |
| complexLogic/load/paint | −27% | −28%..−27% | −27% | −27% | −27% | −27% | −27% | 🟢 |
| expressions/load/paint | −16% | −30%..−11% | −22% | −23% | −24% | −23% | −13% | 🟢 |
| large/load/paint | −21% | −23%..−17% | −21% | −19% | −18% | −21% | −22% | 🟢 |
| manyPages/load/paint | −9% | −13%..−5% | −10% | −7% | −8% | −10% | −12% | 🟢 |
| manyPages/pages/locale | −16% | −22%..−10% | −17% | −11% | −17% | −19% | −15% | 🟢 |
| manyPages/pages/preview | −39% | −40%..−38% | −39% | −40% | −39% | −39% | −38% | 🟢 |
| records-10k/records/add-row@orders | +37% | +32%..+41% | +34% | +36% | +35% | +38% | +40% | 🟢 |
| records-10k/records/edit-cell@orders | +26% | +21%..+30% | +24% | +23% | +27% | +26% | +28% | 🟢 |
| records-10k/records/sort-header@orders | −44% | −45%..−44% | −44% | −45% | −45% | −44% | −44% | 🟢 |
| records-1k/load/paint | −12% | −16%..−6% | −7% | −13% | −13% | −12% | −11% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −78%..−76% | −77% | −76% | −77% | −78% | −76% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −70% | −72%..−69% | −70% | −71% | −70% | −72% | −70% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −80%..−79% | −80% | −79% | −80% | −79% | −80% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −75%..−72% | −74% | −74% | −74% | −73% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), jsHeapGrowth 384.93 → 403.29 (heap), blinkHeapGrowth 3.34 → -14.6 (heap)
- complexLogic/answer/first (30D): layoutCount 0 → 1 (render), jsHeapGrowth 322.01 → 406.04 (heap), blinkHeapGrowth -12.23 → -14.6 (heap)
- complexLogic/answer/type (7D): layoutCount 5 → 1 (render), recalcStyleCount 6 → 1 (render), jsHeapGrowth 290.35 → 311.01 (heap)
- complexLogic/answer/type (30D): layoutCount 5 → 2 (render), recalcStyleCount 6 → 2 (render), jsHeapGrowth 262.61 → 310.98 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.88 → 42.42 (heap), blinkHeapGrowth 2.66 → 2.54 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.16 → 42.44 (heap), blinkHeapGrowth 2.67 → 2.54 (heap)
- manyPages/pages/next10 (7D): layoutCount 25 → 16 (render), recalcStyleCount 25 → 16 (render), jsHeapGrowth 145.17 → 142.54 (heap), blinkHeapGrowth 33.73 → 34.49 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 15 (render), recalcStyleCount 26 → 15 (render), jsHeapGrowth 146.75 → 142.59 (heap), blinkHeapGrowth 32.04 → 36.83 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 545.65 → 581.18 (heap), blinkHeapGrowth 6.65 → 5.9 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 554.2 → 580.06 (heap), blinkHeapGrowth 6.4 → 5.53 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth -3.4 → 0.67 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth -17.01 → -3.54 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 289.41 → 302.89 (heap), blinkHeapGrowth 63.29 → 39.97 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 161.43 → 167.88 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 102.65 → 103.3 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 107.23 → 108.86 (heap), blinkHeapGrowth 13.87 → 13.88 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 53 → 2 (render), recalcStyleCount 53 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
