# survey-creator · react · 26.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45746256674

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 124 | −7% | −5% | 🟢 **−42%** |
| huge/designer/expand-all | 260 | 🟢 **−9%** | 🟢 **−10%** | 🟢 **−30%** |
| huge/designer/object-selector | 1527 | 0% | 0% | −7% |
| huge/edit/add-question | 126 | 0% | −6% | 🟢 **−28%** |
| huge/edit/property | 92.4 | +1% | −4% | 🟢 **−15%** |
| huge/load/paint | 541 | 0% | +1% | 🟢 **−54%** |
| huge/select/element@q3978 | 369 | +2% | −1% | 🟢 **−17%** |
| huge/tabs/designer | 148 | +1% | −1% | 🟢 **−13%** |
| huge/tabs/json | 886 | −1% | +1% | 🟢 **−11%** |
| huge/tabs/logic | 1807 | 🔴 **+41%** | 🔴 **+45%** | 🔴 **+24%** |
| huge/tabs/preview | 591 | +1% | +2% | 🟢 **−17%** |
| huge/tabs/roundtrip ᶜ | 7212 | +29% | +29% | +12% |
| huge/tabs/translation | 174 | 🔴 **+20%** | 🔴 **+23%** | 🔴 **+12%** |
| locales/tabs/translation | 231 | 🔴 **+20%** | 🔴 **+22%** | 🔴 **+15%** |
| typical/edit/add-question | 147 | +2% | −4% | 🟢 **−25%** |
| typical/edit/delete | 91.6 | −2% | −2% | 🟢 **−16%** |
| typical/edit/property | 89.3 | −3% | −10% | −8% |
| typical/edit/title-type | 65.6 | −5% | −10% | −11% |
| typical/load/paint | 283 | +2% | 0% | −5% |
| typical/select/element@matrixdynamic1 | 70.2 | −2% | 0% | −2% |
| typical/select/element@survey | 67.2 | −1% | −1% | 🟢 **−19%** |
| typical/select/element@text1 | 67.2 | +1% | +2% | +5% |
| typical/tabs/theme | 431 | 0% | +2% | −2% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Repeats 1D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/expand-all | −9% | −13%..−7% | −13% | −10% | −9% | −9% | −9% | 🟢 |
| huge/tabs/logic | +41% | +39%..+43% | +41% | +41% | +40% | +40% | +42% | 🟢 |
| huge/tabs/translation | +20% | +15%..+29% | +25% | +19% | +17% | +23% | +24% | 🟢 |
| locales/tabs/translation | +20% | +15%..+26% | +21% | +16% | +24% | +20% | +21% | 🟢 |

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/expand-all | −10% | −15%..−7% | −13% | −9% | −8% | −12% | −13% | 🟢 |
| huge/tabs/logic | +45% | +41%..+49% | +45% | +44% | +42% | +47% | +46% | 🟢 |
| huge/tabs/translation | +23% | +19%..+27% | +25% | +21% | +24% | +25% | +21% | 🟢 |
| locales/tabs/translation | +22% | +16%..+28% | +22% | +25% | +25% | +20% | +19% | 🟢 |
| typical/edit/property | −10% | −16%..−3% | −6% | −9% | −15% | −9% | −9% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −42% | −43%..−39% | −43% | −41% | −41% | −41% | −42% | 🟢 |
| huge/designer/expand-all | −30% | −32%..−26% | −30% | −27% | −30% | −31% | −30% | 🟢 |
| huge/edit/add-question | −28% | −30%..−28% | −28% | −29% | −29% | −29% | −29% | 🟢 |
| huge/edit/property | −15% | −19%..−8% | −17% | −12% | −10% | −15% | −14% | 🟢 |
| huge/load/paint | −54% | −55%..−52% | −54% | −53% | −54% | −54% | −53% | 🟢 |
| huge/select/element@q3978 | −17% | −20%..−13% | −18% | −17% | −15% | −15% | −17% | 🟢 |
| huge/tabs/designer | −13% | −17%..−10% | −16% | −13% | −13% | −13% | −12% | 🟢 |
| huge/tabs/json | −11% | −14%..−8% | −12% | −11% | −12% | −10% | −9% | 🟢 |
| huge/tabs/logic | +24% | +22%..+28% | +24% | +27% | +25% | +24% | +24% | 🟢 |
| huge/tabs/preview | −17% | −19%..−14% | −15% | −16% | −16% | −18% | −18% | 🟢 |
| huge/tabs/translation | +12% | +8%..+16% | +15% | +10% | +13% | +11% | +11% | 🟢 |
| locales/tabs/translation | +15% | +14%..+18% | +16% | +17% | +15% | +17% | +15% | 🟢 |
| typical/edit/add-question | −25% | −28%..−22% | −24% | −27% | −27% | −25% | −24% | 🟢 |
| typical/edit/delete | −16% | −18%..−13% | −17% | −15% | −16% | −14% | −15% | 🟢 |
| typical/edit/title-type | −11% | −14%..−9% | −10% | −13% | −12% | −12% | −11% | 🔴 |
| typical/select/element@survey | −19% | −22%..−16% | −19% | −17% | −18% | −20% | −20% | 🟢 |

## Counters (information)
- huge/edit/add-question (30D): expressionRuns 64 → 73 (work)
- huge/edit/property (30D): expressionRuns 522 → 594 (work)
- huge/load/paint (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (30D): expressionRuns 58 → 66 (work)
- typical/edit/add-question (30D): expressionRuns 64 → 73 (work)
- typical/edit/delete (30D): expressionRuns 58 → 66 (work)
- typical/edit/property (30D): expressionRuns 504 → 576 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 256 (work)
- typical/load/paint (30D): expressionRuns 52 → 51 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 40 → 48 (work)
- typical/select/element@survey (30D): expressionRuns 46 → 48 (work)
- typical/select/element@text1 (30D): expressionRuns 56 → 64 (work)

Δ = today / build − 1.
