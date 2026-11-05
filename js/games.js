/* Reusable game types. Each one is fed by lesson data:  GAMES[type](el, mission, done(mistakes, score))  */
const GAMES = {};
let keyHandler = null;               // one active keyboard handler per screen
document.addEventListener('keydown', e => { if (keyHandler && !e.ctrlKey && !e.altKey && !e.metaKey) keyHandler(e); });
const onKeys = fn => { keyHandler = fn; };
let timers = [];
const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
const every = (fn, ms) => { const t = setInterval(fn, ms); timers.push(t); return t; };
let dragCleanup = null;              // an unfinished drag is cancelled when the screen changes
function clearGame() { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers = []; keyHandler = null; hush(); if (dragCleanup) dragCleanup(); }
const keyNum = e => +e.key;
const forMode = list => list.filter(x => !(young() ? x.expert : x.young));
const hash32 = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const stableOrder = (arr, seed) => [...arr].sort((a, b) => hash32(seed + a) - hash32(seed + b));   // same order every time for a question
const hdrH = () => { const t = $('.top'); return t && getComputedStyle(t).position === 'sticky' ? t.offsetHeight : 0; };
const scrollToEl = (node, block = 'start') => {
  if (!node) return;
  const r = node.getBoundingClientRect(), h = hdrH();
  const top = block === 'center' ? r.top + scrollY - (innerHeight - h - r.height) / 2 - h : r.top + scrollY - h - 8;
  const target = Math.max(0, Math.min(top, document.documentElement.scrollHeight - innerHeight)), start = scrollY;
  window.scrollTo({ top: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  setTimeout(() => { if (Math.abs(scrollY - start) < 2 && Math.abs(target - start) > 2) window.scrollTo(0, target); }, 500);
};
const mapBox = (html, map = 'world') => `<div class="mapbox ${map}">${html}</div>`;
/* questions with answer choices: read [explanation] → «Jawab pertanyaan berikut» → question → 1: … 2: … 3: …
   (answers keep a fixed order per question, so the spoken numbers match the screen and each sentence has a recording) */
const numbered = opts => opts.map((o, k) => (k + 1) + ': ' + o).join('. ');
const askSpeech = (explain, q, opts) => [explain, 'Jawab pertanyaan berikut:', q, numbered(opts)].filter(Boolean).join(' ');
const optRows = (opts, attr = o => `data-o="${esc(o)}"`, label = o => o) =>
  `<div class="qopts">${opts.map((o, k) => `<div class="optrow"><span class="num" aria-hidden="true">${k + 1}</span><button class="opt" ${attr(o)}>${label(o)}</button></div>`).join('')}</div>`;
const keysFor = box => onKeys(e => { const n = keyNum(e), b = $$('.opt', box)[n - 1]; if (b && !b.disabled) { e.preventDefault(); b.click(); } });
const mapInfoOpts = p => stableOrder([p.ans, ...p.w], p.q);
const mapInfoSpeech = p => askSpeech(p.name + '. ' + p.info, p.q, mapInfoOpts(p));
function centerMapBox(el, focus) {   // on phones the map is wider than the screen: start near the focus (0..1) or the middle
  const b = $('.mapbox', el); if (b && b.scrollWidth > b.clientWidth) b.scrollLeft = (b.scrollWidth - b.clientWidth) * (focus ?? .5);
}
const endDot = s => /[.!?]$/.test(s) ? s : s + '.';

/* ---------- flip cards ---------- */
GAMES.cards = (el, m, done) => {
  const C = forMode(m.cards);
  el.innerHTML = `${guide(m.guide || 'Klik setiap kartu untuk membaliknya dan temukan rahasianya!')}
    <div class="bar"><div class="grow"></div><div class="pill">🃏 <span id="cnt">0</span>/${C.length}</div></div>
    <div class="cards">${C.map((c, i) => `<button class="flip" data-i="${i}" aria-pressed="false"><div class="in"><div class="f"><div class="em">${c.em}</div>${c.f}</div><div class="b">${c.b}</div></div></button>`).join('')}</div>`;
  const seen = new Set();
  $$('.flip', el).forEach(b => b.onclick = () => {
    b.classList.toggle('on'); b.setAttribute('aria-pressed', b.classList.contains('on'));
    if (b.classList.contains('on')) say(endDot(C[b.dataset.i].f) + ' ' + C[b.dataset.i].b);
    if (!seen.has(b.dataset.i)) {
      seen.add(b.dataset.i); beep('ok'); $('#cnt').textContent = seen.size;
      if (seen.size === C.length) later(() => done(0), 900);
    }
  });
};

/* ---------- sort into zones: drag, tap-tap, or keyboard numbers ---------- */
GAMES.sort = (el, m, done) => {
  const items = forMode(m.items.map(a => Array.isArray(a) ? { t: a[0], z: a[1], expert: a[2] === 'x', young: a[2] === 'y' } : a));
  el.innerHTML = `${guide(m.guide || yx('Seret setiap kartu ke kelompok yang benar — atau klik kartu, lalu klik kelompoknya.', 'Seret kartu, atau klik kartu lalu klik kelompoknya. Di komputer: Tab untuk memilih, lalu angka kelompok.'))}
    <div class="tray" id="tray"></div><div id="zones"></div>`;
  const tray = $('#tray', el), zbox = $('#zones', el), zones = m.zones;
  zbox.className = 'zones ' + (m.layout || (zones.length === 3 ? 'cols3' : zones.length === 4 ? 'cols4' : 'cols2'));
  zbox.innerHTML = zones.map((z, i) => `<button class="zone" data-z="${z.id}"><h4><span class="key">${i + 1}</span>${z.label}</h4><div class="got"></div></button>`).join('');
  tray.innerHTML = shuffle(items).map(it => `<button class="chip" data-z="${it.z}">${it.t}</button>`).join('');
  let sel = null, left = items.length, mistakes = 0, lastDrop = 0;
  const select = c => { if (sel) sel.classList.remove('sel'); sel = c; if (c) { c.classList.add('sel'); beep('tap'); } };
  function place(chip, zoneEl) {
    if (!chip || !zoneEl) return;
    if (chip.dataset.z === zoneEl.dataset.z) {
      chip.classList.remove('sel'); chip.classList.add('ok'); chip.disabled = true;
      zoneEl.querySelector('.got').appendChild(chip); beep('ok'); addXP(1); sel = null;
      const f = m.facts && m.facts[chip.textContent]; if (f) { toast(f, 3800); }
      if (--left === 0) later(() => done(mistakes), 400);
      else { const nxt = tray.querySelector('.chip'); nxt && nxt.focus({ preventScroll: true }); }
    } else {
      mistakes++; select(null); chip.classList.add('bad'); beep('bad');
      later(() => chip.classList.remove('bad'), 400);
      const h = m.hints && m.hints[chip.textContent];
      if (young()) toast(h || 'Coba lagi! 💪');
    }
  }
  $$('.chip', tray).forEach(c => {
    c.onclick = () => { if (c._dragged) return; select(sel === c ? null : c); };
    c.onpointerdown = e => {
      if (c.disabled || e.button > 0 || e.pointerType === 'touch') return;   // touch: a swipe scrolls; tap-then-tap places
      const sx = e.clientX, sy = e.clientY; let ghost = null, hot = null;
      const mv = ev => {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8) return;
        if (!ghost) { ghost = c.cloneNode(true); ghost.classList.add('ghost'); document.body.appendChild(ghost); select(c); }
        ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
        const z = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.zone');
        if (hot !== z) { hot && hot.classList.remove('hot'); hot = z; hot && hot.classList.add('hot'); }
      };
      const stop = () => {
        removeEventListener('pointermove', mv); removeEventListener('pointerup', up); removeEventListener('pointercancel', cancel);
        if (ghost) ghost.remove(); hot && hot.classList.remove('hot'); dragCleanup = null;
      };
      const up = () => {
        const dragged = !!ghost, target = hot; stop();
        if (dragged) { c._dragged = true; lastDrop = Date.now(); setTimeout(() => c._dragged = false, 60); if (target) place(c, target); else select(null); }
      };
      const cancel = () => { const dragged = !!ghost; stop(); if (dragged) select(null); };
      dragCleanup = stop;
      addEventListener('pointermove', mv); addEventListener('pointerup', up); addEventListener('pointercancel', cancel);
    };
  });
  $$('.zone', zbox).forEach(z => z.onclick = () => {
    if (Date.now() - lastDrop < 500) return;     // the click that follows a drop is not a new tap
    if (sel) place(sel, z); else toast('Pilih kartu dulu, lalu klik kelompok yang benar');
  });
  onKeys(e => { const n = keyNum(e); if (sel && n >= 1 && n <= zones.length) { e.preventDefault(); place(sel, $$('.zone', zbox)[n - 1]); } });
};

/* ---------- match term ↔ meaning ---------- */
GAMES.match = (el, m, done) => {
  let pairs = shuffle(m.pairs);
  if (young()) pairs = pairs.slice(0, m.youngCount || 5);
  el.innerHTML = `${guide(m.guide || 'Klik sebuah istilah (kolom kiri), lalu klik artinya yang benar.')}
    <div class="match"><div class="col" id="terms">${shuffle(pairs).map(p => `<button data-k="${esc(p[0])}">${p[0]}</button>`).join('')}</div>
    <div class="col" id="defs">${shuffle(pairs).map(p => `<button class="def" data-k="${esc(p[0])}">${p[1]}</button>`).join('')}</div></div>`;
  let sel = null, left = pairs.length, mistakes = 0;
  $$('#terms button', el).forEach(b => b.onclick = () => { $$('#terms .sel', el).forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel'); beep('tap'); say(b.textContent); });
  $$('#defs button', el).forEach(b => b.onclick = () => {
    if (!sel) { toast('Pilih istilahnya dulu (kolom kiri)'); return; }
    if (b.dataset.k === sel.dataset.k) {
      [b, sel].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); x.disabled = true; });
      beep('ok'); addXP(1); sel = null; if (--left === 0) later(() => done(mistakes), 500);
    } else { mistakes++; b.classList.add('bad'); beep('bad'); later(() => b.classList.remove('bad'), 400); }
  });
};

