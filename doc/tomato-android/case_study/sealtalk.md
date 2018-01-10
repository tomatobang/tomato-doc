---
path: "/doc/tomato-android/case_study/sealtalk"
date: "2018-01-07"
title: "sealtalk"
---
## login 请求流程
OnDataListener
    ^
    |(实现)
BaseActivity -->  mAsyncTaskManager  --> EventBus( 融云内部库 )
    ^
    |(继承)
LoginActivity