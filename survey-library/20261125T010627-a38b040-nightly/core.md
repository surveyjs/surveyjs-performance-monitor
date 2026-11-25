# survey-library · core · 25.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45523195696

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 49.8 | −1% | 🟢 **−14%** | 🟢 **−29%** |
| calculations/answer/next3 | 168 | −2% | 🟢 **−12%** | 🟢 **−28%** |
| calculations/load/model | 392 | 0% | +6% | 🟢 **−26%** |
| complexLogic/answer/first | 290 | −1% | +3% | 🟢 **−12%** |
| complexLogic/answer/next3 | 537 | −1% | 0% | 🟢 **−9%** |
| complexLogic/load/design | 1264 | −1% | +2% | n/a¹ |
| complexLogic/load/model | 2261 | 0% | +1% | 🟢 **−23%** |
| complexLogic/output/data ᶜ | 0.45 | −4% | +2% | −8% |
| complexLogic/output/dispose | 46.3 | −1% | +6% | −8% |
| complexLogic/output/toJSON | 71.1 | −3% | −6% | 🟢 **−17%** |
| expressions/answer/first | 884 | 0% | +6% | +2% |
| expressions/answer/next3 | 1915 | −2% | +3% | −1% |
| expressions/load/model | 5740 | −1% | +3% | 🟢 **−19%** |
| large/load/design | 444 | 0% | +2% | 🟢 **−45%** |
| large/load/model | 1297 | −1% | +1% | 🟢 **−25%** |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 62.4 | 0% | 0% | −1% |
| large/output/toJSON | 98.6 | −3% | 🟢 **−10%** | 🟢 **−27%** |
| manyPages/load/model | 733 | 0% | +2% | 🟢 **−11%** |
| manyPages/pages/last ᶜ | 8.29 | 0% | −1% | −32% |
| manyPages/pages/locale | 31.7 | 0% | +2% | 🟢 **−17%** |
| manyPages/pages/next10 | 53.6 | −1% | 0% | 🟢 **−16%** |
| manyPages/pages/prev | 37.2 | −1% | +3% | 🟢 **−17%** |
| manyPages/pages/preview | 1255 | 0% | +3% | 🟢 **−19%** |
| manyPages/pages/validate | 75 | +2% | 0% | 🟢 **−15%** |
| records-10k/load/data | 703 | 0% | 🟢 **−39%** | +2% |
| records-10k/load/model | 60.2 | 0% | 🟢 **−35%** | 🟢 **−43%** |
| records-10k/output/data ᶜ | 0.07 | 0% | +17% | −14% |
| records-10k/output/dispose ᶜ | 9.72 | +8% | +11% | −2% |
| records-10k/output/toJSON | 20.3 | −1% | 0% | −15% |
| records-10k/records/add-row@orders | 273 | 0% | +1% | 🔴 **+59%** |
| records-10k/records/edit-cell@orders | 521 | +1% | 0% | 🔴 **+43%** |
| records-10k/records/filter-change@orders | 395 | +1% | −1% | +3% |
| records-10k/records/filter-clear@orders | 385 | −1% | −2% | +5% |
| records-10k/records/filter-set@orders | 409 | 0% | −4% | +9% |
| records-10k/records/first-visit@orders | 652 | 0% | −3% | 🔴 **+17%** |
| records-10k/records/last@orders | 317 | +1% | 0% | 🟢 **−39%** |
| records-10k/records/next@orders | 361 | −1% | 0% | 🟢 **−43%** |
| records-10k/records/prev@orders | 319 | 0% | 0% | 🟢 **−42%** |
| records-10k/records/remove-row@orders | 599 | +1% | 🟢 **−48%** | 🟢 **−34%** |
| records-10k/records/sort-1@orders | 311 | +1% | +2% | 🟢 **−42%** |
| records-10k/records/sort-3@orders | 211 | −1% | −1% | 🟢 **−46%** |
| records-10k/records/sort-reverse@orders | 339 | +1% | 0% | 🟢 **−38%** |
| records-1k/load/data | 180 | −1% | −8% | 🔴 **+18%** |
| records-1k/load/model | 113 | −1% | 🟢 **−32%** | 🟢 **−42%** |
| records-1k/records/filter-set@orders | 256 | 0% | −5% | 🟢 **−30%** |
| records-1k/records/next@orders | 97.5 | −2% | +1% | 🟢 **−79%** |
| records-1k/records/next@ordersPanel | 24.7 | −1% | +4% | 🟢 **−75%** |
| records-1k/records/sort-1@orders | 57.9 | +2% | +3% | 🟢 **−84%** |
| records-1k/records/sort-1@ordersPanel | 23.9 | +1% | +3% | 🟢 **−70%** |
| records-plain/records/next@panelsPaged | 19.5 | +5% | +4% | 🟢 **−67%** |
| records-plain/records/sort-1@orders30 | 60.3 | +1% | +1% | 🟢 **−86%** |
| records-plain/records/sort-1@ordersPaged | 22.3 | −1% | −2% | 🟢 **−80%** |
| records-plain/records/sort-1@panels30 | 34.7 | 0% | −3% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 20.2 | +1% | −5% | 🟢 **−53%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −14% | −17%..−11% | −15% | −12% | −14% | −16% | −15% | 🟢 |
| calculations/answer/next3 | −12% | −19%..−7% | −12% | −18% | −12% | −13% | −10% | 🟢 |
| large/output/toJSON | −10% | −15%..−5% | −7% | −13% | −10% | −12% | −9% | 🟢 |
| records-10k/load/data | −39% | −42%..−35% | −36% | −39% | −41% | −38% | −40% | 🟢 |
| records-10k/load/model | −35% | −40%..−30% | −33% | −33% | −36% | −35% | −39% | 🟢 |
| records-10k/records/remove-row@orders | −48% | −49%..−47% | −49% | −48% | −47% | −48% | −48% | 🟢 |
| records-1k/load/model | −32% | −34%..−29% | −32% | −31% | −33% | −30% | −30% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −29% | −32%..−26% | −29% | −28% | −30% | −27% | −31% | 🟢 |
| calculations/answer/next3 | −28% | −33%..−22% | −26% | −32% | −25% | −27% | −29% | 🟢 |
| calculations/load/model | −26% | −26%..−25% | −26% | −25% | −26% | −25% | −25% | 🟢 |
| complexLogic/answer/first | −12% | −13%..−10% | −11% | −12% | −12% | −12% | −11% | 🟢 |
| complexLogic/answer/next3 | −9% | −11%..−8% | −9% | −10% | −10% | −10% | −10% | 🟢 |
| complexLogic/load/model | −23% | −24%..−22% | −23% | −23% | −22% | −23% | −24% | 🟢 |
| complexLogic/output/toJSON | −17% | −22%..−10% | −14% | −16% | −20% | −17% | −14% | 🟢 |
| expressions/load/model | −19% | −20%..−18% | −20% | −19% | −19% | −20% | −19% | 🟢 |
| large/load/design | −45% | −46%..−43% | −44% | −46% | −45% | −45% | −44% | 🟢 |
| large/load/model | −25% | −28%..−23% | −26% | −25% | −23% | −26% | −26% | 🟢 |
| large/output/toJSON | −27% | −28%..−24% | −27% | −26% | −28% | −25% | −26% | 🟢 |
| manyPages/load/model | −11% | −14%..−8% | −9% | −10% | −11% | −12% | −12% | 🟢 |
| manyPages/pages/locale | −17% | −21%..−12% | −19% | −14% | −17% | −19% | −15% | 🟢 |
| manyPages/pages/next10 | −16% | −19%..−14% | −16% | −19% | −16% | −17% | −17% | 🟢 |
| manyPages/pages/prev | −17% | −22%..−11% | −17% | −17% | −13% | −15% | −21% | 🟢 |
| manyPages/pages/preview | −19% | −23%..−17% | −19% | −21% | −18% | −19% | −22% | 🟢 |
| manyPages/pages/validate | −15% | −26%..−3% | −5% | −14% | −20% | −17% | −19% | 🟢 |
| records-10k/load/model | −43% | −45%..−42% | −43% | −43% | −43% | −43% | −45% | 🟢 |
| records-10k/output/toJSON | −15% | −25%..−5% | −21% | −18% | −10% | −19% | −11% | 🔴 |
| records-10k/records/add-row@orders | +59% | +52%..+66% | +60% | +62% | +58% | +61% | +54% | 🟢 |
| records-10k/records/edit-cell@orders | +43% | +42%..+46% | +44% | +42% | +44% | +44% | +45% | 🟢 |
| records-10k/records/first-visit@orders | +17% | +15%..+20% | +18% | +17% | +17% | +20% | +17% | 🟢 |
| records-10k/records/last@orders | −39% | −41%..−37% | −37% | −39% | −40% | −40% | −39% | 🟢 |
| records-10k/records/next@orders | −43% | −44%..−41% | −41% | −43% | −43% | −42% | −42% | 🟢 |
| records-10k/records/prev@orders | −42% | −47%..−36% | −44% | −45% | −40% | −42% | −39% | 🟢 |
| records-10k/records/remove-row@orders | −34% | −35%..−33% | −33% | −35% | −34% | −34% | −34% | 🟢 |
| records-10k/records/sort-1@orders | −42% | −43%..−41% | −42% | −42% | −41% | −42% | −43% | 🟢 |
| records-10k/records/sort-3@orders | −46% | −48%..−44% | −45% | −46% | −45% | −48% | −46% | 🟢 |
| records-10k/records/sort-reverse@orders | −38% | −42%..−36% | −40% | −37% | −40% | −40% | −37% | 🟢 |
| records-1k/load/data | +18% | +15%..+20% | +19% | +16% | +17% | +18% | +19% | 🟢 |
| records-1k/load/model | −42% | −44%..−40% | −41% | −42% | −41% | −43% | −43% | 🟢 |
| records-1k/records/filter-set@orders | −30% | −31%..−29% | −31% | −30% | −30% | −29% | −30% | 🟢 |
| records-1k/records/next@orders | −79% | −79%..−78% | −79% | −79% | −79% | −79% | −79% | 🟢 |
| records-1k/records/next@ordersPanel | −75% | −76%..−74% | −74% | −76% | −74% | −75% | −75% | 🟢 |
| records-1k/records/sort-1@orders | −84% | −84%..−83% | −83% | −83% | −84% | −84% | −84% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −70% | −71%..−69% | −71% | −70% | −70% | −70% | −71% | 🟢 |
| records-plain/records/next@panelsPaged | −67% | −69%..−65% | −67% | −66% | −69% | −67% | −67% | 🟢 |
| records-plain/records/sort-1@orders30 | −86% | −86%..−86% | −86% | −86% | −86% | −86% | −86% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −80% | −81%..−80% | −80% | −80% | −80% | −80% | −80% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −71%..−70% | −70% | −70% | −71% | −70% | −70% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −53% | −57%..−51% | −53% | −53% | −55% | −53% | −56% | 🟢 |

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
