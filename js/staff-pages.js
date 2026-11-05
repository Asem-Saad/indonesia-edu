/* Screens for adults: parent gate + account panel + parent page (#parents), teacher (#teacher), admin (#admin). */

/* summary of a child's saved progress per Bab (used by parent, teacher and admin views) */
function summarize(state) {
  const st = state || {}, done = st.done || {}, best = st.quizBest || {};
  const units = UNITS.map(U => {
    const ms = U.lessons.flatMap(L => L.missions.map(m => done[`${L.id}.${m.id}`] || 0));
    return { id: U.id, em: U.em, title: U.title, n: ms.length, done: ms.filter(Boolean).length, stars: ms.reduce((a, b) => a + b, 0),
             boss: done['boss' + U.id] || 0, bossBest: best['boss' + U.id] };
  });
  const total = units.reduce((a, u) => a + u.n, 0), finished = units.reduce((a, u) => a + u.done, 0);
  return { units, total, finished, xp: st.xp || 0, wrong: st.wrong || {} };
}
const pct = v => v == null ? '—' : v + '%';
const when = iso => { if (!iso) return '—'; const d = new Date(iso); return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }); };

/* ---------- parent gate: the account password again, so children can't open the parent area ---------- */
function parentGate(next) {
  if (CLOUD.parentUnlocked()) return next();
  app.innerHTML = `<div class="bar">${backBtn(ME ? '#home' : '#login')}<h2 class="grow" style="margin:0 8px">👪 Halaman orang tua</h2></div>
    <form class="panel form narrow" id="gf" novalidate>
      <p>Tulis kata sandi akun orang tua (<b>${esc(CLOUD.user ? CLOUD.user.email : '')}</b>) untuk melanjutkan.</p>
      ${field('f-pass', 'Kata sandi', 'type="password" autocomplete="current-password"')}
      <p class="err" id="e-form" role="alert"></p>
      <button class="btn go" type="submit">Buka →</button></form>`;
  $('#f-pass').focus();
  $('#gf').onsubmit = async e => {
    e.preventDefault();
    const btn = $('#gf button[type=submit]'); busy(btn, true);
    try { await CLOUD.checkPassword($('#f-pass').value); next(); }
    catch (err) { busy(btn, false); $('#e-form').textContent = CLOUD.errText(err); beep('bad'); }
  };
}

