---
title: Wierd JavaScript 14：存在與布林、條件判斷與預設值
date: 2019-08-12 16:31:05
tags:
- JavaScript
- Wierd JavaScript
---

小飛：「所以， JS 的動態型別與強制型轉到底有什麼用？」

有！這兩大特色幫助我們輕鬆判斷條件，設定預設值。

<!-- more -->

### 存在與布林

既然在 JavaScript 中資料型別可以任意轉換，這也就表示**任何資料都能被我們轉型成布林值**：`true` 或 `false`。

在 JS 中，我們可以用 `Boolean()` 這個指令來檢驗資料轉型的布林值為何？

```javascript
Boolean('') ;         // false ;
Boolean(0)  ;         // false ;
Boolean(null) ;       // false ;
Boolean(undefined) ;  // false ;
```

從此可知，我們知道 `空字串`、`0`、`null`、`undefined` 在布林中都會被轉成 `false`，在 JS 中，我們可以說這些**值不存在**，或說**什麼都不是（Nothing）**。

而布林值的判別，能夠幫助我們檢驗資料的值是否存在，並用在條件判斷中進行流程管理。譬如 **`if` 陳述句**， `if` 條件的判斷取決於**條件內容的布林值**，若為 `true` ，就執行 `{}` 內的程式碼，若否，則執行 `else{}` 或結束判斷。

```javascript
var a = '    ' ; // 注意！空字串和空白字串是不一樣的！
var b = 0 ;

// === 優先性高於 &&，所以先判斷 b === 0 為 true，再判斷 a && true。
// 由於 a 為空白字串，轉成布林值為 true ，所以條件內容為 true && true，執行 {} 程式碼。
if(a && b === 0){
  console.log('Something is there.') ; // Something is there.
}
```

<hr>

### 設定預設值

我們也可以利用邏輯運算子 `||（或）` ，借助強制型轉與布林值的特性，來為變數賦予預設值。

邏輯運算子 `||（或）` 的意義是，**由左至右判斷中介雙方的資料的布林值**，若左方變數的布林值為 true ，即回傳左方的資料，若左方布林值為 false ，則進一步判斷右方資料的布林值，若為 true ，即回傳右方資料。

以下方程式碼為例：

```javascript
function welcome(name){
  name = name || 'my guest' ;
  console.log('Welcome to my blog, ' + name + '!') ;
}
welcome('John') ; // Welcome to my blog, John! 
welcome() ; // Welcome to my blog, my guest! 
```

<hr>

### 結論
* 在 JS 中任何資料都能被轉型成布林值。
* 布林值的判別能夠幫助我們檢驗資料的值是否存在，並用在 `if` 條件判斷中進行流程管理。
* 我們也可以利用邏輯運算子 `||` ，借助強制型轉與布林值的特性，來為變數賦予預設值。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-27、3-28



