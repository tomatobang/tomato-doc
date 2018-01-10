---
path: "/doc/tomato-ionic/error"
date: "2018-01-07"
title: "error"
---


## 懒加载
> 死活说找不到模块,这个问题害了我两次了！！！！！！
按照 https://github.com/ionic-team/ionic/issues/10946 进行修改
```
npm install @ionic/app-scripts@latest.
```
结果报
```
webpackJsonp is not defined
```
这个很好解决,在 index.html 中添加
```
<script src="build/vendor.js"></script>
```
最后，还是死活找不到模块，把 ionic-app-scripts 版本修改到 1.3.2 才解决
但是这么的报错，还是要人觉得不明不白，闲逛时看到这篇[文章](http://www.cnblogs.com/eccainiao/p/6892780.html),
其说是 cnpm 惹得祸，于是移除掉 node_modules 里的内容，重新使用 npm 进行安装 

## cannot-find-module-lodash
最好还是靠 npm i 解决的问题，这种安装性质的 bug 实在太难调了！
https://stackoverflow.com/questions/27431187/cannot-find-module-lodash,题解所用方法基本无效


### IonicPageModule：No component factory found for
这种 lazy load 的方式不能用老方法来判断这个问题，最后把 modal 改装成 module 的形式，使得问题得到解决！参考链接
: https://stackoverflow.com/questions/43782764/ionic-3-lazy-loading-no-component-factory/45734336#45734336


## 为啥 cordova 插件会添加到 package.json 的依赖中呢？