# survey-creator · core · 26.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45746256674

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 108 | 0% | +6% | 🟢 **−12%** |
| huge/edit/property | 48.6 | +2% | +2% | 🟢 **−15%** |
| huge/load/json | 880 | +2% | +1% | 🟢 **−42%** |
| huge/output/dispose ᶜ | 0.7 | −1% | +4% | +3% |
| huge/output/text | 116 | +1% | −1% | 🟢 **−21%** |
| huge/select/element@q3978 | 123 | 0% | +1% | 🟢 **−40%** |
| huge/tabs/designer | 58.4 | +1% | −2% | 🟢 **−12%** |
| huge/tabs/json | 454 | +5% | −2% | 🟢 **−23%** |
| huge/tabs/logic | 298 | +3% | +3% | 🟢 **−16%** |
| huge/tabs/preview | 852 | −1% | +3% | 🟢 **−22%** |
| huge/tabs/roundtrip ᶜ | 3826 | +1% | +1% | −17% |
| huge/tabs/translation | 124 | +1% | +1% | 🟢 **−73%** |
| locales/load/json | 219 | +1% | +2% | 🟢 **−31%** |
| locales/tabs/translation | 90.5 | −1% | +4% | 🟢 **−24%** |
| typical/edit/add-question | 71.6 | +4% | 0% | +9% |
| typical/edit/convert@dropdown1 | 114 | −1% | −1% | +6% |
| typical/edit/delete | 79.8 | −3% | −1% | −3% |
| typical/edit/property | 25.1 | −2% | +5% | +17% |
| typical/edit/undo-redo | 90.6 | 0% | 0% | −1% |
| typical/load/json | 160 | −1% | +1% | −4% |
| typical/select/element@checkbox1 | 119 | −1% | −1% | 🔴 **+11%** |
| typical/select/element@dropdown1 | 74.6 | +3% | +1% | +7% |
| typical/select/element@matrixdynamic1 | 84.6 | +1% | 0% | +7% |
| typical/select/element@page1 | 31.7 | −1% | +1% | +10% |
| typical/select/element@panel1 | 36.4 | −1% | +3% | +4% |
| typical/select/element@paneldynamic1 | 82.9 | +2% | 0% | +7% |
| typical/select/element@survey | 75.1 | −2% | 0% | −5% |
| typical/select/element@text1 | 70.2 | −1% | +1% | 🔴 **+11%** |
| typical/tabs/theme | 1101 | +1% | 0% | +5% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −12% | −16%..−9% | −13% | −11% | −15% | −10% | −13% | 🟢 |
| huge/edit/property | −15% | −18%..−10% | −17% | −13% | −12% | −14% | −15% | 🟢 |
| huge/load/json | −42% | −44%..−40% | −42% | −41% | −42% | −43% | −44% | 🟢 |
| huge/output/text | −21% | −31%..−10% | −24% | −16% | −21% | −17% | −28% | 🟢 |
| huge/select/element@q3978 | −40% | −43%..−37% | −39% | −39% | −41% | −42% | −39% | 🟢 |
| huge/tabs/designer | −12% | −16%..−8% | −9% | −14% | −12% | −13% | −12% | 🟢 |
| huge/tabs/json | −23% | −28%..−17% | −24% | −24% | −25% | −24% | −18% | 🟢 |
| huge/tabs/logic | −16% | −23%..−7% | −18% | −16% | −18% | −8% | −15% | 🟢 |
| huge/tabs/preview | −22% | −27%..−17% | −26% | −21% | −21% | −23% | −21% | 🟢 |
| huge/tabs/translation | −73% | −75%..−71% | −74% | −73% | −73% | −75% | −73% | 🟢 |
| locales/load/json | −31% | −34%..−27% | −30% | −32% | −32% | −28% | −30% | 🟢 |
| locales/tabs/translation | −24% | −28%..−22% | −24% | −23% | −25% | −27% | −26% | 🟢 |
| typical/edit/property | +17% | +7%..+22% | +11% | +13% | +21% | +13% | +16% | 🔴 |
| typical/select/element@checkbox1 | +11% | +6%..+17% | +11% | +11% | +8% | +12% | +15% | 🟢 |
| typical/select/element@text1 | +11% | +5%..+20% | +11% | +10% | +11% | +11% | +19% | 🟢 |

## Counters (information)
- huge/edit/add-question (30D): expressionRuns 64 → 73 (work)
- huge/edit/property (30D): expressionRuns 290 → 330 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 66 (work)
- locales/load/json (30D): expressionRuns 46 → 48 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 73 (work)
- typical/edit/convert@dropdown1 (30D): expressionRuns 58 → 66 (work)
- typical/edit/delete (30D): expressionRuns 58 → 66 (work)
- typical/edit/property (30D): expressionRuns 280 → 320 (work)
- typical/edit/undo-redo (30D): expressionRuns 69 → 72 (work)
- typical/load/json (30D): expressionRuns 52 → 51 (work)
- typical/select/element@checkbox1 (30D): expressionRuns 58 → 66 (work)
- typical/select/element@dropdown1 (30D): expressionRuns 58 → 66 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 48 (work)
- typical/select/element@page1 (30D): expressionRuns 16 → 18 (work)
- typical/select/element@panel1 (30D): expressionRuns 22 → 24 (work)
- typical/select/element@paneldynamic1 (30D): expressionRuns 54 → 64 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 64 (work)

Δ = today / build − 1.
