# survey-creator · react · 27.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45931758579

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 88.8 | −1% | −4% | 🟢 **−46%** |
| huge/designer/expand-all | 224 | 0% | 🟢 **−10%** | 🟢 **−33%** |
| huge/designer/object-selector | 1543 | 0% | 0% | −8% |
| huge/edit/add-question | 186 | +2% | +2% | 🟢 **−31%** |
| huge/edit/property | 90.2 | −6% | −8% | 🟢 **−20%** |
| huge/load/paint | 538 | 0% | 0% | 🟢 **−44%** |
| huge/select/element@q3978 | 413 | +1% | 0% | 🟢 **−21%** |
| huge/tabs/designer | 151 | +2% | −4% | −5% |
| huge/tabs/json | 851 | 0% | 0% | −4% |
| huge/tabs/logic | 1405 | 0% | 🔴 **+62%** | 🔴 **+48%** |
| huge/tabs/preview | 840 | −3% | −1% | −8% |
| huge/tabs/roundtrip ᶜ | 7258 | −1% | +26% | +16% |
| huge/tabs/translation | 164 | +1% | 🔴 **+25%** | +13% |
| locales/tabs/translation | 217 | −1% | 🔴 **+20%** | 🔴 **+14%** |
| typical/edit/add-question | 101 | +5% | +2% | 🟢 **−22%** |
| typical/edit/delete | 87.3 | −2% | −4% | 🟢 **−18%** |
| typical/edit/property | 52.8 | −8% | −9% | −13% |
| typical/edit/title-type | 65.8 | −4% | −9% | 🟢 **−14%** |
| typical/load/paint | 447 | 0% | −1% | −3% |
| typical/select/element@matrixdynamic1 | 105 | −5% | −5% | −7% |
| typical/select/element@survey | 68.7 | 0% | +2% | 🟢 **−20%** |
| typical/select/element@text1 | 66.8 | −5% | −5% | −4% |
| typical/tabs/theme | 365 | 0% | −1% | −4% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/expand-all | −10% | −13%..−5% | −10% | −9% | −8% | −7% | −12% | 🟢 |
| huge/tabs/logic | +62% | +61%..+63% | +62% | +63% | +62% | +62% | +62% | 🟢 |
| huge/tabs/translation | +25% | +11%..+35% | +13% | +27% | +24% | +26% | +22% | 🟢 |
| locales/tabs/translation | +20% | +13%..+27% | +18% | +16% | +21% | +25% | +19% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −46% | −51%..−41% | −47% | −47% | −42% | −47% | −48% | 🟢 |
| huge/designer/expand-all | −33% | −35%..−30% | −33% | −34% | −32% | −31% | −31% | 🟢 |
| huge/edit/add-question | −31% | −36%..−27% | −29% | −33% | −33% | −33% | −29% | 🟢 |
| huge/edit/property | −20% | −30%..−9% | −18% | −17% | −29% | −18% | −19% | 🟢 |
| huge/load/paint | −44% | −46%..−43% | −45% | −44% | −43% | −44% | −45% | 🟢 |
| huge/select/element@q3978 | −21% | −25%..−17% | −19% | −19% | −22% | −23% | −23% | 🟢 |
| huge/tabs/logic | +48% | +47%..+49% | +48% | +49% | +48% | +48% | +48% | 🟢 |
| locales/tabs/translation | +14% | +12%..+18% | +16% | +13% | +15% | +17% | +14% | 🟢 |
| typical/edit/add-question | −22% | −27%..−19% | −24% | −23% | −21% | −22% | −26% | 🟢 |
| typical/edit/delete | −18% | −22%..−15% | −16% | −20% | −17% | −19% | −19% | 🟢 |
| typical/edit/title-type | −14% | −17%..−13% | −14% | −15% | −15% | −15% | −16% | 🟢 |
| typical/select/element@survey | −20% | −21%..−19% | −20% | −19% | −20% | −19% | −20% | 🟢 |

## Counters (information)
- huge/edit/add-question (1D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (7D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (30D): expressionRuns 64 → 69 (work)
- huge/edit/property (1D): expressionRuns 594 → 558 (work)
- huge/edit/property (7D): expressionRuns 594 → 558 (work)
- huge/edit/property (30D): expressionRuns 522 → 558 (work)
- huge/load/paint (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (1D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (7D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 62 (work)
- typical/edit/add-question (1D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (7D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 69 (work)
- typical/edit/delete (1D): expressionRuns 66 → 62 (work)
- typical/edit/delete (7D): expressionRuns 66 → 62 (work)
- typical/edit/delete (30D): expressionRuns 58 → 62 (work)
- typical/edit/property (1D): expressionRuns 576 → 540 (work)
- typical/edit/property (7D): expressionRuns 576 → 540 (work)
- typical/edit/property (30D): expressionRuns 504 → 540 (work)
- typical/edit/title-type (1D): expressionRuns 256 → 240 (work)
- typical/edit/title-type (7D): expressionRuns 256 → 240 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 240 (work)
- typical/load/paint (30D): expressionRuns 49 → 51 (work)
- typical/select/element@matrixdynamic1 (1D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 44 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (1D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 60 (work)

Δ = today / build − 1.
