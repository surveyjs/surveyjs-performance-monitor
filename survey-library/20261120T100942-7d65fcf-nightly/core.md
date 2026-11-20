# survey-library · core · 20.11.2026 10:09 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44716813729

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 50.8 | −12% | −14% | 🟢 **−31%** |
| calculations/answer/next3 | 137 | −17% | −18% | 🟢 **−35%** |
| calculations/load/model | 400 | +4% | +3% | 🟢 **−58%** |
| complexLogic/answer/first | 408 | +3% | +4% | 🟢 **−58%** |
| complexLogic/answer/next3 | 564 | 0% | −2% | 🟢 **−68%** |
| complexLogic/load/design | 1228 | +2% | +1% | n/a¹ |
| complexLogic/load/model | 2185 | +2% | +2% | 🟢 **−62%** |
| complexLogic/output/data ᶜ | 0.58 | −5% | +5% | −3% |
| complexLogic/output/dispose | 52.6 | +1% | +8% | +3% |
| complexLogic/output/toJSON | 113 | −1% | −4% | −17% |
| expressions/answer/first | 970 | +6% | +12% | 🟢 **−52%** |
| expressions/answer/next3 | 1468 | +4% | +9% | 🟢 **−50%** |
| expressions/load/model | 5913 | +2% | +2% | −22% |
| large/load/design | 445 | +1% | +2% | 🟢 **−44%** |
| large/load/model | 901 | +1% | −10% | −25% |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 64.3 | +3% | 0% | +1% |
| large/output/toJSON | 150 | +3% | −10% | 🟢 **−41%** |
| manyPages/load/model | 719 | +4% | −7% | −5% |
| manyPages/pages/last ᶜ | 11.6 | +4% | −2% | −15% |
| manyPages/pages/locale | 31.4 | +5% | −1% | −15% |
| manyPages/pages/next10 | 53.9 | 0% | +2% | −17% |
| manyPages/pages/prev | 25.5 | +2% | +1% | −17% |
| manyPages/pages/preview | 1200 | +5% | +5% | −17% |
| manyPages/pages/validate | 60.7 | 0% | +1% | −15% |
| records-10k/load/data | 959 | +1% | 🟢 **−40%** | −2% |
| records-10k/load/model | 63.8 | +1% | 🟢 **−33%** | +2% |
| records-10k/output/data ᶜ | 0.12 | 0% | 0% | −14% |
| records-10k/output/dispose ᶜ | 9.94 | +4% | +2% | +2% |
| records-10k/output/toJSON | 20.2 | +1% | −3% | 🟢 **−37%** |
| records-10k/records/add-row@orders | 491 | −1% | 0% | 🔴 **+71%** |
| records-10k/records/edit-cell@orders | 585 | −1% | 0% | 🔴 **+52%** |
| records-10k/records/filter-change@orders | 398 | +1% | −1% | +4% |
| records-10k/records/filter-clear@orders | 478 | +1% | −2% | +13% |
| records-10k/records/filter-set@orders | 660 | +1% | −1% | +12% |
| records-10k/records/first-visit@orders | 410 | +1% | −2% | +17% |
| records-10k/records/last@orders | 170 | +1% | −1% | 🟢 **−51%** |
| records-10k/records/next@orders | 198 | −1% | −1% | 🟢 **−51%** |
| records-10k/records/prev@orders | 172 | 0% | +3% | 🟢 **−52%** |
| records-10k/records/remove-row@orders | 607 | 0% | 🟢 **−47%** | 🟢 **−34%** |
| records-10k/records/sort-1@orders | 337 | +1% | 0% | 🟢 **−40%** |
| records-10k/records/sort-3@orders | 285 | +1% | −1% | 🟢 **−37%** |
| records-10k/records/sort-reverse@orders | 192 | +1% | +1% | 🟢 **−41%** |
| records-1k/load/data | 189 | 0% | −7% | +19% |
| records-1k/load/model | 63 | +3% | 🟢 **−34%** | +6% |
| records-1k/records/filter-set@orders | 399 | 0% | −5% | 🟢 **−32%** |
| records-1k/records/next@orders | 128 | +2% | −1% | 🟢 **−79%** |
| records-1k/records/next@ordersPanel | 22.6 | +4% | 0% | 🟢 **−76%** |
| records-1k/records/sort-1@orders | 56.9 | +1% | 0% | 🟢 **−83%** |
| records-1k/records/sort-1@ordersPanel | 24 | +3% | +4% | 🟢 **−70%** |
| records-plain/records/next@panelsPaged | 20.2 | −5% | +2% | 🟢 **−67%** |
| records-plain/records/sort-1@orders30 | 35.7 | 0% | +1% | 🟢 **−88%** |
| records-plain/records/sort-1@ordersPaged | 38.8 | −2% | 0% | 🟢 **−78%** |
| records-plain/records/sort-1@panels30 | 37.2 | 0% | 0% | 🟢 **−70%** |
| records-plain/records/sort-1@panelsPaged | 21.1 | −1% | −3% | 🟢 **−53%** |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
Counters: 🔴/🟢 the build's value, a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample) · = as today
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Counters

