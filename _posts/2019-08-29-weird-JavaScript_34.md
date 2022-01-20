---
title: Wierd JavaScript 34：閉包與回呼
tags:
- JavaScript
- Wierd JavaScript
date: 2019-08-29 10:03:03
---

如果你曾經使用過 jQuery 、 `setTimeout` 等 Callback Function，其實你已經使用過閉包的概念了。

<!-- more -->

### 閉包與回呼

以 `setTimeout` 這段程式碼作為範例：

```javascript
function sayHiLater(){
  var greeting = 'Hi!' ;

  setTimeout(function(){
    console.log(greeting) ;
  }, 3000) 

}

sayHiLater() ;
```

這段程式碼的執行結果為 **「3 秒鐘後印出字串 Hi!」**。

你有想過為什麼 3 秒後，回呼函式 `function(){console.log(greeting) ;}` ，為什麼能夠取用到外部詞彙環境的 `greeting` 嗎？明明函式 `sayHiLater()` 執行環境早就已經消滅。

這是因為閉包的機制會將 `greeting` 的值 `'Hi!'` 儲存在函式 `sayHiLater` 專屬的記憶體中，即便執行環境消滅、執行堆疊消失後，回呼函式在詞彙環境中仍然能夠取用到自由變數 `greeting` 的值 `'Hi!'` 。

我們在很遙遠的 05 篇中稍微提過**回呼（Callback）**這個概念，當時和**非同步**的概念綁在一起講。而這裡回呼函式 `function(){console.log(greeting) ;}` 同樣是**非同步回呼函式**，指的是**非同步事件中，當執行堆疊為空以後，檢視事件佇列，回頭執行的函式**。

而 `function(){console.log(greeting) ;}` 之所以匿名，是因為用了**一級函式**的概念，直接創造函式並丟入 `setTimeout` 中。

所以，仔細檢視這段程式碼的執行流程，應是這樣子的：

1. JS 引擎建立全域執行環境、 `window` 和 `this` 。
2. Creation & Hoisting : funciton `sayHiLater` 。
3. `sayHiLater()`，建立函式 `sayHiLater` 的函式執行環境，並執行程式內容。
4. `var greeting = 'Hi!'` ，宣告區域變數 `greeting` ，賦值為 `'Hi!'` 。
5. `setTimeout(function(){console.log(greeting)}, 3000)`，**創造**匿名（非同步回呼）函式 `function(){console.log(greeting)` ，並將 `setTimeout` 放進**事件佇列**，等到**執行堆疊為空**時再執行。 
6. 函式 `sayHiLater` 的程式內容結束，消滅其函式執行環境（但其記憶體空間不會被消滅）。
7. 全域執行環境結束，執行堆疊為空，檢視事件佇列裡的非同步事件。
8. 執行 `setTimeout` ，倒數 3 秒（3000 豪秒），計時開始。
9. 3 秒後，倒數完畢，執行回呼函式 `function(){console.log(greeting)` ，印出字串 `Hi!`。

<hr>

### 回呼函式（Callback Function）

{% colorquote warning %}
A function you give to another function, to be run when the other function is finished.
The function you called(invoked), 'calls back' by calling the function you gave it when finished.
{% endcolorquote %}

理解回呼函式，可以舉 A 函式與 B 函式來說明：我們在 A 函式中創造 B 函式，接著執行 A 函式，等到 A 函式執行結束後，才回頭呼叫 B 函式，此時 B 函式就是所謂的回呼函式。

簡言之，**回頭呼叫的函式，即回呼函式**（其所在的外部執行環境可能已經消滅）。

回呼函式也可以想成：**將 B 函式當作 A 函式的參數傳入，並在 A 函式中呼叫 B 函式**。

從非同步事件或 DOM 監聽事件的角度來看，回呼函式也是指**那些滿足特定條件才會被動觸發的函式**，如上例 `setTimeout` 或 Click 事件。

課程中，講師用下面這個例子來解釋回呼函式：

```javascript
function tellMeWhenDone(callback){

  console.log('Function tellMeWhenDone is done!') ;

  callback() ; // 執行回呼函式
}

// 創造一個匿名函式作為參數傳入函式 tellMeWhenDone
tellMeWhenDone(function(){
  console.log('Callback function is done!') ;
})
```

稍加改寫講師舉的例子，想一想，下面的回呼函式會印出哪一個名字？

```javascript
var name = 'Fei' ;

function tellMeWhenDone(callback){
  var name = 'Bai' ;
  console.log('Function tellMeWhenDone is done!') ;

  callback() ; 
}

tellMeWhenDone(function(){
  console.log(name) ;
})
```

<hr>

### 結論
* 回呼函式，即回頭呼叫執行的函式（其所在的外部執行環境可能已經消滅）。
* 回呼函式，也可以想成：將 B 函式當作 A 函式的參數傳入，並在 A 函式中呼叫 B 函式，則 B 函式為回呼函式。
* 回呼函式亦指那些滿足特定條件才會被動觸發的函式。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-49
2. [重新認識 JavaScript: Day 18 Callback Function 與 IIFE](https://ithelp.ithome.com.tw/articles/10192739)

