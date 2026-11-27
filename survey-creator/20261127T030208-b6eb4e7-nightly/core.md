# survey-creator · core · 27.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45931758579

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 109 | −6% | −4% | 🟢 **−15%** |
| huge/edit/property | 45.7 | −6% | −5% | 🟢 **−18%** |
| huge/load/json | 519 | −1% | 0% | 🟢 **−26%** |
| huge/output/dispose ᶜ | 0.72 | −1% | −1% | +1% |
| huge/output/text | 115 | −2% | −3% | 🟢 **−21%** |
| huge/select/element@q3978 | 117 | −4% | −4% | 🟢 **−43%** |
| huge/tabs/designer | 60.1 | −1% | +3% | −7% |
| huge/tabs/json | 371 | −1% | −2% | −8% |
| huge/tabs/logic | 309 | +2% | +3% | −7% |
| huge/tabs/preview | 824 | −4% | −4% | 🟢 **−15%** |
| huge/tabs/roundtrip ᶜ | 3678 | −1% | −3% | −12% |
| huge/tabs/translation | 120 | −1% | 0% | 🟢 **−72%** |
| locales/load/json | 243 | 0% | +3% | 🟢 **−31%** |
| locales/tabs/translation | 110 | −1% | −2% | 🟢 **−28%** |
| typical/edit/add-question | 99.3 | −4% | −4% | +3% |
| typical/edit/convert@dropdown1 | 75.2 | −5% | −4% | +2% |
| typical/edit/delete | 93.3 | −7% | −4% | +3% |
| typical/edit/property | 21.5 | −13% | −12% | +3% |
| typical/edit/undo-redo | 91.6 | −1% | 0% | −1% |
| typical/load/json | 150 | −2% | 0% | −4% |
| typical/select/element@checkbox1 | 83.5 | −9% | −5% | +1% |
| typical/select/element@dropdown1 | 75 | −7% | −5% | +4% |
| typical/select/element@matrixdynamic1 | 79.8 | −3% | −3% | +3% |
| typical/select/element@page1 | 45.5 | 0% | +2% | +5% |
| typical/select/element@panel1 | 38.3 | 0% | +1% | +6% |
| typical/select/element@paneldynamic1 | 86.8 | −7% | −6% | +4% |
| typical/select/element@survey | 77.1 | +2% | +1% | −1% |
| typical/select/element@text1 | 65.3 | −7% | −8% | +6% |
| typical/tabs/theme | 737 | −1% | −1% | +1% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 2 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 2 ms · 🔴 it does not (its time is not judged)

## Repeats 1D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| typical/edit/property | −13% | −31%..+4% | −11% | −26% | −11% | −6% | −22% | 🔴 |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| typical/edit/property | −12% | −17%..−5% | −8% | −9% | −13% | −14% | −13% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | −15% | −23%..−8% | −16% | −21% | −15% | −14% | −12% | 🟢 |
| huge/edit/property | −18% | −23%..−14% | −18% | −21% | −20% | −15% | −20% | 🟢 |
| huge/load/json | −26% | −27%..−24% | −26% | −25% | −24% | −26% | −26% | 🟢 |
| huge/output/text | −21% | −27%..−16% | −23% | −26% | −20% | −19% | −22% | 🟢 |
| huge/select/element@q3978 | −43% | −43%..−42% | −42% | −42% | −42% | −43% | −43% | 🟢 |
| huge/tabs/designer | −7% | −17%..−1% | −11% | −7% | −4% | −13% | −12% | 🔴 |
| huge/tabs/preview | −15% | −22%..−9% | −13% | −20% | −13% | −15% | −16% | 🟢 |
| huge/tabs/translation | −72% | −72%..−72% | −72% | −72% | −72% | −72% | −72% | 🟢 |
| locales/load/json | −31% | −34%..−27% | −31% | −32% | −29% | −33% | −28% | 🟢 |
| locales/tabs/translation | −28% | −33%..−24% | −25% | −31% | −30% | −27% | −28% | 🟢 |

## Counters (information)
- huge/edit/add-question (1D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (7D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (30D): expressionRuns 64 → 69 (work)
- huge/edit/property (1D): expressionRuns 330 → 310 (work)
- huge/edit/property (7D): expressionRuns 330 → 310 (work)
- huge/edit/property (30D): expressionRuns 290 → 310 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (1D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (7D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 62 (work)
- locales/load/json (30D): expressionRuns 46 → 48 (work)
- typical/edit/add-question (1D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (7D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 69 (work)
- typical/edit/convert@dropdown1 (1D): expressionRuns 66 → 62 (work)
- typical/edit/convert@dropdown1 (7D): expressionRuns 66 → 62 (work)
- typical/edit/convert@dropdown1 (30D): expressionRuns 58 → 62 (work)
- typical/edit/delete (1D): expressionRuns 66 → 62 (work)
- typical/edit/delete (7D): expressionRuns 66 → 62 (work)
- typical/edit/delete (30D): expressionRuns 58 → 62 (work)
- typical/edit/property (1D): expressionRuns 320 → 300 (work)
- typical/edit/property (7D): expressionRuns 320 → 300 (work)
- typical/edit/property (30D): expressionRuns 280 → 300 (work)
- typical/edit/undo-redo (30D): expressionRuns 69 → 72 (work)
- typical/load/json (30D): expressionRuns 49 → 51 (work)
- typical/select/element@checkbox1 (1D): expressionRuns 66 → 62 (work)
- typical/select/element@checkbox1 (7D): expressionRuns 66 → 62 (work)
- typical/select/element@checkbox1 (30D): expressionRuns 58 → 62 (work)
- typical/select/element@dropdown1 (1D): expressionRuns 66 → 62 (work)
- typical/select/element@dropdown1 (7D): expressionRuns 66 → 62 (work)
- typical/select/element@dropdown1 (30D): expressionRuns 58 → 62 (work)
- typical/select/element@matrixdynamic1 (1D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 44 (work)
- typical/select/element@page1 (30D): expressionRuns 16 → 18 (work)
- typical/select/element@panel1 (30D): expressionRuns 22 → 24 (work)
- typical/select/element@paneldynamic1 (1D): expressionRuns 64 → 60 (work)
- typical/select/element@paneldynamic1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@paneldynamic1 (30D): expressionRuns 54 → 60 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (1D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 60 (work)

Δ = today / build − 1.