/* ---------- parent account panel: all children, classes, sign out ---------- */
async function accountPanel(box) {
  if (navigator.onLine && !box.dataset.fresh) { box.dataset.fresh = '1'; try { await CLOUD.refreshProfile(); } catch (e) {} }
  const kids = ACC.list().filter(c => !ACC.isLocalOnly(c)), prof = CLOUD.profile || {};
  box.innerHTML = `<div class="panel"><div class="bar"><h3 class="grow">👨‍👩‍👧 Akun: ${esc(prof.full_name || '')}</h3>
      <span class="note">${esc(CLOUD.user ? CLOUD.user.email : '')}</span></div>
      <div id="kidsbox"><p class="note">⏳ Memuat anak-anak…</p></div>
      <div class="bar" style="margin-top:10px"><button class="btn" onclick="go('#register')">➕ Tambah anak</button>
        ${CLOUD.role === 'admin' ? `<button class="btn alt" onclick="go('#admin')">🛠️ Panel admin</button>` : ''}
        <button class="btn alt" id="signout">🚪 Keluar dari akun</button></div>
      <p class="note">Setelah keluar, perangkat ini perlu masuk lagi dengan email dan kata sandi.</p></div>`;
  $('#signout').onclick = () => leave('account');
  let prog = {}; try { prog = navigator.onLine ? await CLOUD.childrenProgress() : {}; } catch (e) {}
  const rows = await Promise.all(kids.map(async k => {
    let classes = []; try { classes = navigator.onLine ? await CLOUD.childClasses(k.id) : []; } catch (e) {}
    const localState = (() => { try { return JSON.parse(ACC.get(ACC.progressKey(k.id)) || 'null'); } catch (e) { return null; } })();
    const sm = summarize(CLOUD.merge(localState, prog[k.id] && prog[k.id].state));
    return `<div class="kidrow" data-id="${k.id}">
      <div class="kidhead">${avatar(k.compAv, 40)}<div class="grow"><b>${esc(k.name)}</b><div class="note">${esc(k.grade)} • kode rahasia: ${esc(k.pin)} • teman: ${esc(k.compName || '')}</div></div>
        <div class="pill">⭐ ${sm.xp}</div><div class="pill">${sm.finished}/${sm.total} misi</div></div>
      <div class="classes">${classes.length ? classes.map(c => `<span class="badge">🏫 ${esc(c.name)} <button class="linkbtn" data-leave="${c.id}" aria-label="Keluar dari kelas">✕</button></span>`).join('') : '<span class="note">Belum bergabung ke kelas</span>'}</div>
      <form class="bar joinf" novalidate><input class="code" maxlength="8" placeholder="Kode kelas" aria-label="Kode kelas dari guru">
        <button class="btn alt" type="submit">🏫 Gabung kelas</button>
        <button class="btn alt" type="button" data-play>▶ Main sebagai anak ini</button>
        <button class="btn alt" type="button" data-del>🗑️ Hapus</button></form>
    </div>`;
  }));
  const kb = $('#kidsbox', box); if (!kb) return;
  kb.innerHTML = rows.length ? rows.join('') : '<p class="note">Belum ada anak.</p>';
  $$('.kidrow', kb).forEach(r => {
    const id = r.dataset.id;
    $('.joinf', r).onsubmit = async e => {
      e.preventDefault(); const code = $('.code', r).value.trim();
      if (!code) return toast('Tulis kode kelas yang diberikan guru');
      try { const name = await CLOUD.joinClass(code, id); if (!name) toast('Tidak ada kelas dengan kode ini — periksa lagi'); else { toast('Berhasil bergabung ke «' + name + '» ✔'); accountPanel(box); } }
      catch (err) { toast(CLOUD.errText(err)); }
    };
    $$('[data-leave]', r).forEach(b => b.onclick = async () => { try { await CLOUD.leaveClass(b.dataset.leave, id); accountPanel(box); } catch (err) { toast(CLOUD.errText(err)); } });
    $('[data-play]', r).onclick = () => { ACC.login(id); restart('#home'); };
    const del = $('[data-del]', r);
    del.onclick = async () => {
      if (!del.dataset.sure) { del.dataset.sure = '1'; del.textContent = '⚠️ Klik sekali lagi untuk menghapus permanen'; del.style.background = 'var(--red)'; del.style.color = '#fff'; return; }
      try { await CLOUD.removeChild(id); toast('Anak dan semua datanya sudah dihapus'); restart('#parents'); } catch (err) { toast(CLOUD.errText(err)); }
    };
  });
}

