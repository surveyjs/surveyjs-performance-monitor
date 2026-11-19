# survey-library · core · 19.11.2026 12:54 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44528144116

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/answer/first | 50 | 0% | +4% | 🟢 **−58%** 🟢 **work** ʳ |
| calculations/answer/next3 | 219 | −2% | 0% | 🟢 **−59%** 🟢 **work** ʳ |
| calculations/load/model | 379 | 0% | −1% | 🟢 **−67%** 🟢 **work** ʳ |
| complexLogic/answer/first | 281 | 0% | +3% | 🟢 **−95%** 🟢 **work** ʳ |
| complexLogic/answer/next3 | 560 | +2% | +2% | 🟢 **−97%** 🟢 **work** ʳ |
| complexLogic/load/design | 1247 | 0% | −1% | n/a¹ |
| complexLogic/load/model | 2196 | 0% | 0% | 🟢 **−84%** ʳ |
| complexLogic/output/data ᶜ | 0.55 | −4% | +2% | −9% |
| complexLogic/output/dispose | 52.3 | −3% | +3% | n/a¹ |
| complexLogic/output/toJSON | 71 | −5% | −5% | 🟢 **−32%** ʳ |
| expressions/answer/first | 899 | +2% | +6% | 🟢 **−56%** 🟢 **work** ʳ |
| expressions/answer/next3 | 2616 | −1% | +4% | 🟢 **−58%** 🟢 **work** ʳ |
| expressions/load/model | 7832 | −1% | −1% | 🟢 **−42%** ʳ |
| large/load/design | 664 | 0% | 0% | 🟢 **−46%** ʳ |
| large/load/model | 1234 | +1% | −12% | 🟢 **−34%** ʳ |
| large/output/data ᶜ | 0.09 | +6% | +13% | 0% |
| large/output/dispose | 37.1 | 0% | −7% | −7% |
| large/output/toJSON | 101 | −10% | −9% | 🟢 **−41%** ʳ |
| manyPages/load/model | 703 | 0% | −9% | −10% |
| manyPages/pages/last ᶜ | 10.9 | 0% | −1% | −19% |
| manyPages/pages/locale | 27.5 | −2% | −3% | −8% |
| manyPages/pages/next10 | 63.4 | +1% | −1% | −17% |
| manyPages/pages/prev | 28.6 | +2% | +1% | −17% |
| manyPages/pages/preview | 1575 | 0% | +1% | −23% |
| manyPages/pages/validate | 74.4 | −1% | +2% | −10% |
| records-10k/load/data | 731 | 🟢 **−42%** ʳ | 🟢 **−42%** ʳ | +7% 🔴 **work** ⚑ |
| records-10k/load/model | 63.9 | 🟢 **−35%** ʳ | 🟢 **−36%** ʳ | −2% ⚑ |
| records-10k/output/data ᶜ | 0.12 | 0% | 0% | −14% ⚑ |
| records-10k/output/dispose ᶜ | 11.9 | 0% | −1% | +17% ⚑ |
| records-10k/output/toJSON | 20.6 | −7% | −6% | 🟢 **−35%** ʳ ⚑ |
| records-10k/records/add-row@orders | 445 | 0% | −1% | n/a² |
| records-10k/records/edit-cell@orders | 595 | 0% | 0% | n/a² |
| records-10k/records/filter-change@orders | 516 | −1% | 0% | n/a² |
| records-10k/records/filter-clear@orders | 381 | −3% | −4% | n/a² |
| records-10k/records/filter-set@orders | 386 | −3% | −2% | n/a² |
| records-10k/records/first-visit@orders | 512 | −4% | −2% | n/a³ |
| records-10k/records/last@orders | 304 | +1% | 0% | n/a² |
| records-10k/records/next@orders | 311 | 0% | +1% | n/a² |
| records-10k/records/prev@orders | 317 | +1% | 0% | n/a² |
| records-10k/records/remove-row@orders | 1079 | 🟢 **−43%** ʳ | 🟢 **−44%** ʳ | n/a² |
| records-10k/records/sort-1@orders | 179 | 0% | 0% | n/a² |
| records-10k/records/sort-3@orders | 203 | +2% | +1% | n/a² |
| records-10k/records/sort-reverse@orders | 256 | 0% | −1% | n/a² |
| records-1k/load/data | 268 | −5% | −7% | 🔴 **+268%** 🔴 **work** ʳ ⚑ |
| records-1k/load/model | 59.5 | 🟢 **−36%** ʳ | 🟢 **−36%** ʳ | −1% ⚑ |
| records-1k/records/filter-set@orders | 250 | −5% | −5% | n/a² |
| records-1k/records/next@orders | 73.4 | +1% | +2% | n/a² |
| records-1k/records/next@ordersPanel | 22.5 | −1% | −1% | n/a² |
| records-1k/records/sort-1@orders | 57.5 | 0% | 0% | n/a² |
| records-1k/records/sort-1@ordersPanel | 22.9 | +1% | −2% | n/a² |
| records-plain/records/next@panelsPaged | 36.5 | −1% | +1% | n/a⁴ |
| records-plain/records/sort-1@orders30 | 31.2 | −1% | −4% | n/a⁵ |
| records-plain/records/sort-1@ordersPaged | 40 | −1% | 0% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 32.8 | −5% | +2% | n/a⁴ |
| records-plain/records/sort-1@panelsPaged | 21.2 | −2% | 0% | n/a⁴ |

