/* Device cache of the signed-in parent's children (filled from the online account by cloud.js).
   Children whose id is not a database id (e.g. "p…") were made on this device only, before online accounts existed.
   Each child: { id, name (full name = first name + parent's name), gender, age, grade, school, compAv, compName, pin }. */
const ACC = (() => {
  const mem = {};                                   // fallback when browser storage is blocked
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return mem[k] ?? null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } };
  const del = k => { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } };
  const list = () => { try { return JSON.parse(get('jelajah.profiles') || '[]'); } catch (e) { return []; } };
  const setList = l => set('jelajah.profiles', JSON.stringify(l));
  const currentId = () => get('jelajah.current');
  const current = () => list().find(p => p.id === currentId()) || null;
  return {
    get, set, del, list, setList, current, currentId,
    progressKey: id => 'jelajah.v1.' + id,
    storageOK() { try { localStorage.setItem('jelajah.t', '1'); localStorage.removeItem('jelajah.t'); return true; } catch (e) { return false; } },
    isLocalOnly: c => !/^[0-9a-f]{8}-[0-9a-f]{4}-/i.test(String(c && c.id)),
    remove(id) { setList(list().filter(x => x.id !== id)); del(this.progressKey(id)); if (currentId() === id) del('jelajah.current'); },
    login(id) { set('jelajah.current', id); },
    logout() { del('jelajah.current'); },
  };
})();
if (ACC.current() && ACC.isLocalOnly(ACC.current())) ACC.logout();   // old device-only child: offer to add it, never play as it
const ME = ACC.current();
const parentName = () => { try { return (JSON.parse(ACC.get('jelajah.profile') || '{}').full_name || '').trim(); } catch (e) { return ''; } };
/* a child's first name: their full name minus the parent's name (handles two-word first names like «Dewi Ayu») */
const childFirst = c => {
  const n = String((c && c.name) || '').trim().replace(/\s+/g, ' '), p = parentName().replace(/\s+/g, ' ');
  if (p && n.endsWith(' ' + p)) return n.slice(0, -p.length - 1).trim();
  return ACC.isLocalOnly(c) ? n : (n.split(' ')[0] || '');
};
const firstName = () => ME ? childFirst(ME) : '';

/* ---------- companion characters (picked when the child is added). Uniform: SMP white shirt + navy blue ---------- */
const AVATARS = {
  b1: { kind: 'boy', skin: '#e0ac7e', hair: '#1b1310', style: 'short', bag: '#e2463f' },
  b2: { kind: 'boy', skin: '#c98e5f', hair: '#1b1310', style: 'spiky', bag: '#2e9e62', glasses: true },
  b3: { kind: 'boy', skin: '#a8703f', hair: '#1b1310', style: 'curly', bag: '#f08c1a' },
  b4: { kind: 'boy', skin: '#e0ac7e', hair: '#3b2618', style: 'short', bag: '#7b5cff', cap: true },
  g1: { kind: 'hijab', skin: '#e0ac7e', scarf: '#f2f5fb', bag: '#e2463f' },
  g2: { kind: 'hijab', skin: '#c98e5f', scarf: '#ff9ec4', bag: '#7b5cff' },
  g3: { kind: 'girl', skin: '#e0ac7e', hair: '#1b1310', style: 'ponytail', bag: '#e2463f', bow: '#ff7aa8' },
  g4: { kind: 'girl', skin: '#a8703f', hair: '#1b1310', style: 'pigtails', bag: '#2e9e62', bow: '#ffd34d' },
};
const BOY_NAMES = ['Budi', 'Rizky', 'Dimas', 'Arif', 'Bayu', 'Fajar', 'Raka', 'Andi', 'Wayan', 'Yusuf'];
const GIRL_NAMES = ['Siti', 'Putri', 'Ayu', 'Dewi', 'Nadia', 'Rina', 'Intan', 'Sekar', 'Kadek', 'Aisyah'];
const avId = id => AVATARS[id] ? id : 'b1';
const isGirlAv = id => AVATARS[avId(id)].kind !== 'boy';
/* who guides this child: chosen when the child was added; Budi before anyone plays */
const SIGNED_IN = (() => { try { const a = JSON.parse(ACC.get('jelajah.auth') || 'null'); return !!(a && a.user); } catch (e) { return false; } })();
const COMP = (ME && SIGNED_IN) ? { av: avId(ME.compAv), name: ME.compName || (isGirlAv(ME.compAv) ? 'Siti' : 'Budi') } : { av: 'b1', name: 'Budi' };
const compGirl = () => isGirlAv(COMP.av);
const compName = () => COMP.name;

