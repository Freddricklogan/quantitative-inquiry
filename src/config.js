/** Resource configuration: the kit reads this; tests/config.test.js validates it. */
export const config = {
  title: 'Quantitative Inquiry in Education',
  tagline: 'A graduate-level guide to quantitative research in education: measurement, sampling and design, hypothesis testing, regression, choosing the right test and reading results critically, with a test selector, a significance-versus-effect-size explainer and a rigor self-check.',
  repo: 'https://github.com/Freddricklogan/quantitative-inquiry',
  theme: 'plum',
  pagesUrl: 'https://freddricklogan.github.io/quantitative-inquiry/',
  quizTitle: 'Five questions on quantitative inquiry',
  quiz: [
    {
      id: 'nullfail',
      prompt: 'A study reports p = .21 with a wide confidence interval. What does the resource say you may conclude?',
      options: ['The null hypothesis is true', 'There is no effect', 'The result is inconclusive; failing to reject is not proof of no effect', 'The alternative hypothesis is disproved'],
      answer: 2,
      explanation: 'Null hypothesis testing rejects or fails to reject; it never accepts the null. A non-significant result with a wide interval may simply reflect low power — absence of evidence is not evidence of absence.'
    },
    {
      id: 'levels',
      prompt: 'Which statistic is legitimate for an ordinal variable such as Likert agreement, according to Stevens’ levels?',
      options: ['The mean', 'The median and rank-based tests', 'The variance', 'The ratio of two values'],
      answer: 1,
      explanation: 'Ordinal data are ranked with unequal gaps, so medians, percentiles and rank tests apply. Averaging ordinal ranks produces numbers that look precise but mean little; means and variances need interval or ratio data.'
    },
    {
      id: 'relval',
      prompt: 'A bathroom scale reads five pounds heavy every time. How does the resource describe it?',
      options: ['Valid but unreliable', 'Reliable but invalid', 'Neither reliable nor valid', 'Both reliable and valid'],
      answer: 1,
      explanation: 'Reliability is consistency; validity is accuracy. The scale is perfectly consistent and consistently wrong. Reliability is necessary but not sufficient for validity, and a measure cannot be valid without first being reliable.'
    },
    {
      id: 'confound',
      prompt: 'Ice-cream sales correlate with drowning deaths. Which causal criterion does that association fail?',
      options: ['Covariation', 'Temporal precedence', 'No plausible alternative explanation', 'Random assignment'],
      answer: 2,
      explanation: 'Summer heat drives both, so the correlation is manufactured by a confounder. Covariation is present; the missing criterion is ruling out rival explanations, which is where observational designs are most vulnerable.'
    },
    {
      id: 'harking',
      prompt: 'Presenting an exploratory finding as if it had been predicted before the data were seen is called what?',
      options: ['Optional stopping', 'HARKing', 'Publication bias', 'Bonferroni correction'],
      answer: 1,
      explanation: 'HARKing — Hypothesizing After the Results are Known — dresses an exploratory result up as an a priori prediction. Pre-registration separates confirmatory from exploratory claims and is the resource’s recommended defence.'
    }
  ]
};