/* ---------- find on the real map (countries {k} or places {p,name}) ---------- */
const findQ = (t, map) => t.q || `Di mana ${t.p ? t.name : countryName(t.k, map)}?`;
const thisIs = n => 'Ini ' + n + '.';
GAMES.mapFind = (el, m, done) => {
  const map = m.map || 'world';
  let targets = forMode(m.targets);
  targets = shuffle(targets).slice(0, young() ? (m.youngRounds || 6) : (m.rounds || targets.length));
  const isPlace = !!targets[0].p;
  el.innerHTML = `${guide(m.guide || 'Baca pertanyaannya, lalu klik tempat yang benar di peta.')}
    <div class="bar"><div class="grow"></div><div class="pill">🎯 <span id="sc">0</span>/${targets.length}</div></div>
    <div class="prompt sticky-q" id="pr"></div>
    ${mapBox(renderMap({ map, tapCountries: !isPlace, labels: isPlace ? (young() ? 'some' : 'none') : 'none', points: isPlace ? shuffle(forMode(m.targets)) : null }), map)}
    <p class="note" id="fact"></p>`;
  const svg = $('svg.rmap', el); keyActivate(svg); centerMapBox(el, m.focus);
  later(() => scrollToEl($('#pr', el)), 900);
  let i = 0, mistakes = 0, tries = 0, busy = false;
  const ask = () => {
    if (i >= targets.length) return later(() => done(mistakes), 500);
    const t = targets[i]; tries = 0; busy = false;
    const q = findQ(t, map);
    $('#pr', el).innerHTML = q + ' ' + sayBtn(q); if (S.autoSay && young()) say(q);
  };
  svg.addEventListener('click', e => {
    const hit = e.target.closest(isPlace ? '.pt' : '[data-k]'); if (!hit || busy || i >= targets.length) return;
    const t = targets[i], key = isPlace ? hit.dataset.p : hit.dataset.k, want = isPlace ? t.p : t.k;
    const shape = isPlace ? $(`.pt[data-p="${want}"]`, svg) : $(`path[data-k="${want}"]`, svg);
    if (key === want) {
      busy = true; beep('ok'); addXP(2); shape.classList.remove('hint'); shape.classList.add('ok'); $$(`.hit[data-k="${want}"]`, svg).forEach(h => h.classList.add('ok'));
      if (isPlace) { const pu = hit.querySelector('.pulse'); pu && pu.remove(); hit.setAttribute('aria-label', t.name); }
      $('#fact', el).textContent = '✅ ' + (t.fact || (isPlace ? t.name : countryName(want, map)));
      if (!isPlace) later(() => shape.classList.remove('ok'), 1400);
      $('#sc', el).textContent = ++i; later(ask, 900);
    } else {
      mistakes++; tries++; beep('bad');
      if (!isPlace) { const wrong = $(`path[data-k="${key}"]`, svg); if (wrong) { wrong.classList.add('no'); later(() => wrong.classList.remove('no'), 700); } const s = thisIs(countryName(key, map)); toast(s); say(s); }
      else { const n = m.targets.find(x => x.p === key); const s = thisIs(n ? n.name : 'tempat lain'); toast(s); say(s); }
      if (tries >= (young() ? 1 : 2)) { shape.classList.remove('hint'); void shape.getBoundingClientRect(); shape.classList.add('hint'); }
    }
  });
  ask();
};

