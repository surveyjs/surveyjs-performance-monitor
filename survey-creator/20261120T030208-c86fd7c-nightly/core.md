# survey-creator · core · 20.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44664888297

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/edit/add-question | 110 | +1% | +2% 🔴 **work** | −24% 🟢 **work** |
| huge/edit/property | 65.5 | +5% | +5% 🔴 **work** | −27% 🔴 **work** |
| huge/load/json | 791 | +1% | +2% | 🟢 **−45%** 🔴 **work** ʳ |
| huge/output/dispose ᶜ | 0.66 | 0% | +2% | +3% |
| huge/output/text | 137 | −1% | −5% | 🟢 **−41%** ʳ |
| huge/select/element@q3978 | 114 | 0% | 🟢 **−36%** 🔴 **work** ʳ | 🟢 **−62%** 🟢 **work** ʳ |
| huge/tabs/designer | 67.3 | −2% | −5% | 🔴 **+144%** ʳ |
| huge/tabs/json | 372 | +4% | 0% | 🟢 **−36%** ʳ |
| huge/tabs/logic | 361 | 0% | +1% | 🟢 **−74%** ʳ |
| huge/tabs/preview | 1025 | 0% | −10% | 🟢 **−39%** 🟢 **work** ʳ |
| huge/tabs/roundtrip ᶜ | 5973 | +1% | −6% | −52% 🟢 **work** |
| huge/tabs/translation | 157 | +1% | +1% | 🟢 **−99%** ʳ |
| locales/load/json | 392 | 0% | +3% | 🟢 **−36%** 🔴 **work** ʳ |
| locales/tabs/translation | 111 | +1% | 0% | 🟢 **−97%** ʳ |
| typical/edit/add-question | 69 | 0% | +4% 🔴 **work** | −7% 🟢 **work** |
| typical/edit/convert@dropdown1 | 115 | −2% | +2% 🔴 **work** | −23% 🟢 **work** |
| typical/edit/delete | 94.5 | −1% | +4% 🔴 **work** | −20% 🟢 **work** |
| typical/edit/property | 34.5 | +5% | +3% 🔴 **work** | −4% 🔴 **work** |
| typical/edit/undo-redo | 130 | 0% | −1% | 🟢 **−27%** 🟢 **work** ʳ |
| typical/load/json | 147 | +3% | −1% | −8% |
| typical/select/element@checkbox1 | 85.5 | −1% | +3% 🔴 **work** | −18% 🟢 **work** |
| typical/select/element@dropdown1 | 79.7 | −1% | +2% 🔴 **work** | −16% 🟢 **work** |
| typical/select/element@matrixdynamic1 | 82.8 | −2% | +2% 🔴 **work** | 🟢 **−28%** 🟢 **work** ʳ |
| typical/select/element@page1 | 30.8 | 0% | −1% | 🟢 **−37%** 🟢 **work** ʳ |
| typical/select/element@panel1 | 54.9 | −1% | −7% | 🟢 **−37%** 🟢 **work** ʳ |
| typical/select/element@paneldynamic1 | 122 | 0% | −2% 🔴 **work** | −23% 🟢 **work** |
| typical/select/element@survey | 83.6 | −2% | −2% | −15% 🟢 **work** |
| typical/select/element@text1 | 68.7 | 0% | +5% 🔴 **work** | −19% 🟢 **work** |
| typical/tabs/theme | 883 | 0% | 0% | +1% 🟢 **work** |

🔴 slower · 🟢 faster (over 25% and over 2 ms)
ᶜ counter-only: the time is for reference; judged by work counters (over 2% and over 1)
🔴/🟢 **work** · **render** · **leak** · **heap**: a counter changed in every repeat (work, render: over 2% and over 1; leak: by 1 or more per sample; heap: over 25% and over 16 KB per sample)
ʳ every repeat agrees: all 5 interleaved runs of each build on one machine are over the threshold in the same direction

## Repeats

| scenario | build | today, ms | build, ms | Δ | 1 | 2 | 3 | 4 | 5 | all agree |
|---|---|--:|--:|--:|--:|--:|--:|--:|--:|---|
| huge/edit/property | 30D | 65.6 | 90.1 | −27% | −32% | −28% | −26% | −28% | −23% | no |
| huge/load/json | 30D | 800 | 1450 | −45% | −46% | −43% | −45% | −45% | −45% | yes |
| huge/output/text | 30D | 137 | 231 | −41% | −39% | −42% | −45% | −39% | −39% | yes |
| huge/select/element@q3978 | 7D | 116 | 181 | −36% | −36% | −36% | −34% | −36% | −39% | yes |
| huge/select/element@q3978 | 30D | 114 | 301 | −62% | −61% | −63% | −63% | −62% | −62% | yes |
| huge/tabs/designer | 30D | 68 | 27.9 | +144% | +229% | +126% | +261% | +144% | +87% | yes |
| huge/tabs/json | 30D | 372 | 581 | −36% | −36% | −35% | −36% | −36% | −36% | yes |
| huge/tabs/logic | 30D | 364 | 1407 | −74% | −74% | −74% | −74% | −74% | −74% | yes |
| huge/tabs/preview | 30D | 1022 | 1683 | −39% | −38% | −39% | −43% | −40% | −39% | yes |
| huge/tabs/translation | 30D | 155 | 13126 | −99% | −99% | −99% | −99% | −99% | −99% | yes |
| locales/load/json | 30D | 392 | 609 | −36% | −36% | −35% | −33% | −37% | −37% | yes |
| locales/tabs/translation | 30D | 112 | 4293 | −97% | −97% | −97% | −98% | −97% | −97% | yes |
| typical/edit/undo-redo | 30D | 129 | 176 | −27% | −26% | −27% | −27% | −26% | −26% | yes |
| typical/select/element@matrixdynamic1 | 30D | 82.5 | 115 | −28% | −28% | −32% | −27% | −26% | −32% | yes |
| typical/select/element@page1 | 30D | 31 | 49.3 | −37% | −40% | −36% | −36% | −36% | −38% | yes |
| typical/select/element@panel1 | 30D | 56.9 | 90.2 | −37% | −41% | −37% | −35% | −39% | −34% | yes |

## Work counters of ᶜ scenarios (judged)
- huge/tabs/roundtrip (30D): conditionRuns 13245 → 6660, expressionRuns 7971 → 4011

## Work counters (information)
- typical/load/json (30D): expressionRuns 52 → 51

## Counters (judged)
- huge/edit/add-question (7D): expressionRuns 69 → 73 (work)
- huge/edit/add-question (30D): expressionRuns 80 → 73 (work)
- huge/edit/property (7D): expressionRuns 310 → 330 (work)
- huge/edit/property (30D): expressionRuns 290 → 330 (work)
- huge/load/json (30D): expressionRuns 46 → 48 (work)
- huge/select/element@q3978 (7D): expressionRuns 62 → 66 (work)
- huge/select/element@q3978 (30D): expressionRuns 104 → 66 (work)
- huge/tabs/preview (30D): conditionRuns 4415 → 2220 (work), expressionRuns 2657 → 1337 (work)
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
