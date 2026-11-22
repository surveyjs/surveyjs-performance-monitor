# survey-creator · core · 22.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44978740425

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 94.3 | = today | +7% | −25% |
| huge/edit/property | 45.9 | = today | +8% | −26% |
| huge/load/json | 881 | = today | +1% | 🟢 **−46%** |
| huge/output/dispose ᶜ | 0.7 | = today | +1% | −8% |
| huge/output/text | 114 | = today | −9% | 🟢 **−47%** |
| huge/select/element@q3978 | 111 | = today | 🟢 **−37%** | 🟢 **−62%** |
| huge/tabs/designer | 60 | = today | −4% | 🔴 **+200%** |
| huge/tabs/json | 345 | = today | +1% | 🟢 **−35%** |
| huge/tabs/logic | 316 | = today | 0% | 🟢 **−73%** |
| huge/tabs/preview | 837 | = today | −12% | 🟢 **−39%** |
| huge/tabs/roundtrip ᶜ | 5666 | = today | −7% | −52% |
| huge/tabs/translation | 167 | = today | +1% | 🟢 **−99%** |
| locales/load/json | 221 | = today | +4% | 🟢 **−38%** |
| locales/tabs/translation | 96.4 | = today | +1% | 🟢 **−98%** |
| typical/edit/add-question | 72.6 | = today | +6% | −6% |
| typical/edit/convert@dropdown1 | 79.6 | = today | +3% | −18% |
| typical/edit/delete | 96.3 | = today | +3% | −20% |
| typical/edit/property | 24.9 | = today | +9% | +14% |
| typical/edit/undo-redo | 91.5 | = today | −2% | −24% |
| typical/load/json | 160 | = today | 0% | −11% |
| typical/select/element@checkbox1 | 77 | = today | +6% | −18% |
| typical/select/element@dropdown1 | 78.5 | = today | +2% | −18% |
| typical/select/element@matrixdynamic1 | 84.1 | = today | +4% | 🟢 **−31%** |
| typical/select/element@page1 | 33.2 | = today | −3% | 🟢 **−38%** |
| typical/select/element@panel1 | 35.1 | = today | −1% | 🟢 **−36%** |
| typical/select/element@paneldynamic1 | 125 | = today | 0% | −24% |
| typical/select/element@survey | 74 | = today | −4% | −17% |
| typical/select/element@text1 | 66.2 | = today | +6% | −18% |
| typical/tabs/theme | 745 | = today | +1% | 0% |

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −37% | −38% | −37% | −38% | −36% | −37% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −25% | −25% | −25% | −29% | −25% | −22% | 🔴 |
| huge/edit/property | −26% | −25% | −23% | −28% | −27% | −27% | 🔴 |
| huge/load/json | −46% | −48% | −48% | −46% | −46% | −46% | 🟢 |
| huge/output/text | −47% | −47% | −48% | −47% | −47% | −45% | 🟢 |
| huge/select/element@q3978 | −62% | −63% | −62% | −62% | −61% | −63% | 🟢 |
| huge/tabs/designer | +200% | +152% | +230% | +211% | +207% | +194% | 🟢 |
| huge/tabs/json | −35% | −35% | −34% | −35% | −35% | −35% | 🟢 |
| huge/tabs/logic | −73% | −74% | −72% | −73% | −74% | −73% | 🟢 |
| huge/tabs/preview | −39% | −38% | −38% | −38% | −40% | −39% | 🟢 |
| huge/tabs/translation | −99% | −99% | −99% | −99% | −99% | −99% | 🟢 |
| locales/load/json | −38% | −38% | −35% | −37% | −35% | −37% | 🟢 |
| locales/tabs/translation | −98% | −97% | −97% | −98% | −98% | −97% | 🟢 |
| typical/select/element@matrixdynamic1 | −31% | −31% | −30% | −32% | −32% | −30% | 🟢 |
| typical/select/element@page1 | −38% | −38% | −38% | −35% | −40% | −38% | 🟢 |
| typical/select/element@panel1 | −36% | −37% | −34% | −36% | −38% | −35% | 🟢 |

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
