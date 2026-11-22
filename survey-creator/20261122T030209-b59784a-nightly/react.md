# survey-creator · react · 22.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44978740425

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 95.4 | = today | −2% | 🟢 **−54%** |
| huge/designer/expand-all | 363 | = today | 0% | 🟢 **−37%** |
| huge/designer/object-selector | 2546 | = today | 0% | −15% |
| huge/edit/add-question | 127 | = today | −4% | 🟢 **−45%** |
| huge/edit/property | 91.2 | = today | −5% | 🟢 **−39%** |
| huge/load/paint | 514 | = today | +1% | 🟢 **−68%** |
| huge/select/element@q3978 | 372 | = today | −15% | 🟢 **−29%** |
| huge/tabs/designer | 150 | = today | −2% | 🟢 **−62%** |
| huge/tabs/json | 1079 | = today | 0% | −14% |
| huge/tabs/logic | 940 | = today | +2% | 🟢 **−31%** |
| huge/tabs/preview | 611 | = today | −9% | 🟢 **−39%** |
| huge/tabs/roundtrip ᶜ | 9394 | = today | −3% | −42% |
| huge/tabs/translation | 165 | = today | −1% | 🟢 **−98%** |
| locales/tabs/translation | 187 | = today | +1% | 🟢 **−96%** |
| typical/edit/add-question | 140 | = today | −3% | 🟢 **−33%** |
| typical/edit/delete | 92.5 | = today | +2% | 🟢 **−36%** |
| typical/edit/property | 98.3 | = today | −1% | −18% |
| typical/edit/title-type | 69.9 | = today | −8% | −16% |
| typical/load/paint | 456 | = today | 0% | −22% |
| typical/select/element@matrixdynamic1 | 74.1 | = today | +2% | 🟢 **−38%** |
| typical/select/element@survey | 92.7 | = today | −4% | 🟢 **−34%** |
| typical/select/element@text1 | 67.6 | = today | +2% | 🟢 **−28%** |
| typical/tabs/theme | 490 | = today | 0% | −10% |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −54% | −54% | −55% | −54% | −53% | −55% | 🟢 |
| huge/designer/expand-all | −37% | −38% | −35% | −39% | −36% | −37% | 🟢 |
| huge/edit/add-question | −45% | −46% | −46% | −46% | −45% | −44% | 🟢 |
| huge/edit/property | −39% | −38% | −38% | −38% | −36% | −41% | 🟢 |
| huge/load/paint | −68% | −68% | −68% | −68% | −68% | −68% | 🟢 |
| huge/select/element@q3978 | −29% | −29% | −26% | −29% | −29% | −29% | 🟢 |
| huge/tabs/designer | −62% | −63% | −63% | −60% | −62% | −65% | 🟢 |
| huge/tabs/logic | −31% | −29% | −32% | −30% | −31% | −30% | 🟢 |
| huge/tabs/preview | −39% | −40% | −38% | −39% | −39% | −39% | 🟢 |
| huge/tabs/translation | −98% | −99% | −98% | −99% | −98% | −98% | 🟢 |
| locales/tabs/translation | −96% | −96% | −96% | −96% | −96% | −96% | 🟢 |
| typical/edit/add-question | −33% | −34% | −29% | −31% | −27% | −37% | 🟢 |
| typical/edit/delete | −36% | −36% | −34% | −35% | −36% | −37% | 🟢 |
| typical/select/element@matrixdynamic1 | −38% | −37% | −38% | −39% | −38% | −35% | 🟢 |
| typical/select/element@survey | −34% | −36% | −35% | −32% | −34% | −35% | 🟢 |
| typical/select/element@text1 | −28% | −26% | −25% | −29% | −29% | −27% | 🟢 |

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