/* ---------- parent page: the account + details of the child playing now ---------- */
function parentPage() {
  if (!ME) { app.innerHTML = `<div class="bar">${backBtn('#login')}<h2 class="grow" style="margin:0 8px">👪 Halaman orang tua</h2></div><div id="acct"></div>`; return accountPanel($('#acct')); }
  const missed = Object.entries(S.wrong).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const row = L => `<tr><td>${L.em} ${L.tag || L.id + '.'} ${L.title}</td><td>${lessonDone(L)}/${L.missions.length}</td><td>${lessonStars(L)}/${L.missions.length * 3}</td><td>${pct(S.quizBest['l' + L.id])}</td></tr>`;
  app.innerHTML = `<div class="bar">${backBtn('#home', 'Beranda')}<h2 class="grow" style="margin:0 8px">👪 Halaman orang tua</h2></div>
    <div id="acct"></div>
    <h3>📊 Detail anak yang sedang bermain</h3>
    <div class="panel profile"><div class="face">${BUDDY(64)}</div><div class="grow">
      <h3>${esc(ME.name)}</h3>
      <dl class="facts"><dt>Umur</dt><dd>${esc(ME.age)} tahun</dd><dt>Jenis kelamin</dt><dd>${ME.gender === 'boy' ? 'Laki-laki' : 'Perempuan'}</dd>
        <dt>Sekolah</dt><dd>${esc(ME.school || '')}</dd><dt>Kelas</dt><dd>${esc(ME.grade)}</dd>
        <dt>Teman belajar</dt><dd>${esc(compName())}</dd><dt>Kode rahasia</dt><dd>${esc(ME.pin || '')}</dd></dl>
      <div class="bar"><button class="btn alt" onclick="go('#edit')">✏️ Ubah data</button>
        <button class="btn alt" id="switch">🔄 Ganti anak</button></div>
      <p class="note">Kemajuan disimpan di perangkat ini dan disinkronkan dengan akun online Anda.</p></div></div>
    <div class="panel tablewrap"><h3>Kemajuan</h3><table class="stats"><tr><th>Pelajaran</th><th>Misi</th><th>Bintang</th><th>Kuis terbaik</th></tr>
      ${UNITS.map(U => `<tr><th colspan="4" style="text-align:left">${U.em} Bab ${U.id}: ${U.title}</th></tr>` + U.lessons.map(row).join('') +
        `<tr><td>🐉 Uji Kompetensi Bab ${U.id}</td><td colspan="2">${S.done['boss' + U.id] ? starsOf(S.done['boss' + U.id]) : '—'}</td><td>${pct(S.quizBest['boss' + U.id])}</td></tr>`).join('')}
      </table><p>Total poin: ⭐ ${S.xp}</p></div>
    <div class="panel"><h3>Soal yang perlu diulang</h3>
      ${missed.length ? `<table class="stats"><tr><th>Soal</th><th>Salah</th></tr>${missed.map(([q, n]) => `<tr><td>${esc(q)}</td><td>${n}×</td></tr>`).join('')}</table>` : '<p class="note">Belum ada kesalahan tercatat 👍</p>'}</div>
    <div class="panel"><h3>Pengaturan</h3>
      <p><label><input type="checkbox" id="auto" ${S.autoSay ? 'checked' : ''}> Bacakan otomatis: halaman bacaan (semua mode) dan soal (mode Penjelajah)</label></p>
      <p class="note">Suara: ${window.VOICE && Object.keys(VOICE).length ? '✅ suara alami terekam (' + Object.keys(VOICE).length + ' kalimat)' : (idVoice ? '✅ suara perangkat (' + esc(idVoice.name) + ')' : '❌ tidak ada suara bahasa Indonesia')}</p>
      <button class="btn alt" id="reset">🗑️ Hapus kemajuan anak ini</button></div>`;
  $('#auto').onchange = e => { S.autoSay = e.target.checked; save(); };
  $('#switch').onclick = () => leave('child');
  accountPanel($('#acct'));
  $('#reset').onclick = () => {
    const b = $('#reset');
    if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = '⚠️ Klik sekali lagi — semua kemajuan akan dihapus'; b.style.background = 'var(--red)'; b.style.color = '#fff'; return; }
    Object.assign(S, { xp: 0, done: {}, wrong: {}, quizBest: {} }); save(); CLOUD.pushProgress(ME.id); toast('Kemajuan dihapus'); go('#home');
  };
}

