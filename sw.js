/* Offline support: network first (always fresh when online), cache as fallback (works offline). */
const VERSION = 'jelajah-v4';
const FILES = ['./', 'index.html', 'css/style.css', 'icon.svg', 'manifest.webmanifest', 'fonts/fonts.css', 'fonts/baloo-latin.woff2',
  'js/data/map.js', 'js/data/voice.js', 'js/vendor/supabase.js', 'js/account.js', 'js/cloud.js', 'js/core.js', 'js/games.js', 'js/units/u1/unit.js', 'js/units/u1/l1.js', 'js/units/u1/l2.js', 'js/units/u1/l3.js', 'js/units/u1/l4.js', 'js/units/u1/l5.js', 'js/units/u1/boss.js', 'js/units/u2/unit.js', 'js/units/u2/l6.js', 'js/units/u2/l7.js', 'js/units/u2/l8.js', 'js/units/u2/boss.js', 'js/units/u3/unit.js', 'js/units/u3/l9.js', 'js/units/u3/l10.js', 'js/units/u3/glos.js', 'js/units/u3/boss.js', 'js/units/gallery.js', 'js/auth-pages.js', 'js/staff-pages.js', 'js/app.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('/__') || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r && r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(e.request, cp)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(h => h || caches.match('index.html'))));
});
