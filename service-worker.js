const CACHE_NAME = "offline-cache-v1";

// Arquivos que serão guardados para uso offline
const FILES_TO_CACHE = [
  "./",           // Página inicial
  "./index.html"  // Seu arquivo principal
];

// Instalação — salva os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// Intercepta requisições — responde do cache quando não houver internet
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedFile) => {
      // se o arquivo existir no cache → usa offline
      // se não existir → tenta baixar da internet
      return cachedFile || fetch(event.request).catch(() => cachedFile);
    })
  );
});
