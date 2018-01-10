---
path: "/doc/tomato-ionic/bugs"
date: "2018-01-07"
title: "bugs"
---


## Tabs
我在某个模块直接调用
```
this.navCtrl.push(); 
```
或者
```
this.navCtrl.setRoot(); 
```
会造成诡异的效果，我想要的效果是从 Tabs 导航到 login，然后登陆后再返回到 tabs，结果出现了好几个视图的叠加，因为 Tabs 中的每个模块都会有独立的 navCtroller 控制模块，调用这些方法只会再 Tabs 范围内活动，参考链接
https://forum.ionicframework.com/t/pop-tabspage-and-push-loginpage/78716/10 

```
I know I am late to the party, and this is a few months old already.

But I think the code you are looking for is to access the root nav from the App utility class (https://ionicframework.com/docs/api/components/app/App/23) using getRootNav() and pop() from there.

Ionic Tabs have a strange navigation stack (it’s not so strange when you think why). The <ion-tabs> instance is pushed to the root nav, and each <ion-tab> has its own NavController. This is so you can push as deep as you need to per tab, and simply switch to another tab without screwing up the other tab’s navigation stack.

Essentially what you want to do is this on one of your pages:

logout() {
  this.app.getRootNav().pop();
}
The <ion-tabs> is pushed to the root navigation stack, and each tab’s individual navigation stack is a child to this, so is not part of the root. Make sense?
```