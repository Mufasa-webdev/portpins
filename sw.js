const CACHE_NAME = "portpins-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./backButton.js",
  "./ports.json",
  "./manifest.json",
  "./Media/inner.png",
  "./Media/outersquare.png",
  "./Media/sydney-3.jpg",
  "./Media/rum-cake-5.webp",
  "./Media/flea-market-1.webp",
  "./Media/nassau-4.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
