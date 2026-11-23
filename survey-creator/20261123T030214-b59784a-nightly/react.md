# survey-creator · react · 23.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45103538940

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 90.6 | = today | −1% | 🟢 **−53%** |
| huge/designer/expand-all | 277 | = today | +4% | 🟢 **−39%** |
| huge/designer/object-selector | 2364 | = today | +1% | −16% |
| huge/edit/add-question | 181 | = today | −4% | 🟢 **−42%** |
| huge/edit/property | 103 | = today | +3% | 🟢 **−50%** |
| huge/load/paint | 524 | = today | +2% | 🟢 **−68%** |
| huge/select/element@q3978 | 423 | = today | −16% | 🟢 **−32%** |
| huge/tabs/designer | 152 | = today | −3% | 🟢 **−63%** |
| huge/tabs/json | 1306 | = today | 0% | −13% |
| huge/tabs/logic | 1692 | = today | +1% | 🟢 **−26%** |
| huge/tabs/preview | 676 | = today | −8% | 🟢 **−37%** |
| huge/tabs/roundtrip ᶜ | 5843 | = today | −3% | −41% |
| huge/tabs/translation | 243 | = today | +2% | 🟢 **−98%** |
| locales/tabs/translation | 191 | = today | +1% | 🟢 **−95%** |
| typical/edit/add-question | 147 | = today | −2% | 🟢 **−33%** |
| typical/edit/delete | 152 | = today | +2% | 🟢 **−34%** |
| typical/edit/property | 93.8 | = today | −2% | −20% |
| typical/edit/title-type | 119 | = today | −7% | −22% |
| typical/load/paint | 333 | = today | +4% | −23% |
| typical/select/element@matrixdynamic1 | 73.2 | = today | +3% | 🟢 **−37%** |
| typical/select/element@survey | 69.1 | = today | −1% | 🟢 **−34%** |
| typical/select/element@text1 | 69.2 | = today | +3% | −28% |
| typical/tabs/theme | 675 | = today | +1% | −9% |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −53% | −54% | −53% | −53% | −51% | −54% | 🟢 |
| huge/designer/expand-all | −39% | −40% | −38% | −39% | −38% | −39% | 🟢 |
| huge/edit/add-question | −42% | −44% | −44% | −40% | −44% | −42% | 🟢 |
| huge/edit/property | −50% | −53% | −52% | −51% | −40% | −49% | 🟢 |
| huge/load/paint | −68% | −69% | −68% | −68% | −69% | −68% | 🟢 |
| huge/select/element@q3978 | −32% | −31% | −32% | −33% | −32% | −32% | 🟢 |
| huge/tabs/designer | −63% | −63% | −62% | −64% | −64% | −64% | 🟢 |
| huge/tabs/logic | −26% | −26% | −27% | −26% | −26% | −27% | 🟢 |
| huge/tabs/preview | −37% | −37% | −39% | −37% | −38% | −37% | 🟢 |
| huge/tabs/translation | −98% | −98% | −98% | −98% | −98% | −98% | 🟢 |
| locales/tabs/translation | −95% | −95% | −95% | −95% | −95% | −95% | 🟢 |
| typical/edit/add-question | −33% | −34% | −33% | −33% | −33% | −31% | 🟢 |
| typical/edit/delete | −34% | −31% | −32% | −33% | −35% | −36% | 🟢 |
| typical/select/element@matrixdynamic1 | −37% | −37% | −38% | −38% | −36% | −37% | 🟢 |
| typical/select/element@survey | −34% | −32% | −36% | −36% | −34% | −32% | 🟢 |
| typical/select/element@text1 | −28% | −24% | −27% | −30% | −30% | −29% | 🔴 |

## Counters (information)
- huge/edit/add-question (7D): expressionRuns 69 → 73 (work)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (7D): expressionRuns 558 → 594 (work)
- huge/edit/property (30D): expressionRuns 522 → 594 (work)
- huge/load/paint (30D): expressionRuns 92 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 62 → 66 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660 (work), expressionRuns 7971 → 4011 (work)
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
