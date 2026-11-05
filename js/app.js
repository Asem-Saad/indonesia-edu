/* App shell: header, routing, home (Bab picker), Bab page, lesson page, mission screen, Bab boss.
   Signed out: #welcome #signin #signup #teacher-signup #forgot. Parent: #login (pick child) #register #edit #parents #home
   #u1 #l3 #l3-<mission> #boss1. Teacher: #teacher. Admin: #admin (plus everything a parent has). */
const app = $('#app');
const starsOf = n => '⭐'.repeat(n) + '☆'.repeat(3 - n);
const missionKey = (l, m) => `${l}.${m}`;
const lessonStars = L => L.missions.reduce((a, m) => a + (S.done[missionKey(L.id, m.id)] || 0), 0);
const lessonDone = L => L.missions.filter(m => S.done[missionKey(L.id, m.id)]).length;
const unitMissions = U => U.lessons.reduce((a, L) => a + L.missions.length, 0);
const unitDone = U => U.lessons.reduce((a, L) => a + lessonDone(L), 0);

function header() {
  const lf = $('#logo-face'); if (lf) lf.innerHTML = BUDDY(30);
  $('#xp').textContent = NUM(S.xp);
  $('#snd').textContent = S.sound ? '🔊' : '🔇';
  $('#m-young').setAttribute('aria-pressed', young()); $('#m-old').setAttribute('aria-pressed', !young());
  const who = $('#who'), staff = CLOUD.user && CLOUD.role === 'teacher';
  const playing = !!(CLOUD.user && ME);              // a child counts only inside a signed-in account
  who.hidden = !(playing || staff);
  if (playing) who.innerHTML = `👤 ${esc(firstName())}`; else if (staff) who.innerHTML = `👩‍🏫 ${esc(((CLOUD.profile || {}).full_name || '').split(' ')[0] || 'Guru')}`;
  $$('.top .mode, .top .pill:not(.who):not(.out), #snd').forEach(x => x.hidden = !playing);
  $('#out').hidden = !CLOUD.user;
  hdrVar();
}
/* header height (after its buttons are shown/hidden) → --hdr, so a sticky question never slides under it */
const hdrVar = () => { const top = $('.top'); document.documentElement.style.setProperty('--hdr', (getComputedStyle(top).position === 'sticky' ? top.offsetHeight : 0) + 'px'); };
addEventListener('resize', hdrVar);
$('#who').onclick = () => go(ME ? '#parents' : '#teacher');
/* logout menu: switch child (child leaves) or sign the account out — progress is saved online first */
async function leave(kind) {
  const menu = $('#outmenu'); menu.hidden = true; $('#out').setAttribute('aria-expanded', 'false');
  clearGame(); toast('⏳ Menyimpan kemajuan…', 4000);
  if (kind === 'child') {
    let ok = true;
    if (ME) { try { ok = navigator.onLine ? await CLOUD.pushProgress(ME.id) : false; } catch (e) { ok = false; } }
    toast(ok ? 'Kemajuan tersimpan ✔' : 'Kemajuan tersimpan di perangkat ini — akan disinkronkan saat ada internet', 2500);
    ACC.logout(); return setTimeout(() => restart('#login'), 600);
  }
  const unsaved = await CLOUD.signOut();
  toast(unsaved ? 'Tidak ada internet — kemajuan tetap tersimpan di perangkat ini dan disinkronkan saat masuk lagi' : 'Kemajuan tersimpan dan Anda sudah keluar ✔', 2500);
  setTimeout(() => restart('#welcome'), 700);
}
$('#out').onclick = e => {
  e.stopPropagation();
  const menu = $('#outmenu'), open = menu.hidden;
  menu.innerHTML = (ME ? `<button role="menuitem" data-k="child">🔄 Ganti anak <span class="note">(kemajuan disimpan)</span></button>` : '') +
    `<button role="menuitem" data-k="account">🚪 Keluar dari akun</button>`;
  menu.hidden = !open; $('#out').setAttribute('aria-expanded', String(open));
  $$('button', menu).forEach(b => b.onclick = () => leave(b.dataset.k));
};
document.addEventListener('click', e => { if (!e.target.closest('#outmenu, #out')) { $('#outmenu').hidden = true; $('#out').setAttribute('aria-expanded', 'false'); } });
$('#m-young').onclick = () => { S.mode = 'young'; save(); route(); };
$('#m-old').onclick = () => { S.mode = 'old'; save(); route(); };
$('#snd').onclick = () => { S.sound = !S.sound; if (!S.sound) hush(); save(); header(); };
$('#home').onclick = () => go('#home');
/* the child or account changed: reload so state, companion and voice belong to the new child */
function restart(h) {
  if (!ACC.storageOK()) { toast('Browser ini memblokir penyimpanan. Izinkan penyimpanan situs (cookie/data situs) agar bisa bermain.', 6000); return; }
  location.hash = h; location.reload();
}

