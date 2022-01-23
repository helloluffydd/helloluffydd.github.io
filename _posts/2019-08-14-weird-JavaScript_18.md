---
title: Wierd JavaScript - 18：JSON v.s. 物件
tags:
- Wierd JavaScript
date: 2019-08-14 11:39:11
---

什麼？你說 JSON 就是物件？大錯特錯！

<!-- more -->

## JSON
---

JavaScript 物件表示法（JSON， JavaScript Object Notation），是一種輕量的資料交換語言，用來傳輸 Name/Value Pairs 所組成的資料物件。JSON 雖然屬於 JavaScript 中的子集，但是獨立於 JS 環境，可以被許多程式語言支援、解析，副檔名為 `.json`。

相較於 XML（Extensible Markup Language），由於 JSON 更加**輕便、簡潔明瞭（在傳輸上不會浪費過多的頻寬，效率更高）**，當今開放資料多半以 JSON 格式開源，然而由於格式特性，兩者使用上還是有慣用的語言環境。JSON 常見於 JavaScript、Java、Node.js ，而 XML 常見於 PHP、C# 等網頁應用。

JSON 格式：

```json
{
  "name": "John",
  "age": 28,
  "sex": "male",
  "isStudent": false
}
```

XML 格式：

```xml
<?xml version="1.0"?>
<object>
  <name>John</name>
  <age>28</age>
  <sex>male</sex>
  <isStudent>false</isStudent>
</object>
```



## JSON與Object的比較
---

JSON 和 JS 物件的格式差異在於，**JSON 中的 Name/Value 一定要用雙引號 `""` 包覆**，JS Object 則沒有規定。 

JSON 格式：

```json
{
  "name": "John",
  "age": 28,
  "sex": "male",
  "isStudent": false
}
```

JS 物件格式：

```javascript
var obj = {
  name: 'John',
  age: 28,
  sex: 'male',
  isStudent: false
}
```



## JSON轉Object
---

JavaScript 內建 `JSON.parse()` 指令，能將 **JSON 格式的字串（String）轉換成 JS 物件**。

```javascript
var obj = JSON.parse('{"name":"John","age": 28,"sex": "male","isStudent": false}') ;
console.log(obj) ; // Object: {name: "John", age: 28, sex: "male", isStudent: false}
```



## Object轉JSON
---

JavaScript 內建 `JSON.stringify()` 指令，能將 **JS 物件換成 JSON格式的字串（String）**。

```javascript
var json = JSON.stringify({
  name: 'John',
  age: 28,
  sex: 'male',
  isStudent: false
}) ;
console.log(json) ; // JSON String: {"name":"John","age":28,"sex":"male","isStudent":false}
```



## 結論
---
* JSON 是一種發想於物件實字的輕量化資料交換格式，常見於開放資料。
* 和物件格式不同的是，JSON 中的 Name/Value **一定要**用雙引號 `""` 包覆。
* `JSON.parse()` 能將 JSON 字串轉換成 JS 物件。
* `JSON.stringify()` 能將 JS 物件轉換成 JSON 字串。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-33
2. [維基百科：JSON](https://zh.wikipedia.org/wiki/JSON#举例)
3. [維基百科：XML](https://zh.wikipedia.org/wiki/XML#%E7%BB%93%E6%9E%84)

