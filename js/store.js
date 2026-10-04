// Local-only saves. Nothing leaves this device; no accounts, no tracking.
var TR = window.TR = window.TR || {};
(function () {
  const KEY = 'truckreaders.v1';
  let mem = null; let db = null;
  function blankProfile(name) {
    return { name: name || 'Driver', made: Date.now(), levels: {}, words: {}, bonus: 0, rig: { color: 'red', stack: 'single', horn: 'air', tires: 'std', decal: 'none' },
      trophies: {}, badges: {}, placed: false, rec: 1, unlocked: 1, bestStreak: 0, days: [], turbo: 0, bonusDay: '' };
  }
  function blank() { return { v: 1, settings: { sfx: true, voice: true, es: false, pin: '' }, active: 'p1', profiles: { p1: blankProfile('Driver') } }; }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); if (d && d.profiles) return d; } } catch (e) {}
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { mem = JSON.stringify(db); } }
  db = load();
  const S = TR.S = {
    get db() { return db; }, save,
    get settings() { return db.settings; },
    me() { return db.profiles[db.active] || (db.active = Object.keys(db.profiles)[0], db.profiles[db.active]); },
    profiles() { return Object.entries(db.profiles).map(([id, p]) => ({ id, name: p.name })); },
    addProfile(name) { const id = 'p' + Date.now().toString(36); db.profiles[id] = blankProfile((name || 'Driver').slice(0, 14)); db.active = id; save(); return id; },
    rename(id, name) { if (db.profiles[id]) { db.profiles[id].name = (name || 'Driver').slice(0, 14); save(); } },
    switchTo(id) { if (db.profiles[id]) { db.active = id; save(); } },
    removeProfile(id) { if (Object.keys(db.profiles).length < 2) return false; delete db.profiles[id]; if (db.active === id) db.active = Object.keys(db.profiles)[0]; save(); return true; },
    resetProgress() { const p = S.me(); const keep = p.name; db.profiles[db.active] = blankProfile(keep); save(); },
    hashPin(p) { let h = 5381; const s = 'trk|' + p; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); },
    hasPin() { return !!db.settings.pin; },
    setPin(p) { db.settings.pin = S.hashPin(p); save(); },
    checkPin(p) { return db.settings.pin === S.hashPin(p); },
    // ----- words -----
    wstat(w) { return S.me().words[w.toLowerCase()]; },
    record(w, ok) {
      w = w.toLowerCase(); const p = S.me(); const r = p.words[w] || (p.words[w] = { n: 0, c: 0, s: 0, last: 1, t: 0 });
      r.n++; if (ok) { r.c++; r.s++; r.last = 1; } else { r.s = 0; r.last = 0; } r.t = Date.now(); save();
    },
    status(w) {
      const r = S.wstat(w); if (!r) return 'new';
      if (r.s >= 3 && r.n >= 3) return 'mastered';
      if (r.n >= 2 && (!r.last || r.c / r.n < 0.6)) return 'practice';
      if (r.n === 1 && !r.last) return 'practice';
      return 'learning';
    },
    // ----- stars / levels -----
    totalStars() { const p = S.me(); let t = p.bonus || 0; for (const k in p.levels) t += p.levels[k].stars || 0; return t; },
    levelStars(id) { const l = S.me().levels[id]; return l ? l.stars : 0; },
    finishLevel(id, stars) {
      const p = S.me(); const l = p.levels[id] || (p.levels[id] = { stars: 0, plays: 0 }); const before = S.totalStars();
      l.plays++; if (stars > l.stars) l.stars = stars; save(); return S.totalStars() - before;
    },
    addBonus(n) { S.me().bonus = (S.me().bonus || 0) + n; save(); },
    partUnlocked(type, part) { return S.totalStars() >= part.at; },
    hasBadge(id) { return !!S.me().badges[id]; },
    giveBadge(id) { const p = S.me(); if (p.badges[id]) return false; p.badges[id] = Date.now(); save(); return true; },
    masteredCount() { const p = S.me(); return Object.keys(p.words).filter(w => S.status(w) === 'mastered').length; },
    today() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); },
    markDay() { const p = S.me(), t = S.today(); if (p.days[p.days.length - 1] !== t) { p.days.push(t); if (p.days.length > 400) p.days.shift(); save(); } },
  };
})();
