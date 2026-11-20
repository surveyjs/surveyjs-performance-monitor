# survey-library · angular · 20.11.2026 10:09 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44716813729

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 470 | −1% | −2% | 🟢 **−47%** |
| complexLogic/answer/type | 392 | +1% | +3% | 🟢 **−72%** |
| complexLogic/load/paint | 2901 | +1% | +1% | 🟢 **−58%** |
| expressions/load/paint | 4059 | 0% | +2% | −24% |
| large/load/paint | 1092 | +1% | −7% | −22% |
| manyPages/load/paint | 719 | 0% | −3% | −6% |
| manyPages/pages/next10 | 318 | −8% | −7% | −14% |
| records-10k/load/paint | 2005 | −4% | 🟢 **−27%** | −2% |
| records-10k/records/edit-cell@orders | 567 | −19% | −19% | +11% |
| records-10k/records/sort-header@orders | 263 | −7% | −6% | n/a¹ |
| records-1k/load/paint | 1635 | −7% | −10% | −11% |
| records-plain/records/sort-header@orders30 | 93 | 🟢 **−36%** | 🟢 **−36%** | n/a² |
| records-plain/records/sort-header@ordersPaged | 46.2 | 🟢 **−31%** | 🟢 **−31%** | n/a² |

n/a:
- ¹ Error: page.evaluate: Error: check failed: the sort button of total
- ² Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
Counters: 🔴/🟢 the build's value, a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| calculations/load/paint | expressionRuns | 2401 | = | = | 🟢 **4772** |
| complexLogic/answer/type | conditionRuns | 52 | = | = | 🟢 **14688** |
| complexLogic/answer/type | expressionRuns | 256 | = | = | 🟢 **5854** |
| manyPages/pages/next10 | blinkHeapGrowth | -80.73 | -74.85 | -79.31 | 🟢 **0.67** |
| records-10k/load/paint | expressionRuns | 80940 | = | = | 🔴 **490** |
| records-10k/records/edit-cell@orders | expressionRuns | 20848 | = | = | 🔴 **278** |
| records-10k/records/edit-cell@orders | jsHeapGrowth | 71.65 | 🟢 **120.44** | 🟢 **119** | 🟢 **111.31** |
| records-1k/load/paint | expressionRuns | 8940 | = | = | 🔴 **490** |
| records-plain/records/sort-header@orders30 | blinkHeapGrowth | 10.96 | 🟢 **31.99** | 🟢 **31.99** | — |

## Repeats 1D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-plain/records/sort-header@orders30 | −36% | −34% | −34% | −39% | −39% | −37% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −31% | −30% | −37% | −29% | −32% | −30% | 🟢 |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/paint | −27% | −27% | −26% | −27% | −27% | −27% | 🟢 |
| records-plain/records/sort-header@orders30 | −36% | −39% | −36% | −37% | −35% | −37% | 🟢 |
| records-plain/records/sort-header@ordersPaged | −31% | −32% | −30% | −32% | −30% | −30% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | −47% | −47% | −47% | −48% | −47% | −47% | 🟢 |
| complexLogic/answer/type | −72% | −70% | −72% | −71% | −73% | −73% | 🟢 |
| complexLogic/load/paint | −58% | −59% | −58% | −59% | −59% | −58% | 🟢 |

## Counters (information)
- complexLogic/answer/type (1D): jsHeapGrowth 315.9 → 346.32 (heap), blinkHeapGrowth -2.2 → -2.22 (heap)
- complexLogic/answer/type (7D): jsHeapGrowth 341.04 → 344.26 (heap), blinkHeapGrowth -2.08 → -2.22 (heap)
- complexLogic/answer/type (30D): jsHeapGrowth 291.07 → 347.76 (heap), blinkHeapGrowth 1.97 → -2.22 (heap)
- manyPages/pages/next10 (1D): jsHeapGrowth 193.8 → 201.17 (heap)
- manyPages/pages/next10 (7D): jsHeapGrowth 190.26 → 201.08 (heap)
- manyPages/pages/next10 (30D): jsHeapGrowth 193.35 → 201.05 (heap)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work)
- records-10k/records/edit-cell@orders (7D): blinkHeapGrowth -3.4 → -3.54 (heap)
- records-10k/records/edit-cell@orders (30D): blinkHeapGrowth -3.36 → -3.54 (heap)
- records-10k/records/sort-header@orders (1D): jsHeapGrowth 299.06 → 332.5 (heap), blinkHeapGrowth 31.12 → 31.15 (heap)
- records-10k/records/sort-header@orders (7D): jsHeapGrowth 293.34 → 331.57 (heap), blinkHeapGrowth 31.12 → 31.15 (heap)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work)
- records-plain/records/sort-header@orders30 (1D): jsHeapGrowth 136.47 → 129.59 (heap)
- records-plain/records/sort-header@orders30 (7D): jsHeapGrowth 141.22 → 129.07 (heap)
- records-plain/records/sort-header@ordersPaged (1D): jsHeapGrowth 98.33 → 97.34 (heap), blinkHeapGrowth 10.35 → 9.76 (heap)
- records-plain/records/sort-header@ordersPaged (7D): jsHeapGrowth 97.44 → 97.69 (heap), blinkHeapGrowth 10.35 → 9.76 (heap)

Δ = today / build − 1.