/* ---------- explore map points, answer a question at each ---------- */
GAMES.mapInfo = (el, m, done) => {
  const map = m.map || 'world';
  const P = forMode(m.points), solved = new Set(); let mistakes = 0;
  el.innerHTML = `${guide(m.guide || 'Klik setiap titik di peta, baca rahasianya, lalu jawab pertanyaannya!')}
    <div class="bar"><div class="grow"></div><div class="pill">📍 <span id="sc">0</span>/${P.length}</div></div>
    ${mapBox(renderMap({ map, labels: m.labels || 'some', points: P, pointNames: m.pointNames, lines: m.mapLines, route: m.route }), map)}
    <div class="panel" id="card"><b>👆 Pilih sebuah titik di peta</b></div>`;
  const svg = $('svg.rmap', el); keyActivate(svg); centerMapBox(el, m.focus);
  const open = p => {
    const card = $('#card', el);
    const done1 = solved.has(p.p), speech = done1 ? p.name + '. ' + p.info : mapInfoSpeech(p);
    card.innerHTML = `<div class="bar"><h3 class="grow">${p.em || '📍'} ${p.name}</h3>${sayBtn(speech)}</div><p>${p.info}</p>
      ${done1 ? `<p>✅ <b>${p.ans}</b></p>` : `<p class="note">Jawab pertanyaan berikut:</p><b>${p.q}</b>${optRows(mapInfoOpts(p))}`}
      ${p.more && !young() ? `<p class="note">💡 ${p.more}</p>` : ''}`;
    if (S.autoSay && young()) say(speech);
    keysFor(card);
    $$('.opt', card).forEach(b => b.onclick = () => {
      if (b.dataset.o === p.ans) {
        b.classList.add('ok'); beep('ok'); addXP(2); solved.add(p.p); $('#sc', el).textContent = solved.size;
        const g = $(`.pt[data-p="${p.p}"]`, svg); g.classList.add('ok'); const pu = g.querySelector('.pulse'); pu && pu.remove();
        $$('.opt', card).forEach(x => x.disabled = true);
        if (solved.size === P.length) later(() => done(mistakes), 700);
        else later(() => scrollToEl($('.mapbox', el)), 1300);
      } else { mistakes++; b.classList.add('no'); beep('bad'); b.disabled = true; }
    });
    later(() => scrollToEl(card, 'center'), 60);
  };
  svg.addEventListener('click', e => { const g = e.target.closest('.pt'); if (g) open(P.find(x => x.p === g.dataset.p)); });
};

