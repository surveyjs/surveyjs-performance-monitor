# survey-creator · react · 21.11.2026 03:02 UTC

> run: https://github.com/surveyjs/surveyjs-performance-monitor/actions/runs/44859002648

| scenario | today, ms | 1D | 7D | 30D |
|---|--:|--:|--:|--:|
| huge/designer/collapse-all | 95.2 | +2% | 0% | 🟢 **−54%** |
| huge/designer/expand-all | 224 | +2% | +3% | 🟢 **−37%** |
| huge/designer/object-selector | 1658 | 0% | 0% | −16% |
| huge/edit/add-question | 124 | −2% | −4% | 🟢 **−45%** |
| huge/edit/property | 158 | +4% | −5% | 🟢 **−44%** |
| huge/load/paint | 549 | 0% | +4% | 🟢 **−69%** |
| huge/select/element@q3978 | 370 | +2% | −14% | 🟢 **−29%** |
| huge/tabs/designer | 146 | −3% | −4% | 🟢 **−62%** |
| huge/tabs/json | 868 | 0% | −1% | −14% |
| huge/tabs/logic | 1562 | 0% | +2% | 🟢 **−28%** |
| huge/tabs/preview | 616 | 0% | −9% | 🟢 **−40%** |
| huge/tabs/roundtrip ᶜ | 5617 | −1% | −4% | −43% |
| huge/tabs/translation | 133 | 0% | +2% | 🟢 **−99%** |
| locales/tabs/translation | 189 | −1% | +3% | 🟢 **−96%** |
| typical/edit/add-question | 90.1 | −5% | −1% | 🟢 **−35%** |
| typical/edit/delete | 92.9 | 0% | +2% | 🟢 **−37%** |
| typical/edit/property | 58.9 | −2% | −4% | −14% |
| typical/edit/title-type | 111 | +1% | −7% | −17% |
| typical/load/paint | 484 | −1% | 0% | −23% |
| typical/select/element@matrixdynamic1 | 105 | 0% | +4% | 🟢 **−36%** |
| typical/select/element@survey | 106 | −1% | −2% | 🟢 **−35%** |
| typical/select/element@text1 | 67 | −1% | +3% | 🟢 **−27%** |
| typical/tabs/theme | 645 | −1% | +1% | −12% |

🔴 slower · 🟢 faster (over 25% and over 8 ms), in every repeat
ᶜ counter-only: the time is for reference; judged by leak and heap counters
confirmed: 🟢 every repeat agrees · 🔴 not every repeat (its time is not judged)

## Repeats 30D

| scenario | Δ | 1 | 2 | 3 | 4 | 5 | confirmed |
|---|--:|--:|--:|--:|--:|--:|---|
| huge/designer/collapse-all | −54% | −54% | −54% | −56% | −52% | −53% | 🟢 |
| huge/designer/expand-all | −37% | −36% | −38% | −37% | −38% | −37% | 🟢 |
| huge/edit/add-question | −45% | −44% | −45% | −44% | −43% | −45% | 🟢 |
| huge/edit/property | −44% | −47% | −42% | −47% | −43% | −43% | 🟢 |
| huge/load/paint | −69% | −68% | −69% | −69% | −68% | −69% | 🟢 |
| huge/select/element@q3978 | −29% | −28% | −28% | −27% | −29% | −30% | 🟢 |
| huge/tabs/designer | −62% | −61% | −64% | −64% | −62% | −63% | 🟢 |
| huge/tabs/logic | −28% | −27% | −28% | −28% | −28% | −28% | 🟢 |
| huge/tabs/preview | −40% | −40% | −40% | −40% | −41% | −41% | 🟢 |
| huge/tabs/translation | −99% | −99% | −99% | −99% | −98% | −99% | 🟢 |
| locales/tabs/translation | −96% | −96% | −96% | −96% | −96% | −96% | 🟢 |
| typical/edit/add-question | −35% | −35% | −35% | −35% | −32% | −37% | 🟢 |
| typical/edit/delete | −37% | −39% | −37% | −36% | −36% | −36% | 🟢 |
| typical/select/element@matrixdynamic1 | −36% | −36% | −35% | −37% | −35% | −37% | 🟢 |
| typical/select/element@survey | −35% | −36% | −36% | −36% | −35% | −37% | 🟢 |
| typical/select/element@text1 | −27% | −27% | −27% | −29% | −26% | −28% | 🟢 |

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
