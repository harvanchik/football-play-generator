const CACHE_NAME = 'penalty-generator-v3';
const urlsToCache = [
  '/football-play-generator/',
  '/football-play-generator/index.html',
  '/football-play-generator/assets/styles/styles-83b368a524.css',
  '/football-play-generator/assets/js/football-4264beefe2.js',
  '/football-play-generator/assets/img/field.webp',
  '/football-play-generator/assets/img/icon/favicon-16x16.png',
  '/football-play-generator/assets/img/icon/favicon-32x32.png',
  '/football-play-generator/assets/img/icon/favicon.ico',
  '/football-play-generator/assets/img/icon/apple-touch-icon.png',
  '/football-play-generator/assets/img/icon/android-chrome-192x192.png',
  '/football-play-generator/assets/img/icon/android-chrome-512x512.png',
  '/football-play-generator/manifest.json',
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })));
      })
      .catch(err => {
        console.log('Cache install failed:', err);
      }),
  );
  self.skipWaiting();
});

// Fetch from cache first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Clone the response
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }),
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});
