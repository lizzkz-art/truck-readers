// "Let's find your starting spot!" A short adaptive placement quiz.
// A quick starting-point estimate, not a formal reading assessment.
// Two interleaved domains: reading (or pre-reading listening skills for ages 3-4) and listening vocabulary.
// Each level is checked with a small block of items taken from the SAME word banks the games use at that level
// (spelling, word parts, context clues, sight words, vocabulary), so the result predicts game difficulty.
// Climbing is deliberately careful: a level is passed only with about 3 of 4 right after allowing for lucky
// guesses, the walk moves up one level at a time, the top level gets extra confirmation items, and levels far
// above the child's age need very strong proof. The result is the highest level passed with good accuracy.
import { PIC, VOCAB, RHYME, FIRST, SENT, WL, wordLevel, wordChoices, nChoices, shuffle } from './bank.js';
import { LV_MAX, clampLv } from './levels.js';

// Picture words used to check "read a word, tap the matching picture"
const READPIC_LV = { truck: 2, bus: 2, van: 2, box: 2, car: 3, key: 3, map: 3, mud: 3, dig: 3, horn: 4, light: 4, wheel: 4, door: 4, ship: 5, crane: 5, bridge: 5, tractor: 5, mirror: 5 };
export const READPIC = Object.keys(PIC).filter(w => PIC[w] && !/\d/.test(w)).map(w => [READPIC_LV[w] || wordLevel(w), w]).filter(x => x[0] > 0);
export const LETTER_SETS = [['M', 'N', 'W', 'H'], ['S', 'Z', 'C', 'O'], ['B', 'D', 'P', 'R'], ['T', 'L', 'F', 'I'], ['A', 'K', 'X', 'V'], ['G', 'C', 'Q', 'O'], ['E', 'F', 'L', 'H']];

// Tuning (see tools/placement_sim.mjs for the simulation that checks these)
export const CFG = {
  maxItems: 30,            // whole quiz, both domains
  domMax: { read: 17, vocab: 14, phono: 10 },
  perLevelMax: 6,          // items in one pass/fail block (strict levels allow 7)
  need: 3,                 // correct answers needed to pass a level
  passAdj: 0.6,            // guess-adjusted accuracy to pass (about 70% right with 4 choices)
  failAdj: 0.34,           // guess-adjusted accuracy at or below this, with 2+ misses, fails (2 of 4 or worse)
  confirmItems: 2,         // extra items at the top passed level
  supportItems: 3,         // if the level below the top was never checked: 2 of up to 3 quick items there
  acceptAdj: 0.55,         // guess-adjusted accuracy needed at the final level (about 67-70% right)
  strictAbove: 2,          // levels more than this many above the age-typical level need strong proof
  strictNeed: 5, strictAdj: 0.72, // strong proof: 5 of 5, 5 of 6, or 6 of 7
};
// Age-typical level: age 5 = Level 2, age 6 = Level 4, age 7 = Level 6, age 8 = Level 8; ages 3 and 4 start at Warm-Up
export const ageLevel = age => { const a = Number(age) || 5; return a <= 4 ? 0 : clampLv(Math.min(8, (a - 4) * 2)); };
// Level suggestions used by "Choose a level" (unchanged)
export function startLevels(age) { const a = Number(age) || 5; const read = a <= 4 ? 0 : a === 5 ? 1 : a === 6 ? 3 : a === 7 ? 5 : 6; return { read, vocab: Math.max(0, read - 1), phono: 0 }; }
// The quiz starts at the age-typical level so the first questions feel doable.
export function quizStart(age) { const a = ageLevel(age); return { read: Math.max(1, Math.min(7, a)), vocab: Math.max(0, Math.min(7, a - 1)), phono: 0 }; }
// Guess-adjusted accuracy: removes the share of right answers expected from pure guessing.
// adj = (right - expected guesses) / (items - expected guesses). Pure guessing scores about 0.
export function adjAcc(c, n, G) { if (!n) return 0; const den = n - G; return den <= 0 ? 0 : (c - G) / den; }

