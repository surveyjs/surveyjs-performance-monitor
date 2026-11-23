# survey-library · vue3 · 23.11.2026 13:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45179909558

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 858 | = today | 0% | 🟢 **−16%** |
| complexLogic/answer/type | 408 | = today | +3% | 🟢 **−16%** |
| complexLogic/load/paint | 1568 | = today | 0% | 🟢 **−30%** |
| expressions/load/paint | 6102 | = today | +1% | 🟢 **−24%** |
| large/load/paint | 583 | = today | −6% | 🟢 **−20%** |
| manyPages/load/paint | 468 | = today | −5% | −8% |
| manyPages/pages/next10 | 298 | = today | −2% | −9% |
| records-10k/load/paint | 1371 | = today | 🟢 **−26%** | −7% |
| records-10k/records/edit-cell@orders | 314 | = today | +1% | 🔴 **+53%** |
| records-10k/records/sort-header@orders | 298 | = today | +3% | 🟢 **−51%** |
| records-1k/load/paint | 1080 | = today | −5% | 🟢 **−11%** |
| records-plain/records/sort-header@orders30 | 139 | = today | +4% | 🟢 **−80%** |
| records-plain/records/sort-header@ordersPaged | 50 | = today | +1% | 🟢 **−75%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **7240** |
|  | nodeGrowth | 0 | — | = | 🟢 **23968** |
|  | jsHeapGrowth | 317.645 | — | 308.34 | 🟢 **51921.5** |
|  | blinkHeapGrowth | 30.06 | — | -21.06 | 🟢 **7730.83** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **6480** |
|  | nodeGrowth | 0 | — | = | 🟢 **22332** |
|  | jsHeapGrowth | 138.14999999999998 | — | 138.46 | 🟢 **36444.42** |
|  | blinkHeapGrowth | 32.04 | — | = | 🟢 **6751.32** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **2160** |
|  | nodeGrowth | 0 | — | = | 🟢 **7445** |
|  | jsHeapGrowth | 87.485 | — | 92.31 | 🟢 **12277.09** |
|  | blinkHeapGrowth | 8.86 | — | = | 🟢 **2254.56** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −26% | −29%..−23% | −28% | −25% | −25% | −25% | −27% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −16% | −17%..−15% | −16% | −17% | −16% | −16% | −15% | 🟢 |
| complexLogic/answer/type | −16% | −21%..−10% | −14% | −14% | −14% | −18% | −19% | 🟢 |
| complexLogic/load/paint | −30% | −30%..−29% | −30% | −30% | −30% | −30% | −30% | 🟢 |
| expressions/load/paint | −24% | −25%..−23% | −24% | −24% | −24% | −25% | −24% | 🟢 |
| large/load/paint | −20% | −23%..−17% | −22% | −20% | −18% | −21% | −20% | 🟢 |
| records-10k/records/edit-cell@orders | +53% | +46%..+62% | +59% | +53% | +56% | +50% | +51% | 🟢 |
| records-10k/records/sort-header@orders | −51% | −52%..−50% | −51% | −51% | −51% | −51% | −50% | 🟢 |
| records-1k/load/paint | −11% | −12%..−9% | −11% | −11% | −9% | −10% | −11% | 🟢 |
| records-plain/records/sort-header@orders30 | −80% | −81%..−79% | −79% | −80% | −80% | −80% | −80% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −75% | −76%..−74% | −75% | −75% | −75% | −75% | −76% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 317.6 → 327.89 (heap), blinkHeapGrowth -26.86 → -28.33 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 321.57 → 329.49 (heap), blinkHeapGrowth -2.16 → -27.63 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 146.96 → 134.85 (heap), blinkHeapGrowth 0.65 → -9.96 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 140.4 → 134.38 (heap), blinkHeapGrowth 0.66 → 1.83 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 74.05 → 62.1 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 72.07 → 58.92 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
