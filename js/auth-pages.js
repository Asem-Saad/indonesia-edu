/* Account screens: #welcome, #signin, #signup (parent), #teacher-signup, #forgot, #newpass,
   #login (which child is playing), #register (add a child), #edit (edit the playing child). */
const busy = (btn, on, text) => { if (!btn) return; btn.disabled = on; if (on) { btn.dataset.t = btn.textContent; btn.textContent = text || '⏳ Tunggu…'; } else if (btn.dataset.t) btn.textContent = btn.dataset.t; };
const field = (id, label, attrs = '', help = '') =>
  `<div class="field"><label for="${id}">${label}</label><input id="${id}" ${attrs} aria-describedby="e-${id.slice(2)}">${help ? `<span class="note">${help}</span>` : ''}<span class="err" id="e-${id.slice(2)}"></span></div>`;
function showErrors(errs, keys) {
  keys.forEach(k => { const e = $('#e-' + k); if (e) e.textContent = errs[k] || ''; const f = $('#f-' + k); f && f.setAttribute('aria-invalid', !!errs[k]); });
  const first = keys.find(k => errs[k]);
  if (first) { beep('bad'); const f = $('#f-' + first); if (f) { f.focus(); f.scrollIntoView({ behavior: 'smooth', block: 'center' }); } return true; }
  return false;
}
const clearOnInput = form => $$('input, select', form).forEach(f => f.addEventListener('input', () => { const e = $('#e-' + f.id.slice(2)); if (e) e.textContent = ''; f.removeAttribute('aria-invalid'); }));
const offlineNote = () => navigator.onLine ? '' : '<p class="err">⚠️ Tidak ada koneksi internet — masuk dan membuat akun memerlukan internet.</p>';
const storageNote = () => ACC.storageOK() ? '' : '<p class="err">⚠️ Browser ini memblokir penyimpanan data situs, jadi Anda tidak bisa tetap masuk dan kemajuan tidak tersimpan. Izinkan cookie/data situs untuk halaman ini.</p>';

/* ---------- welcome (nobody signed in) ---------- */
function welcomePage() {
  app.innerHTML = `<div class="hero">
      <div class="hero-face">${avatar('b1', 120)}</div>
      <div><h1>Selamat datang di Jelajah IPS Kelas IX! 👋 <span class="flag" aria-hidden="true"></span></h1>
        <p class="sub">Aku Budi, teman sekolahmu. Orang tua masuk sekali di perangkat ini, lalu setiap anak memilih namanya dan mulai menjelajah: nenek moyang, jalur rempah, perdagangan, bencana, perubahan sosial, dan sejarah.</p>
        ${storageNote()}
        <div class="bar"><button class="btn go" onclick="go('#signin')">🔑 Masuk</button>
          <button class="btn" onclick="go('#signup')">📝 Akun baru untuk orang tua</button></div>
        <p class="note" style="margin-top:14px">👩‍🏫 Anda guru? <a href="#teacher-signup">Buat akun guru</a> untuk memantau hasil kelas Anda.</p></div></div>`;
}

/* ---------- sign in ---------- */
function signinPage() {
  app.innerHTML = `<div class="bar">${backBtn('#welcome')}<h2 class="grow" style="margin:0 8px">🔑 Masuk</h2></div>
    <form class="panel form narrow" id="sf" novalidate>${offlineNote()}
      <p class="note">Untuk orang tua atau guru. Anak-anak memilih namanya setelah itu.</p>
      ${field('f-email', 'Email', 'type="email" autocomplete="email" placeholder="nama@contoh.com"')}
      ${field('f-pass', 'Kata sandi', 'type="password" autocomplete="current-password"')}
      <p class="err" id="e-form" role="alert"></p>
      <div class="bar"><button class="btn go" type="submit">Masuk →</button><a href="#forgot">Lupa kata sandi?</a></div>
      <p class="note">Belum punya akun? <a href="#signup">Buat akun baru</a></p></form>`;
  clearOnInput($('#sf'));
  $('#sf').onsubmit = async e => {
    e.preventDefault();
    const email = $('#f-email').value.trim(), pass = $('#f-pass').value, errs = {};
    if (!isEmail(email)) errs.email = 'Tulis email dengan benar';
    if (!pass) errs.pass = 'Tulis kata sandi';
    if (showErrors(errs, ['email', 'pass'])) return;
    const btn = $('#sf button[type=submit]'); busy(btn, true, '⏳ Sedang masuk…');
    try { await CLOUD.signIn(email, pass); restart(CLOUD.role === 'teacher' ? '#teacher' : '#login'); }
    catch (err) { busy(btn, false); $('#e-form').textContent = CLOUD.errText(err); beep('bad'); }
  };
}

