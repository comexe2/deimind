const CACHE_NAME = 'deidara-app-v2'; // 버전을 v2로 올렸습니다!

self.addEventListener('install', event => {
  console.log('새로운 서비스 워커 설치 중...');
  self.skipWaiting(); // 폰에서 대기하지 않고 즉시 새 버전 적용
});

self.addEventListener('activate', event => {
  console.log('새로운 서비스 워커 활성화 됨!');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('오래된 찌꺼기 캐시 삭제 됨:', cache);
            return caches.delete(cache); // 옛날 화면 저장본 싹 삭제
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // ★ 핵심: 무조건 인터넷(서버)에서 최신 코드를 먼저 가져오라고 지시 (Network First)
  event.respondWith(
    fetch(event.request).catch(() => {
      // 인터넷이 완전히 끊겼을 때만 폰에 저장된 옛날 화면을 보여줌
      return caches.match(event.request);
    })
  );
});
