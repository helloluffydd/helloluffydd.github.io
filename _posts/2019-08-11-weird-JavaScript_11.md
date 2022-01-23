---
title: Wierd JavaScript - 11：運算子
date: 2019-08-11 15:28:33
tags:
- Wierd JavaScript
---

運算子就是用符號表示的函式。

<!-- more -->

## 運算子（Operators）
---


> **A special function** that is syntactically (written) differently.
Generally operators take two parameters and return one result.


如同其他程式語言，在 JavaScript 中，運算子是**一種特殊的函式**，透過特殊符號來描述，且往往**需要至少兩個以上的參數（Parameters）**進行運算，以回傳（return）一個運算的結果。

以算術運算子中的 `+` 為例，請看下方程式碼：

```javascript
var a = 55 + 66 ;
```

大部分運算子使用的是[中綴（Infix）](https://zh.wikipedia.org/wiki/%E4%B8%AD%E7%BC%80%E8%A1%A8%E7%A4%BA%E6%B3%95)表示法，意即用 `+` 串聯兩個所欲計算的參數 `55` 和 `66` 。

這段程式碼如果用 JS function 語法來表示，就像這樣（注意！只是幫助理解，請不要執行）：

```javascript
function +(a,b){
  return a + b ;
}
+(55,66)
```

當然，也部分運算子包括所謂[前綴（Prefix）](https://zh.wikipedia.org/wiki/%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)與[後綴（Postfix）](https://zh.wikipedia.org/wiki/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95)表示法。如下面這些範例：

```javascript
var c = 100 ;
var d = 200 ;
// Prefix
console.log(++c) ; // 101
// Postfix 
console.log(d--) ; // 200
```

JavaScript 包含以下幾種功能的運算子：

* 賦值運算子
* 比較運算子
* 算術運算子
* 位元運算子（不常用）
* 邏輯運算子
* 條件運算子（又稱三元運算子）
* 逗點運算子
* 字串運算子
* 一元運算子
* 關係運算子

大家有空可以點進連結細讀 [MDN 關於各種運算子的詳細介紹](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators)。

這裡我想簡單介紹幾種常見常用的運算子。

### 算術運算子（Arithmetic operators）

算術運算子包括基本的數學運算方法，必須掌握的算術運算子如下：

```javascript
// 加法
100 + 2 ; // 102
// 減法
100 - 2 ; // 98
// 乘法
100 * 2 ; // 200
// 除法
100 / 3 ; // 33.33333333...
// 取餘數
100 % 3 ; // 1
// 指數
2 ** 3 ; // 8
// 增加（++）以及減少（--）：屬於一元運算子，根據前綴或後綴的表述方法會回傳不同結果。
// 前綴增加／減少會回傳參數加／減 1 後的值：
console.log(++100) ; // 101
// 後綴增加／減少會將參數加／減 1 ，但回傳原本的值：
console.log(100++) ; // 100
```

### 賦值運算子（Assignment operators）

賦值運算子是**將右方的參數賦予給左方**，這個方向性很重要！

賦值運算子可以結合算術方法，變成複合的賦值運算子。

常見如下：

```javascript
// 單純賦值
var x = 5566 ;
var y = x ;
// 加法賦值
var k += 100 ; // 等同於　k = k + 100 
// 減法賦值
var l -= 200 ; // 等同於　l = l - 200
// 依此類推... 
```

### 比較運算子（Comparison operators）

比較運算子會**由左至右**依序比較傳入的參數，並根據結果回傳布林值： `true` 或 `false`。

如果比較的兩個參數資料型別不同，由於 JS 的動態型別特性，它會偷偷幫我們**強制型轉（Coercion）**後進行比較。

除了常見的比較運算子，**等於**和**嚴格等於**值得一提：

```javascript
// 等於：比較兩個參數的數值是否相同？
console.log(55 == 55) ; // true
// 嚴格等於：比較兩個參數的數值以及資料型態是否相同？
console.log(55 === '55') ; // false 
```

實務上，我們會**使用 `===` 來進行判斷**，以避免 JS 偷偷幫我們強制型轉而產生紕漏。

### 邏輯運算子（Logical operators）

邏輯運算子會**由左至右**判斷傳入的**參數**或**運算式**，並根據結果回傳一個**其中一個參數**，或**布林值**： `true` 或 `false`。

邏輯運算子常被用在條件判斷，尤其是 `if` 陳述句：

```javascript
// 且（&&）：當參數為運算式，根據運算結果回傳布林值，若兩運算式結果皆為 true ，則回傳 true。
console.log( 5 < 6 && 8 < 2) ; // false
// 或（||）：當參數為運算式，根據運算結果回傳布林值，若兩運算式其中之一為 true ，即回傳 true。
console.log( 5 < 6 || 8 < 2) ; // true
// 非（!）：若參數轉換成布林值為 true，則回傳 false。
console.log(!5566) ; // false 
console.log(!!5566) ; // true ；表示 5566 的布林值為 true
// 用於 if 陳述：
if(5 < 6 && 6 < 7){
  console.log('This is TRUE!') ; // This is TRUE!
}else{
  console.log('This is FALSE!') ;
}
```

注意！在 JS 中，**應該避免同時三個值以上的多重判斷**，尤其在 `if` 等條件陳述中，JS 強制型轉的特色可能會導致非預期的結果：

```javascript
// 尷尬的案例 ˊ_>ˋ
if(3 < 2 < 1){
  console.log('This is TRUE!') ; // This is TRUE!
}else{
  console.log('This is FALSE!') ;
}
```

所以，在**判斷多重條件時，請使用邏輯運算子**確保嚴謹：

```javascript
if(3 < 2 && 2 < 1){
  console.log('This is TRUE!') ; 
}else{
  console.log('This is FALSE!') ; // This is FALSE!
}
```



## 結論
---
* 運算子是一種透過特殊符號來表述的函式。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-21
2. [MDN：Expressions and operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)