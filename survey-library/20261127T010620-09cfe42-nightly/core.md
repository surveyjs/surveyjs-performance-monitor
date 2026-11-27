# survey-library · core · 27.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45920610067

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 47.7 | −2% | −4% | 🟢 **−13%** |
| calculations/answer/next3 | 141 | +1% | 0% | 🟢 **−19%** |
| calculations/load/model | 277 | 0% | 0% | 🔴 **+10%** |
| complexLogic/answer/first | 281 | −2% | −2% | +6% |
| complexLogic/answer/next3 | 534 | −6% | −2% | +1% |
| complexLogic/load/design | 1947 | −2% | −2% | −9% |
| complexLogic/load/model | 3135 | −1% | −1% | +3% |
| complexLogic/output/data ᶜ | 0.57 | +2% | +4% | +9% |
| complexLogic/output/dispose | 52.5 | −1% | −1% | 🔴 **+13%** |
| complexLogic/output/toJSON | 65.1 | −2% | −1% | +1% |
| expressions/answer/first | 846 | 🟢 **−15%** | 🟢 **−11%** | +2% |
| expressions/answer/next3 | 2196 | 🟢 **−15%** | 🟢 **−14%** | −4% |
| expressions/load/model | 7168 | −5% | −6% | −3% |
| large/load/design | 439 | 0% | 0% | 🟢 **−22%** |
| large/load/model | 675 | −3% | −3% | 🟢 **−12%** |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 44.7 | −1% | 0% | +3% |
| large/output/toJSON | 97.8 | −4% | −2% | 🟢 **−10%** |
| manyPages/load/model | 722 | 0% | +1% | −2% |
| manyPages/pages/last ᶜ | 8.39 | −18% | −10% | −1% |
| manyPages/pages/locale | 26.8 | +3% | +2% | 0% |
| manyPages/pages/next10 | 53.5 | +1% | −1% | +2% |
| manyPages/pages/prev | 29 | −2% | +1% | +4% |
| manyPages/pages/preview | 1164 | −3% | −2% | +1% |
| manyPages/pages/validate | 58.6 | −6% | −4% | +11% |
| records-10k/load/data | 686 | +1% | +1% | 🟢 **−13%** |
| records-10k/load/model | 61.3 | −3% | −2% | 🟢 **−33%** |
| records-10k/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| records-10k/output/dispose ᶜ | 12.4 | +3% | +2% | +6% |
| records-10k/output/toJSON | 21.2 | −5% | −3% | −2% |
| records-10k/records/add-row@orders | 273 | +2% | +2% | 🔴 **+75%** |
| records-10k/records/edit-cell@orders | 583 | 0% | 0% | 🔴 **+54%** |
| records-10k/records/filter-change@orders | 389 | 0% | +1% | 🔴 **+17%** |
| records-10k/records/filter-clear@orders | 389 | +1% | 0% | 🔴 **+20%** |
| records-10k/records/filter-set@orders | 665 | +1% | +1% | 🔴 **+26%** |
| records-10k/records/first-visit@orders | 382 | +1% | +2% | 🔴 **+37%** |
| records-10k/records/last@orders | 178 | +3% | +2% | 🟢 **−31%** |
| records-10k/records/next@orders | 198 | +2% | +2% | 🟢 **−43%** |
| records-10k/records/prev@orders | 179 | +1% | +3% | 🟢 **−43%** |
| records-10k/records/remove-row@orders | 995 | 0% | 0% | 🟢 **−24%** |
| records-10k/records/sort-1@orders | 339 | +2% | +3% | 🟢 **−32%** |
| records-10k/records/sort-3@orders | 293 | +1% | +4% | 🟢 **−27%** |
| records-10k/records/sort-reverse@orders | 203 | +6% | 0% | 🟢 **−31%** |
| records-1k/load/data | 188 | +3% | +3% | 🔴 **+35%** |
| records-1k/load/model | 59.4 | −2% | −4% | 🟢 **−34%** |
| records-1k/records/filter-set@orders | 253 | −2% | 0% | 🟢 **−21%** |
| records-1k/records/next@orders | 74.3 | +1% | 0% | 🟢 **−78%** |
| records-1k/records/next@ordersPanel | 23.8 | −3% | −1% | 🟢 **−71%** |
| records-1k/records/sort-1@orders | 58.7 | +1% | +2% | 🟢 **−81%** |
| records-1k/records/sort-1@ordersPanel | 25.5 | +6% | −1% | 🟢 **−67%** |
| records-plain/records/next@panelsPaged | 20.5 | −1% | +1% | 🟢 **−62%** |
| records-plain/records/sort-1@orders30 | 35.7 | +1% | 0% | 🟢 **−87%** |
| records-plain/records/sort-1@ordersPaged | 39.1 | −1% | 0% | 🟢 **−75%** |
| records-plain/records/sort-1@panels30 | 54.5 | −1% | −2% | 🟢 **−67%** |
| records-plain/records/sort-1@panelsPaged | 21 | −2% | −1% | 🟢 **−49%** |
| slotForm/answer/cell | n/a | — | — | — |
| slotForm/answer/count-off | 3133 | −4% | −6% | −6% |
| slotForm/answer/count-on | 1645 | −3% | −4% | 🟢 **−12%** |
| slotForm/answer/count-up | 4523 | −4% | −4% | −1% |
| slotForm/answer/row-cell | 4491 | −4% | −3% | −2% |
| slotForm/answer/screen | 291 | −5% | −6% | −1% |
| slotForm/answer/shared-name | n/a | — | — | — |
| slotForm/answer/slot-question | 747 | −4% | −4% | −2% |
| slotForm/answer/type | 509 | −10% | 🟢 **−10%** | −4% |
| slotForm/load/data | 19342 | −4% | −3% | −3% |
| slotForm/load/data-again | 12416 | −4% | −3% | +3% |
| slotForm/load/merge | 609 | −5% | −4% | −1% |
| slotForm/load/model | 2548 | −2% | −3% | +1% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Failed on today
- slotForm/answer/cell: killed after 300 s
- slotForm/answer/shared-name: killed after 300 s

