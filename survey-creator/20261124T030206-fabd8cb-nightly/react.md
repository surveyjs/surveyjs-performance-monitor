# survey-creator · react · 24.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45316600023

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 141 | +1% | 0% | 🟢 **−52%** |
| huge/designer/expand-all | 252 | 0% | +1% | 🟢 **−36%** |
| huge/designer/object-selector | 1581 | 0% | 0% | 🟢 **−13%** |
| huge/edit/add-question | 180 | +1% | −3% | 🟢 **−42%** |
| huge/edit/property | 95.5 | +3% | −3% | 🟢 **−36%** |
| huge/load/paint | 522 | 0% | +1% | 🟢 **−68%** |
| huge/select/element@q3978 | 445 | −2% | 🟢 **−16%** | 🟢 **−35%** |
| huge/tabs/designer | 227 | +1% | −2% | 🟢 **−59%** |
| huge/tabs/json | 878 | 0% | −1% | 🟢 **−14%** |
| huge/tabs/logic | 962 | +1% | +2% | 🟢 **−30%** |
| huge/tabs/preview | 620 | −1% | −7% | 🟢 **−38%** |
| huge/tabs/roundtrip ᶜ | 5761 | 0% | −1% | −41% |
| huge/tabs/translation | 222 | 0% | +2% | 🟢 **−98%** |
| locales/tabs/translation | 184 | 0% | +2% | 🟢 **−95%** |
| typical/edit/add-question | 92.1 | −2% | −1% | 🟢 **−35%** |
| typical/edit/delete | 88.8 | 0% | +3% | 🟢 **−35%** |
| typical/edit/property | 60.7 | 0% | −5% | −13% |
| typical/edit/title-type | 65.4 | 0% | −5% | −15% |
| typical/load/paint | 278 | −1% | +1% | 🟢 **−22%** |
| typical/select/element@matrixdynamic1 | 71 | −1% | +3% | 🟢 **−35%** |
| typical/select/element@survey | 69.6 | 0% | −2% | 🟢 **−34%** |
| typical/select/element@text1 | 64 | −1% | +7% | 🟢 **−28%** |
| typical/tabs/theme | 414 | +1% | +1% | −8% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −16% | −20%..−12% | −17% | −18% | −15% | −17% | −13% | 🟢 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −52% | −54%..−50% | −52% | −53% | −51% | −51% | −52% | 🟢 |
| huge/designer/expand-all | −36% | −38%..−34% | −37% | −35% | −35% | −37% | −36% | 🟢 |
| huge/designer/object-selector | −13% | −15%..−13% | −14% | −14% | −13% | −14% | −15% | 🟢 |
| huge/edit/add-question | −42% | −43%..−41% | −42% | −43% | −43% | −41% | −42% | 🟢 |
| huge/edit/property | −36% | −38%..−33% | −35% | −35% | −36% | −37% | −35% | 🟢 |
| huge/load/paint | −68% | −69%..−68% | −68% | −68% | −68% | −68% | −69% | 🟢 |
| huge/select/element@q3978 | −35% | −39%..−33% | −39% | −36% | −35% | −36% | −35% | 🟢 |
| huge/tabs/designer | −59% | −62%..−59% | −59% | −60% | −60% | −61% | −60% | 🟢 |
| huge/tabs/json | −14% | −17%..−11% | −15% | −14% | −13% | −15% | −11% | 🟢 |
| huge/tabs/logic | −30% | −31%..−28% | −29% | −31% | −29% | −30% | −29% | 🟢 |
| huge/tabs/preview | −38% | −38%..−37% | −37% | −38% | −37% | −38% | −37% | 🟢 |
| huge/tabs/translation | −98% | −98%..−98% | −98% | −98% | −98% | −98% | −98% | 🟢 |
| locales/tabs/translation | −95% | −95%..−95% | −95% | −95% | −95% | −95% | −95% | 🟢 |
| typical/edit/add-question | −35% | −43%..−29% | −33% | −36% | −36% | −35% | −42% | 🟢 |
| typical/edit/delete | −35% | −38%..−31% | −36% | −35% | −32% | −34% | −35% | 🟢 |
| typical/edit/property | −13% | −15%..−9% | −10% | −13% | −13% | −13% | −12% | 🔴 |
| typical/edit/title-type | −15% | −20%..−10% | −13% | −17% | −16% | −11% | −17% | 🔴 |
| typical/load/paint | −22% | −24%..−19% | −21% | −23% | −22% | −19% | −22% | 🟢 |
| typical/select/element@matrixdynamic1 | −35% | −38%..−32% | −33% | −36% | −37% | −36% | −34% | 🟢 |
| typical/select/element@survey | −34% | −39%..−30% | −38% | −34% | −34% | −35% | −33% | 🟢 |
| typical/select/element@text1 | −28% | −32%..−24% | −30% | −26% | −29% | −30% | −26% | 🟢 |

## Counters (information)
- huge/edit/add-question (7D): expressionRuns 69 → 73 (work)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (7D): expressionRuns 558 → 594 (work)
- huge/edit/property (30D): expressionRuns 522 → 594 (work)
- huge/load/paint (30D): expressionRuns 92 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 62 → 66 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660 (work), expressionRuns 7971 → 4011 (work)
- typical/edit/add-question (7D): expressionRuns 69 → 73 (work)
- typical/edit/add-question (30D): expressionRuns 80 → 73 (work)
- typical/edit/delete (7D): expressionRuns 62 → 66 (work)
- typical/edit/delete (30D): expressionRuns 142 → 66 (work)
- typical/edit/property (7D): expressionRuns 540 → 576 (work)
- typical/edit/property (30D): expressionRuns 504 → 576 (work)
- typical/edit/title-type (7D): expressionRuns 240 → 256 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 256 (work)
- typical/load/paint (30D): expressionRuns 98 → 51 (work)
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48 (work)
- typical/select/element@survey (30D): expressionRuns 62 → 48 (work)
- typical/select/element@text1 (7D): expressionRuns 60 → 64 (work)
- typical/select/element@text1 (30D): expressionRuns 102 → 64 (work)
- typical/tabs/theme (30D): expressionRuns 222 → 187 (work)

Δ = today / build − 1.
