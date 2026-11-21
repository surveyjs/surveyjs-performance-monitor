# survey-library · core · 21.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44848104594

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 48.9 | −1% | −14% | 🟢 **−31%** |
| calculations/answer/next3 | 141 | +1% | −20% | 🟢 **−35%** |
| calculations/load/model | 275 | −1% | +1% | 🟢 **−30%** |
| complexLogic/answer/first | 278 | +2% | +3% | −22% |
| complexLogic/answer/next3 | 566 | −1% | +2% | 🟢 **−44%** |
| complexLogic/load/design | 1236 | −1% | +1% | n/a¹ |
| complexLogic/load/model | 2271 | +1% | +2% | 🟢 **−28%** |
| complexLogic/output/data ᶜ | 0.34 | 0% | +3% | −6% |
| complexLogic/output/dispose | 49.9 | +1% | +7% | +3% |
| complexLogic/output/toJSON | 69.2 | −4% | −6% | −23% |
| expressions/answer/first | 1352 | 0% | +14% | −14% |
| expressions/answer/next3 | 1824 | −1% | +11% | −19% |
| expressions/load/model | 5676 | +1% | +3% | −22% |
| large/load/design | 774 | 0% | +3% | 🟢 **−46%** |
| large/load/model | 720 | +1% | −12% | 🟢 **−28%** |
| large/output/data ᶜ | 0.07 | 0% | −7% | −12% |
| large/output/dispose | 50.7 | −1% | −1% | +1% |
| large/output/toJSON | 98 | −1% | −9% | 🟢 **−43%** |
| manyPages/load/model | 860 | 0% | −8% | −12% |
| manyPages/pages/last ᶜ | 10.5 | −5% | +24% | −22% |
| manyPages/pages/locale | 26.4 | −2% | 0% | −16% |
| manyPages/pages/next10 | 52.8 | 0% | +1% | −17% |
| manyPages/pages/prev | 39.8 | 0% | 0% | −15% |
| manyPages/pages/preview | 1174 | −1% | +5% | −20% |
| manyPages/pages/validate | 68.6 | −1% | +11% | −6% |
| records-10k/load/data | 1246 | +1% | 🟢 **−39%** | −1% |
| records-10k/load/model | 59.3 | +3% | 🟢 **−34%** | −4% |
| records-10k/output/data ᶜ | 0.06 | 0% | +8% | −14% |
| records-10k/output/dispose ᶜ | 9.36 | +7% | +1% | −2% |
| records-10k/output/toJSON | 26.7 | −2% | −2% | 🟢 **−40%** |
| records-10k/records/add-row@orders | 477 | +1% | −1% | 🔴 **+73%** |
| records-10k/records/edit-cell@orders | 603 | 0% | +2% | 🔴 **+50%** |
| records-10k/records/filter-change@orders | 392 | +2% | −1% | +2% |
| records-10k/records/filter-clear@orders | 401 | +1% | −1% | +10% |
| records-10k/records/filter-set@orders | 389 | 0% | −2% | 0% |
| records-10k/records/first-visit@orders | 401 | −1% | −3% | +6% |
| records-10k/records/last@orders | 171 | +1% | −1% | 🟢 **−51%** |
| records-10k/records/next@orders | 194 | 0% | +1% | 🟢 **−53%** |
| records-10k/records/prev@orders | 171 | −2% | +1% | 🟢 **−53%** |
| records-10k/records/remove-row@orders | 605 | 0% | 🟢 **−47%** | 🟢 **−34%** |
| records-10k/records/sort-1@orders | 182 | +1% | +1% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 366 | −1% | 0% | 🟢 **−38%** |
| records-10k/records/sort-reverse@orders | 335 | +2% | +2% | 🟢 **−39%** |
| records-1k/load/data | 192 | 0% | −8% | +15% |
| records-1k/load/model | 63.5 | 0% | 🟢 **−34%** | 0% |
| records-1k/records/filter-set@orders | 252 | +2% | −5% | 🟢 **−31%** |
| records-1k/records/next@orders | 128 | −1% | +1% | 🟢 **−79%** |
| records-1k/records/next@ordersPanel | 22.9 | −2% | +1% | 🟢 **−77%** |
| records-1k/records/sort-1@orders | 75.6 | −2% | 0% | 🟢 **−82%** |
| records-1k/records/sort-1@ordersPanel | 35.4 | −1% | 0% | 🟢 **−73%** |
| records-plain/records/next@panelsPaged | 19.2 | −5% | +4% | 🟢 **−68%** |
| records-plain/records/sort-1@orders30 | 37.3 | −2% | −1% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 39.4 | −1% | −1% | 🟢 **−78%** |
| records-plain/records/sort-1@panels30 | 41.4 | −2% | 0% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 27.1 | −1% | −4% | 🟢 **−50%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/data | −39% | −38% | −39% | −38% | −39% | −39% | 🟢 |
| records-10k/load/model | −34% | −37% | −36% | −32% | −33% | −32% | 🟢 |
| records-10k/records/remove-row@orders | −47% | −47% | −47% | −47% | −46% | −47% | 🟢 |
| records-1k/load/model | −34% | −35% | −34% | −34% | −36% | −33% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −31% | −29% | −31% | −32% | −31% | −29% | 🟢 |
| calculations/answer/next3 | −35% | −36% | −35% | −34% | −34% | −39% | 🟢 |
| calculations/load/model | −30% | −29% | −30% | −30% | −31% | −32% | 🟢 |
| complexLogic/answer/next3 | −44% | −44% | −41% | −45% | −45% | −43% | 🟢 |
| complexLogic/load/model | −28% | −29% | −28% | −28% | −29% | −28% | 🟢 |
| large/load/design | −46% | −45% | −47% | −46% | −46% | −45% | 🟢 |
| large/load/model | −28% | −27% | −28% | −26% | −28% | −27% | 🟢 |
| large/output/toJSON | −43% | −41% | −44% | −40% | −44% | −45% | 🟢 |
| records-10k/output/toJSON | −40% | −41% | −37% | −40% | −43% | −37% | 🟢 |
| records-10k/records/add-row@orders | +73% | +72% | +72% | +77% | +73% | +76% | 🟢 |
| records-10k/records/edit-cell@orders | +50% | +51% | +50% | +53% | +49% | +50% | 🟢 |
| records-10k/records/last@orders | −51% | −52% | −51% | −52% | −51% | −51% | 🟢 |
| records-10k/records/next@orders | −53% | −53% | −53% | −54% | −53% | −54% | 🟢 |
| records-10k/records/prev@orders | −53% | −53% | −52% | −52% | −54% | −53% | 🟢 |
| records-10k/records/remove-row@orders | −34% | −33% | −34% | −34% | −33% | −35% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −51% | −51% | −50% | −50% | −48% | 🟢 |
| records-10k/records/sort-3@orders | −38% | −36% | −38% | −40% | −39% | −38% | 🟢 |
| records-10k/records/sort-reverse@orders | −39% | −39% | −39% | −39% | −38% | −40% | 🟢 |
| records-1k/records/filter-set@orders | −31% | −31% | −32% | −31% | −32% | −30% | 🟢 |
| records-1k/records/next@orders | −79% | −79% | −79% | −79% | −80% | −79% | 🟢 |
| records-1k/records/next@ordersPanel | −77% | −77% | −78% | −78% | −77% | −76% | 🟢 |
| records-1k/records/sort-1@orders | −82% | −82% | −82% | −82% | −82% | −82% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −73% | −72% | −72% | −74% | −73% | −73% | 🟢 |
| records-plain/records/next@panelsPaged | −68% | −68% | −68% | −66% | −67% | −69% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −89% | −88% | −89% | −86% | −87% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −78% | −78% | −78% | −78% | −78% | −78% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −70% | −69% | −70% | −71% | −71% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −50% | −50% | −50% | −50% | −51% | −50% | 🟢 |

