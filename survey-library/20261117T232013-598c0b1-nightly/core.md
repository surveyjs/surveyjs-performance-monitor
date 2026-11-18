# survey-library · core · 17.11.2026 23:20 UTC

> CPU: Intel Xeon 6975P-C × 75, AMD EPYC 9V74 × 21, AMD EPYC 7763 × 15, AMD EPYC 9V45 × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3, INTEL XEON PLATINUM 8573C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44198421945

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 8042 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 3080 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 3065 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 5121 | 26 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/answer/first | 59.2 | 0% | +2% | 🟢 **−58%** ʳ |
| calculations/answer/next3 | 168 | −2% | 0% | 🟢 **−59%** ʳ |
| calculations/load/model | 270 | 0% | +1% | 🟢 **−72%** ʳ |
| complexLogic/answer/first | 293 | +1% | +1% | 🟢 **−95%** ʳ |
| complexLogic/answer/next3 | 528 | 0% | +2% | n/a¹ |
| complexLogic/load/design | 1256 | 0% | 0% | n/a¹ |
| complexLogic/load/model | 2718 | −1% | 0% | 🟢 **−83%** ʳ |
| complexLogic/output/data ᶜ | 0.34 | 0% | +6% | −21% |
| complexLogic/output/dispose | 50.1 | 0% | −1% | n/a¹ |
| complexLogic/output/toJSON | 72.5 | +3% | +2% | 🟢 **−32%** ʳ |
| expressions/answer/first | 1140 | 0% | −1% | 🟢 **−58%** ʳ |
| expressions/answer/next3 | 2305 | −1% | +3% | 🟢 **−58%** ʳ |
| expressions/load/model | 5409 | 0% | 0% | 🟢 **−44%** ʳ |
| large/load/design | 777 | −1% | 0% | 🟢 **−71%** ʳ |
| large/load/model | 741 | −7% | −6% | 🟢 **−57%** ʳ |
| large/output/data ᶜ | 0.07 | 0% | −12% | −12% |
| large/output/dispose | 41.7 | −2% | −3% | 🟢 **−79%** ʳ |
| large/output/toJSON | 123 | +2% | −2% | 🟢 **−33%** ʳ |
| manyPages/load/model | 783 | −1% | 0% | −16% |
| manyPages/pages/last ᶜ | 9.7 | −26% | −23% | −8% |
| manyPages/pages/locale | 28.9 | 0% | −2% | −13% |
| manyPages/pages/next10 | 76.2 | 0% | 0% | −16% |
| manyPages/pages/prev | 24.3 | +1% | +3% | −10% |
| manyPages/pages/preview | 1143 | −1% | −1% | 🟢 **−40%** ʳ |
| manyPages/pages/validate | 104 | +3% | +3% | −10% |
| records-10k/load/data | 1247 | 0% | 0% | 🔴 **+106%** ʳ ⚑ |
| records-10k/load/model | 96.5 | −1% | 0% | 🔴 **+52%** ʳ ⚑ |
| records-10k/output/data ᶜ | 0.07 | 0% | +14% | −12% ⚑ |
| records-10k/output/dispose ᶜ | 9.13 | +12% | +3% | 0% ⚑ |
| records-10k/output/toJSON | 20.3 | +2% | +1% | 🟢 **−36%** ʳ ⚑ |
| records-10k/records/add-row@orders | 266 | −2% | 0% | n/a² |
| records-10k/records/edit-cell@orders | 449 | 0% | 0% | n/a² |
| records-10k/records/filter-change@orders | 687 | 0% | +2% | n/a² |
| records-10k/records/filter-clear@orders | 496 | −1% | +1% | n/a² |
| records-10k/records/filter-set@orders | 391 | 0% | +1% | n/a² |
| records-10k/records/first-visit@orders | 429 | 0% | +2% | n/a³ |
| records-10k/records/last@orders | 161 | −2% | −1% | n/a² |
| records-10k/records/next@orders | 269 | −1% | 0% | n/a² |
| records-10k/records/prev@orders | 170 | −1% | +1% | n/a² |
| records-10k/records/remove-row@orders | 1126 | −1% | +1% | n/a² |
| records-10k/records/sort-1@orders | 188 | +1% | +1% | n/a² |
| records-10k/records/sort-3@orders | 396 | +1% | +1% | n/a² |
| records-10k/records/sort-reverse@orders | 178 | −2% | −1% | n/a² |
| records-1k/load/data | 201 | +2% | 0% | 🔴 **+276%** ʳ ⚑ |
| records-1k/load/model | 94.9 | −4% | +1% | 🔴 **+54%** ʳ ⚑ |
| records-1k/records/filter-set@orders | 265 | −1% | +1% | n/a² |
| records-1k/records/next@orders | 71.3 | 0% | +1% | n/a² |
| records-1k/records/next@ordersPanel | 34.4 | −1% | 0% | n/a² |
| records-1k/records/sort-1@orders | 53.7 | −1% | −1% | n/a² |
| records-1k/records/sort-1@ordersPanel | 29.6 | 0% | −1% | n/a² |
| records-plain/records/next@panelsPaged | 19.2 | −1% | +1% | n/a⁴ |
| records-plain/records/sort-1@orders30 | 36.8 | +3% | −1% | n/a⁵ |
| records-plain/records/sort-1@ordersPaged | 24.4 | 0% | −1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 53.9 | −2% | −1% | n/a⁴ |
| records-plain/records/sort-1@panelsPaged | 29.5 | +1% | +1% | n/a⁴ |

