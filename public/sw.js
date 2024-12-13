const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/manifest.json',
];

let favorites = []; //almacena los favs

//instalar Service Worker y cachear 
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app resources');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

//activar el Service Worker y limpiar antigua cache
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

//interceptar solicitudes para usar desde la caché
self.addEventListener('fetch', (event) => {
  console.log('[Service Worker] Fetching:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

//manejar mensajes
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  const { type, payload } = event.data;

  switch (type) {
    case 'GET_FAVORITES':
      event.source.postMessage({ type: 'FAVORITES', payload: favorites });
      break;

    case 'SAVE_FAVORITES':
      favorites = payload;
      console.log('[Service Worker] Favorites updated:', favorites);
      break;

    default:
      console.warn('[Service Worker] Unknown message type:', type);
  }
});
