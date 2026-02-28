// PWA 설치 조건을 만족시키기 위한 아주 기본적인 서비스 워커 (캐싱 없음)
const CACHE_NAME = 'deidara-app-v1';

self.addEventListener('install', event => {
  console.log('서비스 워커 설치 완료, 음!');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('서비스 워커 활성화 완료, 음!');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  // 모든 네트워크 요청을 그냥 통과시킵니다 (오프라인 캐싱은 하지 않음)
  event.respondWith(fetch(event.request));
});