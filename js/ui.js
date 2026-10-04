// Screens: title, home, road-trip map, rig garage, trophies, results, parent area.
var TR = window.TR = window.TR || {};
(function () {
  const D = TR.D, S = TR.S, F = TR.sfx, G = TR.G;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const app = () => $('#app');
  const NLV = D.LV.length;
  const MODE_TXT = { hear: ['Hear it, tap it', 'Listen to the word, then tap it.'], pic: ['Picture match', 'Match the word to the picture.'], fill: ['Fill the gap', 'Pick the missing word in the sentence.'], spell: ['Spell it', 'Tap the letters to spell the word.'], haul: ['Load the trailer', 'Load the trailer with the words you hear.'], speed: ['Speed round', 'Tap fast! Faster answers make Turbo.'], boss: ['Big Rig Challenge', 'A mix of everything. You can do it!'] };

  TR.partColor = () => { const r = S.me().rig; return (D.PARTS.color.find(c => c.id === r.color) || D.PARTS.color[0]).v; };
  TR.rigOpts = () => { const r = S.me().rig; return { stack: r.stack, tires: r.tires, decal: r.decal }; };
  const myRig = (extra) => TR.rig(Object.assign({ c: TR.partColor() }, TR.rigOpts(), extra || {}));
  const stars = n => [1, 2, 3].map(i => `<span class="st ${i <= n ? 'on' : ''}">${TR.icon.star}</span>`).join('');
  const hornKind = () => S.me().rig.horn;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function setSettings() { F.setSfx(S.settings.sfx); F.setVoice(S.settings.voice); }
  function go(fn) { G.stop(); fn(); }
  const view = (html, cls) => { app().innerHTML = `<div class="screen ${cls || ''}">${html}</div>`; };

  // ---------- title ----------
  function title() {
    view(`<div class="title"><div class="sky"><span class="cloud c1"></span><span class="cloud c2"></span></div>
      <h1>Truck <em>Readers</em></h1><p class="sub">Read words. Drive big trucks!</p>
      <div class="driveby">${myRig()}</div>
      <button class="btn big go" id="go">Let's Go! <span class="arrow">${TR.icon.back}</span></button>
      <p class="ver">${TR.VERSION}</p></div>`, 'titlescr');
    $('#go').onclick = () => { F.unlock(); F.engine(); setSettings(); F.preload(['u:welcome', 'u:letsgo']); S.markDay();
      F.say('u:welcome', D.PHRASES.welcome); later(() => afterTitle(), 900); };
  }
  let _t = []; function later(fn, ms) { _t.push(setTimeout(fn, ms)); }
  function afterTitle() {
    if (S.profiles().length > 1 && !TR._picked) return pickProfile();
    if (!S.me().placed) return placementIntro();
    home();
  }
  function pickProfile() {
    view(`<div class="center"><h2>Who is driving?</h2><div class="pgrid">${S.profiles().map(p => `<button class="btn big pick" data-id="${p.id}"><span class="mini">${TR.art('semi', { c: '#2f80ed' })}</span>${esc(p.name)}</button>`).join('')}</div></div>`);
    $$('.pick').forEach(b => b.onclick = () => { S.switchTo(b.dataset.id); TR._picked = 1; F.horn('air'); if (!S.me().placed) placementIntro(); else home(); });
  }

  // ---------- placement ----------
  function placementIntro() {
    view(`<div class="center card"><h2>Quick warm-up</h2><div class="pic w">${TR.art('semi', { c: TR.partColor() })}</div><p>Listen and tap the word. Just 5 words!</p><button class="btn big go" id="pgo">Start</button><button class="link" id="pskip">Skip for now</button></div>`);
    F.say('u:place', D.PHRASES.place);
    $('#pgo').onclick = () => { F.engine(); G.startPlacement(app(), placementDone, home); };
    $('#pskip').onclick = () => { const p = S.me(); p.placed = true; S.save(); home(); };
  }
  function placementDone(r) {
    const p = S.me(); p.placed = true; p.rec = r.lvl; p.unlocked = Math.max(p.unlocked, r.lvl); S.save();
    view(`<div class="center card"><h2>Great driving!</h2><div class="pic w">${TR.art(D.LV[r.lvl - 1].vehicle, { c: TR.partColor() })}</div><p>Your road starts at <b>Level ${r.lvl}</b>: ${esc(D.LV[r.lvl - 1].name)}</p><button class="btn big go" id="hgo">Let's drive!</button></div>`);
    F.fanfare(); F.say('u:letsgo', D.PHRASES.letsgo); $('#hgo').onclick = home;
  }

  // ---------- home ----------
  function home() {
    G.stop(); const p = S.me(); const rec = Math.min(Math.max(1, p.rec), p.unlocked, NLV); const lv = D.LV[rec - 1];
    const weak = Object.keys(p.words).filter(w => ['practice', 'learning'].includes(S.status(w))).length;
    view(`<header class="top"><button class="chip" id="prof" aria-label="Profile">${esc(p.name)}</button><div class="spacer"></div><div class="chip stars">${TR.icon.star}<b>${S.totalStars()}</b></div>
        <button class="ibtn" id="snd" aria-label="Sound on or off">${S.settings.sfx && S.settings.voice ? TR.icon.speaker : `<span class="off">${TR.icon.speaker}</span>`}</button>
        <button class="ibtn" id="par" aria-label="Parents">${TR.icon.lock}</button></header>
      <main class="home">
        <div class="homerig" id="hr" role="button" aria-label="Tap the truck to honk">${myRig()}</div>
        <button class="btn huge drive" id="drive"><span class="ba">${TR.art(lv.vehicle, { c: TR.partColor() })}</span><span class="bt"><b>Drive!</b><small>Level ${rec}: ${esc(lv.name)}</small></span></button>
        <div class="menu">
          <button class="btn m" id="m-map"><span class="mi">${TR.art('portcrane')}</span>Road Trip</button>
          <button class="btn m" id="m-let"><span class="mi">${TR.art('bulldozer')}</span>Letter Lane</button>
          <button class="btn m" id="m-gar"><span class="mi">${TR.art('tow')}</span>Fix-It Garage</button>
          <button class="btn m" id="m-rig"><span class="mi">${TR.art('swatch', { c: TR.partColor() })}</span>My Rig</button>
          <button class="btn m" id="m-tro"><span class="mi">${trophyIcon(3)}</span>Trophies</button>
        </div></main><footer class="ver">${TR.VERSION}</footer>`, 'homescr');
    $('#hr').onclick = () => { F.horn(hornKind()); $('#hr').classList.add('bounce'); setTimeout(() => $('#hr') && $('#hr').classList.remove('bounce'), 600); };
    $('#drive').onclick = () => playLevel(rec);
    $('#m-map').onclick = map; $('#m-rig').onclick = rigScreen; $('#m-tro').onclick = trophies; $('#m-let').onclick = letterMenu;
    $('#m-gar').onclick = () => { if (!weak && !Object.keys(p.words).length) return garageEmpty(); garage(); };
    $('#par').onclick = parentGate; $('#prof').onclick = () => { if (S.profiles().length > 1) { TR._picked = 0; pickProfile(); } else F.horn('toot'); };
    $('#snd').onclick = () => { const on = S.settings.sfx && S.settings.voice; S.settings.sfx = S.settings.voice = !on; S.save(); setSettings(); home(); };
  }
  function garageEmpty() {
    view(`<div class="center card"><h2>Fix-It Garage</h2><div class="pic w">${TR.art('tow')}</div><p>Play a few levels first. Then the garage helps practice tricky words!</p><button class="btn big" id="bk">Back</button></div>`); $('#bk').onclick = home;
  }
  function garage() {
    const pool = Object.keys(S.me().words).filter(w => ['practice', 'learning'].includes(S.status(w)));
    if (!pool.length) { view(`<div class="center card"><h2>All tuned up!</h2><div class="pic w">${TR.art('fire')}</div><p>No tricky words right now. Great job!</p><button class="btn big" id="bk">Back</button></div>`); F.say('u:tune', D.PHRASES.tune); $('#bk').onclick = home; return; }
    F.say('u:garage', D.PHRASES.garage); runSpec({ kind: 'garage' });
  }
  function letterMenu() {
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Back">${TR.icon.back}</button><h2 class="ttl">Letter Lane</h2><div class="spacer"></div></header><main class="center"><div class="lgrid">${D.LGROUPS.map((g, i) => `<button class="btn big lg" data-g="${i}"><span class="mini">${TR.art(D.LETTERS.find(l => l[0] === g[0])[2])}</span><span class="lt">${g.map(x => x.toUpperCase()).join(' ')}</span><span class="stars sm">${stars(S.levelStars('L' + i))}</span></button>`).join('')}</div></main>`);
    $('#bk').onclick = home; $$('.lg').forEach(b => b.onclick = () => runSpec({ kind: 'letters', group: +b.dataset.g }));
  }

  // ---------- map ----------
  function map() {
    G.stop(); const p = S.me();
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Back">${TR.icon.back}</button><h2 class="ttl">Road Trip</h2><div class="spacer"></div></header>
      <main class="mapwrap scroll">${D.WORLDS.map((w, wi) => {
        const lvs = D.LV.filter(l => l.w === wi); const first = lvs[0].id; const locked = first > p.unlocked;
        return `<section class="region ${w.id} ${locked ? 'lockedr' : ''}" style="--bg:${w.color};--gr:${w.ground}">
          <div class="rhead"><h3>${esc(w.name)}</h3><p>${esc(w.tip)}</p>${S.settings.es ? '' : ''}</div>
          <div class="rscene">${scene(w, wi)}</div>
          <div class="nodes">${lvs.map(l => node(l, p)).join('')}</div></section>`; }).join('')}
        <div class="endcap"><p>Complete all four places to finish the road trip!</p></div></main>`, 'mapscr');
    $('#bk').onclick = home;
    $$('.node').forEach(n => n.onclick = () => { const id = +n.dataset.l; if (id > p.unlocked) { F.boop(); n.classList.add('shake'); setTimeout(() => n.classList.remove('shake'), 400); return; } levelCard(id); });
    const cur = $('.node.now'); if (cur) cur.scrollIntoView({ block: 'center' });
  }
  function scene(w, wi) {
    const deco = { mn: ['plow', 'snow'], md: ['crab', 'portcrane'], tx: ['cattle', 'sun'], sv: ['chicken', 'sun'] }[w.id];
    return `<div class="sc">${deco.map((k, i) => k === 'snow' ? '<span class="snow">❄</span>' : `<div class="sv${i}">${TR.art(k, { c: '#e63946' })}</div>`).join('')}</div>`;
  }
  function node(l, p) {
    const st = S.levelStars(l.id), lock = l.id > p.unlocked, now = l.id === Math.min(p.rec, p.unlocked);
    return `<button class="node ${l.boss ? 'boss' : ''} ${lock ? 'lock' : ''} ${st ? 'done' : ''} ${now ? 'now' : ''}" data-l="${l.id}" aria-label="Level ${l.id} ${esc(l.name)}">
      <span class="num">${lock ? TR.icon.lock : (l.boss ? trophyIcon(st || 0) : l.id)}</span><span class="stars sm">${stars(st)}</span></button>`;
  }
  function levelCard(id) {
    const l = D.LV[id - 1], m = MODE_TXT[l.mode] || ['', ''];
    const el = document.createElement('div'); el.className = 'modal'; el.innerHTML = `<div class="mcard"><button class="x ibtn" aria-label="Close">×</button><h2>Level ${id}</h2><h3>${esc(l.name)}</h3><div class="pic w">${TR.art(l.vehicle, { c: TR.partColor() })}</div><p><b>${m[0]}</b><br>${m[1]}</p><div class="stars">${stars(S.levelStars(id))}</div><button class="btn big go" id="lgo">Go!</button></div>`;
    app().appendChild(el); $('.x', el).onclick = () => el.remove(); $('#lgo', el).onclick = () => { F.horn(hornKind()); playLevel(id); };
    F.engine();
  }
  function playLevel(id) { runSpec({ kind: 'level', lvl: id }); }
  function runSpec(spec) {
    F.unlock(); S.markDay();
    const back = spec.kind === 'level' ? map : home;
    app().innerHTML = '';
    G.start(spec, app(), res => results(res), back);
  }

  // ---------- results ----------
  function results(res) {
    if (res.empty) return home();
    const p = S.me(); const lv = res.lv; const unlockedBefore = partsUnlocked();
    let msg = '', trophy = null; const newBadges = [];
    const giveBadge = id => { if (S.giveBadge(id)) newBadges.push(D.BADGES.find(b => b.id === id)); };
    if (typeof lv.id === 'number') {
      S.finishLevel(lv.id, res.stars); p.unlocked = Math.min(NLV, Math.max(p.unlocked, lv.id + 1));
      if (res.acc >= 0.6) { if (lv.id >= p.rec) p.rec = Math.min(NLV, lv.id + 1); } else if (lv.id >= p.rec) p.rec = Math.max(1, lv.id - 1);
      if (lv.boss) { const old = p.trophies[lv.id] || 0; p.trophies[lv.id] = Math.max(old, res.stars); trophy = { w: lv.w, stars: res.stars }; }
      if (lv.mode === 'spell') giveBadge('speller');
      if (lv.id === NLV) giveBadge('trip');
      S.save();
    } else if (lv.garage) { const t = S.today(); if (p.bonusDay !== t) { S.addBonus(2); p.bonusDay = t; S.save(); } giveBadge('garage'); }
    else if (lv.letters) { const old = S.levelStars(lv.id); S.finishLevel(lv.id, res.stars); giveBadge('letters'); }
    if (S.totalStars() > 0) giveBadge('first');
    const m = S.masteredCount(); [[10, 'w10'], [25, 'w25'], [50, 'w50'], [100, 'w100']].forEach(([n, id]) => { if (m >= n) giveBadge(id); });
    if (p.bestStreak >= 5) giveBadge('streak5'); if (p.bestStreak >= 10) giveBadge('streak10');
    if (res.turbo) { p.turbo = (p.turbo || 0) + res.turbo; S.save(); if (p.turbo >= 5) giveBadge('turbo'); }
    const newParts = partsUnlocked().filter(x => !unlockedBefore.includes(x));
    msg = res.acc >= 0.85 ? 'Super reading!' : res.acc >= 0.6 ? 'Nice driving!' : "Good try! Let's practice more.";
    const nextId = typeof lv.id === 'number' && lv.id < NLV ? lv.id + 1 : 0;
    view(`<div class="results"><h1>${lv.boss ? 'Big Rig Challenge done!' : 'Level complete!'}</h1><div class="rstars">${stars(res.stars)}</div><div class="rrig drive-in">${myRig()}</div>
      <p class="rmsg">${msg}</p><p class="rsub">${res.ok} of ${res.total} on the first try${res.turbo ? ' · Turbo ' + res.turbo : ''}</p>
      ${trophy ? `<div class="reward">${trophyIcon(trophy.stars)}<span>${esc(D.TROPHY[trophy.w])} trophy!</span></div>` : ''}
      ${newParts.map(x => `<div class="reward">${TR.icon.star}<span>New part: ${esc(x)}!</span></div>`).join('')}
      ${newBadges.map(b => `<div class="reward">${TR.icon.star}<span>Badge: ${esc(b.name)}</span></div>`).join('')}
      <div class="rbtns">${nextId && res.acc >= 0.5 ? `<button class="btn big go" id="rn">Next level</button>` : ''}<button class="btn big ${res.acc < 0.5 ? 'go' : ''}" id="ra">Play again</button><button class="btn big" id="rm">${typeof lv.id === 'number' ? 'Road map' : 'Home'}</button></div></div>`, 'resscr');
    [...Array(res.stars)].forEach((_, i) => setTimeout(() => F.star(), 300 + i * 350));
    setTimeout(() => F.horn(hornKind()), 400); F.say('u:done', D.PHRASES.done);
    if (newParts.length) setTimeout(() => F.say('u:newpart', D.PHRASES.newpart), 1800);
    const rn = $('#rn'); if (rn) rn.onclick = () => playLevel(nextId);
    $('#ra').onclick = () => runSpec(res.spec); $('#rm').onclick = () => typeof lv.id === 'number' ? map() : home();
  }
  function partsUnlocked() { const out = []; for (const t of Object.keys(D.PARTS)) D.PARTS[t].forEach(x => { if (S.partUnlocked(t, x) && x.at > 0) out.push(x.name); }); return out; }

  // ---------- rig garage ----------
  const TABS = [['color', 'Paint'], ['stack', 'Stack'], ['horn', 'Horn'], ['tires', 'Tires'], ['decal', 'Decals']];
  function rigScreen(tab) {
    tab = tab || 'color'; const p = S.me(); const opts = D.PARTS[tab];
    const prev = (t, x) => { const o = Object.assign({ c: TR.partColor() }, TR.rigOpts()); if (t === 'color') return `<span class="sw" style="background:${x.v}"></span>`; if (t === 'horn') return `<span class="hi">${TR.icon.speaker}</span>`; o[t === 'tires' ? 'tires' : t] = x.id; return `<span class="rp">${TR.rig(o)}</span>`; };
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Back">${TR.icon.back}</button><h2 class="ttl">My Rig</h2><div class="chip stars">${TR.icon.star}<b>${S.totalStars()}</b></div></header>
      <main class="garage"><div class="gprev" id="gp">${myRig()}</div>
      <nav class="tabs">${TABS.map(([k, n]) => `<button class="tab ${k === tab ? 'on' : ''}" data-t="${k}">${n}</button>`).join('')}</nav>
      <div class="opts">${opts.map(x => { const ok = S.partUnlocked(tab, x), sel = p.rig[tab] === x.id; return `<button class="opt ${sel ? 'sel' : ''} ${ok ? '' : 'locked'}" data-id="${x.id}">${prev(tab, x)}<span class="on">${esc(x.name)}</span>${ok ? '' : `<span class="need">${TR.icon.lock} ${x.at}${TR.icon.star}</span>`}</button>`; }).join('')}</div></main>`, 'garagescr');
    $('#bk').onclick = home; $$('.tab').forEach(t => t.onclick = () => rigScreen(t.dataset.t));
    $$('.opt').forEach(b => b.onclick = () => {
      const x = opts.find(o => o.id === b.dataset.id);
      if (!S.partUnlocked(tab, x)) { F.boop(); b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); return; }
      p.rig[tab] = x.id; S.save(); if (tab === 'horn') F.horn(x.id); else F.pop(); rigScreen(tab);
    });
  }

  // ---------- trophies ----------
  function trophyIcon(n) {
    const c = n >= 3 ? '#e0a800' : n === 2 ? '#aab4c2' : n === 1 ? '#c27a3a' : '#d7dde6';
    return `<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M16 8 H44 V24 Q44 38 30 40 Q16 38 16 24 Z" fill="${c}"/><path d="M16 12 H8 Q8 26 18 28 M44 12 H52 Q52 26 42 28" fill="none" stroke="${c}" stroke-width="4"/><rect x="26" y="40" width="8" height="8" fill="${c}"/><rect x="18" y="48" width="24" height="7" rx="2" fill="${c}"/>${n ? '<path d="M30 14 l3 7 7 .6 -5.300 4.600 1.700 7 -6.400 -3.800 -6.400 3.800 1.700 -7 -5.300 -4.600 7 -.6Z" fill="#fff" opacity=".85"/>' : ''}</svg>`;
  }
  function trophies() {
    const p = S.me(); const bosses = D.LV.filter(l => l.boss);
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Back">${TR.icon.back}</button><h2 class="ttl">Trophies</h2><div class="spacer"></div></header>
      <main class="scroll trophies"><div class="tgrid">${bosses.map(l => { const n = p.trophies[l.id] || 0; return `<div class="tcard ${n ? '' : 'off'}">${trophyIcon(n)}<b>${esc(D.TROPHY[l.w])}</b><small>${esc(D.WORLDS[l.w].name)}</small></div>`; }).join('')}</div>
      <h3>Badges</h3><div class="bgrid">${D.BADGES.map(b => `<div class="badge ${p.badges[b.id] ? 'got' : ''}"><span>${TR.icon.star}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small></div>`).join('')}</div></main>`, 'trophscr');
    $('#bk').onclick = home;
  }

  // ---------- parent area ----------
  function keypad(opts) { // opts: title, len (auto submit) or ok button, onSubmit(value) -> bool|string
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Back">${TR.icon.back}</button><h2 class="ttl">${esc(opts.title)}</h2><div class="spacer"></div></header><main class="center keyp"><p>${esc(opts.sub || '')}</p><div class="dots" id="dots">${opts.len ? [...Array(opts.len)].map(() => '<i></i>').join('') : '<span id="val">&nbsp;</span>'}</div><div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '⌫', 0, opts.len ? '' : 'OK'].map(k => k === '' ? '<span></span>' : `<button class="pk" data-k="${k}">${k}</button>`).join('')}</div>${opts.extra || ''}</main>`, 'pinscr');
    let v = ''; $('#bk').onclick = opts.back || home;
    const upd = () => { if (opts.len) $$('#dots i').forEach((d, i) => d.className = i < v.length ? 'on' : ''); else $('#val').textContent = v || '\u00a0'; };
    const submit = () => { const r = opts.onSubmit(v); if (r === false) { v = ''; upd(); const d = $('#dots'); d.classList.add('shake'); F.boop(); setTimeout(() => d.classList.remove('shake'), 400); } };
    $$('.pk').forEach(b => b.onclick = () => { const k = b.dataset.k; if (k === '⌫') v = v.slice(0, -1); else if (k === 'OK') return submit(); else if (v.length < (opts.len || 3)) v += k; upd(); if (opts.len && v.length === opts.len) setTimeout(submit, 120); });
    return { setSub: t => $('.keyp p').textContent = t };
  }
  function parentGate() {
    G.stop();
    if (!S.hasPin()) { let first = ''; const k = keypad({ title: 'Parent PIN', sub: 'Make a 4-digit PIN for the parent area.', len: 4, onSubmit: v => { if (!first) { first = v; setTimeout(() => keypad2(), 0); return true; } } });
      const keypad2 = () => { keypad({ title: 'Parent PIN', sub: 'Type the PIN again to confirm.', len: 4, onSubmit: v => { if (v === first) { S.setPin(v); parent(); return true; } first = ''; setTimeout(parentGate, 400); return false; } }); };
      return; }
    const a = 6 + Math.floor(Math.random() * 4), b = 6 + Math.floor(Math.random() * 4);
    keypad({ title: 'Parents only', sub: 'Enter your PIN.', len: 4, extra: '<button class="link" id="forgot">Forgot PIN?</button>', onSubmit: v => { if (S.checkPin(v)) { parent(); return true; } return false; } });
    $('#forgot').onclick = () => keypad({ title: 'Reset PIN', sub: `Grown-ups: what is ${a} × ${b}?`, onSubmit: v => { if (+v === a * b) { S.settings.pin = ''; S.save(); parentGate(); return true; } return false; } });
  }
  function parent() {
    G.stop(); const p = S.me(); const words = D.uniq(D.ALLWORDS.map(w => w.toLowerCase())).sort();
    const groups = { mastered: [], practice: [], learning: [], new: [] }; words.forEach(w => groups[S.status(w)].push(w));
    const chip = (w, cls) => { const r = S.wstat(w); return `<span class="wc ${cls}">${esc(w)}${r ? `<small>${r.c}/${r.n}</small>` : ''}</span>`; };
    const lvlOpts = D.LV.map(l => `<option value="${l.id}" ${l.id === Math.min(p.rec, p.unlocked) ? 'selected' : ''}>${l.id}. ${esc(l.name)}</option>`).join('');
    view(`<header class="top"><button class="ibtn" id="bk" aria-label="Done">${TR.icon.home}</button><h2 class="ttl">Parent area</h2><div class="spacer"></div></header>
      <main class="scroll parent">
        <section><h3>Progress for ${esc(p.name)}</h3>
          <div class="kpis"><div><b>${groups.mastered.length}</b><span>words mastered</span></div><div><b>${groups.practice.length}</b><span>need practice</span></div><div><b>${groups.learning.length}</b><span>still learning</span></div><div><b>${groups.new.length}</b><span>not seen yet</span></div><div><b>${S.totalStars()}</b><span>stars</span></div><div><b>${p.days.length}</b><span>days played</span></div></div>
          <p class="note">A word counts as mastered after 3 right answers in a row on the first try. Needs practice means a recent miss.</p>
          <h4>Needs practice</h4><div class="wcs">${groups.practice.map(w => chip(w, 'pr')).join('') || '<em>None right now.</em>'}</div>
          <h4>Mastered</h4><div class="wcs">${groups.mastered.map(w => chip(w, 'ma')).join('') || '<em>None yet. Keep playing!</em>'}</div>
          <h4>Still learning</h4><div class="wcs">${groups.learning.map(w => chip(w, 'le')).join('') || '<em>None.</em>'}</div>
          <h4>Not seen yet</h4><div class="wcs">${groups.new.map(w => chip(w, 'ne')).join('') || '<em>All seen.</em>'}</div>
        </section>
        <section><h3>Level</h3><p class="note">Set where ${esc(p.name)} starts. Earlier levels stay open to replay.</p>
          <div class="row"><select id="lsel" aria-label="Level">${lvlOpts}</select><button class="btn" id="lset">Set level</button></div>
          <div class="row"><button class="btn" id="rewarm">Run the warm-up again</button></div></section>
        <section><h3>Settings</h3>
          <label class="tog"><input type="checkbox" id="s-sfx" ${S.settings.sfx ? 'checked' : ''}> Truck sounds</label>
          <label class="tog"><input type="checkbox" id="s-voice" ${S.settings.voice ? 'checked' : ''}> Read-aloud voice</label>
          <label class="tog"><input type="checkbox" id="s-es" ${S.settings.es ? 'checked' : ''}> Spanish bonus (shows and says the Spanish word after picture rounds)</label></section>
        <section><h3>Profiles</h3><div class="plist">${S.profiles().map(x => `<div class="prow"><input class="pn" data-id="${x.id}" value="${esc(x.name)}" maxlength="14" aria-label="Profile name"><button class="btn sm" data-sw="${x.id}">${x.id === S.db.active ? 'Active' : 'Switch'}</button><button class="btn sm danger" data-del="${x.id}">Delete</button></div>`).join('')}</div>
          <div class="row"><button class="btn" id="padd">Add a profile</button></div>
          <p class="note">Use a nickname. Names stay on this device.</p></section>
        <section><h3>Safety and reset</h3><div class="row"><button class="btn" id="cpin">Change PIN</button><button class="btn danger" id="reset">Reset ${esc(p.name)}'s progress</button></div>
          <p class="note">Everything is saved only on this device. No accounts, no ads, no tracking. After the first load the app works with no internet.</p>
          <p class="ver">Truck Readers ${TR.VERSION}</p></section></main>`, 'parentscr');
    $('#bk').onclick = home;
    $('#lset').onclick = () => { const n = +$('#lsel').value; p.rec = n; p.unlocked = Math.max(1, n); p.placed = true; S.save(); F.ding(); $('#lset').textContent = 'Saved!'; };
    $('#rewarm').onclick = () => { G.startPlacement(app(), placementDone, parent); };
    $('#s-sfx').onchange = e => { S.settings.sfx = e.target.checked; S.save(); setSettings(); };
    $('#s-voice').onchange = e => { S.settings.voice = e.target.checked; S.save(); setSettings(); };
    $('#s-es').onchange = e => { S.settings.es = e.target.checked; S.save(); };
    $$('.pn').forEach(i => i.onchange = () => { S.rename(i.dataset.id, i.value.trim()); });
    $$('[data-sw]').forEach(b => b.onclick = () => { S.switchTo(b.dataset.sw); parent(); });
    $$('[data-del]').forEach(b => b.onclick = () => { if (b.dataset.armed) { S.removeProfile(b.dataset.del); parent(); } else { b.dataset.armed = 1; b.textContent = 'Tap again to delete'; } });
    $('#padd').onclick = () => { S.addProfile('Driver 2'); TR._picked = 1; parent(); };
    $('#cpin').onclick = () => { S.settings.pin = ''; S.save(); parentGate(); };
    $('#reset').onclick = e => { const b = e.target; if (b.dataset.armed) { S.resetProgress(); home(); } else { b.dataset.armed = 1; b.textContent = 'Tap again to erase all progress'; } };
  }

  TR.UI = { title, home, map, parent, trophies, rigScreen, runSpec };
})();
