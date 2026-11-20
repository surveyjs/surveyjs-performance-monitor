# survey-library · survey-js-ui · 20.11.2026 10:09 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44716813729

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 407 | +2% | +2% | 🟢 **−50%** |
| complexLogic/answer/first | 225 | +2% | 0% | 🟢 **−57%** |
| complexLogic/answer/type | 407 | +2% | +4% | 🟢 **−72%** |
| complexLogic/load/paint | 2880 | +1% | −1% | 🟢 **−59%** |
| expressions/load/paint | 3914 | +1% | +4% | 🟢 **−27%** |
| large/load/paint | 809 | +1% | −7% | −23% |
| manyPages/load/paint | 647 | +4% | −1% | −7% |
| manyPages/pages/locale | 73.5 | −5% | −4% | −19% |
| manyPages/pages/next10 | 228 | +2% | 0% | −10% |
| records-10k/load/paint | 1308 | +1% | 🟢 **−28%** | −4% |
| records-10k/records/add-row@orders | 294 | −2% | −3% | 🔴 **+43%** |
| records-10k/records/edit-cell@orders | 299 | 0% | 0% | +22% |
| records-10k/records/filter-set@orders | 614 | +1% | −1% | +3% |
| records-10k/records/last@orders | 406 | 0% | +1% | n/a¹ |
| records-10k/records/next@orders | 428 | 0% | 0% | n/a² |
| records-10k/records/sort-header@orders | 453 | 0% | −2% | n/a³ |
| records-1k/load/paint | 997 | +1% | −3% | −6% |
| records-1k/records/next@ordersPanel | 50.4 | +1% | +3% | n/a⁴ |
| records-plain/records/next@panelsPaged | 44.9 | +2% | 0% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 111 | +1% | +1% | 🟢 **−79%** |
| records-plain/records/sort-1@panelsPaged | 45.6 | 0% | 0% | 🟢 **−73%** |
| records-plain/records/sort-header@orders30 | 95.1 | 0% | −1% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 43.9 | +2% | +2% | n/a⁶ |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: check failed: the sort button of total
- ⁴ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁵ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]
- ⁶ Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| calculations/load/paint | expressionRuns | 2401 | = | = | 🟢 **4772** |
| complexLogic/answer/first | conditionRuns | 222 | = | = | 🟢 **4896** |
| complexLogic/answer/first | expressionRuns | 251 | = | = | 🟢 **2034** |
| complexLogic/answer/type | conditionRuns | 52 | = | = | 🟢 **14688** |
| complexLogic/answer/type | expressionRuns | 256 | = | = | 🟢 **5854** |
| complexLogic/answer/type | blinkHeapGrowth | -30.45 | -24.78 | -23.87 | 🟢 **1.91** |
| manyPages/pages/locale | layoutCount | 3 | 🟢 **6** | 🟢 **6** | 🟢 **6** |
| manyPages/pages/locale | recalcStyleCount | 3 | 🟢 **6** | 🟢 **6** | 🟢 **6** |
| manyPages/pages/next10 | layoutCount | 16 | 17 | 17 | 🟢 **26** |
| manyPages/pages/next10 | recalcStyleCount | 16 | 17 | 17 | 🟢 **26** |
| records-10k/load/paint | expressionRuns | 80940 | = | = | 🔴 **490** |
| records-10k/records/add-row@orders | expressionRuns | 20555 | = | = | 🔴 **164** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **6715** |
| records-10k/records/add-row@orders | nodeGrowth | 0 | = | = | 🟢 **12064** |
| records-10k/records/add-row@orders | jsHeapGrowth | 235.15 | 257.9 | 260.03 | 🟢 **25957.29** |
| records-10k/records/add-row@orders | blinkHeapGrowth | 1.76 | = | 1.89 | 🟢 **6662.36** |
| records-10k/records/edit-cell@orders | expressionRuns | 20848 | = | = | 🔴 **278** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 70.77 | 84.79 | 82.83 | 🟢 **126.35** |
| records-10k/records/filter-set@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4680** |
| records-10k/records/filter-set@orders | nodeGrowth | 0 | = | = | 🟢 **8242** |
| records-10k/records/filter-set@orders | jsHeapGrowth | 260.25 | 261.75 | 256.76 | 🟢 **17344.71** |
| records-10k/records/filter-set@orders | blinkHeapGrowth | -3.01 | = | -2.87 | 🟢 **4505.47** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | 🟢 **341** | 🟢 **341** | — |
| records-10k/records/sort-header@orders | nodeGrowth | 0 | 🟢 **489** | 🟢 **489** | — |
| records-10k/records/sort-header@orders | jsHeapGrowth | 264.84 | 🟢 **2473.25** | 🟢 **2437.79** | — |
| records-10k/records/sort-header@orders | blinkHeapGrowth | 26.46 | 🟢 **311.56** | 🟢 **311.7** | — |
| records-1k/load/paint | expressionRuns | 8940 | = | = | 🔴 **490** |
| records-plain/records/sort-1@panels30 | expressionRuns | 30 | = | = | 🟢 **60** |
| records-plain/records/sort-1@panels30 | panelsCreated | 0 | = | = | 🟢 **30** |
| records-plain/records/sort-1@panels30 | layoutCount | 1 | = | = | 🟢 **181** |
| records-plain/records/sort-1@panels30 | recalcStyleCount | 1 | = | = | 🟢 **181** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **8280** |
| records-plain/records/sort-1@panels30 | nodeGrowth | 0 | = | = | 🟢 **16724** |
| records-plain/records/sort-1@panels30 | jsHeapGrowth | 118.95 | 117.85 | 118.48 | 🟢 **19126.47** |
| records-plain/records/sort-1@panels30 | blinkHeapGrowth | 43.3 | = | = | 🟢 **7706.59** |
| records-plain/records/sort-1@panelsPaged | expressionRuns | 1000 | = | = | 🔴 **20** |
| records-plain/records/sort-1@panelsPaged | panelsCreated | 0 | = | = | 🟢 **10** |
| records-plain/records/sort-1@panelsPaged | layoutCount | 1 | = | = | 🟢 **61** |
| records-plain/records/sort-1@panelsPaged | recalcStyleCount | 1 | = | = | 🟢 **61** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2760** |
| records-plain/records/sort-1@panelsPaged | nodeGrowth | 0 | = | = | 🟢 **5572** |
| records-plain/records/sort-1@panelsPaged | jsHeapGrowth | 105.5 | 101.87 | 102.09 | 🟢 **6461.16** |
| records-plain/records/sort-1@panelsPaged | blinkHeapGrowth | -5.83 | -0.57 | -10.61 | 🟢 **2569.51** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −28% | −28% | −28% | −27% | −27% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −50% | −51% | −50% | −51% | −51% | −51% | 🟢 |
| complexLogic/answer/first | −57% | −58% | −58% | −57% | −58% | −58% | 🟢 |
| complexLogic/answer/type | −72% | −72% | −71% | −71% | −72% | −71% | 🟢 |
| complexLogic/load/paint | −59% | −59% | −59% | −59% | −58% | −59% | 🟢 |
| expressions/load/paint | −27% | −26% | −27% | −28% | −27% | −26% | 🟢 |
| records-10k/records/add-row@orders | +43% | +43% | +41% | +39% | +44% | +43% | 🟢 |
| records-plain/records/sort-1@panels30 | −79% | −79% | −78% | −79% | −79% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −73% | −73% | −73% | −72% | −74% | −71% | 🟢 |

