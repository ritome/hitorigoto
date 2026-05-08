/* ヒトリゴト Service Worker
   役割：オフラインでも起動できるようにキャッシュ。
   バージョンを上げると、次回アクセス時に新版に自動更新される。 */

const CACHE_VERSION = 'hitorigoto-v7';
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './icon-maskable-512.png'
];

// インストール時：キャッシュにファイルを保存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      // 1ファイルでもエラーが出ても他は保存する
      return Promise.all(
        CACHE_FILES.map(url =>
          cache.add(url).catch(err => console.log('キャッシュ失敗:', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// 有効化時：古いバージョンのキャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// fetch時：ネットワーク優先、失敗したらキャッシュから
self.addEventListener('fetch', event => {
  // GET以外はそのまま
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // ネットワークから取れたらキャッシュも更新
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
