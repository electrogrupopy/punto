const CACHE_NAME = "offline-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  // Não interceptar requisições para Google Apps Script
  if (event.request.url.includes('script.google.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((cachedFile) => {
      return cachedFile || fetch(event.request).catch(() => cachedFile);
    })
  );
});
