---
title: Wierd JavaScript 23：陣列
tags:
- JavaScript
- Wierd JavaScript
date: 2019-08-17 12:04:27
---

講了那麼多的物件和函式，現在終於輪到不可或缺的邊緣人－陣列。

<!-- more -->

### 陣列（Array）

陣列屬於物件型別的次型別，又稱**陣列物件**，它的內容可以是**任何東西的集合**。

也就是說，我在陣列裡面可以放任何的資料型別，包含字串、數字、布林、物件、函式物件、甚至另一個陣列。

```javascript
var arr = [
  'Bai',
  false,
  function(name){
    console.log('Hola! ' + name) ;
  },
  5566,
  {
    mom: 'Linda',
    city: 'Taipei',
    isCute: true
  },
  ['Eat','Sleep','Play Games']
]
console.log(arr) ;
```

我們知道物件是 Name/Value Pairs 的集合，其實陣列物件也是同樣的道理，只是它用**索引值（Index）**取代了 Name。

陣列的索引值由左至右從 `0` 開始，如果把上面的程式碼想像成陣列物件如下：

```javascript
var arr = [
  0: 'Bai',
  1: false,
  2: function(name){
    console.log('Hola! ' + name) ;
  },
  3: 5566,
  4: {
    mom: 'Linda',
    city: 'Taipei',
    isCute: true
  },
  5: ['Eat','Sleep','Play Games']
]
```

我們可以透過**取用運算子 `[]`** 搭配索引值來取用物件內的資料。注意！**物件的點運算子在陣列中是不能使用的**。

```javascript
arr.2(arr.4.mom) ; // SyntaxError: Unexpected number
arr[2](arr[4].mom) ; // Hola! Linda
```

<hr>

### 結論
* 陣列屬於特殊的陣列物件，它可以是任何資料型別的集合。
* 我們可以利用取用運算子 `[]` 搭配陣列索引值來取用陣列裡的資料。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 4-38 

