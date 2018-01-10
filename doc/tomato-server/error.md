---
path: "/doc/tomato-server/error"
date: "2018-01-07"
title: "error"
---

## socket.io 一直报 404
其实服务端初始化不正确，说什么头没有设置其实是迷惑人的,具体代码参见 TAG 1.O
参考: https://stackoverflow.com/questions/35713682/socket-io-gives-cors-error-even-if-i-allowed-cors-it-on-server
#### 初始化2次
**TODO:**服务端的一个方法被初始化两次了，但是前段明明只调用了一次啊，通过 clearTimeout 方法临时解决了下，这个还得继续研究


## EGG 
按照[文档](https://eggjs.org/zh-cn/core/deployment.html)部署后，死活运行不成功，其中虽然有提示说
`Db.prototype.authenticate method will...`,但是这个仅仅是警告而已，后来查到该[ISSUE](https://github.com/eggjs/egg/issues/1353),其中
有说到，
> 1. ssh 到服务器上，不用 daemon 启动，看看控制台输出是啥
2. 确认下你的服务器的文档，是不是必须指定环境变量为启动端口，或者 workers 数量有限制 （譬如 leadcloud 和 sinaapp 就有限制，不确定你用的阿里云有没有）  

试着将 daemon 参数去掉，结果运行成功！顺带说一下，--daemon 只是把日志重定向到文件而已，不输出到控制台。  
~~经测试，在 screen -S 新创建的窗口中是可以加上 --daemon 并执行成功的！~~

* 启动后磁盘读写莫名增高，经过一会开始恢复正常，其中有切换端口号进行尝试，不知道是不是这个的影响

#### koa-send
有着自己的一套返回机制，找不到文件时会自动返回 404，自己一直怀疑是路由坏了是没道理的！

#### 日志
按理说日志应该写在应用程序根目录下 logs/ 才对，但是偏偏写到 /root/logs/tomato-server 下了



## EXPRESS
```javascript
app.set('port', port);
var server = http.createServer(app);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/*
* setup socket.io, and socket-session
*/
var socketIO = require('socket.io');
var io = socketIO(server);
```

## KOA2
```javascript
let server=  app.listen(config.serverPort, () => {
    log.info(`Koa2 is running at ${config.serverPort}`);
});
var io = require('socket.io').listen(server);
```
还有人直接使用到了库来解决问题: https://github.com/mattstyles/koa-socket  / https://github.com/LnsooXD/koa-socket.io
此外有些人事这样子写的,但是我硬是没有试验成功
```javascript
let server = require('http').Server(app.callback());
    let io     = require('socket.io')(server);
    require('./main')(io);
    return server;
```

## egg-socket.io
在 egg 提了一个 Issue，地址为 https://github.com/eggjs/egg/issues/1629 
* **Node Version**:
v7.9.0
* **Egg Version**:
v1.9.0
* **Plugin Name**:
egg-socket.io
* **Plugin Version**:
v3.0.0
* **Platform**:
windows 10 或者 centos7
* **Mini Showcase Repository**:
暂无

报错堆栈信息如下
```
TypeError: Cannot set property 'args' of undefined (uncaughtException throw 1 times on pid:9992)
    at Socket.socket.on.args (/mnt/myRepo/node_modules/egg-socket.io/lib/io.js:68:37)
    at emitOne (events.js:101:20)
    at Socket.emit (events.js:191:7)
    at Socket.emit (/mnt/myRepo/node_modules/socket.io/lib/socket.js:140:10)
    at Socket.onclose (/mnt/myRepo/node_modules/socket.io/lib/socket.js:452:8)
    at Client.onclose (/mnt/myRepo/node_modules/socket.io/lib/client.js:233:24)
    at emitTwo (events.js:111:20)
    at Socket.emit (events.js:194:7)
    at Socket.onClose (/mnt/myRepo/node_modules/engine.io/lib/socket.js:318:10)
    at Object.onceWrapper (events.js:293:19)
    at emitNone (events.js:86:13)
    at WebSocket.emit (events.js:188:7)
    at WebSocket.Transport.onClose (/mnt/myRepo/node_modules/engine.io/lib/transport.js:127:8)
    at WebSocket.internalOnClose (/mnt/myRepo/node_modules/uws/uws.js:199:17)
    at process.nextTick (/mnt/myRepo/node_modules/uws/uws.js:445:27)
    at _combinedTickCallback (internal/process/next_tick.js:73:7)
```


出现这个错误后，重启服务端后，客户端不刷新，一切正常;出现这个错误后，
按 F5 刷新客户时会出现，根据堆栈初步判断是这里 `at Socket.socket.on.args (/mnt/myRepo/node_modules/egg-socket.io/lib/io.js:68:37)` 没有考虑到可能出现的所有情形？
所以我稍微改动了点东西，将这段代码
```javascript
 if (nsp[RouterConfigSymbol]) {
        for (const [ event, handler ] of nsp[RouterConfigSymbol].entries()) {
          socket.on(event, (...args) => {
            const ctx = args.splice(-1)[0];
            ctx.args = ctx.req.args = args;
            co.wrap(handler).call(ctx)
              .then(() => ctx[CtxEventSymbol].emit('finshed'))
              .catch(e => {
                e.message = '[egg-socket.io] controller execute error: ' + e.message;
                ctx[CtxEventSymbol].emit('finshed', e);
              });
          });
        }
      }
```
改为以下这样子，
```javascript
 if (nsp[RouterConfigSymbol]) {
        for (const [ event, handler ] of nsp[RouterConfigSymbol].entries()) {
          socket.on(event, (...args) => {
            const ctx = args.splice(-1)[0];
            // 这里是新增内容
            if(!args || !ctx.req){
              return;
            }
            ctx.args = ctx.req.args = args;
            co.wrap(handler).call(ctx)
              .then(() => ctx[CtxEventSymbol].emit('finshed'))
              .catch(e => {
                e.message = '[egg-socket.io] controller execute error: ' + e.message;
                ctx[CtxEventSymbol].emit('finshed', e);
              });
          });
        }
      }
```
然后就没有再出现。