n/a:
- ¹ timeout 300 s
- ² TypeError: Cannot read properties of undefined (reading 'map')
- ³ Error: check failed: the first row has the largest total: expected 4000, got 32
- ⁴ not in this build: paneldynamic.allowSort
- ⁵ not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
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
| calculations/answer/first | 30D | 46.8 | 110 | −58% | −57% | −57% | −57% | −58% | −59% | yes |
| calculations/answer/next3 | 30D | 224 | 545 | −59% | −60% | −59% | −57% | −60% | −58% | yes |
| calculations/load/model | 30D | 377 | 1140 | −67% | −67% | −67% | −67% | −67% | −67% | yes |
| complexLogic/answer/first | 30D | 278 | 5541 | −95% | −95% | −95% | −95% | −95% | −95% | yes |
| complexLogic/answer/next3 | 30D | 553 | 16427 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| complexLogic/load/model | 30D | 2207 | 13796 | −84% | −84% | −84% | −84% | −84% | −84% | yes |
| complexLogic/output/toJSON | 30D | 71 | 105 | −32% | −35% | −31% | −32% | −32% | −30% | yes |
| expressions/answer/first | 30D | 906 | 2039 | −56% | −56% | −56% | −56% | −55% | −57% | yes |
| expressions/answer/next3 | 30D | 2624 | 6179 | −58% | −57% | −56% | −58% | −59% | −56% | yes |
| expressions/load/model | 30D | 7799 | 13456 | −42% | −41% | −41% | −43% | −41% | −42% | yes |
| large/load/design | 30D | 675 | 1251 | −46% | −46% | −46% | −46% | −46% | −46% | yes |
| large/load/model | 30D | 1252 | 1909 | −34% | −35% | −34% | −32% | −35% | −33% | yes |
| large/output/toJSON | 30D | 102 | 174 | −41% | −41% | −43% | −42% | −41% | −37% | yes |
| records-10k/load/data | 1D | 737 | 1262 | −42% | −41% | −47% | −45% | −36% | −43% | yes |
| records-10k/load/data | 7D | 727 | 1246 | −42% | −42% | −47% | −42% | −42% | −42% | yes |
| records-10k/load/model | 1D | 64.9 | 100 | −35% | −34% | −38% | −34% | −37% | −36% | yes |
| records-10k/load/model | 7D | 63.9 | 100 | −36% | −39% | −34% | −35% | −33% | −38% | yes |
| records-10k/output/toJSON | 30D | 21.1 | 32.5 | −35% | −36% | −38% | −38% | −30% | −36% | yes |
| records-10k/records/remove-row@orders | 1D | 1107 | 1947 | −43% | −42% | −43% | −44% | −45% | −45% | yes |
| records-10k/records/remove-row@orders | 7D | 1057 | 1894 | −44% | −43% | −45% | −41% | −44% | −45% | yes |
| records-1k/load/data | 30D | 272 | 73.8 | +268% | +271% | +256% | +276% | +259% | +280% | yes |
| records-1k/load/model | 1D | 58.9 | 91.6 | −36% | −36% | −39% | −35% | −36% | −36% | yes |
| records-1k/load/model | 7D | 59.7 | 92.9 | −36% | −38% | −37% | −36% | −31% | −35% | yes |

## Work counters (information)
- records-10k/output/toJSON (30D): jsonLength 47391 → 47529

## Counters (judged)
- calculations/answer/first (30D): expressionRuns 1470 → 184 (work)
- calculations/answer/next3 (30D): expressionRuns 4386 → 526 (work)
- calculations/load/model (30D): expressionRuns 5169 → 2401 (work)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2418 → 251 (work)
- complexLogic/answer/next3 (30D): conditionRuns 14688 → 546 (work), expressionRuns 7040 → 487 (work)
- expressions/answer/first (30D): conditionRuns 7782 → 186 (work)
- expressions/answer/next3 (30D): conditionRuns 15564 → 525 (work)
- records-10k/load/data (30D): conditionRuns 40000 → 40040 (work), expressionRuns 120 → 60770 (work), panelsCreated 0 → 10 (work)
- records-1k/load/data (30D): conditionRuns 4000 → 4040 (work), expressionRuns 120 → 6770 (work), panelsCreated 0 → 10 (work)

Δ = today / build − 1.
