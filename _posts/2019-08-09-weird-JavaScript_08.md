---
title: Wierd JavaScript - 08：作用域、let 與區塊作用域
date: 2019-08-09 11:34:15
tags:
- Wierd JavaScript
---

小飛：「既然範圍鍊能讓函式向外部環境取用變數，那是不是把所有變數都存進全域就好了？」

恰恰相反！實務上，我們會**避免污染全域**，減少全域變數的產生。

<!-- more -->

## 為什麼要避免污染全域？
---

因為實務上，一支 JavaScript 腳本，也就是 `.js` 檔案，往往會由多位工程師協作撰寫，除此之外，一支 `.html` 檔案也有可能會載入多支 JS 腳本，在這些多人開發的情況下，如果不同開發者不小心在全域環境中使用了相同的變數名稱，那麼後撰寫或後載入的變數，就會覆寫既有變數的值，導致衝突，不易於管理。

所以，實務上我們會避免污染全域環境，減少全域變數的宣告。

小飛：「意思是盡量要把變數宣告進函式裡，成為區域變數囉？」

可以這麼說，我們利用作用域的特性，將變數存進函式區塊中，等到要用的時候再存取。**閉包（Closure）**的原理就是從這個概念出發的。我們之後會談到。

## 作用域（Scope）
---


> Where a variable is **available** in your code.


在 07 篇中我們就已經提過作用域：在函式內宣告的區域變數，只在該函式的執行環境內有效。

換個方式說，詮釋作用域可以詮釋為：**一個變數可以被取用的有效範圍**。

全域變數因為存在全域環境裡，所以能夠被任何函式取用，也就是範圍鍊的最外層。

區域變數因為被宣告在某一函式裡，所以只能夠在**該函式的執行環境內**被取用，當然，也能被該函式內的其他函式取用。

這裡要特別闡述「該函式的執行環境內」，指的是**大括號 `{ ... }` 所框出的範圍**。

所以，我們可以說，**函式是切分變數有效範圍（變數環境、作用域）的最小單位**。

在 **ECMAScript 第六版（俗稱 ES6）**發布以前，我們只能用 `var` 來宣告變數，於是會出現一些弔詭的現象，其中以下面這個範例最為經典：

> 我希望在五秒內，每一秒就印出一個數字，分別是 0、1、2、3、4 。



新手小飛可能會這樣寫：

```javascript
for(var i = 0 ; i < 5 ; i++){
  setTimeout(function(){
    console.log(i) ;
  }, 1000) ;
}
```

但是他會發現結果不如預期，這段程式碼執行的結果是：**「1 秒後印出五個 5」**。

<span style="font-size: 36px">OMG !! WHY ??</font>

這是因為，當我們在 `for` 迴圈中使用 `var` 來宣告 `i` 時，此時的 **`i` 會被存進全域環境**，成為全域變數。

真的？請接續上面程式碼，執行 `console.log(window.i)` ， JS 會回你 `5`。

這個例子還要結合**非同步回呼**的概念來解釋。還記得嗎？ JS 遇到需要時間處理的非同步事件（函式）時，他會先把它丟進事件佇列，等到執行堆疊為空後才處理。

`for` 跑第一次時， `var` 宣告 `i = 0` ，接著遇到 `setTimeout` ，JS 把 `setTimeout` 丟進事件佇列（因為等待 1 秒需要時間），接著迭代 `i++` 。然後，開始跑第二次 `for` ，由於經過 `var` 宣告的 `i` 是全域變數，此時 `i = 1` 會覆寫既有的 `0` ， 接著遇到 `setTimeout` ，JS 又會把 `setTimeout` 丟進事件佇列...

所以，跑到最後一次，也就是第五次 `for` 結束時， `i = 5` ，全域執行環境也沒東西了，JS 就會回呼執行事件佇列裡面的五個 `setTimeout` ，而此時 `console.log(i)` 裡的 `i` 自然而然等於 `5`，執行的結果就會印出「五個 5」了。

至於為什麼是「1 秒後」？而不是每 1 秒印出一個 5 ？那是因為 JS 執行很快，五個 `setTimeout` **在我們看來**幾乎同時執行。

所以整體執行結果就會是「1 秒後印出五個 5」。

對非同步回呼的概念應該比較熟悉了吧？

回到本篇重點，在這個經典範例中，用 `var` 宣告變數的弔詭現象就是：當我們在 `for` 迴圈中使用 `var` 來宣告 `i` 時，此時的 `i` 會被存進全域環境，成為全域變數。

仔細觀察會發現，`var i = 0` 並不在函式大括號 `{ ... }` 裡面，而是在 `for( ... )` 中，所以 `i` 自然會存進全域環境。

2015 年 ES6 新增的 `let` 宣告，將變數綁定在 `{ ... }` 區塊，更清楚、有效切分作用域和變數環境。



## let 與區塊作用域（Block Scope）
---

簡單來說， `let` 宣告有下列幾個特點：

1. 經過 `let` 宣告的變數，會將該變數環境綁定在其後的 `{ ... }` **區塊作用域**中，包括：
   * `function(){ ... }`
   * `for(){ ... }`
   * `if(){ ... }`


