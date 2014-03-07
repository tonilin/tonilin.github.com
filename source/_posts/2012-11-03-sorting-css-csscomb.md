---
layout: post
title: '自動排序 CSS 屬性 - CSScomb'
date: 2012-11-03 16:00
comments: true
categories: [Tools, css]
---
![csscomb.png](http://user-image.logdown.io/user/7/blog/530/post/927/QvhTA0kHR96S6Y7Yev01_csscomb.png)


CSScomb Official Site : <http://csscomb.com/>


在撰寫 CSS 的時候如果沒有很好的習慣，總是想到什麼屬性，就直接塞到 {...} 之中，
或是頂多只把類似的屬性放在一起 *(譬如 margin 可能和 padding 或 border 放在一起)*，
長期下來， CSS 語法會非常「亂」，使得在找屬性的時候很難找，另一方面，看到亂七八糟的屬性心情也會很差。

CSScomb 就是用來解決這個問題的工具！

<!--more-->


先來看一段雜亂的 CSS ：

{% codeblock lang:css %}

.module {
    border: 1px solid #ccc; 
    width: 25%;
    padding: 20px; 
    position: relative; 
    min-height: 100px;
    z-index: 1;
    border-radius: 20px;
}

{% endcodeblock %}

經過 CSScomb 整理過後的 CSS：

{% codeblock lang:css %}
.module { 
    position: relative;
    z-index: 1;
    padding: 20px; 
    min-height: 100px; 
    width: 25%;
    border: 1px solid #ccc;
    border-radius: 20px;
}
{% endcodeblock %}


可以看到相似的屬性被放在一起了，加上註解的話，應該會看得更清楚：

{% codeblock lang:css %}
.module { 
    /*  position  */
    position: relative;
    z-index: 1;
    
    /*  box model  */
    padding: 20px; 
    min-height: 100px; 
    width: 25%;
    border: 1px solid #ccc;
    
    /*  styling  */
    border-radius: 20px;
}
{% endcodeblock %}

如果你對 CSS 稍微有點潔癖的話，相信這個工具應該很適合你！










