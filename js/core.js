/* Core: state, sound, voice, helpers. Plain JS so it runs offline from any static host. */
window.UNITS = [];                 // filled by js/units/*.js  (UNIT(...) and LESSON(...))
const UNIT = u => { u.lessons = []; UNITS.push(u); return u; };
const LESSON = (unitId, L) => { const u = UNITS.find(u => u.id === unitId); L.unit = unitId; u.lessons.push(L); u.lessons.sort((a, b) => a.id - b.id); return L; };
const BOSS = (unitId, questions) => { UNITS.find(u => u.id === unitId).boss = questions; };
const findLesson = id => { for (const u of UNITS) { const L = u.lessons.find(l => l.id === id); if (L) return L; } return null; };

const KEY = ME ? ACC.progressKey(ME.id) : 'jelajah.guest';   // progress per child (see account.js)
const S = { mode: 'young', xp: 0, done: {}, sound: true, autoSay: true, wrong: {}, quizBest: {} };
try { Object.assign(S, JSON.parse(ACC.get(KEY) || '{}')); } catch (e) {}
function save() { ACC.set(KEY, JSON.stringify(S)); if (ME) CLOUD.queuePush(ME.id); }   // device first, then online

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const young = () => S.mode === 'young';
const shuffle = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const NUM = n => String(n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fem = s => s;                // Indonesian has no grammatical gender (kept so shared code stays the same)

function addXP(n) { S.xp += n; const x = $('#xp'); if (x) x.textContent = NUM(S.xp); save(); }

/* ---- sound effects, generated (no audio files) ---- */
let ac;
function beep(type) {
  if (!S.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const notes = type === 'ok' ? [660, 880] : type === 'win' ? [523, 659, 784, 1046] : type === 'tap' ? [520] : [220, 180];
    notes.forEach((f, i) => {
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i * .11;
      o.type = type === 'bad' ? 'sawtooth' : 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(type === 'tap' ? .06 : .15, t); g.gain.exponentialRampToValueAtTime(.001, t + .18);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .2);
    });
  } catch (e) {}
}

/* ---- Indonesian voice-over ----
   1) pre-recorded natural voices (audio/m = Ardi for boy companions, audio/f = Gadis for girl companions),
      listed in js/data/voice.js and made by tools/make_voice.py;
   2) the device's own Indonesian voice for anything not recorded (e.g. a sentence with the child's name). */
let idVoice = null, curAudio = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices().filter(v => /^(id|in)\b/i.test(v.lang));
  idVoice = vs.find(v => /natural|online/i.test(v.name)) || vs[0] || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
const voiceText = t => String(t).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const voiceKey = t => { let h = 2166136261; for (const c of voiceText(t)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, '0'); };
const hasRecording = t => !!(window.VOICE && window.VOICE[voiceKey(t)]);
window.__voiceLog = null;   // QA only: a Set that collects every sentence the app can speak
function deviceSay(text, force) {
  if (!('speechSynthesis' in window)) return;
  if (!idVoice) { if (force) toast('Perangkat ini tidak punya suara bahasa Indonesia'); return; }
  const u = new SpeechSynthesisUtterance(voiceText(text).replace(/\.{3,}|…+/g, ' ... '));
  u.voice = idVoice; u.lang = idVoice.lang; u.rate = young() ? .95 : 1;
  speechSynthesis.speak(u);
}
function say(text, force) {
  if (window.__voiceLog) window.__voiceLog.add(voiceText(text));
  if (!S.sound && !force) return;   // 🔇 also mutes the voice (🔈 buttons still work)
  hush();
  if (hasRecording(text)) {
    const a = curAudio = new Audio(`audio/${compGirl() ? 'f' : 'm'}/${voiceKey(text)}.mp3`);
    a.onended = a.onerror = () => { if (curAudio === a) curAudio = null; };
    a.play().catch(() => { if (curAudio === a) curAudio = null; deviceSay(text, force); });
    return;
  }
  deviceSay(text, force);
}
function speaking() {
  return !!curAudio || ('speechSynthesis' in window && (speechSynthesis.speaking || speechSynthesis.pending));
}
/* run fn once the voice has finished (and a short pause), so nothing cuts a sentence off; gives up after `max` ms */
function whenQuiet(fn, pause = 500, max = 25000) {
  const t0 = Date.now();
  const tick = () => {
    if (speaking() && Date.now() - t0 < max) return later(tick, 150);
    later(fn, pause);
  };
  tick();
}
function hush() {
  if (curAudio) { try { curAudio.pause(); } catch (e) {} curAudio = null; }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}
function sayBtn(text) { if (window.__voiceLog) window.__voiceLog.add(voiceText(text)); return `<button class="say" data-say="${esc(text)}" aria-label="Dengarkan">🔈</button>`; }
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) { e.stopPropagation(); say(b.dataset.say, true); } });

