# survey-creator · react · 20.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44664888297

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 89.6 | +4% | +1% | 🟢 **−56%** ʳ |
| huge/designer/expand-all | 237 | 0% | −1% | 🟢 **−35%** ʳ |
| huge/designer/object-selector | 1987 | 0% | +1% | −16% |
| huge/edit/add-question | 180 | −4% | −3% 🔴 **work** | 🟢 **−48%** 🟢 **work** ʳ |
| huge/edit/property | 138 | −6% | −5% 🔴 **work** | 🟢 **−47%** 🔴 **work** ʳ |
| huge/load/paint | 589 | 0% | +5% | 🟢 **−68%** 🟢 **work** ʳ |
| huge/select/element@q3978 | 419 | 0% | −18% 🔴 **work** | 🟢 **−32%** 🟢 **work** ʳ |
| huge/tabs/designer | 154 | 0% | 0% | 🟢 **−61%** ʳ |
| huge/tabs/json | 822 | −1% | −1% | −15% |
| huge/tabs/logic | 932 | +2% | +3% | 🟢 **−31%** ʳ |
| huge/tabs/preview | 629 | +1% | −9% | 🟢 **−39%** 🟢 **work** ʳ |
| huge/tabs/roundtrip ᶜ | 9711 | 0% | −2% | −41% 🟢 **work** |
| huge/tabs/translation | 221 | +1% | +1% | 🟢 **−99%** ʳ |
| locales/tabs/translation | 297 | +1% | +1% | 🟢 **−95%** ʳ |
| typical/edit/add-question | 142 | −3% | −3% 🔴 **work** | 🟢 **−33%** 🟢 **work** ʳ |
| typical/edit/delete | 86.1 | −2% | +1% 🔴 **work** | 🟢 **−34%** 🟢 **work** ʳ |
| typical/edit/property | 59.8 | −8% | −4% 🔴 **work** | −18% 🔴 **work** |
| typical/edit/title-type | 109 | −9% | −10% 🔴 **work** | −22% 🔴 **work** |
| typical/load/paint | 276 | +2% | +1% | −22% 🟢 **work** |
| typical/select/element@matrixdynamic1 | 73 | 0% | +3% 🔴 **work** | 🟢 **−37%** 🟢 **work** ʳ |
| typical/select/element@survey | 110 | −3% | 0% | 🟢 **−35%** 🟢 **work** ʳ |
| typical/select/element@text1 | 81.1 | +1% | +3% 🔴 **work** | 🟢 **−28%** 🟢 **work** ʳ |
| typical/tabs/theme | 426 | +2% | +2% | −8% 🟢 **work** |

🔴 slower · 🟢 faster (over 25% and over 8 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | 30D | 85.6 | 195 | −56% | −56% | −53% | −55% | −57% | −54% | yes |
| huge/designer/expand-all | 30D | 231 | 358 | −35% | −36% | −34% | −36% | −35% | −36% | yes |
| huge/edit/add-question | 30D | 177 | 344 | −48% | −47% | −48% | −46% | −50% | −50% | yes |
| huge/edit/property | 30D | 142 | 267 | −47% | −49% | −46% | −49% | −45% | −45% | yes |
| huge/load/paint | 30D | 594 | 1846 | −68% | −68% | −67% | −67% | −65% | −68% | yes |
| huge/select/element@q3978 | 30D | 421 | 621 | −32% | −32% | −32% | −33% | −31% | −33% | yes |
| huge/tabs/designer | 30D | 155 | 396 | −61% | −63% | −60% | −61% | −60% | −59% | yes |
| huge/tabs/logic | 30D | 922 | 1337 | −31% | −30% | −31% | −31% | −31% | −32% | yes |
| huge/tabs/preview | 30D | 631 | 1041 | −39% | −39% | −39% | −39% | −40% | −40% | yes |
| huge/tabs/translation | 30D | 220 | 16084 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/tabs/translation | 30D | 297 | 6476 | −95% | −95% | −95% | −95% | −95% | −95% | yes |
| typical/edit/add-question | 30D | 142 | 213 | −33% | −35% | −33% | −34% | −31% | −32% | yes |
| typical/edit/delete | 30D | 85.7 | 129 | −34% | −33% | −34% | −33% | −35% | −34% | yes |
| typical/select/element@matrixdynamic1 | 30D | 72.7 | 116 | −37% | −38% | −37% | −38% | −37% | −36% | yes |
| typical/select/element@survey | 30D | 110 | 168 | −35% | −34% | −36% | −35% | −35% | −33% | yes |
| typical/select/element@text1 | 30D | 81 | 112 | −28% | −31% | −29% | −26% | −26% | −30% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Counters (judged)
- huge/edit/add-question (7D): expressionRuns 69 → 73 (work)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (7D): expressionRuns 558 → 594 (work)
- huge/edit/property (30D): expressionRuns 522 → 594 (work)
- huge/load/paint (30D): expressionRuns 92 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 62 → 66 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- typical/edit/add-question (7D): expressionRuns 69 → 73 (work)
- typical/edit/add-question (30D): expressionRuns 80 → 73 (work)
- typical/edit/delete (7D): expressionRuns 62 → 66 (work)
- typical/edit/delete (30D): expressionRuns 142 → 66 (work)
- typical/edit/property (7D): expressionRuns 540 → 576 (work)
- typical/edit/property (30D): expressionRuns 504 → 576 (work)
- typical/edit/title-type (7D): expressionRuns 240 → 256 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 256 (work)
- typical/load/paint (30D): expressionRuns 98 → 51 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48 (work)
- typical/select/element@survey (30D): expressionRuns 62 → 48 (work)
- typical/select/element@text1 (7D): expressionRuns 60 → 64 (work)
- typical/select/element@text1 (30D): expressionRuns 102 → 64 (work)
- typical/tabs/theme (30D): expressionRuns 222 → 187 (work)

Δ = today / build − 1.
