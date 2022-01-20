---
title: Wierd JavaScript 09：動態型別
date: 2019-08-10 13:13:52
tags:
- JavaScript
- Wierd JavaScript
---

資料是程式語言之本，來談談 JavaScript 怎麼處理資料的？

<!-- more -->

### 動態型別（Dynamic Typing）

{% colorquote info %}
You don't tell the JavaScript engine what type of data a variable holds. 
It would figure it out while your code is running.  
{% endcolorquote %}


動態型別指的是，我們不需要特別宣告**變數**的資料型別，JS 引擎執行時，會根據我們所撰寫的程式碼環境，自動判定變數的資料型別，也就是說，**變數的資料型別可以輕易改變**。

基於這種檢查變數型別寬鬆、容許資料型別之間隱性轉換的特性，JavaScript 屬於**弱型別（Weakly Typed）**程式語言。

相對而言，變數型別檢查較為嚴格，且不能任意轉換型別的語言，就屬於**強型別（Strongly Typed）**，譬如 Java 。

~~什麼？你說 JavaScript 屬於 Java 的一種？？？~~

以 Java 為例，我們在宣告變數時，同時會定義該變數的資料型別，就像這樣：

```java
char     name   =  'Fei' ; // 定義該變數為字元（Text）
int      age    =  23    ; // 定義該變數為整數（Integer）
float    BMI    =  22.87 ; // 定義該變數為浮點數（Float）
boolean  isRich =  false ; // 定義該變數為布林值（Boolean）
```

在 Java 中，不同的資料型態是不能一起運算處理的，你必須手動幫資料轉型，才能順利執行。

```java
char a = '5566' ;
int  b = 520 ;
System.out.printIn(a + b) ; // error: incompatible types: String cannot be converted to int
System.out.printIn(Integer.parseInt(a) + b) ; // 6086 
```

相同的程式碼，在 JavaScript 裡面可以順利執行，因為 JS 引擎接受**隱性轉型**，會偷偷幫你轉換資料型別。

```javascript
var a = '5566' ;
var b = 520 ;
console.log(a + b) ; // 5566520（String） >///////<
```

仔細觀察 JS 的宣告方式，無論我們用 `var` 、 `let` 還是 `const` 宣告，**都只是在宣告一個變數**，並沒有針對變數型別進行定義。

變數的資料型別要等到 JS 開始執行，**變數被賦值後**，我們才能確定變數的型別。

也就是說，在 JavaScript 中，**變數（Variable）**本身並沒有區分資料型別，變數的資料型別取決於值本身，只有**值（Value）**才有資料型別的區分，分為**原始（Primitive）型別**與**物件（Object）型別**兩大類。

請記得！變數在 JS 中的功用，只是一個**代名詞**，代指某一個**值**或**物件**。

<hr>

### 結論
* 動態型別指的是，我們不需要特別宣告變數的資料型別，JS 會根據程式碼環境自動判定變數的資料型別。
* 弱型別指的是，程式引擎（語法解析器）檢查變數型別較為寬鬆、容許資料型別之間隱性轉換。
* 在 JavaScript 中，變數本身並沒有區分資料型別，值才有區分，分為基礎型別與物件型別兩大類，共七種值。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-19