/* ---------- teacher ---------- */
function teacherPending() {
  app.innerHTML = `<div class="panel narrow" style="text-align:center"><div class="big">⏳</div>
    <h2>Akun guru menunggu persetujuan</h2>
    <p>Permintaan Anda akan segera diperiksa. Setelah disetujui admin, Anda bisa membuat kelas dan memantau hasil murid.</p>
    <div class="bar" style="justify-content:center"><button class="btn go" id="recheck">🔄 Periksa sekarang</button>
      <button class="btn alt" id="signout">🚪 Keluar</button></div></div>`;
  $('#recheck').onclick = async () => { await CLOUD.refreshProfile(); route(); if (!(CLOUD.profile || {}).approved) toast('Belum disetujui'); };
  $('#signout').onclick = () => leave('account');
}
async function teacherPage() {
  const prof = CLOUD.profile || {};
  if (!prof.approved && prof.role !== 'admin') return teacherPending();
  app.innerHTML = `<div class="bar"><h2 class="grow" style="margin:0">👩‍🏫 Halo, ${esc((prof.full_name || '').split(' ')[0])}</h2>
      ${prof.role === 'admin' ? `<button class="btn alt" onclick="go('#admin')">🛠️ Admin</button>` : ''}
      <button class="btn alt" id="signout">🚪 Keluar</button></div>
    <div class="panel"><h3>➕ Kelas baru</h3>
      <form class="bar" id="cf" novalidate><input id="f-cname" class="grow" maxlength="60" placeholder="contoh: Kelas 9B" aria-label="Nama kelas">
        <button class="btn go" type="submit">Buat</button></form>
      <p class="note">Setiap kelas mendapat kode. Berikan kode itu kepada orang tua agar mereka menambahkan anaknya dari «Halaman orang tua».</p></div>
    <div id="classes"><p class="note">⏳ Memuat…</p></div>`;
  $('#signout').onclick = () => leave('account');
  $('#cf').onsubmit = async e => {
    e.preventDefault(); const name = $('#f-cname').value.trim(); if (!name) return toast('Tulis nama kelas');
    try { await CLOUD.createClass(name); toast('Kelas dibuat ✔'); teacherPage(); } catch (err) { toast(CLOUD.errText(err)); }
  };
  let classes = [];
  try { classes = await CLOUD.myClasses(); } catch (err) { $('#classes').innerHTML = `<p class="err">${esc(CLOUD.errText(err))}</p>`; return; }
  if (!classes.length) { $('#classes').innerHTML = '<p class="note">Belum ada kelas — buat kelas pertama Anda.</p>'; return; }
  $('#classes').innerHTML = classes.map(k => `<div class="panel" data-k="${k.id}"><div class="bar"><h3 class="grow">🏫 ${esc(k.name)}</h3>
      <span class="codebox">Kode: <b>${esc(k.join_code)}</b></span><button class="btn alt" data-copy="${esc(k.join_code)}">📋 Salin</button></div>
      <div class="report"><p class="note">⏳ Memuat hasil…</p></div>
      <div class="bar"><button class="btn alt" data-refresh>🔄 Perbarui</button><div class="grow"></div><button class="btn alt" data-delk>🗑️ Hapus kelas</button></div></div>`).join('');
  $$('[data-copy]').forEach(b => b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(b.dataset.copy).then(() => toast('Kode disalin ✔'), () => toast(b.dataset.copy)); });
  for (const k of classes) {
    const box = $(`[data-k="${k.id}"]`);
    $('[data-refresh]', box).onclick = () => loadReport(k, box);
    const d = $('[data-delk]', box);
    d.onclick = async () => {
      if (!d.dataset.sure) { d.dataset.sure = '1'; d.textContent = '⚠️ Klik sekali lagi untuk menghapus kelas'; d.style.background = 'var(--red)'; d.style.color = '#fff'; return; }
      try { await CLOUD.deleteClass(k.id); teacherPage(); } catch (err) { toast(CLOUD.errText(err)); }
    };
    loadReport(k, box);
  }
}
async function loadReport(k, box) {
  const rep = $('.report', box);
  let kids = [];
  try { kids = await CLOUD.classReport(k.id); } catch (err) { rep.innerHTML = `<p class="err">${esc(CLOUD.errText(err))}</p>`; return; }
  if (!kids.length) { rep.innerHTML = `<p class="note">Belum ada murid yang bergabung. Berikan kode <b>${esc(k.join_code)}</b> kepada orang tua.</p>`; return; }
  const sums = kids.map(c => Object.assign({ c }, summarize(c.state)));
  const missed = {};
  sums.forEach(s => Object.entries(s.wrong).forEach(([q, n]) => missed[q] = (missed[q] || 0) + n));
  const top = Object.entries(missed).sort((a, b) => b[1] - a[1]).slice(0, 8);
  rep.innerHTML = `<div class="tablewrap"><table class="stats">
      <tr><th>Murid</th>${UNITS.map(U => `<th title="${esc(U.title)}">${U.em} Bab ${U.id}</th>`).join('')}<th>⭐</th><th>Terakhir aktif</th><th></th></tr>
      ${sums.sort((a, b) => b.xp - a.xp).map(s => `<tr><td><b>${esc(s.c.name)}</b><div class="note">${esc(s.c.grade || '')}</div></td>
        ${s.units.map(u => `<td>${u.done}/${u.n}<div class="note">🐉 ${u.boss ? '⭐'.repeat(u.boss) : '—'} ${pct(u.bossBest)}</div></td>`).join('')}
        <td>${s.xp}</td><td>${when(s.c.updated)}</td>
        <td><button class="linkbtn" data-rm="${s.c.id}" aria-label="Keluarkan dari kelas">Keluarkan</button></td></tr>`).join('')}
    </table></div>
    <h4>❗ Soal yang paling sering salah di kelas ini</h4>
    ${top.length ? `<ol class="missed">${top.map(([q, n]) => `<li>${esc(q)} <span class="badge">${n}</span></li>`).join('')}</ol>` : '<p class="note">Belum ada kesalahan tercatat.</p>'}`;
  $$('[data-rm]', rep).forEach(b => b.onclick = async () => {
    if (!b.dataset.sure) { b.dataset.sure = '1'; b.textContent = 'Yakin?'; return; }
    try { await CLOUD.removeFromClass(k.id, b.dataset.rm); loadReport(k, box); } catch (err) { toast(CLOUD.errText(err)); }
  });
}

