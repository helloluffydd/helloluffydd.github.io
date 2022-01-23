---
title: Wierd JavaScript - 15：創造物件、物件實字
date: 2019-08-12 16:32:05
tags:
- Wierd JavaScript
---

請用物件實字法創造物件。

<!-- more -->

## 物件實字（Object Literals）
---

物件實字，就是用 `{}` 來創造一個新的物件，並直接在裡面定義我們所欲的 Name/Value Pairs。

```javascript
var favoriteFood = {
  name: 'Fei',
  delicacy: {
    taiwanese: ['oyster omelet', 'egg roll'],
    westerm: ['spaghetti','fried chicken'],
    japan: ['sashimi', 'ramen']
  },
  drink: ['bubble tea', 'latte'],
  moneyLeft: 877 
}
```

物件實字本身簡潔明瞭，是最常被用來創造物件的方法，其本身也可以**被當作參數傳入函式**：

```javascript
function callName(person){
  console.log('Hello! I\'m ' + person.name + '. I am ' + person.age + ' years old.') ;
}
callName({
  name: 'Fei',
  age: 23 
}) ;
```

### new Object() 

另一種方式是，用 `new Object()` 創造物件後，利用 `.` 或 `[]` 運算子一一新增所欲的屬性和方法，使用上不比實字表示法來得方便直覺。

```javascript
var John = new Object() ;

John.age = 30 ;
John.hobby = ['eat', 'sleep', 'working'] ;
John['residence'] = new Object() ;
John['residence']['city'] = 'Taipei' ;
John['residence']['district'] = 'Daan' ;
console.log(John) ;
```



## 結論
---
* 創造物件有兩種方式：利用物件實字 `{}` 或 `new Object()` 。
* 實務上多以物件實字法創造物件，但部分時候還是會用到 new 建構式來創造物件。

## 參考資料
---
1. JavaScript 全攻略：克服 JS 奇怪的部分 3-31

