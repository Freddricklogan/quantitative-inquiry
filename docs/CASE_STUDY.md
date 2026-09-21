# Case Study — Quantitative Inquiry in Education

**Repository:** [quantitative-inquiry](https://github.com/Freddricklogan/quantitative-inquiry) · **Live demo:** [freddricklogan.github.io/quantitative-inquiry](https://freddricklogan.github.io/quantitative-inquiry/) · **Author:** Freddrick Logan

---

## 1. Who has this problem

Graduate students in education who must pass a research-methods sequence and then use it; institutional-research and assessment staff who report to provosts; district analysts whose tables become board slides; the faculty who supervise all of them. I work with that population at Illinois Tech and in programme-evaluation consulting; the failure is the same at every level: statistics taught as procedure, judgement never practised.

## 2. The problem, as a scenario

An assessment analyst reports that students who used the tutoring centre scored higher on the state test, p = .03, and recommends expanding the centre. Which students chose to attend? The motivated ones. How large is the difference? Not reported. Was this the first analysis run, or the fourth? Nobody asks. Elsewhere a doctoral student averages Likert ranks to two decimals and calls a p = .21 result "no effect." Each report is fluent in the vocabulary; none can defend the inference. The committee or board either believes it or dismisses all of it.

## 3. What it costs to leave it alone

Decisions taken on associations that will not replicate, and reports dismissed by the one reader who knows better. For a student, a returned chapter and a semester; for a district, a programme funded on a self-selection artefact. I will not attach a figure — programme budgets and student time are priced differently everywhere. What is certain is that the errors are the ordinary ones the replication literature has catalogued, and that they are learnable.

## 4. The approach, and the alternative I rejected

I wrote a fourteen-section resource that puts the judgement in the reader's hands before it explains the procedure. A test selector asks three questions and suggests a starting test with the warning that it is a heuristic. An explainer holds Cohen's d at 0.20 and lets the reader grow the sample until p crosses .05, so that "significant" and "large" separate in front of them. A spot-the-flaw quiz presents plausible claims — breakfast and test scores among them — and asks the reader to name the defect. A rigor scorer turns "we were careful" into a weighted checklist. The critical-appraisal section names p-hacking, HARKing, optional stopping and publication bias so students recognise them in what they read. The resource then joined the shared Learning Resource Kit: Executive Shell, collapsible sections with saved progress, a five-question quiz written from this content that records xAPI statements locally, and a print layout.

The alternative I rejected was a statistics primer with worked calculations. Software does the arithmetic; what students lack is the decision before it and the reading after it. A page that can be wrong at, and corrected by, its own widgets teaches the decision.

## 5. What the code does today

Real: the authored content across fourteen sections with an executive summary, a tests reference and a glossary; five working widgets — design tabs, test selector, the significance-versus-effect-size explainer with a normal-tail approximation, rigor scorer, spot-the-flaw quiz — moved from inline script to a module without rewriting; the kit layer with progress, quiz, xAPI 1.0.3 statements and print; a strict content-security policy with no inline script or style; tests that validate the quiz configuration and mount the kit against the real page.

Simulated: the explainer's p-value, which uses an Abramowitz–Stegun normal approximation for a two-sample z rather than a t distribution; the page says the test is approximate. The page has no back end and records nothing beyond the reader's own browser.

Worth knowing: the selector and the rigor weights are pedagogical devices, not validated instruments; reading time is words at 230 per minute; progress counts a section as opened, not read.

## 6. Evidence

Measured locally with the commands CI runs: 7 tests passing across two files — quiz validity, page invariants, and the vendored kit mounted on this page; coverage 79.84% of all files with `src/config.js` at 100% and the vendored kit at 78.75% from this page's smoke test; ESLint and html-validate clean. The conversion audit records 81 inline style attributes replaced by 30 classes, 26 custom properties namespaced, 28 buttons typed, 8 tables given a body and a `<main>` landmark added. Headless Chrome on the converted page: zero console errors; the last design tab activates the descriptive panel, the explainer at its maximum sample reports p < 0.001 and Yes, three selector answers suggest an independent t-test, two rigor practices score 27% Emerging, the spot-the-flaw quiz presents the breakfast claim; Expand all opens 14 of 14 sections and the KPI strip follows; no horizontal scroll at 1280 or 400 pixels.

## 7. What it would take to run this in production

As a public resource it is in production now. For a course it needs the kit's statements sent to the institution's learning record store — an endpoint, credentials, a consent notice, an identified actor and one origin added to the content-security policy — and, if grades depend on it, the questions reviewed by a second methodologist. Days of integration; the content does not change.

## 8. Limits and next steps

The explainer models one effect size and equal groups; the selector covers common bivariate tests only; there is no worked dataset. Next: an explainer with adjustable d and unequal groups, a power-calculation widget, a small downloadable dataset with the analyses the page describes, and per-section questions in place of one quiz at the end.

## 9. Who should look at this

**Hiring manager:** evidence that I teach statistical judgement rather than procedure, and package it to a standard an institution can review and adopt.
**Consulting client:** a model for training analysts to defend an inference before it reaches a board.
**Engineer:** read `src/page.js` for the explainer's normal-tail approximation and `tests/kit.test.js` for the kit mounted against this page's real markup.