/* ---------- create an account (parent or teacher) ---------- */
function signupPage(role) {
  const teacher = role === 'teacher';
  app.innerHTML = `<div class="bar">${backBtn('#welcome')}<h2 class="grow" style="margin:0 8px">${teacher ? '👩‍🏫 Akun guru baru' : '📝 Akun baru untuk orang tua'}</h2></div>
    <form class="panel form narrow" id="uf" novalidate>${offlineNote()}
      <p class="note">${teacher ? 'Setelah akun dibuat, admin akan memeriksa dan menyetujuinya. Setelah itu Anda bisa membuat kelas dan memantau hasil murid.' : 'Satu akun orang tua cukup untuk semua anak. Setelah akun dibuat, tambahkan anak-anak Anda.'}</p>
      ${field('f-name', teacher ? 'Nama lengkap' : 'Nama lengkap orang tua', 'autocomplete="name" placeholder="contoh: Ahmad Setiawan"')}
      ${teacher ? field('f-school', 'Nama sekolah', 'placeholder="contoh: SMP Negeri 1 Bandung"')
                : field('f-phone', 'Nomor HP', 'type="tel" inputmode="tel" autocomplete="tel" placeholder="08xxxxxxxxxx atau +kode negara"', 'Nomor Indonesia (08…) atau nomor luar negeri dengan kode negara, misalnya +20…')}
      ${field('f-email', 'Email', 'type="email" autocomplete="email" placeholder="nama@contoh.com"')}
      <div class="row2">
        ${field('f-pass', 'Kata sandi', 'type="password" autocomplete="new-password"', 'minimal 8 karakter')}
        ${field('f-pass2', 'Ulangi kata sandi', 'type="password" autocomplete="new-password"')}
      </div>
      <label class="consent"><input type="checkbox" id="f-consent">
        <span>${teacher ? 'Saya menyatakan bahwa saya seorang guru, dan saya setuju data saya (nama, sekolah, email) disimpan untuk digunakan di Jelajah IPS.'
                        : 'Saya setuju data saya dan data anak-anak saya (nama, umur, kelas, sekolah, kemajuan belajar) disimpan untuk digunakan di Jelajah IPS dan untuk dipantau guru bila anak bergabung ke sebuah kelas. Saya dapat mengubah atau menghapusnya kapan saja.'}</span></label>
      <span class="err" id="e-consent"></span>
      <p class="err" id="e-form" role="alert"></p>
      <button class="btn go" type="submit">Buat akun →</button>
      <p class="note">Sudah punya akun? <a href="#signin">Masuk</a></p></form>`;
  clearOnInput($('#uf'));
  $('#uf').onsubmit = async e => {
    e.preventDefault();
    const v = id => ($(id) ? $(id).value.trim() : ''), errs = {};
    const name = v('#f-name').replace(/\s+/g, ' '), email = v('#f-email'), pass = $('#f-pass').value, phone = normPhone(v('#f-phone')), school = v('#f-school').replace(/\s+/g, ' ');
    if (!name) errs.name = 'Tulis nama lengkap';
    else if (!isFullName(name)) errs.name = 'Tulis nama dengan huruf saja';
    if (teacher) { if (!school) errs.school = 'Tulis nama sekolah'; else if (!isSchool(school)) errs.school = 'Tulis nama sekolah dengan benar'; }
    else if (!isPhone(phone)) errs.phone = 'Tulis nomor HP Indonesia (08…, 10–13 angka) atau nomor luar negeri dengan kode negara (misalnya +20…)';
    if (!isEmail(email)) errs.email = 'Email tidak benar — contoh: nama@contoh.com';
    if (pass.length < 8) errs.pass = 'Kata sandi minimal 8 karakter';
    else if ($('#f-pass2').value !== pass) errs.pass2 = 'Kedua kata sandi tidak sama';
    if (!$('#f-consent').checked) errs.consent = 'Anda harus setuju untuk membuat akun';
    if (showErrors(errs, ['name', 'school', 'phone', 'email', 'pass', 'pass2', 'consent'])) return;
    const btn = $('#uf button[type=submit]'); busy(btn, true, '⏳ Membuat akun…');
    try {
      const r = await CLOUD.signUp({ email, password: pass, role: teacher ? 'teacher' : 'parent', fullName: name, phone, school });
      if (r.needsConfirm) return confirmSent(email);
      restart(teacher ? '#teacher' : '#register');
    } catch (err) { busy(btn, false); $('#e-form').textContent = CLOUD.errText(err); beep('bad'); }
  };
}
function confirmSent(email) {
  app.innerHTML = `<div class="panel narrow" style="text-align:center"><div class="big">📧</div>
    <h2>Akun sudah dibuat — tinggal satu langkah</h2>
    <p>Kami mengirim pesan ke <b>${esc(email)}</b>. Buka pesan itu dan klik tautan konfirmasi, lalu kembali ke sini dan klik «Masuk».</p>
    <p class="note">Pesan tidak datang? Periksa folder Spam.</p>
    <button class="btn go" onclick="go('#signin')">🔑 Masuk</button></div>`;
}

