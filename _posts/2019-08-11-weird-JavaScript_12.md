---
title: Wierd JavaScript 12：運算子的優先性與相依性
date: 2019-08-11 17:28:16
tags:
- JavaScript
- Wierd JavaScript
---

瞭解運算子的優先性與相依性，我們才知道許多種類的運算子擺在一起時，誰會先處理？從哪裡開始處理？

<!-- more -->


### 優先性（Operator Precedence）

{% colorquote warning %}
Which operator function gets called first.
{% endcolorquote %}


運算子的優先性指的是，哪一個運算子會優先被 JS 引擎呼叫執行？

也就是說，許多運算子擺一起時， **JS 會先執行擁有較高優先次序的運算子**。

以算術運算子為例，很常見的「先乘除後加減」在 JS 亦如是：

```javascript
// 乘法、除法在 JS 中的優先次序為 14 。
// 加法、減法在 JS 中的優先次序為 13 。
// 賦值在 JS 中的優先次序為 3 。 
// 因此 4 * 5 會先被執行，而後為 3 + 20 ，得到 23 ，會後賦值給變數 num。
var num = 3 + 4 * 5 ; 
console.log(num) ; // 23
```

<hr>

### 相依性（Operator Associativity）

{% colorquote warning %}
What order operator functions get called in: **Left-to-right** or **Right-to-left**.
When operator functions have the same precedence. 
{% endcolorquote %}

相依性指的是，**當運算子具有相同優先性時，運算子執行的方向為何？**分為兩種：

* **左相依性（Left-to-right）**
* **右相依性（Right-to-left）**

我們在上一篇中提到運算子執行的方向性，即相依性，用以判斷優先性相同的情境。

以賦值運算子為例，請看下方程式碼：

```javascript
// 賦值在 JS 中的優先次序為 3 ，屬於右相依性（從右邊開始往左邊看）。 
var a = 3 , b = 4 , c = 5 ;
a = b = c ; 
// c 會將值 5 向左賦值給 b 使其為 5，又 b 向左賦值給 a 使其為 5，以致 a、b、c 最後的值都是 5。
console.log(a) ; // 5
console.log(b) ; // 5
console.log(c) ; // 5
```

<hr>

### 結論
* 運算子的優先性指的是，JS 會處理擁有高優先次序的運算子。
* 運算子的相依性指的是，當運算子具有相同優先次序時，運算子執行的方向。
* 運算子的優先性與相依性可以參考 [MND 所整理的表格](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-22
