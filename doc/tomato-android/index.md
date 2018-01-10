---
path: "/doc/tomato-android/index"
date: "2018-01-07"
title: "index"
---

## 参考
* https://github.com/sealtalk/sealtalk-android/
  > 总体来说，这个案例还是比较复杂的，对某些业务也进行了较好的封装，但是对于一个 Hello World 程序来说，其还是过于复杂

* 在 AndroidManifest 中添加的 Activity 如何使用其中的 data，如 sealTalk 有这么一段配置
  ```xml
   <activity
            android:name=".ui.activity.MainActivity"
            android:launchMode="singleTask"
            android:screenOrientation="portrait"
            android:configChanges="orientation|keyboardHidden|screenSize"
            android:windowSoftInputMode="stateHidden|adjustPan">

            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />

                <data
                    android:host="cn.rongcloud.im"
                    android:pathPrefix="/push_message"
                    android:scheme="rong" />
            </intent-filter>
        </activity>
  ```