const go = h => { if (location.hash === h) route(); else location.hash = h; };
addEventListener('hashchange', route);

function route() {
  clearGame(); header();
  const h = location.hash.slice(1);
  if (!CLOUD.user) {                                  // nobody signed in on this device
    if (h === 'signin') return signinPage();
    if (h === 'signup') return signupPage('parent');
    if (h === 'teacher-signup') return signupPage('teacher');
    if (h === 'forgot') return forgotPage();
    return welcomePage();
  }
  if (h === 'newpass') return newPassPage();
  const role = CLOUD.role;
  if (role === 'teacher') return teacherPage();       // teachers see their classes
  if (h === 'admin') return adminPage();
  if (h === 'teacher' && role === 'admin') return teacherPage();
  if (h === 'register') return parentGate(() => registerPage(false));
  if (h === 'parents') return parentGate(parentPage);
  if (!ME) return loginPage();                        // signed-in parent: which child is playing?
  if (h === 'edit') return parentGate(() => registerPage(true));
  if (h === 'login') return loginPage();
  let m;
  if ((m = h.match(/^u(\d+)$/))) return unitPage(+m[1]);
  if ((m = h.match(/^boss(\d+)$/))) return boss(+m[1]);
  if ((m = h.match(/^l(\d+)-([a-z0-9]+)$/))) return mission(+m[1], m[2]);
  if ((m = h.match(/^l(\d+)$/))) return lesson(+m[1]);
  home();
}
const backBtn = (h, label = 'Kembali') => `<button class="btn alt" onclick="go('${h}')">← ${label}</button>`;

/* ---------- home: pick a Bab ---------- */
function home() {
  const total = UNITS.reduce((a, U) => a + unitMissions(U), 0), done = UNITS.reduce((a, U) => a + unitDone(U), 0);
  app.innerHTML = `
    <h1>Halo, ${esc(firstName())}! 👋</h1>
    <p class="sub">IPS Kelas IX — kamu sudah menyelesaikan ${done} dari ${total} misi</p>
    ${guide(young() ? `Aku ${esc(compName())}, teman belajarmu! Pilih satu bab untuk mulai. Setiap misi memberi sampai 3 bintang.` : 'Mode Ahli: semua detail, soal lebih sulit, dan kuis berwaktu. Bisakah kamu mengumpulkan semua bintang?')}
    <div class="units">
      ${UNITS.map(U => {
        const d = unitDone(U), n = unitMissions(U);
        return `<button class="unit" onclick="go('#u${U.id}')">
          <span class="tag ${d === n ? 'live' : ''}">${d === n ? 'Selesai ✔' : d + '/' + n + ' misi'}</span>
          <div class="em">${U.em}</div><h3>Bab ${U.id}</h3><div>${U.title}</div>
          <div class="note">${U.lessons.length} pelajaran • ${S.done['boss' + U.id] ? '🐉 ' + starsOf(S.done['boss' + U.id]) : '🐉 Uji Kompetensi menunggu'}</div>
          <div class="prog"><i style="width:${n ? d / n * 100 : 0}%"></i></div></button>`;
      }).join('')}
    </div>
    <p class="note" style="margin-top:24px;text-align:center"><a href="#parents">👪 Halaman orang tua</a> • <a href="#login" onclick="leave('child');return false">🔄 Ganti anak</a></p>`;
}

