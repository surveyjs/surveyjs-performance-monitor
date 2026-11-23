# survey-library · angular · 23.11.2026 07:20 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45130286152

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 488 | = today | −3% | 🟢 **−18%** |
| complexLogic/answer/type | 546 | = today | +4% | 🟢 **−15%** |
| complexLogic/load/paint | 1587 | = today | 0% | 🟢 **−30%** |
| expressions/load/paint | 6438 | = today | −2% | 🟢 **−24%** |
| large/load/paint | 601 | = today | 🟢 **−6%** | 🟢 **−20%** |
| manyPages/load/paint | 846 | = today | −4% | 🟢 **−9%** |
| manyPages/pages/next10 | 370 | = today | −8% | 🟢 **−14%** |
| records-10k/load/paint | 1627 | = today | 🟢 **−24%** | −3% |
| records-10k/records/edit-cell@orders | 305 | = today | 🟢 **−19%** | +4% |
| records-10k/records/sort-header@orders | 268 | = today | −3% | 🟢 **−54%** |
| records-1k/load/paint | 902 | = today | 🟢 **−9%** | 🟢 **−18%** |
| records-plain/records/sort-header@orders30 | 95.1 | = today | 🟢 **−36%** | 🟢 **−85%** |
| records-plain/records/sort-header@ordersPaged | 44.8 | = today | 🟢 **−32%** | 🟢 **−81%** |

🔴 slower · 🟢 faster: a change of 5% or more whose 99% interval over the repeats clears 2% and 8 ms
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -51.82 | — | 🟢 **61.33** | 🟢 **2.19** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 72.34 | — | 🟢 **120.1** | 🟢 **123.39** |
| records-10k/records/sort-header@orders | listenerGrowth | 0 | — | = | 🟢 **1260** |
|  | nodeGrowth | 0 | — | = | 🟢 **41348** |
|  | jsHeapGrowth | 331.065 | — | 294.46 | 🟢 **31884.65** |
|  | blinkHeapGrowth | 31.15 | — | 31.12 | 🟢 **9558.08** |
| records-plain/records/sort-header@orders30 | listenerGrowth | 0 | — | = | 🟢 **900** |
|  | nodeGrowth | 0 | — | = | 🟢 **37992** |
|  | jsHeapGrowth | 129.41 | — | 135.08 | 🟢 **12742.97** |
|  | blinkHeapGrowth | 11.32 | — | 🟢 **31.99** | 🟢 **8375.12** |
| records-plain/records/sort-header@ordersPaged | listenerGrowth | 0 | — | = | 🟢 **300** |
|  | nodeGrowth | 0 | — | = | 🟢 **12665** |
|  | jsHeapGrowth | 97.695 | — | 98.12 | 🟢 **4355.08** |
|  | blinkHeapGrowth | -34.26 | — | 10.35 | 🟢 **2796.86** |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| large/load/paint | −6% | −7%..−5% | −7% | −6% | −6% | −6% | −5% | 🟢 |
| manyPages/pages/next10 | −8% | −16%..+7% | +4% | −8% | −5% | −10% | −8% | 🔴 |
| records-10k/load/paint | −24% | −26%..−23% | −24% | −24% | −24% | −25% | −25% | 🟢 |
| records-10k/records/edit-cell@orders | −19% | −24%..−12% | −13% | −20% | −20% | −18% | −19% | 🟢 |
| records-1k/load/paint | −9% | −12%..−5% | −8% | −8% | −12% | −8% | −8% | 🟢 |
| records-plain/records/sort-header@orders30 | −36% | −39%..−32% | −37% | −37% | −35% | −33% | −37% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −32% | −37%..−25% | −33% | −28% | −28% | −34% | −34% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −18% | −19%..−17% | −19% | −18% | −18% | −18% | −18% | 🟢 |
| complexLogic/answer/type | −15% | −21%..−7% | −17% | −15% | −18% | −9% | −13% | 🟢 |
| complexLogic/load/paint | −30% | −31%..−28% | −29% | −30% | −29% | −29% | −31% | 🟢 |
| expressions/load/paint | −24% | −26%..−21% | −23% | −24% | −24% | −26% | −23% | 🟢 |
| large/load/paint | −20% | −22%..−18% | −19% | −20% | −20% | −22% | −19% | 🟢 |
| manyPages/load/paint | −9% | −10%..−8% | −9% | −9% | −9% | −10% | −8% | 🟢 |
| manyPages/pages/next10 | −14% | −19%..−7% | −15% | −16% | −14% | −8% | −12% | 🟢 |
| records-10k/records/sort-header@orders | −54% | −58%..−53% | −56% | −53% | −55% | −57% | −56% | 🟢 |
| records-1k/load/paint | −18% | −18%..−17% | −17% | −18% | −17% | −18% | −18% | 🟢 |
| records-plain/records/sort-header@orders30 | −85% | −85%..−84% | −84% | −85% | −85% | −85% | −84% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −81% | −83%..−79% | −80% | −82% | −81% | −81% | −81% | 🟢 |

## Counters (information)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (7D): jsHeapGrowth 341.13 → 344.73 (heap), blinkHeapGrowth -2.08 → -2.16 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 294.91 → 346.56 (heap), blinkHeapGrowth 1.97 → -2.22 (heap)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (7D): jsHeapGrowth 190.92 → 201.47 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 186.81 → 200.06 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/sort-header@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 2 → 1 (render)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work), layoutCount 7 → 3 (render), recalcStyleCount 7 → 3 (render)
- records-plain/records/sort-header@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)
- records-plain/records/sort-header@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work), layoutCount 2 → 1 (render), recalcStyleCount 3 → 1 (render)

Δ = today / build − 1.
