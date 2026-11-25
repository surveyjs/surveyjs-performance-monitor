# survey-creator · react · 25.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/45537070349

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 97.9 | 0% | −1% | 🟢 **−52%** |
| huge/designer/expand-all | 249 | 0% | −1% | 🟢 **−36%** |
| huge/designer/object-selector | 1610 | 0% | +1% | 🟢 **−15%** |
| huge/edit/add-question | 125 | +1% | −5% | 🟢 **−39%** |
| huge/edit/property | 118 | −2% | −4% | 🟢 **−47%** |
| huge/load/paint | 540 | −1% | +1% | 🟢 **−68%** |
| huge/select/element@q3978 | 368 | 0% | 🟢 **−13%** | 🟢 **−28%** |
| huge/tabs/designer | 149 | −1% | −3% | 🟢 **−62%** |
| huge/tabs/json | 1108 | 0% | 0% | 🟢 **−13%** |
| huge/tabs/logic | 915 | +1% | +2% | 🟢 **−29%** |
| huge/tabs/preview | 857 | −1% | 0% | 🟢 **−37%** |
| huge/tabs/roundtrip ᶜ | 5765 | −1% | −1% | −40% |
| huge/tabs/translation | 140 | 0% | +1% | 🟢 **−98%** |
| locales/tabs/translation | 254 | 0% | +1% | 🟢 **−95%** |
| typical/edit/add-question | 92.5 | −3% | −2% | 🟢 **−37%** |
| typical/edit/delete | 81 | 0% | −3% | 🟢 **−32%** |
| typical/edit/property | 77.9 | +12% | −10% | −21% |
| typical/edit/title-type | 118 | −4% | −10% | 🟢 **−23%** |
| typical/load/paint | 461 | 0% | +1% | 🟢 **−21%** |
| typical/select/element@matrixdynamic1 | 114 | 0% | +1% | 🟢 **−35%** |
| typical/select/element@survey | 71.3 | 0% | −1% | 🟢 **−34%** |
| typical/select/element@text1 | 67.7 | 0% | +3% | 🟢 **−28%** |
| typical/tabs/theme | 430 | +1% | +2% | −9% |

🔴 slower · 🟢 faster: a change of 10% or more whose 99% interval over the repeats clears 2% and 8 ms
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 the 99% interval clears 2% and 8 ms · 🔴 it does not (its time is not judged)

## Repeats 7D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −13% | −17%..−11% | −14% | −13% | −16% | −14% | −13% | 🟢 |
| typical/edit/property | −10% | −17%..−2% | −4% | −11% | −12% | −9% | −13% | 🔴 |

## Repeats 30D

| scenario | Δ | 99% | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −52% | −56%..−48% | −56% | −52% | −52% | −50% | −53% | 🟢 |
| huge/designer/expand-all | −36% | −38%..−34% | −35% | −35% | −37% | −36% | −37% | 🟢 |
| huge/designer/object-selector | −15% | −17%..−11% | −14% | −16% | −15% | −12% | −15% | 🟢 |
| huge/edit/add-question | −39% | −43%..−36% | −37% | −41% | −38% | −40% | −41% | 🟢 |
| huge/edit/property | −47% | −50%..−41% | −46% | −46% | −43% | −49% | −45% | 🟢 |
| huge/load/paint | −68% | −69%..−67% | −68% | −69% | −69% | −68% | −68% | 🟢 |
| huge/select/element@q3978 | −28% | −31%..−24% | −26% | −30% | −28% | −27% | −26% | 🟢 |
| huge/tabs/designer | −62% | −65%..−58% | −60% | −64% | −62% | −62% | −59% | 🟢 |
| huge/tabs/json | −13% | −13%..−12% | −13% | −13% | −13% | −13% | −13% | 🟢 |
| huge/tabs/logic | −29% | −31%..−28% | −31% | −28% | −30% | −30% | −29% | 🟢 |
| huge/tabs/preview | −37% | −37%..−36% | −37% | −36% | −37% | −37% | −37% | 🟢 |
| huge/tabs/translation | −98% | −98%..−98% | −98% | −98% | −98% | −98% | −98% | 🟢 |
| locales/tabs/translation | −95% | −95%..−95% | −95% | −95% | −95% | −95% | −95% | 🟢 |
| typical/edit/add-question | −37% | −42%..−34% | −40% | −38% | −35% | −37% | −39% | 🟢 |
| typical/edit/delete | −32% | −35%..−30% | −34% | −32% | −32% | −31% | −33% | 🟢 |
| typical/edit/property | −21% | −24%..−5% | −9% | −16% | −14% | −15% | −22% | 🔴 |
| typical/edit/title-type | −23% | −27%..−17% | −25% | −22% | −19% | −22% | −24% | 🟢 |
| typical/load/paint | −21% | −23%..−20% | −23% | −21% | −21% | −21% | −21% | 🟢 |
| typical/select/element@matrixdynamic1 | −35% | −41%..−31% | −36% | −38% | −38% | −37% | −32% | 🟢 |
| typical/select/element@survey | −34% | −38%..−31% | −36% | −35% | −37% | −33% | −33% | 🟢 |
| typical/select/element@text1 | −28% | −31%..−24% | −29% | −26% | −28% | −28% | −25% | 🟢 |

## Counters (information)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (30D): expressionRuns 522 → 594 (work)
- huge/load/paint (30D): expressionRuns 92 → 48 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660 (work), expressionRuns 7971 → 4011 (work)
- typical/edit/add-question (30D): expressionRuns 80 → 73 (work)
- typical/edit/delete (30D): expressionRuns 142 → 66 (work)
- typical/edit/property (30D): expressionRuns 504 → 576 (work)
- typical/edit/title-type (30D): expressionRuns 224 → 256 (work)
- typical/load/paint (30D): expressionRuns 98 → 51 (work)
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48 (work)
- typical/select/element@survey (30D): expressionRuns 62 → 48 (work)
- typical/select/element@text1 (30D): expressionRuns 102 → 64 (work)
- typical/tabs/theme (30D): expressionRuns 222 → 187 (work)

Δ = today / build − 1.
