# survey-library · react · 28.11.2026 01:06 UTC

> cancelled: 3 scenarios not measured · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46091383335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 388 | 0% | 0% | −1% |
| complexLogic/answer/first | 378 | +1% | −5% | −2% |
| complexLogic/answer/type | 620 | 0% | −5% | +3% |
| complexLogic/load/paint | 2854 | +1% | 0% | +1% |
| expressions/load/paint | 4353 | 0% | −4% | −4% |
| large/load/paint | 541 | −1% | −4% | −7% |
| manyPages/load/paint | 453 | 0% | −2% | −1% |
| manyPages/pages/locale | 54.9 | −1% | −2% | −9% |
| manyPages/pages/next10 | 301 | +2% | +1% | 0% |
| manyPages/pages/preview | 5388 | 0% | +1% | 🟢 **−30%** |
| records-10k/load/paint | 1270 | +1% | +2% | +3% |
| records-10k/records/add-row@orders | 303 | +1% | +2% | 🔴 **+58%** |
| records-10k/records/edit-cell@orders | 413 | 0% | +1% | 🔴 **+34%** |
| records-10k/records/filter-set@orders | 433 | +1% | +2% | 🔴 **+24%** |
| records-10k/records/last@orders | 232 | 0% | +1% | 🟢 **−32%** |
| records-10k/records/next@orders | 249 | +3% | +3% | 🟢 **−40%** |
| records-10k/records/sort-header@orders | 249 | +1% | +5% | 🟢 **−36%** |
| records-1k/load/paint | 725 | 0% | +1% | 0% |
| records-1k/records/next@ordersPanel | 50.6 | 0% | −1% | 🟢 **−76%** |
| records-plain/records/next@panelsPaged | 45.8 | +2% | +1% | 🟢 **−73%** |
| records-plain/records/sort-1@panels30 | 120 | +2% | 0% | 🟢 **−74%** |
| records-plain/records/sort-1@panelsPaged | 61 | 0% | +1% | 🟢 **−67%** |
| records-plain/records/sort-header@orders30 | 96 | 0% | −1% | 🟢 **−73%** |
| records-plain/records/sort-header@ordersPaged | 43.9 | +1% | 0% | 🟢 **−67%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/first | jsHeapGrowth | 294.99 | 297.9 | 🟢 **406.29** | 328.76 |
| complexLogic/answer/type | jsHeapGrowth | 380.23 | 378.11 | 313.53 | 🔴 **246.19** |
| manyPages/pages/preview | blinkHeapGrowth | 6.33 | 6.39 | 6.33 | 🟢 **50.72** |
| records-10k/records/add-row@orders | listenerGrowth | 0 | = | = | 🟢 **1704** |
|  | nodeGrowth | 0 | = | = | 🟢 **10417** |
|  | jsHeapGrowth | 256.52 | 254.2 | 250.67 | 🟢 **23370.59** |
|  | blinkHeapGrowth | 2.54 | 2.41 | 2.54 | 🟢 **5409.3** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 90.66 | 87.18 | 88.06 | 🟢 **142.87** |
| records-10k/records/filter-set@orders | listenerGrowth | 0 | = | = | 🟢 **1200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 274.25 | 274.12 | 273 | 🟢 **15568.23** |
|  | blinkHeapGrowth | 2.56 | = | 73.3 | 🟢 **3680.79** |
| records-10k/records/last@orders | listenerGrowth | 0 | = | = | 🟢 **1140** |
|  | nodeGrowth | 0 | = | = | 🟢 **6934** |
|  | jsHeapGrowth | 504.15 | 502.68 | 🔴 **302.69** | 🟢 **15522.58** |
|  | blinkHeapGrowth | 39.91 | = | = | 🟢 **3586.92** |
| records-10k/records/next@orders | listenerGrowth | 0 | = | = | 🟢 **1200** |
|  | nodeGrowth | 0 | = | = | 🟢 **7162** |
|  | jsHeapGrowth | 176.18 | 173.89 | 171.01 | 🟢 **15644.98** |
|  | blinkHeapGrowth | 31.51 | = | = | 🟢 **3666.53** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **1704** |
|  | nodeGrowth | 0 | = | = | 🟢 **10392** |
|  | jsHeapGrowth | 474.14 | 473.9 | 🔴 **271.06** | 🟢 **23051.02** |
|  | blinkHeapGrowth | 30.51 | 30.51 | = | 🟢 **5370.97** |
| records-1k/records/next@ordersPanel | listenerGrowth | 0 | = | = | 🟢 **940** |
|  | nodeGrowth | 0 | = | = | 🟢 **4878** |
|  | jsHeapGrowth | 104.1 | 103.63 | 102.88 | 🟢 **8931.82** |
|  | blinkHeapGrowth | 18.44 | = | = | 🟢 **2272.9** |
| records-plain/records/next@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1020** |
|  | nodeGrowth | 0 | = | = | 🟢 **5010** |
|  | jsHeapGrowth | 111.65 | 112.09 | 106.58 | 🟢 **5410.72** |
|  | blinkHeapGrowth | 4.1 | 4.69 | 3.06 | 🟢 **2153.54** |
| records-plain/records/sort-1@panels30 | listenerGrowth | 0 | = | = | 🟢 **3060** |
|  | nodeGrowth | 0 | = | = | 🟢 **15044** |
|  | jsHeapGrowth | 126.74 | 128.15 | 128.34 | 🟢 **15697.96** |
|  | blinkHeapGrowth | 43.36 | = | = | 🟢 **6444.67** |
| records-plain/records/sort-1@panelsPaged | listenerGrowth | 0 | = | = | 🟢 **1020** |
|  | nodeGrowth | 0 | = | = | 🟢 **5012** |
|  | jsHeapGrowth | 115.33 | 114.14 | 109.98 | 🟢 **5392.33** |
|  | blinkHeapGrowth | 16.85 | = | = | 🟢 **2154.52** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **1740** |
|  | nodeGrowth | 0 | = | = | 🟢 **9984** |
|  | jsHeapGrowth | 135.96 | 137.12 | 129.69 | 🟢 **10954.03** |
|  | blinkHeapGrowth | 1.06 | 1.09 | 26.81 | 🟢 **4748.48** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **580** |
|  | nodeGrowth | 0 | = | = | 🟢 **3330** |
|  | jsHeapGrowth | 103.33 | 104 | 101.23 | 🟢 **3749.07** |
|  | blinkHeapGrowth | 9.39 | = | = | 🟢 **1582.58** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| manyPages/pages/preview | −30% | −33%..−28% | −31% | −31% | −29% | −29% | −31% | 🟢 |
| records-10k/records/add-row@orders | +58% | +51%..+65% | +56% | +57% | +53% | +61% | +62% | 🟢 |
| records-10k/records/edit-cell@orders | +34% | +27%..+40% | +29% | +34% | +32% | +34% | +37% | 🟢 |
| records-10k/records/filter-set@orders | +24% | +22%..+28% | +26% | +25% | +23% | +26% | +25% | 🟢 |
| records-10k/records/last@orders | −32% | −33%..−29% | −32% | −30% | −31% | −31% | −32% | 🟢 |
| records-10k/records/next@orders | −40% | −42%..−37% | −38% | −41% | −39% | −41% | −40% | 🟢 |
| records-10k/records/sort-header@orders | −36% | −39%..−32% | −36% | −36% | −38% | −35% | −34% | 🟢 |
| records-1k/records/next@ordersPanel | −76% | −78%..−73% | −75% | −76% | −74% | −77% | −76% | 🟢 |
| records-plain/records/next@panelsPaged | −73% | −75%..−71% | −73% | −74% | −72% | −73% | −73% | 🟢 |
| records-plain/records/sort-1@panels30 | −74% | −75%..−73% | −74% | −75% | −73% | −75% | −74% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −67% | −68%..−66% | −66% | −67% | −67% | −67% | −67% | 🟢 |
| records-plain/records/sort-header@orders30 | −73% | −74%..−72% | −74% | −73% | −73% | −74% | −73% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −67% | −68%..−66% | −68% | −67% | −66% | −67% | −67% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): layoutCount 19 → 5 (render), recalcStyleCount 20 → 6 (render)
- complexLogic/answer/first (7D): layoutCount 1 → 0 (render), recalcStyleCount 2 → 1 (render)
- complexLogic/answer/first (30D): layoutCount 1 → 0 (render), recalcStyleCount 3 → 1 (render), blinkHeapGrowth -1.97 → -2.19 (heap)
- complexLogic/answer/type (30D): layoutCount 6 → 2 (render), recalcStyleCount 7 → 2 (render), blinkHeapGrowth -2.15 → -2.29 (heap)
- expressions/load/paint (30D): layoutCount 14 → 4 (render), recalcStyleCount 15 → 5 (render)
- large/load/paint (30D): recalcStyleCount 4 → 3 (render)
- manyPages/pages/locale (1D): jsHeapGrowth 40.92 → 40.75 (heap), blinkHeapGrowth 2.32 → 2.47 (heap)
- manyPages/pages/locale (7D): jsHeapGrowth 42.38 → 41.3 (heap)
- manyPages/pages/locale (30D): layoutCount 6 → 3 (render), recalcStyleCount 6 → 3 (render), jsHeapGrowth 52.42 → 41.05 (heap), blinkHeapGrowth 2.42 → 2.32 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 140.43 → 139.07 (heap), blinkHeapGrowth -28.61 → -28.58 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 142.7 → 140.72 (heap), blinkHeapGrowth -34.03 → -32.54 (heap)
- manyPages/pages/next10 (30D): layoutCount 26 → 16 (render), recalcStyleCount 26 → 16 (render), jsHeapGrowth 144.51 → 139.1 (heap), blinkHeapGrowth 1.95 → -31.57 (heap)
- manyPages/pages/preview (1D): jsHeapGrowth 576.36 → 577.34 (heap)
- manyPages/pages/preview (7D): jsHeapGrowth 580.38 → 577.41 (heap)
- manyPages/pages/preview (30D): layoutCount 1203 → 3 (render), recalcStyleCount 1203 → 3 (render), jsHeapGrowth 541.22 → 574.74 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work), layoutCount 5 → 4 (render), recalcStyleCount 5 → 4 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render), blinkHeapGrowth 8.09 → 0.67 (heap)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/next@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-1k/records/next@ordersPanel (30D): conditionRuns 20 → 10 (work), expressionRuns 40 → 20 (work), panelsCreated 10 → 0 (work), layoutCount 89 → 1 (render), recalcStyleCount 89 → 1 (render)
- records-plain/records/next@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 91 → 1 (render), recalcStyleCount 91 → 1 (render)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work), layoutCount 154 → 2 (render), recalcStyleCount 154 → 2 (render)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work), layoutCount 53 → 2 (render), recalcStyleCount 53 → 2 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
