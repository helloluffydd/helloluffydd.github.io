---
title: Wierd JavaScript - 37：函式程式設計（二）
tags:
- Wierd JavaScript
date: 2019-09-05 16:44:45
---

透過資源庫培養函式程式設計的思維！

<!-- more -->

## 開源教育
---

**Underscore** 就像 jQuery 一樣，是一個知名的 JavaScript **資源庫（Library）**，內含許多處理陣列、物件以及函式的語法。

類似功能的資源庫還有後起之秀 **Lodash** ，它也包括處理陣列、物件以及陣列的語法，且效率更好，速度更快，逐漸取代 Underscore.js 成為主流。

相關連結：
* [Underscore](https://underscorejs.org/#)
* [Lodash](https://lodash.com/)


課程講師鼓勵我們透過閱讀、解析這些框架（Frame）、資源庫的原始碼，去深入理解函式程式設計的方法與原理，這個過程符合**開源教育（Open Source Education）**的精神。

我們可以點擊上方連結，到 Underscore 的官方網站，下載 Development（擁有註解） 的版本，並在 Visual Studio 中打開 `underscore.js` ，從中檢視原始碼撰寫的設計原理。



## Underscore.js
---

檢視 `underscore.js` 的原始碼，我們會發現所有程式碼都被包在一個 IIFE 裡面，保證我們載入這個 Library 後，其內容不會與我們撰寫的程式碼產生衝突。

載入 `underscore.js` ：

```html
<html>
  <head></head>
  <body>
    ...
    <script scr="underscore.js"></script>
    <script scr="app.js"></script> // 我們自己撰寫的 JavaScript
  </body>
</html>
```

使用 `underscore.js` 的語法：

```javascript 
var arr1 = _.map([1, 2, 3, 4, 5], function(item){
  return item * item ;
})

var arr2 = _.filter([1, 2, 3, 4, 5, 6], function(item){
  return item % 2 === 0 ;
})

console.log(arr1) ;
console.log(arr2) ;
```



## 結論
---
* 找各式各樣的 JavaScript 框架或資源庫（Library）來玩，閱讀、理解它們的原始碼，培養程式設計的經驗與感覺。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-52
