---
title: Wierd JavaScript 38：古典繼承 v.s. 原型繼承
tags:
- JavaScript
- Wierd JavaScript
date: 2019-09-07 18:33:03
---

與其他程式語言不同，JavaScript 採用原型繼承的方式，將所有物件串聯起來！

<!-- more -->

### 物件導向（Object Oriented）

JavaScript 是屬於**物件導向**的程式語言。

物件導向，指的是，在 JavaScript 中，**物件**被視為程式組成的基本單元，而且物件之間彼此都會透過**繼承**的方式互相連結，產生關係，以便資料互相傳遞、取用。

<hr>

### 繼承（Inheritance）

{% colorquote info %}
One object gets access to the properties and methods of another object.
{% endcolorquote %}

繼承，指的是**一個物件取用另外一個物件的屬性或方法**。

假設我有兩個物件 `ObjA` 與 `ObjB` ， `ObjA` 繼承了 `ObjB` ，那麼，我就能在 `ObjA` 中取用 `ObjB` 的屬性與方法。

也就是說，當我們創造一個物件時，JS 引擎其實已經將它與另外一個物件**連起來**，而這個連起來的機制，就是所謂的繼承。

而繼承的方式，主要分為**古典繼承**與**原型繼承**兩類。

<hr>

### 古典繼承（Classical Inheritance）

古典繼承是當代非常主流而熱門的繼承方式， **Java** 、 **C#** 等程式語言都是採用古典繼承的設計機制。

古典繼承的特點在於相當口語化（Verbose），而且有非常多的方法可以使用，譬如：

* Friend（夥伴）
* Protected（保護）
* Private（私用）
* Interface（介面）

但古典繼承的弱勢在於，必須瞭解上述規範的方法，才能輕易使用它。

除此之外，古典繼承採用樹狀結構的設計模式，當繼承物件數量增加時，很容易將物件集合成一個大熔爐，讓人搞不清楚內部物件詳細的連結方式。古典繼承好比一棟設計複雜的房子，當你想要換燈泡的時候，卻發現馬桶開始沖水，就好像，修改了 A 物件，卻非預期地影響了 B 物件。

<hr>

### 原型繼承（Prototypal Inheritance）

相較於古典繼承，原型繼承較簡單易懂（Easy to understand），且具備彈性（Flexible）、可延展（Extensible）等優勢。

而 **JavaScript** 正是透過**原型繼承**的方式，將所有物件都串聯起來。

往後幾篇會介紹 JS 的原型以及繼承機制。

<hr>

### 結論
* 繼承，指的是一個物件取用另外一個物件的屬性或方法。
* JavaScript 屬於物件導向的程式語言，它透過原型繼承的方式，將所有物件都串聯起來。

### 參考資料
1. JavaScript 全攻略：克服 JS 奇怪的部分 5-53
2. [Wiki：物件導向程式設計](https://zh.wikipedia.org/wiki/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)
