# survey-library · angular · 17.11.2026 23:20 UTC

> CPU: Intel Xeon 6975P-C × 75, AMD EPYC 9V74 × 21, AMD EPYC 7763 × 15, AMD EPYC 9V45 × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3, INTEL XEON PLATINUM 8573C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44198421945

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 2803 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1009 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1006 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 1942 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 514 | −1% | −2% | 🟢 **−46%** ʳ |
| complexLogic/answer/type | 484 | +1% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1514 | −2% | −1% | 🟢 **−85%** ʳ |
| expressions/load/paint | 4051 | 0% | 0% | 🟢 **−39%** ʳ |
| large/load/paint | 609 | −3% | −2% | 🟢 **−53%** ʳ |
| manyPages/load/paint | 538 | −1% | −1% | 🟢 **−28%** ʳ |
| manyPages/pages/next10 | 378 | −2% | +1% | −9% |
| records-10k/load/paint | 1961 | 0% | 0% | +12% ⚑ |
| records-10k/records/edit-cell@orders | 585 | 0% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 286 | −1% | +1% | n/a¹ |
| records-1k/load/paint | 956 | 0% | −1% | −24% ⚑ |
| records-plain/records/sort-header@orders30 | 192 | +1% | +1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 61.3 | −3% | −2% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −47% · −45% · −46% · −47% · −46% → −46% (544 / 1013 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (489 / 14209 ms) — every repeat agrees
- complexLogic/load/paint (month): −85% · −85% · −85% · −85% · −85% → −85% (1518 / 10046 ms) — every repeat agrees
- expressions/load/paint (month): −39% · −40% · −39% · −40% · −41% → −39% (4042 / 6677 ms) — every repeat agrees
- large/load/paint (month): −53% · −54% · −53% · −53% · −52% → −53% (613 / 1293 ms) — every repeat agrees
- manyPages/load/paint (month): −27% · −27% · −28% · −27% · −28% → −28% (531 / 734 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
