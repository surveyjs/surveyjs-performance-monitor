# survey-library · vue3 · 22.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 444 | = today | 0% | −16% |
| complexLogic/answer/type | 513 | = today | +4% | −14% |
| complexLogic/load/paint | 1589 | = today | 0% | 🟢 **−29%** |
| expressions/load/paint | 6113 | = today | +1% | −24% |
| large/load/paint | 579 | = today | −6% | −20% |
| manyPages/load/paint | 490 | = today | −1% | −9% |
| manyPages/pages/next10 | 301 | = today | −3% | −11% |
| records-10k/load/paint | 1895 | = today | −25% | −1% |
| records-10k/records/edit-cell@orders | 303 | = today | +2% | 🔴 **+55%** |
| records-10k/records/sort-header@orders | 297 | = today | +2% | 🟢 **−52%** |
| records-1k/load/paint | 808 | = today | −5% | −13% |
| records-plain/records/sort-header@orders30 | 187 | = today | +2% | 🟢 **−79%** |
| records-plain/records/sort-header@ordersPaged | 83.9 | = today | −2% | 🟢 **−73%** |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **7240** |
|  | nodeGrowth | 0 | — | = | 🟢 **23968** |
|  | jsHeapGrowth | 317.59000000000003 | — | 307.1 | 🟢 **51865.42** |
|  | blinkHeapGrowth | -25.14 | — | -28.17 | 🟢 **7730.83** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6480** |
|  | nodeGrowth | 0 | — | = | 🟢 **22332** |
|  | jsHeapGrowth | 161.405 | — | 161.94 | 🟢 **36376.44** |
|  | blinkHeapGrowth | 36.12 | — | = | 🟢 **6751.36** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2160** |
|  | nodeGrowth | 0 | — | = | 🟢 **7445** |
|  | jsHeapGrowth | 93.16 | — | 91.86 | 🟢 **12251.38** |
|  | blinkHeapGrowth | 11.11 | — | 39.19 | 🟢 **2305.51** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −25% | −24% | −26% | −26% | −25% | −26% | 🔴 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −29% | −29% | −29% | −29% | −28% | −28% | 🟢 |
| records-10k/records/edit-cell@orders | +55% | +57% | +53% | +53% | +57% | +58% | 🟢 |
| records-10k/records/sort-header@orders | −52% | −52% | −52% | −52% | −52% | −52% | 🟢 |
| records-plain/records/sort-header@orders30 | −79% | −80% | −80% | −80% | −79% | −79% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −73% | −73% | −73% | −74% | −72% | −73% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 326.26 → 340.14 (heap), blinkHeapGrowth -2.16 → -2.3 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 316.5 → 338.59 (heap), blinkHeapGrowth -2.16 → -2.3 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 144.43 → 135.58 (heap), blinkHeapGrowth -1.25 → -5.44 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 141.14 → 135.97 (heap), blinkHeapGrowth 2.16 → -48.19 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 72.78 → 60.03 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 72.02 → 61.25 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
