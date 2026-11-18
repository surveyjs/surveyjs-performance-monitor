# survey-creator · core · 18.11.2026 11:38 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44296512392

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 113 | +5% | +3% | −27% |
| huge/edit/property | 45.3 | +4% | +3% | 🟢 **−28%** ʳ |
| huge/load/json | 885 | +4% | +1% | 🟢 **−70%** ʳ |
| huge/output/dispose ᶜ | 0.86 | −2% | 0% | −72% |
| huge/output/text | 132 | +7% | +6% | 🟢 **−39%** ʳ |
| huge/select/element@q3978 | 191 | +4% | +4% | 🟢 **−43%** ʳ |
| huge/tabs/designer | 64.3 | −4% | −3% | 🔴 **+141%** ʳ |
| huge/tabs/json | 580 | +1% | +1% | 🟢 **−42%** ʳ |
| huge/tabs/logic | 302 | +1% | +2% | 🟢 **−80%** ʳ |
| huge/tabs/preview | 847 | −5% | −11% | 🟢 **−64%** ʳ |
| huge/tabs/roundtrip ᶜ | 4576 | −4% | −8% | −69% 🟢 **work** |
| huge/tabs/translation | 109 | +4% | +3% | 🟢 **−99%** ʳ |
| locales/load/json | 374 | +1% | 0% | 🟢 **−40%** ʳ |
| locales/tabs/translation | 90.6 | −1% | −2% | 🟢 **−97%** ʳ |
| typical/edit/add-question | 81.1 | +2% | +8% | −11% |
| typical/edit/convert@dropdown1 | 121 | +2% | 0% | −21% |
| typical/edit/delete | 95.9 | +5% | +3% | −18% |
| typical/edit/property | 33.5 | 0% | +4% | −6% |
| typical/edit/undo-redo | 101 | −4% | +1% | −25% |
| typical/load/json | 151 | 0% | −1% | −9% |
| typical/select/element@checkbox1 | 80.9 | +6% | +4% | −16% |
| typical/select/element@dropdown1 | 69.1 | +1% | +5% | −19% |
| typical/select/element@matrixdynamic1 | 75.1 | −1% | +1% | 🟢 **−31%** ʳ |
| typical/select/element@page1 | 32.3 | −1% | −1% | 🟢 **−38%** ʳ |
| typical/select/element@panel1 | 39.7 | −4% | −6% | 🟢 **−38%** ʳ |
| typical/select/element@paneldynamic1 | 129 | +2% | +2% | −19% |
| typical/select/element@survey | 119 | 0% | +2% | −15% |
| typical/select/element@text1 | 99 | +6% | +4% | −16% |
| typical/tabs/theme | 753 | 0% | 0% | 0% |

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/add-question | 30D | 115 | 158 | −27% | −29% | −31% | −24% | −27% | −28% | no |
| huge/edit/property | 30D | 45.3 | 63.1 | −28% | −27% | −33% | −31% | −27% | −25% | yes |
| huge/load/json | 30D | 876 | 2949 | −70% | −70% | −69% | −70% | −71% | −70% | yes |
| huge/output/text | 30D | 131 | 215 | −39% | −39% | −37% | −40% | −40% | −42% | yes |
| huge/select/element@q3978 | 30D | 191 | 335 | −43% | −45% | −40% | −44% | −43% | −44% | yes |
| huge/tabs/designer | 30D | 62.6 | 26 | +141% | +197% | +187% | +61% | +146% | +105% | yes |
| huge/tabs/json | 30D | 580 | 997 | −42% | −42% | −41% | −41% | −40% | −41% | yes |
| huge/tabs/logic | 30D | 304 | 1559 | −80% | −80% | −81% | −81% | −81% | −80% | yes |
| huge/tabs/preview | 30D | 847 | 2375 | −64% | −64% | −65% | −64% | −64% | −64% | yes |
| huge/tabs/translation | 30D | 109 | 11842 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/load/json | 30D | 372 | 616 | −40% | −39% | −41% | −39% | −39% | −40% | yes |
| locales/tabs/translation | 30D | 88.3 | 3498 | −97% | −97% | −97% | −98% | −97% | −97% | yes |
| typical/select/element@matrixdynamic1 | 30D | 79.2 | 114 | −31% | −34% | −30% | −29% | −31% | −31% | yes |
| typical/select/element@page1 | 30D | 32 | 51.9 | −38% | −37% | −37% | −39% | −38% | −37% | yes |
| typical/select/element@panel1 | 30D | 40.3 | 64.9 | −38% | −37% | −37% | −38% | −37% | −39% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Work counters (information)
- huge/edit/add-question (1D): expressionRuns 69 → 73
- huge/edit/add-question (7D): expressionRuns 69 → 73
- huge/edit/add-question (30D): expressionRuns 80 → 73
- huge/edit/property (1D): expressionRuns 310 → 330
- huge/edit/property (7D): expressionRuns 310 → 330
- huge/edit/property (30D): expressionRuns 290 → 330
- huge/load/json (30D): expressionRuns 46 → 48
- huge/select/element@q3978 (1D): expressionRuns 62 → 66
- huge/select/element@q3978 (7D): expressionRuns 62 → 66
- huge/select/element@q3978 (30D): expressionRuns 104 → 66
- huge/tabs/preview (30D): conditionRuns 4415 → 2220, expressionRuns 2657 → 1337
- locales/load/json (30D): expressionRuns 46 → 48
- typical/edit/add-question (1D): expressionRuns 69 → 73
- typical/edit/add-question (7D): expressionRuns 69 → 73
- typical/edit/add-question (30D): expressionRuns 80 → 73
- typical/edit/convert@dropdown1 (1D): expressionRuns 62 → 66
- typical/edit/convert@dropdown1 (7D): expressionRuns 62 → 66
- typical/edit/convert@dropdown1 (30D): expressionRuns 145 → 66
- typical/edit/delete (1D): expressionRuns 62 → 66
- typical/edit/delete (7D): expressionRuns 62 → 66
- typical/edit/delete (30D): expressionRuns 142 → 66
- typical/edit/property (1D): expressionRuns 300 → 320
- typical/edit/property (7D): expressionRuns 300 → 320
- typical/edit/property (30D): expressionRuns 280 → 320
- typical/edit/undo-redo (30D): expressionRuns 185 → 72
- typical/load/json (30D): expressionRuns 52 → 51
- typical/select/element@checkbox1 (1D): expressionRuns 62 → 66
- typical/select/element@checkbox1 (7D): expressionRuns 62 → 66
- typical/select/element@checkbox1 (30D): expressionRuns 104 → 66
- typical/select/element@dropdown1 (1D): expressionRuns 62 → 66
- typical/select/element@dropdown1 (7D): expressionRuns 62 → 66
- typical/select/element@dropdown1 (30D): expressionRuns 104 → 66
- typical/select/element@matrixdynamic1 (1D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (7D): expressionRuns 44 → 48
- typical/select/element@matrixdynamic1 (30D): expressionRuns 82 → 48
- typical/select/element@page1 (30D): expressionRuns 62 → 18
- typical/select/element@panel1 (30D): expressionRuns 68 → 24
- typical/select/element@paneldynamic1 (1D): expressionRuns 60 → 64
- typical/select/element@paneldynamic1 (7D): expressionRuns 58 → 64
- typical/select/element@paneldynamic1 (30D): expressionRuns 98 → 64
- typical/select/element@survey (30D): expressionRuns 62 → 48
- typical/select/element@text1 (1D): expressionRuns 60 → 64
- typical/select/element@text1 (7D): expressionRuns 60 → 64
- typical/select/element@text1 (30D): expressionRuns 102 → 64
- typical/tabs/theme (30D): expressionRuns 225 → 187

Δ = today / build − 1.
