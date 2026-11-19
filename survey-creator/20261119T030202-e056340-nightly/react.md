# survey-creator · react · 19.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44448510798

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 84 | +1% | +4% | 🟢 **−54%** ʳ |
| huge/designer/expand-all | 341 | 0% | 0% | 🟢 **−37%** ʳ |
| huge/designer/object-selector | 1576 | +1% | +1% | −17% |
| huge/edit/add-question | 136 | 0% | +2% | 🟢 **−42%** ʳ |
| huge/edit/property | 98.6 | 0% | −3% | 🟢 **−37%** ʳ |
| huge/load/paint | 981 | 0% | +2% | 🟢 **−66%** ʳ |
| huge/select/element@q3978 | 426 | −18% | −15% | 🟢 **−33%** ʳ |
| huge/tabs/designer | 242 | 0% | +3% | 🟢 **−59%** ʳ |
| huge/tabs/json | 857 | −1% | −1% | −20% |
| huge/tabs/logic | 1622 | 0% | 0% | 🟢 **−29%** ʳ |
| huge/tabs/preview | 618 | −1% | −10% | 🟢 **−45%** ʳ |
| huge/tabs/roundtrip ᶜ | 8666 | −1% | −2% | −43% 🟢 **work** |
| huge/tabs/translation | 129 | +1% | 0% | 🟢 **−99%** ʳ |
| locales/tabs/translation | 185 | +2% | +1% | 🟢 **−96%** ʳ |
| typical/edit/add-question | 92.3 | −1% | +5% | −32% |
| typical/edit/delete | 87.1 | +1% | +3% | 🟢 **−32%** ʳ |
| typical/edit/property | 62.2 | −1% | +3% | −11% |
| typical/edit/title-type | 66.6 | −2% | +2% | −10% |
| typical/load/paint | 273 | 0% | 0% | −22% |
| typical/select/element@matrixdynamic1 | 70.2 | −1% | +2% | 🟢 **−38%** ʳ |
| typical/select/element@survey | 68 | −2% | 0% | 🟢 **−34%** ʳ |
| typical/select/element@text1 | 78 | +1% | +2% | 🟢 **−27%** ʳ |
| typical/tabs/theme | 417 | −1% | 0% | −9% |

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | 30D | 77.6 | 167 | −54% | −53% | −54% | −53% | −53% | −54% | yes |
| huge/designer/expand-all | 30D | 333 | 527 | −37% | −35% | −39% | −37% | −36% | −37% | yes |
| huge/edit/add-question | 30D | 137 | 235 | −42% | −43% | −39% | −41% | −42% | −42% | yes |
| huge/edit/property | 30D | 100 | 160 | −37% | −39% | −34% | −38% | −37% | −35% | yes |
| huge/load/paint | 30D | 986 | 2920 | −66% | −66% | −67% | −67% | −66% | −67% | yes |
| huge/select/element@q3978 | 30D | 426 | 636 | −33% | −33% | −32% | −34% | −33% | −32% | yes |
| huge/tabs/designer | 30D | 241 | 595 | −59% | −60% | −59% | −60% | −57% | −60% | yes |
| huge/tabs/logic | 30D | 1611 | 2271 | −29% | −29% | −28% | −29% | −29% | −30% | yes |
| huge/tabs/preview | 30D | 618 | 1129 | −45% | −45% | −46% | −46% | −45% | −46% | yes |
| huge/tabs/translation | 30D | 130 | 11441 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/tabs/translation | 30D | 184 | 4318 | −96% | −96% | −96% | −96% | −96% | −96% | yes |
| typical/edit/add-question | 30D | 89.8 | 132 | −32% | −30% | −18% | −32% | −34% | −32% | no |
| typical/edit/delete | 30D | 87.4 | 129 | −32% | −32% | −30% | −33% | −32% | −34% | yes |
| typical/select/element@matrixdynamic1 | 30D | 70.2 | 113 | −38% | −39% | −39% | −36% | −36% | −38% | yes |
| typical/select/element@survey | 30D | 67.3 | 101 | −34% | −33% | −36% | −34% | −33% | −35% | yes |
| typical/select/element@text1 | 30D | 77.9 | 107 | −27% | −28% | −27% | −27% | −27% | −28% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Work counters (information)
- huge/edit/add-question (7D): expressionRuns 69 → 73
- huge/edit/add-question (30D): expressionRuns 80 → 73
- huge/edit/property (7D): expressionRuns 558 → 594
- huge/edit/property (30D): expressionRuns 522 → 594
- huge/load/paint (30D): expressionRuns 92 → 48
- huge/select/element@q3978 (7D): expressionRuns 62 → 66
- huge/select/element@q3978 (30D): expressionRuns 104 → 66
- huge/tabs/preview (30D): conditionRuns 4415 → 2220, expressionRuns 2657 → 1337
- typical/edit/add-question (7D): expressionRuns 69 → 73
- typical/edit/add-question (30D): expressionRuns 80 → 73
- typical/edit/delete (7D): expressionRuns 62 → 66
- typical/edit/delete (30D): expressionRuns 142 → 66
- typical/edit/property (7D): expressionRuns 540 → 576
- typical/edit/property (30D): expressionRuns 504 → 576
- typical/edit/title-type (7D): expressionRuns 240 → 256
- typical/edit/title-type (30D): expressionRuns 224 → 256
- typical/load/paint (30D): expressionRuns 98 → 51
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48
- typical/select/element@survey (30D): expressionRuns 62 → 48
- typical/select/element@text1 (7D): expressionRuns 60 → 64
- typical/select/element@text1 (30D): expressionRuns 102 → 64
- typical/tabs/theme (30D): expressionRuns 225 → 187

Δ = today / build − 1.
