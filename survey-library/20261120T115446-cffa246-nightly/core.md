# survey-library · core · 20.11.2026 11:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44731394759

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 51.7 | −15% | −11% | 🟢 **−29%** |
| calculations/answer/next3 | 137 | −18% | −21% | 🟢 **−34%** |
| calculations/load/model | 275 | +1% | +2% | 🟢 **−64%** |
| complexLogic/answer/first | 294 | +2% | +4% | 🟢 **−55%** |
| complexLogic/answer/next3 | 503 | +2% | +4% | 🟢 **−70%** |
| complexLogic/load/design | 2085 | 0% | −1% | n/a¹ |
| complexLogic/load/model | 2012 | +1% | 0% | 🟢 **−58%** |
| complexLogic/output/data ᶜ | 0.56 | +5% | +4% | −12% |
| complexLogic/output/dispose | 54.6 | +2% | +4% | 0% |
| complexLogic/output/toJSON | 113 | +2% | 0% | −17% |
| expressions/answer/first | 990 | +7% | +13% | 🟢 **−51%** |
| expressions/answer/next3 | 1925 | 0% | +6% | 🟢 **−51%** |
| expressions/load/model | 5551 | +2% | +2% | −21% |
| large/load/design | 554 | +2% | +3% | 🟢 **−45%** |
| large/load/model | 694 | +2% | −11% | −25% |
| large/output/data ᶜ | 0.06 | 0% | 0% | +25% |
| large/output/dispose | 43.7 | +3% | −1% | −1% |
| large/output/toJSON | 101 | +1% | −11% | 🟢 **−42%** |
| manyPages/load/model | 1180 | +1% | −8% | −8% |
| manyPages/pages/last ᶜ | 12.2 | −6% | −1% | −10% |
| manyPages/pages/locale | 22 | +4% | +1% | −16% |
| manyPages/pages/next10 | 52.7 | +1% | +2% | −16% |
| manyPages/pages/prev | 39.7 | +1% | 0% | −17% |
| manyPages/pages/preview | 1179 | +4% | +2% | −16% |
| manyPages/pages/validate | 57.4 | −3% | −2% | −13% |
| records-10k/load/data | 676 | +2% | 🟢 **−46%** | −16% |
| records-10k/load/model | 62.8 | +8% | 🟢 **−35%** | +2% |
| records-10k/output/data ᶜ | 0.09 | +13% | 0% | 0% |
| records-10k/output/dispose ᶜ | 12.6 | +2% | 0% | +2% |
| records-10k/output/toJSON | 32.7 | +6% | −3% | 🟢 **−38%** |
| records-10k/records/add-row@orders | 489 | +3% | +1% | 🔴 **+70%** |
| records-10k/records/edit-cell@orders | 337 | 0% | 0% | 🔴 **+45%** |
| records-10k/records/filter-change@orders | 385 | 0% | −1% | +4% |
| records-10k/records/filter-clear@orders | 385 | 0% | −1% | +5% |
| records-10k/records/filter-set@orders | 389 | +1% | −2% | +3% |
| records-10k/records/first-visit@orders | 510 | 0% | −2% | +19% |
| records-10k/records/last@orders | 172 | −1% | +1% | 🟢 **−51%** |
| records-10k/records/next@orders | 194 | 0% | 0% | 🟢 **−52%** |
| records-10k/records/prev@orders | 321 | 0% | +1% | 🟢 **−41%** |
| records-10k/records/remove-row@orders | 780 | 0% | 🟢 **−46%** | 🟢 **−28%** |
| records-10k/records/sort-1@orders | 249 | −1% | −1% | 🟢 **−40%** |
| records-10k/records/sort-3@orders | 393 | 0% | +1% | 🟢 **−37%** |
| records-10k/records/sort-reverse@orders | 184 | +1% | 0% | 🟢 **−49%** |
| records-1k/load/data | 189 | 0% | −8% | +19% |
| records-1k/load/model | 104 | +3% | 🟢 **−33%** | −2% |
| records-1k/records/filter-set@orders | 386 | +1% | −5% | 🟢 **−31%** |
| records-1k/records/next@orders | 72.8 | +3% | 0% | 🟢 **−82%** |
| records-1k/records/next@ordersPanel | 29.3 | +2% | +2% | 🟢 **−78%** |
| records-1k/records/sort-1@orders | 78 | 0% | +2% | 🟢 **−82%** |
| records-1k/records/sort-1@ordersPanel | 23.2 | 0% | 0% | 🟢 **−71%** |
| records-plain/records/next@panelsPaged | 20.6 | −1% | +3% | 🟢 **−68%** |
| records-plain/records/sort-1@orders30 | 58.3 | 0% | −2% | 🟢 **−87%** |
| records-plain/records/sort-1@ordersPaged | 40 | 0% | 0% | 🟢 **−77%** |
| records-plain/records/sort-1@panels30 | 34.3 | +2% | +2% | 🟢 **−71%** |
| records-plain/records/sort-1@panelsPaged | 26.6 | +1% | −2% | 🟢 **−49%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/data | −46% | −46% | −45% | −46% | −45% | −46% | 🟢 |
| records-10k/load/model | −35% | −34% | −35% | −36% | −35% | −34% | 🟢 |
| records-10k/records/remove-row@orders | −46% | −46% | −46% | −46% | −46% | −46% | 🟢 |
| records-1k/load/model | −33% | −33% | −33% | −33% | −33% | −34% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −29% | −28% | −30% | −28% | −27% | −32% | 🟢 |
| calculations/answer/next3 | −34% | −36% | −35% | −32% | −34% | −33% | 🟢 |
| calculations/load/model | −64% | −64% | −65% | −65% | −64% | −65% | 🟢 |
| complexLogic/answer/first | −55% | −54% | −55% | −55% | −54% | −56% | 🟢 |
| complexLogic/answer/next3 | −70% | −70% | −70% | −70% | −70% | −71% | 🟢 |
| complexLogic/load/model | −58% | −58% | −57% | −58% | −57% | −58% | 🟢 |
| expressions/answer/first | −51% | −51% | −52% | −52% | −52% | −51% | 🟢 |
| expressions/answer/next3 | −51% | −51% | −54% | −54% | −50% | −52% | 🟢 |
| large/load/design | −45% | −46% | −45% | −45% | −46% | −46% | 🟢 |
| large/output/toJSON | −42% | −43% | −41% | −41% | −38% | −43% | 🟢 |
| records-10k/output/toJSON | −38% | −40% | −38% | −36% | −36% | −41% | 🟢 |
| records-10k/records/add-row@orders | +70% | +71% | +74% | +71% | +69% | +69% | 🟢 |
| records-10k/records/edit-cell@orders | +45% | +46% | +47% | +42% | +41% | +43% | 🟢 |
| records-10k/records/last@orders | −51% | −51% | −51% | −51% | −52% | −51% | 🟢 |
| records-10k/records/next@orders | −52% | −52% | −53% | −53% | −52% | −52% | 🟢 |
| records-10k/records/prev@orders | −41% | −43% | −43% | −42% | −41% | −42% | 🟢 |
| records-10k/records/remove-row@orders | −28% | −29% | −29% | −28% | −28% | −28% | 🟢 |
| records-10k/records/sort-1@orders | −40% | −40% | −40% | −41% | −41% | −40% | 🟢 |
| records-10k/records/sort-3@orders | −37% | −36% | −38% | −37% | −37% | −39% | 🟢 |
| records-10k/records/sort-reverse@orders | −49% | −49% | −48% | −48% | −49% | −48% | 🟢 |
| records-1k/records/filter-set@orders | −31% | −30% | −30% | −30% | −32% | −30% | 🟢 |
| records-1k/records/next@orders | −82% | −82% | −82% | −81% | −82% | −82% | 🟢 |
| records-1k/records/next@ordersPanel | −78% | −78% | −78% | −78% | −78% | −79% | 🟢 |
| records-1k/records/sort-1@orders | −82% | −82% | −82% | −82% | −81% | −81% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −71% | −71% | −69% | −71% | −70% | −71% | 🟢 |
| records-plain/records/next@panelsPaged | −68% | −68% | −67% | −68% | −67% | −68% | 🟢 |
| records-plain/records/sort-1@orders30 | −87% | −87% | −87% | −87% | −87% | −87% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −77% | −77% | −77% | −78% | −78% | −77% | 🟢 |
| records-plain/records/sort-1@panels30 | −71% | −72% | −72% | −71% | −70% | −72% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −49% | −51% | −51% | −47% | −50% | −49% | 🟢 |

## Counters (information)
- calculations/answer/first (30D): expressionRuns 716 → 184 (work)
- calculations/answer/next3 (30D): expressionRuns 2140 → 526 (work)
- calculations/load/model (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2034 → 251 (work)
- complexLogic/answer/next3 (30D): conditionRuns 14688 → 546 (work), expressionRuns 5884 → 487 (work)
- expressions/answer/first (30D): conditionRuns 7782 → 186 (work)
- expressions/answer/next3 (30D): conditionRuns 15564 → 525 (work)
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
