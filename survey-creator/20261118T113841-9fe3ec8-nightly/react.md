# survey-creator · react · 18.11.2026 11:38 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44296512392

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 95.3 | +2% | −1% | 🟢 **−53%** ʳ |
| huge/designer/expand-all | 396 | +6% | −2% | 🟢 **−37%** ʳ |
| huge/designer/object-selector | 1603 | 0% | +1% | −15% |
| huge/edit/add-question | 135 | +2% | +1% | 🟢 **−43%** ʳ |
| huge/edit/property | 94.6 | +1% | +6% | 🟢 **−34%** ʳ |
| huge/load/paint | 720 | +1% | +1% | 🟢 **−76%** ʳ |
| huge/select/element@q3978 | 472 | +1% | 0% | −18% |
| huge/tabs/designer | 198 | +2% | −1% | 🟢 **−60%** ʳ |
| huge/tabs/json | 1025 | +1% | −1% | −15% |
| huge/tabs/logic | 1696 | 0% | 0% | 🟢 **−42%** ʳ |
| huge/tabs/preview | 630 | −5% | −8% | 🟢 **−64%** ʳ |
| huge/tabs/roundtrip ᶜ | 5904 | −4% | −1% | −54% 🟢 **work** |
| huge/tabs/translation | 136 | +1% | +1% | 🟢 **−99%** ʳ |
| locales/tabs/translation | 352 | +1% | +1% | 🟢 **−95%** ʳ |
| typical/edit/add-question | 90.4 | −3% | +1% | 🟢 **−34%** ʳ |
| typical/edit/delete | 93.9 | +6% | +5% | 🟢 **−36%** ʳ |
| typical/edit/property | 66 | +3% | +6% | −11% |
| typical/edit/title-type | 89.3 | −1% | +4% | −12% |
| typical/load/paint | 351 | 0% | +1% | −23% |
| typical/select/element@matrixdynamic1 | 69.2 | +2% | +3% | 🟢 **−34%** ʳ |
| typical/select/element@survey | 68.4 | −1% | −2% | −32% |
| typical/select/element@text1 | 68.6 | +6% | +2% | 🟢 **−28%** ʳ |
| typical/tabs/theme | 497 | +2% | +1% | −11% |

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | 30D | 95.6 | 202 | −53% | −54% | −51% | −53% | −50% | −53% | yes |
| huge/designer/expand-all | 30D | 396 | 629 | −37% | −33% | −33% | −35% | −37% | −40% | yes |
| huge/edit/add-question | 30D | 134 | 233 | −43% | −42% | −45% | −43% | −42% | −43% | yes |
| huge/edit/property | 30D | 94.8 | 144 | −34% | −34% | −34% | −35% | −36% | −33% | yes |
| huge/load/paint | 30D | 718 | 2968 | −76% | −76% | −76% | −75% | −76% | −76% | yes |
| huge/tabs/designer | 30D | 198 | 501 | −60% | −59% | −63% | −61% | −61% | −61% | yes |
| huge/tabs/logic | 30D | 1682 | 2922 | −42% | −43% | −42% | −42% | −43% | −42% | yes |
| huge/tabs/preview | 30D | 623 | 1714 | −64% | −64% | −63% | −64% | −64% | −63% | yes |
| huge/tabs/translation | 30D | 137 | 12406 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/tabs/translation | 30D | 350 | 7681 | −95% | −95% | −95% | −95% | −95% | −95% | yes |
| typical/edit/add-question | 30D | 93.3 | 142 | −34% | −35% | −40% | −38% | −31% | −34% | yes |
| typical/edit/delete | 30D | 88.1 | 137 | −36% | −32% | −37% | −37% | −37% | −34% | yes |
| typical/select/element@matrixdynamic1 | 30D | 69.4 | 105 | −34% | −34% | −34% | −34% | −35% | −36% | yes |
| typical/select/element@survey | 30D | 70.4 | 104 | −32% | −34% | −32% | −33% | −17% | −35% | no |
| typical/select/element@text1 | 30D | 68.3 | 94.6 | −28% | −28% | −29% | −26% | −29% | −29% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Work counters (information)
- huge/edit/add-question (1D): expressionRuns 69 → 73
- huge/edit/add-question (7D): expressionRuns 69 → 73
- huge/edit/add-question (30D): expressionRuns 80 → 73
- huge/edit/property (1D): expressionRuns 558 → 594
- huge/edit/property (7D): expressionRuns 558 → 594
- huge/edit/property (30D): expressionRuns 522 → 594
- huge/load/paint (30D): expressionRuns 92 → 48
- huge/select/element@q3978 (1D): expressionRuns 62 → 66
- huge/select/element@q3978 (7D): expressionRuns 62 → 66
- huge/select/element@q3978 (30D): expressionRuns 104 → 66
- huge/tabs/preview (30D): conditionRuns 4415 → 2220, expressionRuns 2657 → 1337
- typical/edit/add-question (1D): expressionRuns 69 → 73
- typical/edit/add-question (7D): expressionRuns 69 → 73
- typical/edit/add-question (30D): expressionRuns 80 → 73
- typical/edit/delete (1D): expressionRuns 62 → 66
- typical/edit/delete (7D): expressionRuns 62 → 66
- typical/edit/delete (30D): expressionRuns 142 → 66
- typical/edit/property (1D): expressionRuns 540 → 576
- typical/edit/property (7D): expressionRuns 540 → 576
- typical/edit/property (30D): expressionRuns 504 → 576
- typical/edit/title-type (1D): expressionRuns 240 → 256
- typical/edit/title-type (7D): expressionRuns 240 → 256
- typical/edit/title-type (30D): expressionRuns 224 → 256
- typical/load/paint (30D): expressionRuns 98 → 51
- typical/select/element@matrixdynamic1 (1D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48
- typical/select/element@survey (30D): expressionRuns 62 → 48
- typical/select/element@text1 (1D): expressionRuns 60 → 64
- typical/select/element@text1 (7D): expressionRuns 60 → 64
- typical/select/element@text1 (30D): expressionRuns 102 → 64
- typical/tabs/theme (30D): expressionRuns 225 → 187

Δ = today / build − 1.
