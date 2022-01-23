---
title: Wierd JavaScript - 28：空格
tags:
- Wierd JavaScript
date: 2019-08-21 12:52:30
---

在 JavaScript 中，怎麼使用空格，是門藝術。

<!-- more -->

## 空格（Whitespace）
---


> **Invisible characters** that create literal 'space' in your written code.
> Carriage return, Tab and Space.



空格在程式碼中表示**創造空間的隱形字元**，譬如 Enter 鍵、 Tab 鍵以及空白鍵。

JavaScript 語法解析器對空格的規範相當自由，且空格字元在程式中並不會被執行，善用空格可以幫助我們寫出可讀性高的程式碼。

雖然下面這段程式碼也是可以執行的，但我們通常不會用這種風格：

```javascript
var 
a
=
55 +
'66'
;
console.log(a) ; 
```

搭配註解 `//` 的使用，我們可以在程式碼中紀錄開發歷程。

```javascript
var 
  // first name of the person 
  firstname,

  // last name of the person
  lastname,

  // the language(can be 'en' or 'ch')
  language ;

var person = {
  firstname: 'Fei',
  lastname: 'Chen',
  language: 'ch'
}
```



## 結論
---
* 空格在程式碼中表示創造空間的隱形字元，譬如 Enter 鍵、 Tab 鍵以及空白鍵。
* 空格字元在程式中並不會被執行，善用空格可以幫助我們寫出可讀性高的程式碼。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-43


