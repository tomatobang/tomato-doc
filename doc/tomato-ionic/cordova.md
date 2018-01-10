---
path: "/doc/tomato-ionic/cordova"
date: "2018-01-07"
title: "cordova"
---


## 计划
最近计划把之前的 im 功能接上去，此外，计划对部分 service 进行重整，改在为 @ionic/native 的方式，便于以后的维护，初步估计了下，根据 github 上已有的资源来整的话，应该不会太复杂。  
此外，之前整了那么久的 ionic-chat 也可以搬一些东西过来，总得来说，会耗掉一些时间，但是也不会太难，

## im
对于是继续选融云还是直接选极光，有点迷糊，融云的话，毕竟以前用过，上手也快，只是官方已经不再支持 cordova 相关的库了，以后的维护与升级就麻烦了，极光则对 cordova 有很大的热情，推送和 im 都有相关的库，而且 star 都还不少。

#### 参考资料
* [jmessage-phonegap-plugin](https://github.com/jpush/jmessage-phonegap-plugin)，暂时没有看到封装为 @ionic/native 形式的库
* [ionic2_chatByJMessage](https://github.com/hanzhipeng1516/ionic2_chatByJMessage),作者没在更新维护了
* [cordova-plugin-rongcloud-im-ionic2](https://github.com/kongdewen1994/cordova-plugin-rongcloud-im-ionic2)
* [融云开源项目一览](http://www.rongcloud.cn/docs/open_source.html)

#### 选择
**抛弃舒适区，拥抱未来，选择JMessage**


## push
* [ionic2-jpush-cordova-plugin](https://github.com/kongdewen1994/ionic2-jpush-cordova-plugin)