/* ---------- password reset ---------- */
function forgotPage() {
  app.innerHTML = `<div class="bar">${backBtn('#signin')}<h2 class="grow" style="margin:0 8px">🔒 Lupa kata sandi</h2></div>
    <form class="panel form narrow" id="ff" novalidate>
      ${field('f-email', 'Email akun', 'type="email" autocomplete="email"')}
      <p class="err" id="e-form" role="alert"></p>
      <button class="btn go" type="submit">Kirim tautan untuk mengganti kata sandi</button></form>`;
  $('#ff').onsubmit = async e => {
    e.preventDefault();
    const email = $('#f-email').value.trim();
    if (showErrors(isEmail(email) ? {} : { email: 'Tulis email dengan benar' }, ['email'])) return;
    try { await CLOUD.resetPassword(email); app.innerHTML = `<div class="panel narrow" style="text-align:center"><div class="big">📧</div><h2>Kami mengirim tautan ke email Anda</h2><p>Buka pesan itu dan klik tautannya untuk memilih kata sandi baru.</p></div>`; }
    catch (err) { $('#e-form').textContent = CLOUD.errText(err); }
  };
}
function newPassPage() {
  app.innerHTML = `<form class="panel form narrow" id="nf" novalidate><h2>🔒 Kata sandi baru</h2>
      ${field('f-pass', 'Kata sandi baru', 'type="password" autocomplete="new-password"', 'minimal 8 karakter')}
      <p class="err" id="e-form" role="alert"></p><button class="btn go" type="submit">Simpan</button></form>`;
  $('#nf').onsubmit = async e => {
    e.preventDefault();
    const pass = $('#f-pass').value;
    if (showErrors(pass.length >= 8 ? {} : { pass: 'Kata sandi minimal 8 karakter' }, ['pass'])) return;
    try { await CLOUD.setNewPassword(pass); toast('Kata sandi sudah diganti ✔'); restart('#login'); }
    catch (err) { $('#e-form').textContent = CLOUD.errText(err); }
  };
}

