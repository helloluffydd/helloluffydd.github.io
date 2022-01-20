---
title: Wierd JavaScript 10：基本型別（純值）與物件型別
date: 2019-08-10 14:14:00
tags:
- JavaScript
- Wierd JavaScript
---

JavaScript 將資料分為基本型別與物件型別兩類，那麼 JS 內建的資料型別到底有幾種呢？

<!-- more -->
  
<hr>

### 資料型別（Data Type）

其實在 02 篇就已經大概介紹過，在 JavaScript 中，資料型別分為兩類：

1. 基本型別／原始型別（純值）
2. 物件型別（物件）

也就是說，在 JS 中，所有的**值（Value）**都是**純值**或**物件**。

更精闢一點地說，**所有的值，都是物件**。（這個概念比較進階，等到我們更深入瞭解物件後，就能理解。）

這篇主要介紹這兩大資料型別。

<hr>

### 基本型別（Primitive）

{% colorquote info %}
A type of data that represent **a single value**.(Not an object)
{% endcolorquote %}

基本型別，又稱**原始型別**，又細分為六種，每一種都是**值（Value）**，因此基本型別指的就是：**「純值」**。

什麼意思？相較於**物件**作為 **Name/Value 的集合體**，基本型別就只有它這個**值（Value）**。

而這六種值分別是：

#### 字串（String）

{% colorquote info %}
a sequence of characters.
{% endcolorquote %}


用**單引號（'Fei'）**或**雙引號（"Fei"）**包覆的內容就屬於字串，如 `'Fei'` 、 `'5566'` 、 `"True"` 、 `'undefined'` 等等。

注意！單引號與雙引號混用是不被接受的： ~~`"Fei'`~~ 。

我會推薦使用**單引號（''）**來表達字串，因為使用雙引號的話，如果字串內容遇到雙引號或其他特殊字元，就必須作**跳脫字元（Escape Character）**處理，單引號少有這樣的衝突。如下範例：

```javascript
var noteA = '"JavaScript" is not equal to "Java"!!' ;
var noteB = ""JavaScript" is not equal to "Java"!!" ;
console.log(noteA) ;　// "JavaScript" is not equal to "Java"!!
console.log(noteB) ;　// SyntaxError: Unexpected identifier

// 利用反斜線（\）跳脫字元後，noteB 即可執行：
var noteB = "\"JavaScript\" is not equal to \"Java\"!!" ;
```

#### 數字（Number）

{% colorquote info %}
floating point number.
Unlike other programming languages, there's only one 'number' type.
{% endcolorquote %}

和其他語言不同， JavaScript 的數字型別都屬於**浮點數（Float）**。

除了常見的整數或小數，JS 還包含一些特別的數字：

* `Infinity`（無限大）
* `-Infinity`（無限小）
* `NaN`（不是數字，Not a Number）

任何正數除以 `0` 都會得到 `Infinity` ；反之，任何負數除以 `0` 都會得到 `-Infinity`。

`Infinity` 除以 `Infinity` 會得到 `NaN`。

`0` 除以 `0` 也會得到 `NaN`。

其實，只要任何運算中出現 `NaN` ，結果都會是 `NaN`。

 `NaN` 甚至不等於自己，更別說等於任何數字。但是， `NaN` 還是屬於**數字型別（Number）**。

如果你想判斷一個變數或值是不是 `NaN` ，可以用 `isNaN()` 來判斷。

```javascript
console.log(NaN === NaN) ; // false
console.log(NaN === 100) ; // false
isNaN('NaN') ; // true ；因為 'NaN' 無法轉成其他數字。
typeof NaN ; // Number ；NaN 屬於數字型別（Number）。
```

