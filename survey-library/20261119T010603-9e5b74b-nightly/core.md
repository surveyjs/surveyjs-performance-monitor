# survey-library · core · 19.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44434251526

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 59.8 | −1% | −1% | 🟢 **−58%** ʳ |
| calculations/answer/next3 | 171 | +1% | +1% | 🟢 **−59%** ʳ |
| calculations/load/model | 380 | 0% | 0% | 🟢 **−66%** ʳ |
| complexLogic/answer/first | 258 | −1% | +2% | 🟢 **−95%** ʳ |
| complexLogic/answer/next3 | 501 | 0% | +3% | 🟢 **−97%** ʳ |
| complexLogic/load/design | 1262 | −1% | 0% | n/a¹ |
| complexLogic/load/model | 2228 | 0% | 0% | 🟢 **−84%** ʳ |
| complexLogic/output/data ᶜ | 0.33 | −3% | +6% | −25% |
| complexLogic/output/dispose | 54.7 | −1% | +4% | n/a¹ |
| complexLogic/output/toJSON | 111 | −4% | −5% | −26% |
| expressions/answer/first | 923 | +2% | +4% | 🟢 **−54%** ʳ |
| expressions/answer/next3 | 1840 | +1% | +8% | 🟢 **−55%** ʳ |
| expressions/load/model | 7758 | 0% | +1% | 🟢 **−44%** ʳ |
| large/load/design | 771 | 0% | 0% | 🟢 **−46%** ʳ |
| large/load/model | 692 | 0% | −13% | 🟢 **−35%** ʳ |
| large/output/data ᶜ | 0.07 | +17% | 0% | 0% |
| large/output/dispose | 60.9 | −1% | −1% | −3% |
| large/output/toJSON | 97.3 | −16% | −11% | 🟢 **−41%** ʳ |
| manyPages/load/model | 721 | −1% | −9% | −9% |
| manyPages/pages/last ᶜ | 13.7 | +1% | +1% | −21% |
| manyPages/pages/locale | 21 | 0% | −3% | −16% |
| manyPages/pages/next10 | 75.1 | −1% | −1% | −19% |
| manyPages/pages/prev | 24.5 | −1% | +2% | −16% |
| manyPages/pages/preview | 1581 | 0% | 0% | −22% |
| manyPages/pages/validate | 64.2 | +5% | +5% | −9% |
| records-10k/load/data | 1202 | 🟢 **−39%** ʳ | 🟢 **−39%** ʳ | +16% ⚑ |
| records-10k/load/model | 59.6 | 🟢 **−37%** ʳ | 🟢 **−35%** ʳ | 0% ⚑ |
| records-10k/output/data ᶜ | 0.11 | −9% | 0% | −8% ⚑ |
| records-10k/output/dispose ᶜ | 12.4 | 0% | −2% | +18% ⚑ |
| records-10k/output/toJSON | 21.4 | −8% | 0% | 🟢 **−35%** ʳ ⚑ |
| records-10k/records/add-row@orders | 270 | 0% | +1% | n/a² |
| records-10k/records/edit-cell@orders | 331 | 0% | −2% | n/a² |
| records-10k/records/filter-change@orders | 350 | −3% | −3% | n/a² |
| records-10k/records/filter-clear@orders | 385 | −3% | −2% | n/a² |
| records-10k/records/filter-set@orders | 647 | −3% | −2% | n/a² |
| records-10k/records/first-visit@orders | 389 | −4% | −3% | n/a³ |
| records-10k/records/last@orders | 299 | 0% | +3% | n/a² |
| records-10k/records/next@orders | 193 | 0% | +2% | n/a² |
| records-10k/records/prev@orders | 166 | −2% | +1% | n/a² |
| records-10k/records/remove-row@orders | 593 | 🟢 **−47%** ʳ | 🟢 **−47%** ʳ | n/a² |
| records-10k/records/sort-1@orders | 183 | +1% | 0% | n/a² |
| records-10k/records/sort-3@orders | 208 | −1% | +1% | n/a² |
| records-10k/records/sort-reverse@orders | 180 | −1% | 0% | n/a² |
| records-1k/load/data | 181 | −7% | −8% | 🔴 **+244%** ʳ ⚑ |
| records-1k/load/model | 117 | 🟢 **−35%** ʳ | 🟢 **−35%** ʳ | −1% ⚑ |
| records-1k/records/filter-set@orders | 245 | −7% | −6% | n/a² |
| records-1k/records/next@orders | 95.1 | +2% | +2% | n/a² |
| records-1k/records/next@ordersPanel | 27.9 | 0% | 0% | n/a² |
| records-1k/records/sort-1@orders | 56.4 | 0% | −1% | n/a² |
| records-1k/records/sort-1@ordersPanel | 23.5 | +2% | −1% | n/a² |
| records-plain/records/next@panelsPaged | 18.7 | +1% | −2% | n/a⁴ |
| records-plain/records/sort-1@orders30 | 58.2 | −2% | 0% | n/a⁵ |
| records-plain/records/sort-1@ordersPaged | 21.7 | −6% | −1% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 33.2 | +2% | −2% | n/a⁴ |
| records-plain/records/sort-1@panelsPaged | 20.6 | −3% | −3% | n/a⁴ |