## Counters (information)
- calculations/load/model (30D): expressionRuns 4472 → 2401 (work)
- records-10k/load/data (30D): conditionRuns 40085 → 40040 (work), expressionRuns 290 → 60770 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/filter-change@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/filter-clear@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/first-visit@orders (30D): expressionRuns 80 → 20050 (work)
- records-10k/records/last@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/next@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/prev@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/remove-row@orders (30D): expressionRuns 280 → 40616 (work)
- records-10k/records/sort-1@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/sort-3@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-10k/records/sort-reverse@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 20010 (work), rowsCreated 20 → 0 (work)
- records-1k/load/data (30D): conditionRuns 4085 → 4040 (work), expressionRuns 290 → 6770 (work)
- records-1k/records/filter-set@orders (30D): expressionRuns 80 → 2050 (work)
- records-1k/records/next@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 2010 (work), rowsCreated 20 → 0 (work)
- records-1k/records/next@ordersPanel (30D): conditionRuns 20 → 10 (work), expressionRuns 40 → 20 (work), panelsCreated 10 → 0 (work)
- records-1k/records/sort-1@orders (30D): conditionRuns 40 → 20 (work), expressionRuns 80 → 2010 (work), rowsCreated 20 → 0 (work)
- records-1k/records/sort-1@ordersPanel (30D): conditionRuns 20 → 10 (work), expressionRuns 40 → 20 (work), panelsCreated 10 → 0 (work)
- records-plain/records/next@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work)
- records-plain/records/sort-1@orders30 (30D): expressionRuns 60 → 30 (work), rowsCreated 30 → 0 (work)
- records-plain/records/sort-1@ordersPaged (30D): expressionRuns 20 → 1000 (work), rowsCreated 10 → 0 (work)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work)

Δ = today / build − 1.