既然如此，我們就可以利用 `let` 改寫上面那一段程式碼，在 `for` 中利用 `let` 宣告 `i` ，將其作用域綁定在後方 `{ ... }` 中，達到我們預期的目的：

```javascript
for(let i = 0 ; i < 5 ; i++){
  setTimeout(function(){
    console.log(i) ;
  }, 1000 * i) ;　// 乘上 i 是為了延遲函式執行，得到「每 1 秒後」印出一個數字的效果。
}
```

經過 `let` 宣告的 `i` 作用域會被綁在 `{ ... }` 區塊中，當 JS 要把 `setTimeout` 丟進事件佇列時， `console.log(i)` 裡的 `i` 已經能夠取用區塊作用域裡的 `i` ，所以會連同 `i` 的值一起打包丟進事件佇列。等到 JS 最後執行時，就能夠印出  **「0、1、2、3、4」**。

必須特別強調的是，在 `for` 迴圈中，每次跑的區塊都是**獨立的**，也就是說，`for` 第一次跑的 `{ ... }` 和第二次跑的 `{ ... }` 並不一樣，每次經過 `let` 宣告的 `i` ，在電腦的記憶體位置也不一樣，所以才能被 `setTimeout` 取用並打包丟進事件佇列。

其實上面這段範例可以利用**立即執行函式運算式（IIFE）**解構成下面這段程式碼：

```javascript
// for 跑第一次所建立的 block （執行環境）
(function(){
  let i = 0 ;
  setTimeout(function(){
    console.log(i) ;
  }, 1000 * i) ;　
})() ;
// for 跑第二次所建立的 block （執行環境）
(function(){
  let i = 1 ;
  setTimeout(function(){
    console.log(i) ;
  }, 1000 * i) ;　
})() ;
//...
// for 跑第五次所建立的 block （執行環境）
(function(){
  let i = 4 ;
  setTimeout(function(){
    console.log(i) ;
  }, 1000 * i) ;　
})() ;
```

2. 經過 `let` 宣告的變數，無論在哪宣告，都不會被存進全域環境，即便宣告在全域中。 

直接用程式碼印證：

```javascript 
let animal = 'giraffe' ;
console.log(animal) ; // giraffe
console.log(window.animal) ; // undefined（window.animal 找不到任何值）
```

**雖然不會被存進全域，但可以被參考取用：**

```javascript 
let animal = 'giraffe' ;

function outer(){
  let perosn = 'Fei' ;
  console.log(animal) ; // giraffe

  function inner(){
    console.log(animal) ; // giraffe
    console.log(perosn) ; // Fei
  }

  inner() ;
}

outer() ;
```

3. 在同個區塊作用域中，只能用 `let` 宣告一次，且宣告後在區塊中可以被覆寫。

```javascript 
let animal = 'griaffe' ;

function test(){
  let animal = 'tiger' ;
  console.log(animal) ; // tiger 
  animal = 'lion' ;
  console.log(animal) ; // lion 
}

test() ;
console.log(animal) ; // giraffe  
let animal = 'panda' ; // Uncaught SyntaxError: Identifier 'animal' has already been declared
animal = 'panda' ;
console.log(animal) ; // panda
```

不同區塊作用域中，當然可以用相同名稱 `let` 宣告變數，因為**區塊不同， `let` 宣告的變數所佔據的記憶體位置就不同**。

4. 經過 `let` 宣告的變數沒有 Hoisting 的特性。

```javascript 
console.log(animal) ; // Uncaught ReferenceError: Cannot access 'animal' before initialization
let animal = 'griaffe' ; 
```

實務上，現在我們多以 `let` 宣告來取代 `var` ，避免對全域環境的污染。

此外， ES6 還有新增另一種語法 **`const` 常數宣告**，它的特點幾乎與 `let` 相同，唯一不同的是，**經過 `const` 宣告的變數無法被覆寫（具有唯讀性）**，最常被用在賦值 DOM 元素。



## 結論
---
* 實務上，我們會避免污染全域，減少全域變數的衝突發生。
* 當今我們多用 `let` 宣告取代 `var` 來避免污染全域。
  * 經過 `let` 宣告的變數，會將該變數環境綁定在 `{ ... }` 區塊作用域中。
  * 經過 `let` 宣告的變數，無論你在哪裡宣告，都不會被存進全域環境。
  * 經過 `let` 宣告的變數沒有 Hoisting 的特性。
  * 在同個區塊作用域中，只能用 `let` 宣告一次，且宣告後在區塊中可以被覆寫。
* 總而言之，函式區塊是切分變數環境（也就是變數作用域）的最小單位。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 2-17、2-18
2. [MDN：let](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let)
3. [MDN：const](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/const)
4. [談談 JavaScript 的 setTimeout 與 setInterval](https://kuro.tw/posts/2019/02/23/%E8%AB%87%E8%AB%87-JavaScript-%E7%9A%84-setTimeout-%E8%88%87-setInterval/)
5. [你懂 JavaScript 嗎？#12 函式範疇與區塊範疇（Function vs Block Scope）](https://cythilya.github.io/2018/10/19/function-vs-block-scope/)