## Counters (information)
- complexLogic/answer/first (1D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 360.72 → 324.68 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 343.46 → 324.68 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 267.07 → 326.11 (heap), blinkHeapGrowth 1.88 → -2.29 (heap)
- complexLogic/answer/type (1D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 307.64 → 295.83 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 304.15 → 298.25 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 266.44 → 296.57 (heap)
- expressions/load/paint (30D): recalcStyleCount 16 → 15 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 39.08 → 40.16 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 38.44 → 39.62 (heap)
- manyPages/pages/locale (30D): jsHeapGrowth 48.25 → 40.03 (heap), blinkHeapGrowth 2.46 → 2.43 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 119.57 → 118.98 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 119.25 → 119.36 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 124 → 119.93 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work)
- records-10k/records/add-row@orders (30D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (1D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/last@orders (1D): jsHeapGrowth 270.73 → 281.18 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 266.51 → 279.21 (heap), blinkHeapGrowth 38.39 → 38.22 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 147.96 → 149.86 (heap), blinkHeapGrowth 27.19 → 27.18 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 144.78 → 149.43 (heap), blinkHeapGrowth 27.32 → 27.18 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 92.54 → 97.79 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 98.21 → 94.94 (heap), blinkHeapGrowth 17.61 → 17.55 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 99.51 → 100.41 (heap), blinkHeapGrowth -9.7 → -9.72 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 101.44 → 103.93 (heap), blinkHeapGrowth -18.01 → -14.94 (heap)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 108.66 → 113.02 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 107.1 → 108.72 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 90.8 → 92.1 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 91.86 → 95.61 (heap)

Δ = today / build − 1.
