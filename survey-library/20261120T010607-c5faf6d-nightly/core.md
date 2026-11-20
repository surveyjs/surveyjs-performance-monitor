# survey-library · core · 20.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44651017293

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 68.3 | −7% | −6% | −24% 🟢 **work** |
| calculations/answer/next3 | 136 | −18% | −18% | 🟢 **−34%** 🟢 **work** ʳ |
| calculations/load/model | 285 | +5% | +1% | 🟢 **−58%** 🟢 **work** ʳ |
| complexLogic/answer/first | 327 | +2% | +6% | 🟢 **−56%** 🟢 **work** ʳ |
| complexLogic/answer/next3 | 489 | −1% | +1% | 🟢 **−70%** 🟢 **work** ʳ |
| complexLogic/load/design | 1239 | 0% | +1% | n/a¹ |
| complexLogic/load/model | 2248 | +1% | +2% | 🟢 **−62%** ʳ |
| complexLogic/output/data ᶜ | 0.32 | −6% | 0% | −14% |
| complexLogic/output/dispose | 48.8 | +2% | +5% | +3% |
| complexLogic/output/toJSON | 74.4 | 0% | −2% | −20% |
| expressions/answer/first | 1274 | +6% | +11% | 🟢 **−53%** 🟢 **work** ʳ |
| expressions/answer/next3 | 2610 | +4% | +10% | 🟢 **−53%** 🟢 **work** ʳ |
| expressions/load/model | 8024 | +2% | +2% | −23% |
| large/load/design | 438 | +1% | +3% | 🟢 **−45%** ʳ |
| large/load/model | 704 | +1% | −11% | −26% |
| large/output/data ᶜ | 0.07 | +8% | 0% | 0% |
| large/output/dispose | 49.3 | +3% | 0% | −1% |
| large/output/toJSON | 90.6 | 0% | −12% | 🟢 **−43%** ʳ |
| manyPages/load/model | 621 | +2% | −9% | −8% |
| manyPages/pages/last ᶜ | 9.63 | −13% | +8% | −18% |
| manyPages/pages/locale | 35.6 | +6% | −1% | −16% |
| manyPages/pages/next10 | 63.7 | +2% | 0% | −17% |
| manyPages/pages/prev | 31.3 | +2% | +2% | −15% |
| manyPages/pages/preview | 1192 | +5% | +5% | −18% |
| manyPages/pages/validate | 71.6 | +1% | −1% | −16% |
| records-10k/load/data | 691 | +1% | 🟢 **−45%** ʳ | −15% 🔴 **work** |
| records-10k/load/model | 62.1 | +4% | 🟢 **−34%** ʳ | +2% |
| records-10k/output/data ᶜ | 0.12 | 0% | 0% | −14% |
| records-10k/output/dispose ᶜ | 8.78 | +17% | −11% | +2% |
| records-10k/output/toJSON | 33.8 | 0% | −3% | 🟢 **−36%** ʳ |
| records-10k/records/add-row@orders | 479 | −1% | 0% | 🔴 **+65%** 🔴 **work** ʳ |
| records-10k/records/edit-cell@orders | 339 | −2% | +3% | 🔴 **+51%** 🔴 **work** ʳ |
| records-10k/records/filter-change@orders | 383 | 0% | −1% | +3% 🔴 **work** |
| records-10k/records/filter-clear@orders | 390 | 0% | −2% | +6% 🔴 **work** |
| records-10k/records/filter-set@orders | 498 | +1% | −1% | +10% 🔴 **work** |
| records-10k/records/first-visit@orders | 402 | +1% | −3% | +8% 🔴 **work** |
| records-10k/records/last@orders | 169 | +1% | +1% | 🟢 **−51%** 🔴 **work** ʳ |
| records-10k/records/next@orders | 274 | −1% | +1% | 🟢 **−43%** 🔴 **work** ʳ |
| records-10k/records/prev@orders | 232 | +1% | 0% | 🟢 **−47%** 🔴 **work** ʳ |
| records-10k/records/remove-row@orders | 597 | 0% | 🟢 **−47%** ʳ | 🟢 **−34%** 🔴 **work** ʳ |
| records-10k/records/sort-1@orders | 248 | 0% | 0% | 🟢 **−41%** 🔴 **work** ʳ |
| records-10k/records/sort-3@orders | 202 | −1% | −2% | 🟢 **−38%** 🔴 **work** ʳ |
| records-10k/records/sort-reverse@orders | 179 | +1% | +1% | 🟢 **−49%** 🔴 **work** ʳ |
| records-1k/load/data | 352 | −2% | −6% | +26% 🔴 **work** |
| records-1k/load/model | 63.4 | +4% | 🟢 **−34%** ʳ | +3% |
| records-1k/records/filter-set@orders | 248 | +2% | −4% | 🟢 **−30%** 🔴 **work** ʳ |
| records-1k/records/next@orders | 71.3 | 0% | +2% | 🟢 **−82%** 🔴 **work** ʳ |
| records-1k/records/next@ordersPanel | 35.4 | +3% | +2% | 🟢 **−78%** 🟢 **work** ʳ |
| records-1k/records/sort-1@orders | 104 | +3% | −1% | 🟢 **−81%** 🔴 **work** ʳ |
| records-1k/records/sort-1@ordersPanel | 22.9 | +2% | 0% | 🟢 **−71%** 🟢 **work** ʳ |
| records-plain/records/next@panelsPaged | 19.7 | 0% | 0% | 🟢 **−68%** 🔴 **work** ʳ |
| records-plain/records/sort-1@orders30 | 36.2 | 0% | −3% | 🟢 **−88%** 🟢 **work** ʳ |
| records-plain/records/sort-1@ordersPaged | 21.3 | +1% | −3% | 🟢 **−81%** 🔴 **work** ʳ |
| records-plain/records/sort-1@panels30 | 33.6 | +1% | −4% | 🟢 **−71%** 🟢 **work** ʳ |
| records-plain/records/sort-1@panelsPaged | 21.1 | −3% | 0% | 🟢 **−53%** 🔴 **work** ʳ |

