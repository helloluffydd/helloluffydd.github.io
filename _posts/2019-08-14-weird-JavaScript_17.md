---
title: Wierd JavaScript - 17：偽裝命名空間
tags:
- Wierd JavaScript
date: 2019-08-14 11:02:40
---

當我們想要用相同的變數名稱來代指相似的資料，可以利用物件來建立偽裝的命名空間，避免資料被覆寫。

<!-- more -->

## 命名空間（Namespace）
---

> A container for variables and functions.
> Typically to keep variables and functions with the same name seperate.



命名空間指的是一個程式語言中**儲存變數與函式名稱的容器**，它的功用在於分離相同名稱的變數與函式。

然而， **JavaScript 沒有 Namespace** 這項功能。因此，當我們想要用同一個變數名稱來指涉相似的資料，後者所定義的值，往往會覆蓋掉前面所定義的值。

```javascript
var greet = 'Hello!' ;
var greet = 'Hola!'  ;
console.log(greet) ; // Hola!
```

解決這樣的方法就是，借助物件的特性，**假裝創造各自獨立的命名空間**。



## 偽裝命名空間
---

利用物件實字 `{}` 建立新物件，並將相同變數分別儲存進不同的物件中。

此時，即便我們擁有兩個相同的變數名稱，但因為分屬不同物件，兩者都會被存進電腦記憶體，各自獨立存在，不會被覆寫。

```javascript
var greetEng = {} ;
var greetSpn = {} ;
greetEng.greet = 'Hello!' ;
greetSpn.greet = 'Hola!'  ;
console.log(greetEng.greet,greetSpn.greet) ; // Hello! Hola!
```

注意！如果想在物件中建立一個新的物件，必須**先宣告（初始化）物件**，才能將變數或函數存進去，否則 JS 會因為找不到該物件，而將物件判定為 `undefined` ，以致取用運算子失效。

```javascript
  var greetEng = {} ;
  greetEng.greet = 'Hello!' ;
  // greetEng.say = {} ; 先宣告物件就可以執行
  greetEng.say.morning = 'Good morning!' ; // cannot set property of undefined 
```



## 結論
---
* 命名空間指的是一個程式語言中儲存變數與函式名稱的容器，但 JavaScript 並沒有這項功能。
* 在 JS 中，當我們想要用同一個變數名稱來指涉相似的資料，可以利用物件來偽裝命名空間。
* 必須先宣告（初始化）物件後，才能開始在物件中新增屬性或方法。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-32


