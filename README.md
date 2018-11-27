# serviceWorker_2
sw再探究，解决上次遗留的问题

# 引子：

  昨天在csdn上看到一则新闻，谈到支付宝小程序不仅可以添加到安卓手机桌面；而且，也能被添加到 iOS 系统的手机桌面（https://mp.weixin.qq.com/s/SyFpbFg0rB3G8Cu52x6CFA ）。再结合前段时间开始流行的微信小程序，或许像小程序这种轻量级的应用是近段时间的发展趋势。
  
  
# 技术实现：

  这种轻型应用其实现有两种方式：PWA(Progressive Web App渐进式网页应用程序)（代表：https://m.alibaba.com 在chrome中添加到桌面）  与  URL Scheme（支付宝小程序 添加到桌面）
  
  
# PWA：

  这里谈谈PWA。PWA的三大基本能力：离线缓存、类app交互、消息推送，究其原因是其三个关键技术：Service Worker，Manifest（应用清单） ，Push Notification（推送通知）。
  
  __SW__：作用于 浏览器于服务器之间，相当于一个代理服务器
  
  事件机制：
![image](https://image-static.segmentfault.com/120/353/1203530726-5ae2f996ef242_articlex)

  生命周期：
![image](https://image-static.segmentfault.com/418/819/418819374-5ae2f9970144a_articlex)

  __Manifest__：Web App Manifest 是一个 W3C 规范，它定义了一个基于 JSON 的 List 。Manifest 在 PWA 中的作用有：1.能够将你浏览的网页添加到你的手机屏幕上。2.在 Android 上能够全屏启动，不显示地址栏 
  

  __Push Notification__：Push 和 Notification 是两个不同的功能。


  __技术前景__：ios不支持；国内网速快，pwa体量小的优势不明显；PWA的消息推送走的是 GCM（ FCM ）通道，而国内 Google 是无法访问
  
  以下两文说的很详尽：
  https://www.zhihu.com/question/46690207
  https://blog.csdn.net/qq_19238139/article/details/77531191

  
  
# 心得：

  这里提一下PWA关键技术之一SW实现中细节的东西：
  
  1.只能在https的环境下才能使用sw。所以不能通过本地测试，可借助内网穿透工具（ngrok、natapp）从外网测试。（内网穿透理解：https://blog.csdn.net/zhangguo5/article/details/77848658?utm_source=5ibc.net&utm_medium=referral）
  
  2.如果使用localhost测试，在offline模式下，会导致sw.js获取不到。"Failed to load resource: net::ERR_INTERNET_DISCONNECTED"
  
  
  3.上次留下的问题：1.可根据情况选择要缓存的文件。2. 使用skipWaiting()方法，可以实现缓存仓库key修改后更新缓存。或勾选Application-ServiceWorker中选项Update on reload，实现刷新页面就更新，不论缓存仓库key值有没有变化。(https://zhuanlan.zhihu.com/p/25399566?refer=dreawer)
