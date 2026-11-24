# survey-library · core · 24.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45302415096

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 49.3 | +1% | 🟢 **−15%** | 🟢 **−29%** |
| calculations/answer/next3 | 136 | +4% | 🟢 **−19%** | 🟢 **−34%** |
| calculations/load/model | 344 | +1% | +3% | 🟢 **−27%** |
| complexLogic/answer/first | 399 | 0% | +3% | 🟢 **−17%** |
| complexLogic/answer/next3 | 556 | 0% | +3% | 🟢 **−10%** |
| complexLogic/load/design | 1251 | 0% | +1% | n/a¹ |
| complexLogic/load/model | 2228 | 0% | +2% | 🟢 **−24%** |
| complexLogic/output/data ᶜ | 0.33 | 0% | −6% | −6% |
| complexLogic/output/dispose | 53.6 | −2% | +4% | −3% |
| complexLogic/output/toJSON | 64.9 | −2% | −3% | 🟢 **−14%** |
| expressions/answer/first | 1307 | +1% | 🔴 **+14%** | −6% |
| expressions/answer/next3 | 1892 | +2% | +12% | −3% |
| expressions/load/model | 7862 | −1% | +2% | 🟢 **−20%** |
| large/load/design | 440 | −1% | +4% | 🟢 **−45%** |
| large/load/model | 893 | +1% | −5% | 🟢 **−25%** |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 45.7 | +3% | −4% | −3% |
| large/output/toJSON | 91.1 | −4% | −8% | 🟢 **−25%** |
| manyPages/load/model | 1156 | −2% | −9% | 🟢 **−12%** |
| manyPages/pages/last ᶜ | 13.1 | +3% | +4% | −18% |
| manyPages/pages/locale | 27.1 | −3% | +3% | −10% |
| manyPages/pages/next10 | 60.4 | −3% | −3% | 🟢 **−18%** |
| manyPages/pages/prev | 26.4 | 0% | −2% | 🟢 **−13%** |
| manyPages/pages/preview | 1207 | +1% | +4% | 🟢 **−18%** |
| manyPages/pages/validate | 60.2 | −5% | 0% | −9% |
| records-10k/load/data | 674 | +1% | 🟢 **−45%** | 🟢 **−17%** |
| records-10k/load/model | 61.4 | −1% | 🟢 **−34%** | 🟢 **−43%** |
| records-10k/output/data ᶜ | 0.09 | 0% | +25% | −18% |
| records-10k/output/dispose ᶜ | 12.3 | +1% | 0% | +1% |
| records-10k/output/toJSON | 32 | −2% | 0% | −14% |
| records-10k/records/add-row@orders | 274 | +1% | −1% | 🔴 **+59%** |
| records-10k/records/edit-cell@orders | 331 | 0% | −1% | 🔴 **+43%** |
| records-10k/records/filter-change@orders | 390 | 0% | −1% | +4% |
| records-10k/records/filter-clear@orders | 385 | 0% | −3% | +5% |
| records-10k/records/filter-set@orders | 385 | 0% | −2% | +2% |
| records-10k/records/first-visit@orders | 695 | −3% | −2% | 🔴 **+18%** |
| records-10k/records/last@orders | 166 | +3% | −2% | 🟢 **−51%** |
| records-10k/records/next@orders | 189 | −1% | −1% | 🟢 **−52%** |
| records-10k/records/prev@orders | 172 | −1% | 0% | 🟢 **−52%** |
| records-10k/records/remove-row@orders | 770 | 0% | 🟢 **−46%** | 🟢 **−29%** |
| records-10k/records/sort-1@orders | 176 | 0% | 0% | 🟢 **−51%** |
| records-10k/records/sort-3@orders | 216 | +1% | −1% | 🟢 **−46%** |
| records-10k/records/sort-reverse@orders | 183 | −1% | +1% | 🟢 **−50%** |
| records-1k/load/data | 180 | 0% | −7% | 🔴 **+17%** |
| records-1k/load/model | 116 | −1% | 🟢 **−31%** | 🟢 **−42%** |
| records-1k/records/filter-set@orders | 254 | 0% | −5% | 🟢 **−30%** |
| records-1k/records/next@orders | 115 | −2% | +1% | 🟢 **−80%** |
| records-1k/records/next@ordersPanel | 22.6 | −1% | +1% | 🟢 **−77%** |
| records-1k/records/sort-1@orders | 101 | +2% | −2% | 🟢 **−81%** |
| records-1k/records/sort-1@ordersPanel | 38 | +1% | 0% | 🟢 **−73%** |
| records-plain/records/next@panelsPaged | 35 | −1% | +1% | 🟢 **−63%** |
| records-plain/records/sort-1@orders30 | 31.8 | +1% | −2% | 🟢 **−87%** |
| records-plain/records/sort-1@ordersPaged | 21.6 | 0% | −3% | 🟢 **−81%** |
| records-plain/records/sort-1@panels30 | 33.7 | +2% | −4% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 21.7 | 0% | 0% | 🟢 **−53%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −15% | −18%..−11% | −17% | −16% | −14% | −12% | −14% | 🟢 |
| calculations/answer/next3 | −19% | −25%..−13% | −18% | −20% | −15% | −20% | −24% | 🟢 |
| expressions/answer/first | +14% | +11%..+18% | +16% | +17% | +14% | +14% | +13% | 🟢 |
| expressions/answer/next3 | +12% | −2%..+25% | +7% | +22% | +12% | +4% | +11% | 🔴 |
| records-10k/load/data | −45% | −46%..−44% | −46% | −45% | −45% | −45% | −46% | 🟢 |
| records-10k/load/model | −34% | −37%..−31% | −35% | −33% | −36% | −33% | −35% | 🟢 |
| records-10k/records/remove-row@orders | −46% | −47%..−45% | −46% | −46% | −46% | −46% | −46% | 🟢 |
| records-1k/load/model | −31% | −34%..−29% | −33% | −30% | −32% | −32% | −30% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −29% | −31%..−27% | −30% | −28% | −30% | −29% | −27% | 🟢 |
| calculations/answer/next3 | −34% | −40%..−27% | −32% | −38% | −34% | −32% | −31% | 🟢 |
| calculations/load/model | −27% | −29%..−24% | −27% | −26% | −28% | −26% | −25% | 🟢 |
| complexLogic/answer/first | −17% | −23%..−8% | −17% | −16% | −16% | −20% | −10% | 🟢 |
| complexLogic/answer/next3 | −10% | −13%..−6% | −7% | −10% | −10% | −10% | −10% | 🟢 |
| complexLogic/load/model | −24% | −25%..−22% | −23% | −24% | −24% | −24% | −23% | 🟢 |
| complexLogic/output/toJSON | −14% | −25%..−3% | −22% | −17% | −11% | −9% | −16% | 🟢 |
| expressions/load/model | −20% | −23%..−17% | −21% | −22% | −18% | −20% | −19% | 🟢 |
| large/load/design | −45% | −47%..−44% | −45% | −45% | −46% | −47% | −44% | 🟢 |
| large/load/model | −25% | −28%..−24% | −25% | −26% | −28% | −25% | −26% | 🟢 |
| large/output/toJSON | −25% | −28%..−21% | −26% | −24% | −26% | −22% | −26% | 🟢 |
| manyPages/load/model | −12% | −14%..−10% | −10% | −13% | −12% | −13% | −12% | 🟢 |
| manyPages/pages/locale | −10% | −17%..−1% | −6% | −8% | −6% | −10% | −16% | 🔴 |
| manyPages/pages/next10 | −18% | −22%..−14% | −18% | −18% | −17% | −17% | −21% | 🟢 |
| manyPages/pages/prev | −13% | −20%..−7% | −10% | −17% | −16% | −11% | −14% | 🟢 |
| manyPages/pages/preview | −18% | −20%..−16% | −17% | −18% | −19% | −19% | −17% | 🟢 |
| manyPages/pages/validate | −9% | −29%..+9% | −14% | −4% | −25% | −12% | −3% | 🔴 |
| records-10k/load/data | −17% | −20%..−13% | −16% | −18% | −17% | −14% | −18% | 🟢 |
| records-10k/load/model | −43% | −45%..−42% | −43% | −43% | −44% | −44% | −43% | 🟢 |
| records-10k/output/toJSON | −14% | −29%..+4% | −14% | −6% | −20% | −5% | −23% | 🔴 |
| records-10k/records/add-row@orders | +59% | +54%..+66% | +62% | +57% | +63% | +60% | +56% | 🟢 |
| records-10k/records/edit-cell@orders | +43% | +36%..+50% | +38% | +42% | +44% | +47% | +42% | 🟢 |
| records-10k/records/first-visit@orders | +18% | +15%..+20% | +20% | +16% | +17% | +18% | +17% | 🟢 |
| records-10k/records/last@orders | −51% | −52%..−50% | −52% | −51% | −52% | −50% | −51% | 🟢 |
| records-10k/records/next@orders | −52% | −54%..−50% | −53% | −51% | −53% | −52% | −52% | 🟢 |
| records-10k/records/prev@orders | −52% | −54%..−51% | −53% | −53% | −53% | −52% | −52% | 🟢 |
| records-10k/records/remove-row@orders | −29% | −31%..−28% | −29% | −30% | −29% | −29% | −28% | 🟢 |
| records-10k/records/sort-1@orders | −51% | −52%..−49% | −52% | −51% | −50% | −51% | −51% | 🟢 |
| records-10k/records/sort-3@orders | −46% | −47%..−45% | −46% | −46% | −46% | −46% | −46% | 🟢 |
| records-10k/records/sort-reverse@orders | −50% | −50%..−49% | −50% | −49% | −49% | −50% | −50% | 🟢 |
| records-1k/load/data | +17% | +14%..+21% | +15% | +18% | +18% | +17% | +20% | 🟢 |
| records-1k/load/model | −42% | −43%..−40% | −42% | −40% | −42% | −43% | −42% | 🟢 |
| records-1k/records/filter-set@orders | −30% | −32%..−29% | −31% | −30% | −30% | −30% | −29% | 🟢 |
| records-1k/records/next@orders | −80% | −80%..−80% | −80% | −80% | −80% | −80% | −80% | 🟢 |
| records-1k/records/next@ordersPanel | −77% | −77%..−76% | −77% | −77% | −77% | −77% | −77% | 🟢 |
| records-1k/records/sort-1@orders | −81% | −82%..−80% | −81% | −81% | −81% | −81% | −81% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −73% | −75%..−71% | −72% | −74% | −73% | −73% | −72% | 🟢 |
| records-plain/records/next@panelsPaged | −63% | −66%..−60% | −63% | −62% | −61% | −63% | −65% | 🟢 |
| records-plain/records/sort-1@orders30 | −87% | −88%..−87% | −88% | −87% | −87% | −87% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −81% | −82%..−80% | −81% | −81% | −80% | −81% | −82% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −73%..−68% | −70% | −70% | −70% | −72% | −72% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −53% | −55%..−51% | −54% | −54% | −53% | −53% | −52% | 🟢 |

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
