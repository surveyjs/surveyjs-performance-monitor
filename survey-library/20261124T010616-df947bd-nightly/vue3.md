# survey-library · vue3 · 24.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45302415096

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 841 | 0% | +2% | 🟢 **−17%** |
| complexLogic/answer/type | 397 | +2% | +2% | 🟢 **−14%** |
| complexLogic/load/paint | 2176 | 0% | 0% | 🟢 **−28%** |
| expressions/load/paint | 4762 | +1% | +2% | 🟢 **−24%** |
| large/load/paint | 794 | −1% | −6% | 🟢 **−22%** |
| manyPages/load/paint | 487 | 0% | −2% | −8% |
| manyPages/pages/next10 | 302 | −1% | −4% | 🟢 **−12%** |
| records-10k/load/paint | 1990 | 0% | 🟢 **−25%** | −2% |
| records-10k/records/edit-cell@orders | 313 | +2% | +1% | 🔴 **+55%** |
| records-10k/records/sort-header@orders | 277 | +1% | −1% | 🟢 **−52%** |
| records-1k/load/paint | 810 | −1% | −4% | 🟢 **−13%** |
| records-plain/records/sort-header@orders30 | 97.3 | +1% | +1% | 🟢 **−83%** |
| records-plain/records/sort-header@ordersPaged | 47.7 | +1% | 0% | 🟢 **−77%** |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| complexLogic/answer/type | blinkHeapGrowth | -28.18 | -27.76 | -26.34 | 🟢 **-2.16** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | = | = | 🟢 **7240** |
|  | nodeGrowth | 0 | = | = | 🟢 **23968** |
|  | jsHeapGrowth | 317.58 | 317.33 | 308.04 | 🟢 **51917.21** |
|  | blinkHeapGrowth | -31.07 | -25.11 | 24.99 | 🟢 **7730.83** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | = | = | 🟢 **6480** |
|  | nodeGrowth | 0 | = | = | 🟢 **22332** |
|  | jsHeapGrowth | 116.46 | 117.12 | 116.91 | 🟢 **36444.16** |
|  | blinkHeapGrowth | 14.8 | 17.8 | 15.43 | 🟢 **6709.24** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | = | = | 🟢 **2160** |
|  | nodeGrowth | 0 | = | = | 🟢 **7445** |
|  | jsHeapGrowth | 90.44 | 89.26 | 91.41 | 🟢 **12275.43** |
|  | blinkHeapGrowth | 8.86 | = | = | 🟢 **2254.56** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −25% | −26%..−24% | −26% | −26% | −25% | −25% | −25% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −17% | −18%..−15% | −15% | −17% | −17% | −17% | −17% | 🟢 |
| complexLogic/answer/type | −14% | −18%..−9% | −14% | −11% | −15% | −16% | −11% | 🟢 |
| complexLogic/load/paint | −28% | −29%..−26% | −28% | −26% | −28% | −28% | −28% | 🟢 |
| expressions/load/paint | −24% | −26%..−23% | −24% | −25% | −24% | −23% | −24% | 🟢 |
| large/load/paint | −22% | −23%..−21% | −21% | −22% | −21% | −22% | −22% | 🟢 |
| manyPages/pages/next10 | −12% | −17%..−8% | −9% | −14% | −11% | −13% | −14% | 🟢 |
| records-10k/records/edit-cell@orders | +55% | +52%..+59% | +57% | +54% | +57% | +53% | +56% | 🟢 |
| records-10k/records/sort-header@orders | −52% | −55%..−49% | −53% | −53% | −52% | −49% | −53% | 🟢 |
| records-1k/load/paint | −13% | −14%..−11% | −14% | −12% | −13% | −13% | −12% | 🟢 |
| records-plain/records/sort-header@orders30 | −83% | −84%..−83% | −83% | −83% | −83% | −83% | −83% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −77% | −77%..−76% | −76% | −76% | −77% | −77% | −76% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 335.3 → 333.11 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 320.52 → 325.97 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 318.6 → 327.86 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 13 → 5 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 134.32 → 134.73 (heap), blinkHeapGrowth -46.67 → -7.74 (heap)
- manyPages/pages/next10 (7D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 146.85 → 134.13 (heap), blinkHeapGrowth -7.01 → -42.68 (heap)
- manyPages/pages/next10 (30D): layoutCount 17 → 16 (render), recalcStyleCount 17 → 16 (render), jsHeapGrowth 141.52 → 134.23 (heap), blinkHeapGrowth 14.6 → -46.63 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (1D): jsHeapGrowth 59.16 → 59.44 (heap)
- records-10k/records/edit-cell@orders (7D): jsHeapGrowth 71.8 → 59.06 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), jsHeapGrowth 72.47 → 58.52 (heap)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)

Δ = today / build − 1.
