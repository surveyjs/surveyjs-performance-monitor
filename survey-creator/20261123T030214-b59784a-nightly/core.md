# survey-creator · core · 23.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45103538940

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 159 | = today | +4% | −25% |
| huge/edit/property | 49.9 | = today | +7% | −25% |
| huge/load/json | 490 | = today | 0% | 🟢 **−44%** |
| huge/output/dispose ᶜ | 0.71 | = today | 0% | −4% |
| huge/output/text | 119 | = today | −8% | 🟢 **−31%** |
| huge/select/element@q3978 | 172 | = today | 🟢 **−36%** | 🟢 **−62%** |
| huge/tabs/designer | 75.9 | = today | −6% | 🔴 **+106%** |
| huge/tabs/json | 482 | = today | 0% | 🟢 **−28%** |
| huge/tabs/logic | 448 | = today | −1% | 🟢 **−73%** |
| huge/tabs/preview | 1408 | = today | −11% | 🟢 **−38%** |
| huge/tabs/roundtrip ᶜ | 5448 | = today | −7% | −50% |
| huge/tabs/translation | 138 | = today | −1% | 🟢 **−97%** |
| locales/load/json | 233 | = today | +1% | 🟢 **−37%** |
| locales/tabs/translation | 161 | = today | +3% | 🟢 **−97%** |
| typical/edit/add-question | 72.6 | = today | +5% | −7% |
| typical/edit/convert@dropdown1 | 95.4 | = today | +2% | −21% |
| typical/edit/delete | 112 | = today | +2% | −22% |
| typical/edit/property | 34.4 | = today | +5% | +10% |
| typical/edit/undo-redo | 133 | = today | −2% | −25% |
| typical/load/json | 169 | = today | −1% | −10% |
| typical/select/element@checkbox1 | 86.9 | = today | +4% | −21% |
| typical/select/element@dropdown1 | 81.4 | = today | +4% | −17% |
| typical/select/element@matrixdynamic1 | 123 | = today | −2% | 🟢 **−33%** |
| typical/select/element@page1 | 30.4 | = today | −5% | 🟢 **−38%** |
| typical/select/element@panel1 | 34.9 | = today | −1% | 🟢 **−36%** |
| typical/select/element@paneldynamic1 | 93.5 | = today | −1% | −24% |
| typical/select/element@survey | 118 | = today | −3% | −19% |
| typical/select/element@text1 | 103 | = today | +4% | −21% |
| typical/tabs/theme | 752 | = today | −1% | +1% |

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −36% | −35% | −37% | −36% | −37% | −36% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/load/json | −44% | −40% | −44% | −44% | −43% | −46% | 🟢 |
| huge/output/text | −31% | −31% | −31% | −33% | −31% | −32% | 🟢 |
| huge/select/element@q3978 | −62% | −62% | −63% | −63% | −62% | −63% | 🟢 |
| huge/tabs/designer | +106% | +258% | +102% | +91% | +110% | +108% | 🟢 |
| huge/tabs/json | −28% | −27% | −29% | −28% | −29% | −27% | 🟢 |
| huge/tabs/logic | −73% | −73% | −73% | −72% | −72% | −73% | 🟢 |
| huge/tabs/preview | −38% | −37% | −37% | −38% | −39% | −38% | 🟢 |
| huge/tabs/translation | −97% | −97% | −97% | −97% | −97% | −97% | 🟢 |
| locales/load/json | −37% | −38% | −37% | −36% | −37% | −38% | 🟢 |
| locales/tabs/translation | −97% | −97% | −97% | −97% | −97% | −97% | 🟢 |
| typical/edit/undo-redo | −25% | −27% | −27% | −24% | −25% | −26% | 🔴 |
| typical/select/element@matrixdynamic1 | −33% | −32% | −33% | −33% | −36% | −30% | 🟢 |
| typical/select/element@page1 | −38% | −37% | −39% | −42% | −36% | −37% | 🟢 |
| typical/select/element@panel1 | −36% | −39% | −34% | −36% | −35% | −38% | 🟢 |

## Counters (information)
- huge/edit/add-question (7D): expressionRuns 69 → 73 (work)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (7D): expressionRuns 310 → 330 (work)
- huge/edit/property (30D): expressionRuns 290 → 330 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 62 → 66 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660 (work), expressionRuns 7971 → 4011 (work)
- locales/load/json (30D): expressionRuns 46 → 48 (work)
- typical/edit/add-question (7D): expressionRuns 69 → 73 (work)
- typical/edit/add-question (30D): expressionRuns 80 → 73 (work)
- typical/edit/convert@dropdown1 (7D): expressionRuns 62 → 66 (work)
- typical/edit/convert@dropdown1 (30D): expressionRuns 145 → 66 (work)
- typical/edit/delete (7D): expressionRuns 62 → 66 (work)
- typical/edit/delete (30D): expressionRuns 142 → 66 (work)
- typical/edit/property (7D): expressionRuns 300 → 320 (work)
- typical/edit/property (30D): expressionRuns 280 → 320 (work)
- typical/edit/undo-redo (30D): expressionRuns 185 → 72 (work)
- typical/load/json (30D): expressionRuns 52 → 51 (work)
- typical/select/element@checkbox1 (7D): expressionRuns 62 → 66 (work)
- typical/select/element@checkbox1 (30D): expressionRuns 104 → 66 (work)
- typical/select/element@dropdown1 (7D): expressionRuns 62 → 66 (work)
- typical/select/element@dropdown1 (30D): expressionRuns 104 → 66 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48 (work)
- typical/select/element@page1 (30D): expressionRuns 62 → 18 (work)
- typical/select/element@panel1 (30D): expressionRuns 68 → 24 (work)
- typical/select/element@paneldynamic1 (7D): expressionRuns 60 → 64 (work)
- typical/select/element@paneldynamic1 (30D): expressionRuns 98 → 64 (work)
- typical/select/element@survey (30D): expressionRuns 62 → 48 (work)
- typical/select/element@text1 (7D): expressionRuns 60 → 64 (work)
- typical/select/element@text1 (30D): expressionRuns 102 → 64 (work)
- typical/tabs/theme (30D): expressionRuns 222 → 187 (work)

Δ = today / build − 1.
