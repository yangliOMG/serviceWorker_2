var cacheStorageKey = 'v2';

var cacheList = [
  "/",
  "index.html",
  "index.css",
  "ico.jpg"
]

// 注册了 service worker 的页面时，会触发一个叫install事件
self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(cacheStorageKey)  //打开缓存仓库
    .then( cache => cache.addAll(cacheList))  //调用 cache.addAll() 并传入一个 url 列表，然后加载这些资源并将响应添加至缓存
    .then( () => self.skipWaiting())    //在页面更新的过程当中，新的 SW 脚本能够立刻激活和生效。
  );
});

// 当 service worker 开始启动时，就会触发 activate 事件。 所以我们监听 activate 在这里更新缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    //获取所有cache名称
    caches.keys().then( cacheNames => {
      return Promise.all(
        //获取所有不同于当前版本名称 cache 下的内容
        cacheNames.filter( cacheNames => {
          return cacheNames != cacheStorageKey
        }).map( cacheNames => {
          return caches.delete(cacheNames)  //清空缓存池中的无用缓存
        })
      );
    }).then( () => {
      return self.clients.claim()   ///取得页面的控制权，这样之后打开页面都会使用版本更新的缓存
    })
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

