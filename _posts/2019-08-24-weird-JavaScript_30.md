---
title: Wierd JavaScript 30：IIFEs 與安全程式碼
tags:
- JavaScript
- Wierd JavaScript
date: 2019-08-24 10:42:20
---

什麼情況下會用到 IIFEs ？

<!-- more -->

### IIFEs與非同步回呼

立即執行函式表達式（IIFEs），指的是我們利用表達式創造函式後，立即呼叫，執行運算，用完就丟。

函式立即呼叫後，JS 會建立屬於它的執行環境，加入執行堆疊，並接著執行程式碼。

函式運算後回傳值（如果有 `return` 的話），消滅執行環境，離開執行堆疊，該 IIFEs 的生命也就結束了，因為只用一次。

IIFEs 用完就丟的特性，讓我們能夠**立即執行非同步回呼**，避免 JS 引擎將它們放進事件佇列，等到最後才逐一執行。

先前我們舉過 `setTimeout` 的例子：

```javascript
for(var i = 1 ; i <= 10 ; i ++){
  setTimeout(function(){
    console.log('這是第 ' + i + ` 次執行。`) ; 
  },1000)
}
```

在這樣的狀況下，JS 引擎會等到執行堆疊為空時，才執行 `setTimeout` 的回呼函式，此時 `i = 11` ，執行結果將會是：

{% colorquote danger %}
(10) 這是第 11 次執行。
{% endcolorquote %}

我們可以利用 IIFEs 將 `setTimeout` 包起來，並傳入 `i` ，每跑一次迴圈，就立即執行回呼函式，達到我們預期的效果：

```javascript
for(var i = 1 ; i <= 10 ; i ++){
  (function(i){
    setTimeout(function(){
      console.log('這是第 ' + i + ` 次執行。`) ; 
    },1000 * i)
  })(i) ;
}
```

{% colorquote success %}
這是第 1 次執行。
這是第 2 次執行。
...
這是第 10 次執行。
{% endcolorquote %}

<hr>

### 安全程式碼（Safe Code）

IIFEs 能夠立即呼叫函式，創造新的執行環境，執行完後隨即消滅。

這樣的特性可以幫助我們**避免污染全域**，**讓只具備功能性的變數隨著執行環境生滅**，而這樣的作法就是所謂**安全程式碼**。

```javascript
(function(name){
  
  var greeting = 'Hello';
  console.log(greeting + ' ' + name + '.') ;
})('John') ;

console.log(greeting) ; // is not defined
```

換句話說，我們可以將所欲處理的事情包進 IIFEs 中執行，只 `return` 需要的值，其他沒用的值就不要回傳。

```javascript
(function(name){
  
  var greeting = 'Hello'; // greeting 只是具備功能性的變數，隨著函式執行環境生滅。
  return greeting + ' ' + name + '.' ;
})('John') ; 
```

如果我們想要取用全域物件，可以利用物件傳參考的特性，將 `window` 傳入 IIFEs 中，或者直接取用、修改：

```javascript
var greeting = 'Hello' ;

(function(global, name){
  
  global.greeting = 'Hola' ; 
  // greeting = 'Hola' ; 直接取用，修改全域變數。
  // var greeting = 'Bonjour' ;  宣告為區域變數，並直接取用。
  console.log(greeting + ' ' + name + '.') ;
})(window, 'John') ;

console.log(greeting) ; // Hola
```

<hr>

### 結論
* IIFEs 能夠立即呼叫函式，創造新的執行環境，執行完後隨即消滅，這樣的特性可以幫助我們避免污染全域，讓只具備功能性的變數隨著執行環境生滅，而這樣的作法就是所謂的安全程式碼。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-45


