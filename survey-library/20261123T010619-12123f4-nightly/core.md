# survey-library · core · 23.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45092599916

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 49.6 | = today | −14% | 🟢 **−29%** |
| calculations/answer/next3 | 144 | = today | −14% | −22% |
| calculations/load/model | 553 | = today | +3% | −25% |
| complexLogic/answer/first | 295 | = today | +4% | −11% |
| complexLogic/answer/next3 | 596 | = today | +4% | −9% |
| complexLogic/load/design | 1892 | = today | +1% | n/a¹ |
| complexLogic/load/model | 2169 | = today | +2% | −24% |
| complexLogic/output/data ᶜ | 0.52 | = today | 0% | −7% |
| complexLogic/output/dispose | 53.7 | = today | +5% | −7% |
| complexLogic/output/toJSON | 75.8 | = today | −1% | −13% |
| expressions/answer/first | 1266 | = today | +12% | −6% |
| expressions/answer/next3 | 1751 | = today | +10% | −4% |
| expressions/load/model | 8015 | = today | +2% | −20% |
| large/load/design | 794 | = today | +3% | 🟢 **−45%** |
| large/load/model | 1262 | = today | −11% | −25% |
| large/output/data ᶜ | 0.07 | = today | 0% | 0% |
| large/output/dispose | 46.3 | = today | −2% | −6% |
| large/output/toJSON | 141 | = today | −10% | −23% |
| manyPages/load/model | 737 | = today | −7% | −11% |
| manyPages/pages/last ᶜ | 9.56 | = today | +1% | −9% |
| manyPages/pages/locale | 23.9 | = today | −7% | −14% |
| manyPages/pages/next10 | 80.9 | = today | +1% | −20% |
| manyPages/pages/prev | 21.3 | = today | −1% | −15% |
| manyPages/pages/preview | 1187 | = today | +4% | −18% |
| manyPages/pages/validate | 104 | = today | −1% | −9% |
| records-10k/load/data | 684 | = today | 🟢 **−45%** | −16% |
| records-10k/load/model | 79 | = today | 🟢 **−35%** | 🟢 **−45%** |
| records-10k/output/data ᶜ | 0.09 | = today | +7% | 0% |
| records-10k/output/dispose ᶜ | 9.78 | = today | −2% | +9% |
| records-10k/output/toJSON | 20.7 | = today | −4% | −16% |
| records-10k/records/add-row@orders | 493 | = today | +1% | 🔴 **+73%** |
| records-10k/records/edit-cell@orders | 586 | = today | 0% | 🔴 **+51%** |
| records-10k/records/filter-change@orders | 387 | = today | −1% | +4% |
| records-10k/records/filter-clear@orders | 486 | = today | −1% | +13% |
| records-10k/records/filter-set@orders | 395 | = today | −1% | +3% |
| records-10k/records/first-visit@orders | 673 | = today | −2% | +18% |
| records-10k/records/last@orders | 189 | = today | +2% | 🟢 **−42%** |
| records-10k/records/next@orders | 228 | = today | +1% | 🟢 **−48%** |
| records-10k/records/prev@orders | 175 | = today | +2% | 🟢 **−52%** |
| records-10k/records/remove-row@orders | 581 | = today | 🟢 **−46%** | 🟢 **−34%** |
| records-10k/records/sort-1@orders | 181 | = today | 0% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 213 | = today | +1% | 🟢 **−46%** |
| records-10k/records/sort-reverse@orders | 176 | = today | −1% | 🟢 **−50%** |
| records-1k/load/data | 192 | = today | −7% | +19% |
| records-1k/load/model | 59.8 | = today | 🟢 **−35%** | 🟢 **−45%** |
| records-1k/records/filter-set@orders | 221 | = today | −9% | 🟢 **−33%** |
| records-1k/records/next@orders | 133 | = today | +2% | 🟢 **−79%** |
| records-1k/records/next@ordersPanel | 23.8 | = today | +8% | 🟢 **−76%** |
| records-1k/records/sort-1@orders | 80.8 | = today | +1% | 🟢 **−82%** |
| records-1k/records/sort-1@ordersPanel | 40.4 | = today | +4% | 🟢 **−74%** |
| records-plain/records/next@panelsPaged | 31.1 | = today | −2% | 🟢 **−63%** |
| records-plain/records/sort-1@orders30 | 35.4 | = today | −1% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 21.6 | = today | −2% | 🟢 **−81%** |
| records-plain/records/sort-1@panels30 | 34.1 | = today | 0% | 🟢 **−71%** |
| records-plain/records/sort-1@panelsPaged | 21.1 | = today | −3% | 🟢 **−53%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/data | −45% | −42% | −46% | −46% | −46% | −45% | 🟢 |
| records-10k/load/model | −35% | −35% | −37% | −34% | −34% | −36% | 🟢 |
| records-10k/records/remove-row@orders | −46% | −46% | −46% | −46% | −47% | −46% | 🟢 |
| records-1k/load/model | −35% | −33% | −36% | −33% | −33% | −36% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −29% | −26% | −27% | −30% | −32% | −29% | 🟢 |
| large/load/design | −45% | −46% | −44% | −44% | −45% | −46% | 🟢 |
| large/load/model | −25% | −27% | −25% | −25% | −26% | −24% | 🔴 |
| records-10k/load/model | −45% | −44% | −45% | −43% | −44% | −46% | 🟢 |
| records-10k/records/add-row@orders | +73% | +77% | +73% | +70% | +72% | +69% | 🟢 |
| records-10k/records/edit-cell@orders | +51% | +52% | +48% | +51% | +53% | +52% | 🟢 |
| records-10k/records/last@orders | −42% | −41% | −41% | −43% | −39% | −43% | 🟢 |
| records-10k/records/next@orders | −48% | −46% | −46% | −51% | −47% | −46% | 🟢 |
| records-10k/records/prev@orders | −52% | −52% | −51% | −52% | −52% | −52% | 🟢 |
| records-10k/records/remove-row@orders | −34% | −34% | −33% | −33% | −33% | −33% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −51% | −49% | −50% | −50% | −52% | 🟢 |
| records-10k/records/sort-3@orders | −46% | −45% | −46% | −46% | −46% | −46% | 🟢 |
| records-10k/records/sort-reverse@orders | −50% | −50% | −49% | −51% | −50% | −49% | 🟢 |
| records-1k/load/model | −45% | −45% | −41% | −46% | −45% | −45% | 🟢 |
| records-1k/records/filter-set@orders | −33% | −33% | −33% | −29% | −32% | −33% | 🟢 |
| records-1k/records/next@orders | −79% | −79% | −79% | −79% | −79% | −79% | 🟢 |
| records-1k/records/next@ordersPanel | −76% | −76% | −77% | −75% | −75% | −76% | 🟢 |
| records-1k/records/sort-1@orders | −82% | −81% | −82% | −82% | −82% | −82% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −74% | −71% | −75% | −76% | −73% | −73% | 🟢 |
| records-plain/records/next@panelsPaged | −63% | −62% | −60% | −64% | −63% | −63% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −89% | −88% | −88% | −89% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −81% | −81% | −81% | −81% | −81% | −80% | 🟢 |
| records-plain/records/sort-1@panels30 | −71% | −71% | −72% | −70% | −71% | −72% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −53% | −57% | −51% | −54% | −56% | −50% | 🟢 |

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
