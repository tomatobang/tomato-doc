---
path: "/doc/tomato-web/v2/bugs"
date: "2018-01-07"
title: "bugs"
---


## bug 集锦
* ngFor 在数组触发改变后不会更新界面的数据，一说是对象的属性改变不会出发，只有整个对象都改了才会出发，于是有人发明了 hack [方法](http://stackoverflow.com/questions/40829951/angular2-ngfor-onpush-change-detection-with-array-mutations).
```javascript
this.myArray.push(newItem);
this.myArray = this.myArray.slice();
```

* 压缩代码报错，后来发现时不支持 ES6 代码的压缩
参考: https://github.com/webpack/webpack/issues/2972  
```javascript
uglifyjs failed: SyntaxError: Unexpected token: name (check)
```
参考: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15140
参考2: http://stackoverflow.com/questions/43119163/typescript-error-ts2693-promise-only-refers-to-a-type-but-is-being-used-as
* @types/core-js/index.d.ts 各种找不到那么，后来决定修改 tsconfig.json 增减
```javascript
"target": "es2015",
"lib": ["es2017", "dom"]
```

* "Runtime compiler is not loaded”,动态加载模块的方式需要区分 JIT 与 AOT 
* Couldn't find preset "es2015" relative to directory "D:\\git\\tomato-web\\src",这个完全是自己乱整进去的，跟标准的写法不通
  > ["@ngtools/webpack","babel-loader?presets[]=es2015"], ["babel-loader","@ngtools/webpack"]，["@ngtools/webpack","babel-loader"]:这样子则不支持 ts 语法。
* 
