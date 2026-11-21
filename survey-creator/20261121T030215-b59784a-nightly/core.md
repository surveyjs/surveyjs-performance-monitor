# survey-creator · core · 21.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44859002648

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 113 | −1% | +3% | −23% |
| huge/edit/property | 60.9 | +1% | +3% | −23% |
| huge/load/json | 523 | −2% | +1% | 🟢 **−48%** |
| huge/output/dispose ᶜ | 0.63 | −5% | +5% | −3% |
| huge/output/text | 113 | 0% | −5% | 🟢 **−39%** |
| huge/select/element@q3978 | 132 | 0% | 🟢 **−41%** | 🟢 **−65%** |
| huge/tabs/designer | 62.4 | −2% | −9% | 🔴 **+220%** |
| huge/tabs/json | 337 | −1% | −1% | 🟢 **−36%** |
| huge/tabs/logic | 292 | −1% | +4% | 🟢 **−75%** |
| huge/tabs/preview | 837 | 0% | −11% | 🟢 **−40%** |
| huge/tabs/roundtrip ᶜ | 3782 | +2% | −7% | −52% |
| huge/tabs/translation | 115 | +2% | +1% | 🟢 **−99%** |
| locales/load/json | 390 | 0% | +2% | 🟢 **−37%** |
| locales/tabs/translation | 92.7 | −2% | +2% | 🟢 **−98%** |
| typical/edit/add-question | 72.6 | +1% | +5% | −8% |
| typical/edit/convert@dropdown1 | 111 | 0% | +2% | −22% |
| typical/edit/delete | 97.4 | +1% | +2% | −20% |
| typical/edit/property | 34.9 | +2% | +8% | +11% |
| typical/edit/undo-redo | 99.3 | 0% | −2% | −26% |
| typical/load/json | 209 | +1% | 0% | −12% |
| typical/select/element@checkbox1 | 79.5 | +1% | +5% | −18% |
| typical/select/element@dropdown1 | 93.7 | −1% | +4% | −17% |
| typical/select/element@matrixdynamic1 | 83.1 | 0% | +2% | 🟢 **−29%** |
| typical/select/element@page1 | 31.1 | −1% | −2% | 🟢 **−37%** |
| typical/select/element@panel1 | 53.2 | +1% | −2% | 🟢 **−37%** |
| typical/select/element@paneldynamic1 | 79.5 | +2% | +3% | −21% |
| typical/select/element@survey | 81.4 | 0% | +1% | −15% |
| typical/select/element@text1 | 78.6 | +2% | +6% | −17% |
| typical/tabs/theme | 748 | 0% | +1% | 0% |

🔴 slower · 🟢 faster (over 25% and over 2 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 7D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/select/element@q3978 | −41% | −42% | −40% | −41% | −40% | −40% | 🟢 |

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/load/json | −48% | −47% | −49% | −49% | −48% | −45% | 🟢 |
| huge/output/text | −39% | −42% | −39% | −40% | −38% | −40% | 🟢 |
| huge/select/element@q3978 | −65% | −65% | −65% | −65% | −64% | −64% | 🟢 |
| huge/tabs/designer | +220% | +134% | +92% | +286% | +220% | +276% | 🟢 |
| huge/tabs/json | −36% | −36% | −36% | −37% | −38% | −35% | 🟢 |
| huge/tabs/logic | −75% | −75% | −75% | −75% | −75% | −75% | 🟢 |
| huge/tabs/preview | −40% | −42% | −39% | −43% | −41% | −40% | 🟢 |
| huge/tabs/translation | −99% | −99% | −99% | −99% | −99% | −99% | 🟢 |
| locales/load/json | −37% | −41% | −36% | −37% | −36% | −37% | 🟢 |
| locales/tabs/translation | −98% | −98% | −98% | −98% | −98% | −97% | 🟢 |
| typical/edit/undo-redo | −26% | −26% | −25% | −27% | −25% | −26% | 🔴 |
| typical/select/element@matrixdynamic1 | −29% | −30% | −29% | −27% | −31% | −30% | 🟢 |
| typical/select/element@page1 | −37% | −37% | −36% | −38% | −37% | −38% | 🟢 |
| typical/select/element@panel1 | −37% | −37% | −37% | −37% | −38% | −40% | 🟢 |

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
