---
path: "/doc/tomato-server/redis"
date: "2018-01-07"
title: "redis"
---

## Redis 应用
* 每日用户番茄分钟排名(今日和昨日)，可以用到有序列表
* 用户实时 socket 数据管理可以用到键值与列表，目前重启数据会消失，很显然是行不通的