# survey-library · vue3 · 17.11.2026 20:28 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 7763 × 27, AMD EPYC 9V74 × 21, AMD EPYC 9V45 × 9, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 3 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44169583629

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 2989 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1061 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1057 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2306 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 855 | 0% | 0% | 🟢 **−50%** ʳ |
| complexLogic/answer/type | 562 | 0% | 0% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1927 | 0% | −1% | 🟢 **−82%** ʳ |
| expressions/load/paint | 6018 | 0% | +1% | 🟢 **−38%** ʳ |
| large/load/paint | 850 | −1% | −1% | 🟢 **−52%** ʳ |
| manyPages/load/paint | 671 | −1% | 0% | 🟢 **−29%** ʳ |
| manyPages/pages/next10 | 493 | 0% | +2% | −8% |
| records-10k/load/paint | 1858 | 0% | 0% | +13% ⚑ |
| records-10k/records/edit-cell@orders | 428 | +2% | +1% | n/a¹ |
| records-10k/records/sort-header@orders | 381 | 0% | 0% | n/a¹ |
| records-1k/load/paint | 1513 | 0% | +1% | −16% ⚑ |
| records-plain/records/sort-header@orders30 | 137 | +1% | 0% | n/a² |
| records-plain/records/sort-header@ordersPaged | 44.9 | −3% | +2% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −51% · −51% · −51% · −50% · −49% → −50% (864 / 1731 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (558 / 17378 ms) — every repeat agrees
- complexLogic/load/paint (month): −82% · −82% · −81% · −82% · −81% → −82% (1928 / 10441 ms) — every repeat agrees
- expressions/load/paint (month): −38% · −39% · −38% · −38% · −38% → −38% (5985 / 9671 ms) — every repeat agrees
- large/load/paint (month): −52% · −53% · −52% · −51% · −51% → −52% (847 / 1764 ms) — every repeat agrees
- manyPages/load/paint (month): −31% · −28% · −29% · −29% · −29% → −29% (663 / 932 ms) — every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
