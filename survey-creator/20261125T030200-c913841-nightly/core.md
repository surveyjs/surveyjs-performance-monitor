# survey-creator · core · 25.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45537070349

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 141 | 0% | +3% | 🟢 **−24%** |
| huge/edit/property | 48.9 | +1% | +1% | 🟢 **−28%** |
| huge/load/json | 513 | 0% | +1% | 🟢 **−46%** |
| huge/output/dispose ᶜ | 0.98 | −1% | +5% | −5% |
| huge/output/text | 121 | +3% | 🟢 **−10%** | 🟢 **−33%** |
| huge/select/element@q3978 | 171 | −1% | 🟢 **−40%** | 🟢 **−63%** |
| huge/tabs/designer | 53.3 | +1% | −2% | 🔴 **+315%** |
| huge/tabs/json | 622 | +2% | −4% | 🟢 **−28%** |
| huge/tabs/logic | 303 | −1% | 0% | 🟢 **−73%** |
| huge/tabs/preview | 852 | 0% | +1% | 🟢 **−37%** |
| huge/tabs/roundtrip ᶜ | 3774 | −1% | +1% | −51% |
| huge/tabs/translation | 107 | −1% | +1% | 🟢 **−98%** |
| locales/load/json | 247 | +1% | +3% | 🟢 **−36%** |
| locales/tabs/translation | 156 | +2% | +1% | 🟢 **−97%** |
| typical/edit/add-question | 72 | 0% | +1% | −5% |
| typical/edit/convert@dropdown1 | 79.4 | −1% | 0% | 🟢 **−19%** |
| typical/edit/delete | 147 | +1% | 0% | 🟢 **−21%** |
| typical/edit/property | 33.9 | −2% | +2% | 🔴 **+11%** |
| typical/edit/undo-redo | 143 | 0% | +3% | 🟢 **−23%** |
| typical/load/json | 238 | −1% | +2% | −8% |
| typical/select/element@checkbox1 | 80.7 | +1% | 0% | 🟢 **−19%** |
| typical/select/element@dropdown1 | 82.6 | 0% | −2% | 🟢 **−18%** |
| typical/select/element@matrixdynamic1 | 126 | 0% | −1% | 🟢 **−32%** |
| typical/select/element@page1 | 32.4 | +2% | +1% | 🟢 **−37%** |
| typical/select/element@panel1 | 36.1 | −2% | +3% | 🟢 **−36%** |
| typical/select/element@paneldynamic1 | 125 | −1% | −2% | 🟢 **−24%** |
| typical/select/element@survey | 113 | 0% | −1% | 🟢 **−17%** |
| typical/select/element@text1 | 99 | −1% | +3% | 🟢 **−16%** |
| typical/tabs/theme | 725 | −1% | +1% | +1% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/output/text | −10% | −15%..−3% | −4% | −11% | −9% | −8% | −12% | 🟢 |
| huge/select/element@q3978 | −40% | −43%..−37% | −38% | −41% | −39% | −41% | −42% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −24% | −26%..−20% | −21% | −23% | −24% | −23% | −25% | 🟢 |
| huge/edit/property | −28% | −32%..−22% | −26% | −27% | −28% | −25% | −31% | 🟢 |
| huge/load/json | −46% | −52%..−41% | −47% | −49% | −42% | −48% | −46% | 🟢 |
| huge/output/text | −33% | −36%..−29% | −35% | −32% | −33% | −31% | −33% | 🟢 |
| huge/select/element@q3978 | −63% | −65%..−62% | −64% | −65% | −63% | −64% | −63% | 🟢 |
| huge/tabs/designer | +315% | +159%..+465% | +304% | +339% | +308% | +174% | +312% | 🟢 |
| huge/tabs/json | −28% | −32%..−25% | −29% | −30% | −29% | −26% | −28% | 🟢 |
| huge/tabs/logic | −73% | −75%..−72% | −72% | −73% | −74% | −74% | −73% | 🟢 |
| huge/tabs/preview | −37% | −43%..−30% | −36% | −37% | −36% | −41% | −32% | 🟢 |
| huge/tabs/translation | −98% | −99%..−97% | −98% | −98% | −98% | −99% | −98% | 🟢 |
| locales/load/json | −36% | −38%..−34% | −36% | −36% | −34% | −38% | −37% | 🟢 |
| locales/tabs/translation | −97% | −97%..−97% | −97% | −97% | −97% | −97% | −97% | 🟢 |
| typical/edit/convert@dropdown1 | −19% | −20%..−17% | −19% | −19% | −18% | −19% | −17% | 🟢 |
| typical/edit/delete | −21% | −23%..−18% | −22% | −19% | −21% | −20% | −22% | 🟢 |
| typical/edit/property | +11% | +8%..+17% | +11% | +10% | +12% | +13% | +15% | 🟢 |
| typical/edit/undo-redo | −23% | −28%..−18% | −27% | −21% | −24% | −22% | −22% | 🟢 |
| typical/select/element@checkbox1 | −19% | −21%..−16% | −18% | −17% | −18% | −19% | −20% | 🟢 |
| typical/select/element@dropdown1 | −18% | −19%..−15% | −15% | −18% | −18% | −17% | −18% | 🟢 |
| typical/select/element@matrixdynamic1 | −32% | −36%..−30% | −32% | −35% | −34% | −32% | −32% | 🟢 |
| typical/select/element@page1 | −37% | −40%..−35% | −38% | −36% | −38% | −36% | −39% | 🟢 |
| typical/select/element@panel1 | −36% | −38%..−33% | −38% | −36% | −35% | −35% | −35% | 🟢 |
| typical/select/element@paneldynamic1 | −24% | −25%..−23% | −24% | −24% | −23% | −24% | −24% | 🟢 |
| typical/select/element@survey | −17% | −20%..−13% | −15% | −17% | −16% | −19% | −16% | 🟢 |
| typical/select/element@text1 | −16% | −23%..−9% | −17% | −14% | −11% | −20% | −19% | 🟢 |

## Counters (information)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (30D): expressionRuns 290 → 330 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660 (work), expressionRuns 7971 → 4011 (work)
- locales/load/json (30D): expressionRuns 46 → 48 (work)
- typical/edit/add-question (30D): expressionRuns 80 → 73 (work)
- typical/edit/convert@dropdown1 (30D): expressionRuns 145 → 66 (work)
- typical/edit/delete (30D): expressionRuns 142 → 66 (work)
- typical/edit/property (30D): expressionRuns 280 → 320 (work)
- typical/edit/undo-redo (30D): expressionRuns 185 → 72 (work)
- typical/load/json (30D): expressionRuns 52 → 51 (work)
- typical/select/element@checkbox1 (30D): expressionRuns 104 → 66 (work)
- typical/select/element@dropdown1 (30D): expressionRuns 104 → 66 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48 (work)
- typical/select/element@page1 (30D): expressionRuns 62 → 18 (work)
- typical/select/element@panel1 (30D): expressionRuns 68 → 24 (work)
- typical/select/element@paneldynamic1 (30D): expressionRuns 98 → 64 (work)
- typical/select/element@survey (30D): expressionRuns 62 → 48 (work)
- typical/select/element@text1 (30D): expressionRuns 102 → 64 (work)
- typical/tabs/theme (30D): expressionRuns 222 → 187 (work)

Δ = today / build − 1.