// ---------- Item bank for each domain and level ----------
export function itemsAt(dom, lv) {
  const opts = [];
  const nc = Math.max(2, nChoices(lv));
  const mc = (o, answer, others) => { const ch = shuffle([answer, ...others]); o.choices = ch.map(x => ({ v: x, text: x })); o.answer = answer; o.g = 1 / ch.length; return o; };
  if (dom === 'phono') {
    if (lv === 0) RHYME.filter(r => PIC[r[0]] && PIC[r[1]]).forEach(([w, r, o]) => opts.push({ key: 'rh:' + w, type: 'rhyme', lv, prompt: `Which one rhymes with ${w}?`, word: w, answer: r, g: 1 / (1 + o.length), choices: shuffle([r, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
    else FIRST.filter(f => f[0] !== f[1]).forEach(([w, same, o]) => opts.push({ key: 'fs:' + w, type: 'first', lv, prompt: `Which one starts like ${w}?`, word: w, answer: same, g: 1 / (1 + o.length), choices: shuffle([same, ...o]).map(x => ({ v: x, pic: PIC[x] })), names: true }));
  } else if (dom === 'vocab') {
    const here = VOCAB.filter(v => v.lv === lv);
    for (const v of here) {
      const sib = shuffle(here.filter(x => x.w !== v.w)).slice(0, 3);
      if (v.pic) { const near = sib.filter(x => x.pic); opts.push({ key: 'v:' + v.w, type: 'vpic', lv, prompt: `Tap the ${v.w}.`, word: v.w, answer: v.w, g: 1 / (near.length + 1), choices: shuffle([v, ...near]).map(x => ({ v: x.w, pic: x.pic })) }); }
      else opts.push(mc({ key: 'v:' + v.w, type: 'vmean', lv, prompt: `What does ${v.w} mean?`, word: v.w, speakChoices: true }, v.def, sib.map(x => x.def)));
    }
  } else {
    if (lv === 0) LETTER_SETS.forEach(set => { const L = set[0]; opts.push({ key: 'L:' + L, type: 'letter', lv, prompt: `Find the letter ${L}.`, answer: L, g: 1 / set.length, choices: shuffle(set).map(x => ({ v: x, text: x, big: true })) }); });
    for (const w of (WL[lv] || [])) if (w.length > 1) { const o = mc({ key: 'd:' + w, type: 'dec', lv, prompt: `Tap the word ${w}.`, word: w }, w, wordChoices(w, lv, nc).filter(x => x !== w).slice(0, nc - 1)); o.choices.forEach(c => c.big = true); opts.push(o); }
    for (const [l, w] of READPIC) if (l === lv) { const dd = shuffle(Object.keys(PIC).filter(k => k !== w && PIC[k] !== PIC[w] && !/\d/.test(k))).slice(0, nc - 1); opts.push({ key: 'rp:' + w, type: 'readpic', lv, prompt: 'Read the word. Tap the picture that matches it.', show: w, answer: w, g: 1 / (dd.length + 1), choices: shuffle([w, ...dd]).map(x => ({ v: x, pic: PIC[x] })) }); }
    for (const sn of SENT) if (sn.lv === lv) opts.push(mc({ key: 'sw:' + sn.s, type: 'sight', lv, prompt: 'Read the sentence. Pick the word that fits in the blank.', passage: sn.s.replace('___', '_____') }, sn.a, sn.d));
  }
  return opts;
}

function makeDomain(name, start, lo, hi, age) {
  return { name, lv: start, start, lo, hi, cap: Math.min(hi, ageLevel(age) + CFG.strictAbove), hist: [], stats: {}, state: {}, phase: 'walk', conf: null, confLeft: 0, result: null, why: '', done: false, used: new Set(), blk: null, retried: {}, support: null };
}
const st = (d, lv) => d.stats[lv] ||= { c: 0, n: 0, G: 0 };
const strictLv = (d, lv) => lv > d.cap;
// Decide a level from everything answered at it: 'pass', 'fail', or null (ask more)
export function judge(s, strict) {
  const a = adjAcc(s.c, s.n, s.G), miss = s.n - s.c;
  if (strict) {
    if (s.c >= CFG.strictNeed && a >= CFG.strictAdj) return 'pass';
    if (miss >= 2) return 'fail';
    return s.n >= CFG.perLevelMax + 1 ? 'fail' : null;
  }
  if (s.c >= CFG.need && a >= CFG.passAdj) return 'pass';
  if (miss >= 2 && a <= CFG.failAdj) return 'fail';
  if (s.n >= CFG.perLevelMax) return a >= CFG.acceptAdj ? 'pass' : 'fail';
  return null;
}
const accepted = (d, lv) => { const s = d.stats[lv]; if (!s || !s.n) return false; const a = adjAcc(s.c, s.n, s.G); return strictLv(d, lv) ? (s.c >= CFG.strictNeed && a >= CFG.strictAdj) : a >= CFG.acceptAdj; };

export function createPlacement({ age, listeningOnly }) {
  const s = quizStart(age);
  const doms = listeningOnly ? [makeDomain('phono', 0, 0, 1, age), makeDomain('vocab', s.vocab, 0, LV_MAX, age)] : [makeDomain('read', s.read, 0, LV_MAX, age), makeDomain('vocab', s.vocab, 0, LV_MAX, age)];
  let turn = 0, total = 0, cur = null;
  const log = [];
  const finish = (d, lv, why) => { d.result = clampLv(Math.max(d.lo, Math.min(d.hi, lv))); d.why = why; d.done = true; };
  function startConfirm(d, lv) { d.phase = 'confirm'; d.conf = lv; d.confLeft = CFG.confirmItems; d.lv = lv; }
  // after a confirmation block: accept, or step down and keep checking
  function afterConfirm(d) {
    const P = d.conf;
    if (accepted(d, P)) {
      // a real reader at level P also does well one level lower; check it if it was never asked (stops lucky streaks)
      const B = P - 1;
      if (B >= d.lo && !(d.stats[B] && d.stats[B].n)) { d.phase = 'support'; d.support = { top: P, left: CFG.supportItems }; d.lv = B; return; }
      return finish(d, P, 'confirmed');
    }
    d.state[P] = 'fail'; d.phase = 'walk'; d.conf = null;
    const below = P - 1;
    if (below < d.lo) return finish(d, d.lo, 'lowest level');
    if (d.state[below] === 'pass') { if (accepted(d, below)) return finish(d, below, 'confirmed below'); return startConfirm(d, below); }
    d.lv = below;
  }
  function afterSupport(d) {
    const { top } = d.support; const B = top - 1; d.support = null;
    const s = d.stats[B];
    if (s.c >= 2 && s.c >= s.n - 1) { d.state[B] = 'pass'; return finish(d, top, 'confirmed'); }
    // not supported: the top level was probably luck. Keep checking from the level below.
    d.state[top] = 'fail'; d.phase = 'walk'; d.lv = B; d.blk = null;
    const v = judge(s, strictLv(d, B)); if (v) step(d, B, v);
  }
  // one second chance for a borderline miss at or below the starting level (a nervous start, not a real ceiling)
  const canRetry = (d, lv) => !d.retried[lv] && lv <= d.start && lv >= d.start - 1 && d.stats[lv] && d.stats[lv].c >= 1;
  function retry(d, lv) { d.retried[lv] = true; d.state[lv] = null; d.lv = lv; d.blk = { c: 0, n: 0, G: 0 }; }
  function step(d, lv, verdict) {
    d.state[lv] = verdict; d.blk = null;
    if (verdict === 'pass') {
      if (d.state[lv + 1] === 'fail' && canRetry(d, lv + 1)) return retry(d, lv + 1);
      if (lv >= d.hi || d.state[lv + 1] === 'fail') return startConfirm(d, lv);
      d.lv = lv + 1; return;                               // up one level at a time
    }
    // fail
    if (lv <= d.lo) return finish(d, d.lo, 'lowest level');
    const s = d.stats[lv];
    if (d.state[lv - 1] === 'pass') {
      // one second chance for a borderline miss at or below the starting level (a nervous start, not a real ceiling)
      if (canRetry(d, lv)) return retry(d, lv);
      return startConfirm(d, lv - 1);
    } const noPassYet = !Object.values(d.state).includes('pass');
    // far too hard: before anything is passed, skip down faster (2 levels, then 3)
    d.fails = (d.fails || 0) + 1;
    let to = noPassYet ? lv - Math.min(1 + d.fails, 3) : lv - 1;
    to = Math.max(to, Math.min(lv - 1, d.lo + 1));  // big jumps stop at K; Pre-K is only checked after K is missed
    while (to < lv - 1 && d.state[to] != null) to++;
    d.lv = to;
  }
  // best level from what we have (used when the item budget runs out before a level is confirmed)
  function fallback(d) {
    // monotone: the highest level answered well where no easier level was clearly missed
    const lvls = Object.keys(d.stats).map(Number).filter(lv => d.stats[lv].n).sort((a, b) => a - b);
    const weak = lv => { const s = d.stats[lv]; return s.n - s.c >= 2 && adjAcc(s.c, s.n, s.G) <= CFG.failAdj; };
    let best = null;
    for (const lv of lvls) { if (lvls.some(m => m < lv && weak(m))) break; if (accepted(d, lv) && d.stats[lv].c >= CFG.need) best = lv; }
    if (best != null) return best;
    return Math.max(d.lo, (lvls.length ? lvls[0] : d.start) - 1);
  }
  function itemFor(d, lv) {
    const avail = itemsAt(d.name, lv).filter(o => !d.used.has(o.key)); if (!avail.length) return null;
    // rotate item types so a level is checked in different ways
    const types = [...new Set(avail.map(o => o.type))]; const lastT = d.hist.length ? d.hist[d.hist.length - 1].type : null;
    const seen = t => d.hist.filter(h => h.lv === lv && h.type === t).length;
    const minSeen = Math.min(...types.map(seen));
    let prefer = types.filter(t => seen(t) === minSeen); if (prefer.length > 1) { const f = prefer.filter(t => t !== lastT); if (f.length) prefer = f; }
    const t = prefer[Math.random() * prefer.length | 0];
    const pool = avail.filter(o => o.type === t); return pool[Math.random() * pool.length | 0];
  }
  function pickDomain() {
    const open = doms.filter(d => !d.done);
    if (!open.length) return null;
    return open[turn++ % open.length];
  }
  return {
    doms, log,
    get total() { return total; },
    next() {
      for (let tries = 0; tries < 4; tries++) {
        if (total >= CFG.maxItems) { doms.forEach(d => { if (!d.done) finish(d, fallback(d), 'item limit'); }); return null; }
        const d = pickDomain(); if (!d) return null;
        if (d.hist.length >= CFG.domMax[d.name]) { finish(d, fallback(d), 'item limit'); continue; }
        const it = itemFor(d, d.lv);
        if (!it) { // ran out of questions at this level: decide from what we have
          const v = judge(st(d, d.lv), strictLv(d, d.lv)) || (accepted(d, d.lv) ? 'pass' : 'fail');
          if (d.phase === 'confirm') { d.confLeft = 0; afterConfirm(d); } else if (d.phase === 'support') { finish(d, d.support.top, 'confirmed'); } else step(d, d.lv, v);
          if (!d.done && !itemFor(d, d.lv)) finish(d, fallback(d), 'no more questions');
          continue;
        }
        cur = { d, it }; return { ...it, domain: d.name, n: total + 1 };
      }
      return null;
    },
    answer(val) {
      if (!cur) return; const { d, it } = cur; cur = null; const ok = val === it.answer;
      d.used.add(it.key); d.hist.push({ lv: it.lv, ok, type: it.type }); log.push({ domain: d.name, lv: it.lv, type: it.type, ok }); total++;
      const s = st(d, it.lv); s.n++; if (ok) s.c++; s.G += it.g || 0.25;
      if (d.blk) { d.blk.n++; if (ok) d.blk.c++; d.blk.G += it.g || 0.25; }
      if (d.phase === 'confirm') { if (--d.confLeft <= 0) afterConfirm(d); }
      else if (d.phase === 'support') { const b = d.stats[it.lv]; if (b.c >= 2 || b.n - b.c >= 2 || --d.support.left <= 0) afterSupport(d); }
      else { const v = judge(d.blk || s, strictLv(d, it.lv)); if (v) step(d, it.lv, v); }
      return ok;
    },
    result() {
      const out = {};
      for (const d of doms) {
        let r = d.done ? d.result : fallback(d);
        // sanity cap: never more than 2 levels above the age-typical level without strong proof at that level
        while (r > d.cap && !accepted(d, r)) r--;
        out[d.name] = r;
      }
      const reading = out.read != null ? out.read : out.phono; const vocab = out.vocab;
      const by = {}; for (const e of log) { const b = by[e.type] ||= { ok: 0, n: 0, top: -1 }; b.n++; if (e.ok) { b.ok++; b.top = Math.max(b.top, e.lv); } }
      const levels = {}; for (const d of doms) levels[d.name] = Object.keys(d.stats).map(Number).sort((a, b) => a - b).map(lv => { const s = d.stats[lv]; return { lv, ok: s.c, n: s.n, adj: Math.round(100 * Math.max(0, adjAcc(s.c, s.n, s.G))) }; });
      return { reading, vocab, items: total, byType: by, log: log.slice(), levels, ageLevel: ageLevel(age) };
    },
  };
}
export const TYPE_NAMES = { letter: 'Letter names', dec: 'Hearing a word and finding it in print', readpic: 'Reading a word and matching a picture', sight: 'Sight words in sentences', vpic: 'Truck words (pictures)', vmean: 'Truck words (meanings)', rhyme: 'Rhyming (listening)', first: 'First sounds (listening)' };
