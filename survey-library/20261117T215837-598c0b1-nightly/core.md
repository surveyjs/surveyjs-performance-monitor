# survey-library · core · 17.11.2026 21:58 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 9V74 × 26, AMD EPYC 9V45 × 16, AMD EPYC 7763 × 16, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 2 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44185307540

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 8142 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 3150 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 3129 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 5087 | 26 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/answer/first | 72.4 | 0% | +4% | 🟢 **−56%** ʳ |
| calculations/answer/next3 | 196 | −3% | −2% | 🟢 **−60%** ʳ |
| calculations/load/model | 322 | −1% | +1% | 🟢 **−65%** ʳ |
| complexLogic/answer/first | 278 | −1% | +1% | 🟢 **−95%** ʳ |
| complexLogic/answer/next3 | 684 | −2% | 0% | n/a¹ |
| complexLogic/load/design | 1245 | −1% | −1% | n/a¹ |
| complexLogic/load/model | 2195 | −1% | −1% | 🟢 **−84%** ʳ |
| complexLogic/output/data ᶜ | 0.59 | +4% | 0% | −9% |
| complexLogic/output/dispose | 64.3 | −1% | −1% | n/a¹ |
| complexLogic/output/toJSON | 114 | −1% | +2% | 🟢 **−26%** ʳ |
| expressions/answer/first | 905 | −3% | +2% | 🟢 **−59%** ʳ |
| expressions/answer/next3 | 1737 | −1% | −1% | 🟢 **−57%** ʳ |
| expressions/load/model | 7784 | −1% | 0% | 🟢 **−44%** ʳ |
| large/load/design | 418 | 0% | +1% | 🟢 **−71%** ʳ |
| large/load/model | 1385 | −5% | −6% | 🟢 **−55%** ʳ |
| large/output/data ᶜ | 0.07 | 0% | 0% | 0% |
| large/output/dispose | 44 | +1% | −2% | 🟢 **−79%** ʳ |
| large/output/toJSON | 99.8 | −3% | −3% | 🟢 **−32%** ʳ |
| manyPages/load/model | 903 | −1% | +1% | −19% |
| manyPages/pages/last ᶜ | 11.7 | +1% | +3% | −17% |
| manyPages/pages/locale | 22.9 | 0% | −1% | −17% |
| manyPages/pages/next10 | 64.8 | +1% | 0% | −13% |
| manyPages/pages/prev | 31.4 | −2% | 0% | −10% |
| manyPages/pages/preview | 1146 | −1% | +1% | 🟢 **−41%** ʳ |
| manyPages/pages/validate | 74.8 | 0% | 0% | −11% |
| records-10k/load/data | 1949 | 0% | 0% | 🔴 **+106%** ʳ ⚑ |
| records-10k/load/model | 92.1 | −1% | −1% | 🔴 **+52%** ʳ ⚑ |
| records-10k/output/data ᶜ | 0.11 | −8% | −8% | −15% ⚑ |
| records-10k/output/dispose ᶜ | 8.55 | 0% | 0% | −8% ⚑ |
| records-10k/output/toJSON | 34.5 | +1% | −1% | 🟢 **−33%** ʳ ⚑ |
| records-10k/records/add-row@orders | 275 | +1% | −1% | n/a² |
| records-10k/records/edit-cell@orders | 458 | 0% | 0% | n/a² |
| records-10k/records/filter-change@orders | 647 | 0% | 0% | n/a² |
| records-10k/records/filter-clear@orders | 376 | 0% | 0% | n/a² |
| records-10k/records/filter-set@orders | 399 | +1% | +1% | n/a² |
| records-10k/records/first-visit@orders | 415 | +1% | 0% | n/a³ |
| records-10k/records/last@orders | 170 | −1% | +1% | n/a² |
| records-10k/records/next@orders | 207 | +2% | +1% | n/a² |
| records-10k/records/prev@orders | 239 | 0% | −1% | n/a² |
| records-10k/records/remove-row@orders | 1145 | 0% | 0% | n/a² |
| records-10k/records/sort-1@orders | 181 | 0% | 0% | n/a² |
| records-10k/records/sort-3@orders | 203 | −1% | 0% | n/a² |
| records-10k/records/sort-reverse@orders | 331 | +1% | 0% | n/a² |
| records-1k/load/data | 199 | −2% | −2% | 🔴 **+278%** ʳ ⚑ |
| records-1k/load/model | 176 | 0% | 0% | 🔴 **+42%** ʳ ⚑ |
| records-1k/records/filter-set@orders | 265 | 0% | 0% | n/a² |
| records-1k/records/next@orders | 95.6 | 0% | 0% | n/a² |
| records-1k/records/next@ordersPanel | 22.6 | 0% | +2% | n/a² |
| records-1k/records/sort-1@orders | 58.5 | −1% | +2% | n/a² |
| records-1k/records/sort-1@ordersPanel | 20.6 | −2% | 0% | n/a² |
| records-plain/records/next@panelsPaged | 35 | +1% | 0% | n/a⁴ |
| records-plain/records/sort-1@orders30 | 32.2 | −3% | −1% | n/a⁵ |
| records-plain/records/sort-1@ordersPaged | 22.8 | 0% | +1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 37.1 | −1% | 0% | n/a⁴ |
| records-plain/records/sort-1@panelsPaged | 20.6 | −2% | 0% | n/a⁴ |

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
- calculations/answer/first (month): −57% · −56% · −55% · −57% · −56% → −56% (72.4 / 164 ms) — every repeat agrees
- calculations/answer/next3 (month): −59% · −60% · −60% · −61% · −60% → −60% (192 / 481 ms) — every repeat agrees
- calculations/load/model (month): −64% · −64% · −65% · −64% · −65% → −65% (321 / 910 ms) — every repeat agrees
- complexLogic/answer/first (month): −95% · −95% · −95% · −95% · −95% → −95% (280 / 5599 ms) — every repeat agrees
- complexLogic/load/model (month): −84% · −84% · −84% · −84% · −85% → −84% (2191 / 13991 ms) — every repeat agrees
- complexLogic/output/toJSON (month): −26% · −27% · −28% · −25% · −26% → −26% (114 / 155 ms) — every repeat agrees
- expressions/answer/first (month): −61% · −58% · −60% · −58% · −59% → −59% (901 / 2204 ms) — every repeat agrees
- expressions/answer/next3 (month): −55% · −58% · −57% · −56% · −57% → −57% (1745 / 4043 ms) — every repeat agrees
- expressions/load/model (month): −45% · −43% · −44% · −45% · −44% → −44% (7753 / 13943 ms) — every repeat agrees
- large/load/design (month): −71% · −70% · −70% · −71% · −70% → −71% (406 / 1380 ms) — every repeat agrees
- large/load/model (month): −55% · −56% · −56% · −56% · −56% → −55% (1368 / 3072 ms) — every repeat agrees
- large/output/dispose (month): −81% · −79% · −78% · −78% · −79% → −79% (42.5 / 203 ms) — every repeat agrees
- large/output/toJSON (month): −32% · −33% · −30% · −29% · −33% → −32% (99.4 / 146 ms) — every repeat agrees
- manyPages/pages/preview (month): −43% · −42% · −42% · −41% · −40% → −41% (1150 / 1952 ms) — every repeat agrees
- records-10k/load/data (month): +105% · +106% · +106% · +105% · +106% → +106% (1950 / 945 ms) — every repeat agrees
- records-10k/load/model (month): +51% · +56% · +52% · +51% · +52% → +52% (92 / 60.4 ms) — every repeat agrees
- records-10k/output/toJSON (month): −35% · −36% · −35% · −29% · −31% → −33% (34.8 / 52.2 ms) — every repeat agrees
- records-1k/load/data (month): +265% · +268% · +288% · +300% · +267% → +278% (199 / 52.8 ms) — every repeat agrees
- records-1k/load/model (month): +44% · +43% · +41% · +44% · +42% → +42% (174 / 123 ms) — every repeat agrees

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