/* ---------- a Bab: its lessons + boss ---------- */
function unitPage(uid) {
  const U = UNITS.find(u => u.id === uid); if (!U) return home();
  app.innerHTML = `<div class="bar">${backBtn('#home', 'Beranda')}<div class="grow"></div><div class="pill">✅ ${unitDone(U)}/${unitMissions(U)}</div></div>
    <h2>${U.em} Bab ${U.id}: ${U.title}</h2>
    ${guide(U.intro || 'Pilih sebuah pelajaran. Setelah semua pelajaran selesai, kalahkan monster Uji Kompetensi!')}
    <div class="journey">
      ${U.lessons.map((L, i) => {
        const d = lessonDone(L), n = L.missions.length;
        return `<button class="lesson" onclick="go('#l${L.id}')">
          <span class="tag ${d === n ? 'live' : ''}">${d === n ? 'Selesai ✔' : d + '/' + n + ' misi'}</span>
          <div class="em">${L.em}</div><h3>${L.tag || 'Pelajaran ' + L.id}</h3><div>${L.title}</div>
          <div class="note">⭐ ${lessonStars(L)} / ${n * 3}</div>
          <div class="prog"><i style="width:${d / n * 100}%"></i></div></button>`;
      }).join('')}
      ${U.boss ? `<button class="lesson boss" onclick="go('#boss${U.id}')"><span class="tag">Tantangan besar</span><div class="em">🐉</div><h3>Uji Kompetensi Bab ${U.id}</h3><div>Soal dari semua pelajaran bab ini</div><div>${S.done['boss' + U.id] ? starsOf(S.done['boss' + U.id]) : 'Sudah siap?'}</div></button>` : ''}
    </div>`;
}

/* ---------- lesson ---------- */
function lesson(id) {
  const L = findLesson(id); if (!L) return home();
  const next = L.missions.find(m => !S.done[missionKey(id, m.id)]);
  app.innerHTML = `<div class="bar">${backBtn('#u' + L.unit, 'Bab ' + L.unit)}<div class="grow"></div><div class="pill">⭐ ${lessonStars(L)}/${L.missions.length * 3}</div></div>
    <h2>${L.em} ${L.tag || 'Pelajaran ' + id}: ${L.title}</h2>
    ${guide(next ? `Misi berikutnya: <b>${next.em} ${next.t}</b>. Kamu juga boleh memilih misi mana saja!` : 'Semua misi pelajaran ini sudah selesai! 🎉 Coba mode Ahli atau Uji Kompetensi.')}
    <div class="missions">${L.missions.map((m, i) => {
      const st = S.done[missionKey(id, m.id)] || 0;
      return `<button class="mission ${st ? 'done' : ''}" onclick="go('#l${id}-${m.id}')" ${next === m ? 'style="outline:4px solid var(--purple)"' : ''}>
        <div class="em">${m.em}</div><h3>${i + 1}. ${m.t}</h3><div class="note">${m.d || ''}</div><div class="stars">${starsOf(st)}</div></button>`;
    }).join('')}</div>`;
}

/* ---------- mission ---------- */
function mission(lid, mid) {
  const L = findLesson(lid), m = L && L.missions.find(x => x.id === mid);
  if (!m) return lesson(lid);
  app.innerHTML = `<div class="bar">${backBtn('#l' + lid, 'Misi')}<h2 class="grow" style="margin:0 8px">${m.em} ${m.t}</h2></div><div id="game"></div>`;
  let ended = false;   // a game reports its end once, even after a double tap
  if (!GAMES[m.type]) { $('#game').innerHTML = `<p class="err">Jenis permainan tidak dikenal: ${esc(m.type)}</p>`; return; }
  GAMES[m.type]($('#game'), m, (mistakes, score) => { if (ended) return; ended = true; gameOver(missionKey(lid, mid), mistakes, score, L, m, m.type === 'read'); });
}
/* a game ended: save the stars at once (so leaving early never loses them), lock the game, then show the result
   once the voice has finished its sentence (a finished reading page is not read to the end — the child chose to go on) */
