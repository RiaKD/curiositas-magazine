// Simple service worker for the site
const CACHE_NAME = 'curiositas-v1';

// Install event - cache basic resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/css/styles.css',
          '/js/script.js'
        ]);
      })
  );
});

// Fetch event - handle navigation preload properly
self.addEventListener('fetch', (event) => {
  // Handle navigation preload requests
  if (event.preloadResponse) {
    event.respondWith(
      event.preloadResponse.then((response) => {
        if (response) {
          return response;
        }
        // Fallback to network request if preload fails
        return fetch(event.request);
      }).catch(() => {
        // If preload fails, fallback to network
        return fetch(event.request);
      })
    );
    return;
  }

  // For non-preload requests, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
