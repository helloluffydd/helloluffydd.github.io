---
title: Wierd JavaScript - 29：立即呼叫函式表達式（IIFEs）
date: 2019-08-23 20:26:13
tags:
- Wierd JavaScript
---

有一種函式，我們用完就丟。

<!-- more -->

## 創造函式的方法
---

至今，我們已經介紹過創造函式的兩種方法，還記得嗎？

* 函式陳述式（Function Statement）
* 函式表達式（Function Expression）

函式陳述指的是宣告一個**有名字的函式**，具有 Hoisting 的特性，JS 會將宣告的函式逐一存進記憶體，等到我們呼叫時才執行。

下方是一個函式陳述，即函式宣告：

```javascript
greet('Bai') ;

function greet(name){
  console.log('HI! ' + name) ;
}
greet('John') ;
```

函式表達指的是，我們先創造一個**沒有名字的函式**（匿名函式），並將它賦予給一個變數，我們可以透過該變數名稱呼叫函式。

注意！函式表達並沒有 Hoisting 的特性，因此無法在表達前執行。

下方是一個函式表達式：

```javascript
// greet('Bai') ; // greet is not a funciton
// console.log(greet) ; // undefined 
var greet = function(name){
  console.log('HI! ' + name) ;
}
greet('John') ;
```

我們說過，**表達式都會產生一個值**，而函式表達之所以屬於表達式，是因為它會創造一個**函式**，並儲存至記憶體，接著**賦值**給另一個變數。

所以，當我們 `console.log()` 該變數，會得到我們所創造的函式。

```javascript
var greet = function(name){
  console.log('HI! ' + name) ;
}
console.log(greet) ; 
```

還記得函式屬於什麼嗎？



## 立即呼叫函式表達式（Immediately Invoked Function Expressions）
---

**函式屬於特殊的物件**，也就是函式物件，具有名稱屬性與程式屬性，也可以儲存其他屬性或方法。

在函式表達中，我們創造一個匿名函式，雖然它沒有名字，但已經有程式屬性，當然**可以立刻呼叫它**。

怎麼呼叫？一樣，在函式物件後面加上 `()` 。

由於我們要賦值給變數 `greet` ，所以，這裡我們可以利用 `return` 把函式表達改寫成：

```javascript
var greet = function(name){
  return 'HI! ' + name ;
}('John')

// 此時，變數會等於回傳的值，並非函式本身，自然不能呼叫。
// greet() ; // greet is not a function
console.log(greet) ;
```

發現了嗎？我們在創造函式物件的同時，可以立即呼叫它，執行後回傳結果。

既然可以立即呼叫，執行運算，如果這函式我只打算用一次，何必還要賦值給另一個變數，佔記憶體空間？

所以，我們是不是可以這樣寫？

```javascript
function(name){
  console.log('HI! ' + name) ;
}('John')
```

但是 JS 引擎卻告訴你：

![syntaxError（圖片源自參考資料 1.）](syntaxError.JPG)



<span style="font-size: 32px">JavaScript 笑你，嘻嘻。</font>

這因為 JS 語法解析器看到一段程式碼，如果是由 `function` 開頭，**它會預期這是一段函式陳述句**，必須給函式補上名字。

但函式陳述不能立即呼叫，我們必須想辦法讓程式碼第一個字不為 `function` 。

最簡便的做法，就是利用**群組運算子 `()`**，將匿名函式整個包起來，變成一個**表達式**，這樣就不會是 `function` 起頭了。

```javascript
(function(name){
  console.log('HI! ' + name) ;
})('John') ;
```

如果你想這樣寫也是可以的：

```javascript
(function(name){
  console.log('HI! ' + name) ;
}('John')) ;
```

選一種風格，就別再變了吧！

這樣的函式，就是所謂的**立即呼叫函式表達式（IIFEs）**，**利用表達式創造一個函式物件後，立刻呼叫，執行運算，用完就丟**。

蛤？你問為什麼用 `()` 包起來就可以？因為只要在群組運算子 `()` 裡面放任何純值或物件，都會變成表達（創造一個值）。不信你試試：

```javascript
'I am so hungry.' // 'I am so hungry.'
( 55 + 66 ) ; // 121
(function(){console.log('JS is so HARD!!')}) ; // function
// (function try(){console.log('JS is so HARD!!')}) ; // unexpected token try （有名字的函式不行）
```



## 結論
---
* 立即呼叫函式表達式（IIFEs）：利用表達式創造一個函式物件後，立刻呼叫，執行運算，用完就丟。
* IIFEs 常見於各種框架與資源庫中，當我們不需要重複執行函式時，可以利用 IIFEs 減少記憶體負擔。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-44

