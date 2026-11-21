# survey-library · survey-js-ui · 21.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44848104594

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 772 | −1% | −1% | −23% |
| complexLogic/answer/first | 214 | 0% | +2% | 🟢 **−31%** |
| complexLogic/answer/type | 604 | 0% | +5% | 🟢 **−44%** |
| complexLogic/load/paint | 2221 | 0% | 0% | 🟢 **−31%** |
| expressions/load/paint | 3911 | +1% | +2% | 🟢 **−28%** |
| large/load/paint | 570 | +1% | −6% | −22% |
| manyPages/load/paint | 463 | 0% | −2% | −9% |
| manyPages/pages/locale | 60.1 | +1% | −1% | −19% |
| manyPages/pages/next10 | 335 | +1% | +1% | −5% |
| records-10k/load/paint | 1311 | +1% | 🟢 **−28%** | −5% |
| records-10k/records/add-row@orders | 294 | +2% | −1% | 🔴 **+41%** |
| records-10k/records/edit-cell@orders | 301 | −2% | +1% | +23% |
| records-10k/records/filter-set@orders | 491 | +1% | −2% | −2% |
| records-10k/records/last@orders | 243 | −2% | −1% | n/a¹ |
| records-10k/records/next@orders | 318 | +1% | −4% | n/a² |
| records-10k/records/sort-header@orders | 256 | +1% | −1% | n/a³ |
| records-1k/load/paint | 723 | 0% | −5% | −11% |
| records-1k/records/next@ordersPanel | 78.8 | −3% | +1% | n/a⁴ |
| records-plain/records/next@panelsPaged | 84.5 | +3% | +1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 96.1 | +4% | −3% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 52.3 | +2% | 0% | 🟢 **−72%** |
| records-plain/records/sort-header@orders30 | 176 | +2% | 0% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 60.2 | +1% | +2% | n/a⁶ |

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
|  | jsHeapGrowth | 236.34 | 236.77 | 260.66 | 🟢 **26173.87** |
|  | blinkHeapGrowth | 1.76 | = | 1.9 | 🟢 **6664.05** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 69.78 | 73.4 | 84.12 | 🟢 **127.58** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **4680** |
|  | nodeGrowth | 0 | = | = | 🟢 **8242** |
|  | jsHeapGrowth | 261.49 | 259.6 | 258.96 | 🟢 **17485.71** |
|  | blinkHeapGrowth | 1.2 | = | -2.87 | 🟢 **4504.46** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | 🟢 **341** | — |
|  | nodeGrowth | 0 | = | 🟢 **489** | — |
|  | jsHeapGrowth | 262.63 | 263.94 | 🟢 **2469.41** | — |
|  | blinkHeapGrowth | 30.27 | = | 🟢 **315.73** | — |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **8280** |
|  | nodeGrowth | 0 | = | = | 🟢 **16724** |
|  | jsHeapGrowth | 115.22 | 114.7 | 115.46 | 🟢 **19155.14** |
|  | blinkHeapGrowth | 43.3 | = | = | 🟢 **7703.72** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **2760** |
|  | nodeGrowth | 0 | = | = | 🟢 **5572** |
|  | jsHeapGrowth | 105.51 | 105.79 | 103.15 | 🟢 **6491.14** |
|  | blinkHeapGrowth | 16.58 | = | 16.48 | 🟢 **2569.71** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −28% | −28% | −27% | −29% | −27% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/answer/first | −31% | −29% | −33% | −32% | −30% | −29% | 🟢 |
| complexLogic/answer/type | −44% | −44% | −42% | −43% | −44% | −44% | 🟢 |
| complexLogic/load/paint | −31% | −30% | −31% | −31% | −31% | −32% | 🟢 |
| expressions/load/paint | −28% | −26% | −28% | −28% | −27% | −28% | 🟢 |
| records-10k/records/add-row@orders | +41% | +42% | +39% | +42% | +48% | +39% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −78% | −77% | −79% | −75% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −72% | −73% | −72% | −72% | −72% | −72% | 🟢 |

## Counters (information)
- calculations/load/paint (1D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (7D): layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 21 → 6 (render), recalcStyleCount 21 → 6 (render)
- complexLogic/answer/first (1D): jsHeapGrowth 327.5 → 327.33 (heap)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 339.96 → 326.62 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/first (30D): jsHeapGrowth 274.68 → 326.57 (heap), blinkHeapGrowth -2.11 → -2.29 (heap)
- complexLogic/answer/type (1D): jsHeapGrowth 298.14 → 298.81 (heap)
- complexLogic/answer/type (7D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 307.38 → 298.8 (heap), blinkHeapGrowth -2.15 → -2.29 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 275.98 → 301.83 (heap), blinkHeapGrowth 1.91 → -2.29 (heap)
- expressions/load/paint (1D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (7D): layoutCount 15 → 5 (render), recalcStyleCount 15 → 5 (render)
- expressions/load/paint (30D): layoutCount 15 → 5 (render), recalcStyleCount 16 → 5 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 40.06 → 39.47 (heap), blinkHeapGrowth 2.46 → 2.32 (heap)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 39.08 → 39.36 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 48.36 → 39.55 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 131.52 → 131.71 (heap), blinkHeapGrowth -11.99 → -15.79 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 137.87 → 131.9 (heap), blinkHeapGrowth -5.91 → -17.66 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 133.39 → 131.45 (heap), blinkHeapGrowth -21.32 → -24.02 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): layoutCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.66 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (1D): jsHeapGrowth 280.02 → 280.26 (heap)
- records-10k/records/last@orders (7D): jsHeapGrowth 265.61 → 279.35 (heap)
- records-10k/records/next@orders (1D): jsHeapGrowth 149.78 → 150.3 (heap), blinkHeapGrowth 55.11 → 31.39 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 144.34 → 149.28 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (1D): jsHeapGrowth 108.97 → 108.76 (heap)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 110.28 → 108.28 (heap), blinkHeapGrowth 47.99 → 21.2 (heap)
- records-plain/records/next@panelsPaged (1D): jsHeapGrowth 117.37 → 117.6 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 115.03 → 115.78 (heap), blinkHeapGrowth 15.4 → 15.39 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 181 → 1 (render), recalcStyleCount 181 → 1 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 61 → 1 (render), recalcStyleCount 61 → 1 (render)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 146.02 → 145.4 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 141.17 → 145.26 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 96.43 → 92.8 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 89.69 → 93.13 (heap), blinkHeapGrowth -17.68 → -17.91 (heap)

Δ = today / build − 1.
