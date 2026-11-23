# survey-library · core · 23.11.2026 13:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45179909558

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 48.9 | = today | −14% | 🟢 **−27%** |
| calculations/answer/next3 | 138 | = today | −20% | 🟢 **−34%** |
| calculations/load/model | 563 | = today | +2% | 🟢 **−25%** |
| complexLogic/answer/first | 411 | = today | +3% | 🟢 **−18%** |
| complexLogic/answer/next3 | 546 | = today | +1% | 🟢 **−10%** |
| complexLogic/load/design | 1233 | = today | +1% | n/a¹ |
| complexLogic/load/model | 2241 | = today | +2% | 🟢 **−23%** |
| complexLogic/output/data ᶜ | 0.33 | = today | +3% | 0% |
| complexLogic/output/dispose | 49.6 | = today | +7% | −6% |
| complexLogic/output/toJSON | 68.9 | = today | −4% | 🟢 **−17%** |
| expressions/answer/first | 1319 | = today | 🔴 **+10%** | −6% |
| expressions/answer/next3 | 2602 | = today | +9% | −2% |
| expressions/load/model | 7987 | = today | +2% | 🟢 **−21%** |
| large/load/design | 451 | = today | +5% | 🟢 **−45%** |
| large/load/model | 710 | = today | 🟢 **−11%** | 🟢 **−26%** |
| large/output/data ᶜ | 0.08 | = today | 0% | −11% |
| large/output/dispose | 46.5 | = today | −2% | −2% |
| large/output/toJSON | 91.4 | = today | −8% | 🟢 **−27%** |
| manyPages/load/model | 731 | = today | −7% | 🟢 **−11%** |
| manyPages/pages/last ᶜ | 8.23 | = today | +3% | −34% |
| manyPages/pages/locale | 24.2 | = today | +4% | −13% |
| manyPages/pages/next10 | 54.9 | = today | +2% | 🟢 **−16%** |
| manyPages/pages/prev | 26.3 | = today | 0% | 🟢 **−16%** |
| manyPages/pages/preview | 1591 | = today | +2% | 🟢 **−20%** |
| manyPages/pages/validate | 60 | = today | +3% | −8% |
| records-10k/load/data | 682 | = today | 🟢 **−45%** | 🟢 **−16%** |
| records-10k/load/model | 64.8 | = today | 🟢 **−31%** | 🟢 **−42%** |
| records-10k/output/data ᶜ | 0.11 | = today | +5% | −15% |
| records-10k/output/dispose ᶜ | 11.9 | = today | 0% | +2% |
| records-10k/output/toJSON | 24.6 | = today | −1% | −8% |
| records-10k/records/add-row@orders | 494 | = today | −1% | 🔴 **+69%** |
| records-10k/records/edit-cell@orders | 456 | = today | −1% | 🔴 **+48%** |
| records-10k/records/filter-change@orders | 635 | = today | −1% | 🔴 **+11%** |
| records-10k/records/filter-clear@orders | 435 | = today | −4% | 🔴 **+12%** |
| records-10k/records/filter-set@orders | 390 | = today | −2% | +3% |
| records-10k/records/first-visit@orders | 416 | = today | −2% | 🔴 **+17%** |
| records-10k/records/last@orders | 171 | = today | −2% | 🟢 **−51%** |
| records-10k/records/next@orders | 361 | = today | +2% | 🟢 **−42%** |
| records-10k/records/prev@orders | 249 | = today | +2% | 🟢 **−42%** |
| records-10k/records/remove-row@orders | 598 | = today | 🟢 **−47%** | 🟢 **−35%** |
| records-10k/records/sort-1@orders | 175 | = today | +1% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 216 | = today | +2% | 🟢 **−39%** |
| records-10k/records/sort-reverse@orders | 253 | = today | +2% | 🟢 **−41%** |
| records-1k/load/data | 191 | = today | −7% | 🔴 **+19%** |
| records-1k/load/model | 61.2 | = today | 🟢 **−33%** | 🟢 **−43%** |
| records-1k/records/filter-set@orders | 255 | = today | −6% | 🟢 **−29%** |
| records-1k/records/next@orders | 73.4 | = today | +4% | 🟢 **−82%** |
| records-1k/records/next@ordersPanel | 35.9 | = today | +1% | 🟢 **−79%** |
| records-1k/records/sort-1@orders | 62.1 | = today | +1% | 🟢 **−83%** |
| records-1k/records/sort-1@ordersPanel | 23.4 | = today | +1% | 🟢 **−71%** |
| records-plain/records/next@panelsPaged | 33.1 | = today | +1% | 🟢 **−63%** |
| records-plain/records/sort-1@orders30 | 36.8 | = today | 0% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 39 | = today | −2% | 🟢 **−78%** |
| records-plain/records/sort-1@panels30 | 33.8 | = today | −5% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 20.6 | = today | −2% | 🟢 **−54%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −14% | −24%..+2% | 0% | −15% | −16% | −14% | −15% | 🔴 |
| calculations/answer/next3 | −20% | −32%..0% | −3% | −20% | −21% | −22% | −21% | 🔴 |
| expressions/answer/first | +10% | +5%..+18% | +10% | +12% | +9% | +9% | +17% | 🟢 |
| large/load/model | −11% | −14%..−9% | −11% | −10% | −10% | −13% | −13% | 🟢 |
| records-10k/load/data | −45% | −48%..−41% | −42% | −44% | −45% | −44% | −46% | 🟢 |
| records-10k/load/model | −31% | −39%..−20% | −36% | −32% | −32% | −26% | −25% | 🟢 |
| records-10k/records/remove-row@orders | −47% | −49%..−45% | −45% | −46% | −47% | −47% | −48% | 🟢 |
| records-1k/load/model | −33% | −39%..−23% | −34% | −33% | −32% | −33% | −24% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −27% | −30%..−24% | −29% | −25% | −28% | −26% | −27% | 🟢 |
| calculations/answer/next3 | −34% | −38%..−29% | −33% | −37% | −33% | −32% | −34% | 🟢 |
| calculations/load/model | −25% | −26%..−23% | −25% | −23% | −25% | −25% | −25% | 🟢 |
| complexLogic/answer/first | −18% | −19%..−15% | −16% | −17% | −18% | −16% | −17% | 🟢 |
| complexLogic/answer/next3 | −10% | −17%..−3% | −11% | −15% | −12% | −9% | −6% | 🟢 |
| complexLogic/load/model | −23% | −25%..−22% | −23% | −24% | −23% | −23% | −24% | 🟢 |
| complexLogic/output/toJSON | −17% | −24%..−10% | −12% | −19% | −16% | −20% | −19% | 🟢 |
| expressions/load/model | −21% | −22%..−20% | −22% | −21% | −21% | −20% | −21% | 🟢 |
| large/load/design | −45% | −47%..−43% | −44% | −45% | −46% | −45% | −46% | 🟢 |
| large/load/model | −26% | −26%..−25% | −25% | −25% | −26% | −26% | −26% | 🟢 |
| large/output/toJSON | −27% | −30%..−24% | −28% | −28% | −27% | −25% | −26% | 🟢 |
| manyPages/load/model | −11% | −12%..−10% | −11% | −11% | −11% | −10% | −10% | 🟢 |
| manyPages/pages/locale | −13% | −25%..−2% | −17% | −13% | −19% | −17% | −5% | 🔴 |
| manyPages/pages/next10 | −16% | −20%..−11% | −13% | −15% | −18% | −15% | −19% | 🟢 |
| manyPages/pages/prev | −16% | −22%..−9% | −16% | −20% | −17% | −16% | −11% | 🟢 |
| manyPages/pages/preview | −20% | −23%..−16% | −18% | −21% | −22% | −19% | −19% | 🟢 |
| records-10k/load/data | −16% | −18%..−15% | −17% | −17% | −16% | −15% | −16% | 🟢 |
| records-10k/load/model | −42% | −46%..−38% | −42% | −40% | −45% | −43% | −42% | 🟢 |
| records-10k/output/toJSON | −8% | −16%..−3% | −5% | −8% | −12% | −11% | −11% | 🔴 |
| records-10k/records/add-row@orders | +69% | +65%..+76% | +73% | +67% | +70% | +68% | +73% | 🟢 |
| records-10k/records/edit-cell@orders | +48% | +44%..+53% | +49% | +48% | +50% | +45% | +49% | 🟢 |
| records-10k/records/filter-change@orders | +11% | +9%..+13% | +10% | +13% | +10% | +12% | +11% | 🟢 |
| records-10k/records/filter-clear@orders | +12% | +9%..+17% | +12% | +11% | +16% | +15% | +12% | 🟢 |
| records-10k/records/first-visit@orders | +17% | +10%..+21% | +13% | +15% | +14% | +20% | +14% | 🟢 |
| records-10k/records/last@orders | −51% | −53%..−48% | −52% | −50% | −51% | −50% | −49% | 🟢 |
| records-10k/records/next@orders | −42% | −44%..−40% | −41% | −42% | −43% | −41% | −42% | 🟢 |
| records-10k/records/prev@orders | −42% | −46%..−38% | −42% | −45% | −39% | −42% | −43% | 🟢 |
| records-10k/records/remove-row@orders | −35% | −36%..−33% | −35% | −34% | −34% | −34% | −35% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −52%..−50% | −52% | −51% | −52% | −52% | −51% | 🟢 |
| records-10k/records/sort-3@orders | −39% | −43%..−35% | −41% | −40% | −39% | −41% | −37% | 🟢 |
| records-10k/records/sort-reverse@orders | −41% | −44%..−37% | −43% | −40% | −41% | −39% | −39% | 🟢 |
| records-1k/load/data | +19% | +16%..+20% | +16% | +17% | +19% | +18% | +19% | 🟢 |
| records-1k/load/model | −43% | −47%..−39% | −41% | −46% | −43% | −42% | −42% | 🟢 |
| records-1k/records/filter-set@orders | −29% | −31%..−29% | −30% | −30% | −29% | −30% | −30% | 🟢 |
| records-1k/records/next@orders | −82% | −83%..−81% | −81% | −82% | −81% | −82% | −82% | 🟢 |
| records-1k/records/next@ordersPanel | −79% | −80%..−78% | −79% | −79% | −79% | −79% | −79% | 🟢 |
| records-1k/records/sort-1@orders | −83% | −84%..−82% | −83% | −83% | −83% | −82% | −84% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −71% | −73%..−68% | −69% | −72% | −70% | −72% | −70% | 🟢 |
| records-plain/records/next@panelsPaged | −63% | −63%..−62% | −63% | −63% | −63% | −62% | −63% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −89%..−87% | −88% | −88% | −88% | −88% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −78% | −79%..−77% | −78% | −78% | −78% | −78% | −77% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −71%..−68% | −70% | −69% | −71% | −70% | −70% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −54% | −57%..−50% | −53% | −51% | −55% | −54% | −55% | 🟢 |

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
