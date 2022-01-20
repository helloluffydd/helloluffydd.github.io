---
title: Wierd JavaScript 13：強制型轉
date: 2019-08-12 14:39:25
tags:
- JavaScript
- Wierd JavaScript
---

強制型轉（Coercion）， JavaScript 偷偷幫我們處理但不告訴我們的事情之一。

<!-- more -->

### 強制型轉（Coercion）

{% colorquote warning %}
Converting a value from one type to another.
This happens quite often in JavaScript because it's dynamically typed.
{% endcolorquote  %}


由於 JavaScript 屬於動態型別的語言，語法對於資料型態並沒有嚴格的規範，以致型別之間的轉換相當容易，所以，**當碰到不同資料型別之間的運算或判斷時，JS 會（貼心？）偷偷幫我們轉換資料型別進行判斷**，這就是所謂的**強制型轉**。

JS 強制型轉的特色是有跡可循的，我們先從字串運算子講起。

#### 字串運算子（String Operator）

字串運算子中只有 `+` 這個運算子，它除了可以作為算術中的加法，還可以**串起兩邊的字串**。

字串運算子的重點在於，**只要 `+` 雙邊有一個資料屬於字串，那麼另一個資料就會被強制型轉為字串**，並串起兩字串。

```javascript
// + 串起兩字串
'哈囉你好嗎？' + '衷心感謝！' ; // 哈囉你好嗎？衷心感謝！
// + 串起數字與字串
'55' + 66 ; // 5566
55 + '66' ; // 5566
// + 串起布林與字串
false + 'true' ; // falsetrue 
```

注意！字串運算子只有 `+` 可以串起兩字串，沒有 `-` 這個運算子的！

最近看到這個 JavaScript is weird 的解析結果，試著結合運算子的優先性與相依性想想看：

```javascript
('b'+'a'+ +'a'+'a').toLowerCase() ;
// 'banana' ... JS 真的很怪 ...
```

#### 算術運算子

我們之前提過算術運算子用來處理基本的數學運算，但如果遇到的不是數字型別的資料呢？

請記得，**只要算術運算子中介的任一方屬於數字型別，那麼另一方除了字串型別以外，都會被轉成數字型別加以運算**。

```javascript
// + 對數字與布林進行運算
100 + true ; // 101　　
100 + false ; // 100
// + 對數字與 null 進行運算
100 + null ; // 100
// + 對數字與 undefined 進行運算
100 + undefined ; // NaN
// + 對數字與 NaN 進行運算
100 + NaN ; // NaN
```

由上方程式碼可見，某些特殊純值型轉為數字後的值：

* `true = 1`
* `false = 0`
* `null = 0`
* `undefined = NaN`

<hr>

#### 比較運算子

我們在系列第 11 篇中有說明比較運算子屬於**左相依性**，因此我們判斷時應該從左邊向右邊看，以這個神奇的範例說明 JS 的判斷原理：

```javascript
console.log(3 < 2 < 1) ; // true

// 上面這段程式碼在 JS 引擎看起來是這樣：
1. console.log((3 < 2) < 1) ; // 小於 < 屬於左相依性，先看 3 < 2 ，邏輯正確，回傳布林值 false。
2. console.log( false  < 1) ; // 再看 false < 1 ，比較布林值 false 與 1 ， false 會被強制型轉為 0。
3. console.log(    0   < 1) ; // 比較 0 與 1 ，邏輯正確，回傳布林值 true 。
```

### 嚴格等於

JS 強制型轉的特色讓不同的資料型態放在一起時得以被轉型運算，就某種角度來看，是非常強大的功能。但，也因為強制型轉的特性可能會導致非預期的 BUG，所以，在實務上，我們會以 **`===`（嚴格等於）**來判別兩資料在**值**與**資料型別**是否都**相同**，避免使用 `==`（寬鬆等於）只比較兩資料的值，讓 JS 強制型轉其中一方資料而出現錯誤。

[MDN：Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) 整理了兩數相等性的歸納表格，詳細內容可以點進去參考。

<hr>

### 結論
* 強制型轉指的是，JS 處理不同資料型別之間的運算或判斷時，會強制轉換資料型別進行處理。
* 在字串運算子中，若兩參數有一方是字串型別，則另一方也會被轉成字串型別，進行字串串連。
* 在算數運算子中，若兩參數有一方是數字型別，則另一方（字串除外）也會被轉成數字型別，進行數字計算。
* 在判斷運算子處理時，必須綜合考慮運算子的優先性、相依性以及 JS 強制型轉的特性。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-24、3-26

