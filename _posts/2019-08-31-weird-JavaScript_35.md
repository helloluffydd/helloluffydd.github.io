---
title: Wierd JavaScript - 35：call()、apply()、bind()
tags:
- Wierd JavaScript
date: 2019-08-31 13:38:45
---

call() 、 apply() 、 bind() 都屬於函式的方法，可以用來改變函式中 this 代指的對象。

<!-- more -->

## call()
---

`call()` 用來**呼叫**函式，和我們平常使用 `()` 來呼叫函式是一樣的。

```javascript
var logPerson = function() {
  console.log(this) ;
  console.log('Call function log.') ;
} ;

logPerson.call() ;
```

當然， `call()` 不可能這麼無聊，它具有綁定 `this` 的功能。我們可以在 `()` 傳入一個參數，指定函式執行時 `this` 代表的對象。

```javascript
var person = {
  firstname: 'John',
  lastname: 'Doe',
  age: 28,
  personSay: function(){
    console.log('Hello! I am ' + this.firstname + ' ' + this.lastname) ;
  }
} ;

var logPerson = function() {
  console.log(this) ;
  this.personSay() ;
  console.log(this.age) ;
} ;

logPerson.call(person) ;
```

如果函式本身可以代入參數，可以在指定 `this` 的參數後方，也就是由第二個參數開始依序傳入。

```javascript
var person = {
  firstname: 'John',
  lastname: 'Doe'
} ;

var logPerson = function(para1, para2) {
  console.log(this) ;
  console.log(this.firstname + ' ' + this.lastname + ' likes ' + para1 + ' and ' + para2) ;
} ;

logPerson.call(person, 'writing', 'coding') ;
```

總結 `call()` 方法：

`Function.call(thisPara, para1, para2, ...)`

* `Function`：所欲**呼叫**的函式
* `thisPara` ：指定 `this` 的參數（通常是一個物件）
* `para1` 、 `para2` 執行函式的參數



## apply()
---

`apply()` 和 `call()` 的功能幾乎相同，能夠**呼叫**函式，第一個參數傳入指定 `this` 代指的對象，唯一的差別在於第二個參數只能傳入**陣列**。

```javascript
var person = {
  firstname: 'John',
  lastname: 'Doe'
} ;

var logPerson = function(para1, para2) {
  console.log(this) ;
  console.log(this.firstname + ' ' + this.lastname + ' likes ' + para1 + ' and ' + para2) ;
}

logPerson.apply(person, ['writing', 'coding']) ;
```

`call()` 和 `apply()` 的功用都是**呼叫**函式，可以搭配 IIFEs 一起服用：

```javascript
var person = {
  firstname: 'John',
  lastname: 'Doe'
} ;

(function(para1, para2) {
  console.log(this) ;
  console.log(this.firstname + ' ' + this.lastname + ' likes ' + para1 + ' and ' + para2) ;
}).call(person, 'writing', 'coding') ;

(function(para1, para2) {
  console.log(this) ;
  console.log(this.firstname + ' ' + this.lastname + ' likes ' + para1 + ' and ' + para2) ;
}).apply(person, ['writing', 'coding']) ;
```

總結 `apply()` 方法：

`Function.apply(thisPara, [arrayPara])`

* `Function` ：所欲**呼叫**的函式
* `thisPara` ：指定 `this` 的參數（通常是一個物件）
* `arrayPara`：執行函式的參數（必須為一個陣列）



## bind()
---

`bind()` 不會執行函式，而是**複製（拷貝）**函式，第一個參數傳入綁定 `this` 代指的對象。 `bind()` 結果通常會賦值給另一個變數（表達式）。

```javascript
var John = {
  firstname: 'John',
  lastname: 'Doe'
} ;

var Hai = {
  firstname: 'Hai',
  lastname: 'An'
} ;

var logPerson = function(para1, para2) {
  console.log(this) ;
  console.log('Hello! I am ' + this.firstname + ' ' + this.lastname) ;
}

var logJohn = logPerson.bind(John) ;
var logFei  = logPerson.bind(Fei) ;

logJohn() ;
logFei() ;
```

`bind()` 第二個參數以後傳入的值會逐一**綁定**相應的函式參數。

```javascript
function multiply(a, b) {
  return a * b ;
}

var multipleBySeven = multiply.bind(this, 7) ; // a = 7

// a 綁定為 7 ，往後傳入參數由 b 開始代入。
multipleBySeven(9)  ; // b = 9
multipleBySeven(12) ; // b = 12 

var  return30 = multiply.bind(this, 5, 6) ;

// a = 5 ; b = 6
return30() ;
```

總結 `bind()` 方法：

`Function.bind(thisPara, para1, para2, ...)`

* `Function` ：所欲**拷貝**的函式
* `thisPara` ：指定 `this` 的參數（通常是一個物件）
* `arrayPara`：綁定函式的參數（綁定後無法更改）



## 結論
---
* `call()` 、 `apply()` 、 `bind()` 請看各小節總結，或參考[CodePen 範例](https://codepen.io/luffy-chen/pen/yLNJgEB?editors=0011)。
* 若不想指定 `this` 變數，可以傳入 `this` 變數本身，如 `bind()` 中 `multiply(a, b)` 一例。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-50
2. [MDN：Function.prototype.call](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
3. [MDN：Function.prototype.apply](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
4. [MDN：Function.prototype.bind](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

