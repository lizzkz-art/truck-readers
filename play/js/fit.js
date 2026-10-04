// Truck Readers: auto-size big words so they always fit their box.
// Every big single word or short phrase (Read It Aloud, Say It With Me, word games, spelling choices,
// placement words, Word Book) starts at its normal CSS size. After it is drawn, we measure it and shrink
// the font until it fits on one line, never below a readable minimum. Only below the minimum does it wrap
// (with hyphens where the browser can). Short words stay big. Letter spacing is in em, so the
// dyslexia-friendly spacing scales with the font. Refits on resize, rotation, font or text-size changes,
// and whenever the word changes.
export const FIT_SEL = ['.fit', '.bigword', '.ra-target', '.chunks.word', '.dragword', '.pshow', '.built', '.wc-head b', '.wp-word .fit',
  '.choices.letters .choice', '.choices.letters.words .choice', '.pchoices.bigtext .ptext', '.bucket.choice > span', '.tile'].join(', ');
const SMALL_SEL = '.ptext, .choice, .tile, .bucket.choice > span, .wc-head b';
const MIN_PX = 18;           // never shrink a big word below this (about the body text size)
const MIN_REL = 0.9;         // ...or below 90% of the current body text size, whichever is larger
const widths = new WeakMap();
let queued = new Set(), raf = 0, all = false;

function minFor(el, max) {
  const d = el.dataset.fitMin; if (d) return Math.min(max, parseFloat(d));
  const base = parseFloat(getComputedStyle(document.body).fontSize) || 20;
  if (el.matches(SMALL_SEL)) return Math.min(max, Math.max(15, base * 0.8)); // answer buttons and tiles can go a little smaller
  return Math.min(max, Math.max(MIN_PX, base * MIN_REL));
}
const over = el => el.scrollWidth > el.clientWidth + 1;
export function fitOne(el) {
  if (!el.isConnected) return;
  el.classList.remove('fit-wrap'); el.style.fontSize = '';
  if (!el.clientWidth) return;                       // hidden right now; the resize observer will call again
  const max = parseFloat(getComputedStyle(el).fontSize); if (!max) return;
  el.dataset.fitText = el.textContent;
  if (!over(el)) { el.dataset.fitPx = String(Math.round(max)); return; }
  const min = minFor(el, max);
  // first guess from the measured width (text width scales with font size), then fine steps
  let px = Math.max(min, Math.floor(max * (el.clientWidth / el.scrollWidth) * 0.98));
  el.style.fontSize = px + 'px';
  for (let i = 0; i < 40 && over(el) && px > min; i++) { px = Math.max(min, px - Math.max(1, Math.round(px * 0.04))); el.style.fontSize = px + 'px'; }
  if (over(el)) el.classList.add('fit-wrap');        // last resort: wrap or hyphenate at the minimum size
  el.dataset.fitPx = String(px);
}
function flush() {
  raf = 0;
  const list = all ? [...document.querySelectorAll(FIT_SEL)] : [...queued];
  all = false; queued = new Set();
  for (const el of list) { fitOne(el); watch(el); }
}
function schedule(el) { if (el) queued.add(el); else all = true; if (!raf) raf = requestAnimationFrame(flush); }
export function refitAll() { schedule(null); }
// Width changes of the box around a word (rotation, window size, scrollbars, layout)
const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(entries => {
  for (const e of entries) {
    const w = Math.round(e.contentRect.width); if (widths.get(e.target) === w) continue; widths.set(e.target, w);
    e.target.querySelectorAll(FIT_SEL).forEach(el => schedule(el)); if (e.target.matches && e.target.matches(FIT_SEL)) schedule(e.target);
  }
}) : null;
function watch(el) { const p = el.parentElement; if (ro && p && !widths.has(p)) { widths.set(p, Math.round(p.getBoundingClientRect().width)); ro.observe(p); } }

export function initFit() {
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      if (m.type === 'characterData') { const el = m.target.parentElement && m.target.parentElement.closest(FIT_SEL); if (el) schedule(el); continue; }
      for (const n of m.addedNodes) {
        if (n.nodeType === 3) { const el = n.parentElement && n.parentElement.closest(FIT_SEL); if (el) schedule(el); continue; }
        if (n.nodeType !== 1) continue;
        if (n.matches(FIT_SEL)) schedule(n);
        n.querySelectorAll(FIT_SEL).forEach(el => schedule(el));
        const up = n.parentElement && n.parentElement.closest(FIT_SEL); if (up) schedule(up); // e.g. a part added to a built word
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  // a second observer for the body class (font, text size, spacing); one observer per node keeps only its last options
  new MutationObserver(() => refitAll()).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  const again = () => { refitAll(); setTimeout(refitAll, 350); };   // iOS reports the final size a moment after rotating
  addEventListener('resize', again); addEventListener('orientationchange', again);
  if (window.visualViewport) visualViewport.addEventListener('resize', again);
  if (document.fonts) { document.fonts.ready.then(refitAll); document.fonts.addEventListener && document.fonts.addEventListener('loadingdone', refitAll); }
  refitAll();
}