/* ---------- which child is playing? ---------- */
function loginPage() {
  const kids = ACC.list(), online = kids.filter(c => !ACC.isLocalOnly(c)), local = kids.filter(c => ACC.isLocalOnly(c));
  const head = `<div class="bar">${ME ? backBtn('#home', 'Beranda') : ''}<h2 class="grow" style="margin:0 8px">👀 Siapa yang bermain sekarang?</h2>
    <button class="btn alt" onclick="go('#parents')">👪 Orang tua</button></div>`;
  const localNote = local.length ? `<div class="panel"><b>📱 Ada ${local.length} pemain yang dulu dibuat di perangkat ini saja.</b>
      <p class="note">${local.map(c => esc(c.name)).join(', ')} — tambahkan ke akun Anda agar kemajuannya tersimpan online (kode rahasianya menjadi 0000; ganti lewat «Ubah data»), atau hapus jika hanya untuk percobaan.</p>
      <div class="bar"><button class="btn" id="up-local">⬆️ Tambahkan ke akun saya</button><button class="btn alt" id="drop-local">🗑️ Hapus dari perangkat ini</button></div></div>` : '';
  const wireLocal = () => {
    const up = $('#up-local');
    if (up) up.onclick = async () => { busy(up, true); try { const n = await CLOUD.uploadLocalChildren(); toast(`${n} pemain ditambahkan ke akun Anda ✔`); restart('#login'); } catch (err) { busy(up, false); toast(CLOUD.errText(err)); } };
    const drop = $('#drop-local');
    if (drop) drop.onclick = () => {
      if (!drop.dataset.sure) { drop.dataset.sure = '1'; drop.textContent = '⚠️ Klik sekali lagi untuk menghapus'; return; }
      local.forEach(c => ACC.remove(c.id)); toast('Sudah dihapus'); restart('#login');
    };
  };
  if (!online.length) {
    app.innerHTML = `${head}${localNote}<div class="panel" style="text-align:center"><div class="big">🧒</div><h2>Belum ada anak di akun ini</h2>
      <p class="sub">Tambahkan anak pertama Anda untuk mulai menjelajah.</p><button class="btn go" onclick="go('#register')">➕ Tambah anak</button></div>`;
    wireLocal(); return;
  }
  app.innerHTML = `${head}<p class="sub">Pilih namamu, lalu tulis kode rahasiamu</p>${localNote}
    <div class="kids">${online.map(k => `<button class="kid" data-id="${k.id}">${avatar(k.compAv, 64)}<b>${esc(childFirst(k))}</b><span class="note">${esc(k.grade)}</span></button>`).join('')}
      <button class="kid add" onclick="go('#register')"><span class="plus">＋</span><b>Tambah anak</b></button></div>
    <div id="pin"></div>`;
  $$('.kid[data-id]').forEach(b => b.onclick = () => askPin(kids.find(k => k.id === b.dataset.id)));
  wireLocal();
}
function askPin(k) {
  $$('.kid').forEach(x => x.classList.toggle('sel', x.dataset.id === k.id));
  const box = $('#pin');
  box.innerHTML = `<form class="panel form" id="pinf" novalidate>
      <h3>Halo, ${esc(childFirst(k))}! 🔒</h3>
      <div class="field"><label for="pin-in">Tulis kode rahasiamu (4 angka)</label>
        <input id="pin-in" class="pin" inputmode="numeric" autocomplete="off" maxlength="4" placeholder="••••" aria-describedby="pin-err">
        <span class="err" id="pin-err" role="alert"></span></div>
      <div class="bar"><button class="btn go" type="submit">Masuk →</button><span class="note">Lupa? Tanyakan orang tuamu 😊</span></div></form>`;
  const inp = $('#pin-in'); inp.focus();
  $('#pinf').onsubmit = async e => {
    e.preventDefault();
    if (inp.value.trim() === String(k.pin || '')) {
      ACC.login(k.id);
      if (navigator.onLine) { try { await CLOUD.pullProgress(k.id); } catch (err) {} }
      restart('#home');
    } else { beep('bad'); $('#pin-err').textContent = 'Kodenya salah — coba lagi'; inp.select(); }
  };
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---------- add / edit a child (done by the parent) ---------- */
const fullChildName = first => (first.trim().replace(/\s+/g, ' ') + (parentName() ? ' ' + parentName() : '')).slice(0, 80);
function registerPage(edit) {
  if (edit && !ME) return go('#login');
  const p = edit ? ME : { gender: '' };
  const pAv = edit ? avId(ME.compAv) : '', pName = edit ? (ME.compName || '') : '';
  const ages = [10, 11, 12, 13, 14, 15, 16, 17];
  app.innerHTML = `<div class="bar">${backBtn(edit ? '#parents' : '#login')}<h2 class="grow" style="margin:0 8px">${edit ? '✏️ Ubah data anak' : '➕ Tambah anak'}</h2></div>
    <form class="panel form" id="reg" novalidate>${offlineNote()}
      <p class="note">👪 Diisi oleh orang tua. Data disimpan di akun Anda dan hanya terlihat oleh Anda dan guru kelas yang diikuti anak.</p>
      <div class="field"><label for="f-name">Nama depan anak</label>
        <input id="f-name" autocomplete="off" placeholder="contoh: Rani" value="${esc(edit ? childFirst(p) : '')}" aria-describedby="e-name">
        <span class="note" id="fullname-note"></span><span class="err" id="e-name"></span></div>
      <div class="row2">
        <div class="field"><label for="f-age">Umur</label>
          <select id="f-age" aria-describedby="e-age"><option value="">Pilih umur</option>${ages.map(a => `<option value="${a}" ${p.age == a ? 'selected' : ''}>${a} tahun</option>`).join('')}</select><span class="err" id="e-age"></span></div>
        <div class="field"><label for="f-grade">Kelas</label>
          <select id="f-grade" aria-describedby="e-grade"><option value="">Pilih kelas</option>${GRADES.map(g => `<option ${p.grade === g ? 'selected' : ''}>${g}</option>`).join('')}</select><span class="err" id="e-grade"></span></div>
      </div>
      <fieldset class="field"><legend>Jenis kelamin</legend>
        <div class="choices">
          <label class="choice"><input type="radio" name="gender" id="f-boy" value="boy" ${p.gender === 'boy' ? 'checked' : ''}><span class="gico">👦</span><b>Laki-laki</b></label>
          <label class="choice"><input type="radio" name="gender" id="f-girl" value="girl" ${p.gender === 'girl' ? 'checked' : ''}><span class="gico">👧</span><b>Perempuan</b></label>
        </div><span class="err" id="e-gender"></span></fieldset>
      <fieldset class="field comp" id="comp" hidden><legend id="comp-legend"></legend>
        <p class="note" id="comp-note"></p>
        <div class="choices" id="comp-avs"></div>
        <div class="field"><span class="lbl">Pilih namanya</span>
          <div class="namechips" id="comp-names" role="radiogroup"></div></div>
        <div class="comp-preview" id="comp-preview" aria-live="polite"></div>
      </fieldset>
      <div class="field"><label for="f-school">Nama sekolah</label>
        <input id="f-school" placeholder="contoh: SMP Negeri 1 Bandung" value="${esc(p.school || '')}" aria-describedby="e-school"><span class="err" id="e-school"></span></div>
      <div class="field"><label for="f-pin">Kode rahasia anak (4 angka)</label>
        <input id="f-pin" class="pin" inputmode="numeric" maxlength="4" autocomplete="off" value="${esc(p.pin || '')}" aria-describedby="e-pin">
        <span class="note">Anak menulis kode ini untuk masuk dengan namanya di perangkat ini. Pilih angka yang mudah diingat.</span><span class="err" id="e-pin"></span></div>
      <p class="err" id="e-form" role="alert"></p>
      <button class="btn go" type="submit">${edit ? 'Simpan perubahan ✔' : 'Tambah anak →'}</button>
    </form>`;
  /* companion picker: boys pick a boy character, girls a girl character, each with an Indonesian name */
  let cAv = pAv, cName = pName;
  const drawComp = () => {
    const g = ($('input[name=gender]:checked') || {}).value;
    $('#comp').hidden = !g; if (!g) return;
    const girl = g === 'girl', ids = Object.keys(AVATARS).filter(id => isGirlAv(id) === girl), names = girl ? GIRL_NAMES : BOY_NAMES;
    if (!ids.includes(cAv)) cAv = ids[0];
    if (!names.includes(cName)) cName = names[0];
    $('#comp-legend').textContent = girl ? '👭 Pilih teman belajarmu' : '👬 Pilih teman belajarmu';
    $('#comp-note').textContent = girl ? 'Teman belajarmu akan menjelaskan dan membantumu di semua permainan, dengan suara perempuan.' : 'Teman belajarmu akan menjelaskan dan membantumu di semua permainan, dengan suara laki-laki.';
    $('#comp-avs').innerHTML = ids.map(id => `<label class="choice"><input type="radio" name="cav" value="${id}" ${id === cAv ? 'checked' : ''}>${avatar(id, 60)}</label>`).join('');
    $('#comp-names').innerHTML = names.map(n => `<button type="button" class="chip namechip ${n === cName ? 'sel' : ''}" role="radio" aria-checked="${n === cName}" data-n="${n}">${n}</button>`).join('');
    $('#comp-preview').innerHTML = `${avatar(cAv, 44)}<span>Teman belajarmu: <b>${cName}</b></span>`;
    $$('input[name=cav]').forEach(r => r.onchange = () => { cAv = r.value; beep('tap'); drawComp(); });
    $$('.namechip').forEach(b => b.onclick = () => { cName = b.dataset.n; beep('tap'); drawComp(); });
  };
  drawComp();
  $$('input[name=gender]').forEach(r => r.onchange = () => { $('#e-gender').textContent = ''; drawComp(); });
  clearOnInput($('#reg'));
  const showFull = () => { const f = $('#f-name').value.trim().replace(/\s+/g, ' '); $('#fullname-note').textContent = f ? 'Nama lengkap: ' + fullChildName(f) : (parentName() ? 'Nama akan dilengkapi otomatis dengan nama orang tua: ' + parentName() : ''); };
  $('#f-name').addEventListener('input', showFull); showFull();
  $('#reg').onsubmit = async e => {
    e.preventDefault();
    const v = id => $(id).value.trim(), errs = {};
    const name = v('#f-name').replace(/\s+/g, ' '), school = v('#f-school').replace(/\s+/g, ' '), pin = v('#f-pin');
    const gender = ($('input[name=gender]:checked') || {}).value;
    if (!name) errs.name = 'Tulis nama depan anak';
    else if (!isFirstName(name)) errs.name = 'Tulis nama depan saja (huruf, satu atau dua kata, misalnya «Dewi Ayu»)';
    if (!v('#f-age')) errs.age = 'Pilih umur';
    if (!v('#f-grade')) errs.grade = 'Pilih kelas';
    if (!gender) errs.gender = 'Pilih laki-laki atau perempuan';
    if (!school) errs.school = 'Tulis nama sekolah'; else if (!isSchool(school)) errs.school = 'Tulis nama sekolah dengan benar';
    if (!/^\d{4}$/.test(pin)) errs.pin = 'Tulis 4 angka';
    if (showErrors(errs, ['name', 'age', 'grade', 'gender', 'school', 'pin'])) return;
    const rec = { name: fullChildName(name), age: +v('#f-age'), grade: v('#f-grade'), gender, compAv: cAv, compName: cName, school, pin };
    const btn = $('#reg button[type=submit]'); busy(btn, true, '⏳ Menyimpan…');
    try {
      if (edit) { rec.id = ME.id; await CLOUD.updateChild(rec); restart('#parents'); return; }
      const kid = await CLOUD.addChild(rec);
      ACC.set(ACC.progressKey(kid.id), JSON.stringify({ mode: rec.age >= 14 ? 'old' : 'young' }));   // Penjelajah 12–13, Ahli 14–16
      ACC.login(kid.id); restart('#home');
    } catch (err) { busy(btn, false); $('#e-form').textContent = CLOUD.errText(err); beep('bad'); }
  };
}
