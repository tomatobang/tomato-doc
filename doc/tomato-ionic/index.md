---
path: "/doc/tomato-ionic/index"
date: "2018-01-07"
title: "index"
---


# 参考
* https://github.com/HsuanXyz/ionic3-chat
* https://github.com/dicallc/ionic3_angular4_JD
* https://github.com/dsgriffin/ionic-3-file-transfer-example.git


## 技术
* [ionic3 使用懒加载（译）](http://www.jianshu.com/p/a445b497cb60),作者写的系列文章值得一读!
  + 英文 Article : https://ionicacademy.com/ionic-3-lazy-loading/

## [Local Notification](https://github.com/katzer/cordova-plugin-local-notifications) Sound 路径
参照这个 issue 提及到的 [这篇文章](http://leifwells.com/post/2016-06-03-local-notifications/),可以解决问题，
事实上 `sound: 'file://audio/notification.wav` 中的 **file://** 指向的 **www/** 目录，所以大家该知道我们的音频文件该放在哪里了！