/* ---------- choose all correct options ---------- */
const pickOpts = m => [...forMode(m.options)].sort((a, b) => hash32(m.prompt + a.t) - hash32(m.prompt + b.t));
const pickSpeech = m => { const o = pickOpts(m), need = o.filter(x => x.ok).length;
  return [endDot(m.prompt), `Pilih ${need} jawaban yang benar, lalu klik Periksa.`, numbered(o.map(x => x.t))].join(' '); };
GAMES.pick = (el, m, done) => {
  const opts = pickOpts(m), need = opts.filter(o => o.ok).length;
  el.innerHTML = `${guide(m.guide || 'Pilih semua jawaban yang benar!')}
    <div class="scene" id="scene">${m.scene || ''}</div>
    <div class="prompt">${m.prompt} ${sayBtn(pickSpeech(m))}</div>
    <p class="note" style="text-align:center">Pilih ${need} jawaban yang benar, lalu klik "Periksa"</p>
    <div class="picks">${opts.map((o, i) => `<button class="pick" data-i="${i}" aria-pressed="false"><span class="box"></span><span class="pnum">${i + 1}</span><span class="pt-t">${o.t}</span></button>`).join('')}</div>
    <p style="text-align:center"><button class="btn go" id="chk">Periksa ✔</button></p>`;
  if (S.autoSay && young()) say(pickSpeech(m));
  onKeys(e => { const n = e.key === '0' ? 10 : keyNum(e), b = $$('.pick', el)[n - 1]; if (b) { e.preventDefault(); b.click(); } if (e.key === 'Enter' && document.activeElement === document.body) $('#chk', el).click(); });
  let mistakes = 0;
  $$('.pick', el).forEach(b => b.onclick = () => { if (b.classList.contains('ok')) return; b.classList.toggle('on'); b.setAttribute('aria-pressed', b.classList.contains('on')); beep('tap'); });
  $('#chk', el).onclick = () => {
    let good = 0, bad = 0;
    $$('.pick', el).forEach(b => {
      const o = opts[b.dataset.i], on = b.classList.contains('on');
      b.classList.remove('no', 'miss');
      if (on && o.ok) { b.classList.add('ok'); good++; }
      else if (on && !o.ok) { b.classList.add('no'); bad++; b.classList.remove('on'); }
      else if (!on && o.ok && young() && mistakes > 0) b.classList.add('miss');
    });
    if (bad) { mistakes += bad; beep('bad'); toast(yx('Ada pilihan yang salah — coba lagi!', `${bad} pilihan salah`)); return; }
    if (!good) { toast('Pilih jawaban dulu, lalu klik Periksa'); return; }
    if (good < need) { mistakes++; beep('bad'); toast(`Benar! Tapi masih kurang ${need - good}`); return; }
    $('#chk', el).disabled = true; $$('.pick', el).forEach(b => b.disabled = true);
    beep('ok'); addXP(need); if (m.win) $('#scene', el).innerHTML = m.win;
    later(() => done(mistakes), 900);
  };
};

