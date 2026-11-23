# survey-library · survey-js-ui · 23.11.2026 13:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45179909558

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 404 | = today | 0% | 🟢 **−19%** |
| complexLogic/answer/first | 234 | = today | +3% | 🟢 **−16%** |
| complexLogic/answer/type | 473 | = today | +3% | 🟢 **−16%** |
| complexLogic/load/paint | 1566 | = today | 0% | 🟢 **−30%** |
| expressions/load/paint | 6130 | = today | +2% | 🟢 **−23%** |
| large/load/paint | 540 | = today | −7% | 🟢 **−20%** |
| manyPages/load/paint | 855 | = today | −3% | −9% |
| manyPages/pages/locale | 60.7 | = today | −2% | 🟢 **−22%** |
| manyPages/pages/next10 | 284 | = today | +2% | −6% |
| records-10k/load/paint | 1309 | = today | 🟢 **−27%** | −8% |
| records-10k/records/add-row@orders | 285 | = today | −1% | 🔴 **+40%** |
| records-10k/records/edit-cell@orders | 301 | = today | −3% | 🔴 **+19%** |
| records-10k/records/filter-set@orders | 492 | = today | −2% | −2% |
| records-10k/records/last@orders | 235 | = today | 0% | n/a¹ |
| records-10k/records/next@orders | 240 | = today | 0% | n/a² |
| records-10k/records/sort-header@orders | 345 | = today | 0% | 🟢 **−44%** |
| records-1k/load/paint | 1117 | = today | −4% | 🟢 **−14%** |
| records-1k/records/next@ordersPanel | 51.2 | = today | −2% | n/a³ |
| records-plain/records/next@panelsPaged | 46.1 | = today | +4% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 99 | = today | +4% | 🟢 **−81%** |
| records-plain/records/sort-1@panelsPaged | 46.2 | = today | +2% | 🟢 **−73%** |
| records-plain/records/sort-header@orders30 | 93.2 | = today | +2% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 46.8 | = today | 0% | 🟢 **−73%** |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **6715** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 237.26 | — | 261.1 | 🟢 **26245.99** |
|  | blinkHeapGrowth | 1.76 | — | 1.9 | 🟢 **6662.51** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 69.65 | — | 83.25 | 🟢 **130.56** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **4680** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 260.035 | — | 257.69 | 🟢 **17536.79** |
|  | blinkHeapGrowth | -0.78 | — | -2.87 | 🟢 **4505.42** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | — | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 264.35 | — | 🟢 **2468.2** | 🟢 **25907.99** |
|  | blinkHeapGrowth | 26.46 | — | 🟢 **311.7** | 🟢 **6587.3** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **8280** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 106.305 | — | 107.65 | 🟢 **19245.11** |
|  | blinkHeapGrowth | 36.41 | — | = | 🟢 **7708.09** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **2760** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 104.78999999999999 | — | 102.47 | 🟢 **6534.71** |
|  | blinkHeapGrowth | 4.56 | — | -9.82 | 🟢 **2570.64** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6120** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 113.485 | — | 105.49 | 🟢 **13276.33** |
|  | blinkHeapGrowth | 27.19 | — | = | 🟢 **5703.79** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2040** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 96.13 | — | 90.68 | 🟢 **4545.29** |
|  | blinkHeapGrowth | 9.86 | — | = | 🟢 **1902.64** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −28%..−27% | −28% | −27% | −28% | −28% | −28% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −19% | −22%..−17% | −20% | −20% | −17% | −20% | −20% | 🟢 |
| complexLogic/answer/first | −16% | −18%..−13% | −16% | −14% | −15% | −17% | −17% | 🟢 |
| complexLogic/answer/type | −16% | −19%..−14% | −17% | −16% | −18% | −16% | −14% | 🟢 |
| complexLogic/load/paint | −30% | −31%..−28% | −30% | −30% | −29% | −29% | −30% | 🟢 |
| expressions/load/paint | −23% | −29%..−19% | −22% | −23% | −23% | −24% | −28% | 🟢 |
| large/load/paint | −20% | −23%..−17% | −20% | −21% | −22% | −19% | −20% | 🟢 |
| manyPages/pages/locale | −22% | −27%..−15% | −19% | −20% | −26% | −19% | −22% | 🟢 |
| records-10k/records/add-row@orders | +40% | +31%..+48% | +45% | +37% | +34% | +40% | +42% | 🟢 |
| records-10k/records/edit-cell@orders | +19% | +11%..+28% | +22% | +15% | +19% | +16% | +25% | 🟢 |
| records-10k/records/sort-header@orders | −44% | −45%..−42% | −44% | −43% | −43% | −44% | −43% | 🟢 |
| records-1k/load/paint | −14% | −18%..−9% | −13% | −16% | −10% | −13% | −14% | 🟢 |
| records-plain/records/sort-1@panels30 | −81% | −81%..−80% | −81% | −80% | −81% | −80% | −81% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −73% | −75%..−70% | −71% | −73% | −71% | −74% | −73% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −80%..−79% | −80% | −79% | −80% | −80% | −79% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −74%..−72% | −73% | −73% | −73% | −73% | −72% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 340.03 → 325.22 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 282.35 → 326.26 (heap), blinkHeapGrowth 5.3 → -2.29 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 306.31 → 298.86 (heap), blinkHeapGrowth 1.2 → -2.29 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 281.54 → 297.09 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.95 → 39.63 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.19 → 40.54 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 139.09 → 131.46 (heap), blinkHeapGrowth 1.78 → -39.68 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 131.44 → 131.41 (heap), blinkHeapGrowth 1.77 → 1.81 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.08 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 265.52 → 282.3 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 144.51 → 148.7 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 96.77 → 98.2 (heap), blinkHeapGrowth 17.58 → 17.66 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 101.84 → 100.93 (heap), blinkHeapGrowth -18.43 → -3.2 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
