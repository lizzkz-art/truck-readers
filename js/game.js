// Game engine: builds a session of rounds for a level and runs each round type.
var TR = window.TR = window.TR || {};
(function () {
  const D = TR.D, S = TR.S, F = TR.sfx;
  const $ = (s, r) => (r || document).querySelector(s);
  const rnd = n => Math.floor(Math.random() * n);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const lc = w => w.toLowerCase();
  const CHEERS = ['great', 'yes', 'awesome', 'nice', 'super'];
  const cheer = () => { const k = CHEERS[rnd(CHEERS.length)]; return [k, D.PHRASES[k]]; };
  const wordKey = w => ['w:' + lc(w), w];
  const hornKind = () => S.me().rig.horn;
  const disp = w => lc(w) === 'i' ? 'I' : w;

  // ---------- helpers ----------
  function levelPool(lv) {
    if (lv.words) return lv.words;
    if (lv.mode === 'fill') return D.uniq(sentencesFor(lv).map(x => lc(x.a)));
    const ids = lv.from === 'all' ? D.LV.filter(l => l.words).map(l => l.id - 1) : lv.from;
    let out = []; ids.forEach(i => { const l = D.LV[i]; if (l && l.words) out = out.concat(l.words); });
    D.LV.forEach((l, i) => { if (l.mode === 'fill' && (lv.from === 'all' || (lv.from || []).includes(i))) D.SENT.filter(s => l.g.includes(s.g)).forEach(s => out.push(s.a)); });
    return D.uniq(out.map(lc));
  }
  function sentencesFor(lv) {
    if (lv.g) return D.SENT.filter(s => lv.g.includes(s.g));
    const gs = lv.grand ? ['pre', 'pri', 'fry'] : lv.w >= 2 ? ['pre', 'pri'] : ['pre']; return D.SENT.filter(s => gs.includes(s.g));
  }
  // weight words: needs practice > new > learning > mastered
  function pickWords(pool, count, avoidFirst) {
    const w = pool.map(x => { const s = S.status(x); return [x, s === 'practice' ? 4 : s === 'new' ? 3 : s === 'learning' ? 1.5 : 0.5]; });
    const out = []; let bag = w.slice();
    while (out.length < count) {
      if (!bag.length) bag = w.slice();
      const tot = bag.reduce((a, b) => a + b[1], 0); let r = Math.random() * tot, i = 0;
      for (; i < bag.length; i++) { r -= bag[i][1]; if (r <= 0) break; }
      i = Math.min(i, bag.length - 1); const x = bag[i][0]; bag.splice(i, 1);
      if (out.length && lc(out[out.length - 1]) === lc(x) && (bag.length || w.length > 1)) { bag.push([x, 1]); continue; }
      out.push(x);
    }
    return out;
  }
  function sim(a, b) { a = lc(a); b = lc(b); let s = 0; if (a[0] === b[0]) s += 3; if (a[a.length - 1] === b[b.length - 1]) s += 2; if (a.length === b.length) s += 1.5; for (const ch of new Set(a)) if (b.includes(ch)) s += 0.4; return s; }
  function distractors(target, pool, k, mode, extra) {
    const t = lc(target); let c = D.uniq(pool.map(lc)).filter(x => x !== t);
    if (c.length < k) c = c.concat(D.uniq(D.L.preAll.concat(D.L.priA)).map(lc).filter(x => x !== t && !c.includes(x)));
    let pick;
    if (mode === 2) pick = c.map(x => [x, sim(t, x) + Math.random() * 2]).sort((a, b) => b[1] - a[1]).slice(0, k).map(x => x[0]);
    else if (mode === 0) { const far = c.filter(x => x[0] !== t[0] && Math.abs(x.length - t.length) >= 1); pick = shuffle(far.length >= k ? far : c).slice(0, k); }
    else pick = shuffle(c).slice(0, k);
    return pick;
  }

  // ---------- session planning ----------
  function plan(spec) {
    const rounds = []; let lv = null;
    if (spec.kind === 'level') {
      lv = D.LV[spec.lvl - 1]; const pool = levelPool(lv);
      if (lv.boss) {
        const types = ['hear', 'pic', 'fill', 'spell', 'hear', 'fill', 'spell', 'haul'];
        const spellOK = pool.filter(w => w.length <= 5 && /^[a-z]+$/.test(w));
        const pics = pool.filter(w => D.PIC[w]); const vpics = D.L.vehicles.concat(D.L.cvcPics.filter(w => D.PIC[w]));
        const ws = pickWords(pool, 12);
        const sents = shuffle(sentencesFor(lv));
        types.forEach((t, i) => {
          if (t === 'pic') rounds.push({ type: 'pic', word: pics.length ? pics[rnd(pics.length)] : vpics[rnd(vpics.length)], pool: pics.length > 2 ? pics : vpics });
          else if (t === 'fill' && sents.length) rounds.push({ type: 'fill', sent: sents.pop() });
          else if (t === 'spell' && spellOK.length) rounds.push({ type: 'spell', word: pickWords(spellOK, 1)[0], pool: spellOK });
          else if (t === 'haul') rounds.push({ type: 'haul', words: pickWords(pool, 3), pool, load: 3 });
          else rounds.push({ type: 'hear', word: ws[i], pool });
        });
      } else if (lv.mode === 'hear' || lv.mode === 'speed') { pickWords(pool, lv.rounds).forEach(w => rounds.push({ type: lv.mode, word: w, pool })); }
      else if (lv.mode === 'pic') { pickWords(pool, lv.rounds).forEach(w => rounds.push({ type: 'pic', word: w, pool })); }
      else if (lv.mode === 'spell') { pickWords(pool, lv.rounds).forEach(w => rounds.push({ type: 'spell', word: w, pool })); }
      else if (lv.mode === 'fill') { shuffle(sentencesFor(lv)).slice(0, lv.rounds).forEach(s => rounds.push({ type: 'fill', sent: s })); }
      else if (lv.mode === 'haul') { const per = lv.n[0] === 3 && lv.id < 8 ? 3 : 4; const ws = pickWords(pool, per * lv.rounds); for (let i = 0; i < lv.rounds; i++) rounds.push({ type: 'haul', words: ws.slice(i * per, i * per + per), pool, load: per }); }
    } else if (spec.kind === 'garage') {
      const all = Object.keys(S.me().words); const weak = all.filter(w => ['practice', 'learning'].includes(S.status(w)) && D.ALLWORDS.map(lc).includes(w));
      weak.sort((a, b) => (S.wstat(a).s - S.wstat(b).s));
      const pool = weak.slice(0, 12); spec.pool = pool; const types = ['hear', 'spell', 'hear', 'pic', 'hear', 'spell', 'hear', 'hear'];
      const ws = pool.length ? pickWords(pool, 8) : [];
      ws.forEach((w, i) => { let t = types[i]; if (t === 'pic' && !D.PIC[w]) t = 'hear'; if (t === 'spell' && (w.length > 5 || w.length < 2)) t = 'hear'; rounds.push({ type: t, word: w, pool: pool.length > 3 ? pool : D.L.preAll }); });
      lv = { id: 'G', name: 'Fix-It Garage', n: [3, 4], sim: 2, rounds: rounds.length, garage: true };
    } else if (spec.kind === 'letters') {
      const grp = D.LGROUPS[spec.group], letters = D.LETTERS.filter(l => grp.includes(l[0]));
      shuffle(letters.concat(letters)).slice(0, 8).forEach((l, i) => rounds.push({ type: 'letter', sub: i % 2 ? 'sound' : 'pic', L: l, pool: grp }));
      lv = { id: 'L' + spec.group, name: 'Letter Lane', n: [3, 4], rounds: 8, letters: true, sim: 1 };
    } else if (spec.kind === 'place') {
      lv = { id: 'P', name: 'Warm-up', n: [3, 3], sim: 1, rounds: 5, place: true };
    }
    return { lv, rounds };
  }

  // ---------- engine ----------
  let sess = null, root = null, locked = false, timers = [];
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function start(spec, container, onDone, onExit) {
    clearTimers(); F.unlock(); F.stopVoice();
    const p = plan(spec); const lv = p.lv;
    const steps = p.rounds.reduce((a, r) => a + (r.type === 'haul' ? r.words.length : 1), 0);
    sess = { spec, lv, rounds: p.rounds, idx: 0, total: steps, done: 0, ok: 0, misses: 0, streak: 0, bestStreak: 0, n: lv.n ? lv.n[0] : 3, turbo: 0, onDone, onExit, first: true, wordsSeen: {}, placeTier: 0, placeBest: -1 };
    root = container;
    if (!sess.rounds.length) { onDone({ empty: true, spec }); return; }
    if (lv.boss) intro(); else nextRound();
  }
  function stop() { clearTimers(); F.stopVoice(); sess = null; }

  function frame(extraCls) {
    const lv = sess.lv, pct = Math.round(sess.done / sess.total * 100);
    root.innerHTML = `<div class="game ${extraCls || ''}">
      <header class="gbar">
        <button class="ibtn" id="gx" aria-label="Back to map">${TR.icon.home}</button>
        <div class="road" aria-hidden="true"><div class="lane"></div><div class="rt" style="left:${pct}%">${TR.art('semi', { c: S.me() && TR.partColor() })}</div><div class="flag"></div></div>
        <div class="gstars" aria-label="Stars">${TR.icon.star}<b id="gst">${S.totalStars()}</b></div>
      </header>
      <main class="stage" id="stage"></main>
      <div class="cheer" id="cheer" aria-live="polite"></div></div>`;
    $('#gx').onclick = () => { const cb = sess && sess.onExit; stop(); cb && cb(); };
    return $('#stage');
  }
  function intro() {
    root.innerHTML = `<div class="game boss"><div class="bossintro"><h1>Big Rig Challenge!</h1><div class="bigrig">${TR.art('semi', { c: TR.partColor(), ...TR.rigOpts() })}</div><p>${sess.lv.grand ? 'The grand finale! Show off every word.' : 'Show what you can do!'}</p><button class="btn big go" id="bgo">Go!</button></div></div>`;
    F.horn(hornKind()); F.seq([['u:bigrig', D.PHRASES.bigrig]]);
    $('#bgo').onclick = () => { F.engine(); nextRound(); };
  }

  function nextRound() {
    clearTimers(); locked = false;
    if (!sess) return;
    if (sess.idx >= sess.rounds.length) return finish();
    const r = sess.rounds[sess.idx]; sess.cur = r; r.tries = 0; r.helped = false; r.logged = false;
    const stage = frame('t-' + r.type);
    const fn = { hear: renderHear, speed: renderHear, pic: renderPic, fill: renderFill, spell: renderSpell, haul: renderHaul, letter: renderLetter }[r.type];
    fn(stage, r);
  }
  function advance(delay) { later(() => { if (!sess) return; sess.idx++; nextRound(); }, delay || 1100); }
  function bumpRoad() { const rt = $('.rt'); if (rt) rt.style.left = Math.round(sess.done / sess.total * 100) + '%'; }

  // scoring for a target word; ok=true if tapped right on the first try without help
  function mark(word, ok, extra) {
    if (!word) return;
    S.record(word, ok);
    if (ok) { sess.ok++; sess.streak++; sess.bestStreak = Math.max(sess.bestStreak, sess.streak); } else { sess.misses++; sess.streak = 0; }
    const p = S.me(); if (sess.bestStreak > (p.bestStreak || 0)) { p.bestStreak = sess.bestStreak; S.save(); }
  }
  function adapt(ok) {
    const lv = sess.lv; if (!lv.n) return;
    if (ok && sess.streak >= 3) sess.n = Math.min(lv.n[1], sess.n + (sess.streak % 3 === 0 ? 1 : 0));
    if (!ok) sess.n = Math.max(lv.n[0], sess.n - 1);
  }
  function showCheer(text, cls) { const c = $('#cheer'); if (!c) return; c.textContent = text; c.className = 'cheer show ' + (cls || ''); later(() => { c.className = 'cheer'; }, 900); }
  function correctFx(word) {
    F.ding(); const c = cheer(); showCheer(c[1]);
    sess.done++; bumpRoad(); const g = $('#gst'); if (g) g.textContent = S.totalStars();
  }
  function wrongFx(btn) { F.boop(); if (btn) { btn.classList.add('shake', 'dim'); btn.disabled = true; setTimeout(() => btn && btn.classList.remove('shake'), 500); } }
  const capFirst = (w, up) => up ? w.charAt(0).toUpperCase() + w.slice(1) : w;

  function choiceGrid(items, cls) {
    return `<div class="choices n${items.length} ${cls || ''}">${items.map((it, i) => `<button class="cbtn" data-i="${i}" data-w="${it.label || disp(it.w)}"><span class="word">${it.label || disp(it.w)}</span></button>`).join('')}</div>`;
  }
  // generic multiple choice wiring. items [{w, ok, label}]
  function wireChoices(stage, r, items, opts) {
    opts = opts || {}; const btns = [...stage.querySelectorAll('.cbtn')];
    btns.forEach((b, i) => {
      b.onclick = () => {
        if (locked) return; F.unlock(); const it = items[i];
        if (it.ok) {
          locked = true; b.classList.add('right'); if (!r.logged) { r.logged = true; mark(r.word, r.tries === 0 && !r.helped); adapt(r.tries === 0 && !r.helped); }
          correctFx(r.word); if (opts.onRight) opts.onRight(b); else F.say(...wordKey(it.w)); advance(opts.delay);
        } else {
          r.tries++; if (!r.logged) { r.logged = true; mark(r.word, false); adapt(false); }
          wrongFx(b); F.seq([wordKey(it.w), 150, ['u:again', D.PHRASES.again]]);
          if (r.tries >= 2) { const rb = btns[items.findIndex(x => x.ok)]; rb && rb.classList.add('hint'); }
        }
      };
    });
  }
  function makeItems(r, k, cap) {
    const lv = sess.lv; const ds = distractors(r.word, r.pool || levelPool(lv), k - 1, lv.sim == null ? 1 : lv.sim);
    const items = shuffle([{ w: r.word, ok: true }].concat(ds.map(w => ({ w })))); items.forEach(it => it.label = capFirst(disp(it.w), cap)); return items;
  }

  // ----- hear & tap (and speed) -----
  function renderHear(stage, r) {
    const speed = r.type === 'speed', k = Math.min(sess.n + (speed ? 0 : 0), 4);
    const items = makeItems(r, Math.max(2, k));
    stage.innerHTML = `<div class="pane a"><div class="prompt"><button class="speak" id="spk" aria-label="Hear the word again">${TR.icon.speaker}</button>${speed ? '<div class="timer"><i id="tbar"></i></div>' : ''}${speed ? '<div class="turbo" id="turbo">TURBO ' + sess.turbo + '</div>' : ''}</div></div><div class="pane b">${choiceGrid(items)}</div>`;
    const play = () => F.say(...wordKey(r.word)); $('#spk').onclick = play;
    const t0 = Date.now();
    const seqs = sess.first ? [['u:' + (speed ? 'speedgo' : 'hear'), D.PHRASES[speed ? 'speedgo' : 'hear']], 120, wordKey(r.word)] : [wordKey(r.word)];
    sess.first = false; F.seq(seqs);
    if (speed) { const bar = $('#tbar'); bar.style.transition = 'width 6s linear'; requestAnimationFrame(() => requestAnimationFrame(() => bar.style.width = '0%')); }
    wireChoices(stage, r, items, { onRight: b => { if (speed && Date.now() - t0 < 4000 && r.tries === 0) { sess.turbo++; showCheer('TURBO!', 'turbo'); } F.say(...wordKey(r.word)); }, delay: speed ? 900 : 1100 });
    $('#spk').classList.add('pulse'); later(() => { const s = $('#spk'); s && s.classList.remove('pulse'); }, 2500);
  }

  // ----- picture match -----
  function renderPic(stage, r) {
    const k = Math.min(sess.n, 4), pc = D.PIC[r.word] || ['semi'];
    const pool = (r.pool || []).filter(w => D.PIC[w] && (w === r.word || w !== 'truck')); const items = makeItems({ word: r.word, pool: pool.length > 2 ? pool : D.L.cvcPics.concat(D.L.vehicles).filter(w => w === r.word || w !== 'truck') }, Math.max(2, k));
    stage.innerHTML = `<div class="pane a"><div class="prompt"><div class="pic">${TR.art(pc[0], pc[1])}</div><button class="help" id="hlp" aria-label="Help me: say the word">${TR.icon.help}</button></div><p class="cap" id="cap">&nbsp;</p></div><div class="pane b">${choiceGrid(items, 'long')}</div>`;
    $('#hlp').onclick = () => { r.helped = true; F.say(...wordKey(r.word)); const rb = stage.querySelectorAll('.cbtn')[items.findIndex(x => x.ok)]; rb && rb.classList.add('hint'); };
    if (sess.first) { F.seq([['u:findpic', D.PHRASES.findpic]]); sess.first = false; }
    wireChoices(stage, r, items, { onRight: b => {
      const es = S.settings.es && D.ES[r.word]; const cap = $('#cap');
      if (es) { cap.innerHTML = `<b>${D.ES[r.word]}</b> <small>(Spanish)</small>`; F.seq([wordKey(r.word), 250, ['e:' + r.word, D.ES[r.word], 'es-MX']]); } else F.say(...wordKey(r.word));
    }, delay: S.settings.es && D.ES[r.word] ? 2300 : 1100 });
  }

  // ----- fill in the blank -----
  function renderFill(stage, r) {
    const s = r.sent, k = Math.min(Math.max(2, sess.n), 3); r.word = s.a;
    const ds = shuffle(s.d).slice(0, k - 1); const cap = !s.pre;
    const items = shuffle([{ w: s.a, ok: true }].concat(ds.map(w => ({ w })))); items.forEach(it => it.label = capFirst(disp(it.w), cap));
    stage.innerHTML = `<div class="pane a"><div class="prompt fill"><div class="pic small">${TR.art(s.pic[0], s.pic[1])}</div><div class="sentrow"><div class="sent" id="sent"><span>${s.pre}</span> <span class="blank" id="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <span>${s.post}</span></div><button class="speak sm" id="spk" aria-label="Read the sentence">${TR.icon.speaker}</button></div></div></div><div class="pane b">${choiceGrid(items)}</div>`;
    const readStem = () => { const parts = []; if (/[A-Za-z]/.test(s.pre)) parts.push(['s:' + s.pre, s.pre]); parts.push(350); if (/[A-Za-z]/.test(s.post)) parts.push(['s:' + s.post, s.post]); return F.seq(parts); };
    $('#spk').onclick = readStem;
    if (sess.first) { F.seq([['u:fillit', D.PHRASES.fillit], 200].concat([])).then(readStem); sess.first = false; } else readStem();
    wireChoices(stage, r, items, { onRight: b => { const bl = $('#blank'); bl.textContent = capFirst(s.a, cap); bl.classList.add('filled'); F.say('s:' + s.full, s.full); }, delay: 2200 });
  }

  // ----- spell with letter tiles -----
  function renderSpell(stage, r) {
    const w = lc(r.word), pc = D.PIC[w]; const extra = Math.max(0, sess.n);
    const alphabet = 'abcdefghijklmnoprstuwy'.split(''); const ex = [];
    while (ex.length < extra) { const ch = alphabet[rnd(alphabet.length)]; if (!w.includes(ch) && !ex.includes(ch)) ex.push(ch); }
    const tiles = shuffle(w.split('').concat(ex));
    stage.innerHTML = `<div class="pane a"><div class="prompt">${pc ? `<div class="pic small">${TR.art(pc[0], pc[1])}</div>` : ''}<button class="speak" id="spk" aria-label="Hear the word again">${TR.icon.speaker}</button></div></div>
      <div class="pane b"><div class="slots" id="slots">${w.split('').map(() => '<span class="slot"></span>').join('')}</div>
      <div class="tiles">${tiles.map((t, i) => `<button class="tile" data-ch="${t}">${t}</button>`).join('')}</div></div>`;
    let pos = 0; const slots = [...stage.querySelectorAll('.slot')];
    const say = () => F.say(...wordKey(w)); $('#spk').onclick = say;
    if (sess.first) { F.seq([['u:spellit', D.PHRASES.spellit], 150, wordKey(w)]); sess.first = false; } else say();
    stage.querySelectorAll('.tile').forEach(t => t.onclick = () => {
      if (locked || t.disabled) return; F.unlock();
      if (t.dataset.ch === w[pos]) {
        slots[pos].textContent = t.dataset.ch; slots[pos].classList.add('on'); t.disabled = true; t.classList.add('used'); pos++; F.pop();
        if (pos === w.length) { locked = true; if (!r.logged) { r.logged = true; mark(w, r.tries === 0 && !r.helped); adapt(r.tries === 0); } correctFx(w); F.say(...wordKey(w)); slots.forEach(s => s.classList.add('done')); advance(1300); }
      } else { r.tries++; if (!r.logged) { r.logged = true; mark(w, false); adapt(false); } F.boop(); t.classList.add('shake'); setTimeout(() => t.classList.remove('shake'), 450); if (r.tries >= 2) { const nx = [...stage.querySelectorAll('.tile')].find(x => !x.disabled && x.dataset.ch === w[pos]); nx && nx.classList.add('hint'); } }
    });
  }

  // ----- load the trailer -----
  function renderHaul(stage, r) {
    const words = r.words.map(lc); r.step = 0; r.misses = 0;
    const nExtra = Math.min(6 - words.length, 2 + (sess.n > 3 ? 1 : 0)); const dis = distractors(words[0], r.pool, nExtra + 3, sess.lv.sim == null ? 1 : sess.lv.sim).filter(x => !words.includes(x)).slice(0, Math.max(2, nExtra));
    const crates = shuffle(words.concat(dis));
    stage.innerHTML = `<div class="pane a"><div class="trailer" id="trailer"><div class="deck">${words.map(() => '<div class="tslot"></div>').join('')}</div><div class="cab">${TR.art('semi', { c: TR.partColor(), ...TR.rigOpts() })}</div></div>
      <div class="prompt"><button class="speak sm" id="spk" aria-label="Hear the word again">${TR.icon.speaker}</button><div class="loadnum"><span id="lcount">0</span>/${words.length}</div></div></div>
      <div class="pane b"><div class="pile">${crates.map(c => `<button class="crate" data-w="${c}"><span class="word">${disp(c)}</span></button>`).join('')}</div></div>`;
    const ask = () => { const w = words[r.step]; F.seq([['u:loadit', D.PHRASES.loadit], 100, wordKey(w)]); };
    $('#spk').onclick = () => F.say(...wordKey(words[r.step]));
    ask(); sess.first = false;
    const slots = [...stage.querySelectorAll('.tslot')]; let wrongRun = 0;
    stage.querySelectorAll('.crate').forEach(cb => cb.onclick = () => {
      if (locked || cb.disabled) return; F.unlock(); const want = words[r.step], got = cb.dataset.w;
      if (got === want) {
        locked = true; mark(want, wrongRun === 0 && !r.helped); adapt(wrongRun === 0); wrongRun = 0;
        cb.classList.add('loaded'); cb.disabled = true; slots[r.step].innerHTML = `<span class="word">${got}</span>`; slots[r.step].classList.add('full'); F.pop(); F.ding(); sess.done++; bumpRoad();
        r.step++; $('#lcount').textContent = r.step;
        if (r.step >= words.length) {
          later(() => { F.say('u:loaded', D.PHRASES.loaded); $('#trailer').classList.add('drive'); F.horn(hornKind()); later(() => { F.engine(); }, 700); }, 500);
          advance(3300);
        } else { later(() => { locked = false; ask(); }, 900); }
      } else {
        if (wrongRun === 0) { mark(want, false); adapt(false); } wrongRun++; r.tries++; F.boop(); cb.classList.add('shake'); setTimeout(() => cb.classList.remove('shake'), 450);
        F.seq([wordKey(got), 150, ['u:again', D.PHRASES.again]]);
        if (wrongRun >= 2) { const h = [...stage.querySelectorAll('.crate')].find(x => !x.disabled && x.dataset.w === want); h && h.classList.add('hint'); }
      }
    });
  }

  // ----- letter lane -----
  function renderLetter(stage, r) {
    const L = r.L, sound = r.sub === 'sound', letters = D.LETTERS.map(l => l[0]);
    const k = Math.min(sess.n, 4); const others = shuffle(letters.filter(x => x !== L[0] && (sess.n < 4 || true))).slice(0, Math.max(1, k - 1));
    const items = shuffle([{ w: L[0], ok: true }].concat(others.map(w => ({ w })))); items.forEach(it => it.label = it.w.toUpperCase() + ' ' + it.w);
    r.word = null;
    stage.innerHTML = `<div class="pane a"><div class="prompt">${sound ? '' : `<div class="pic" id="lpic">${TR.art(L[2], {})}</div>`}<button class="speak ${sound ? '' : 'sm'}" id="spk" aria-label="Hear it">${TR.icon.speaker}</button></div><p class="cap">${sound ? '&nbsp;' : L[1]}</p></div><div class="pane b">${choiceGrid(items, 'letters')}</div>`;
    const q = () => sound ? F.say('z:' + L[0], L[4]) : F.say('w:' + L[1], L[1]);
    $('#spk').onclick = q; const lp = $('#lpic'); if (lp) lp.onclick = q;
    F.seq(sound ? [['u:lettersound', D.PHRASES.lettersound], 150, ['z:' + L[0], L[4]]] : [['w:' + L[1], L[1]], 200, ['u:letterstart', D.PHRASES.letterstart]]);
    sess.first = false;
    const btns = [...stage.querySelectorAll('.cbtn')];
    btns.forEach((b, i) => b.onclick = () => {
      if (locked) return; F.unlock(); const it = items[i];
      if (it.ok) { locked = true; b.classList.add('right'); mark(null); const first = r.tries === 0; if (first) { sess.ok++; sess.streak++; } else sess.misses++; adapt(first); correctFx(); F.seq([['n:' + L[0], L[3]], 120, ['z:' + L[0], L[4]], 250, ['w:' + L[1], L[1]]]); advance(2000); }
      else { r.tries++; if (r.tries === 1) { sess.misses++; sess.streak = 0; adapt(false); } wrongFx(b); F.seq([['u:again', D.PHRASES.again], 100, sound ? ['z:' + L[0], L[4]] : ['w:' + L[1], L[1]]]); if (r.tries >= 2) btns[items.findIndex(x => x.ok)].classList.add('hint'); }
    });
  }

  // ---------- finish ----------
  function finish() {
    const s = sess, lv = s.lv; const n = s.total || 1;
    const acc = s.ok / n; const stars = acc >= 0.85 ? 3 : acc >= 0.6 ? 2 : 1;
    const res = { spec: s.spec, lv, stars, acc, ok: s.ok, total: n, misses: s.misses, turbo: s.turbo, bestStreak: s.bestStreak };
    const cb = s.onDone; clearTimers(); sess = null; cb(res);
  }

  // ---------- placement ----------
  function startPlacement(container, onDone, onExit) {
    clearTimers(); F.unlock(); root = container;
    sess = { spec: { kind: 'place' }, lv: { id: 'P', n: [3, 3], sim: 1 }, rounds: new Array(5).fill(0).map(() => ({ type: 'hear' })), idx: 0, total: 5, done: 0, ok: 0, misses: 0, streak: 0, bestStreak: 0, n: 3, turbo: 0, onDone, onExit, first: true, tier: 0, best: -1, asked: {} };
    placeNext();
  }
  function placeNext() {
    clearTimers(); locked = false;
    if (sess.idx >= 5) { const best = sess.best; const lvl = best < 0 ? 1 : D.PLACE[best].lvl; const cb = sess.onDone; sess = null; return cb({ placed: true, best, lvl }); }
    const t = sess.tier, tw = D.PLACE[t].words.filter(w => !sess.asked[w]); const word = (tw.length ? tw : D.PLACE[t].words)[rnd((tw.length ? tw : D.PLACE[t].words).length)]; sess.asked[word] = 1;
    const pool = D.PLACE.flatMap(p => p.words); const r = { type: 'hear', word, pool: D.PLACE[t].words.concat(D.L.A, D.L.B), tries: 0 }; sess.cur = r;
    const stage = frame('t-hear t-place'); const items = makeItems(r, 3);
    stage.innerHTML = `<div class="pane a"><div class="prompt"><button class="speak" id="spk" aria-label="Hear the word again">${TR.icon.speaker}</button></div></div><div class="pane b">${choiceGrid(items)}</div>`;
    $('#spk').onclick = () => F.say(...wordKey(word));
    F.seq(sess.first ? [['u:hear', D.PHRASES.hear], 120, wordKey(word)] : [wordKey(word)]); sess.first = false;
    [...stage.querySelectorAll('.cbtn')].forEach((b, i) => b.onclick = () => {
      if (locked) return; locked = true; const it = items[i]; F.unlock(); S.record(word, !!it.ok);
      if (it.ok) { b.classList.add('right'); F.ding(); showCheer(cheer()[1]); sess.best = Math.max(sess.best, t); sess.tier = Math.min(D.PLACE.length - 1, t + 1); F.say(...wordKey(word)); }
      else { b.classList.add('dim'); F.pop(); F.say(...wordKey(word)); sess.tier = Math.max(0, t - 1); }
      sess.done++; bumpRoad(); sess.idx++; later(placeNext, 1300);
    });
  }

  TR.G = { start, startPlacement, stop, levelPool, get active() { return !!sess; }, get sess() { return sess; } };
})();
