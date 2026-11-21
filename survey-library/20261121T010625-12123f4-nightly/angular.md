# survey-library · angular · 21.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44848104594

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 493 | 0% | −3% | −19% |
| complexLogic/answer/type | 683 | 0% | 0% | 🟢 **−41%** |
| complexLogic/load/paint | 1616 | 0% | 0% | 🟢 **−33%** |
| expressions/load/paint | 6189 | 0% | +1% | 🟢 **−27%** |
| large/load/paint | 580 | 0% | −6% | −22% |
| manyPages/load/paint | 692 | 0% | −5% | −9% |
| manyPages/pages/next10 | 361 | +1% | −5% | −14% |
| records-10k/load/paint | 1450 | −1% | 🟢 **−26%** | −8% |
| records-10k/records/edit-cell@orders | 412 | −2% | −18% | +13% |
| records-10k/records/sort-header@orders | 268 | −1% | −7% | n/a¹ |
| records-1k/load/paint | 875 | 0% | −9% | −13% |
| records-plain/records/sort-header@orders30 | 97.8 | 0% | 🟢 **−33%** | n/a² |
| records-plain/records/sort-header@ordersPaged | 59.5 | 0% | 🟢 **−28%** | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a leak or heap counter changed in every repeat (leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| manyPages/pages/next10 | blinkHeapGrowth | -73.63 | -81.72 | 🟢 **0.68** | 🟢 **52.88** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 70.84 | 70.04 | 🟢 **121.78** | 🟢 **115.47** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −26% | −27% | −26% | −25% | −26% | −26% | 🟢 |
| records-plain/records/sort-header@orders30 | −33% | −31% | −30% | −33% | −32% | −33% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −28% | −30% | −29% | −28% | −28% | −28% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| complexLogic/answer/type | −41% | −42% | −43% | −40% | −40% | −41% | 🟢 |
| complexLogic/load/paint | −33% | −33% | −33% | −33% | −32% | −33% | 🟢 |
| expressions/load/paint | −27% | −28% | −28% | −28% | −27% | −27% | 🟢 |

## Counters (information)
- calculations/load/paint (1D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (7D): layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- calculations/load/paint (30D): expressionRuns 4472 → 2401 (work), layoutCount 18 → 6 (render), recalcStyleCount 18 → 6 (render)
- complexLogic/answer/type (1D): jsHeapGrowth 344.49 → 345.16 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 344.79 → 347.01 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 297.83 → 346.08 (heap), blinkHeapGrowth 1.97 → 1.99 (heap)
- expressions/load/paint (1D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (7D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- expressions/load/paint (30D): layoutCount 13 → 5 (render), recalcStyleCount 14 → 6 (render)
- manyPages/pages/next10 (1D): jsHeapGrowth 198.89 → 201.15 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 190.51 → 200.15 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 187.17 → 199.73 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/edit-cell@orders (7D): blinkHeapGrowth -25.88 → -33.07 (heap)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work), blinkHeapGrowth 0.66 → -33.07 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 330.85 → 331.2 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 294.13 → 331.25 (heap), blinkHeapGrowth 31.12 → 31.15 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 129.51 → 129.49 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 135.65 → 129.54 (heap), blinkHeapGrowth 31.99 → 11.35 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 97.47 → 97.71 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 108.95 → 97.5 (heap), blinkHeapGrowth 11.96 → 9.83 (heap)

Δ = today / build − 1.
