---
title: Wierd JavaScript 20：函式陳述式與函式表達式
tags:
- JavaScript
- Wierd JavaScript
date: 2019-08-15 11:24:26
---

 JavaScript 的兩種句型：陳述式和表達式。

<!-- more -->

### 表達式（Expression）

{% colorquote info %}
A unit of code that **results in a value**.
It doesn't have to save to a variable.
{% endcolorquote  %}


表達式的**執行結果會回傳一個值**，而該值不一定要賦予給任一變數。譬如運算、賦值、呼叫函式等等。

```javascript
a = 55 ; // 55
5 * 6  ; // 30
'a' + 'b' ; // 'ab'
false + 100 ; // 100
```

<hr>

### 陳述式（Statement）

{% colorquote info %}
A unit of code that would not result in a value.
{% endcolorquote  %}

陳述式的執行結果不會回傳值。譬如 `var` 宣告、函式宣告、 `switch` 判斷、 `{}` 函式區塊、 `break` 等等。

有些陳述式會需要表達式產生值後才能運作，譬如 `if` 。

```javascript
var a ;
if(a === 3){ ... } // 其中 a === 3 屬於表達式，若回傳 true ，執行 {} 內程式碼
```

**函式陳述式**也就是函式宣告。我們在 04 篇說過，函式宣告在全域環境具有 Hoisting 的效果，能在宣告之前呼叫函式。

```javascript
greet() ;
function greet(){
  console.log('Function declaration statement would be hoisted in JS.')
}
// greet() 函式物件的名稱屬性： greet
// greet() 函式物件的程式屬性： { console.log('Function declaration statement would be hoisted in JS.') }
```

<hr>

### 函式表達式（Function Expression）

既然**函式**屬於一種特殊的**函式物件**，當然能夠**被賦予給任一變數**，這樣的方式稱為函式表達式。

唯要特別注意的是，將函式物件於賦予任一變數後，我們**就能用該變數名稱參照到該函式物件**，因此在表達函式物件時，不需要另外定義函式物件的名稱屬性，也就是說，必須使用**匿名函式（Anonymous Function）**來表達函式物件。

然而，函式表達並非函式陳述，因此並沒有 Hoisting 的效果，必須等到變數被賦予函式物件後，才能用該變數呼叫函式。

```javascript
anonymousGreet() ; // anonymousGreet is not a function ; anonymousGreet 會先被宣告為 undefined！
var anonymousGreet = function(){
  console.log('Function expression could be anonymous.')
}
anonymousGreet() ; // 必須等到賦予函式物件後才能呼叫
```

<hr>

### 一級函式與函式表達

在 JS 中，由於一級函式的特色，我們可以將一個函式物件當作另一個函式的參數，丟進函式中執行。

結合函式表達的概念，我們能將一個儲存函式物件的變數當作參數丟進另一個函式中，並在函式中呼叫該函式：

```javascript
var greet = function(num1,num2){
  console.log(num1 + num2) ;
}

call(greet) ;
function call(a){
  a(55,66) ; // 121
}
```

當然，我們也可以立即創造一個函式，將它當作參數丟進另一個函式並執行：

```javascript
call(function(name){
  console.log('Hola! '+ name)
}) ;

function call(a){
  a('John') ; // Hola! John
}
```

<hr>

### 結論
* 表達式的執行結果會回傳一個值；陳述式的執行結果不會回傳值。
* 函式陳述式指的是函式宣告，在全域環境中具有 Hoisting 特性，能夠在宣告之前呼叫。
* 函式表達式指的是將一個函式（物件）賦予任一個變數。
* 結合一級函式的特色，參考到函式物件的變數可以被當作參數丟進另一個函式中執行並回船結果。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-35
2. [MDN：Statements and declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
3. [MDN：Function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)



