# survey-library · react · 20.11.2026 01:06 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44651017293

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| calculations/load/paint | 388 | +2% | +1% | 🟢 **−52%** 🟢 **work** ʳ |
| complexLogic/answer/first | 365 | −2% | −2% | 🟢 **−54%** 🟢 **work** ʳ |
| complexLogic/answer/type | 402 | −1% | +1% | 🟢 **−72%** 🟢 **work** ʳ |
| complexLogic/load/paint | 1581 | +1% | 0% | 🟢 **−64%** ʳ |
| expressions/load/paint | 4710 | +2% | +3% | −26% |
| large/load/paint | 541 | +2% | −8% | −21% |
| manyPages/load/paint | 534 | +4% | −3% | −6% |
| manyPages/pages/locale | 74.9 | 0% | +2% | −14% |
| manyPages/pages/next10 | 251 | −2% | −1% | −7% |
| manyPages/pages/preview | 6881 | −3% | −1% | −22% |
| records-10k/load/paint | 2076 | +1% | −25% | 0% 🔴 **work** |
| records-10k/records/add-row@orders | 280 | +1% | −1% | 🔴 **+41%** 🔴 **work** ʳ |
| records-10k/records/edit-cell@orders | 292 | +1% | +1% | +27% 🔴 **work** |
| records-10k/records/filter-set@orders | 484 | +1% | −1% | −2% 🔴 **work** |
| records-10k/records/last@orders | 236 | 0% | 0% | n/a¹ |
| records-10k/records/next@orders | 240 | 0% | +3% | n/a² |
| records-10k/records/sort-header@orders | 429 | 0% | +1% | n/a³ |
| records-1k/load/paint | 1244 | 0% | −5% | −7% 🔴 **work** |
| records-1k/records/next@ordersPanel | 50.4 | +2% | +2% | n/a⁴ |
| records-plain/records/next@panelsPaged | 58.9 | −1% | +2% | n/a⁵ |
| records-plain/records/sort-1@panels30 | 140 | 0% | −1% | 🟢 **−74%** 🟢 **work** ʳ |
| records-plain/records/sort-1@panelsPaged | 61.3 | +2% | −1% | 🟢 **−68%** 🔴 **work** ʳ |
| records-plain/records/sort-header@orders30 | 126 | +1% | +2% | n/a⁶ |
| records-plain/records/sort-header@ordersPaged | 45.3 | +1% | +1% | n/a⁶ |

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
| calculations/load/paint | 30D | 384 | 805 | −52% | −52% | −53% | −52% | −52% | −52% | yes |
| complexLogic/answer/first | 30D | 372 | 815 | −54% | −54% | −54% | −54% | −54% | −55% | yes |
| complexLogic/answer/type | 30D | 405 | 1422 | −72% | −73% | −71% | −72% | −72% | −71% | yes |
| complexLogic/load/paint | 30D | 1594 | 4408 | −64% | −64% | −64% | −64% | −64% | −63% | yes |
| expressions/load/paint | 30D | 4716 | 6384 | −26% | −28% | −27% | −25% | −23% | −25% | no |
| records-10k/records/add-row@orders | 30D | 276 | 196 | +41% | +32% | +42% | +43% | +44% | +41% | yes |
| records-10k/records/edit-cell@orders | 30D | 292 | 230 | +27% | +31% | +22% | +34% | +29% | +21% | no |
| records-plain/records/sort-1@panels30 | 30D | 141 | 544 | −74% | −74% | −74% | −73% | −75% | −75% | yes |
| records-plain/records/sort-1@panelsPaged | 30D | 61.3 | 194 | −68% | −67% | −67% | −69% | −69% | −68% | yes |

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
