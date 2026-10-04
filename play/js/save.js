// Truck Readers saves. Several players per device (up to 6), each with separate progress and world.
// Every key starts with "truckreaders.".
export const PREFIX = 'truckreaders.';
const META_KEY = PREFIX + 'profiles.v1';
export const MAX_PROFILES = 6;
const kState = id => PREFIX + 'p.' + id + '.state.v1', kWorld = id => PREFIX + 'p.' + id + '.world.v1';
export const DEFAULT_SETTINGS = { music: true, musicVol: 0.4, bob: true, helperCheck: false, calm: false, simple: true, sound: true, rate: 0.9, autoRead: true, sens: 1, font: 'lexend', textSize: 1, spacing: true, cream: true, autoJump: true, view: 'back', zoom: 'normal', goButton: false, schoolOrder: false, simple: true };
function freshLevel() { return { read: 1, vocab: 1, lock: false, how: null, history: [], upStreak: { read: 0, vocab: 0 }, lowStreak: { read: 0, vocab: 0 } }; }
function fresh() { return { v: 2, settings: { ...DEFAULT_SETTINGS }, level: freshLevel(), focus: [], placement: null, time: 0, speechCount: 0, stars: 0, xp: 0, quests: {}, active: null, badges: {}, words: {}, quiz: {}, practice: {}, player: null, hotbar: 0, started: false }; }
function readJSON(k, d) { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch (e) { return d; } }
function writeJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

// ---------- profiles (device level) ----------
export let meta = { v: 1, pin: null, active: null, list: [] };
export function loadMeta() { const m = readJSON(META_KEY, null); meta = m && m.v === 1 ? { v: 1, pin: m.pin || null, active: m.active || null, list: Array.isArray(m.list) ? m.list : [] } : { v: 1, pin: null, active: null, list: [] }; return meta; }
export function saveMeta() { writeJSON(META_KEY, meta); }
export const profiles = () => meta.list;
export const activeProfile = () => meta.list.find(p => p.id === meta.active) || null;
export const getProfile = id => meta.list.find(p => p.id === id) || null;
export function setActive(id) { meta.active = id; saveMeta(); }
export function newId() { return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
// Create a profile with its starting level. Returns the profile.
export function createProfile({ name, age, look, level, lang }) {
  const id = newId(); const p = { id, name: (name || '').trim().slice(0, 20) || ('Player ' + (meta.list.length + 1)), age: Number(age) || 7, look, lang: lang || 'en', created: new Date().toLocaleDateString('en-US') };
  meta.list.push(p); saveMeta();
  const st = fresh(); if (level) Object.assign(st.level, level);
  st.level.history.push({ d: p.created, read: st.level.read, vocab: st.level.vocab, why: level && level.how === 'quiz' ? 'Placement quiz' : 'Chosen by a parent' });
  writeJSON(kState(id), st); return p;
}
export function updateProfile(id, patch) { const p = getProfile(id); if (!p) return; Object.assign(p, patch); saveMeta(); }
export function deleteProfile(id) { meta.list = meta.list.filter(p => p.id !== id); if (meta.active === id) meta.active = null; saveMeta(); try { localStorage.removeItem(kState(id)); localStorage.removeItem(kWorld(id)); } catch (e) { } }
export function resetProfile(id) { const old = readProfileState(id); const st = fresh(); st.level = old.level; st.focus = old.focus || []; st.settings = old.settings; st.level.history.push({ d: new Date().toLocaleDateString('en-US'), read: st.level.read, vocab: st.level.vocab, why: 'Progress reset' }); writeJSON(kState(id), st); try { localStorage.removeItem(kWorld(id)); } catch (e) { } if (id === meta.active) state = normalize(st); }
function normalize(s) { const st = Object.assign(fresh(), s || {}); st.settings = { ...DEFAULT_SETTINGS, ...((s && s.settings) || {}) }; st.level = Object.assign(freshLevel(), (s && s.level) || {}); return st; }
export function readProfileState(id) { if (id === meta.active && loadedId === id) return state; return normalize(readJSON(kState(id), null)); }
// Change another profile's saved state (or the live one, if it is the active player)
export function updateProfileState(id, fn) { if (id === meta.active && loadedId === id) { fn(state); saveState(true); return state; } const st = readProfileState(id); fn(st); writeJSON(kState(id), st); return st; }

// ---------- the active player's state ----------
export let state = fresh();
let loadedId = null;
export function loadState() {
  loadMeta(); const p = activeProfile(); loadedId = p ? p.id : null;
  state = p ? normalize(readJSON(kState(p.id), null)) : fresh();
  return state;
}
let t = null;
export function saveState(now) { if (!loadedId) return; clearTimeout(t); const id = loadedId, f = () => writeJSON(kState(id), state); if (now) f(); else t = setTimeout(f, 800); }
export function loadWorldEdits() { return loadedId ? readJSON(kWorld(loadedId), {}) : {}; }
let wt = null;
export function saveWorld(edits, now) { if (!loadedId) return; clearTimeout(wt); const id = loadedId, f = () => writeJSON(kWorld(id), edits); if (now) f(); else wt = setTimeout(f, 1500); }
export function hasPlayer() { return !!loadedId; }
