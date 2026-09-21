/* Page widgets for quantitative-inquiry, moved from inline script blocks by the Learning Resource Kit converter.
   Runs as an ES module after the document is parsed; the kit mounts the shell and quiz separately. */

// ---- Tabs: research designs ----
document.querySelectorAll('#destabs .tab').forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll('#destabs .tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('#design .panel').forEach(p=>p.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.p).classList.add('active');
  };
});

// ---- Test selector ----
const picks={};
function recommendTest(){
  const g=picks.goal, n=picks.groups, o=picks.outcome;
  // Proportions / counts route dominates
  if(g==='proportion') return {name:'Chi-square test',why:'You are testing counts or proportions across categories, so a chi-square test of association (or goodness of fit) is the natural choice. If the outcome you predict is binary, logistic regression extends this.'};
  if(g==='relate'){
    if(o==='cat') return {name:'Chi-square test',why:'A relationship between categorical variables is assessed with chi-square. For two ordinal variables, consider Spearman’s rank correlation.'};
    return {name:'Pearson correlation',why:'You want the strength and direction of a linear relationship between continuous variables — Pearson’s r (Spearman’s rho if the data are ranked or non-normal).'};
  }
  if(g==='predict'){
    if(o==='cat') return {name:'Logistic regression',why:'You are predicting a categorical (typically binary) outcome, which calls for logistic regression rather than ordinary least squares.'};
    return {name:'Linear regression',why:'You are predicting a continuous outcome from one or more predictors — multiple linear regression, reported with R² and standardized β coefficients.'};
  }
  if(g==='compare'){
    if(o==='cat') return {name:'Chi-square test',why:'Comparing a categorical outcome across groups is really a test of association — use chi-square rather than a means comparison.'};
    if(n==='many') return {name:'One-way ANOVA',why:'You are comparing a continuous outcome across three or more groups, so ANOVA (with η² as effect size) is appropriate; follow a significant result with post-hoc comparisons.'};
    return {name:'Independent t-test',why:'You are comparing the means of two groups on a continuous outcome — an independent-samples t-test, reported with Cohen’s d (use a paired t-test if the two sets of scores are related).'};
  }
  return null;
}
document.querySelectorAll('#selector .q').forEach(q=>{
  const key=q.dataset.q;
  q.querySelectorAll('.opt').forEach(o=>{
    o.onclick=()=>{
      q.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));
      o.classList.add('sel'); picks[key]=o.dataset.v; evalSel();
    };
  });
});
function evalSel(){
  if(!picks.goal||!picks.groups||!picks.outcome) return;
  const rec=recommendTest();
  if(!rec) return;
  document.getElementById('selName').textContent='Suggested test: '+rec.name;
  document.getElementById('selWhy').textContent=rec.why;
  document.getElementById('selResult').classList.add('show');
}

// ---- Significance vs. effect size explainer ----
// Two-sample t with fixed d=0.20; approximate two-tailed p from the normal tail.
function normCdf(z){
  // Abramowitz & Stegun 7.1.26 approximation
  const t=1/(1+0.2316419*Math.abs(z));
  const d=0.3989422804014327*Math.exp(-z*z/2);
  const p=d*t*(0.31938153+t*(-0.356563782+t*(1.781477937+t*(-1.821255978+t*1.330274429))));
  return z>0 ? 1-p : p;
}
const nRange=document.getElementById('nRange');
function updateES(){
  const n=parseInt(nRange.value,10);
  const d=0.20;
  const se=Math.sqrt(2/n);        // SE of standardized mean difference (equal n)
  const z=d/se;                   // approximate test statistic
  const p=2*(1-normCdf(Math.abs(z)));
  document.getElementById('nOut').textContent=n;
  document.getElementById('pOut').textContent = p<0.001 ? '< 0.001' : p.toFixed(3);
  const sig=p<0.05;
  const sigEl=document.getElementById('sigOut');
  sigEl.textContent = sig ? 'Yes' : 'No';
  sigEl.style.color = sig ? 'var(--lr-good)' : 'var(--lr-bad)';
  const hint=document.getElementById('esHint');
  if(sig) hint.innerHTML='With n = '+n+' per group, this <b>small</b> effect is now statistically significant — yet Cohen’s d is still just 0.20. Significance grew only because the sample did; the practical magnitude never changed.';
  else hint.innerHTML='With only n = '+n+' per group, the same small effect (d = 0.20) is <b>not</b> significant. Increase the sample and watch the p-value shrink while the effect size stays put.';
}
nRange.oninput=updateES;
updateES();

// ---- Rigor scorer ----
const cks=document.querySelectorAll('#checklist .ck');
function scoreRigor(){
  let s=0; cks.forEach(c=>{ if(c.classList.contains('on')) s+=parseInt(c.dataset.w,10); });
  s=Math.min(100,s);
  document.getElementById('rigorFill').style.width=s+'%';
  const v=document.getElementById('rigorVerdict');
  if(s===0){v.textContent='Select practices to score your design';v.style.color='var(--lr-muted)';}
  else if(s<35){v.textContent=s+'% — Emerging: report reliability and justify sample size';v.style.color='var(--lr-bad)';}
  else if(s<70){v.textContent=s+'% — Solid: add effect sizes, CIs, and assumption checks';v.style.color='var(--lr-warn)';}
  else{v.textContent=s+'% — Strong, transparent, defensible quantitative rigor';v.style.color='var(--lr-good)';}
}
cks.forEach(c=>c.onclick=()=>{c.classList.toggle('on');scoreRigor();});
scoreRigor();

// ---- Spot-the-flaw quiz ----
const flawQs=document.querySelectorAll('#flawQuiz .flawq');
const answered={};
function scoreQuiz(){
  const total=flawQs.length;
  let correct=0, done=0;
  flawQs.forEach((q,i)=>{ if(answered[i]!==undefined){done++; if(answered[i]) correct++;} });
  const pct=Math.round((correct/total)*100);
  document.getElementById('quizFill').style.width=pct+'%';
  const v=document.getElementById('quizVerdict');
  if(done===0){v.textContent='Answer the four items above';v.style.color='var(--lr-muted)';return;}
  if(done<total){v.textContent=correct+' of '+total+' correct so far — keep going';v.style.color='var(--lr-warn)';return;}
  if(correct===total){v.textContent=correct+'/'+total+' — Sharp critical reading. You spotted every flaw.';v.style.color='var(--lr-good)';}
  else if(correct>=total/2){v.textContent=correct+'/'+total+' — Solid. Revisit the ones you missed above.';v.style.color='var(--lr-warn)';}
  else{v.textContent=correct+'/'+total+' — Review the "Reading results critically" points and retry.';v.style.color='var(--lr-bad)';}
}
flawQs.forEach((q,i)=>{
  const correctV=q.dataset.correct;
  const fb=q.dataset.fb;
  const res=q.querySelector('.result');
  const big=res.querySelector('.big');
  const para=res.querySelector('p');
  q.querySelectorAll('.opt').forEach(o=>{
    o.onclick=()=>{
      q.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));
      o.classList.add('sel');
      const isRight=o.dataset.v===correctV;
      answered[i]=isRight;
      big.textContent=isRight?'✓ Correct':'✗ Not quite';
      big.style.color=isRight?'var(--lr-good)':'var(--lr-bad)';
      para.textContent=fb;
      res.classList.add('show');
      scoreQuiz();
    };
  });
});
scoreQuiz();