/* ---------- put steps in the right order: tap the steps in order (or number keys) ---------- */
const orderSpeech = m => [endDot(m.prompt), 'Klik langkah-langkahnya sesuai urutan yang benar.'].join(' ');
GAMES.order = (el, m, done) => {
  const steps = m.steps;                           // [{t, why?}] in the correct order
  const shown = stableOrder(steps.map((s, i) => i), m.prompt + 'o');
  el.innerHTML = `${guide(m.guide || 'Klik langkah-langkahnya satu per satu sesuai urutan yang benar.')}
    <div class="prompt">${m.prompt} ${sayBtn(orderSpeech(m))}</div>
    <ol class="orderlist" id="ol"></ol>
    <div class="picks" id="pool">${shown.map((i, k) => `<button class="pick ostep" data-i="${i}"><span class="pnum">${k + 1}</span><span class="pt-t">${steps[i].t}</span></button>`).join('')}</div>
    <p class="note" id="why"></p>`;
  if (S.autoSay && young()) say(orderSpeech(m));
  let next = 0, mistakes = 0;
  const tap = b => {
    if (!b || b.disabled) return;
    if (+b.dataset.i === next) {
      beep('ok'); addXP(1); b.disabled = true; b.classList.add('ok');
      const li = document.createElement('li'); li.innerHTML = `<b>${steps[next].t}</b>${steps[next].why && !young() ? `<div class="note">${steps[next].why}</div>` : ''}`;
      $('#ol', el).appendChild(li); b.remove();
      if (steps[next].why) $('#why', el).textContent = '💡 ' + steps[next].why;
      if (++next === steps.length) later(() => done(mistakes), 700);
    } else { mistakes++; beep('bad'); b.classList.add('no'); later(() => b.classList.remove('no'), 500); if (young()) toast('Belum — langkah ini bukan yang berikutnya. Coba lagi!'); }
  };
  $$('.ostep', el).forEach(b => b.onclick = () => tap(b));
  onKeys(e => { const n = keyNum(e); const b = $$('.ostep', el).find(x => x.querySelector('.pnum').textContent === String(n)); if (b) { e.preventDefault(); tap(b); } });
};

