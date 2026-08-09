const CACHE_NAME = 'pathcard-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');
});

self.addEventListener('fetch', (event) => {
  // Configuração básica para permitir o funcionamento offline
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});