# survey-library · core · 17.11.2026 20:28 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 7763 × 27, AMD EPYC 9V74 × 21, AMD EPYC 9V45 × 9, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44169583629

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 8387 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 3202 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 3198 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 6693 | 25 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/answer/first | 54.1 | +1% | +3% | 🟢 **−55%** ʳ |
| calculations/answer/next3 | 255 | −1% | −3% | 🟢 **−59%** ʳ |
| calculations/load/model | 259 | −1% | 0% | 🟢 **−72%** ʳ |
| complexLogic/answer/first | 384 | +2% | 0% | 🟢 **−95%** ʳ |
| complexLogic/answer/next3 | 530 | −2% | +3% | 🟢 **−97%** ʳ |
| complexLogic/load/design | 1250 | −1% | −1% | n/a¹ |
| complexLogic/load/model | 2971 | −2% | −1% | 🟢 **−82%** ʳ |
| complexLogic/output/data ᶜ | 0.45 | −2% | −2% | −10% |
| complexLogic/output/dispose | 67.3 | −1% | −1% | n/a¹ |
| complexLogic/output/toJSON | 113 | −2% | +2% | −25% |
| expressions/answer/first | 853 | 0% | −2% | 🟢 **−58%** ʳ |
| expressions/answer/next3 | 1720 | +1% | +1% | 🟢 **−58%** ʳ |
| expressions/load/model | 5412 | +1% | 0% | 🟢 **−45%** ʳ |
| large/load/design | 430 | −1% | +1% | 🟢 **−71%** ʳ |
| large/load/model | 761 | −6% | −6% | 🟢 **−56%** ʳ |
| large/output/data ᶜ | 0.08 | 0% | 0% | −11% |
| large/output/dispose | 45.7 | +1% | +1% | 🟢 **−78%** ʳ |
| large/output/toJSON | 108 | −1% | −2% | 🟢 **−38%** ʳ |
| manyPages/load/model | 786 | 0% | 0% | −15% |
| manyPages/pages/last ᶜ | 13.9 | +2% | −3% | −18% |
| manyPages/pages/locale | 30.5 | −1% | −2% | −11% |
| manyPages/pages/next10 | 54.2 | −1% | −2% | −13% |
| manyPages/pages/prev | 31.2 | +1% | 0% | −13% |
| manyPages/pages/preview | 1637 | +8% | 0% | 🟢 **−47%** ʳ |
| manyPages/pages/validate | 59 | −1% | −3% | −8% |
| records-10k/load/data | 2095 | 0% | 0% | 🔴 **+106%** ʳ ⚑ |
| records-10k/load/model | 91.8 | +1% | −3% | 🔴 **+54%** ʳ ⚑ |
| records-10k/output/data ᶜ | 0.1 | −5% | 0% | −9% ⚑ |
| records-10k/output/dispose ᶜ | 13.4 | +1% | +4% | +8% ⚑ |
| records-10k/output/toJSON | 21.2 | −8% | 0% | 🟢 **−34%** ʳ ⚑ |
| records-10k/records/add-row@orders | 276 | +1% | 0% | n/a² |
| records-10k/records/edit-cell@orders | 595 | 0% | +1% | n/a² |
| records-10k/records/filter-change@orders | 396 | −1% | +1% | n/a² |
| records-10k/records/filter-clear@orders | 404 | +1% | +1% | n/a² |
| records-10k/records/filter-set@orders | 515 | 0% | +1% | n/a² |
| records-10k/records/first-visit@orders | 679 | −1% | 0% | n/a³ |
| records-10k/records/last@orders | 176 | −2% | 0% | n/a² |
| records-10k/records/next@orders | 357 | 0% | +1% | n/a² |
| records-10k/records/prev@orders | 295 | 0% | 0% | n/a² |
| records-10k/records/remove-row@orders | 1153 | 0% | 0% | n/a² |
| records-10k/records/sort-1@orders | 174 | −1% | 0% | n/a² |
| records-10k/records/sort-3@orders | 215 | −2% | 0% | n/a² |
| records-10k/records/sort-reverse@orders | 332 | 0% | −1% | n/a² |
| records-1k/load/data | 195 | 0% | +1% | 🔴 **+273%** ʳ ⚑ |
| records-1k/load/model | 156 | +1% | 0% | 🔴 **+44%** ʳ ⚑ |
| records-1k/records/filter-set@orders | 325 | +1% | +3% | n/a² |
| records-1k/records/next@orders | 133 | +1% | 0% | n/a² |
| records-1k/records/next@ordersPanel | 22.5 | +1% | −1% | n/a² |
| records-1k/records/sort-1@orders | 58.5 | −2% | 0% | n/a² |
| records-1k/records/sort-1@ordersPanel | 25.3 | +3% | 0% | n/a² |
| records-plain/records/next@panelsPaged | 18.8 | −2% | 0% | n/a⁴ |
| records-plain/records/sort-1@orders30 | 36.5 | −2% | −1% | n/a⁵ |
| records-plain/records/sort-1@ordersPaged | 37.9 | −2% | +1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 55.3 | +1% | 0% | n/a⁴ |
| records-plain/records/sort-1@panelsPaged | 21.1 | +3% | 0% | n/a⁴ |

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
- calculations/answer/first (month): −55% · −55% · −55% · −54% · −56% → −55% (53.2 / 118 ms) — every repeat agrees
- calculations/answer/next3 (month): −58% · −60% · −59% · −57% · −61% → −59% (257 / 623 ms) — every repeat agrees
- calculations/load/model (month): −71% · −71% · −72% · −73% · −72% → −72% (263 / 940 ms) — every repeat agrees
- complexLogic/answer/first (month): −94% · −95% · −95% · −95% · −95% → −95% (380 / 7220 ms) — every repeat agrees
- complexLogic/answer/next3 (month): −97% · −97% · −96% · −97% · −97% → −97% (549 / 16451 ms) — every repeat agrees
- complexLogic/load/model (month): −82% · −82% · −83% · −83% · −83% → −82% (2905 / 16520 ms) — every repeat agrees
- expressions/answer/first (month): −57% · −59% · −56% · −57% · −59% → −58% (856 / 2033 ms) — every repeat agrees
- expressions/answer/next3 (month): −55% · −57% · −59% · −59% · −58% → −58% (1717 / 4054 ms) — every repeat agrees
- expressions/load/model (month): −44% · −44% · −45% · −44% · −45% → −45% (5393 / 9720 ms) — every repeat agrees
- large/load/design (month): −72% · −71% · −71% · −72% · −72% → −71% (425 / 1485 ms) — every repeat agrees
- large/load/model (month): −56% · −55% · −57% · −56% · −56% → −56% (758 / 1722 ms) — every repeat agrees
- large/output/dispose (month): −78% · −78% · −77% · −77% · −78% → −78% (46.5 / 211 ms) — every repeat agrees
- large/output/toJSON (month): −40% · −36% · −36% · −40% · −38% → −38% (105 / 170 ms) — every repeat agrees
- manyPages/pages/preview (month): −47% · −47% · −47% · −47% · −47% → −47% (1566 / 2956 ms) — every repeat agrees
- records-10k/load/data (month): +108% · +100% · +105% · +106% · +105% → +106% (2095 / 1019 ms) — every repeat agrees
- records-10k/load/model (month): +55% · +52% · +55% · +53% · +52% → +54% (92.1 / 59.9 ms) — every repeat agrees
- records-10k/output/toJSON (month): −28% · −29% · −36% · −37% · −37% → −34% (21.6 / 32.6 ms) — every repeat agrees
- records-1k/load/data (month): +273% · +277% · +283% · +273% · +269% → +273% (195 / 52.4 ms) — every repeat agrees
- records-1k/load/model (month): +46% · +44% · +46% · +43% · +44% → +44% (156 / 108 ms) — every repeat agrees

## Work counters (information)
- calculations/answer/first (month): expressionRuns 1470 → 184
- calculations/answer/next3 (month): expressionRuns 4386 → 526
- calculations/load/model (month): expressionRuns 5169 → 2401
- complexLogic/answer/first (month): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/next3 (month): conditionRuns 14688 → 546, expressionRuns 7040 → 487
- expressions/answer/first (month): conditionRuns 7782 → 186
- expressions/answer/next3 (month): conditionRuns 15564 → 525
- records-10k/load/data (month): conditionRuns 40000 → 40040, expressionRuns 120 → 60770, panelsCreated 0 → 10
- records-10k/output/toJSON (month): jsonLength 47391 → 47529
- records-1k/load/data (month): conditionRuns 4000 → 4040, expressionRuns 120 → 6770, panelsCreated 0 → 10

Δ = today / build − 1.