n/a:
- ¹ timeout 300 s

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/next3 | 30D | 135 | 203 | −34% | −34% | −34% | −34% | −33% | −31% | yes |
| calculations/load/model | 30D | 287 | 692 | −58% | −58% | −59% | −58% | −58% | −59% | yes |
| complexLogic/answer/first | 30D | 330 | 747 | −56% | −57% | −56% | −57% | −54% | −57% | yes |
| complexLogic/answer/next3 | 30D | 495 | 1671 | −70% | −71% | −70% | −70% | −71% | −71% | yes |
| complexLogic/load/model | 30D | 2244 | 5829 | −62% | −62% | −61% | −61% | −62% | −61% | yes |
| expressions/answer/first | 30D | 1273 | 2710 | −53% | −53% | −53% | −53% | −53% | −53% | yes |
| expressions/answer/next3 | 30D | 2578 | 5524 | −53% | −53% | −53% | −53% | −53% | −55% | yes |
| large/load/design | 30D | 437 | 792 | −45% | −45% | −45% | −46% | −46% | −44% | yes |
| large/load/model | 30D | 703 | 944 | −26% | −25% | −27% | −24% | −25% | −26% | no |
| large/output/toJSON | 30D | 91.4 | 160 | −43% | −40% | −42% | −45% | −43% | −43% | yes |
| records-10k/load/data | 7D | 689 | 1256 | −45% | −46% | −45% | −45% | −45% | −45% | yes |
| records-10k/load/model | 7D | 62.5 | 95 | −34% | −36% | −34% | −31% | −37% | −33% | yes |
| records-10k/output/toJSON | 30D | 34.4 | 53.9 | −36% | −39% | −34% | −38% | −35% | −33% | yes |
| records-10k/records/add-row@orders | 30D | 482 | 291 | +65% | +64% | +68% | +70% | +61% | +63% | yes |
| records-10k/records/edit-cell@orders | 30D | 340 | 226 | +51% | +54% | +51% | +46% | +49% | +54% | yes |
| records-10k/records/last@orders | 30D | 168 | 344 | −51% | −50% | −52% | −52% | −51% | −51% | yes |
| records-10k/records/next@orders | 30D | 275 | 481 | −43% | −42% | −44% | −43% | −42% | −43% | yes |
| records-10k/records/prev@orders | 30D | 228 | 433 | −47% | −48% | −47% | −48% | −45% | −48% | yes |
| records-10k/records/remove-row@orders | 7D | 596 | 1127 | −47% | −47% | −48% | −47% | −46% | −46% | yes |
| records-10k/records/remove-row@orders | 30D | 597 | 905 | −34% | −34% | −35% | −34% | −34% | −34% | yes |
| records-10k/records/sort-1@orders | 30D | 248 | 419 | −41% | −41% | −41% | −40% | −41% | −40% | yes |
| records-10k/records/sort-3@orders | 30D | 206 | 329 | −38% | −36% | −35% | −39% | −38% | −38% | yes |
| records-10k/records/sort-reverse@orders | 30D | 179 | 351 | −49% | −48% | −47% | −50% | −49% | −50% | yes |
| records-1k/load/data | 30D | 353 | 281 | +26% | +26% | +20% | +27% | +27% | +23% | no |
| records-1k/load/model | 7D | 63.6 | 96 | −34% | −34% | −34% | −34% | −33% | −33% | yes |
| records-1k/records/filter-set@orders | 30D | 249 | 357 | −30% | −31% | −33% | −30% | −31% | −29% | yes |
| records-1k/records/next@orders | 30D | 70.4 | 391 | −82% | −82% | −82% | −82% | −82% | −82% | yes |
| records-1k/records/next@ordersPanel | 30D | 35.4 | 161 | −78% | −78% | −78% | −79% | −78% | −77% | yes |
| records-1k/records/sort-1@orders | 30D | 104 | 547 | −81% | −81% | −81% | −81% | −81% | −80% | yes |
| records-1k/records/sort-1@ordersPanel | 30D | 22.9 | 78.4 | −71% | −70% | −70% | −72% | −72% | −71% | yes |
| records-plain/records/next@panelsPaged | 30D | 19.5 | 60.1 | −68% | −67% | −66% | −69% | −69% | −68% | yes |
| records-plain/records/sort-1@orders30 | 30D | 36.2 | 307 | −88% | −88% | −88% | −88% | −89% | −88% | yes |
| records-plain/records/sort-1@ordersPaged | 30D | 21.6 | 111 | −81% | −80% | −81% | −80% | −81% | −81% | yes |
| records-plain/records/sort-1@panels30 | 30D | 34.5 | 117 | −71% | −70% | −70% | −71% | −72% | −69% | yes |
| records-plain/records/sort-1@panelsPaged | 30D | 21 | 45.1 | −53% | −53% | −52% | −53% | −54% | −55% | yes |

## Counters (judged)
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
