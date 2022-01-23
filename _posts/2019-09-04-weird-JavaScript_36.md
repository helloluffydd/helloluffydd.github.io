---
title: Wierd JavaScript - 36：函式程式設計（一）
tags:
- Wierd JavaScript
date: 2019-09-04 23:40:04
---

邁向進階 JavaScript ：函式程式設計（Functional Programming）

<!-- more -->

## 函式程式設計（Functional Programming）
---

我們知道，一級函式是 JavaScript 的重點特色，讓我們能夠將函式當作參數傳入另一個函式，而這樣的特色，讓 JavaScript 得以函式為核心，去設計各式各樣的程式語法，達到不同的效果與目的，而這個思考與實作的過程就是所謂的**函式程式設計（Functional Programming）**。

在課程中，講師以範例來說明：

```javascript
var arr1 = [1, 2, 3] ;
var arr2 = [] ;

for (var i = 0 ; i < arr1.length ; i++){
  arr2.push(arr1[i] * 2);
}

console.log(arr2) ;
```

上面這個範例中，我們想將陣列 `arr1` 中的每一個數值乘以 `2` 以後傳入 `arr2` 中。

身為工程師，我們可以思考如何優化這段程式碼？如何讓程式碼更為簡潔？更為彈性？

其實，我們可以善用**函式**讓程式碼更為**彈性**，只要改動函式的參數或程式屬性，就可以**減少許多重複的工作**，這就是函式程式設計的基本思維。

我們試著改寫上面這段程式碼，如下：

```javascript
var arr1 = [1, 2, 3] ;

function mapForEach(array, func) {
  var newArr = [] ;

  for (var i = 0 ; i < array.length ; i++){
    newArr.push(func(array[i]));
  }

  return newArr ;
}

var arr2 = mapForEach(arr1, function(item){
  return item * 2 ;
})

console.log(arr2);
```

我們可以宣告一個函式 `mapForEach` ，並規定傳入兩個參數，第一個 `array` 是**我們想要處理的陣列**，第二個 `func` 是**我們想要針對陣列中每一個值進行的運算方式**。 

現在，我們只要將 `arr1` 與 `function(item){return item * 2　;}` 分別當作參數 `array` 與 `func` 傳入函式 `mapForEach` 中，執行回傳的結果再賦值給 `arr2` ，這樣的方式與改寫前的範例程式碼，執行的結果是相同的。

不同的地方在哪？

不同的地方在於，我們把原本程式碼的執行任務：「將陣列 `arr1` 中的每一個數值乘以 `2` 以後傳入 `arr2` 中」這一整件事情**包裝**成函式 `mapForEach` ，它的功能變成：「將陣列 `array` 中的每一個數值經過 `func` 運算以後 `return`」。

如此一來，我們**可以自定義**傳入的參數 `array` 和 `func` ，讓函式 `mapForEach` 的彈性與複用性變高了！

譬如，我想要判斷陣列中的數值是否大於 `1` ，我只要改變傳入 `func` 的參數：

```javascript
var arr1 = [1, 2, 3] ;

function mapForEach(array, func) {
  var newArr = [] ;

  for (var i = 0 ; i < array.length ; i++){
    newArr.push(func(array[i]));
  }

  return newArr ;
}

var arr2 = mapForEach(arr1, function(item){
  return item > 1 ;
})

console.log(arr2);
```

當然，我們也可以把函式存進一個變數後，將該變數當作參數傳入另一個函式，甚至先做一點處理。

課程中，講師利用 `bind()` 方法，改寫上面這段程式碼：

```javascript
var arr1 = [1, 2, 3] ;

function mapForEach(array, func) {
  var newArr = [] ;

  for (var i = 0 ; i < array.length ; i++){
    newArr.push(func(array[i]));
  }

  return newArr ;
}

var checkPastLimit = function(limiter, item){
  return itme > limiter ;
}

var arr2 = mapForEach(arr1, checkPastLimit.bind(this, 2))

console.log(arr2);
```

透過 `bind()` ，我們可以自由綁定參數 `limiter` 的值。

如果不使用 `bind()` 呢？有沒有辦法改寫 `checkPastLimit.bind(this, 2)` ，設計一個函式，只要傳入 `limiter` 的值，還能達到同樣的結果？

先別急著往下看，請試著動手寫寫看！

.

.

.

.

.

.

```javascript
var arr1 = [1, 2, 3] ;

function mapForEach(array, func) {
  var newArr = [] ;

  for (var i = 0 ; i < array.length ; i++){
    newArr.push(func(array[i]));
  }

  return newArr ;
}

// 我自己寫的錯誤答案： 
// var setLimiter = function(limiter) {
// 我以為 limiter 會被當作參數傳入（但並不會，因為這裡不是執行函式）
//   return function(limiter, item){
//     return item > limiter ;
//   };

// 正確解答：
var setLimiter = function(limiter) {
  // 創造函式物件
  return function(limiter, item){
    return item > limiter ;
  }.bind(this, limiter);
}

var arr2 = mapForEach(arr1, setLimiter(2))

console.log(arr2);
```

要特別注意的是，函式 `setLimiter` 中的 `return function(limiter, item)` ，其意義為**表示式**，意思是**創造函式物件** `function(limiter, item)` 後並回傳，並非執行函式 `function(limiter, item)` 。

所以，函式 `setLimiter` 傳入的參數 `limiter` 並不會作為參數傳入函式 `function(limiter, item)` ，還是要利用 `bind()` 綁定 `limiter` 的值，此時， `limiter` 會根據作用域找到函式 `setLimiter` 傳進來的參數 `limiter` 並取用。

這個概念在我自己嘗試解答的時候也混淆了，分清楚**創造函式**與**執行函式**，真的很重要！

最後，講師也提醒我們，在設計函式程式時，**盡量不要改變（Mutate）原始的資料（Data）**，也就是說，**注意傳值與物件傳參考的特性**，在複製資料時，以**深拷貝**或**創造新的值（物件）**來傳遞資料，如 `[].push()` 、 `Object.assign({}, obj)` 等方法。

動手寫吧！將你的任務包裝成一個一個的函式，設計屬於你的 JavaScript ！



## 結論
---
* 函式程式設計的思維是將任務拆分、打包成一個一個的函式（與變數），透過傳入參數的方式，減少重複撰寫程式碼，提升函式的彈性與複用性。
* 釐清創造函式與執行函式的時機，有利於函式程式設計，瞭解函式作用域、範圍鍊與閉包的原理。
* 設計函式程式時，盡量不要改變（Mutate）原始的資料（Data），注意物件傳參考的特性，以深拷貝（請見參考資料文章）或創造新物件的方式來傳遞資料。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-51
2. [[Javascript] 關於 JS 中的淺拷貝和深拷貝](https://larry850806.github.io/2016/09/20/shallow-vs-deep-copy/)
