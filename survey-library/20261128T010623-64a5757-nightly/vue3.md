# survey-library · vue3 · 28.11.2026 01:06 UTC

> cancelled: 3 scenarios not measured · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46091383335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 442 | 0% | +1% | +2% |
| complexLogic/answer/type | 620 | −1% | −1% | +5% |
| complexLogic/load/paint | 2716 | +1% | −1% | +1% |
| expressions/load/paint | 5404 | 0% | −4% | −3% |
| large/load/paint | 555 | 0% | −6% | −6% |
| manyPages/load/paint | 829 | +1% | −1% | 0% |
| manyPages/pages/next10 | 387 | +1% | −3% | 0% |
| records-10k/load/paint | 2536 | 0% | +2% | 🔴 **+15%** |
| records-10k/records/edit-cell@orders | 313 | +1% | +1% | 🔴 **+61%** |
| records-10k/records/sort-header@orders | 282 | 0% | +1% | 🟢 **−43%** |
| records-1k/load/paint | 906 | +1% | −2% | +1% |
| records-plain/records/sort-header@orders30 | 98.1 | +2% | −1% | 🟢 **−79%** |
| records-plain/records/sort-header@ordersPaged | 48.7 | +3% | +2% | 🟢 **−71%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **6520** |
|  | nodeGrowth | 0 | = | = | 🟢 **21628** |
|  | jsHeapGrowth | 625.37 | 628.71 | 🔴 **317.66** | 🟢 **50148.1** |
|  | blinkHeapGrowth | -25.02 | -25.1 | -25.49 | 🟢 **7081.66** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6000** |
|  | nodeGrowth | 0 | = | = | 🟢 **20772** |
|  | jsHeapGrowth | 118.23 | 118.2 | 116.85 | 🟢 **35257.5** |
|  | blinkHeapGrowth | 26.92 | 7.93 | 18.1 | 🟢 **6318.21** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2000** |
|  | nodeGrowth | 0 | = | = | 🟢 **6925** |
|  | jsHeapGrowth | 91.94 | 91.68 | 87.32 | 🟢 **11896.64** |
|  | blinkHeapGrowth | 8.86 | = | = | 🟢 **2109.49** |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | +15% | +12%..+18% | +16% | +15% | +15% | +16% | +13% | 🟢 |
| records-10k/records/edit-cell@orders | +61% | +53%..+71% | +66% | +58% | +57% | +61% | +66% | 🟢 |
| records-10k/records/sort-header@orders | −43% | −44%..−42% | −44% | −42% | −43% | −44% | −43% | 🟢 |
| records-plain/records/sort-header@orders30 | −79% | −81%..−78% | −79% | −79% | −80% | −79% | −80% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −71% | −73%..−70% | −72% | −72% | −71% | −71% | −71% | 🟢 |

## Counters (information)
- calculations/load/paint (30D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 347.79 → 346.26 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 337.1 → 342.77 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 313.46 → 349.03 (heap), blinkHeapGrowth -2.17 → -2.3 (heap)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 133.97 → 134.72 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 133.85 → 133.87 (heap), blinkHeapGrowth 2.39 → 2.32 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 139.96 → 134.33 (heap), blinkHeapGrowth 2.43 → 2.31 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 66.47 → 65.44 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 58.33 → 63.9 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 66.57 → 64 (heap), blinkHeapGrowth 0.74 → 0.66 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