/* ---- feedback ---- */
function toast(msg, ms = 2400) {
  $$('.toast').forEach(t => t.remove());
  const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), ms);
}
function confetti() {
  const c = ['#e8473b', '#3aa7d8', '#3dbb7a', '#f4c26b', '#7b5cff'];
  for (let i = 0; i < 60; i++) {
    const d = document.createElement('div'); d.className = 'confetti';
    d.style.left = Math.random() * 100 + 'vw'; d.style.background = c[i % 5];
    d.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    document.body.appendChild(d); setTimeout(() => d.remove(), 4000);
  }
}
function guide(text) {
  return `<div class="guide"><div class="face">${BUDDY(52)}</div><div class="txt">${text}</div>${sayBtn(text)}</div>`;
}
/* explorer/expert text helper */
const yx = (a, b) => young() ? a : b;

/* ---- real map renderer: o.map = 'world' | 'asia' | 'nusantara' ----
   map views come from tools/buildmap.py (equirectangular, x scaled by cos of the middle latitude); places are [lon, lat] */
const proj = (M, ll) => [+((ll[0] - M.lon0) * M.k * M.s).toFixed(1), +((M.lat1 - ll[1]) * M.s).toFixed(1)];
function renderMap(o = {}) {
  const M = MAPS[o.map || 'world'];
  const lbl = o.labels || 'none'; // 'none' | 'some' (countries with a label) | 'all'
  let s = `<svg class="rmap ${o.map || 'world'}" viewBox="0 0 ${M.w} ${M.h}" role="img" aria-label="Peta">`;
  for (const [k, c] of Object.entries(M.c))
    s += `<path class="cty${k === 'Indonesia' ? ' home' : ''}" data-k="${k}" d="${c.d}" ${o.tapCountries ? `tabindex="0" role="button" aria-label="${c.n}"` : ''}><title>${lbl === 'none' ? '' : c.n}</title></path>`;
  for (const [k, c] of Object.entries(M.c)) if (c.small && o.tapCountries)
    s += `<circle class="hit" data-k="${k}" cx="${c.c[0]}" cy="${c.c[1]}" r="9"/>`;
  if (o.lines) s += `<line class="gline" x1="0" x2="${M.w}" y1="${M.eq}" y2="${M.eq}"/><text class="sea" x="${M.w - 6}" y="${M.eq - 5}" text-anchor="end">Khatulistiwa</text>`;
  if (o.route) for (const r of [].concat(o.route)) {
    const pts = r.pts.map(p => proj(M, p));
    s += `<polyline class="route ${r.cls || ''}" points="${pts.map(p => p.join(',')).join(' ')}"/>`;
  }
  if (lbl !== 'none') for (const [k, c] of Object.entries(M.c)) if (c.lbl || lbl === 'all') s += `<text class="lbl" x="${c.c[0]}" y="${c.c[1]}" text-anchor="middle">${c.n}</text>`;
  if (o.seas !== false) s += (M.seas || []).map(([t, x, y]) => `<text class="sea" x="${x}" y="${y}" text-anchor="middle">${t}</text>`).join('');
  if (o.points) {
    // points closer than MIN map units are pushed apart (display only) so each one can be tapped; a point with a neighbour
    // just above it gets its label below the dot
    const MIN = 26, P = o.points.map(p => proj(M, p.ll));
    for (let it = 0; it < 6; it++) for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      let dx = P[j][0] - P[i][0], dy = P[j][1] - P[i][1], d = Math.hypot(dx, dy);
      if (d >= MIN) continue;
      if (d < .01) { dx = 1; dy = 0; d = 1; }
      const k = (MIN - d) / 2 / d;
      P[i] = [P[i][0] - dx * k, P[i][1] - dy * k]; P[j] = [P[j][0] + dx * k, P[j][1] + dy * k];
    }
    o.points.forEach((p, i) => {
      const [x, y] = P[i].map(v => +v.toFixed(1));
      const below = P.some((q, j) => j !== i && Math.abs(q[0] - x) < 60 && q[1] < y && y - q[1] < 34);
      s += `<g class="pt" data-p="${p.p}" tabindex="0" role="button" aria-label="${o.pointNames ? p.name : 'titik'}"><circle class="pulse" cx="${x}" cy="${y}" r="7"/><circle class="dot" cx="${x}" cy="${y}" r="10"/>${o.pointNames ? `<text class="lbl" x="${x}" y="${below ? y + 25 : y - 15}" text-anchor="middle">${p.name}</text>` : ''}</g>`;
    });
  }
  return s + '</svg>';
}
const countryName = (k, map = 'world') => (MAPS[map].c[k] || MAPS.world.c[k] || { n: k }).n;
/* make SVG <g>/<path> reachable by Enter/Space too */
function keyActivate(root) {
  root.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[tabindex]') && !e.target.matches('button')) {
      e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  });
}
