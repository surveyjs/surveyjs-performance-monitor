# survey-library · survey-js-ui · 22.11.2026 01:06 UTC

> not run (worker failed): angular records-10k/records/edit-cell@orders https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335/job/137047904859 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 401 | = today | −1% | −21% |
| complexLogic/answer/first | 250 | = today | +2% | −15% |
| complexLogic/answer/type | 396 | = today | +5% | −17% |
| complexLogic/load/paint | 1586 | = today | 0% | 🟢 **−29%** |
| expressions/load/paint | 3962 | = today | +2% | −24% |
| large/load/paint | 538 | = today | −6% | −22% |
| manyPages/load/paint | 467 | = today | −3% | −9% |
| manyPages/pages/locale | 53.4 | = today | −5% | −24% |
| manyPages/pages/next10 | 281 | = today | +2% | −3% |
| records-10k/load/paint | 1268 | = today | 🟢 **−27%** | −9% |
| records-10k/records/add-row@orders | 299 | = today | −2% | 🔴 **+38%** |
| records-10k/records/edit-cell@orders | 309 | = today | −2% | +20% |
| records-10k/records/filter-set@orders | 494 | = today | −1% | −3% |
| records-10k/records/last@orders | 436 | = today | −1% | n/a¹ |
| records-10k/records/next@orders | 239 | = today | −1% | n/a² |
| records-10k/records/sort-header@orders | 256 | = today | 0% | 🟢 **−52%** |
| records-1k/load/paint | 732 | = today | −5% | −17% |
| records-1k/records/next@ordersPanel | 46 | = today | 0% | n/a³ |
| records-plain/records/next@panelsPaged | 47.9 | = today | −1% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 119 | = today | +3% | 🟢 **−78%** |
| records-plain/records/sort-1@panelsPaged | 49.6 | = today | +2% | 🟢 **−73%** |
| records-plain/records/sort-header@orders30 | 96.2 | = today | +3% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 46.8 | = today | −1% | 🟢 **−74%** |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁴ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **6715** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 237.245 | — | 260.11 | 🟢 **26188.63** |
|  | blinkHeapGrowth | 2.065 | — | 1.9 | 🟢 **6666.38** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 70.515 | — | 84.71 | 🟢 **133.01** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **4680** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 261.655 | — | 258.06 | 🟢 **17495.67** |
|  | blinkHeapGrowth | 1.075 | — | -2.87 | 🟢 **4505.43** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | 🟢 **341** | 🟢 **6712** |
|  | nodeGrowth | 0 | — | 🟢 **489** | 🟢 **12012** |
|  | jsHeapGrowth | 262.625 | — | 🟢 **2468.21** | 🟢 **25841.23** |
|  | blinkHeapGrowth | 30.45 | — | 🟢 **315.73** | 🟢 **6587.28** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **8280** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 119.94999999999999 | — | 116.55 | 🟢 **19173.13** |
|  | blinkHeapGrowth | 43.3 | — | = | 🟢 **7708.09** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **2760** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 104.53999999999999 | — | 101.5 | 🟢 **6507.68** |
|  | blinkHeapGrowth | 16.585 | — | 16.41 | 🟢 **2570.78** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6120** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 113.42500000000001 | — | 107.01 | 🟢 **13208.82** |
|  | blinkHeapGrowth | 27.19 | — | 27.19 | 🟢 **5703.79** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2040** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 93.81 | — | 90.05 | 🟢 **4521.93** |
|  | blinkHeapGrowth | 9.86 | — | = | 🟢 **1902.65** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −31% | −27% | −28% | −27% | −26% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −29% | −29% | −29% | −29% | −28% | −29% | 🟢 |
| records-10k/records/add-row@orders | +38% | +39% | +38% | +35% | +35% | +39% | 🟢 |
| records-10k/records/sort-header@orders | −52% | −52% | −51% | −50% | −52% | −52% | 🟢 |
| records-plain/records/sort-1@panels30 | −78% | −78% | −78% | −78% | −78% | −78% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −73% | −71% | −72% | −73% | −73% | −73% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −79% | −80% | −80% | −80% | −80% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −74% | −73% | −74% | −74% | −73% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 337.09 → 324.05 (heap), blinkHeapGrowth -2.15 → 32.26 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 278.85 → 325.81 (heap), blinkHeapGrowth -11.52 → 31.78 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 304.28 → 296.77 (heap), blinkHeapGrowth -27.74 → -26.09 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 281.36 → 297.16 (heap), blinkHeapGrowth -26.65 → -29.02 (heap)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 39.01 → 40.24 (heap), blinkHeapGrowth 2.32 → 2.46 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.36 → 40.03 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 138.39 → 131.1 (heap), blinkHeapGrowth 1.8 → 1.78 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 132.67 → 131.33 (heap), blinkHeapGrowth 1.78 → 1.81 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 265.32 → 280.02 (heap), blinkHeapGrowth 38.39 → 38.22 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 140.79 → 151.18 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 8 → 3 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 96.96 → 97.66 (heap), blinkHeapGrowth 17.3 → 17.44 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 102.27 → 103.21 (heap), blinkHeapGrowth 12.61 → -1.85 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 183 → 1 (render), recalcStyleCount 183 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 63 → 1 (render), recalcStyleCount 63 → 1 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
