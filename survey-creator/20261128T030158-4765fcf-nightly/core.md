# survey-creator · core · 28.11.2026 03:01 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46100872553

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 103 | 0% | −5% | −11% |
| huge/edit/property | 34.6 | 0% | −6% | −12% |
| huge/load/json | 886 | 0% | −2% | −1% |
| huge/output/dispose ᶜ | 0.75 | −1% | 0% | +3% |
| huge/output/text | 119 | −1% | −2% | 🟢 **−11%** |
| huge/select/element@q3978 | 162 | −2% | −5% | 🟢 **−41%** |
| huge/tabs/designer | 48 | −1% | −1% | −2% |
| huge/tabs/json | 363 | 0% | −1% | −4% |
| huge/tabs/logic | 458 | +1% | 0% | −9% |
| huge/tabs/preview | 992 | 0% | −5% | 🟢 **−13%** |
| huge/tabs/roundtrip ᶜ | 3722 | +1% | −2% | −9% |
| huge/tabs/translation | 167 | −1% | −1% | 🟢 **−68%** |
| locales/load/json | 297 | 0% | +1% | +3% |
| locales/tabs/translation | 92.1 | −2% | −1% | 🟢 **−20%** |
| typical/edit/add-question | 59.6 | +4% | −2% | +1% |
| typical/edit/convert@dropdown1 | 71.7 | +1% | −5% | +4% |
| typical/edit/delete | 93 | −1% | −5% | +1% |
| typical/edit/property | 23.2 | +2% | −10% | +4% |
| typical/edit/undo-redo | 134 | 0% | +2% | −1% |
| typical/load/json | 141 | −1% | −2% | +1% |
| typical/select/element@checkbox1 | 110 | 0% | −7% | +4% |
| typical/select/element@dropdown1 | 78 | +1% | −5% | +4% |
| typical/select/element@matrixdynamic1 | 73 | +2% | −5% | −1% |
| typical/select/element@page1 | 45.2 | −1% | 0% | +4% |
| typical/select/element@panel1 | 36.3 | −1% | +1% | +8% |
| typical/select/element@paneldynamic1 | 75.2 | 0% | −7% | +5% |
| typical/select/element@survey | 82.6 | −1% | +1% | +1% |
| typical/select/element@text1 | 64 | 0% | −5% | 🔴 **+9%** |
| typical/tabs/theme | 578 | 0% | −1% | 0% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| typical/edit/property | −10% | −14%..−4% | −12% | −7% | −8% | −11% | −7% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −11% | −22%..+1% | −20% | −8% | −10% | −5% | −13% | 🔴 |
| huge/edit/property | −12% | −21%..−4% | −11% | −7% | −12% | −17% | −17% | 🔴 |
| huge/output/text | −11% | −16%..−6% | −14% | −9% | −12% | −8% | −14% | 🟢 |
| huge/select/element@q3978 | −41% | −43%..−39% | −41% | −42% | −41% | −42% | −41% | 🟢 |
| huge/tabs/preview | −13% | −15%..−11% | −13% | −14% | −13% | −12% | −12% | 🟢 |
| huge/tabs/translation | −68% | −69%..−67% | −68% | −69% | −68% | −68% | −68% | 🟢 |
| locales/tabs/translation | −20% | −32%..−6% | −26% | −24% | −9% | −19% | −21% | 🟢 |
| typical/select/element@text1 | +9% | +5%..+15% | +12% | +11% | +10% | +11% | +6% | 🟢 |

## Counters (information)
- huge/edit/add-question (7D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (30D): expressionRuns 64 → 69 (work)
- huge/edit/property (7D): expressionRuns 330 → 310 (work)
- huge/edit/property (30D): expressionRuns 290 → 310 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 62 (work)
- locales/load/json (30D): expressionRuns 46 → 48 (work)
- typical/edit/add-question (7D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 69 (work)
- typical/edit/convert@dropdown1 (7D): expressionRuns 66 → 62 (work)
- typical/edit/convert@dropdown1 (30D): expressionRuns 58 → 62 (work)
- typical/edit/delete (7D): expressionRuns 66 → 62 (work)
- typical/edit/delete (30D): expressionRuns 58 → 62 (work)
- typical/edit/property (7D): expressionRuns 320 → 300 (work)
- typical/edit/property (30D): expressionRuns 280 → 300 (work)
- typical/edit/undo-redo (30D): expressionRuns 69 → 72 (work)
- typical/load/json (30D): expressionRuns 49 → 51 (work)
- typical/select/element@checkbox1 (7D): expressionRuns 66 → 62 (work)
- typical/select/element@checkbox1 (30D): expressionRuns 58 → 62 (work)
- typical/select/element@dropdown1 (7D): expressionRuns 66 → 62 (work)
- typical/select/element@dropdown1 (30D): expressionRuns 58 → 62 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 44 (work)
- typical/select/element@page1 (30D): expressionRuns 16 → 18 (work)
- typical/select/element@panel1 (30D): expressionRuns 22 → 24 (work)
- typical/select/element@paneldynamic1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@paneldynamic1 (30D): expressionRuns 54 → 60 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 60 (work)

Δ = today / build − 1.
