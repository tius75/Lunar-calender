const CACHE_NAME = 'lunar-v1';
const assets = [
  '/',
  'index.html',
  'logo.png',
  'logo512.png'
];

// Install Service Worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      cache.addAll(assets);
    })
  );
});

// Fetching assets
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});