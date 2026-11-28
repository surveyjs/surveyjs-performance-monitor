# survey-creator · react · 28.11.2026 03:01 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/46100872553

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 90.7 | 0% | −6% | 🟢 **−44%** |
| huge/designer/expand-all | 210 | 0% | 🟢 **−11%** | 🟢 **−32%** |
| huge/designer/object-selector | 1577 | −1% | 0% | 🟢 **−10%** |
| huge/edit/add-question | 135 | +1% | +3% | 🟢 **−28%** |
| huge/edit/property | 123 | −2% | −8% | 🟢 **−22%** |
| huge/load/paint | 1028 | −1% | −2% | 🟢 **−27%** |
| huge/select/element@q3978 | 363 | 0% | −2% | 🟢 **−16%** |
| huge/tabs/designer | 157 | +1% | −4% | −6% |
| huge/tabs/json | 1512 | 0% | 0% | 0% |
| huge/tabs/logic | 2293 | 0% | 🔴 **+43%** | 🔴 **+29%** |
| huge/tabs/preview | 837 | +1% | −3% | −4% |
| huge/tabs/roundtrip ᶜ | 7144 | 0% | +23% | +12% |
| huge/tabs/translation | 169 | +1% | 🔴 **+23%** | +16% |
| locales/tabs/translation | 235 | 0% | 🔴 **+18%** | 🔴 **+15%** |
| typical/edit/add-question | 107 | −1% | +4% | 🟢 **−26%** |
| typical/edit/delete | 90 | 0% | −5% | 🟢 **−19%** |
| typical/edit/property | 89 | +2% | −8% | −13% |
| typical/edit/title-type | 65 | +3% | −7% | −11% |
| typical/load/paint | 269 | 0% | 0% | −2% |
| typical/select/element@matrixdynamic1 | 68.2 | −1% | −4% | −6% |
| typical/select/element@survey | 79.9 | +1% | +1% | 🟢 **−19%** |
| typical/select/element@text1 | 67.5 | 0% | −3% | −4% |
| typical/tabs/theme | 376 | +1% | +3% | −4% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/expand-all | −11% | −14%..−8% | −12% | −11% | −9% | −12% | −12% | 🟢 |
| huge/tabs/logic | +43% | +42%..+45% | +44% | +42% | +42% | +44% | +43% | 🟢 |
| huge/tabs/translation | +23% | +18%..+28% | +23% | +20% | +20% | +25% | +26% | 🟢 |
| locales/tabs/translation | +18% | +15%..+20% | +19% | +18% | +16% | +17% | +18% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −44% | −48%..−41% | −44% | −42% | −46% | −44% | −46% | 🟢 |
| huge/designer/expand-all | −32% | −34%..−28% | −29% | −32% | −34% | −31% | −31% | 🟢 |
| huge/designer/object-selector | −10% | −12%..−9% | −11% | −10% | −10% | −11% | −9% | 🟢 |
| huge/edit/add-question | −28% | −31%..−24% | −29% | −30% | −28% | −26% | −26% | 🟢 |
| huge/edit/property | −22% | −28%..−14% | −26% | −18% | −20% | −20% | −22% | 🟢 |
| huge/load/paint | −27% | −28%..−25% | −27% | −28% | −26% | −27% | −26% | 🟢 |
| huge/select/element@q3978 | −16% | −19%..−14% | −16% | −19% | −17% | −16% | −16% | 🟢 |
| huge/tabs/logic | +29% | +27%..+32% | +31% | +30% | +29% | +29% | +28% | 🟢 |
| huge/tabs/translation | +16% | −1%..+32% | +2% | +18% | +16% | +22% | +14% | 🔴 |
| locales/tabs/translation | +15% | +13%..+18% | +16% | +14% | +17% | +15% | +16% | 🟢 |
| typical/edit/add-question | −26% | −28%..−23% | −26% | −27% | −25% | −24% | −25% | 🟢 |
| typical/edit/delete | −19% | −22%..−16% | −21% | −18% | −18% | −19% | −20% | 🟢 |
| typical/edit/property | −13% | −19%..−6% | −11% | −9% | −15% | −11% | −17% | 🔴 |
| typical/select/element@survey | −19% | −20%..−18% | −20% | −19% | −19% | −19% | −19% | 🟢 |

## Counters (information)
- huge/edit/add-question (7D): expressionRuns 73 → 69 (work)
- huge/edit/add-question (30D): expressionRuns 64 → 69 (work)
- huge/edit/property (7D): expressionRuns 594 → 558 (work)
- huge/edit/property (30D): expressionRuns 522 → 558 (work)
- huge/load/paint (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 66 → 62 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 62 (work)
- typical/edit/add-question (7D): expressionRuns 73 → 69 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 69 (work)
- typical/edit/delete (7D): expressionRuns 66 → 62 (work)
- typical/edit/delete (30D): expressionRuns 58 → 62 (work)
- typical/edit/property (7D): expressionRuns 576 → 540 (work)
- typical/edit/property (30D): expressionRuns 504 → 540 (work)
- typical/edit/title-type (7D): expressionRuns 256 → 240 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 240 (work)
- typical/load/paint (30D): expressionRuns 49 → 51 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 48 → 44 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 44 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (7D): expressionRuns 64 → 60 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 60 (work)

Δ = today / build − 1.
