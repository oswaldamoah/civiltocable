const CACHE_NAME = 'mtn-cable-converter-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/mtnlogo.jpg'
];

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Activate worker immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files...');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache addAll failed:', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Take control immediately
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Cache successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          // Fallback to index.html for SPA routing when offline
          if (event.request.mode === 'navigate' || event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
      .catch(error => {
        console.error('Fetch failed:', error);
        // Return a fallback page if available
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});