/* ---------- read: pages of text, one at a time ---------- */
const readSpeech = p => endDot(p.h) + ' ' + voiceText(p.t.replace(/<\/(li|p|h\d)>|<br\s*\/?>/g, '. '));
GAMES.read = (el, m, done) => {
  const P = forMode(m.pages); let i = 0;
  const show = () => {
    const p = P[i];
    el.innerHTML = `${i === 0 ? guide(m.guide || 'Baca halaman ini baik-baik, lalu klik "Lanjut".') : ''}
      <div class="bar"><div class="grow"></div><div class="pill">📄 ${i + 1}/${P.length}</div></div>
      <article class="panel readpage"><div class="bar"><h3 class="grow">${p.h}</h3>${sayBtn(readSpeech(p))}</div>
      ${p.img ? `<img class="bookimg" src="${p.img}" alt="${esc(p.h)}">` : ''}<div class="rtxt">${p.t}</div></article>
      <div class="bar" style="justify-content:space-between;margin-top:12px">
        <button class="btn alt" id="prev" ${i === 0 ? 'disabled' : ''}>← Kembali</button>
        <button class="btn go" id="next">${i === P.length - 1 ? 'Selesai ✔' : 'Lanjut →'}</button></div>`;
    hush(); if (S.autoSay) say(readSpeech(p));   // every page is read aloud as soon as it opens (both modes); the previous page stops first
    $('#prev', el).onclick = () => { if (i > 0) { i--; show(); scrollToEl(el); } };
    $('#next', el).onclick = () => { beep('tap'); if (i < P.length - 1) { i++; show(); scrollToEl(el); } else { $('#next', el).disabled = true; addXP(P.length); done(0); } };
    onKeys(e => { if (e.key === 'ArrowRight') $('#next', el).click(); if (e.key === 'ArrowLeft') $('#prev', el).click(); });
  };
  show();
};

/* ---------- quiz (timed in expert mode) ---------- */
const quizSpeech = q => askSpeech('', q.q, stableOrder([q.a, ...q.w], q.q));
GAMES.quiz = (el, m, done) => {
  let Q = shuffle(forMode(m.questions));
  if (m.limit) Q = Q.slice(0, young() ? m.limit[0] : m.limit[1]);
  const T = young() ? 0 : (m.time || 25); let i = 0, score = 0;
  function show() {
    if (i >= Q.length) {
      const pct = score / Q.length, key = m.qid;
      S.quizBest[key] = Math.max(S.quizBest[key] || 0, Math.round(pct * 100)); save();
      if (pct >= .6) return done(Q.length - score, `${score} dari ${Q.length}`);
      el.innerHTML = `<div class="panel" style="text-align:center"><div class="big">💪</div><h2>${score} dari ${Q.length}</h2><p>Kamu perlu 60% untuk menang — ulangi kartu-kartunya dan coba lagi!</p><button class="btn" id="again">Coba lagi</button></div>`;
      $('#again', el).onclick = () => GAMES.quiz(el, m, done); return;
    }
    const q = Q[i], opts = stableOrder([q.a, ...q.w], q.q); let left = T, locked = false, tick;
    el.innerHTML = `<div class="bar"><div class="grow"></div><div class="pill">${i + 1}/${Q.length}</div><div class="pill">✅ ${score}</div></div>
      <div class="panel">${T ? '<div class="timer"><i id="tb" style="width:100%"></i></div>' : ''}
      ${q.img ? `<img class="bookimg" src="${q.img}" alt="Gambar untuk soal">` : ''}
      <div class="bar"><div class="q grow">${q.q}</div>${sayBtn(quizSpeech(q))}</div>
      ${optRows(opts)}
      <p class="note" id="why">${young() ? 'Santai saja, tidak ada batas waktu 😊' : '⏱️ ' + T + ' detik — tekan 1, 2, 3 atau 4 untuk menjawab cepat'}</p></div>`;
    if (S.autoSay && young()) say(quizSpeech(q));
    const btns = $$('.opt', el);
    const pick = b => {
      if (locked) return; locked = true; clearInterval(tick);
      const ok = b && b.dataset.o === q.a;
      if (ok) { b.classList.add('ok'); score++; beep('ok'); addXP(2); }
      else {
        b && b.classList.add('no'); beep('bad'); btns.find(x => x.dataset.o === q.a).classList.add('ok');
        S.wrong[q.q] = (S.wrong[q.q] || 0) + 1; save();
      }
      btns.forEach(x => x.disabled = true);
      if (q.why || !ok) $('#why', el).innerHTML = (ok ? '💡 ' : '✅ Jawaban: <b>' + q.a + '</b>. ') + (q.why || '');
      later(() => { i++; show(); }, ok && !q.why ? 800 : 2600);
    };
    btns.forEach(b => b.onclick = () => pick(b));
    onKeys(e => { const n = keyNum(e); if (n >= 1 && n <= btns.length) pick(btns[n - 1]); });
    if (T) tick = every(() => {
      left -= .2; const tb = $('#tb', el);
      if (tb) { tb.style.width = Math.max(0, left / T * 100) + '%'; if (left < T / 3) tb.style.background = 'var(--red)'; }
      if (left <= 0) { toast('⏰ Waktu habis!'); pick(null); }
    }, 200);
  }
  show();
};
