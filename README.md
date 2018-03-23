# serviceWorker_2
sw再探究，解决上次遗留的问题

引子：

  昨天在csdn上看到一则新闻，谈到支付宝小程序不仅可以添加到安卓手机桌面；而且，也能被添加到 iOS 系统的手机桌面（https://mp.weixin.qq.com/s/SyFpbFg0rB3G8Cu52x6CFA）。再结合前段时间开始流行的微信小程序，或许像小程序这种轻量级的应用是近段时间的发展趋势。
  
技术实现：

  这种轻型应用其实现有两种方式：PWA(Progressive Web App渐进式网页应用程序)（代表：https://m.alibaba.com在chrome中添加到桌面）  与  URL Scheme（支付宝小程序 添加到桌面）
  
PWA：

  这里谈谈PWA。PWA的三大基本能力：离线缓存、类app交互、消息推送，究其原因是其三个关键技术：Service Worker，Manifest（应用清单） ，Push Notification（推送通知）。
  
  关于PWA具体理解以及技术前景（ios不支持；国内网速快，pwa体量小的优势不明显；PWA的消息推送走的是 GCM（ FCM ）通道，而国内 Google 是无法访问），以下两文说的很详尽：
  https://www.zhihu.com/question/46690207
  https://blog.csdn.net/qq_19238139/article/details/77531191
  
心得：

  这里提一下PWA关键技术之一SW实现中细节的东西：
  
  1.只能在https的环境下才能使用sw。所以不能通过本地测试，可借助内网穿透工具（ngrok、natapp）从外网测试。
  
  2.如果使用localhost测试，在offline模式下，会导致sw.js获取不到。"Failed to load resource: net::ERR_INTERNET_DISCONNECTED"
  
  3.上次留下的问题：1.可根据情况选择要缓存的文件。2. 使用skipWaiting()方法，可以实现缓存仓库key修改后更新缓存。或勾选Application-ServiceWorker中选项Update on reload，实现刷新页面就更新，不论缓存仓库key值有没有变化。(https://zhuanlan.zhihu.com/p/25399566?refer=dreawer)