| scenario | counter | today | 1D | 7D | 30D |
|---|---|--:|--:|--:|--:|
| calculations/answer/first | expressionRuns | 184 | = | = | 🟢 **716** |
| calculations/answer/next3 | expressionRuns | 526 | = | = | 🟢 **2140** |
| calculations/load/model | expressionRuns | 2401 | = | = | 🟢 **4772** |
| complexLogic/answer/first | conditionRuns | 222 | = | = | 🟢 **4896** |
| complexLogic/answer/first | expressionRuns | 251 | = | = | 🟢 **2034** |
| complexLogic/answer/next3 | conditionRuns | 546 | = | = | 🟢 **14688** |
| complexLogic/answer/next3 | expressionRuns | 487 | = | = | 🟢 **5884** |
| expressions/answer/first | conditionRuns | 186 | = | = | 🟢 **7782** |
| expressions/answer/next3 | conditionRuns | 525 | = | = | 🟢 **15564** |
| records-10k/load/data | expressionRuns | 60770 | = | = | 🔴 **290** |
| records-10k/records/add-row@orders | expressionRuns | 20555 | = | = | 🔴 **164** |
| records-10k/records/edit-cell@orders | expressionRuns | 20848 | = | = | 🔴 **278** |
| records-10k/records/filter-change@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/filter-clear@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/filter-set@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/first-visit@orders | expressionRuns | 20050 | = | = | 🔴 **80** |
| records-10k/records/last@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/last@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/last@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-10k/records/next@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/next@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/next@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-10k/records/prev@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/prev@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/prev@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-10k/records/remove-row@orders | expressionRuns | 40616 | = | = | 🔴 **280** |
| records-10k/records/sort-1@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/sort-1@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/sort-1@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-10k/records/sort-3@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/sort-3@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/sort-3@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-10k/records/sort-reverse@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-10k/records/sort-reverse@orders | expressionRuns | 20010 | = | = | 🔴 **80** |
| records-10k/records/sort-reverse@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-1k/load/data | expressionRuns | 6770 | = | = | 🔴 **290** |
| records-1k/records/filter-set@orders | expressionRuns | 2050 | = | = | 🔴 **80** |
| records-1k/records/next@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-1k/records/next@orders | expressionRuns | 2010 | = | = | 🔴 **80** |
| records-1k/records/next@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-1k/records/next@ordersPanel | conditionRuns | 10 | = | = | 🟢 **20** |
| records-1k/records/next@ordersPanel | expressionRuns | 20 | = | = | 🟢 **40** |
| records-1k/records/next@ordersPanel | panelsCreated | 0 | = | = | 🟢 **10** |
| records-1k/records/sort-1@orders | conditionRuns | 20 | = | = | 🟢 **40** |
| records-1k/records/sort-1@orders | expressionRuns | 2010 | = | = | 🔴 **80** |
| records-1k/records/sort-1@orders | rowsCreated | 0 | = | = | 🟢 **20** |
| records-1k/records/sort-1@ordersPanel | conditionRuns | 10 | = | = | 🟢 **20** |
| records-1k/records/sort-1@ordersPanel | expressionRuns | 20 | = | = | 🟢 **40** |
| records-1k/records/sort-1@ordersPanel | panelsCreated | 0 | = | = | 🟢 **10** |
| records-plain/records/next@panelsPaged | expressionRuns | 1000 | = | = | 🔴 **20** |
| records-plain/records/next@panelsPaged | panelsCreated | 0 | = | = | 🟢 **10** |
| records-plain/records/sort-1@orders30 | expressionRuns | 30 | = | = | 🟢 **60** |
| records-plain/records/sort-1@orders30 | rowsCreated | 0 | = | = | 🟢 **30** |
| records-plain/records/sort-1@ordersPaged | expressionRuns | 1000 | = | = | 🔴 **20** |
| records-plain/records/sort-1@ordersPaged | rowsCreated | 0 | = | = | 🟢 **10** |
| records-plain/records/sort-1@panels30 | expressionRuns | 30 | = | = | 🟢 **60** |
| records-plain/records/sort-1@panels30 | panelsCreated | 0 | = | = | 🟢 **30** |
| records-plain/records/sort-1@panelsPaged | expressionRuns | 1000 | = | = | 🔴 **20** |
| records-plain/records/sort-1@panelsPaged | panelsCreated | 0 | = | = | 🟢 **10** |

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| records-10k/load/data | −40% | −41% | −40% | −39% | −41% | −41% | 🟢 |
| records-10k/load/model | −33% | −35% | −36% | −35% | −32% | −29% | 🟢 |
| records-10k/records/remove-row@orders | −47% | −48% | −47% | −46% | −48% | −47% | 🟢 |
| records-1k/load/model | −34% | −32% | −34% | −32% | −34% | −36% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | −31% | −31% | −30% | −32% | −30% | −30% | 🟢 |
| calculations/answer/next3 | −35% | −36% | −32% | −33% | −35% | −36% | 🟢 |
| calculations/load/model | −58% | −59% | −58% | −58% | −58% | −58% | 🟢 |
| complexLogic/answer/first | −58% | −58% | −59% | −58% | −58% | −58% | 🟢 |
| complexLogic/answer/next3 | −68% | −68% | −68% | −67% | −68% | −67% | 🟢 |
| complexLogic/load/model | −62% | −60% | −62% | −62% | −61% | −62% | 🟢 |
| expressions/answer/first | −52% | −52% | −51% | −52% | −52% | −53% | 🟢 |
| expressions/answer/next3 | −50% | −52% | −52% | −50% | −50% | −49% | 🟢 |
| large/load/design | −44% | −44% | −43% | −43% | −46% | −43% | 🟢 |
| large/load/model | −25% | −25% | −26% | −24% | −25% | −25% | 🔴 |
| large/output/toJSON | −41% | −44% | −42% | −43% | −39% | −39% | 🟢 |
| records-10k/output/toJSON | −37% | −36% | −41% | −36% | −37% | −39% | 🟢 |
| records-10k/records/add-row@orders | +71% | +72% | +73% | +70% | +72% | +70% | 🟢 |
| records-10k/records/edit-cell@orders | +52% | +53% | +53% | +52% | +51% | +52% | 🟢 |
| records-10k/records/last@orders | −51% | −52% | −51% | −51% | −51% | −52% | 🟢 |
| records-10k/records/next@orders | −51% | −53% | −51% | −51% | −51% | −50% | 🟢 |
| records-10k/records/prev@orders | −52% | −52% | −52% | −52% | −52% | −52% | 🟢 |
| records-10k/records/remove-row@orders | −34% | −33% | −34% | −35% | −34% | −34% | 🟢 |
| records-10k/records/sort-1@orders | −40% | −40% | −40% | −40% | −40% | −42% | 🟢 |
| records-10k/records/sort-3@orders | −37% | −36% | −37% | −38% | −36% | −38% | 🟢 |
| records-10k/records/sort-reverse@orders | −41% | −41% | −44% | −40% | −40% | −39% | 🟢 |
| records-1k/records/filter-set@orders | −32% | −33% | −34% | −31% | −29% | −34% | 🟢 |
| records-1k/records/next@orders | −79% | −79% | −79% | −79% | −78% | −79% | 🟢 |
| records-1k/records/next@ordersPanel | −76% | −77% | −76% | −76% | −76% | −77% | 🟢 |
| records-1k/records/sort-1@orders | −83% | −83% | −83% | −83% | −83% | −84% | 🟢 |
| records-1k/records/sort-1@ordersPanel | −70% | −71% | −71% | −70% | −71% | −69% | 🟢 |
| records-plain/records/next@panelsPaged | −67% | −66% | −67% | −68% | −66% | −67% | 🟢 |
| records-plain/records/sort-1@orders30 | −88% | −88% | −88% | −89% | −88% | −88% | 🟢 |
| records-plain/records/sort-1@ordersPaged | −78% | −78% | −78% | −79% | −78% | −79% | 🟢 |
| records-plain/records/sort-1@panels30 | −70% | −69% | −70% | −70% | −69% | −68% | 🟢 |
| records-plain/records/sort-1@panelsPaged | −53% | −51% | −54% | −54% | −54% | −53% | 🟢 |

## Counters (information)
- records-10k/load/data (30D): conditionRuns 40085 → 40040 (work)
- records-1k/load/data (30D): conditionRuns 4085 → 4040 (work)

Δ = today / build − 1.
