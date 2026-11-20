# survey-library · survey-js-ui · 20.11.2026 11:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44731394759

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 407 | +1% | +2% | 🟢 **−50%** |
| complexLogic/answer/first | 244 | −1% | +1% | 🟢 **−56%** |
| complexLogic/answer/type | 401 | +3% | +1% | 🟢 **−72%** |
| complexLogic/load/paint | 2930 | +1% | +1% | 🟢 **−59%** |
| expressions/load/paint | 6396 | +1% | +1% | −27% |
| large/load/paint | 572 | +3% | −6% | −22% |
| manyPages/load/paint | 891 | +4% | −2% | −7% |
| manyPages/pages/locale | 58 | +1% | 0% | −22% |
| manyPages/pages/next10 | 205 | −3% | 0% | −9% |
| records-10k/load/paint | 1431 | +2% | −22% | +4% |
| records-10k/records/add-row@orders | 301 | −1% | −1% | 🔴 **+38%** |
| records-10k/records/edit-cell@orders | 306 | +2% | 0% | +18% |
| records-10k/records/filter-set@orders | 500 | +1% | −2% | −3% |
| records-10k/records/last@orders | 384 | 0% | −1% | n/a¹ |
| records-10k/records/next@orders | 233 | −1% | 0% | n/a² |
| records-10k/records/sort-header@orders | 399 | −2% | −1% | n/a³ |
| records-1k/load/paint | 742 | +1% | −5% | −10% |
| records-1k/records/next@ordersPanel | 49.1 | 0% | +1% | n/a⁴ |
| records-plain/records/next@panelsPaged | 47.5 | 0% | −1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 137 | +2% | 0% | 🟢 **−76%** |
| records-plain/records/sort-1@panelsPaged | 93.6 | 0% | −1% | 🟢 **−66%** |
| records-plain/records/sort-header@orders30 | 124 | +2% | +1% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 82.9 | +1% | 0% | n/a⁶ |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **6715** |
|  | nodeGrowth | 0 | = | = | 🟢 **12064** |
|  | jsHeapGrowth | 235.57 | 258.55 | 260.93 | 🟢 **25954.16** |
|  | blinkHeapGrowth | 1.76 | 2.37 | 1.89 | 🟢 **6668.64** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 71.61 | 84.57 | 82.61 | 🟢 **123.82** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4680** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 261.16 | 263.58 | 254.76 | 🟢 **17346.7** |
|  | blinkHeapGrowth | -3.01 | = | -2.87 | 🟢 **4504.46** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | 🟢 **341** | 🟢 **341** | — |
|  | nodeGrowth | 0 | 🟢 **489** | 🟢 **489** | — |
|  | jsHeapGrowth | 263.12 | 🟢 **2472** | 🟢 **2437.96** | — |
|  | blinkHeapGrowth | 26.06 | 🟢 **311.17** | 🟢 **311.67** | — |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **8280** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 138.66 | 142.11 | 143.85 | 🟢 **19113.6** |
|  | blinkHeapGrowth | 53.65 | = | = | 🟢 **7700.77** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2760** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 118.79 | 116.16 | 116.32 | 🟢 **6510.81** |
|  | blinkHeapGrowth | 19.83 | 19.82 | 19.84 | 🟢 **2622.25** |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −50% | −50% | −51% | −50% | −50% | −50% | 🟢 |
| complexLogic/answer/first | −56% | −56% | −56% | −56% | −54% | −54% | 🟢 |
| complexLogic/answer/type | −72% | −72% | −71% | −71% | −73% | −74% | 🟢 |
| complexLogic/load/paint | −59% | −59% | −60% | −59% | −59% | −59% | 🟢 |
| expressions/load/paint | −27% | −27% | −27% | −26% | −27% | −25% | 🔴 |
| records-10k/records/add-row@orders | +38% | +40% | +40% | +40% | +38% | +40% | 🟢 |
| records-plain/records/sort-1@panels30 | −76% | −77% | −76% | −75% | −75% | −75% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −66% | −66% | −66% | −66% | −67% | −68% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/first (1D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 359.43 → 323.6 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 344.82 → 327.71 (heap), blinkHeapGrowth -2.15 → 31.24 (heap)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2034 → 251 (work), jsHeapGrowth 269.75 → 325.93 (heap), blinkHeapGrowth 1.88 → -2.29 (heap)
- complexLogic/answer/type (1D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 306.79 → 295.26 (heap), blinkHeapGrowth -21.03 → -31.21 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 305.93 → 296.19 (heap), blinkHeapGrowth -23.37 → -31.21 (heap)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work), jsHeapGrowth 264.75 → 295.5 (heap), blinkHeapGrowth 1.91 → -30.97 (heap)
- expressions/load/paint (30D): recalcStyleCount 16 → 15 (render)
- manyPages/pages/locale (1D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 38.69 → 39.53 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 37.81 → 40.58 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.28 → 39.92 (heap)
- manyPages/pages/next10 (1D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 119.58 → 120.89 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 106.39 → 106.82 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 120.64 → 107.3 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (1D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 272.54 → 280.52 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 266.1 → 279.79 (heap), blinkHeapGrowth 38.39 → 38.25 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 151.5 → 147.49 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 145.1 → 147.19 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 92.48 → 96.66 (heap), blinkHeapGrowth 17.4 → 17.51 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 96.66 → 97.46 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 99.51 → 104.18 (heap), blinkHeapGrowth 12.61 → 12.64 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 102.19 → 104.61 (heap), blinkHeapGrowth 12.72 → 12.6 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 181 → 1 (render), recalcStyleCount 181 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 61 → 1 (render), recalcStyleCount 61 → 1 (render)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 108.74 → 113.53 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 106.94 → 109.72 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 90.02 → 96.4 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 89.64 → 96.89 (heap)

Δ = today / build − 1.
