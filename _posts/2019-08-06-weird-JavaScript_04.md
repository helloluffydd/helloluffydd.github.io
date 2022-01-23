---
title: Wierd JavaScript - 04：創造、提升與 undefined
date: 2019-08-06 11:10:21
tags:
- Wierd JavaScript
---

我們之前提過： JavaScript 的執行環境**不只包含你寫的 Code**，因為它必須經過編譯器轉換。

所以，JavaScript 的執行脈絡到底包含哪些事情是我們不知道的？

其中，最重要的就是 **Creation** 與 **Hoisting** 。

<!-- more -->

事實上，在你寫的 JavaScript 被執行之前，編譯器會**先偷偷幫你**做好兩件事情：

1. 創造階段（Creation）
2. 提升階段（Hoisting）

## Creation（創造）
---

首先， Creation 階段指的是**建立全域執行環境**、**this**以及**最外部環境**。

在上一篇中我們有說明，在環域環境中：`全域執行環境 = this = 外部環境`。

## Hoisting（提升）
---

Creation 階段後接著進行 Hoisting 階段：**JavaScript 引擎會先幫你宣告 `變數` 與 `函式`** ，其中，**變數會先被定義為 `undefined`** ，等到執行時才會真正賦值。

直接看程式碼比較好理解：

```javascript
var a = 'Variable would be hoisted in JS.' ;
function b(){
  console.log('Function would be hoisted in JS.') ;
}

console.log(a) ;
b() ;
```

上面這段程式碼執行後會依序出現：

```plain
Variable would be hoisted in JS.
Function would be hoisted in JS.
```

這個結果很直觀，但如果我們稍微調動一下程式碼順序：

```javascript
console.log(a) ;
b() ;

var a = 'Variable would be hoisted in JS.' ;
function b(){
  console.log('Function would be hoisted in JS.') ;
}
```

此時，執行結果會依序出現：

```plain
undefined
Function would be hoisted in JS.
```

<span style="font-size: 36px">OMG !! WHY ???</span>

為什麼此時 `a` 變成 `undefined` ，而 function `b` 依然可以執行？

因為，在 JavaScript 編譯器眼中，這段程式碼其實長這樣：

```javascript
// var = a ;  JS 偷偷先幫我們宣告變數 a 為 undefined，但它不會告訴我們，所以我們看不到這段。（第 1 行）
// JS 偷偷先幫我們宣告函式，但它不會告訴我們，所以我們看不到這段。（第 2 ~ 5 行）
// function b(){
//  console.log('Function would be hoisted in JS.') ;
//} 

console.log(a) ; // undefined 
b() ; // Function would be hoisted in JS.

a = 'Variable would be hoisted in JS.' ;
function b(){
  console.log('Function would be hoisted in JS.') ;
}
```

JS 編譯器會先宣告全域執行環境裡的 Variables 與 Functions ，並儲存進電腦的記憶體中，供後續執行使用。**先宣告變數與函式並存進電腦記憶體這個動作，就是 Hoisting**。

不少網路上對 Hoisting 的解釋是：編譯器會將變數宣告與函式宣告「挪移」到最上方。但是。這樣的說法並不正確。

更精確的說法是：JS 引擎在執行程式碼前，會**先將整個（JS檔案裡的）程式碼掃過一遍**，並且**只抓變數宣告和函式宣告**出來，逐一存入電腦記憶體，供後續真正執行時使用。

比喻成實際狀況，就像是：小飛今天想做提拉米蘇，他得先看一次食譜（JS檔案），需要準備哪些材料（變數）？有什麼方法（函式）？腦中有個概念（存進記憶體）後，才真正開始照著食譜動手做。

所以，**實際上 Code 的位置並沒有改變**，只是 JS 編譯器進行 Hoisting 後，讓我們以為程式碼位置有所變動。如上面那一段程式碼呈現的。

特別要注意的是，JS 編譯器只會對**變數宣告**與**函式宣告（Function Declaration）**進行 Hoisting ，如果是以函式表達式（Function Expressions）將函式賦予變數，那麼就必須等到 JS 真正開始執行後才能呼叫該函式。如下面這段程式碼：

```javascript
console.log(funcDeclaration) ; // undefined
console.log(funcExpressions) ; // undefined
funcExpressions() ; // undefined is not a function 

function funcDeclaration(){
  console.log('Function Declaration would be hoisted in JS.') ;
}
var funcExpressions = function(){
  console.log('Function Expressions can not be hoisted in JS.')
}

funcDeclaration() ; // Function Declaration would be hoisted in JS.
funcExpressions() ; // Function Expressions can not be hoisted in JS.
console.log(funcExpressions) ; // ƒ (){ console.log(...) }
```



## undefined
---

JS 編譯器進行 Hoisting 時，**如果該變數還沒有被賦予值（Value）就直接被取用，JS 就會先賦予該變數 `undefined` 這個值**。也就是前面所舉例的這段程式碼：

```javascript
console.log(a) ; // a 尚未被賦予值就被 console.log()，所以 JS 先賦予 a 為 undefined 值
b() ;

var a = 'Variable would be hoisted in JS.' ;　// a 被賦予一個字串 'Variable would be hoisted in JS.'
function b(){
  console.log('Function would be hoisted in JS.') ;
}

console.log(a) ; // Variable would be hoisted in JS.
```

之前我們曾經介紹過， `undefined` 屬於 JS 六種基本型別中的一種「值」（Value），意思是：**「該變數存在於 JS 中，且已經被宣告，但尚未被賦予值」**。儘管如此， `undefined` 本身還是一種值...我真搞不懂 JS 呀！

要注意的是，如果某變數**連宣告都還沒宣告過**，那麼 JS 會判定該變數為 `is not defined`，意思是：**「該變數不存在於 JS 中（因為你沒有宣告過它）」**。 

用程式碼比較如下：

```javascript
console.log(a) ; // undefined
console.log(b) ; // b is not defined

var a = 100 ;

console.log(a) ; // 100
```

另一個容易與 `undefined` 搞混的值，叫做 `null`，這裡簡單區別兩者。

`null` 也是 JS 六種基本型別的一種「值」，它的意義是：**「空值」，代表這個變數已經宣告，且可能曾經有值，但現在沒有**。

**小飛：「那 `null` 等於 `0` 嗎？」**

你可以試試看這段程式碼：

```javascript
var a = null ;
console.log(a == 0) ;　 // false 
console.log(a >= 0) ;　 // true .... ˊ<_ˋ????????
```

關於 `null` 的詳細介紹與型別比較，就等之後有機會再談囉！



## 結論
---
* 創造提升（Creation & Hoisting）指的是：在 JS 真正執行你寫的 Code 之前， JS 引擎會先跑過整個全域執行環境，並將 `變數宣告` 與 `函式宣告` 抓出來存進電腦記憶體，供後續真正執行時使用。
* `undefined` 屬於 JS 基本型別的其中一種「值」（Value），意思是：「該變數存在於 JS 中，且已經被宣告，但尚未被賦予值」。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 2-10 、 2-11
2. [MDN：Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)






