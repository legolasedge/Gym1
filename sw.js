const C = 'gym-v1';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html'])));
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const cl = res.clone();
      caches.open(C).then(c => c.put(e.request, cl));
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
