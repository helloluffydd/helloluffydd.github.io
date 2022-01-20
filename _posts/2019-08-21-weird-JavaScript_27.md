---
title: Wierd JavaScript 27：自動插入分號
tags:
- JavaScript
- Wierd JavaScript
date: 2019-08-21 12:10:21
---

JavaScript 的語法解析器會自動幫我們加上分號，這有時候可能會造成一些問題。

<!-- more -->

### 分號（Semicolon）

先前提過， JavaScript 的語法解析器會幫助我們轉譯程式碼，在過程中也會自動幫我們處理一些事情，進而改變我們的程式碼。

其中一件事是，JS 引擎會**自動幫我們插入分號（Automatic Semicolon Insertion）**。

分號 `;` 在 JavaScript 中沒有任何語意，它的功能是**表示語法段落的結束**。

有寫過 JavaScript 一段時間的人或許會發現，分號在程式碼中並不是必要的，這是因為 **JS 引擎會自動幫我們在必要的地方加上分號**。

譬如 `return` 後面要接的應該是一段表達式，但如果你沒有補上表達式，直接按下 Enter 鍵至下一行繼續撰寫程式碼，JS 會偵測到 `return` 後方的 `carriage return`（按下 Enter 鍵所產生的字元），以為你已經表達完 `retrun` 陳述，因此自動幫你補上分號，確保 `return` 陳述句有效，即什麼都不做（回傳空值），最後讓電腦執行。

舉例來說，你寫的程式碼是這樣：

```javascript
function getName(){
  return 
  {
    name: 'Fei'
  }
}

getNam() ; 
```

但 JS 語法解析後會變成這樣：

```javascript
function getName(){
  return ;
  {
    name: 'Fei'
  }
}

getNam() ; 
```

在上例中，原本我們預期想要得到一個物件，執行結果卻是 `undefined` 。這是因為 `return` 後面接著按下 Enter 所產生的 `carriage return` ，所以 JS 語法解析會自動幫我們補上分號，確保語法正確。

我們可以把將物件的左括弧 `{` 接在 `return` 後方，確保 JS 解析語法時，瞭解我們的陳述尚未結束，會接續到下一行。

```javascript
function getName(){
  return {
    name: 'Fei'
  }
}

getNam() ; 
```

此時就能如期回傳物件 `{name: 'Fei'}` 。

<hr>

### 結論
* 在 JavaScript 中，分號不是必要的，但仍**建議在預期的地方加上分號**，避免 JS 引擎解析語法時自動補上所導致的錯誤。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-42
2. [Javascript 分號戰爭](https://medium.com/cypressyi-technote/javascript-%E5%88%86%E8%99%9F%E6%88%B0%E7%88%AD-4652b218bdf9)