/* ---------- admin ---------- */
async function adminPage() {
  if (CLOUD.role !== 'admin') return go('#home');
  app.innerHTML = `<div class="bar">${backBtn(ME ? '#home' : '#login')}<h2 class="grow" style="margin:0 8px">🛠️ Panel admin</h2>
      <button class="btn alt" onclick="go('#teacher')">👩‍🏫 Kelas saya</button></div>
    <div class="panel" id="counts"><p class="note">⏳</p></div>
    <div class="panel"><h3>👩‍🏫 Akun guru</h3><div id="tlist"><p class="note">⏳ Memuat…</p></div></div>`;
  try {
    const c = await CLOUD.adminCounts();
    $('#counts').innerHTML = `<div class="bar"><span class="pill">👪 Orang tua: ${c.parents}</span><span class="pill">🧒 Anak: ${c.children}</span>
      <span class="pill">👩‍🏫 Guru: ${c.teachers}</span><span class="pill">🏫 Kelas: ${c.classes}</span></div>`;
  } catch (err) { $('#counts').innerHTML = `<p class="err">${esc(CLOUD.errText(err))}</p>`; }
  let list = [];
  try { list = await CLOUD.teachers(); } catch (err) { $('#tlist').innerHTML = `<p class="err">${esc(CLOUD.errText(err))}</p>`; return; }
  $('#tlist').innerHTML = list.length ? `<div class="tablewrap"><table class="stats"><tr><th>Nama</th><th>Sekolah</th><th>Email</th><th>Daftar</th><th>Status</th><th></th></tr>
    ${list.map(t => `<tr><td>${esc(t.full_name)}</td><td>${esc(t.school)}</td><td>${esc(t.email)}</td><td>${when(t.created_at)}</td>
      <td>${t.approved ? '✅ Disetujui' : '⏳ Menunggu'}</td>
      <td><button class="btn ${t.approved ? 'alt' : 'go'}" data-t="${t.id}" data-ok="${!t.approved}">${t.approved ? 'Batalkan' : 'Setujui'}</button></td></tr>`).join('')}</table></div>`
    : '<p class="note">Belum ada akun guru.</p>';
  $$('[data-t]').forEach(b => b.onclick = async () => { try { await CLOUD.approveTeacher(b.dataset.t, b.dataset.ok === 'true'); adminPage(); } catch (err) { toast(CLOUD.errText(err)); } });
}