回到數字型別本身，由於 JS 對 Number 的處理採用的是「[IEEE 754](https://zh.wikipedia.org/wiki/IEEE_754)」二進位浮點數算術標準，在運算上會出現極其微小的誤差，導致某些運算式的判斷會令人不解，經典案例如下：

```javascript
console.log(0.1 + 0.2 === 0.3) ; // false
```

#### 布林值（Boolean）

{% colorquote info %}
true or false
{% endcolorquote %}

~~斯斯有三種，但~~ Boolean 只有兩種值： `true`（是） 和 `false`（否）。

Boolean 多被用來判斷運算式，藉此控制流程，決定要不要做某一件事，譬如 `if` ：

```javascript
var a = 55 ;
var b = 66 ;
if(a > b){　// 55 > 66 不成立， a > b 會被轉成 false 代入 if，因此 if(false)
  console.log('a is LARGER than b.') ;  // 這段不會執行。
}else{
  console.log('a is SMALLER than b.') ; // 執行這段，印出 a is SMALLER than b.  
}
```

在 JavaScript 中，判斷或比較的運算式能夠被隱性轉型成 Boolean ，好比上面這段程式碼中的 `` ，詳細我們不久後就會提到。

#### 空值（Null）

{% colorquote info %}
null represents lack of exitence.
{% endcolorquote %}

Null 只有 `null` 這個值，指的是，該變數存在於 JS（記憶體） 中，**已經被宣告，可能曾經有值，但現在沒有值**。

如果你不想讓一個變數有前述三種值，那麼將它設定為 `null` 是**可以被接受的**，因為在必要時，它會被 JS **強制轉型**成 `0` 進行運算。請看下方程式碼：

```javascript
var num = 5566 ;
var nul = null ;
var und = undefined ;
console.log(num + nul) ; // 5566
console.log(num + und) ; // NaN　ˊ<_ˋ...??????
```

#### 未定義（Undefined）

{% colorquote info %}
Undefined represents lack of existence.
{% endcolorquote %}


Undefined 只有 `undefined` 這個值，指的是，該變數存在於 JS（記憶體） 中，**已經被宣告，但尚未被賦值**。

一個變數如果是 `undefined` ，代表變數沒有其他值（字串、數字、null等等），才會被賦值為 `undefined`。

還記得 Hoisting 嗎？ JS 在 Hoisting 階段時，會先幫我們宣告變數並賦予 `undefined` ，等到它真正執行後，才真正賦值。

我們可以說， `undefined` 是 JS 用來告訴我們**變數未被賦值**的狀況。

注意！請不要將變數賦值為 `undefined`，因為它需要運算時，會被 JS **強制轉型** 為 `NaN` ，如上方範例。

所以， `undefined` 真正的意涵，表示**變數佔據記憶體位置**，但是變數還沒有被賦予其它值。

總結來說，對 JS 而言， `null` 與 `undefined` 具有**值不存在**的意思，但實際上兩者在功能與運算仍有差異，不然何必無緣無故設計兩種型別呢？

#### Symbol（ES6 新增的型別）

{% colorquote info %}
Used in ES6. We won't talk about this here...
{% endcolorquote %}


ES6 後才新增的型別，因為不常見~~（我也還不會用）~~，這裡先不談。

最後，在介紹物件型別之前，我要先簡單介紹一個很重要的觀念：

在 JavaScript 中，**基本型別（上述六種值）**的變數賦值或拷貝（Copy）大部分是以**傳值（by Value）**的方式實現。

聽不懂？沒關係，我們會再細談的。

<hr>

### 物件型別（Object）

相較於基本型別有六種（純值），物件型別只有一種，就是**物件（Object）**。

什麼是物件？我們說過，物件是**Name/Value（鍵值配對） 的集合體**，每一對 Name/Value 都是物件的**屬性（Property）**，其中， Value 可以是其他純值或物件。

創造物件有很多種方式，最常見的是**物件實字（Object Literal）**，我們用程式碼來看會比較清楚：

```javascript
var person = {
  // Property: 一組 Name/Value ，其中 Value 是'Fei'（純值）
  name: 'Fei', 
  // Property: 一組 Name/Value ，其中 Value 是一個物件。
  family: {
    dad: 'Jason',
    mom: 'Teresa'
  }
} ;
```

好，重點來了！物件型別只有一種，就是物件（Object），但它擁有**次型別（subtype）**，常見的有這兩個：

* **陣列（Array）**，又稱為陣列物件。
* **函式（Function）**，又稱為函式物件。

當然還包括其他次型別物件，等我們有遇到再介紹。

所以，物件內容其實可以很複雜：

```javascript
var person = {
  // Property: 一組 Name/Value ，其中 Value 是'Fei'（純值）
  name: 'Fei', 
  // Property: 一組 Name/Value ，其中 Value 是一個物件。
  family: {
    dad: 'Jason',
    mom: 'Teresa',
    bro: 'Bai'
  },
  // Property: 一組 Name/Value ，其中 Value 是一個陣列，因為陣列也屬於物件的一種。
  friends: ['Shiba','giraffe','Fish'],
  // Method: 一組 Name/Value ，其中 Value 是一個函式，因為函式也屬於物件的一種。
  say: function(){
    console.log('Welcome to my blog!!') ;
  }
} ;
```

物件中的函式 ，我們稱之為物件的**方法（Method）**，既然是 function ，當然可以呼叫。

使用**點運算子（.）**取用物件內的屬性或方法：

```javascript
console.log(person.name) ; // Fei
person.say() ; // 'Welcome to my blog!!'
```

之後我們會更深入探討陣列、函式與物件的關係。

簡言之，物件擁有一組以上的**屬性（Property）**或**方法（Method）**，而屬性和方法也必然符合「鍵值配對」法則。

最後，在進到結論之前，我要先簡單介紹一個很重要的觀念：

在 JavaScript 中，**物件型別（也就是物件這一種值）**的變數賦值或拷貝（Copy）大部分是以**傳參考（by Reference）**的方式實現。

**傳值（By Value）**和**傳參考（By Reference）**是 JavaScript 處理資料的運作邏輯，也是它偷偷不告訴你的事情之一。

<hr>

### 結論
* 在 JS 中，所有的值（Value）都是純值或物件。
* JS 內建的資料型別分兩大類，分別是基本型別與物件型別。
* 基本型別（Primitive）有六種：
  * 字串（String）
  * 數字（Number）
  * 布林值（Boolean）
  * 空值（Null）
  * 未定義（Undefined）
  * 符號（Symbol，ES6 新增的型別）
* 物件型別（Object）只有一種，就是物件（Object）。
* 物件型別包含陣列、函式等次型別，它們都屬於特殊的物件。
* 所以，JS 內建的資料型別總共有 7 種：6 種純值 + 1 種物件。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-20
2. [重新認識 JavaScript: Day 03 變數與資料型別](https://ithelp.ithome.com.tw/articles/10190873)
3. [重新認識 JavaScript: Day 04 物件、陣列以及型別判斷](https://ithelp.ithome.com.tw/articles/10190962)
