# survey-library · react · 23.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45092599916

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 395 | = today | +1% | −21% |
| complexLogic/answer/first | 240 | = today | +3% | −17% |
| complexLogic/answer/type | 526 | = today | +6% | −17% |
| complexLogic/load/paint | 2873 | = today | 0% | 🟢 **−27%** |
| expressions/load/paint | 3390 | = today | +1% | −24% |
| large/load/paint | 532 | = today | −6% | −21% |
| manyPages/load/paint | 470 | = today | −1% | −10% |
| manyPages/pages/locale | 97.3 | = today | +2% | −15% |
| manyPages/pages/next10 | 199 | = today | −2% | −11% |
| manyPages/pages/preview | 4646 | = today | −24% | 🟢 **−39%** |
| records-10k/load/paint | 1296 | = today | 🟢 **−28%** | −8% |
| records-10k/records/add-row@orders | 293 | = today | −1% | 🔴 **+41%** |
| records-10k/records/edit-cell@orders | 299 | = today | −1% | +27% |
| records-10k/records/filter-set@orders | 488 | = today | 0% | −1% |
| records-10k/records/last@orders | 242 | = today | −1% | n/a¹ |
| records-10k/records/next@orders | 507 | = today | +5% | n/a² |
| records-10k/records/sort-header@orders | 457 | = today | +1% | 🟢 **−40%** |
| records-1k/load/paint | 731 | = today | −6% | −15% |
| records-1k/records/next@ordersPanel | 91.5 | = today | +5% | n/a³ |
| records-plain/records/next@panelsPaged | 49.8 | = today | 0% | n/a⁴ |
| records-plain/records/sort-1@panels30 | 107 | = today | +1% | 🟢 **−77%** |
| records-plain/records/sort-1@panelsPaged | 52.9 | = today | +1% | 🟢 **−67%** |
| records-plain/records/sort-header@orders30 | 91.7 | = today | +1% | 🟢 **−79%** |
| records-plain/records/sort-header@ordersPaged | 41.6 | = today | 0% | 🟢 **−73%** |

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
| complexLogic/answer/first | jsHeapGrowth | 405.36 | — | 391.05 | 🔴 **322.1** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | — | = | 🟢 **2070** |
|  | nodeGrowth | 0 | — | = | 🟢 **12064** |
|  | jsHeapGrowth | 250.935 | — | 269.34 | 🟢 **23571.12** |
|  | blinkHeapGrowth | 2.54 | — | 2.55 | 🟢 **5958** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 86.815 | — | 92.57 | 🟢 **135.72** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | — | = | 🟢 **1440** |
|  | nodeGrowth | 0 | — | = | 🟢 **8242** |
|  | jsHeapGrowth | 271.945 | — | 260.67 | 🟢 **15718.22** |
|  | blinkHeapGrowth | 2.56 | — | -1.51 | 🟢 **4036.79** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **2064** |
|  | nodeGrowth | 0 | — | = | 🟢 **12012** |
|  | jsHeapGrowth | 272.665 | — | 263.52 | 🟢 **23262.83** |
|  | blinkHeapGrowth | 27.36 | — | 28.8 | 🟢 **5910.59** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | — | = | 🟢 **3420** |
|  | nodeGrowth | 0 | — | = | 🟢 **16724** |
|  | jsHeapGrowth | 124.46000000000001 | — | 128.9 | 🟢 **13280.74** |
|  | blinkHeapGrowth | 43.36 | — | = | 🟢 **7010** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | — | = | 🟢 **1140** |
|  | nodeGrowth | 0 | — | = | 🟢 **5572** |
|  | jsHeapGrowth | 112.185 | — | 109.92 | 🟢 **4583.48** |
|  | blinkHeapGrowth | 17.69 | — | = | 🟢 **2342.94** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **1980** |
|  | nodeGrowth | 0 | — | = | 🟢 **11064** |
|  | jsHeapGrowth | 129.255 | — | 122.43 | 🟢 **11126.38** |
|  | blinkHeapGrowth | 26.81 | — | = | 🟢 **5108.88** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **660** |
|  | nodeGrowth | 0 | — | = | 🟢 **3690** |
|  | jsHeapGrowth | 101.205 | — | 93.73 | 🟢 **3802.96** |
|  | blinkHeapGrowth | 9.12 | — | 8.09 | 🟢 **1703.6** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −28% | −25% | −29% | −28% | −28% | −28% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −27% | −27% | −27% | −28% | −28% | −27% | 🟢 |
| manyPages/pages/preview | −39% | −39% | −39% | −40% | −40% | −41% | 🟢 |
| records-10k/records/add-row@orders | +41% | +36% | +44% | +44% | +36% | +37% | 🟢 |
| records-10k/records/edit-cell@orders | +27% | +30% | +28% | +22% | +24% | +34% | 🔴 |
| records-10k/records/sort-header@orders | −40% | −41% | −40% | −41% | −40% | −40% | 🟢 |
| records-plain/records/sort-1@panels30 | −77% | −77% | −77% | −76% | −76% | −77% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −67% | −66% | −65% | −65% | −69% | −66% | 🟢 |
| records-plain/records/sort-header@orders30 | −79% | −80% | −78% | −79% | −79% | −79% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −74% | −73% | −72% | −73% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): recalcStyleCount 2 → 1 (render), blinkHeapGrowth 3.13 → -10.51 (heap)
- complexLogic/answer/first (30D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), blinkHeapGrowth -34.01 → -6.74 (heap)
- complexLogic/answer/type (7D): layoutCount 5 → 1 (render), recalcStyleCount 6 → 1 (render), jsHeapGrowth 291.46 → 312.52 (heap), blinkHeapGrowth -2.21 → -2.29 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), jsHeapGrowth 263.35 → 311.03 (heap), blinkHeapGrowth 1.86 → -2.29 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (7D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 39.04 → 42.27 (heap), blinkHeapGrowth 2.66 → 2.54 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 49.28 → 42.4 (heap), blinkHeapGrowth 2.67 → 2.5 (heap)
- manyPages/pages/next10 (7D): layoutCount 27 → 17 (render), recalcStyleCount 27 → 17 (render), jsHeapGrowth 121.31 → 118.28 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 136.04 → 117.36 (heap), blinkHeapGrowth 0.85 → 0.11 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 547.91 → 581.83 (heap), blinkHeapGrowth 6.84 → 6.14 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 556.71 → 580.9 (heap), blinkHeapGrowth 6.38 → 6.03 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-10k/records/add-row@orders (7D): layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (7D): recalcStyleCount 2 → 1 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (7D): jsHeapGrowth 293.98 → 305.3 (heap)
- records-10k/records/next@orders (7D): jsHeapGrowth 163.49 → 167.5 (heap), blinkHeapGrowth 27.63 → 27.49 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 8 → 3 (render), recalcStyleCount 9 → 4 (render)
- records-1k/records/next@ordersPanel (7D): jsHeapGrowth 122.29 → 127.54 (heap), blinkHeapGrowth 35.19 → 43.72 (heap)
- records-plain/records/next@panelsPaged (7D): jsHeapGrowth 108.29 → 105.13 (heap)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 53 → 2 (render), recalcStyleCount 53 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 3 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
