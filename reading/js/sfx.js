// Sound: recorded voice clips (decoded with WebAudio) + synthesized truck sounds. Speech synthesis is only a fallback.
var TR = window.TR = window.TR || {};
(function () {
  let ctx = null, master = null, index = null, voiceSrc = null, voiceTok = 0;
  const bufs = new Map(), loading = new Map();
  const st = TR.audioState = { sfx: true, voice: true, played: 0, spoken: [] };

  function ac() {
    if (ctx) return ctx;
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
    ctx = new C(); master = ctx.createGain(); master.gain.value = 0.9; master.connect(ctx.destination); return ctx;
  }
  function unlock() { const c = ac(); if (c && c.state !== 'running') c.resume().catch(() => {}); return c; }
  function loadIndex() {
    if (index) return Promise.resolve(index);
    return fetch('audio/index.json').then(r => r.json()).then(j => (index = j.clips || {})).catch(() => (index = {}));
  }
  function buffer(key) {
    if (bufs.has(key)) return Promise.resolve(bufs.get(key));
    if (loading.has(key)) return loading.get(key);
    const p = loadIndex().then(ix => {
      const id = ix[key]; if (!id) return null;
      return fetch('audio/c/' + id + '.mp3').then(r => r.arrayBuffer()).then(ab => new Promise((res, rej) => { const c = ac(); if (!c) return res(null); c.decodeAudioData(ab, res, rej); }));
    }).then(b => { bufs.set(key, b); loading.delete(key); return b; }).catch(() => { loading.delete(key); return null; });
    loading.set(key, p); return p;
  }
  function stopVoice() { voiceTok++; if (voiceSrc) { try { voiceSrc.onended = null; voiceSrc.stop(); } catch (e) {} voiceSrc = null; } try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} }

  function speakFallback(text, lang) {
    return new Promise(res => {
      try {
        const ss = window.speechSynthesis; if (!ss || !text) return res();
        const u = new SpeechSynthesisUtterance(text); u.rate = 0.8; u.pitch = 1.05; u.lang = lang || 'en-US';
        const vs = ss.getVoices().filter(v => v.lang && v.lang.toLowerCase().startsWith((lang || 'en').slice(0, 2).toLowerCase()));
        const pick = vs.find(v => /samantha|google us|natural|aria|jenny/i.test(v.name)) || vs.find(v => v.localService) || vs[0]; if (pick) u.voice = pick;
        u.onend = u.onerror = () => res(); ss.speak(u); setTimeout(res, 6000);
      } catch (e) { res(); }
    });
  }
  // say('w:truck', 'truck') -> resolves when finished
  function say(key, text, lang) {
    st.spoken.push(key); if (st.spoken.length > 50) st.spoken.shift();
    if (!st.voice) return Promise.resolve();
    stopVoice(); const tok = voiceTok; unlock();
    return buffer(key).then(b => {
      if (tok !== voiceTok) return;
      if (!b) return speakFallback(text, lang);
      const c = ac(); const src = c.createBufferSource(); src.buffer = b; const g = c.createGain(); g.gain.value = 1; src.connect(g); g.connect(master);
      voiceSrc = src; st.played++;
      return new Promise(res => { src.onended = () => { if (voiceSrc === src) voiceSrc = null; res(); }; src.start(); });
    });
  }
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // play several keys in order. items: [[key,text]|number(ms pause)]
  async function seq(items) {
    stopVoice(); const tok = voiceTok;
    for (const it of items) {
      if (tok !== voiceTok) return;
      if (typeof it === 'number') { await sleep(it); continue; }
      const my = voiceTok; await sayNoStop(it[0], it[1], it[2]); if (my !== voiceTok) return;
    }
  }
  function sayNoStop(key, text, lang) {
    st.spoken.push(key); if (!st.voice) return Promise.resolve(); unlock(); const tok = voiceTok;
    return buffer(key).then(b => {
      if (tok !== voiceTok) return;
      if (!b) return speakFallback(text, lang);
      const c = ac(); const src = c.createBufferSource(); src.buffer = b; src.connect(master); voiceSrc = src; st.played++;
      return new Promise(res => { src.onended = () => { if (voiceSrc === src) voiceSrc = null; res(); }; src.start(); });
    });
  }
  function preload(keys) { return Promise.all(keys.map(buffer)); }

  // ---------- synthesized effects ----------
  function env(g, t, a, hold, r, peak) { g.gain.cancelScheduled && g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.setValueAtTime(peak, t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + r); }
  function tone(freq, t0, dur, type, vol, opt) {
    const c = ac(); if (!c || !st.sfx) return; opt = opt || {};
    const o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t0); if (opt.to) o.frequency.exponentialRampToValueAtTime(opt.to, t0 + dur);
    f.type = 'lowpass'; f.frequency.value = opt.lp || 5000; env(g, t0, opt.a || 0.01, Math.max(0.01, dur - (opt.r || 0.08)), opt.r || 0.08, vol || 0.2);
    o.connect(f); f.connect(g); g.connect(master); o.start(t0); o.stop(t0 + dur + 0.15);
  }
  function now() { const c = unlock(); return c ? c.currentTime + 0.01 : 0; }
  const fx = {
    ding() { const t = now(); tone(880, t, .18, 'triangle', .22); tone(1318, t + .09, .3, 'triangle', .2); },
    boop() { const t = now(); tone(260, t, .22, 'sine', .22, { to: 190 }); },
    star() { const t = now(); [784, 988, 1175, 1568].forEach((f, i) => tone(f, t + i * .09, .25, 'triangle', .2)); },
    fanfare() { const t = now(); [523, 659, 784, 659, 784, 1046].forEach((f, i) => tone(f, t + i * .13, i === 5 ? .6 : .2, 'square', .09, { lp: 2600 })); },
    pop() { const t = now(); tone(500, t, .08, 'sine', .2, { to: 900 }); },
    tick() { const t = now(); tone(1200, t, .04, 'square', .05); },
    horn(kind) {
      const t = now(); if (!ac() || !st.sfx) return; kind = kind || 'air';
      if (kind === 'air') { tone(311, t, .75, 'sawtooth', .17, { lp: 1500, r: .15, a: .03 }); tone(392, t, .75, 'sawtooth', .17, { lp: 1500, r: .15, a: .03 }); tone(466, t, .75, 'square', .05, { lp: 1200, r: .15 }); }
      else if (kind === 'toot') { for (let i = 0; i < 2; i++) { tone(587, t + i * .22, .15, 'square', .09, { lp: 2200 }); tone(740, t + i * .22, .15, 'square', .07, { lp: 2200 }); } }
      else if (kind === 'deep') { tone(98, t, 1.1, 'sawtooth', .25, { lp: 600, r: .3, a: .05 }); tone(123, t, 1.1, 'sawtooth', .22, { lp: 600, r: .3, a: .05 }); tone(196, t, 1.1, 'square', .05, { lp: 500, r: .3 }); }
      else if (kind === 'music') { [523, 659, 784, 659, 523, 784, 1046].forEach((f, i) => tone(f, t + i * .12, .16, 'triangle', .2)); }
      else if (kind === 'beep') { for (let i = 0; i < 3; i++) tone(1000, t + i * .26, .13, 'square', .07, { lp: 3000 }); }
    },
    engine() { // friendly engine rumble that revs up a bit
      const c = unlock(); if (!c || !st.sfx) return; const t = c.currentTime + .01;
      const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter(), l = c.createOscillator(), lg = c.createGain();
      o.type = 'sawtooth'; o2.type = 'square'; o.frequency.setValueAtTime(42, t); o.frequency.linearRampToValueAtTime(70, t + .9); o2.frequency.setValueAtTime(21, t); o2.frequency.linearRampToValueAtTime(35, t + .9);
      l.frequency.value = 17; lg.gain.value = .35; l.connect(lg); lg.connect(g.gain); f.type = 'lowpass'; f.frequency.value = 260;
      env(g, t, .08, .8, .35, .5); o.connect(f); o2.connect(f); f.connect(g); g.connect(master); [o, o2, l].forEach(x => { x.start(t); x.stop(t + 1.4); });
    },
    backing() { const t = now(); for (let i = 0; i < 4; i++) tone(1000, t + i * .3, .14, 'square', .06, { lp: 3000 }); },
    hiss() { const c = unlock(); if (!c || !st.sfx) return; const t = c.currentTime, n = c.createBufferSource(), len = c.sampleRate * .5, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len); n.buffer = b; const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 2500; const g = c.createGain(); g.gain.value = .12; n.connect(f); f.connect(g); g.connect(master); n.start(t); },
  };
  TR.sfx = Object.assign(fx, { unlock, say, seq, stopVoice, preload, sleep, setSfx(v) { st.sfx = !!v; }, setVoice(v) { st.voice = !!v; if (!v) stopVoice(); } });
})();
