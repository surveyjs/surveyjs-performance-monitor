# survey-library · angular · 17.11.2026 21:58 UTC

> CPU: Intel Xeon 6975P-C × 57, AMD EPYC 9V74 × 26, AMD EPYC 9V45 × 16, AMD EPYC 7763 × 16, INTEL XEON PLATINUM 8573C × 7, Intel Xeon Platinum 8370C × 4, Intel Xeon 6973P-C × 2 · run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44185307540

| build | commit | date | node | sec | n/a |
|---|---|---|---|--:|--:|
| today | [50a7175e3](https://github.com/surveyjs/survey-library/commit/50a7175e34f4ed7fd01e3b47d9d1cd2e868e0318) | 16.11.2026 | v24.15.0 | 3248 | 0 |
| yesterday | [5f275a7d8](https://github.com/surveyjs/survey-library/commit/5f275a7d8daa4ae5a499c5d5302964474fd78e62) | 13.11.2026 | v24.15.0 | 1152 | 0 |
| week | [d7f801866](https://github.com/surveyjs/survey-library/commit/d7f801866d9cca9cedf8ce155172020c9e52905c) | 09.11.2026 | v24.15.0 | 1147 | 0 |
| month | [46bade337](https://github.com/surveyjs/survey-library/commit/46bade337750a07a0c0795a337bd6a9d8045761d) | 17.10.2026 | v24.15.0 | 2238 | 4 |

| scenario | today, ms | yesterday | week | month |
|---|--:|--:|--:|--:|
| calculations/load/paint | 809 | −1% | 0% | 🟢 **−51%** ʳ |
| complexLogic/answer/type | 478 | −1% | +1% | 🟢 **−97%** ʳ |
| complexLogic/load/paint | 1573 | +1% | −1% | 🟢 **−85%** ʳ |
| expressions/load/paint | 5968 | 0% | 0% | 🟢 **−37%** ʳ |
| large/load/paint | 618 | −2% | −2% | 🟢 **−53%** ʳ |
| manyPages/load/paint | 997 | −1% | 0% | −25% |
| manyPages/pages/next10 | 669 | +1% | +1% | −7% |
| records-10k/load/paint | 1958 | −1% | 0% | +11% ⚑ |
| records-10k/records/edit-cell@orders | 375 | +1% | 0% | n/a¹ |
| records-10k/records/sort-header@orders | 277 | +1% | +2% | n/a¹ |
| records-1k/load/paint | 986 | 0% | +1% | −23% ⚑ |
| records-plain/records/sort-header@orders30 | 147 | +1% | −1% | n/a² |
| records-plain/records/sort-header@ordersPaged | 107 | −1% | −2% | n/a² |

n/a:
- ¹ Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'map')
- ² not in this build: matrixdynamic.allowSort

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## ⚑ jsonErrors differ
- records-10k/load/paint (month): jsonErrors differ from today
- records-1k/load/paint (month): jsonErrors differ from today

## Repeats
- calculations/load/paint (month): −51% · −51% · −51% · −50% · −52% → −51% (807 / 1647 ms) — every repeat agrees
- complexLogic/answer/type (month): −97% · −97% · −97% · −97% · −97% → −97% (474 / 15749 ms) — every repeat agrees
- complexLogic/load/paint (month): −84% · −84% · −85% · −85% · −85% → −85% (1573 / 10175 ms) — every repeat agrees
- expressions/load/paint (month): −37% · −37% · −37% · −37% · −37% → −37% (5964 / 9453 ms) — every repeat agrees
- large/load/paint (month): −54% · −53% · −53% · −53% · −54% → −53% (615 / 1314 ms) — every repeat agrees
- manyPages/load/paint (month): −26% · −26% · −25% · −25% · −25% → −25% (996 / 1330 ms) — not every repeat agrees

## Work counters (information)
- calculations/load/paint (month): expressionRuns 5169 → 2401
- complexLogic/answer/type (month): conditionRuns 14688 → 52, expressionRuns 7024 → 256
- records-10k/load/paint (month): conditionRuns 40040 → 40080, expressionRuns 320 → 80940, panelsCreated 0 → 10
- records-1k/load/paint (month): conditionRuns 4040 → 4080, expressionRuns 320 → 8940, panelsCreated 0 → 10

Δ = today / build − 1.
