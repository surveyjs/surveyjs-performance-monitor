# survey-library · core · 26.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45733407624

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 83.4 | +13% | −15% | −2% |
| calculations/answer/next3 | 137 | −2% | 🟢 **−18%** | 🟢 **−20%** |
| calculations/load/model | 285 | +2% | +4% | 🟢 **−17%** |
| complexLogic/answer/first | 264 | +1% | +4% | −8% |
| complexLogic/answer/next3 | 571 | −2% | +1% | +3% |
| complexLogic/load/design | 1245 | −1% | +1% | n/a¹ |
| complexLogic/load/model | 3470 | 0% | +1% | 🟢 **−21%** |
| complexLogic/output/data ᶜ | 0.53 | +2% | +2% | −9% |
| complexLogic/output/dispose | 66.6 | +1% | +2% | +9% |
| complexLogic/output/toJSON | 72.6 | +1% | +2% | −3% |
| expressions/answer/first | 968 | +3% | +6% | 🔴 **+10%** |
| expressions/answer/next3 | 1965 | +2% | +3% | +9% |
| expressions/load/model | 7764 | 0% | +2% | 🟢 **−14%** |
| large/load/design | 444 | −1% | +3% | 🟢 **−39%** |
| large/load/model | 710 | 0% | +1% | 🟢 **−20%** |
| large/output/data ᶜ | 0.05 | −11% | 0% | +25% |
| large/output/dispose | 52.3 | +1% | +2% | +7% |
| large/output/toJSON | 99.3 | +1% | −2% | 🟢 **−10%** |
| manyPages/load/model | 745 | +1% | +4% | −6% |
| manyPages/pages/last ᶜ | 8.37 | −1% | 0% | +4% |
| manyPages/pages/locale | 33.4 | +1% | +3% | −2% |
| manyPages/pages/next10 | 56.7 | +1% | +2% | 0% |
| manyPages/pages/prev | 26.8 | 0% | +4% | +2% |
| manyPages/pages/preview | 1569 | +1% | +2% | −5% |
| manyPages/pages/validate | 55.3 | +1% | +1% | +2% |
| records-10k/load/data | 688 | 0% | +2% | 🟢 **−15%** |
| records-10k/load/model | 63.9 | +2% | +6% | 🟢 **−35%** |
| records-10k/output/data ᶜ | 0.06 | 0% | 0% | 0% |
| records-10k/output/dispose ᶜ | 12.9 | 0% | +1% | +8% |
| records-10k/output/toJSON | 26.8 | −1% | 0% | +2% |
| records-10k/records/add-row@orders | 274 | +1% | 0% | 🔴 **+69%** |
| records-10k/records/edit-cell@orders | 448 | 0% | −1% | 🔴 **+55%** |
| records-10k/records/filter-change@orders | 498 | 0% | +2% | 🔴 **+20%** |
| records-10k/records/filter-clear@orders | 388 | +2% | +1% | 🔴 **+14%** |
| records-10k/records/filter-set@orders | 392 | +1% | +2% | +10% |
| records-10k/records/first-visit@orders | 510 | 0% | 0% | 🔴 **+25%** |
| records-10k/records/last@orders | 171 | +1% | +1% | 🟢 **−47%** |
| records-10k/records/next@orders | 269 | +1% | 0% | 🟢 **−37%** |
| records-10k/records/prev@orders | 169 | +2% | 0% | 🟢 **−49%** |
| records-10k/records/remove-row@orders | 786 | 0% | +1% | 🟢 **−26%** |
| records-10k/records/sort-1@orders | 178 | −1% | 0% | 🟢 **−47%** |
| records-10k/records/sort-3@orders | 214 | −1% | +1% | 🟢 **−42%** |
| records-10k/records/sort-reverse@orders | 184 | +2% | −1% | 🟢 **−45%** |
| records-1k/load/data | 192 | 0% | +1% | 🔴 **+27%** |
| records-1k/load/model | 64.6 | −1% | +4% | 🟢 **−36%** |
| records-1k/records/filter-set@orders | 251 | 0% | +1% | 🟢 **−25%** |
| records-1k/records/next@orders | 98.8 | +1% | +1% | 🟢 **−77%** |
| records-1k/records/next@ordersPanel | 23.1 | +1% | +3% | 🟢 **−73%** |
| records-1k/records/sort-1@orders | 57.4 | +1% | +1% | 🟢 **−82%** |
| records-1k/records/sort-1@ordersPanel | 34.1 | 0% | +2% | 🟢 **−71%** |
| records-plain/records/next@panelsPaged | 21.1 | −1% | −1% | 🟢 **−64%** |
| records-plain/records/sort-1@orders30 | 47.7 | +2% | +3% | 🟢 **−85%** |
| records-plain/records/sort-1@ordersPaged | 21.7 | 0% | −1% | 🟢 **−79%** |
| records-plain/records/sort-1@panels30 | 35.5 | 0% | −1% | 🟢 **−67%** |
| records-plain/records/sort-1@panelsPaged | 21.1 | 0% | +2% | 🟢 **−51%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 1D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | +13% | −12%..+38% | +17% | −9% | +12% | +17% | +17% | 🔴 |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −15% | −24%..−1% | −16% | −15% | −3% | −16% | −15% | 🔴 |
| calculations/answer/next3 | −18% | −21%..−16% | −18% | −18% | −17% | −19% | −20% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/next3 | −20% | −21%..−18% | −19% | −19% | −21% | −20% | −20% | 🟢 |
| calculations/load/model | −17% | −21%..−13% | −17% | −14% | −16% | −19% | −18% | 🟢 |
| complexLogic/load/model | −21% | −22%..−20% | −21% | −20% | −21% | −22% | −21% | 🟢 |
| expressions/answer/first | +10% | +6%..+16% | +12% | +9% | +14% | +9% | +10% | 🟢 |
| expressions/load/model | −14% | −15%..−13% | −15% | −14% | −14% | −14% | −14% | 🟢 |
| large/load/design | −39% | −40%..−38% | −39% | −39% | −39% | −39% | −39% | 🟢 |
| large/load/model | −20% | −22%..−17% | −18% | −20% | −21% | −20% | −18% | 🟢 |
| large/output/toJSON | −10% | −12%..−8% | −11% | −11% | −9% | −11% | −11% | 🟢 |
| records-10k/load/data | −15% | −16%..−14% | −15% | −15% | −15% | −15% | −15% | 🟢 |
| records-10k/load/model | −35% | −38%..−33% | −34% | −35% | −36% | −35% | −37% | 🟢 |
| records-10k/records/add-row@orders | +69% | +66%..+73% | +71% | +70% | +69% | +67% | +68% | 🟢 |
| records-10k/records/edit-cell@orders | +55% | +54%..+59% | +55% | +57% | +55% | +55% | +57% | 🟢 |
| records-10k/records/filter-change@orders | +20% | +18%..+22% | +19% | +21% | +19% | +20% | +20% | 🟢 |
| records-10k/records/filter-clear@orders | +14% | +10%..+17% | +12% | +16% | +11% | +13% | +14% | 🟢 |
| records-10k/records/first-visit@orders | +25% | +22%..+27% | +26% | +25% | +26% | +25% | +23% | 🟢 |
| records-10k/records/last@orders | −47% | −48%..−46% | −47% | −47% | −47% | −46% | −46% | 🟢 |
| records-10k/records/next@orders | −37% | −39%..−36% | −39% | −38% | −37% | −37% | −36% | 🟢 |
| records-10k/records/prev@orders | −49% | −51%..−48% | −49% | −50% | −49% | −49% | −49% | 🟢 |
| records-10k/records/remove-row@orders | −26% | −28%..−24% | −25% | −27% | −27% | −24% | −26% | 🟢 |
| records-10k/records/sort-1@orders | −47% | −48%..−45% | −47% | −46% | −48% | −46% | −46% | 🟢 |
| records-10k/records/sort-3@orders | −42% | −44%..−40% | −43% | −43% | −41% | −41% | −42% | 🟢 |
| records-10k/records/sort-reverse@orders | −45% | −47%..−43% | −45% | −44% | −45% | −47% | −46% | 🟢 |
| records-1k/load/data | +27% | +22%..+32% | +26% | +24% | +28% | +27% | +30% | 🟢 |
| records-1k/load/model | −36% | −37%..−35% | −36% | −37% | −36% | −36% | −37% | 🟢 |
| records-1k/records/filter-set@orders | −25% | −28%..−21% | −26% | −25% | −24% | −22% | −26% | 🟢 |
| records-1k/records/next@orders | −77% | −78%..−76% | −76% | −77% | −77% | −77% | −77% | 🟢 |
| records-1k/records/next@ordersPanel | −73% | −75%..−71% | −73% | −74% | −72% | −74% | −74% | 🟢 |
| records-1k/records/sort-1@orders | −82% | −83%..−81% | −82% | −83% | −82% | −82% | −82% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −71% | −72%..−70% | −71% | −70% | −71% | −71% | −71% | 🟢 |
| records-plain/records/next@panelsPaged | −64% | −64%..−61% | −62% | −62% | −63% | −63% | −62% | 🟢 |
| records-plain/records/sort-1@orders30 | −85% | −86%..−84% | −85% | −85% | −85% | −85% | −84% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −79% | −80%..−78% | −80% | −80% | −78% | −79% | −78% | 🟢 |
| records-plain/records/sort-1@panels30 | −67% | −69%..−65% | −65% | −68% | −67% | −67% | −68% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −51% | −54%..−48% | −52% | −49% | −52% | −51% | −53% | 🟢 |

## Counters (information)
- calculations/load/model (30D): expressionRuns 4472 → 2401 (work), conditionsPasses 5 → 4 (work)
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