function avatar(id = 'b1', w = 56, extra = '') {
  const A = AVATARS[avId(id)], girl = A.kind !== 'boy', sk = A.skin, ink = '#2b2350';
  const legs = girl
    ? `<path d="M21,58 L43,58 L47,70 L17,70Z" fill="#24345f" stroke="${ink}" stroke-width="1.5"/><rect x="24" y="69" width="5" height="7" fill="${sk}"/><rect x="35" y="69" width="5" height="7" fill="${sk}"/>`
    : `<rect x="24" y="62" width="7" height="13" rx="2" fill="#24345f"/><rect x="33" y="62" width="7" height="13" rx="2" fill="#24345f"/>`;
  let back = '', hair = '', top = '';
  if (A.kind === 'hijab') back = `<path d="M14,24 Q14,4 32,4 Q50,4 50,24 L52,42 Q32,50 12,42Z" fill="${A.scarf}" stroke="${ink}" stroke-width="2"/>`;
  if (A.style === 'ponytail') back = `<path d="M44,14 Q56,16 54,34 Q52,26 45,24Z" fill="${A.hair}"/><circle cx="47" cy="12" r="4" fill="${A.bow}" stroke="${ink}" stroke-width="1.2"/>`;
  if (A.style === 'pigtails') back = `<circle cx="13" cy="25" r="6" fill="${A.hair}"/><circle cx="51" cy="25" r="6" fill="${A.hair}"/><circle cx="15" cy="18" r="3" fill="${A.bow}" stroke="${ink}" stroke-width="1"/><circle cx="49" cy="18" r="3" fill="${A.bow}" stroke="${ink}" stroke-width="1"/>`;
  const ears = A.kind === 'hijab' ? '' : `<circle cx="18" cy="23" r="3.5" fill="${sk}"/><circle cx="46" cy="23" r="3.5" fill="${sk}"/>`;
  if (A.kind === 'hijab') hair = `<path d="M18,22 Q18,9 32,9 Q46,9 46,22 Q46,12 32,12 Q18,12 18,22Z" fill="${A.scarf}" stroke="${ink}" stroke-width="1.5"/>`;
  else if (A.style === 'short') hair = `<path d="M17.5,21 Q17,6 32,6 Q47,6 46.5,21 Q41,12.5 33,14 Q30,10 26,13.5 Q21,13 17.5,21Z" fill="${A.hair}"/>`;
  else if (A.style === 'spiky') hair = `<path d="M17.5,21 L18,10 L23,13 L26,5 L30,11 L34,4 L37,11 L42,6 L44,13 L46.5,21 Q41,14 32,15 Q23,14 17.5,21Z" fill="${A.hair}"/>`;
  else if (A.style === 'curly') hair = [[20, 15, 5], [25, 10, 6], [32, 8.5, 6.5], [39, 10, 6], [44, 15, 5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${A.hair}"/>`).join('');
  else hair = `<path d="M17.5,23 Q16,6 32,6 Q48,6 46.5,23 Q44,13 36,12 Q30,15 22,13 Q19,16 17.5,23Z" fill="${A.hair}"/>`;
  if (A.cap) top = `<path d="M17,16 Q18,4 32,4 Q46,4 47,16Z" fill="${A.bag}" stroke="${ink}" stroke-width="1.5"/><rect x="38" y="13" width="16" height="4" rx="2" fill="${A.bag}" stroke="${ink}" stroke-width="1.2"/>`;
  const glasses = A.glasses ? `<circle cx="27" cy="23" r="4.6" fill="none" stroke="${ink}" stroke-width="1.6"/><circle cx="37" cy="23" r="4.6" fill="none" stroke="${ink}" stroke-width="1.6"/><path d="M31.6,23 L32.4,23" stroke="${ink}" stroke-width="1.6"/>` : '';
  const lashes = girl ? `<path d="M24.5,20.5 L25.5,21.8 M39.5,20.5 L38.5,21.8" stroke="${ink}" stroke-width="1.2"/>` : '';
  return `<svg class="marwan" ${extra} width="${w}" height="${w * 1.25}" viewBox="0 0 64 80" aria-hidden="true">
  ${back}
  <rect x="11" y="33" width="42" height="31" rx="9" fill="${A.bag}" stroke="${ink}" stroke-width="2"/>
  <rect x="15" y="52" width="34" height="9" rx="3" fill="#000" opacity=".15"/>
  ${legs}
  <ellipse cx="27" cy="76" rx="6" ry="3" fill="${ink}"/><ellipse cx="37" cy="76" rx="6" ry="3" fill="${ink}"/>
  <rect x="19" y="35" width="26" height="${girl ? 25 : 29}" rx="7" fill="#ffffff" stroke="${ink}" stroke-width="2"/>
  <path d="M27,35 L32,41 L37,35Z" fill="#fff" stroke="${ink}" stroke-width="1.2"/>
  <path d="M23,36 L23,56" stroke="${A.bag}" stroke-width="3.5" stroke-linecap="round"/><path d="M41,36 L41,56" stroke="${A.bag}" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="13" y="38" width="7" height="18" rx="3.5" fill="#ffffff" stroke="${ink}" stroke-width="1.5"/><circle cx="16.5" cy="58" r="3.5" fill="${sk}"/>
  <rect x="44" y="38" width="7" height="18" rx="3.5" fill="#ffffff" stroke="${ink}" stroke-width="1.5"/><circle cx="47.5" cy="58" r="3.5" fill="${sk}"/>
  ${ears}
  <circle cx="32" cy="${A.kind === 'hijab' ? 23 : 22}" r="${A.kind === 'hijab' ? 12.5 : 14}" fill="${sk}" stroke="${ink}" stroke-width="2"/>
  ${hair}${top}
  <circle cx="27" cy="23" r="2.1" fill="${ink}"/><circle cx="37" cy="23" r="2.1" fill="${ink}"/>${lashes}${glasses}
  <circle cx="24" cy="28" r="2.2" fill="#f29a9a" opacity=".6"/><circle cx="40" cy="28" r="2.2" fill="#f29a9a" opacity=".6"/>
  <path d="M27.5,29 Q32,33.5 36.5,29" fill="none" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
</svg>`;
}
const BUDDY = (w, extra) => avatar(COMP.av, w, extra);   // the guide = the companion the child picked

/* ---------- validation ---------- */
const NAME_RE = /^[A-Za-zÀ-ÿ' .-]+$/;
const isFirstName = s => NAME_RE.test(s) && s.trim().length >= 2 && s.trim().split(/\s+/).length <= 2;
const isFullName = s => NAME_RE.test(s) && s.trim().length >= 3;               // Indonesians may have a single name
const isSchool = s => /^[A-Za-zÀ-ÿ0-9' .,()/-]+$/.test(s) && /[A-Za-z]/.test(s) && s.trim().length >= 3;
const isEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
/* Indonesian mobile numbers: 08xx… (10–13 digits); +62 / 62 are turned into 0 */
function normPhone(s) {
  let d = String(s).replace(/[\s\-().]/g, '');
  if (d.startsWith('+62')) d = '0' + d.slice(3); else if (d.startsWith('62')) d = '0' + d.slice(2);
  return d;
}
/* Indonesian mobile (08…, 10–13 digits) or any international number with a country code (+20…, +60…; 8–15 digits) */
const isPhone = d => /^08\d{8,11}$/.test(d) || /^\+[1-9]\d{7,14}$/.test(d);
const GRADES = ['Kelas 7', 'Kelas 8', 'Kelas 9', 'Kelas 10', 'Kelas 11', 'Kelas 12', 'Lainnya'];
