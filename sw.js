var cacheStorageKey = 'v2';

var cacheList = [
  "/",
  "index.html",
  "index.css",
  "ico.jpg"
]

// 缓存
self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(cacheStorageKey)
    .then( cache => cache.addAll(cacheList))
    .then( () => self.skipWaiting())    //在页面更新的过程当中，新的 SW 脚本能够立刻激活和生效。
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then( response => {
      if(response !=null){
        return response
      }
      return fetch(event.request.url)
    })
  )
});

// 缓存更新
self.addEventListener('activate', event => {
  event.waitUntil(
    //获取所有cache名称
    caches.keys().then( cacheNames => {
      return Promise.all(
        //获取所有不同于当前版本名称 cache 下的内容
        cacheNames.filter( cacheNames => {
          return cacheNames != cacheStorageKey
        }).map( cacheNames => {
          return caches.delete(cacheNames)
        })
      );
    }).then( () => {
      return self.clients.claim()   ///取得页面的控制权，这样之后打开页面都会使用版本更新的缓存
    })
  );
});