n/a:
- ¹ timeout 300 s
- ² TypeError: Cannot read properties of undefined (reading 'map')
- ³ Error: check failed: the first row has the largest total: expected 4000, got 32
- ⁴ not in this build: paneldynamic.allowSort
- ⁵ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction
⚑ the build does not know part of the test's JSON (jsonErrors) and measured less work than today

## ⚑ jsonErrors differ
- records-10k/load/data (30D): jsonErrors differ from today
- records-10k/load/model (30D): jsonErrors differ from today
- records-10k/output/data (30D): jsonErrors differ from today
- records-10k/output/dispose (30D): jsonErrors differ from today
- records-10k/output/toJSON (30D): jsonErrors differ from today
- records-1k/load/data (30D): jsonErrors differ from today
- records-1k/load/model (30D): jsonErrors differ from today

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/answer/first | 30D | 60.1 | 144 | −58% | −60% | −58% | −60% | −58% | −57% | yes |
| calculations/answer/next3 | 30D | 171 | 415 | −59% | −60% | −59% | −57% | −60% | −60% | yes |
| calculations/load/model | 30D | 380 | 1134 | −66% | −66% | −66% | −66% | −66% | −67% | yes |
| complexLogic/answer/first | 30D | 272 | 5490 | −95% | −95% | −95% | −95% | −95% | −95% | yes |
| complexLogic/answer/next3 | 30D | 498 | 16272 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/model | 30D | 2261 | 14054 | −84% | −84% | −84% | −84% | −84% | −84% | yes |
| complexLogic/output/toJSON | 30D | 110 | 148 | −26% | −29% | −28% | −26% | −19% | −24% | no |
| expressions/answer/first | 30D | 917 | 2014 | −54% | −56% | −55% | −55% | −55% | −54% | yes |
| expressions/answer/next3 | 30D | 1876 | 4180 | −55% | −57% | −54% | −51% | −54% | −55% | yes |
| expressions/load/model | 30D | 7707 | 13723 | −44% | −42% | −46% | −44% | −43% | −44% | yes |
| large/load/design | 30D | 775 | 1429 | −46% | −46% | −45% | −46% | −46% | −46% | yes |
| large/load/model | 30D | 694 | 1075 | −35% | −35% | −35% | −37% | −35% | −35% | yes |
| large/output/toJSON | 30D | 98.3 | 166 | −41% | −40% | −42% | −44% | −41% | −39% | yes |
| records-10k/load/data | 1D | 1203 | 1979 | −39% | −39% | −39% | −40% | −39% | −39% | yes |
| records-10k/load/data | 7D | 1200 | 1973 | −39% | −39% | −40% | −40% | −39% | −39% | yes |
| records-10k/load/model | 1D | 59.7 | 94 | −37% | −36% | −36% | −37% | −38% | −34% | yes |
| records-10k/load/model | 7D | 60.6 | 92.9 | −35% | −35% | −34% | −34% | −35% | −37% | yes |
| records-10k/output/toJSON | 30D | 20.9 | 32.3 | −35% | −38% | −37% | −35% | −35% | −39% | yes |
| records-10k/records/remove-row@orders | 1D | 592 | 1117 | −47% | −47% | −47% | −47% | −46% | −47% | yes |
| records-10k/records/remove-row@orders | 7D | 593 | 1125 | −47% | −47% | −47% | −47% | −47% | −48% | yes |
| records-1k/load/data | 30D | 181 | 52.6 | +244% | +246% | +239% | +248% | +237% | +249% | yes |
| records-1k/load/model | 1D | 117 | 179 | −35% | −27% | −36% | −35% | −35% | −35% | yes |
| records-1k/load/model | 7D | 116 | 180 | −35% | −34% | −39% | −35% | −32% | −34% | yes |

## Work counters (information)
- calculations/answer/first (30D): expressionRuns 1470 → 184
- calculations/answer/next3 (30D): expressionRuns 4386 → 526
- calculations/load/model (30D): expressionRuns 5169 → 2401
- complexLogic/answer/first (30D): conditionRuns 4896 → 222, expressionRuns 2418 → 251
- complexLogic/answer/next3 (30D): conditionRuns 14688 → 546, expressionRuns 7040 → 487
- expressions/answer/first (30D): conditionRuns 7782 → 186
- expressions/answer/next3 (30D): conditionRuns 15564 → 525
- records-10k/load/data (30D): conditionRuns 40000 → 40040, expressionRuns 120 → 60770, panelsCreated 0 → 10
- records-10k/output/toJSON (30D): jsonLength 47391 → 47529
- records-1k/load/data (30D): conditionRuns 4000 → 4040, expressionRuns 120 → 6770, panelsCreated 0 → 10

Δ = today / build − 1.