## Repeats 1D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| expressions/answer/first | −15% | −19%..−11% | −14% | −15% | −19% | −15% | −14% | 🟢 |
| expressions/answer/next3 | −15% | −18%..−12% | −14% | −15% | −18% | −14% | −15% | 🟢 |
| slotForm/answer/type | −10% | −21%..+1% | −5% | −13% | −12% | −17% | −6% | 🔴 |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| expressions/answer/first | −11% | −16%..−5% | −10% | −13% | −12% | −7% | −13% | 🟢 |
| expressions/answer/next3 | −14% | −17%..−12% | −13% | −16% | −15% | −14% | −13% | 🟢 |
| slotForm/answer/type | −10% | −13%..−6% | −7% | −11% | −9% | −8% | −12% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −13% | −20%..−7% | −11% | −12% | −13% | −19% | −14% | 🟢 |
| calculations/answer/next3 | −19% | −24%..−12% | −21% | −17% | −21% | −14% | −20% | 🟢 |
| calculations/load/model | +10% | +8%..+12% | +9% | +11% | +9% | +12% | +11% | 🟢 |
| complexLogic/output/dispose | +13% | +5%..+23% | +12% | +20% | +9% | +12% | +16% | 🟢 |
| large/load/design | −22% | −26%..−20% | −23% | −25% | −24% | −23% | −21% | 🟢 |
| large/load/model | −12% | −13%..−10% | −12% | −11% | −11% | −12% | −12% | 🟢 |
| large/output/toJSON | −10% | −13%..−7% | −12% | −11% | −9% | −8% | −10% | 🟢 |
| records-10k/load/data | −13% | −15%..−11% | −13% | −13% | −12% | −15% | −13% | 🟢 |
| records-10k/load/model | −33% | −36%..−31% | −34% | −33% | −32% | −32% | −35% | 🟢 |
| records-10k/records/add-row@orders | +75% | +67%..+83% | +76% | +74% | +71% | +73% | +81% | 🟢 |
| records-10k/records/edit-cell@orders | +54% | +48%..+61% | +53% | +56% | +49% | +55% | +58% | 🟢 |
| records-10k/records/filter-change@orders | +17% | +14%..+21% | +15% | +17% | +20% | +18% | +18% | 🟢 |
| records-10k/records/filter-clear@orders | +20% | +17%..+24% | +20% | +21% | +23% | +21% | +19% | 🟢 |
| records-10k/records/filter-set@orders | +26% | +25%..+29% | +27% | +28% | +26% | +27% | +25% | 🟢 |
| records-10k/records/first-visit@orders | +37% | +32%..+43% | +35% | +35% | +39% | +36% | +41% | 🟢 |
| records-10k/records/last@orders | −31% | −34%..−29% | −32% | −32% | −31% | −29% | −32% | 🟢 |
| records-10k/records/next@orders | −43% | −44%..−41% | −42% | −42% | −42% | −44% | −43% | 🟢 |
| records-10k/records/prev@orders | −43% | −45%..−40% | −43% | −41% | −42% | −43% | −44% | 🟢 |
| records-10k/records/remove-row@orders | −24% | −26%..−23% | −24% | −25% | −25% | −23% | −24% | 🟢 |
| records-10k/records/sort-1@orders | −32% | −35%..−28% | −29% | −30% | −33% | −34% | −31% | 🟢 |
| records-10k/records/sort-3@orders | −27% | −31%..−24% | −27% | −28% | −28% | −30% | −25% | 🟢 |
| records-10k/records/sort-reverse@orders | −31% | −35%..−28% | −34% | −31% | −31% | −31% | −29% | 🟢 |
| records-1k/load/data | +35% | +31%..+39% | +35% | +37% | +35% | +35% | +31% | 🟢 |
| records-1k/load/model | −34% | −37%..−32% | −35% | −36% | −34% | −32% | −34% | 🟢 |
| records-1k/records/filter-set@orders | −21% | −23%..−19% | −21% | −20% | −20% | −21% | −23% | 🟢 |
| records-1k/records/next@orders | −78% | −80%..−77% | −79% | −78% | −79% | −77% | −78% | 🟢 |
| records-1k/records/next@ordersPanel | −71% | −75%..−68% | −73% | −74% | −70% | −71% | −70% | 🟢 |
| records-1k/records/sort-1@orders | −81% | −81%..−80% | −81% | −81% | −81% | −81% | −81% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −67% | −68%..−65% | −66% | −68% | −66% | −67% | −66% | 🟢 |
| records-plain/records/next@panelsPaged | −62% | −63%..−61% | −63% | −61% | −61% | −62% | −62% | 🟢 |
| records-plain/records/sort-1@orders30 | −87% | −87%..−86% | −86% | −87% | −87% | −87% | −87% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −75% | −77%..−74% | −75% | −75% | −76% | −76% | −75% | 🟢 |
| records-plain/records/sort-1@panels30 | −67% | −70%..−64% | −66% | −66% | −66% | −67% | −69% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −49% | −51%..−48% | −50% | −49% | −49% | −49% | −49% | 🟢 |
| slotForm/answer/count-on | −12% | −15%..−9% | −14% | −11% | −11% | −11% | −13% | 🟢 |

## Counters (information)
- calculations/load/model (30D): expressionRuns 2397 → 2401 (work), conditionsPasses 3 → 4 (work)
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
