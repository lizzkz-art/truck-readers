// All artwork is drawn in code (inline SVG). No external images, fonts, or network.
var TR = window.TR = window.TR || {};
(function () {
  const INK = '#2b2f3a', CHR = '#d7dde6', GLASS = '#bfe6ff', STEEL = '#8892a0';
  const svg = (inner, vb) => `<svg viewBox="${vb || '0 0 220 130'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${inner}</svg>`;
  const shade = (hex, amt) => { // lighten (+) or darken (-) a #rrggbb color
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const f = v => Math.max(0, Math.min(255, Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))));
    return '#' + [f(r), f(g), f(b)].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const shadow = (cx, rx) => `<ellipse cx="${cx}" cy="112" rx="${rx}" ry="5" fill="rgba(0,0,0,.14)"/>`;
  const wheel = (x, y, r = 14, t = 'std') => {
    let rr = t === 'big' ? r * 1.22 : r, yy = t === 'big' ? y - (rr - r) : y;
    const hub = t === 'gold' ? '#f2c230' : CHR;
    return `<g><circle cx="${x}" cy="${yy}" r="${rr}" fill="${INK}"/>` +
      (t === 'white' ? `<circle cx="${x}" cy="${yy}" r="${rr * .8}" fill="#f5f7fa"/><circle cx="${x}" cy="${yy}" r="${rr * .62}" fill="${INK}"/>` : '') +
      (t === 'big' ? `<circle cx="${x}" cy="${yy}" r="${rr * .88}" fill="none" stroke="#4a5160" stroke-width="2" stroke-dasharray="4 4"/>` : '') +
      `<circle cx="${x}" cy="${yy}" r="${rr * .48}" fill="${hub}"/><circle cx="${x}" cy="${yy}" r="${rr * .17}" fill="${INK}"/></g>`;
  };
  const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${GLASS}" stroke="${INK}" stroke-opacity=".35" stroke-width="1.5"/>`;
  const star = (cx, cy, r, f) => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1); } return `<path d="${p}Z" fill="${f}"/>`; };

  // ----- the player's customizable rig (viewBox 300x130) -----
  function rig(o) {
    o = o || {}; const c = o.c || '#e63946', dark = shade(c, -.25), tire = o.tires || 'std', stack = o.stack || 'single', decal = o.decal || 'none';
    let s = shadow(150, 140);
    s += `<rect x="6" y="90" width="284" height="8" rx="3" fill="#3b4252"/>`;
    // trailer
    s += `<rect x="6" y="12" width="166" height="78" rx="7" fill="#f7f9fc" stroke="#c9d1dc" stroke-width="3"/>`;
    for (let x = 26; x < 170; x += 20) s += `<line x1="${x}" y1="18" x2="${x}" y2="84" stroke="#e3e8ef" stroke-width="2"/>`;
    s += `<rect x="6" y="66" width="166" height="10" fill="${c}"/>`;
    if (decal === 'stars') s += star(40, 40, 14, c) + star(88, 36, 11, c) + star(130, 42, 14, c);
    if (decal === 'stripes') s += `<path d="M20 12 L50 12 L10 66 L6 66 L6 40 Z M60 12 L90 12 L50 66 L20 66 Z M100 12 L130 12 L90 66 L60 66 Z" fill="${c}" opacity=".85"/>`;
    if (decal === 'one') s += `<circle cx="89" cy="40" r="22" fill="${c}"/><text x="89" y="51" text-anchor="middle" font-family="Verdana,sans-serif" font-weight="900" font-size="32" fill="#fff">1</text>`;
    if (decal === 'flowers') for (const [x, y, k] of [[34, 40, '#ffc928'], [88, 34, '#f06aa8'], [140, 42, '#2f80ed']]) s += `<g>${[0, 72, 144, 216, 288].map(a => `<circle cx="${x + 9 * Math.cos(a * Math.PI / 180)}" cy="${y + 9 * Math.sin(a * Math.PI / 180)}" r="6.5" fill="${k}"/>`).join('')}<circle cx="${x}" cy="${y}" r="5" fill="#fff4b0"/></g>`;
    s += `<rect x="148" y="90" width="5" height="12" fill="${INK}"/><rect x="166" y="86" width="26" height="6" rx="2" fill="${INK}"/>`;
    // cab
    s += `<rect x="176" y="26" width="54" height="64" rx="9" fill="${c}"/>`;
    s += `<path d="M176 30 Q176 16 192 16 H214 Q228 16 230 32 Z" fill="${dark}"/>`;
    s += `<rect x="226" y="56" width="50" height="34" rx="6" fill="${c}"/>`;
    s += `<path d="M206 32 H224 L230 56 H206 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>`;
    s += win(181, 34, 20, 22) + `<rect x="181" y="62" width="19" height="12" rx="3" fill="${shade(c, -.1)}" stroke="${INK}" stroke-opacity=".3"/>`;
    s += `<rect x="204" y="62" width="22" height="3" rx="1.5" fill="${dark}"/><rect x="207" y="70" width="10" height="3" rx="1.5" fill="${dark}"/>`;
    s += `<rect x="228" y="38" width="4" height="14" rx="2" fill="${INK}"/>`;
    // stacks
    const st = (x, h, cap) => `<rect x="${x}" y="${56 - h}" width="6" height="${h}" fill="${CHR}" stroke="#aeb7c4" stroke-width="1"/>` + (cap === 'bullet' ? `<circle cx="${x + 3}" cy="${56 - h}" r="5.5" fill="${CHR}" stroke="#aeb7c4"/>` : `<rect x="${x - 2}" y="${54 - h}" width="10" height="5" rx="2" fill="#aeb7c4"/>`);
    if (stack === 'single') s += st(236, 44);
    if (stack === 'double') s += st(236, 44) + st(247, 44);
    if (stack === 'tall') s += st(236, 54) + `<rect x="234" y="30" width="10" height="3" fill="#aeb7c4"/>`;
    if (stack === 'bullet') s += st(236, 46, 'bullet');
    // grill, lights, bumper, tank
    s += `<rect x="271" y="58" width="8" height="32" rx="2" fill="${CHR}" stroke="#aeb7c4"/>`;
    for (let y = 63; y < 88; y += 6) s += `<line x1="272" y1="${y}" x2="278" y2="${y}" stroke="#9aa5b4" stroke-width="1.5"/>`;
    s += `<circle cx="269" cy="66" r="5" fill="#ffe680" stroke="#c9a92f"/><rect x="266" y="89" width="22" height="8" rx="3" fill="${CHR}" stroke="#aeb7c4"/>`;
    s += `<rect x="198" y="84" width="34" height="16" rx="8" fill="${CHR}" stroke="#aeb7c4"/>`;
    s += `<rect x="200" y="6" width="5" height="9" rx="2" fill="${STEEL}"/><rect x="209" y="6" width="5" height="9" rx="2" fill="${STEEL}"/>`; // air horns
    // wheels
    for (const x of [38, 66, 204, 252]) s += wheel(x, 100, 16, tire);
    return svg(s, '0 0 300 130');
  }

  // ----- other vehicles (viewBox 220x130, facing right) -----
  const V = {};
  V.semi = o => rig({ c: o.c || '#e63946' });
  V.bus = o => { const c = o.c || '#ffc928'; let s = shadow(110, 100) + `<rect x="10" y="26" width="196" height="66" rx="14" fill="${c}"/><rect x="10" y="68" width="196" height="7" fill="${INK}" opacity=".75"/>`;
    for (let i = 0; i < 5; i++) s += win(24 + i * 30, 38, 24, 22);
    s += `<path d="M178 38 H198 Q204 38 204 46 V60 H178 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><circle cx="200" cy="80" r="4.5" fill="#fff3b0"/><rect x="198" y="88" width="14" height="6" rx="3" fill="${CHR}"/>`;
    return s + wheel(56, 96, 15) + wheel(160, 96, 15); };
  V.van = o => { const c = o.c || '#2f80ed'; let s = shadow(110, 95) + `<path d="M14 92 V58 Q14 44 28 44 H118 Q128 44 134 54 L152 70 H196 Q208 70 208 80 V92 Z" fill="${c}"/>`;
    s += win(28, 52, 34, 20) + win(68, 52, 34, 20) + `<path d="M112 52 H122 L140 70 H112 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>`;
    s += `<rect x="198" y="82" width="12" height="6" rx="3" fill="${CHR}"/><circle cx="203" cy="76" r="4" fill="#fff3b0"/><rect x="14" y="76" width="190" height="4" fill="${shade(c, -.25)}"/>`;
    return s + wheel(56, 96) + wheel(160, 96); };
  V.taxi = o => { const c = o.c || '#ffd23f'; let s = shadow(110, 92) + `<path d="M18 94 V72 Q18 64 28 62 L56 60 L74 38 H130 L152 60 H192 Q204 62 204 74 V94 Z" fill="${c}"/>`;
    s += `<path d="M64 58 L78 42 H98 V58 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><path d="M104 58 V42 H126 L144 58 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>`;
    s += `<rect x="86" y="28" width="32" height="11" rx="3" fill="#fff"/><text x="102" y="37" text-anchor="middle" font-family="Verdana,sans-serif" font-weight="800" font-size="8" fill="${INK}">TAXI</text>`;
    for (let i = 0; i < 9; i++) s += `<rect x="${24 + i * 8}" y="78" width="4" height="4" fill="${INK}"/><rect x="${28 + i * 8}" y="82" width="4" height="4" fill="${INK}"/>`;
    s += `<circle cx="197" cy="74" r="4" fill="#fff3b0"/>`; return s + wheel(62, 96) + wheel(158, 96); };
  V.jet = o => { let s = `<ellipse cx="110" cy="66" rx="92" ry="19" fill="#fff" stroke="#c9d1dc" stroke-width="3"/><path d="M178 56 Q206 58 204 66 Q204 72 178 74 Z" fill="#e63946" opacity=".0"/>`;
    s += `<path d="M26 62 L10 24 L34 24 L58 58 Z" fill="${o.c || '#2f80ed'}"/><path d="M96 70 L62 112 L92 112 L140 72 Z" fill="#dfe6f0" stroke="#c0c9d6" stroke-width="2"/><path d="M92 60 L60 20 L88 20 L130 58 Z" fill="#e9eef6" stroke="#c0c9d6" stroke-width="2"/>`;
    s += `<rect x="30" y="66" width="150" height="6" fill="${o.c || '#2f80ed'}"/>`; for (let i = 0; i < 9; i++) s += `<circle cx="${70 + i * 11}" cy="58" r="3.4" fill="${GLASS}" stroke="#7aa9c9"/>`;
    s += `<path d="M168 56 Q184 50 196 60 L170 62 Z" fill="${GLASS}" stroke="#7aa9c9" stroke-width="1.5"/><ellipse cx="96" cy="96" rx="14" ry="5" fill="#9aa5b4"/>`; return s; };
  V.tug = o => { const c = o.c || '#e63946'; let s = `<path d="M0 96 Q14 88 28 96 T56 96 T84 96 T112 96 T140 96 T168 96 T196 96 T224 96 V130 H0 Z" fill="#4aa3df"/>`;
    s += `<path d="M20 70 H184 L168 100 H44 Z" fill="${c}"/><rect x="20" y="66" width="164" height="8" rx="3" fill="#fff"/><rect x="62" y="38" width="64" height="30" rx="5" fill="#fff" stroke="#c9d1dc" stroke-width="2"/>`;
    s += win(70, 44, 14, 14) + win(90, 44, 14, 14) + win(108, 44, 12, 14) + `<rect x="86" y="14" width="22" height="26" fill="#33363d"/><rect x="86" y="14" width="22" height="7" fill="${c}"/>`;
    s += `<circle cx="104" cy="8" r="6" fill="#fff" opacity=".9"/><circle cx="116" cy="2" r="4" fill="#fff" opacity=".7"/>`;
    s += `<circle cx="184" cy="82" r="9" fill="${INK}"/><circle cx="184" cy="82" r="4" fill="#fff"/><path d="M0 104 Q14 98 28 104 T56 104 T84 104 T112 104 T140 104 T168 104 T196 104 T224 104 V130 H0Z" fill="#3b8fcb" opacity=".8"/>`; return s; };
  V.hog = o => { let s = shadow(110, 80), p = '#f6a5b5', d = '#e8879b';
    for (const x of [56, 76, 128, 148]) s += `<rect x="${x}" y="88" width="14" height="20" rx="6" fill="${d}"/>`;
    s += `<ellipse cx="104" cy="72" rx="64" ry="36" fill="${p}"/><path d="M42 60 Q22 50 30 38 Q40 34 34 48" fill="none" stroke="${d}" stroke-width="5" stroke-linecap="round"/>`;
    s += `<circle cx="164" cy="66" r="28" fill="${p}"/><path d="M150 44 L146 24 L166 38 Z" fill="${d}"/><path d="M176 40 L190 26 L192 48 Z" fill="${d}"/>`;
    s += `<ellipse cx="186" cy="76" rx="14" ry="11" fill="#f48fa3"/><circle cx="182" cy="76" r="2.6" fill="${INK}"/><circle cx="191" cy="76" r="2.6" fill="${INK}"/><circle cx="168" cy="58" r="4.5" fill="${INK}"/><circle cx="169.5" cy="56.5" r="1.4" fill="#fff"/>`;
    s += `<path d="M168 84 Q178 92 188 86" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="130" cy="58" r="6" fill="#8a5a33" opacity=".5"/><circle cx="90" cy="86" r="5" fill="#8a5a33" opacity=".5"/>`; return s; };
  V.mud = o => { let s = `<ellipse cx="110" cy="96" rx="92" ry="20" fill="#6b3f22"/><ellipse cx="110" cy="92" rx="82" ry="15" fill="#8a5a33"/>`;
    s += `<path d="M80 80 Q84 50 92 44 Q100 54 104 80 Z" fill="#8a5a33"/><path d="M118 82 Q124 40 134 34 Q142 48 140 82 Z" fill="#8a5a33"/><circle cx="64" cy="64" r="8" fill="#8a5a33"/><circle cx="162" cy="62" r="6" fill="#8a5a33"/><circle cx="150" cy="40" r="4" fill="#8a5a33"/>`;
    s += `<circle cx="70" cy="90" r="6" fill="#a8774d"/><circle cx="96" cy="98" r="4" fill="#a8774d"/><circle cx="150" cy="94" r="7" fill="#a8774d"/><circle cx="124" cy="98" r="3" fill="#a8774d"/>`; return s; };
  V.excavator = o => { const c = o.c || '#ffb703'; let s = shadow(100, 90);
    s += `<rect x="24" y="90" width="128" height="22" rx="11" fill="${INK}"/>`; for (const x of [38, 66, 94, 122, 140]) s += `<circle cx="${x}" cy="101" r="6" fill="#6b7482"/>`;
    s += `<rect x="30" y="58" width="98" height="34" rx="7" fill="${c}"/><rect x="36" y="30" width="48" height="32" rx="6" fill="${c}"/>` + win(42, 36, 30, 20);
    s += `<path d="M112 64 L152 28 L184 52" fill="none" stroke="${c}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><path d="M184 52 L198 88" stroke="${shade(c, -.2)}" stroke-width="9" stroke-linecap="round"/>`;
    s += `<path d="M190 84 H212 L208 106 Q196 108 188 100 Z" fill="${STEEL}" stroke="${INK}" stroke-opacity=".5" stroke-width="2"/><rect x="26" y="62" width="14" height="26" rx="4" fill="${shade(c, -.25)}"/>`; return s; };
  V.dump = o => { const c = o.c || '#ffc928'; let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<path d="M12 36 H132 L128 84 H12 Z" fill="${c}" stroke="${shade(c, -.25)}" stroke-width="3"/>`; for (const x of [34, 60, 86, 112]) s += `<line x1="${x}" y1="38" x2="${x}" y2="82" stroke="${shade(c, -.2)}" stroke-width="3"/>`;
    s += `<rect x="138" y="44" width="48" height="46" rx="7" fill="#e63946"/>` + `<path d="M156 50 H178 L184 70 H156 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>` + `<rect x="180" y="66" width="30" height="24" rx="5" fill="#e63946"/><circle cx="206" cy="72" r="4" fill="#fff3b0"/>`;
    return s + wheel(40, 98) + wheel(88, 98) + wheel(160, 98); };
  V.mixer = o => { let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<g transform="rotate(-9 78 60)"><ellipse cx="78" cy="58" rx="68" ry="32" fill="#f0f3f8" stroke="#c9d1dc" stroke-width="3"/><path d="M26 44 Q60 70 90 30 M44 82 Q76 62 108 86" fill="none" stroke="#fb8500" stroke-width="9" stroke-linecap="round"/><path d="M20 62 Q18 46 32 40" fill="none" stroke="#fb8500" stroke-width="9"/><ellipse cx="136" cy="52" rx="14" ry="22" fill="#fb8500"/></g>`;
    s += `<rect x="140" y="50" width="46" height="40" rx="7" fill="#2e9e4f"/><path d="M158 56 H178 L184 72 H158 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="182" y="68" width="28" height="22" rx="5" fill="#2e9e4f"/><circle cx="205" cy="74" r="4" fill="#fff3b0"/>`;
    return s + wheel(40, 98) + wheel(98, 98) + wheel(162, 98); };
  V.tractor = o => { const c = o.c || '#2e9e4f'; let s = shadow(112, 96);
    s += `<rect x="84" y="56" width="92" height="34" rx="8" fill="${c}"/><rect x="40" y="22" width="54" height="52" rx="8" fill="${c}"/>` + win(46, 28, 42, 30) + `<rect x="36" y="16" width="62" height="8" rx="3" fill="${shade(c, -.3)}"/>`;
    s += `<rect x="172" y="62" width="14" height="22" rx="3" fill="${CHR}"/><rect x="150" y="30" width="6" height="30" fill="${INK}"/><rect x="147" y="26" width="12" height="6" rx="2" fill="${INK}"/><circle cx="182" cy="68" r="4" fill="#fff3b0"/>`;
    s += `<circle cx="70" cy="86" r="30" fill="${INK}"/><circle cx="70" cy="86" r="30" fill="none" stroke="#4a5160" stroke-width="4" stroke-dasharray="6 5"/><circle cx="70" cy="86" r="14" fill="#ffd23f"/><circle cx="70" cy="86" r="4" fill="${INK}"/>` + wheel(158, 96, 16); return s; };
  V.crane = o => { const c = o.c || '#ffb703'; let s = shadow(108, 98) + `<rect x="8" y="82" width="206" height="14" rx="4" fill="${c}"/><rect x="8" y="94" width="206" height="6" fill="#3b4252"/>`;
    s += `<rect x="142" y="52" width="60" height="32" rx="7" fill="#f5f7fa" stroke="#c9d1dc" stroke-width="2"/>` + win(172, 58, 24, 18) + `<rect x="18" y="62" width="46" height="22" rx="4" fill="${shade(c, -.2)}"/>`;
    s += `<path d="M56 66 L146 8" stroke="${c}" stroke-width="13" stroke-linecap="round"/><path d="M62 70 L142 14 M62 62 L134 10" stroke="${INK}" stroke-opacity=".3" stroke-width="2"/>`;
    s += `<line x1="146" y1="10" x2="146" y2="52" stroke="${INK}" stroke-width="2.5"/><path d="M140 52 H152 V58 Q146 66 140 58 Z" fill="${INK}"/>`;
    s += `<rect x="130" y="66" width="22" height="16" rx="2" fill="#c98a4b" stroke="#8a5a33" stroke-width="2" opacity="0"/>`;
    s += wheel(40, 96) + wheel(88, 96) + wheel(166, 96);
    if (o.arrow) { const up = o.arrow === 'up'; s += `<g transform="translate(196 ${up ? 12 : 12})"><path d="${up ? 'M0 26 V4 M-9 12 L0 3 L9 12' : 'M0 4 V26 M-9 18 L0 27 L9 18'}" stroke="#2e9e4f" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
    return s; };
  V.tow = o => { const c = o.c || '#e63946'; let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<path d="M10 70 H134 L140 84 H10 Z" fill="#4a5160"/><path d="M36 70 L52 48 H92 L112 70 Z" fill="#2f80ed"/><path d="M54 66 L62 52 H78 V66 Z M82 66 V52 H92 L104 66 Z" fill="${GLASS}"/><rect x="28" y="66" width="96" height="8" rx="3" fill="#2f80ed"/><circle cx="48" cy="76" r="7" fill="${INK}"/><circle cx="108" cy="76" r="7" fill="${INK}"/>`;
    s += `<rect x="140" y="44" width="46" height="46" rx="7" fill="${c}"/><path d="M158 50 H178 L184 70 H158 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="182" y="66" width="28" height="24" rx="5" fill="${c}"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/><rect x="156" y="36" width="18" height="8" rx="4" fill="#ffb703"/>`;
    return s + wheel(40, 98) + wheel(82, 98) + wheel(162, 98); };
  V.fire = o => { const c = '#e63946'; let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<rect x="12" y="46" width="124" height="42" rx="6" fill="${c}"/><rect x="12" y="62" width="124" height="6" fill="#fff"/>`;
    s += `<rect x="18" y="26" width="112" height="7" rx="2" fill="${STEEL}"/><rect x="18" y="38" width="112" height="7" rx="2" fill="${STEEL}"/>`; for (let x = 24; x < 128; x += 10) s += `<line x1="${x}" y1="26" x2="${x}" y2="45" stroke="${INK}" stroke-opacity=".5" stroke-width="2"/>`;
    s += `<rect x="138" y="38" width="48" height="52" rx="7" fill="${c}"/><path d="M156 46 H178 L184 68 H156 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="182" y="66" width="28" height="24" rx="5" fill="${c}"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/>`;
    s += `<rect x="146" y="28" width="32" height="9" rx="4" fill="#fff"/><rect x="146" y="28" width="16" height="9" rx="4" fill="#2f80ed"/><rect x="162" y="28" width="16" height="9" rx="4" fill="#ffc928"/><rect x="26" y="70" width="26" height="14" rx="3" fill="#fff" opacity=".9"/>`;
    return s + wheel(40, 98) + wheel(92, 98) + wheel(162, 98); };
  V.garbage = o => { const c = o.c || '#2e9e4f'; let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<path d="M12 36 Q12 28 22 28 H120 Q132 28 132 40 V86 H12 Z" fill="${c}" stroke="${shade(c, -.25)}" stroke-width="3"/><rect x="12" y="74" width="120" height="12" fill="${shade(c, -.2)}"/>`;
    s += `<path d="M2 62 L20 54 V82 L2 82 Z" fill="${shade(c, -.3)}"/><rect x="48" y="44" width="52" height="22" rx="4" fill="${shade(c, .25)}"/>`;
    s += `<circle cx="74" cy="55" r="9" fill="none" stroke="#fff" stroke-width="3"/><path d="M74 46 l5 3 l-5 2" fill="#fff"/>`;
    s += `<rect x="138" y="44" width="46" height="46" rx="7" fill="#f5f7fa" stroke="#c9d1dc" stroke-width="2"/><path d="M156 50 H176 L182 70 H156 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="180" y="66" width="30" height="24" rx="5" fill="#f5f7fa" stroke="#c9d1dc" stroke-width="2"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/>`;
    return s + wheel(42, 98) + wheel(96, 98) + wheel(162, 98); };
  V.bulldozer = o => { const c = o.c || '#ffc928'; let s = shadow(110, 96);
    s += `<rect x="34" y="88" width="126" height="24" rx="12" fill="${INK}"/>`; for (const x of [48, 76, 104, 132, 148]) s += `<circle cx="${x}" cy="100" r="6" fill="#6b7482"/>`;
    s += `<rect x="56" y="58" width="96" height="32" rx="7" fill="${c}"/><rect x="92" y="26" width="46" height="36" rx="5" fill="${c}"/>` + win(98, 32, 34, 24) + `<rect x="88" y="20" width="56" height="8" rx="3" fill="${shade(c, -.3)}"/><rect x="66" y="34" width="6" height="26" fill="${INK}"/>`;
    s += `<rect x="148" y="70" width="30" height="8" rx="3" fill="${shade(c, -.3)}"/><path d="M172 44 H190 Q198 44 198 52 L202 100 H176 Q172 100 172 92 Z" fill="${STEEL}" stroke="${INK}" stroke-opacity=".5" stroke-width="2"/>`; return s; };
  V.loader = o => { const c = o.c || '#ffc928'; let s = shadow(110, 98);
    s += `<rect x="14" y="52" width="88" height="40" rx="8" fill="${c}"/><rect x="48" y="24" width="48" height="32" rx="6" fill="${c}"/>` + win(54, 30, 36, 20) + `<rect x="44" y="18" width="58" height="8" rx="3" fill="${shade(c, -.3)}"/>`;
    s += `<rect x="98" y="68" width="42" height="24" rx="6" fill="${shade(c, -.1)}"/><path d="M104 74 L158 80" stroke="${shade(c, -.3)}" stroke-width="9" stroke-linecap="round"/>`;
    s += `<path d="M152 58 H204 L198 102 Q176 108 156 98 Z" fill="${STEEL}" stroke="${INK}" stroke-opacity=".5" stroke-width="2.5"/>` + wheel(52, 92, 22) + wheel(124, 94, 20); return s; };
  V.tanker = o => { let s = shadow(110, 100) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<rect x="12" y="32" width="136" height="56" rx="28" fill="#e9eef6" stroke="#aab4c2" stroke-width="3"/><rect x="12" y="56" width="136" height="9" fill="#2f80ed"/>`; for (const x of [50, 90, 128]) s += `<line x1="${x}" y1="34" x2="${x}" y2="86" stroke="#c9d1dc" stroke-width="3"/>`;
    s += `<rect x="70" y="24" width="22" height="9" rx="3" fill="${STEEL}"/>`;
    if (o.drops) for (const [x, y] of [[40, 12], [80, 6], [120, 12]]) s += `<path d="M${x} ${y - 6} Q${x + 7} ${y + 4} ${x} ${y + 6} Q${x - 7} ${y + 4} ${x} ${y - 6}Z" fill="#4aa3df"/>`;
    s += `<rect x="150" y="44" width="38" height="46" rx="7" fill="#fb8500"/><path d="M164 50 H180 L186 70 H164 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="184" y="66" width="26" height="24" rx="5" fill="#fb8500"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/>`;
    return s + wheel(38, 98) + wheel(80, 98) + wheel(170, 98); };
  V.hauler = o => { let s = shadow(110, 104) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<rect x="12" y="62" width="142" height="6" fill="${STEEL}"/><rect x="16" y="30" width="136" height="5" fill="${STEEL}"/><line x1="16" y1="30" x2="16" y2="88" stroke="${STEEL}" stroke-width="4"/><line x1="152" y1="30" x2="152" y2="88" stroke="${STEEL}" stroke-width="4"/>`;
    const car = (x, y, col) => `<g><path d="M${x} ${y} V${y - 10} Q${x} ${y - 14} ${x + 5} ${y - 14} L${x + 10} ${y - 15} L${x + 15} ${y - 24} H${x + 30} L${x + 36} ${y - 15} H${x + 34} Q${x + 38} ${y - 14} ${x + 38} ${y - 8} V${y} Z" fill="${col}"/><circle cx="${x + 9}" cy="${y}" r="5" fill="${INK}"/><circle cx="${x + 29}" cy="${y}" r="5" fill="${INK}"/></g>`;
    s += car(22, 62, '#2f80ed') + car(66, 62, '#2e9e4f') + car(110, 62, '#ffc928') + car(40, 30, '#8e5bd6') + car(94, 30, '#f06aa8');
    s += `<rect x="156" y="44" width="34" height="46" rx="7" fill="#e63946"/><path d="M168 50 H184 L188 68 H168 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="186" y="66" width="24" height="24" rx="5" fill="#e63946"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/>`;
    return s + wheel(40, 98) + wheel(122, 98) + wheel(172, 98); };
  V.pickup = o => { const c = o.c || '#e63946'; let s = shadow(110, 96);
    s += `<path d="M12 90 V56 H88 V44 Q88 40 94 40 H132 Q140 40 146 50 L156 62 H198 Q208 62 208 74 V90 Z" fill="${c}"/><rect x="12" y="52" width="76" height="6" fill="${shade(c, -.25)}"/>`;
    s += `<path d="M100 48 H130 L142 62 H100 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><circle cx="202" cy="72" r="4" fill="#fff3b0"/><rect x="198" y="82" width="14" height="6" rx="3" fill="${CHR}"/>`;
    return s + wheel(52, 96, 16) + wheel(162, 96, 16); };
  V.plow = o => { const c = '#fb8500'; let s = shadow(110, 100);
    s += `<path d="M10 90 V50 H100 V40 Q100 36 106 36 H138 Q146 36 150 46 L158 58 H186 Q196 58 196 68 V90 Z" fill="${c}"/><path d="M110 44 H136 L148 58 H110 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>`;
    s += `<rect x="40" y="38" width="36" height="12" rx="3" fill="#ffc928"/><rect x="104" y="28" width="26" height="8" rx="4" fill="#ffc928"/>`;
    s += `<path d="M190 44 H204 Q214 44 214 54 L206 100 H186 Z" fill="#ffc928" stroke="${shade('#ffc928', -.3)}" stroke-width="3"/><path d="M196 54 L204 52" stroke="#fff" stroke-width="3" opacity=".7"/>`;
    for (const [x, y] of [[20, 20], [60, 12], [150, 18], [190, 10]]) s += `<g stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="M${x} ${y - 7}V${y + 7}M${x - 6} ${y - 3.5}L${x + 6} ${y + 3.5}M${x - 6} ${y + 3.5}L${x + 6} ${y - 3.5}"/></g>`;
    return s + wheel(48, 96, 16) + wheel(150, 96, 16); };
  V.cattle = o => { let s = shadow(110, 104) + `<rect x="8" y="88" width="204" height="9" rx="3" fill="#3b4252"/>`;
    s += `<rect x="12" y="28" width="142" height="60" rx="6" fill="#d9dee7" stroke="#aab4c2" stroke-width="3"/>`;
    for (let x = 22; x < 150; x += 12) s += `<rect x="${x}" y="36" width="6" height="44" rx="2" fill="#7b8696"/>`;
    for (const [x, y] of [[36, 64], [84, 66], [124, 62]]) s += `<g><ellipse cx="${x}" cy="${y}" rx="13" ry="11" fill="#fff" stroke="#c9d1dc"/><ellipse cx="${x - 5}" cy="${y - 3}" rx="5" ry="4" fill="#6b4a33"/><circle cx="${x - 3}" cy="${y}" r="1.6" fill="${INK}"/><circle cx="${x + 5}" cy="${y}" r="1.6" fill="${INK}"/><ellipse cx="${x + 1}" cy="${y + 6}" rx="6" ry="3.4" fill="#f6b6b6"/></g>`;
    s += `<rect x="158" y="44" width="34" height="46" rx="7" fill="#2f80ed"/><path d="M170 50 H186 L190 68 H170 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/><rect x="188" y="66" width="22" height="24" rx="5" fill="#2f80ed"/><circle cx="205" cy="72" r="4" fill="#fff3b0"/><rect x="170" y="30" width="6" height="16" fill="${CHR}"/>`;
    return s + wheel(40, 98) + wheel(122, 98) + wheel(172, 98); };
  V.chicken = o => { let s = shadow(110, 100); const cols = ['#e63946', '#fb8500', '#ffc928', '#2e9e4f', '#2f80ed', '#8e5bd6'];
    s += `<rect x="10" y="30" width="196" height="62" rx="14" fill="#ffc928"/>`; cols.forEach((k, i) => s += `<rect x="${10 + i * 33}" y="${i % 2 ? 66 : 70}" width="33" height="${i % 2 ? 26 : 22}" fill="${k}" opacity=".95"/>`);
    s += `<rect x="10" y="30" width="196" height="12" rx="6" fill="#e63946"/>`;
    for (let i = 0; i < 5; i++) s += win(22 + i * 30, 46, 22, 20);
    s += `<path d="M180 46 H196 Q202 46 202 54 V66 H180 Z" fill="${GLASS}" stroke="${INK}" stroke-opacity=".4" stroke-width="2"/>`;
    s += `<rect x="30" y="16" width="60" height="16" rx="4" fill="#c98a4b" stroke="#8a5a33" stroke-width="2"/><rect x="100" y="12" width="40" height="20" rx="4" fill="#2f80ed" stroke="#1d5fb5" stroke-width="2"/>`;
    for (const [x, y, k] of [[30, 80, '#fff'], [110, 82, '#fff']]) s += `<g>${[0, 72, 144, 216, 288].map(a => `<circle cx="${x + 5 * Math.cos(a * Math.PI / 180)}" cy="${y + 5 * Math.sin(a * Math.PI / 180)}" r="3.5" fill="${k}"/>`).join('')}<circle cx="${x}" cy="${y}" r="3" fill="#ffc928"/></g>`;
    s += `<circle cx="200" cy="80" r="4.5" fill="#fff3b0"/><rect x="198" y="88" width="14" height="6" rx="3" fill="${CHR}"/>`;
    return s + wheel(56, 96, 15) + wheel(160, 96, 15); };
  V.portcrane = o => { let s = `<path d="M0 100 Q14 94 28 100 T56 100 T84 100 T112 100 T140 100 T168 100 T196 100 T224 100 V130 H0 Z" fill="#4aa3df"/>`;
    s += `<rect x="10" y="84" width="118" height="22" rx="4" fill="#33363d"/><rect x="20" y="70" width="24" height="16" fill="#e63946"/><rect x="46" y="70" width="24" height="16" fill="#2f80ed"/><rect x="72" y="70" width="24" height="16" fill="#ffc928"/><rect x="98" y="70" width="24" height="16" fill="#2e9e4f"/>`;
    s += `<rect x="140" y="52" width="6" height="52" fill="#e63946"/><rect x="176" y="52" width="6" height="52" fill="#e63946"/><rect x="134" y="100" width="54" height="8" fill="#6b7482"/><path d="M146 52 L162 8 L176 52" fill="none" stroke="#e63946" stroke-width="5"/>`;
    s += `<rect x="12" y="4" width="170" height="10" rx="3" fill="#e63946"/><rect x="40" y="14" width="14" height="6" fill="#33363d"/><line x1="47" y1="20" x2="47" y2="44" stroke="${INK}" stroke-width="2"/><rect x="34" y="44" width="26" height="16" fill="#fb8500" stroke="#c46a00" stroke-width="2"/>`; return s; };
  V.crab = o => { const r = '#ef5a4f', d = '#c93e35'; let s = shadow(110, 70);
    for (const x of [52, 68, 84]) s += `<path d="M${x} 82 L${x - 16} 98" stroke="${d}" stroke-width="5" stroke-linecap="round"/>`;
    for (const x of [136, 152, 168]) s += `<path d="M${x} 82 L${x + 16} 98" stroke="${d}" stroke-width="5" stroke-linecap="round"/>`;
    s += `<ellipse cx="110" cy="72" rx="56" ry="32" fill="${r}"/><path d="M62 50 Q36 40 34 22 Q54 16 62 36" fill="${r}" stroke="${d}" stroke-width="3"/><path d="M158 50 Q184 40 186 22 Q166 16 158 36" fill="${r}" stroke="${d}" stroke-width="3"/><path d="M34 22 Q44 28 46 38 M186 22 Q176 28 174 38" stroke="${d}" stroke-width="3" fill="none"/>`;
    s += `<rect x="90" y="30" width="5" height="16" fill="${d}"/><rect x="125" y="30" width="5" height="16" fill="${d}"/><circle cx="92" cy="30" r="9" fill="#fff" stroke="${d}" stroke-width="2"/><circle cx="128" cy="30" r="9" fill="#fff" stroke="${d}" stroke-width="2"/><circle cx="94" cy="31" r="4.4" fill="${INK}"/><circle cx="126" cy="31" r="4.4" fill="${INK}"/>`;
    s += `<path d="M96 72 Q110 86 124 72" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`; return s; };
  V.stop = o => svg(`<polygon points="70,10 150,10 200,50 200,100 150,138 70,138 20,100 20,50" transform="translate(0 -6) scale(1 .9)" fill="#e63946" stroke="#fff" stroke-width="6"/><text x="110" y="76" text-anchor="middle" font-family="Verdana,Arial,sans-serif" font-weight="900" font-size="36" fill="#fff">STOP</text>`);
  V.light = o => svg(`<rect x="80" y="6" width="60" height="118" rx="14" fill="#33363d"/><circle cx="110" cy="30" r="14" fill="#6b2a2f"/><circle cx="110" cy="65" r="14" fill="#6b5a2a"/><circle cx="110" cy="100" r="15" fill="#3ddc6a"/><circle cx="110" cy="100" r="22" fill="#3ddc6a" opacity=".25"/>`);
  V.swatch = o => svg(`<circle cx="110" cy="66" r="52" fill="${o.c || '#e63946'}" stroke="${INK}" stroke-opacity=".25" stroke-width="4"/><ellipse cx="90" cy="44" rx="16" ry="9" fill="#fff" opacity=".45" transform="rotate(-30 90 44)"/>`);
  V.arrow = o => svg(`<circle cx="110" cy="66" r="52" fill="#e8f7ec" stroke="#2e9e4f" stroke-width="5"/><path d="${o.dir === 'up' ? 'M110 96 V38 M86 60 L110 36 L134 60' : 'M110 36 V94 M86 72 L110 96 L134 72'}" stroke="#2e9e4f" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
  V.can = o => svg(`<ellipse cx="110" cy="104" rx="42" ry="10" fill="rgba(0,0,0,.14)"/><path d="M68 34 V96 Q110 112 152 96 V34 Z" fill="#cfd5df" stroke="#9aa5b4" stroke-width="3"/><ellipse cx="110" cy="34" rx="42" ry="11" fill="#e9eef6" stroke="#9aa5b4" stroke-width="3"/><path d="M68 50 V84 Q110 100 152 84 V50 Q110 66 68 50Z" fill="#e63946"/><circle cx="110" cy="68" r="8" fill="#fff" opacity=".85"/>`);
  V.sun = o => svg(`<circle cx="110" cy="66" r="30" fill="#ffd23f"/>` + [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="${110 + 38 * Math.cos(a * Math.PI / 180)}" y1="${66 + 38 * Math.sin(a * Math.PI / 180)}" x2="${110 + 52 * Math.cos(a * Math.PI / 180)}" y2="${66 + 52 * Math.sin(a * Math.PI / 180)}" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>`).join(''));
  // picture-in-svg-wrapper: some builders return full svg already
  function art(key, o) {
    o = o || {}; const f = V[key]; if (!f) return svg('');
    const out = f(o); if (out.startsWith('<svg')) return out;
    return svg(out, key === 'semi' ? '0 0 300 130' : undefined);
  }
  TR.art = art; TR.rig = rig; TR.shade = shade; TR.svg = svg; TR.V = V;
  // tiny icons for UI buttons
  TR.icon = {
    speaker: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 18 H14 L26 8 V40 L14 30 H6 Z" fill="currentColor"/><path d="M32 16 Q40 24 32 32 M37 10 Q50 24 37 38" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    home: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 24 L24 8 L42 24 V42 H29 V30 H19 V42 H6 Z" fill="currentColor"/></svg>`,
    back: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M30 8 L14 24 L30 40" stroke="currentColor" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    lock: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="20" width="30" height="24" rx="5" fill="currentColor"/><path d="M15 20 V14 Q15 6 24 6 Q33 6 33 14 V20" stroke="currentColor" stroke-width="5" fill="none"/></svg>`,
    star: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 L30 17 L45 18 L33.500 28 L37.500 43 L24 35 L10.500 43 L14.500 28 L3 18 L18 17 Z" fill="currentColor"/></svg>`,
    gear: `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" stroke-width="6"/><path d="M24 3 V10 M24 38 V45 M3 24 H10 M38 24 H45 M9 9 L14 14 M34 34 L39 39 M39 9 L34 14 M14 34 L9 39" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
    help: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6 Q10 6 10 20 V28 Q10 36 18 36 H20 V22 H14 M34 22 H28 V36 H30 Q38 36 38 28 V20 Q38 6 24 6" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };
})();
