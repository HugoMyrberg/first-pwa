// service-worker.js

// Namn på cachen
const CACHE_NAME = 'v1';

// Filer som ska cachas
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/logo.png'
];

// Installationshändelse – spara filerna i cache
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installeras...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cachar tillgångar');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Aktiveringshändelse – ta bort gamla cachar om versionen har ändrats
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Aktiveras');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Tar bort gammal cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch-händelse – hantera nätverksförfrågningar
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Returnera cachen om det finns något där, annars hämta från nätet
      return response || fetch(event.request);
    })
  );
});
