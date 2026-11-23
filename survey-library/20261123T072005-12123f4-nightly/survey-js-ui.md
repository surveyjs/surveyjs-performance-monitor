# survey-library · survey-js-ui · 23.11.2026 07:20 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45130286152

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 412 | = today | −1% | 🟢 **−21%** |
| complexLogic/answer/first | 209 | = today | +3% | 🟢 **−18%** |
| complexLogic/answer/type | 379 | = today | +4% | 🟢 **−20%** |
| complexLogic/load/paint | 2875 | = today | 0% | 🟢 **−28%** |
| expressions/load/paint | 6203 | = today | +1% | 🟢 **−24%** |
| large/load/paint | 538 | = today | 🟢 **−8%** | 🟢 **−21%** |
| manyPages/load/paint | 861 | = today | −3% | 🟢 **−8%** |
| manyPages/pages/locale | 54.5 | = today | −5% | 🟢 **−23%** |
| manyPages/pages/next10 | 228 | = today | −4% | 🟢 **−7%** |
| records-10k/load/paint | 2405 | = today | 🟢 **−23%** | 0% |
| records-10k/records/add-row@orders | 322 | = today | −1% | 🔴 **+41%** |
| records-10k/records/edit-cell@orders | 308 | = today | −2% | 🔴 **+21%** |
| records-10k/records/filter-set@orders | 803 | = today | −2% | +2% |
| records-10k/records/last@orders | 448 | = today | −2% | n/a¹ |
| records-10k/records/next@orders | 408 | = today | 0% | n/a² |
| records-10k/records/sort-header@orders | 343 | = today | 0% | 🟢 **−43%** |
| records-1k/load/paint | 1179 | = today | 🟢 **−6%** | 🟢 **−15%** |
| records-1k/records/next@ordersPanel | 49.3 | = today | +4% | n/a³ |
| records-plain/records/next@panelsPaged | 47.3 | = today | +2% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 99.2 | = today | −2% | 🟢 **−80%** |
| records-plain/records/sort-1@panelsPaged | 49.5 | = today | +2% | 🟢 **−69%** |
| records-plain/records/sort-header@orders30 | 91 | = today | +1% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 74.1 | = today | +1% | 🟢 **−71%** |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **6715** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 236.945 | — | 260.2 | 🟢 **26246.05** |
|  | blinkHeapGrowth | 2.3600000000000003 | — | 1.89 | 🟢 **6632.5** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 71.34 | — | 84.4 | 🟢 **133.3** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **4680** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 260.57 | — | 257.99 | 🟢 **17536.79** |
|  | blinkHeapGrowth | -2.875 | — | -2.86 | 🟢 **4505.43** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | — | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 264.74 | — | 🟢 **2468.27** | 🟢 **25908.87** |
|  | blinkHeapGrowth | 26.46 | — | 🟢 **311.7** | 🟢 **6587.29** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **8280** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 106.66 | — | 118.13 | 🟢 **19243.26** |
|  | blinkHeapGrowth | 36.41 | — | 43.3 | 🟢 **7708.2** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **2760** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 102.77000000000001 | — | 102.93 | 🟢 **6562.53** |
|  | blinkHeapGrowth | 16.275 | — | 16.37 | 🟢 **2571.05** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6120** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 113.15 | — | 106 | 🟢 **13277.67** |
|  | blinkHeapGrowth | 27.19 | — | = | 🟢 **5703.79** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2040** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 96.66 | — | 90.12 | 🟢 **4546.68** |
|  | blinkHeapGrowth | 10.09 | — | = | 🟢 **1958.94** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −8% | −10%..−5% | −7% | −7% | −10% | −8% | −7% | 🟢 |
| records-10k/load/paint | −23% | −24%..−22% | −23% | −23% | −24% | −23% | −23% | 🟢 |
| records-1k/load/paint | −6% | −7%..−5% | −6% | −6% | −6% | −6% | −5% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −21% | −23%..−17% | −20% | −22% | −19% | −19% | −21% | 🟢 |
| complexLogic/answer/first | −18% | −22%..−12% | −20% | −15% | −18% | −15% | −19% | 🟢 |
| complexLogic/answer/type | −20% | −27%..−10% | −16% | −23% | −21% | −13% | −19% | 🟢 |
| complexLogic/load/paint | −28% | −28%..−27% | −28% | −27% | −28% | −27% | −27% | 🟢 |
| expressions/load/paint | −24% | −26%..−22% | −25% | −24% | −23% | −24% | −25% | 🟢 |
| large/load/paint | −21% | −23%..−20% | −21% | −21% | −22% | −21% | −22% | 🟢 |
| manyPages/load/paint | −8% | −11%..−6% | −7% | −8% | −9% | −9% | −10% | 🟢 |
| manyPages/pages/locale | −23% | −27%..−17% | −19% | −22% | −24% | −19% | −24% | 🟢 |
| manyPages/pages/next10 | −7% | −9%..−4% | −6% | −5% | −7% | −7% | −8% | 🟢 |
| records-10k/records/add-row@orders | +41% | +38%..+47% | +42% | +41% | +40% | +46% | +43% | 🟢 |
| records-10k/records/edit-cell@orders | +21% | +11%..+31% | +26% | +15% | +25% | +17% | +19% | 🟢 |
| records-10k/records/sort-header@orders | −43% | −44%..−42% | −43% | −43% | −43% | −42% | −44% | 🟢 |
| records-1k/load/paint | −15% | −16%..−14% | −15% | −14% | −14% | −15% | −15% | 🟢 |
| records-plain/records/sort-1@panels30 | −80% | −81%..−79% | −80% | −80% | −79% | −80% | −80% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −69% | −70%..−67% | −67% | −69% | −69% | −69% | −68% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −81%..−79% | −80% | −80% | −80% | −80% | −79% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −71% | −72%..−70% | −72% | −71% | −71% | −72% | −71% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 339.69 → 328.35 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 282.6 → 326.36 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 305.08 → 297.42 (heap), blinkHeapGrowth -2.15 → -24.49 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 277.49 → 299.1 (heap), blinkHeapGrowth -24.6 → -2.29 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.71 → 40.05 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.31 → 39.57 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 119.59 → 119.89 (heap), blinkHeapGrowth 0.68 → 0.66 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 121.71 → 120.09 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 266.49 → 281.24 (heap), blinkHeapGrowth 38.36 → 38.22 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 143.76 → 150.06 (heap), blinkHeapGrowth 27.32 → 27.18 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 97.91 → 96.93 (heap), blinkHeapGrowth 17.52 → 17.55 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 101.89 → 100.43 (heap), blinkHeapGrowth 12.61 → 12.5 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
