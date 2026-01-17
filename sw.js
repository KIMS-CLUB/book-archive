const CACHE_NAME = 'book-archive-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// 서비스 워커 설치 및 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 활성화 단계
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 네트워크 요청 시 처리 (오프라인 대응 기본)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});