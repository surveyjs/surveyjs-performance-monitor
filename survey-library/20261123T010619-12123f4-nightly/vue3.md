# survey-library · vue3 · 23.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45092599916

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 452 | = today | +1% | −16% |
| complexLogic/answer/type | 614 | = today | +5% | −16% |
| complexLogic/load/paint | 1586 | = today | 0% | 🟢 **−27%** |
| expressions/load/paint | 3978 | = today | +1% | −24% |
| large/load/paint | 582 | = today | −5% | −20% |
| manyPages/load/paint | 559 | = today | −1% | −6% |
| manyPages/pages/next10 | 495 | = today | −3% | −9% |
| records-10k/load/paint | 2282 | = today | −25% | −3% |
| records-10k/records/edit-cell@orders | 312 | = today | +1% | 🔴 **+54%** |
| records-10k/records/sort-header@orders | 526 | = today | +1% | 🟢 **−45%** |
| records-1k/load/paint | 818 | = today | −4% | −13% |
| records-plain/records/sort-header@orders30 | 102 | = today | +3% | 🟢 **−82%** |
| records-plain/records/sort-header@ordersPaged | 47.9 | = today | 0% | 🟢 **−76%** |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **7240** |
|  | nodeGrowth | 0 | — | = | 🟢 **23968** |
|  | jsHeapGrowth | 318.33500000000004 | — | 308.94 | 🟢 **51924.57** |
|  | blinkHeapGrowth | 25.85 | — | 25.99 | 🟢 **7734.9** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6480** |
|  | nodeGrowth | 0 | — | = | 🟢 **22332** |
|  | jsHeapGrowth | 116.37 | — | 116.02 | 🟢 **36451.13** |
|  | blinkHeapGrowth | 26.92 | — | 15.67 | 🟢 **6708.12** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2160** |
|  | nodeGrowth | 0 | — | = | 🟢 **7445** |
|  | jsHeapGrowth | 87.59 | — | 91.45 | 🟢 **12274.9** |
|  | blinkHeapGrowth | 8.86 | — | = | 🟢 **2254.57** |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −27% | −28% | −27% | −25% | −28% | −27% | 🟢 |
| records-10k/records/edit-cell@orders | +54% | +57% | +54% | +58% | +48% | +54% | 🟢 |
| records-10k/records/sort-header@orders | −45% | −44% | −47% | −46% | −46% | −45% | 🟢 |
| records-plain/records/sort-header@orders30 | −82% | −82% | −83% | −83% | −82% | −82% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −76% | −76% | −77% | −76% | −78% | −76% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 324.65 → 338.21 (heap), blinkHeapGrowth -2.16 → -2.3 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 319.53 → 340.02 (heap), blinkHeapGrowth 1.91 → -2.3 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 148.5 → 133.05 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 141.31 → 132.94 (heap), blinkHeapGrowth 47.39 → 2.43 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.27 → 57.65 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 73.37 → 58.48 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
