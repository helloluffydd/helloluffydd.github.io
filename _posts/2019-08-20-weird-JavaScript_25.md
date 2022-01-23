---
title: Wierd JavaScript - 25：重載函式
tags:
- Wierd JavaScript
date: 2019-08-20 13:31:44
---

許多程式語言中都有重載函式的設定，但 JavaScript 卻沒有。為什麼？

<!-- more -->


## 重載函式（Function Overloading）
---

重載函式的意思是，**讓相同的函式擁有不同數量的參數**。

由於在 JavaScript 中，函式屬於特別的函式物件，並不支援重載函式的功能。

不過，也因為函式在 JavaScript 中具有**一級函式**的特色，我們可以利用預設值，或**將功能包裝成另一個函式**，在流程中呼叫。

```javascript
function greet(name, age, city){
  city = city || 'Taipei' ;
  if(city === 'Taipei') {
    console.log('Hello! I am ' + name + ', and ' + age + 'years old. I came from Taiwan.') ;
  }

  if(city === 'Tokyo') {
    console.log('Hello! I am ' + name + ', and ' + age + 'years old. I came from Japan ') ;
  }
}

function greetTaipei(name, age){
  return greet(name, age, 'Taipei') ;
}

function greetTokyo(name, age){
  return greet(name, age, 'Tokyo') ;
}

greetTaipei('Fei', 23) ;
greetTokyo('Bai', 28) ;
```



## 結論
---
* 在 JavaScript 中，函式屬於特別的函式物件，並不支援重載函式的功能。
* 在 JavaScript 中，由於一級函式的特性，我們可以利用預設值或包裝函式的方式，達到重載函式的目的。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-40



