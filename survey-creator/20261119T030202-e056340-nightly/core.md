# survey-creator · core · 19.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44448510798

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 106 | −2% | +3% | −25% |
| huge/edit/property | 37.5 | −2% | −6% | 🟢 **−35%** ʳ |
| huge/load/json | 496 | −1% | +2% | 🟢 **−48%** ʳ |
| huge/output/dispose ᶜ | 0.91 | +1% | +3% | +1% |
| huge/output/text | 176 | −10% | −9% | 🟢 **−42%** ʳ |
| huge/select/element@q3978 | 112 | 🟢 **−38%** ʳ | 🟢 **−37%** ʳ | 🟢 **−63%** ʳ |
| huge/tabs/designer | 51.9 | −1% | −7% | 🔴 **+184%** ʳ |
| huge/tabs/json | 369 | −4% | −3% | 🟢 **−45%** ʳ |
| huge/tabs/logic | 294 | −2% | 0% | 🟢 **−76%** ʳ |
| huge/tabs/preview | 786 | −2% | −12% | 🟢 **−48%** ʳ |
| huge/tabs/roundtrip ᶜ | 4388 | −2% | −8% | −55% 🟢 **work** |
| huge/tabs/translation | 109 | −1% | +1% | 🟢 **−99%** ʳ |
| locales/load/json | 377 | +1% | −1% | 🟢 **−34%** ʳ |
| locales/tabs/translation | 148 | −1% | −1% | 🟢 **−97%** ʳ |
| typical/edit/add-question | 66.7 | −1% | +7% | −8% |
| typical/edit/convert@dropdown1 | 87.7 | −1% | +4% | −21% |
| typical/edit/delete | 98.8 | +1% | +4% | −18% |
| typical/edit/property | 23.5 | +3% | −1% | −5% |
| typical/edit/undo-redo | 89.4 | −2% | −3% | −23% |
| typical/load/json | 155 | +1% | −1% | −10% |
| typical/select/element@checkbox1 | 79.1 | 0% | +3% | −16% |
| typical/select/element@dropdown1 | 80 | +1% | +6% | −16% |
| typical/select/element@matrixdynamic1 | 83.7 | +1% | +2% | 🟢 **−29%** ʳ |
| typical/select/element@page1 | 34.7 | −1% | −7% | 🟢 **−40%** ʳ |
| typical/select/element@panel1 | 37.1 | +1% | −1% | 🟢 **−34%** ʳ |
| typical/select/element@paneldynamic1 | 84.2 | 0% | +4% | −21% |
| typical/select/element@survey | 79.3 | 0% | 0% | −14% |
| typical/select/element@text1 | 79.9 | −1% | +3% | −16% |
| typical/tabs/theme | 742 | 0% | −1% | 0% |

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | 30D | 105 | 141 | −25% | −24% | −27% | −26% | −23% | −26% | no |
| huge/edit/property | 30D | 37.5 | 57.4 | −35% | −32% | −31% | −37% | −34% | −34% | yes |
| huge/load/json | 30D | 499 | 956 | −48% | −49% | −48% | −49% | −46% | −44% | yes |
| huge/output/text | 30D | 177 | 306 | −42% | −43% | −42% | −42% | −38% | −43% | yes |
| huge/select/element@q3978 | 1D | 117 | 188 | −38% | −36% | −36% | −39% | −38% | −39% | yes |
| huge/select/element@q3978 | 7D | 111 | 178 | −37% | −38% | −36% | −38% | −37% | −38% | yes |
| huge/select/element@q3978 | 30D | 111 | 299 | −63% | −63% | −64% | −63% | −62% | −63% | yes |
| huge/tabs/designer | 30D | 52.4 | 18.4 | +184% | +225% | +128% | +191% | +177% | +230% | yes |
| huge/tabs/json | 30D | 370 | 678 | −45% | −46% | −45% | −46% | −46% | −44% | yes |
| huge/tabs/logic | 30D | 287 | 1187 | −76% | −76% | −76% | −75% | −76% | −75% | yes |
| huge/tabs/preview | 30D | 800 | 1544 | −48% | −47% | −48% | −47% | −49% | −48% | yes |
| huge/tabs/translation | 30D | 112 | 12096 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/load/json | 30D | 379 | 577 | −34% | −35% | −34% | −34% | −36% | −34% | yes |
| locales/tabs/translation | 30D | 147 | 5548 | −97% | −97% | −97% | −97% | −97% | −97% | yes |
| typical/select/element@matrixdynamic1 | 30D | 84.1 | 118 | −29% | −27% | −29% | −28% | −33% | −27% | yes |
| typical/select/element@page1 | 30D | 34.2 | 56.7 | −40% | −39% | −39% | −39% | −40% | −38% | yes |
| typical/select/element@panel1 | 30D | 37.3 | 56.7 | −34% | −33% | −36% | −33% | −35% | −34% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Work counters (information)
- huge/edit/add-question (7D): expressionRuns 69 → 73
- huge/edit/add-question (30D): expressionRuns 80 → 73
- huge/edit/property (7D): expressionRuns 310 → 330
- huge/edit/property (30D): expressionRuns 290 → 330
- huge/load/json (30D): expressionRuns 46 → 48
- huge/select/element@q3978 (7D): expressionRuns 62 → 66
- huge/select/element@q3978 (30D): expressionRuns 104 → 66
- huge/tabs/preview (30D): conditionRuns 4415 → 2220, expressionRuns 2657 → 1337
- locales/load/json (30D): expressionRuns 46 → 48
- typical/edit/add-question (7D): expressionRuns 69 → 73
- typical/edit/add-question (30D): expressionRuns 80 → 73
- typical/edit/convert@dropdown1 (7D): expressionRuns 62 → 66
- typical/edit/convert@dropdown1 (30D): expressionRuns 145 → 66
- typical/edit/delete (7D): expressionRuns 62 → 66
- typical/edit/delete (30D): expressionRuns 142 → 66
- typical/edit/property (7D): expressionRuns 300 → 320
- typical/edit/property (30D): expressionRuns 280 → 320
- typical/edit/undo-redo (30D): expressionRuns 185 → 72
- typical/load/json (30D): expressionRuns 52 → 51
- typical/select/element@checkbox1 (7D): expressionRuns 62 → 66
- typical/select/element@checkbox1 (30D): expressionRuns 104 → 66
- typical/select/element@dropdown1 (7D): expressionRuns 62 → 66
- typical/select/element@dropdown1 (30D): expressionRuns 104 → 66
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48
- typical/select/element@page1 (30D): expressionRuns 62 → 18
- typical/select/element@panel1 (30D): expressionRuns 68 → 24
- typical/select/element@paneldynamic1 (7D): expressionRuns 60 → 64
- typical/select/element@paneldynamic1 (30D): expressionRuns 98 → 64
- typical/select/element@survey (30D): expressionRuns 62 → 48
- typical/select/element@text1 (7D): expressionRuns 60 → 64
- typical/select/element@text1 (30D): expressionRuns 102 → 64
- typical/tabs/theme (30D): expressionRuns 225 → 187

Δ = today / build − 1.
