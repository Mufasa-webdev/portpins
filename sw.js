const CACHE_NAME = "portpins-v1";
const FILES_TO_CACHE = [
  "/portpins/",
  "/portpins/index.html",
  "/portpins/style.css",
  "/portpins/script.js",
  "/portpins/manifest.json",
  "/portpins/ports.json",
  "/portpins/media/inner.png", // check folder name case
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return (
        response ||
        fetch(e.request).catch(() => {
          // offline fallback to index.html
          return caches.match("/portpins/index.html");
        })
      );
    }),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      ),
    ),
  );
});
