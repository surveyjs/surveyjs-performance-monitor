# survey-library · angular · 22.11.2026 01:06 UTC

> not run (worker failed): angular records-10k/records/edit-cell@orders https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335/job/137047904859 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335

- today — incomplete: 1 unrun (worker failed)
- 7D — incomplete: 1 unrun (worker failed)
- 30D — incomplete: 1 unrun (worker failed)

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 552 | = today | −4% | −18% |
| complexLogic/answer/type | 645 | = today | 0% | −17% |
| complexLogic/load/paint | 1589 | = today | +1% | 🟢 **−29%** |
| expressions/load/paint | 4157 | = today | +1% | −24% |
| large/load/paint | 564 | = today | −7% | −21% |
| manyPages/load/paint | 966 | = today | −5% | −10% |
| manyPages/pages/next10 | 363 | = today | −8% | −14% |
| records-10k/load/paint | 2484 | = today | −24% | −5% |
| records-10k/records/edit-cell@orders | n/a | = today | not run | not run |
| records-10k/records/sort-header@orders | 473 | = today | −3% | 🟢 **−54%** |
| records-1k/load/paint | 880 | = today | −8% | −18% |
| records-plain/records/sort-header@orders30 | 97.9 | = today | 🟢 **−35%** | 🟢 **−85%** |
| records-plain/records/sort-header@ordersPaged | 80.2 | = today | 🟢 **−30%** | 🟢 **−78%** |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -78.645 | — | 🟢 **59.61** | 2.13 |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **1260** |
|  | nodeGrowth | 0 | — | = | 🟢 **41348** |
|  | jsHeapGrowth | 331.74 | — | 293.84 | 🟢 **31823.18** |
|  | blinkHeapGrowth | 26.91 | — | 27.05 | 🟢 **9562.16** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **900** |
|  | nodeGrowth | 0 | — | = | 🟢 **37992** |
|  | jsHeapGrowth | 129.57 | — | 135.82 | 🟢 **12682.37** |
|  | blinkHeapGrowth | 11.29 | — | 31.99 | 🟢 **8375.12** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **300** |
|  | nodeGrowth | 0 | — | = | 🟢 **12665** |
|  | jsHeapGrowth | 100.16 | — | 114.25 | 🟢 **4330.29** |
|  | blinkHeapGrowth | 11.96 | — | 13.96 | 🟢 **2796.87** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-plain/records/sort-header@orders30 | −35% | −36% | −36% | −36% | −34% | −37% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −30% | −32% | −31% | −30% | −30% | −30% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/load/paint | −29% | −29% | −29% | −28% | −28% | −29% | 🟢 |
| records-10k/records/sort-header@orders | −54% | −55% | −53% | −54% | −53% | −54% | 🟢 |
| records-plain/records/sort-header@orders30 | −85% | −85% | −84% | −84% | −85% | −85% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −78% | −78% | −78% | −78% | −77% | −78% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 344.11 → 345.02 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 298.59 → 345.25 (heap), blinkHeapGrowth 1.97 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (7D): jsHeapGrowth 190.19 → 198.99 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 187.94 → 200.75 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
