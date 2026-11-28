# survey-library · core · 28.11.2026 01:06 UTC

> cancelled: 3 scenarios not measured · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46091383335

- today — incomplete: 3 unrun (cancelled)
- 1D — incomplete: 3 unrun (cancelled)
- 7D — incomplete: 3 unrun (cancelled)
- 30D — incomplete: 3 unrun (cancelled)

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 84.1 | −1% | −1% | 0% |
| calculations/answer/next3 | 228 | +5% | −1% | 🟢 **−9%** |
| calculations/load/model | 279 | 0% | −2% | +4% |
| complexLogic/answer/first | 402 | 0% | −2% | +5% |
| complexLogic/answer/next3 | 523 | 0% | +1% | 0% |
| complexLogic/load/design | 2056 | +1% | −3% | +2% |
| complexLogic/load/model | 3446 | 0% | −1% | +2% |
| complexLogic/output/data ᶜ | 0.46 | −4% | +2% | 0% |
| complexLogic/output/dispose | 66.6 | −2% | +2% | +11% |
| complexLogic/output/toJSON | 108 | 0% | −2% | −4% |
| expressions/answer/first | 847 | 0% | 🟢 **−12%** | +2% |
| expressions/answer/next3 | 1581 | +1% | −15% | −5% |
| expressions/load/model | 5302 | 0% | −6% | −2% |
| large/load/design | 445 | 0% | −1% | 🔴 **+10%** |
| large/load/model | 688 | +2% | −3% | 🟢 **−12%** |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 42.5 | −3% | −6% | +8% |
| large/output/toJSON | 97.6 | +1% | −5% | −9% |
| manyPages/load/model | 722 | −1% | −3% | −2% |
| manyPages/pages/last ᶜ | 14.3 | +1% | −1% | 0% |
| manyPages/pages/locale | 27.8 | −3% | 0% | +3% |
| manyPages/pages/next10 | 60.1 | 0% | 0% | +5% |
| manyPages/pages/prev | 25.8 | +1% | +1% | +2% |
| manyPages/pages/preview | 1169 | −1% | −2% | +3% |
| manyPages/pages/validate | 60.2 | +5% | +7% | +9% |
| records-10k/load/data | 687 | 0% | 0% | 🔴 **+11%** |
| records-10k/load/model | 58.9 | +3% | −4% | 🟢 **−33%** |
| records-10k/output/data ᶜ | 0.12 | −8% | 0% | +18% |
| records-10k/output/dispose ᶜ | 10.2 | −4% | +5% | +11% |
| records-10k/output/toJSON | 20.6 | −1% | 0% | −1% |
| records-10k/records/add-row@orders | 497 | 0% | +2% | 🔴 **+88%** |
| records-10k/records/edit-cell@orders | 339 | +1% | 0% | 🔴 **+55%** |
| records-10k/records/filter-change@orders | 386 | 0% | +2% | 🔴 **+26%** |
| records-10k/records/filter-clear@orders | 391 | 0% | 0% | 🔴 **+30%** |
| records-10k/records/filter-set@orders | 391 | 0% | 0% | 🔴 **+25%** |
| records-10k/records/first-visit@orders | 513 | 0% | 0% | 🔴 **+41%** |
| records-10k/records/last@orders | 321 | 0% | +2% | 🟢 **−23%** |
| records-10k/records/next@orders | 345 | 0% | +4% | 🟢 **−29%** |
| records-10k/records/prev@orders | 178 | 0% | +3% | 🟢 **−38%** |
| records-10k/records/remove-row@orders | 975 | +1% | 0% | 🟢 **−21%** |
| records-10k/records/sort-1@orders | 183 | −2% | +2% | 🟢 **−37%** |
| records-10k/records/sort-3@orders | 219 | 0% | +3% | 🟢 **−33%** |
| records-10k/records/sort-reverse@orders | 183 | +1% | +3% | 🟢 **−36%** |
| records-1k/load/data | 191 | 0% | +4% | 🔴 **+43%** |
| records-1k/load/model | 77.6 | 0% | −5% | 🟢 **−35%** |
| records-1k/records/filter-set@orders | 385 | 0% | 0% | 🟢 **−12%** |
| records-1k/records/next@orders | 72.5 | −2% | 0% | 🟢 **−77%** |
| records-1k/records/next@ordersPanel | 37.6 | −2% | −1% | 🟢 **−72%** |
| records-1k/records/sort-1@orders | 91.5 | 0% | +1% | 🟢 **−78%** |
| records-1k/records/sort-1@ordersPanel | 22.9 | +1% | 0% | 🟢 **−65%** |
| records-plain/records/next@panelsPaged | 19.5 | +3% | −3% | 🟢 **−62%** |
| records-plain/records/sort-1@orders30 | 57.2 | +3% | 0% | 🟢 **−84%** |
| records-plain/records/sort-1@ordersPaged | 39.2 | +2% | +2% | 🟢 **−73%** |
| records-plain/records/sort-1@panels30 | 54.7 | −1% | 0% | 🟢 **−65%** |
| records-plain/records/sort-1@panelsPaged | 21.9 | −3% | −2% | 🟢 **−46%** |
| slotForm/answer/cell | 4361 | −1% | −4% | −2% |
| slotForm/answer/count-off | 3834 | 0% | −3% | −7% |
| slotForm/answer/count-on | n/a | not run | not run | not run |
| slotForm/answer/count-up | 4461 | −1% | −3% | −4% |
| slotForm/answer/row-cell | 4357 | 0% | −3% | −2% |
| slotForm/answer/screen | 216 | +4% | −6% | 0% |
| slotForm/answer/shared-name | 5993 | +1% | −5% | −2% |
| slotForm/answer/slot-question | n/a | not run | not run | not run |
| slotForm/answer/type | 486 | 0% | −9% | −4% |
| slotForm/load/data | n/a | not run | not run | not run |
| slotForm/load/data-again | 15623 | 0% | −4% | −2% |
| slotForm/load/merge | 605 | −2% | −3% | 0% |
| slotForm/load/model | 4087 | 0% | 0% | +2% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| expressions/answer/first | −12% | −15%..−10% | −12% | −14% | −12% | −10% | −13% | 🟢 |
| expressions/answer/next3 | −15% | −28%..−1% | −7% | −22% | −22% | −13% | −13% | 🔴 |
| slotForm/answer/type | −9% | −21%..+4% | −6% | −7% | −19% | −6% | −8% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/next3 | −9% | −13%..−5% | −9% | −9% | −8% | −8% | −13% | 🟢 |
| complexLogic/output/dispose | +11% | −2%..+32% | +29% | +13% | +9% | +9% | +8% | 🔴 |
| large/load/design | +10% | +3%..+21% | +14% | +16% | +14% | +8% | +6% | 🟢 |
| large/load/model | −12% | −12%..−11% | −11% | −11% | −12% | −12% | −12% | 🟢 |
| large/output/dispose | +8% | −4%..+26% | +9% | +3% | +4% | +18% | +18% | 🔴 |
| records-10k/load/data | +11% | +8%..+13% | +11% | +9% | +12% | +10% | +11% | 🟢 |
| records-10k/load/model | −33% | −35%..−32% | −33% | −33% | −35% | −32% | −34% | 🟢 |
| records-10k/records/add-row@orders | +88% | +81%..+92% | +87% | +87% | +88% | +82% | +88% | 🟢 |
| records-10k/records/edit-cell@orders | +55% | +49%..+61% | +54% | +51% | +55% | +59% | +55% | 🟢 |
| records-10k/records/filter-change@orders | +26% | +23%..+28% | +24% | +24% | +26% | +26% | +28% | 🟢 |
| records-10k/records/filter-clear@orders | +30% | +28%..+33% | +31% | +32% | +30% | +31% | +29% | 🟢 |
| records-10k/records/filter-set@orders | +25% | +21%..+28% | +27% | +24% | +25% | +22% | +24% | 🟢 |
| records-10k/records/first-visit@orders | +41% | +38%..+48% | +43% | +42% | +44% | +46% | +39% | 🟢 |
| records-10k/records/last@orders | −23% | −24%..−21% | −22% | −23% | −23% | −24% | −23% | 🟢 |
| records-10k/records/next@orders | −29% | −32%..−26% | −29% | −29% | −28% | −28% | −32% | 🟢 |
| records-10k/records/prev@orders | −38% | −40%..−35% | −38% | −39% | −38% | −36% | −38% | 🟢 |
| records-10k/records/remove-row@orders | −21% | −22%..−19% | −20% | −21% | −20% | −21% | −20% | 🟢 |
| records-10k/records/sort-1@orders | −37% | −40%..−35% | −38% | −36% | −37% | −39% | −38% | 🟢 |
| records-10k/records/sort-3@orders | −33% | −36%..−29% | −36% | −33% | −32% | −31% | −33% | 🟢 |
| records-10k/records/sort-reverse@orders | −36% | −39%..−34% | −35% | −37% | −37% | −37% | −36% | 🟢 |
| records-1k/load/data | +43% | +41%..+44% | +44% | +43% | +42% | +43% | +42% | 🟢 |
| records-1k/load/model | −35% | −39%..−31% | −32% | −37% | −35% | −37% | −36% | 🟢 |
| records-1k/records/filter-set@orders | −12% | −14%..−8% | −12% | −10% | −10% | −14% | −11% | 🟢 |
| records-1k/records/next@orders | −77% | −77%..−75% | −76% | −77% | −76% | −76% | −77% | 🟢 |
| records-1k/records/next@ordersPanel | −72% | −73%..−70% | −70% | −71% | −72% | −72% | −72% | 🟢 |
| records-1k/records/sort-1@orders | −78% | −79%..−77% | −78% | −78% | −78% | −78% | −78% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −65% | −67%..−63% | −65% | −65% | −64% | −67% | −65% | 🟢 |
| records-plain/records/next@panelsPaged | −62% | −63%..−60% | −63% | −62% | −60% | −62% | −61% | 🟢 |
| records-plain/records/sort-1@orders30 | −84% | −85%..−84% | −84% | −84% | −85% | −84% | −84% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −73% | −74%..−72% | −73% | −73% | −73% | −73% | −73% | 🟢 |
| records-plain/records/sort-1@panels30 | −65% | −66%..−63% | −64% | −65% | −65% | −64% | −65% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −46% | −48%..−44% | −46% | −45% | −47% | −46% | −47% | 🟢 |

## Counters (information)
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
