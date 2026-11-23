# survey-library · core · 23.11.2026 07:20 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45130286152

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 50 | = today | 🟢 **−14%** | 🟢 **−29%** |
| calculations/answer/next3 | 143 | = today | 🟢 **−18%** | 🟢 **−33%** |
| calculations/load/model | 273 | = today | +1% | 🟢 **−27%** |
| complexLogic/answer/first | 282 | = today | +3% | 🟢 **−9%** |
| complexLogic/answer/next3 | 789 | = today | +3% | 🟢 **−8%** |
| complexLogic/load/design | 1580 | = today | 0% | n/a¹ |
| complexLogic/load/model | 2239 | = today | +2% | 🟢 **−23%** |
| complexLogic/output/data ᶜ | 0.53 | = today | +2% | −4% |
| complexLogic/output/dispose | 56 | = today | +5% | −5% |
| complexLogic/output/toJSON | 110 | = today | −2% | 🟢 **−13%** |
| expressions/answer/first | 966 | = today | 🔴 **+15%** | −1% |
| expressions/answer/next3 | 1964 | = today | +10% | −3% |
| expressions/load/model | 5690 | = today | +2% | 🟢 **−19%** |
| large/load/design | 569 | = today | +3% | 🟢 **−45%** |
| large/load/model | 694 | = today | 🟢 **−12%** | 🟢 **−25%** |
| large/output/data ᶜ | 0.07 | = today | 0% | −6% |
| large/output/dispose | 59.8 | = today | −3% | +2% |
| large/output/toJSON | 98.6 | = today | −9% | 🟢 **−24%** |
| manyPages/load/model | 745 | = today | 🟢 **−7%** | 🟢 **−12%** |
| manyPages/pages/last ᶜ | 14.2 | = today | +1% | −18% |
| manyPages/pages/locale | 28.3 | = today | −3% | −15% |
| manyPages/pages/next10 | 82.3 | = today | +2% | 🟢 **−16%** |
| manyPages/pages/prev | 27 | = today | +2% | 🟢 **−15%** |
| manyPages/pages/preview | 1682 | = today | +3% | 🟢 **−22%** |
| manyPages/pages/validate | 56.4 | = today | +3% | −14% |
| records-10k/load/data | 688 | = today | 🟢 **−45%** | 🟢 **−17%** |
| records-10k/load/model | 62.1 | = today | 🟢 **−33%** | 🟢 **−44%** |
| records-10k/output/data ᶜ | 0.06 | = today | 0% | −14% |
| records-10k/output/dispose ᶜ | 7.28 | = today | +4% | +2% |
| records-10k/output/toJSON | 25.5 | = today | −2% | 🟢 **−14%** |
| records-10k/records/add-row@orders | 269 | = today | 0% | 🔴 **+61%** |
| records-10k/records/edit-cell@orders | 327 | = today | +1% | 🔴 **+45%** |
| records-10k/records/filter-change@orders | 662 | = today | −2% | 🔴 **+9%** |
| records-10k/records/filter-clear@orders | 385 | = today | −2% | 🔴 **+5%** |
| records-10k/records/filter-set@orders | 385 | = today | −1% | +3% |
| records-10k/records/first-visit@orders | 517 | = today | −1% | 🔴 **+17%** |
| records-10k/records/last@orders | 172 | = today | +3% | 🟢 **−41%** |
| records-10k/records/next@orders | 193 | = today | +2% | 🟢 **−53%** |
| records-10k/records/prev@orders | 185 | = today | +1% | 🟢 **−45%** |
| records-10k/records/remove-row@orders | 991 | = today | 🟢 **−46%** | 🟢 **−29%** |
| records-10k/records/sort-1@orders | 179 | = today | 0% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 292 | = today | 0% | 🟢 **−38%** |
| records-10k/records/sort-reverse@orders | 176 | = today | −1% | 🟢 **−50%** |
| records-1k/load/data | 189 | = today | −7% | 🔴 **+20%** |
| records-1k/load/model | 63.8 | = today | 🟢 **−35%** | 🟢 **−43%** |
| records-1k/records/filter-set@orders | 296 | = today | 🟢 **−6%** | 🟢 **−30%** |
| records-1k/records/next@orders | 132 | = today | +2% | 🟢 **−79%** |
| records-1k/records/next@ordersPanel | 28.8 | = today | +1% | 🟢 **−78%** |
| records-1k/records/sort-1@orders | 59.8 | = today | −1% | 🟢 **−82%** |
| records-1k/records/sort-1@ordersPanel | 23.4 | = today | +1% | 🟢 **−71%** |
| records-plain/records/next@panelsPaged | 33.8 | = today | 0% | 🟢 **−64%** |
| records-plain/records/sort-1@orders30 | 53.6 | = today | −2% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 37.8 | = today | 0% | 🟢 **−79%** |
| records-plain/records/sort-1@panels30 | 35.1 | = today | −2% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 37.2 | = today | 0% | 🟢 **−50%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster: a change of 5% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −14% | −17%..−8% | −14% | −10% | −12% | −15% | −10% | 🟢 |
| calculations/answer/next3 | −18% | −22%..−16% | −17% | −21% | −18% | −19% | −20% | 🟢 |
| expressions/answer/first | +15% | +9%..+21% | +18% | +15% | +17% | +13% | +12% | 🟢 |
| expressions/answer/next3 | +10% | 0%..+21% | +6% | +10% | +17% | +4% | +12% | 🔴 |
| large/load/model | −12% | −15%..−9% | −15% | −12% | −12% | −11% | −12% | 🟢 |
| large/output/toJSON | −9% | −18%..+4% | −4% | −3% | −15% | −11% | −4% | 🔴 |
| manyPages/load/model | −7% | −12%..−4% | −10% | −7% | −5% | −9% | −7% | 🟢 |
| records-10k/load/data | −45% | −47%..−43% | −46% | −43% | −45% | −45% | −45% | 🟢 |
| records-10k/load/model | −33% | −36%..−31% | −34% | −35% | −33% | −32% | −33% | 🟢 |
| records-10k/records/remove-row@orders | −46% | −47%..−44% | −46% | −46% | −45% | −44% | −46% | 🟢 |
| records-1k/load/data | −7% | −22%..+5% | −20% | −7% | −6% | −7% | −5% | 🔴 |
| records-1k/load/model | −35% | −36%..−33% | −34% | −34% | −34% | −34% | −36% | 🟢 |
| records-1k/records/filter-set@orders | −6% | −7%..−4% | −5% | −6% | −6% | −6% | −5% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −29% | −32%..−24% | −28% | −30% | −30% | −29% | −25% | 🟢 |
| calculations/answer/next3 | −33% | −37%..−29% | −32% | −35% | −31% | −32% | −36% | 🟢 |
| calculations/load/model | −27% | −28%..−25% | −25% | −26% | −28% | −27% | −26% | 🟢 |
| complexLogic/answer/first | −9% | −15%..−4% | −6% | −10% | −7% | −13% | −11% | 🟢 |
| complexLogic/answer/next3 | −8% | −10%..−5% | −6% | −10% | −8% | −7% | −7% | 🟢 |
| complexLogic/load/model | −23% | −24%..−23% | −24% | −23% | −23% | −24% | −24% | 🟢 |
| complexLogic/output/toJSON | −13% | −22%..−8% | −19% | −13% | −16% | −18% | −10% | 🟢 |
| expressions/load/model | −19% | −22%..−17% | −22% | −20% | −19% | −20% | −19% | 🟢 |
| large/load/design | −45% | −46%..−44% | −46% | −46% | −45% | −45% | −45% | 🟢 |
| large/load/model | −25% | −27%..−22% | −25% | −26% | −24% | −23% | −26% | 🟢 |
| large/output/toJSON | −24% | −29%..−20% | −22% | −26% | −26% | −22% | −26% | 🟢 |
| manyPages/load/model | −12% | −16%..−8% | −12% | −9% | −11% | −15% | −13% | 🟢 |
| manyPages/pages/locale | −15% | −24%..−4% | −12% | −19% | −10% | −21% | −11% | 🔴 |
| manyPages/pages/next10 | −16% | −23%..−10% | −21% | −14% | −17% | −14% | −18% | 🟢 |
| manyPages/pages/prev | −15% | −18%..−10% | −16% | −14% | −14% | −16% | −11% | 🟢 |
| manyPages/pages/preview | −22% | −24%..−18% | −22% | −23% | −21% | −20% | −19% | 🟢 |
| manyPages/pages/validate | −14% | −37%..+12% | −14% | −3% | −32% | −18% | −8% | 🔴 |
| records-10k/load/data | −17% | −19%..−15% | −16% | −16% | −18% | −18% | −16% | 🟢 |
| records-10k/load/model | −44% | −46%..−42% | −44% | −45% | −42% | −43% | −43% | 🟢 |
| records-10k/output/toJSON | −14% | −18%..−9% | −15% | −11% | −15% | −16% | −11% | 🟢 |
| records-10k/records/add-row@orders | +61% | +56%..+65% | +60% | +60% | +64% | +59% | +59% | 🟢 |
| records-10k/records/edit-cell@orders | +45% | +41%..+49% | +46% | +44% | +47% | +46% | +43% | 🟢 |
| records-10k/records/filter-change@orders | +9% | +4%..+16% | +9% | +8% | +15% | +11% | +7% | 🟢 |
| records-10k/records/filter-clear@orders | +5% | +3%..+8% | +6% | +3% | +6% | +6% | +5% | 🟢 |
| records-10k/records/first-visit@orders | +17% | +13%..+21% | +18% | +18% | +19% | +15% | +16% | 🟢 |
| records-10k/records/last@orders | −41% | −44%..−37% | −40% | −41% | −41% | −43% | −38% | 🟢 |
| records-10k/records/next@orders | −53% | −54%..−52% | −53% | −53% | −53% | −52% | −53% | 🟢 |
| records-10k/records/prev@orders | −45% | −49%..−40% | −48% | −43% | −46% | −42% | −44% | 🟢 |
| records-10k/records/remove-row@orders | −29% | −30%..−27% | −29% | −29% | −29% | −28% | −29% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −53%..−49% | −50% | −49% | −51% | −52% | −51% | 🟢 |
| records-10k/records/sort-3@orders | −38% | −42%..−34% | −35% | −40% | −40% | −38% | −38% | 🟢 |
| records-10k/records/sort-reverse@orders | −50% | −51%..−49% | −50% | −49% | −50% | −50% | −51% | 🟢 |
| records-1k/load/data | +20% | +16%..+23% | +20% | +20% | +21% | +17% | +20% | 🟢 |
| records-1k/load/model | −43% | −46%..−40% | −45% | −43% | −41% | −43% | −43% | 🟢 |
| records-1k/records/filter-set@orders | −30% | −31%..−28% | −29% | −30% | −30% | −30% | −28% | 🟢 |
| records-1k/records/next@orders | −79% | −80%..−78% | −79% | −80% | −79% | −79% | −79% | 🟢 |
| records-1k/records/next@ordersPanel | −78% | −78%..−77% | −78% | −78% | −77% | −78% | −78% | 🟢 |
| records-1k/records/sort-1@orders | −82% | −84%..−81% | −82% | −82% | −82% | −83% | −83% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −71% | −73%..−68% | −69% | −71% | −72% | −69% | −71% | 🟢 |
| records-plain/records/next@panelsPaged | −64% | −65%..−62% | −64% | −64% | −64% | −65% | −63% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −88%..−87% | −87% | −87% | −88% | −88% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −79% | −80%..−77% | −79% | −79% | −79% | −78% | −78% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −72%..−68% | −70% | −69% | −71% | −69% | −71% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −50% | −53%..−47% | −50% | −50% | −49% | −52% | −48% | 🟢 |

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
