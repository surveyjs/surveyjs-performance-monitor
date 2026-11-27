# survey-library · react · 27.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45920610067

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 561 | −1% | 0% | +6% |
| complexLogic/answer/first | 287 | −5% | −5% | 0% |
| complexLogic/answer/type | 421 | −3% | 0% | 0% |
| complexLogic/load/paint | 1538 | −1% | −1% | +2% |
| expressions/load/paint | 3499 | −2% | −4% | −2% |
| large/load/paint | 1014 | −5% | −5% | 🟢 **−8%** |
| manyPages/load/paint | 470 | −2% | −2% | −3% |
| manyPages/pages/locale | 54 | +3% | +1% | −8% |
| manyPages/pages/next10 | 273 | −1% | 0% | 0% |
| manyPages/pages/preview | 3880 | 0% | 🟢 **−23%** | 🟢 **−27%** |
| records-10k/load/paint | 1283 | +2% | +2% | +2% |
| records-10k/records/add-row@orders | 408 | +3% | +3% | 🔴 **+63%** |
| records-10k/records/edit-cell@orders | 303 | +1% | +2% | 🔴 **+33%** |
| records-10k/records/filter-set@orders | 819 | −1% | +4% | 🔴 **+23%** |
| records-10k/records/last@orders | 243 | +1% | +2% | 🟢 **−41%** |
| records-10k/records/next@orders | 233 | +3% | +1% | 🟢 **−44%** |
| records-10k/records/sort-header@orders | 245 | +2% | +3% | 🟢 **−40%** |
| records-1k/load/paint | 750 | −1% | +1% | −5% |
| records-1k/records/next@ordersPanel | 49 | −1% | −3% | 🟢 **−77%** |
| records-plain/records/next@panelsPaged | 49.3 | +3% | 0% | 🟢 **−68%** |
| records-plain/records/sort-1@panels30 | 188 | −3% | −2% | 🟢 **−73%** |
| records-plain/records/sort-1@panelsPaged | 49.9 | +1% | +2% | 🟢 **−71%** |
| records-plain/records/sort-header@orders30 | 96.6 | 0% | +2% | 🟢 **−74%** |
| records-plain/records/sort-header@ordersPaged | 44.9 | −2% | +3% | 🟢 **−68%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/first | jsHeapGrowth | 294.09 | 🟢 **395.11** | 🟢 **406.26** | 353.26 |
| complexLogic/answer/type | jsHeapGrowth | 374.62 | 315.78 | 309.72 | 🔴 **232.32** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **1704** |
|  | nodeGrowth | 0 | = | = | 🟢 **10417** |
|  | jsHeapGrowth | 258.25 | 252.47 | 251.88 | 🟢 **23355.92** |
|  | blinkHeapGrowth | 3.34 | 3.47 | 3.28 | 🟢 **5409.37** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 90.38 | 89.55 | 87.49 | 🟢 **142.68** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 274.01 | 272.37 | 271.27 | 🟢 **15549.02** |
|  | blinkHeapGrowth | -1.65 | = | = | 🟢 **3676.79** |
| records-10k/records/last@orders | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **6934** |
|  | jsHeapGrowth | 507.57 | 502.24 | 🔴 **305.75** | 🟢 **15507.73** |
|  | blinkHeapGrowth | 39.91 | = | = | 🟢 **3587.29** |
| records-10k/records/next@orders | listenerGrowth | 0 | = | = | 🟢 **1200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 176.12 | 173.54 | 166.7 | 🟢 **15632.84** |
|  | blinkHeapGrowth | 31.51 | = | = | 🟢 **3666.53** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1704** |
|  | nodeGrowth | 0 | = | = | 🟢 **10392** |
|  | jsHeapGrowth | 472.77 | 471.72 | 🔴 **271.47** | 🟢 **23035.79** |
|  | blinkHeapGrowth | 30.51 | = | 30.51 | 🟢 **5371** |
| records-1k/records/next@ordersPanel | listenerGrowth | 0 | = | = | 🟢 **940** |
|  | nodeGrowth | 0 | = | = | 🟢 **4878** |
|  | jsHeapGrowth | 105.32 | 102.32 | 102.27 | 🟢 **8926.83** |
|  | blinkHeapGrowth | 18.44 | = | 18.43 | 🟢 **2272.81** |
| records-plain/records/next@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1020** |
|  | nodeGrowth | 0 | = | = | 🟢 **5010** |
|  | jsHeapGrowth | 112.06 | 109.3 | 105.75 | 🟢 **5415.94** |
|  | blinkHeapGrowth | 13.87 | = | 13.88 | 🟢 **2153.39** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3060** |
|  | nodeGrowth | 0 | = | = | 🟢 **15044** |
|  | jsHeapGrowth | 153.62 | 158.7 | 155.25 | 🟢 **15683.79** |
|  | blinkHeapGrowth | 42.15 | = | 40.79 | 🟢 **6452.57** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1020** |
|  | nodeGrowth | 0 | = | = | 🟢 **5012** |
|  | jsHeapGrowth | 115.03 | 113.36 | 111.64 | 🟢 **5400.95** |
|  | blinkHeapGrowth | 17.69 | = | 17.59 | 🟢 **2154.5** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **1740** |
|  | nodeGrowth | 0 | = | = | 🟢 **9984** |
|  | jsHeapGrowth | 133.57 | 132.05 | 129.59 | 🟢 **10940.63** |
|  | blinkHeapGrowth | 26.81 | = | = | 🟢 **4748.48** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **580** |
|  | nodeGrowth | 0 | = | = | 🟢 **3330** |
|  | jsHeapGrowth | 102.97 | 102.52 | 100.61 | 🟢 **3746.64** |
|  | blinkHeapGrowth | 9.39 | = | = | 🟢 **1582.53** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/preview | −23% | −25%..−22% | −23% | −22% | −24% | −23% | −23% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −8% | −9%..−9% | −9% | −9% | −9% | −9% | −9% | 🟢 |
| manyPages/pages/preview | −27% | −29%..−26% | −28% | −28% | −26% | −27% | −29% | 🟢 |
| records-10k/records/add-row@orders | +63% | +59%..+71% | +68% | +66% | +67% | +61% | +63% | 🟢 |
| records-10k/records/edit-cell@orders | +33% | +25%..+43% | +39% | +38% | +30% | +32% | +29% | 🟢 |
| records-10k/records/filter-set@orders | +23% | +16%..+27% | +20% | +24% | +25% | +19% | +20% | 🟢 |
| records-10k/records/last@orders | −41% | −44%..−38% | −41% | −40% | −41% | −40% | −43% | 🟢 |
| records-10k/records/next@orders | −44% | −46%..−43% | −44% | −45% | −44% | −43% | −45% | 🟢 |
| records-10k/records/sort-header@orders | −40% | −41%..−38% | −41% | −39% | −40% | −41% | −39% | 🟢 |
| records-1k/records/next@ordersPanel | −77% | −79%..−77% | −77% | −78% | −78% | −77% | −77% | 🟢 |
| records-plain/records/next@panelsPaged | −68% | −73%..−65% | −69% | −67% | −68% | −69% | −72% | 🟢 |
| records-plain/records/sort-1@panels30 | −73% | −74%..−72% | −73% | −72% | −72% | −73% | −73% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −71% | −73%..−70% | −71% | −71% | −70% | −71% | −72% | 🟢 |
| records-plain/records/sort-header@orders30 | −74% | −74%..−72% | −74% | −72% | −73% | −73% | −74% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −68% | −70%..−66% | −67% | −67% | −69% | −69% | −68% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 5 (render), recalcStyleCount 19 → 6 (render)
- calculations/load/paint (30D): expressionRuns 2397 → 2401 (work), conditionsPasses 3 → 4 (work), layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (1D): layoutCount 0 → 1 (render), recalcStyleCount 1 → 2 (render)
- complexLogic/answer/first (30D): recalcStyleCount 3 → 2 (render), blinkHeapGrowth -2.14 → -2.31 (heap)
- complexLogic/answer/type (1D): layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth -23.71 → -23.78 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), blinkHeapGrowth -17.01 → -2.35 (heap)
- expressions/load/paint (7D): layoutCount 13 → 4 (render), recalcStyleCount 14 → 5 (render)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 42.88 → 40.6 (heap), blinkHeapGrowth 2.36 → 2.32 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 42.87 → 40.73 (heap), blinkHeapGrowth 2.32 → 2.31 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 53.18 → 41.37 (heap), blinkHeapGrowth 2.37 → 2.32 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 141.14 → 138.87 (heap), blinkHeapGrowth -24.28 → -33.05 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 142.59 → 139.46 (heap), blinkHeapGrowth -31.38 → -28.73 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 17 (render), recalcStyleCount 26 → 17 (render), jsHeapGrowth 142.81 → 139.52 (heap), blinkHeapGrowth -0.32 → -0.24 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 580.01 → 575.78 (heap), blinkHeapGrowth 6.32 → 5.65 (heap)
- manyPages/pages/preview (7D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 579.61 → 576.08 (heap), blinkHeapGrowth 6.62 → 5.65 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 543.55 → 578.23 (heap), blinkHeapGrowth 6.73 → 5.65 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 6.68 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/next@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (30D): conditionRuns 20 → 10 (work), expressionRuns 40 → 20 (work), panelsCreated 10 → 0 (work), layoutCount 91 → 1 (render), recalcStyleCount 91 → 1 (render)
- records-plain/records/next@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 92 → 1 (render), recalcStyleCount 92 → 1 (render)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 54 → 2 (render), recalcStyleCount 54 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
