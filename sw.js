const CACHE_NAME = 'santo-terco-v3';
const PRECACHE_URLS = ["./index.html","./assets/index-CKfg3Tyk.js","./assets/index-BLULINJS.css","./.nojekyll","./apple-touch-icon.png","./icon.svg","./manifest.webmanifest","./pwa-192x192.png","./pwa-512x512.png","./pwa-maskable-512x512.png"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('santo-terco-') && key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (event.request.mode === 'navigate') {
      try {
        const response = await fetch(event.request);
        if (response.ok) await cache.put('./index.html', response.clone());
        return response;
      } catch { return (await cache.match('./index.html')) || Response.error(); }
    }
    const cached = await cache.match(event.request);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok) await cache.put(event.request, response.clone());
    return response;
  })());
});
