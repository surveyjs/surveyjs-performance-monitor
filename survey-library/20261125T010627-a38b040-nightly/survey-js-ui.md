# survey-library · survey-js-ui · 25.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45523195696

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 404 | +1% | +1% | 🟢 **−20%** |
| complexLogic/answer/first | 241 | −1% | −1% | 🟢 **−17%** |
| complexLogic/answer/type | 616 | +1% | +5% | 🟢 **−16%** |
| complexLogic/load/paint | 2673 | 0% | 0% | 🟢 **−28%** |
| expressions/load/paint | 6217 | −1% | +1% | 🟢 **−23%** |
| large/load/paint | 556 | −1% | +2% | 🟢 **−21%** |
| manyPages/load/paint | 868 | 0% | +4% | −8% |
| manyPages/pages/locale | 56 | +2% | 0% | −23% |
| manyPages/pages/next10 | 228 | +1% | −1% | −7% |
| records-10k/load/paint | 1373 | 0% | 🟢 **−26%** | −1% |
| records-10k/records/add-row@orders | 296 | +1% | −2% | 🔴 **+40%** |
| records-10k/records/edit-cell@orders | 304 | +2% | 0% | 🔴 **+19%** |
| records-10k/records/filter-set@orders | 507 | +1% | −2% | +3% |
| records-10k/records/last@orders | 235 | 0% | 0% | n/a¹ |
| records-10k/records/next@orders | 429 | 0% | +1% | n/a² |
| records-10k/records/sort-header@orders | 250 | 0% | −2% | 🟢 **−51%** |
| records-1k/load/paint | 1193 | 0% | −5% | 🟢 **−14%** |
| records-1k/records/next@ordersPanel | 93.9 | 0% | +8% | n/a³ |
| records-plain/records/next@panelsPaged | 62.9 | −1% | +3% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 105 | −2% | 0% | 🟢 **−79%** |
| records-plain/records/sort-1@panelsPaged | 48.9 | 0% | +1% | 🟢 **−73%** |
| records-plain/records/sort-header@orders30 | 175 | +1% | +1% | 🟢 **−75%** |
| records-plain/records/sort-header@ordersPaged | 46.5 | −1% | +2% | 🟢 **−74%** |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **6715** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 237.5 | 236.6 | 260.06 | 🟢 **26248.43** |
|  | blinkHeapGrowth | 1.76 | = | 1.75 | 🟢 **6668.2** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 69.75 | 70.55 | 81.84 | 🟢 **134.54** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4680** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 264.51 | 262.96 | 258.95 | 🟢 **17536.77** |
|  | blinkHeapGrowth | -3 | -2.76 | -3.01 | 🟢 **4505.42** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | = | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 264.21 | 262.75 | 🟢 **2472.22** | 🟢 **25901.7** |
|  | blinkHeapGrowth | 30.27 | = | 🟢 **315.73** | 🟢 **6587.3** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **8280** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 121.56 | 122.51 | 115.39 | 🟢 **19235.31** |
|  | blinkHeapGrowth | 43.3 | = | = | 🟢 **7708.09** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2760** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 104.82 | 103.38 | 102.49 | 🟢 **6510.09** |
|  | blinkHeapGrowth | 16.58 | = | 16.47 | 🟢 **2570.51** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6120** |
|  | nodeGrowth | 0 | = | = | 🟢 **11064** |
|  | jsHeapGrowth | 146.62 | 148.01 | 142.41 | 🟢 **13280.94** |
|  | blinkHeapGrowth | 36.12 | = | = | 🟢 **5655.88** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2040** |
|  | nodeGrowth | 0 | = | = | 🟢 **3690** |
|  | jsHeapGrowth | 97.67 | 98.57 | 92.65 | 🟢 **4545.74** |
|  | blinkHeapGrowth | 9.86 | = | = | 🟢 **1902.64** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −26% | −27%..−23% | −27% | −26% | −24% | −24% | −26% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −20% | −31%..−11% | −20% | −19% | −30% | −19% | −20% | 🟢 |
| complexLogic/answer/first | −17% | −19%..−14% | −16% | −19% | −18% | −16% | −16% | 🟢 |
| complexLogic/answer/type | −16% | −20%..−12% | −13% | −17% | −17% | −18% | −17% | 🟢 |
| complexLogic/load/paint | −28% | −29%..−28% | −28% | −28% | −28% | −28% | −28% | 🟢 |
| expressions/load/paint | −23% | −25%..−22% | −24% | −23% | −22% | −23% | −24% | 🟢 |
| large/load/paint | −21% | −22%..−20% | −22% | −21% | −21% | −20% | −21% | 🟢 |
| manyPages/pages/locale | −23% | −32%..−11% | −27% | −16% | −26% | −22% | −18% | 🔴 |
| records-10k/records/add-row@orders | +40% | +31%..+48% | +40% | +43% | +40% | +32% | +42% | 🟢 |
| records-10k/records/edit-cell@orders | +19% | +11%..+27% | +16% | +25% | +16% | +20% | +19% | 🟢 |
| records-10k/records/sort-header@orders | −51% | −53%..−49% | −52% | −51% | −51% | −53% | −52% | 🟢 |
| records-1k/load/paint | −14% | −14%..−13% | −14% | −14% | −14% | −14% | −14% | 🟢 |
| records-plain/records/sort-1@panels30 | −79% | −81%..−78% | −79% | −79% | −80% | −79% | −80% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −73% | −76%..−69% | −73% | −73% | −70% | −74% | −73% | 🟢 |
| records-plain/records/sort-header@orders30 | −75% | −76%..−74% | −75% | −75% | −75% | −75% | −76% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −74% | −74%..−73% | −74% | −73% | −73% | −74% | −74% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (1D): jsHeapGrowth 327.03 → 326.29 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 356.52 → 328.11 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 282.11 → 327.32 (heap), blinkHeapGrowth -31.31 → -2.29 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 297.38 → 297.15 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 307.83 → 297.28 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 282.4 → 300.08 (heap), blinkHeapGrowth 1.91 → -2.29 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 39.63 → 40.08 (heap), blinkHeapGrowth 2.46 → 2.31 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.14 → 39.34 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.12 → 39.45 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 117.97 → 120.56 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 119.49 → 119.39 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 122.29 → 118.7 (heap), blinkHeapGrowth 0.66 → 0.68 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 278.48 → 281.41 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 269.39 → 280.74 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 149.49 → 148.92 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 147.09 → 148 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 120.21 → 120.27 (heap), blinkHeapGrowth 26.17 → 26.19 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 112.44 → 120.36 (heap), blinkHeapGrowth 49.93 → 26.18 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 101.39 → 101.11 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 101.2 → 101.39 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