function gameOver(key, mistakes, score, L, m, stopVoice) {
  const st = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1, prev = S.done[key] || 0;
  S.done[key] = Math.max(prev, st); const xp = prev ? 5 : 10 * st; addXP(xp); save();
  onKeys(null); $$('#game button').forEach(b => b.disabled = true);
  if (stopVoice) hush();
  whenQuiet(() => finish(st, xp, score, L, m));
}
function finish(st, xp, score, L, m) {
  beep('win'); confetti();
  const idx = L ? L.missions.indexOf(m) : -1, nxt = L && L.missions[idx + 1];
  const spoken = st === 3 ? 'Hebat! Tanpa satu kesalahan pun!' : st === 2 ? 'Bagus sekali!' : 'Lumayan! Coba lagi untuk mendapat 3 bintang.';
  const shown = st === 2 ? `Bagus sekali, ${firstName()}!` : spoken;
  const p = document.createElement('div'); p.className = 'panel'; p.style.textAlign = 'center';
  p.innerHTML = `<div class="big">${st === 3 ? '🏆' : '🏅'}</div><h2>${esc(shown)}</h2>${score ? `<p>Skor: ${score}</p>` : ''}
    <div style="font-size:2rem">${starsOf(st)}</div><p>+${xp} ⭐</p>
    <div class="bar" style="justify-content:center">
      ${nxt ? `<button class="btn go" onclick="go('#l${L.id}-${nxt.id}')">Misi berikutnya: ${nxt.em} ${nxt.t} →</button>` : ''}
      <button class="btn alt" onclick="go('${L ? '#l' + L.id : location.hash.replace('#boss', '#u')}')">${L ? 'Semua misi' : 'Kembali ke bab'}</button>
      <button class="btn alt" onclick="route()">🔁 Ulangi</button></div>`;
  const g = $('#game'); g.innerHTML = ''; g.appendChild(p); say(spoken);
  p.scrollIntoView({ behavior: 'smooth' }); p.querySelector('button').focus({ preventScroll: true });
}

/* ---------- Bab boss: Uji Kompetensi + questions from every lesson quiz of the Bab ---------- */
function boss(uid) {
  const U = UNITS.find(u => u.id === uid); if (!U) return home();
  const own = U.boss || [];   // every Uji Kompetensi question of the book + extra mixed questions — all of them, every time
  app.innerHTML = `<div class="bar">${backBtn('#u' + uid, 'Bab ' + uid)}<h2 class="grow" style="margin:0 8px">🐉 Uji Kompetensi Bab ${uid}</h2></div>
    ${guide('Monster ini bertanya tentang seluruh bab! Jawab benar minimal 60% untuk mengalahkannya.')}<div id="game"></div>`;
  let ended = false;
  GAMES.quiz($('#game'), { qid: 'boss' + uid, questions: own, time: 40 },
    (mis, score) => { if (ended) return; ended = true; gameOver('boss' + uid, mis > 3 ? 3 : mis, score, null, null); });
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
/* local launcher: tell it this window is still open, so it can quit on its own after the page is closed */
if (/^(127\.0\.0\.1|localhost)$/.test(location.hostname)) {
  const ping = () => fetch('__alive', { cache: 'no-store' }).then(r => r.headers.get('X-Jelajah')).catch(() => null);
  ping().then(a => { if (a) setInterval(ping, 20000); });
}
CLOUD.boot().catch(() => {}).finally(route);   // finish an email-link sign-in first, then show the screen
