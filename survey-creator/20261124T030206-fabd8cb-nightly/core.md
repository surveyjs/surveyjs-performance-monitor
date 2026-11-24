# survey-creator · core · 24.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45316600023

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 111 | +1% | +3% | 🟢 **−24%** |
| huge/edit/property | 47.2 | −4% | +4% | 🟢 **−25%** |
| huge/load/json | 523 | −1% | +2% | 🟢 **−46%** |
| huge/output/dispose ᶜ | 0.69 | +1% | −3% | −1% |
| huge/output/text | 138 | 0% | −8% | 🟢 **−32%** |
| huge/select/element@q3978 | 124 | +1% | 🟢 **−36%** | 🟢 **−62%** |
| huge/tabs/designer | 68.3 | 0% | −6% | 🔴 **+87%** |
| huge/tabs/json | 361 | −1% | −2% | 🟢 **−29%** |
| huge/tabs/logic | 304 | 0% | +1% | 🟢 **−74%** |
| huge/tabs/preview | 1497 | +1% | −5% | 🟢 **−38%** |
| huge/tabs/roundtrip ᶜ | 3919 | 0% | −4% | −50% |
| huge/tabs/translation | 161 | 0% | +1% | 🟢 **−98%** |
| locales/load/json | 244 | −1% | 0% | 🟢 **−37%** |
| locales/tabs/translation | 94.1 | +2% | +2% | 🟢 **−97%** |
| typical/edit/add-question | 105 | +1% | +9% | −8% |
| typical/edit/convert@dropdown1 | 76.7 | −1% | +3% | 🟢 **−21%** |
| typical/edit/delete | 98.6 | −1% | 0% | 🟢 **−19%** |
| typical/edit/property | 24.8 | −5% | +10% | +6% |
| typical/edit/undo-redo | 89.6 | +1% | −1% | 🟢 **−26%** |
| typical/load/json | 150 | +1% | −1% | 🟢 **−10%** |
| typical/select/element@checkbox1 | 77.4 | 0% | +3% | 🟢 **−17%** |
| typical/select/element@dropdown1 | 84.7 | +1% | +4% | 🟢 **−17%** |
| typical/select/element@matrixdynamic1 | 83.9 | 0% | 0% | 🟢 **−29%** |
| typical/select/element@page1 | 32.2 | +1% | −3% | 🟢 **−38%** |
| typical/select/element@panel1 | 37 | −1% | +1% | 🟢 **−35%** |
| typical/select/element@paneldynamic1 | 82.3 | −1% | +1% | 🟢 **−21%** |
| typical/select/element@survey | 80.3 | −1% | −3% | 🟢 **−15%** |
| typical/select/element@text1 | 65.4 | +2% | +6% | 🟢 **−19%** |
| typical/tabs/theme | 746 | +1% | +1% | +1% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −36% | −38%..−32% | −37% | −36% | −35% | −35% | −33% | 🟢 |
| typical/edit/property | +10% | +3%..+19% | +16% | +6% | +13% | +10% | +11% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −24% | −30%..−19% | −23% | −26% | −26% | −28% | −21% | 🟢 |
| huge/edit/property | −25% | −30%..−22% | −24% | −27% | −28% | −28% | −24% | 🟢 |
| huge/load/json | −46% | −49%..−44% | −48% | −46% | −47% | −46% | −45% | 🟢 |
| huge/output/text | −32% | −38%..−25% | −30% | −33% | −33% | −36% | −27% | 🟢 |
| huge/select/element@q3978 | −62% | −63%..−61% | −62% | −61% | −62% | −61% | −62% | 🟢 |
| huge/tabs/designer | +87% | +8%..+330% | +118% | +83% | +283% | +82% | +67% | 🟢 |
| huge/tabs/json | −29% | −31%..−27% | −30% | −27% | −29% | −29% | −28% | 🟢 |
| huge/tabs/logic | −74% | −76%..−72% | −75% | −73% | −73% | −74% | −73% | 🟢 |
| huge/tabs/preview | −38% | −42%..−35% | −38% | −37% | −37% | −41% | −40% | 🟢 |
| huge/tabs/translation | −98% | −98%..−98% | −98% | −98% | −98% | −98% | −98% | 🟢 |
| locales/load/json | −37% | −40%..−34% | −38% | −37% | −36% | −36% | −39% | 🟢 |
| locales/tabs/translation | −97% | −97%..−97% | −97% | −97% | −97% | −97% | −97% | 🟢 |
| typical/edit/convert@dropdown1 | −21% | −28%..−12% | −16% | −24% | −17% | −24% | −20% | 🟢 |
| typical/edit/delete | −19% | −22%..−16% | −20% | −20% | −17% | −20% | −19% | 🟢 |
| typical/edit/undo-redo | −26% | −32%..−20% | −23% | −30% | −25% | −25% | −27% | 🟢 |
| typical/load/json | −10% | −11%..−8% | −10% | −8% | −9% | −10% | −10% | 🟢 |
| typical/select/element@checkbox1 | −17% | −19%..−14% | −18% | −15% | −18% | −17% | −16% | 🟢 |
| typical/select/element@dropdown1 | −17% | −19%..−15% | −18% | −18% | −16% | −18% | −16% | 🟢 |
| typical/select/element@matrixdynamic1 | −29% | −33%..−27% | −32% | −29% | −31% | −29% | −29% | 🟢 |
| typical/select/element@page1 | −38% | −40%..−35% | −38% | −36% | −37% | −37% | −39% | 🟢 |
| typical/select/element@panel1 | −35% | −39%..−32% | −37% | −35% | −35% | −38% | −34% | 🟢 |
| typical/select/element@paneldynamic1 | −21% | −26%..−15% | −20% | −21% | −18% | −20% | −25% | 🟢 |
| typical/select/element@survey | −15% | −19%..−12% | −18% | −15% | −13% | −17% | −15% | 🟢 |
| typical/select/element@text1 | −19% | −22%..−15% | −18% | −17% | −21% | −17% | −19% | 🟢 |

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
