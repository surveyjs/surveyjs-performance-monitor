# survey-library · survey-js-ui · 20.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44651017293

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 398 | +2% | +1% | 🟢 **−51%** 🟢 **work** ʳ |
| complexLogic/answer/first | 291 | −2% | −1% | 🟢 **−57%** 🟢 **work** ʳ |
| complexLogic/answer/type | 377 | 0% | +2% | 🟢 **−72%** 🟢 **work** ʳ |
| complexLogic/load/paint | 1518 | +2% | −1% | 🟢 **−64%** ʳ |
| expressions/load/paint | 6034 | +1% | +1% | 🟢 **−26%** ʳ |
| large/load/paint | 864 | +1% | −6% | −24% |
| manyPages/load/paint | 439 | +3% | −1% | −9% |
| manyPages/pages/locale | 55.1 | −4% | 0% | −23% |
| manyPages/pages/next10 | 211 | +1% | −1% | −11% |
| records-10k/load/paint | 2407 | +1% | −23% | +5% 🔴 **work** |
| records-10k/records/add-row@orders | 369 | −2% | 0% | 🔴 **+43%** 🔴 **work** ʳ |
| records-10k/records/edit-cell@orders | 294 | −3% | −1% | +23% 🔴 **work** |
| records-10k/records/filter-set@orders | 473 | 0% | −2% | −5% 🔴 **work** |
| records-10k/records/last@orders | 480 | +3% | −1% | n/a¹ |
| records-10k/records/next@orders | 243 | +3% | +1% | n/a² |
| records-10k/records/sort-header@orders | 259 | −2% | +1% | n/a³ |
| records-1k/load/paint | 734 | +1% | −4% | −10% 🔴 **work** |
| records-1k/records/next@ordersPanel | 64.5 | +5% | +2% | n/a⁴ |
| records-plain/records/next@panelsPaged | 63.8 | +1% | +2% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 98.1 | +2% | +1% | 🟢 **−80%** 🟢 **work** ʳ |
| records-plain/records/sort-1@panelsPaged | 48.6 | −1% | −1% | 🟢 **−73%** 🔴 **work** ʳ |
| records-plain/records/sort-header@orders30 | 88.4 | +1% | 0% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 43.5 | 0% | 0% | n/a⁶ |

n/a:
- ¹ Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Last"]
- ² Error: page.evaluate: Error: No element for [data-name="orders"] .sd-pager button[title="Next"]
- ³ Error: page.evaluate: Error: check failed: the sort button of total
- ⁴ Error: page.evaluate: Error: No element for [data-name="ordersPanel"] .sd-pager button[title="Next"]
- ⁵ Error: page.evaluate: Error: No element for [data-name="panelsPaged"] .sd-pager button[title="Next"]
- ⁶ Error: page.evaluate: Error: check failed: the sort button of id

🔴 slower · 🟢 faster (over 25% and over 8 ms)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| calculations/load/paint | 30D | 394 | 807 | −51% | −51% | −51% | −51% | −51% | −52% | yes |
| complexLogic/answer/first | 30D | 291 | 670 | −57% | −57% | −56% | −57% | −58% | −56% | yes |
| complexLogic/answer/type | 30D | 387 | 1390 | −72% | −72% | −72% | −72% | −73% | −73% | yes |
| complexLogic/load/paint | 30D | 1527 | 4277 | −64% | −64% | −64% | −65% | −65% | −64% | yes |
| expressions/load/paint | 30D | 6044 | 8181 | −26% | −26% | −27% | −26% | −26% | −26% | yes |
| records-10k/records/add-row@orders | 30D | 364 | 254 | +43% | +40% | +42% | +46% | +40% | +46% | yes |
| records-plain/records/sort-1@panels30 | 30D | 98.3 | 493 | −80% | −80% | −80% | −79% | −80% | −80% | yes |
| records-plain/records/sort-1@panelsPaged | 30D | 48.7 | 179 | −73% | −72% | −72% | −73% | −74% | −73% | yes |

## Counters (judged)
- calculations/load/paint (30D): expressionRuns 4772 → 2401 (work)
- complexLogic/answer/first (30D): conditionRuns 4896 → 222 (work), expressionRuns 2034 → 251 (work)
- complexLogic/answer/type (30D): conditionRuns 14688 → 52 (work), expressionRuns 5854 → 256 (work)
- records-10k/load/paint (30D): conditionRuns 40125 → 40080 (work), expressionRuns 490 → 80940 (work)
- records-10k/records/add-row@orders (30D): expressionRuns 164 → 20555 (work)
- records-10k/records/edit-cell@orders (30D): expressionRuns 278 → 20848 (work)
- records-10k/records/filter-set@orders (30D): expressionRuns 80 → 20050 (work)
- records-1k/load/paint (30D): conditionRuns 4125 → 4080 (work), expressionRuns 490 → 8940 (work)
- records-plain/records/sort-1@panels30 (30D): expressionRuns 60 → 30 (work), panelsCreated 30 → 0 (work)
- records-plain/records/sort-1@panelsPaged (30D): expressionRuns 20 → 1000 (work), panelsCreated 10 → 0 (work)

Δ = today / build − 1.
