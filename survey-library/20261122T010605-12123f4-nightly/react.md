# survey-library · react · 22.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 764 | = today | +1% | −20% |
| complexLogic/answer/first | 423 | = today | +2% | −19% |
| complexLogic/answer/type | 417 | = today | +3% | −15% |
| complexLogic/load/paint | 2974 | = today | −1% | 🟢 **−27%** |
| expressions/load/paint | 3777 | = today | +2% | −25% |
| large/load/paint | 919 | = today | −7% | −22% |
| manyPages/load/paint | 733 | = today | −2% | −9% |
| manyPages/pages/locale | 58.7 | = today | +5% | −18% |
| manyPages/pages/next10 | 215 | = today | −2% | −8% |
| manyPages/pages/preview | 4616 | = today | −25% | 🟢 **−40%** |
| records-10k/load/paint | 1279 | = today | 🟢 **−27%** | −9% |
| records-10k/records/add-row@orders | 450 | = today | 0% | 🔴 **+41%** |
| records-10k/records/edit-cell@orders | 298 | = today | 0% | +26% |
| records-10k/records/filter-set@orders | 722 | = today | −3% | −1% |
| records-10k/records/last@orders | 239 | = today | +1% | n/a¹ |
| records-10k/records/next@orders | 322 | = today | 0% | n/a² |
| records-10k/records/sort-header@orders | 246 | = today | +2% | 🟢 **−50%** |
| records-1k/load/paint | 706 | = today | −5% | −15% |
| records-1k/records/next@ordersPanel | 45.9 | = today | +1% | n/a³ |
| records-plain/records/next@panelsPaged | 44.8 | = today | 0% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 104 | = today | +2% | 🟢 **−78%** |
| records-plain/records/sort-1@panelsPaged | 47.5 | = today | −1% | 🟢 **−71%** |
| records-plain/records/sort-header@orders30 | 87.9 | = today | +2% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 43.8 | = today | +2% | 🟢 **−73%** |

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
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **2070** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 251.51999999999998 | — | 269.8 | 🟢 **23510.98** |
|  | blinkHeapGrowth | 3.4 | — | 3.54 | 🟢 **5958.02** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 89.27 | — | 92.29 | 🟢 **135.26** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **1440** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 272.86 | — | 262.69 | 🟢 **15678.73** |
|  | blinkHeapGrowth | -1.65 | — | -1.51 | 🟢 **4036.79** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **2064** |
|  | nodeGrowth | 0 | — | = | 🟢 **12012** |
|  | jsHeapGrowth | 272.46500000000003 | — | 262.75 | 🟢 **23210.03** |
|  | blinkHeapGrowth | 30.465000000000003 | — | = | 🟢 **5910.23** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **3420** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 125.705 | — | 130.48 | 🟢 **13214.31** |
|  | blinkHeapGrowth | 43.36 | — | = | 🟢 **7010** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **1140** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 110.655 | — | 108.11 | 🟢 **4552.86** |
|  | blinkHeapGrowth | 12.004999999999999 | — | 17.46 | 🟢 **2342.65** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **1980** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 129.13 | — | 122.95 | 🟢 **11061.99** |
|  | blinkHeapGrowth | 26.81 | — | 26.81 | 🟢 **5108.88** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **660** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 100.88499999999999 | — | 94.73 | 🟢 **3780.16** |
|  | blinkHeapGrowth | 9.39 | — | 8.36 | 🟢 **1704.3** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −27% | −27% | −28% | −27% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −27% | −27% | −27% | −27% | −27% | −27% | 🟢 |
| manyPages/pages/preview | −40% | −39% | −38% | −40% | −41% | −40% | 🟢 |
| records-10k/records/add-row@orders | +41% | +39% | +43% | +42% | +41% | +42% | 🟢 |
| records-10k/records/edit-cell@orders | +26% | +25% | +23% | +23% | +28% | +30% | 🔴 |
| records-10k/records/sort-header@orders | −50% | −50% | −50% | −51% | −50% | −50% | 🟢 |
| records-plain/records/sort-1@panels30 | −78% | −79% | −78% | −78% | −75% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −71% | −72% | −72% | −70% | −71% | −71% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −80% | −80% | −80% | −80% | −80% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −72% | −73% | −73% | −73% | −74% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), jsHeapGrowth 390.37 → 406.18 (heap), blinkHeapGrowth -1.96 → -2.13 (heap)
- complexLogic/answer/first (30D): recalcStyleCount 2 → 1 (render), jsHeapGrowth 321.38 → 410.13 (heap), blinkHeapGrowth 2.43 → -2.13 (heap)
- complexLogic/answer/type (7D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 285.66 → 310.39 (heap), blinkHeapGrowth -16.22 → -2.35 (heap)
- complexLogic/answer/type (30D): layoutCount 5 → 2 (render), recalcStyleCount 6 → 2 (render), jsHeapGrowth 260.8 → 309.49 (heap), blinkHeapGrowth -17.34 → -23.74 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 37.9 → 42.3 (heap), blinkHeapGrowth 2.67 → 2.47 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.26 → 42.63 (heap), blinkHeapGrowth 2.67 → 2.32 (heap)
- manyPages/pages/next10 (7D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 130.41 → 129.4 (heap), blinkHeapGrowth 0.84 → -0.06 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 136.82 → 129.29 (heap), blinkHeapGrowth 0.86 → -0.06 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 547.06 → 581.54 (heap), blinkHeapGrowth 7.8 → 5.94 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 553.52 → 580.45 (heap), blinkHeapGrowth 6.54 → 6.18 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 290.88 → 306.04 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 163.67 → 168.5 (heap), blinkHeapGrowth 42.72 → 31.51 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 104.01 → 102.46 (heap), blinkHeapGrowth 18.44 → 18.43 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 107.04 → 107.05 (heap), blinkHeapGrowth 0.46 → 3.1 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 54 → 2 (render), recalcStyleCount 54 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
