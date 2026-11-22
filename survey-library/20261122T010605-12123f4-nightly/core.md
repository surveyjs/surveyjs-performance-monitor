# survey-library · core · 22.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44969814335

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 50.5 | = today | −15% | −27% |
| calculations/answer/next3 | 136 | = today | −19% | 🟢 **−33%** |
| calculations/load/model | 287 | = today | +3% | 🟢 **−27%** |
| complexLogic/answer/first | 287 | = today | +5% | −11% |
| complexLogic/answer/next3 | 578 | = today | +6% | −9% |
| complexLogic/load/design | 1266 | = today | +1% | n/a¹ |
| complexLogic/load/model | 1955 | = today | +1% | −24% |
| complexLogic/output/data ᶜ | 0.32 | = today | −3% | −6% |
| complexLogic/output/dispose | 52.5 | = today | +7% | −6% |
| complexLogic/output/toJSON | 72.4 | = today | −1% | −25% |
| expressions/answer/first | 967 | = today | +11% | −1% |
| expressions/answer/next3 | 1965 | = today | +10% | −5% |
| expressions/load/model | 6391 | = today | +4% | −23% |
| large/load/design | 781 | = today | +3% | 🟢 **−46%** |
| large/load/model | 712 | = today | −12% | −25% |
| large/output/data ᶜ | 0.07 | = today | 0% | 0% |
| large/output/dispose | 34.8 | = today | 0% | −8% |
| large/output/toJSON | 99.7 | = today | −8% | 🟢 **−43%** |
| manyPages/load/model | 1118 | = today | −8% | −12% |
| manyPages/pages/last ᶜ | 13.8 | = today | 0% | −20% |
| manyPages/pages/locale | 22.2 | = today | +1% | −16% |
| manyPages/pages/next10 | 58.7 | = today | +1% | −17% |
| manyPages/pages/prev | 28.7 | = today | +1% | −14% |
| manyPages/pages/preview | 1183 | = today | +5% | −21% |
| manyPages/pages/validate | 57.3 | = today | −1% | −21% |
| records-10k/load/data | 1198 | = today | 🟢 **−39%** | −3% |
| records-10k/load/model | 61.3 | = today | 🟢 **−35%** | 🟢 **−44%** |
| records-10k/output/data ᶜ | 0.1 | = today | 0% | −9% |
| records-10k/output/dispose ᶜ | 12 | = today | 0% | +1% |
| records-10k/output/toJSON | 21.4 | = today | −6% | 🟢 **−34%** |
| records-10k/records/add-row@orders | 371 | = today | 0% | 🔴 **+69%** |
| records-10k/records/edit-cell@orders | 452 | = today | 0% | 🔴 **+52%** |
| records-10k/records/filter-change@orders | 393 | = today | −3% | +2% |
| records-10k/records/filter-clear@orders | 389 | = today | −2% | +4% |
| records-10k/records/filter-set@orders | 662 | = today | −2% | +9% |
| records-10k/records/first-visit@orders | 674 | = today | −2% | +14% |
| records-10k/records/last@orders | 168 | = today | 0% | 🟢 **−52%** |
| records-10k/records/next@orders | 191 | = today | 0% | 🟢 **−53%** |
| records-10k/records/prev@orders | 166 | = today | +1% | 🟢 **−53%** |
| records-10k/records/remove-row@orders | 1004 | = today | 🟢 **−44%** | 🟢 **−29%** |
| records-10k/records/sort-1@orders | 178 | = today | +1% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 385 | = today | 0% | 🟢 **−37%** |
| records-10k/records/sort-reverse@orders | 177 | = today | −1% | 🟢 **−51%** |
| records-1k/load/data | 186 | = today | −9% | +17% |
| records-1k/load/model | 61.4 | = today | 🟢 **−32%** | 🟢 **−44%** |
| records-1k/records/filter-set@orders | 254 | = today | −5% | 🟢 **−31%** |
| records-1k/records/next@orders | 78.2 | = today | +1% | 🟢 **−81%** |
| records-1k/records/next@ordersPanel | 21.2 | = today | −2% | 🟢 **−80%** |
| records-1k/records/sort-1@orders | 59.5 | = today | +1% | 🟢 **−83%** |
| records-1k/records/sort-1@ordersPanel | 24.8 | = today | +5% | 🟢 **−71%** |
| records-plain/records/next@panelsPaged | 19.6 | = today | −1% | 🟢 **−68%** |
| records-plain/records/sort-1@orders30 | 37.2 | = today | −1% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 21.4 | = today | −5% | 🟢 **−81%** |
| records-plain/records/sort-1@panels30 | 52.6 | = today | −2% | 🟢 **−72%** |
| records-plain/records/sort-1@panelsPaged | 20.2 | = today | −1% | 🟢 **−57%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/data | −39% | −38% | −39% | −39% | −39% | −38% | 🟢 |
| records-10k/load/model | −35% | −34% | −38% | −37% | −38% | −32% | 🟢 |
| records-10k/records/remove-row@orders | −44% | −44% | −43% | −44% | −44% | −44% | 🟢 |
| records-1k/load/model | −32% | −32% | −32% | −33% | −30% | −31% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −27% | −29% | −29% | −27% | −28% | −24% | 🔴 |
| calculations/answer/next3 | −33% | −36% | −31% | −34% | −35% | −32% | 🟢 |
| calculations/load/model | −27% | −27% | −27% | −26% | −25% | −27% | 🟢 |
| complexLogic/output/toJSON | −25% | −26% | −26% | −21% | −20% | −22% | 🔴 |
| large/load/design | −46% | −47% | −46% | −45% | −46% | −47% | 🟢 |
| large/output/toJSON | −43% | −44% | −42% | −41% | −43% | −43% | 🟢 |
| records-10k/load/model | −44% | −45% | −44% | −42% | −44% | −43% | 🟢 |
| records-10k/output/toJSON | −34% | −32% | −33% | −37% | −27% | −41% | 🟢 |
| records-10k/records/add-row@orders | +69% | +63% | +71% | +75% | +74% | +76% | 🟢 |
| records-10k/records/edit-cell@orders | +52% | +46% | +54% | +55% | +56% | +51% | 🟢 |
| records-10k/records/last@orders | −52% | −52% | −52% | −53% | −51% | −53% | 🟢 |
| records-10k/records/next@orders | −53% | −53% | −53% | −52% | −53% | −53% | 🟢 |
| records-10k/records/prev@orders | −53% | −52% | −53% | −53% | −52% | −53% | 🟢 |
| records-10k/records/remove-row@orders | −29% | −29% | −29% | −30% | −29% | −29% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −52% | −51% | −50% | −51% | −52% | 🟢 |
| records-10k/records/sort-3@orders | −37% | −38% | −38% | −37% | −37% | −37% | 🟢 |
| records-10k/records/sort-reverse@orders | −51% | −52% | −49% | −50% | −50% | −51% | 🟢 |
| records-1k/load/model | −44% | −42% | −46% | −46% | −44% | −45% | 🟢 |
| records-1k/records/filter-set@orders | −31% | −33% | −30% | −31% | −31% | −31% | 🟢 |
| records-1k/records/next@orders | −81% | −81% | −81% | −82% | −81% | −81% | 🟢 |
| records-1k/records/next@ordersPanel | −80% | −78% | −79% | −80% | −81% | −80% | 🟢 |
| records-1k/records/sort-1@orders | −83% | −84% | −83% | −83% | −83% | −84% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −71% | −73% | −70% | −70% | −70% | −71% | 🟢 |
| records-plain/records/next@panelsPaged | −68% | −66% | −68% | −68% | −71% | −68% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −88% | −88% | −88% | −88% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −81% | −81% | −81% | −82% | −80% | −82% | 🟢 |
| records-plain/records/sort-1@panels30 | −72% | −71% | −71% | −71% | −73% | −71% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −57% | −58% | −57% | −54% | −56% | −57% | 🟢 |

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