n/a:
- ¹ timeout 300 s
- ² TypeError: Cannot read properties of undefined (reading 'map')
- ³ Error: check failed: the first row has the largest total: expected 4000, got 32
- ⁴ not in this build: paneldynamic.allowSort
- ⁵ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/data (month): jsonErrors differ from today
- records-10k/load/model (month): jsonErrors differ from today
- records-10k/output/data (month): jsonErrors differ from today
- records-10k/output/dispose (month): jsonErrors differ from today
- records-10k/output/toJSON (month): jsonErrors differ from today
- records-1k/load/data (month): jsonErrors differ from today
- records-1k/load/model (month): jsonErrors differ from today

## Repeats
- calculations/answer/first (month): −58% · −59% · −58% · −57% · −57% → −58% (60 / 142 ms) — every repeat agrees
- calculations/answer/next3 (month): −60% · −60% · −59% · −59% · −58% → −59% (168 / 410 ms) — every repeat agrees
- calculations/load/model (month): −72% · −71% · −72% · −72% · −71% → −72% (267 / 939 ms) — every repeat agrees
- complexLogic/answer/first (month): −95% · −95% · −95% · −95% · −95% → −95% (282 / 5561 ms) — every repeat agrees
- complexLogic/load/model (month): −83% · −83% · −83% · −83% · −83% → −83% (2719 / 15933 ms) — every repeat agrees
- complexLogic/output/toJSON (month): −35% · −27% · −39% · −29% · −34% → −32% (69.2 / 102 ms) — every repeat agrees
- expressions/answer/first (month): −59% · −58% · −59% · −58% · −53% → −58% (1159 / 2774 ms) — every repeat agrees
- expressions/answer/next3 (month): −57% · −59% · −58% · −58% · −57% → −58% (2246 / 5326 ms) — every repeat agrees
- expressions/load/model (month): −46% · −43% · −45% · −44% · −44% → −44% (5416 / 9723 ms) — every repeat agrees
- large/load/design (month): −70% · −71% · −71% · −70% · −71% → −71% (777 / 2636 ms) — every repeat agrees
- large/load/model (month): −56% · −56% · −57% · −57% · −57% → −57% (742 / 1716 ms) — every repeat agrees
- large/output/dispose (month): −77% · −80% · −80% · −79% · −79% → −79% (42.2 / 204 ms) — every repeat agrees
- large/output/toJSON (month): −35% · −32% · −29% · −36% · −35% → −33% (123 / 184 ms) — every repeat agrees
- manyPages/pages/preview (month): −39% · −40% · −40% · −42% · −40% → −40% (1138 / 1896 ms) — every repeat agrees
- records-10k/load/data (month): +101% · +102% · +107% · +112% · +105% → +106% (1238 / 602 ms) — every repeat agrees
- records-10k/load/model (month): +56% · +55% · +50% · +50% · +50% → +52% (96.4 / 63.3 ms) — every repeat agrees
- records-10k/output/toJSON (month): −37% · −33% · −38% · −34% · −39% → −36% (20.3 / 31.8 ms) — every repeat agrees
- records-1k/load/data (month): +273% · +288% · +281% · +280% · +265% → +276% (200 / 53.1 ms) — every repeat agrees
- records-1k/load/model (month): +54% · +57% · +52% · +52% · +53% → +54% (94.5 / 61.6 ms) — every repeat agrees

## Work counters (information)
- calculations/answer/first (month): expressionRuns 1470 → 184
- calculations/answer/next3 (month): expressionRuns 4386 → 526
- calculations/load/model (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- expressions/answer/first (month): conditionRuns 7782 → 186
- expressions/answer/next3 (month): conditionRuns 15564 → 525
- records-10k/load/data (month): conditionRuns 40000 → 40040, expressionRuns 120 → 60770, panelsCreated 0 → 10
- records-10k/output/toJSON (month): jsonLength 47391 → 47529
- records-1k/load/data (month): conditionRuns 4000 → 4040, expressionRuns 120 → 6770, panelsCreated 0 → 10

Δ = today / build − 1.
