---
layout: post
title: '不支援 JavaScript 時的 CSS'
date: 2013-02-15 22:30
comments: true
categories: [css, javascript]
---

最近面試時，被問到一個不錯的問題，如何確保在不能執行 JavaScript 的環境下，網頁依然能正常運作？

因為以前做的專案幾乎都是功能性為主，很少會去考慮到這個問題，但是如果網站是內容導向網站，這個問題就非常重要了。

<!--more-->

## Situation ##

在很多情況下，我們會把畫面用 CSS 隱藏起來，等待 JavaScript 觸發時才讓畫面顯示。
如果要做到非 JavaScript 的瀏覽器可以正常顯示，最直接的辦法就是：支援 JavaScript 時不顯示，不支援 JavaScript 時顯示。

## Anti-pattern ##

於是上網看看，大家是怎麼解決這個問題的，發現不少寫法是這樣：

{% codeblock lang:html %}
<!doctype html>
<html>
  <head>

  </head>
  <body>

    <noscript>
      <style type="text/css">

      </style>
    </noscript>
  </body>
</html>
{% endcodeblock %}

但是如果對 style 這個標籤稍微有點認識，會發現其實這樣寫是錯誤的，根據 [HTML 的規範](http://www.w3.org/TR/html4/present/styles.html)，style 只能出現在 head 裡，所以稍微修正一下：

{% codeblock lang:html %}
<!doctype html>
<html>
  <head>
    <noscript>
      <style type="text/css">

      </style>
    </noscript>
  </head>
  <body>

  </body>
</html>
{% endcodeblock %}

但是，noscript 在 head 中出現是正確的嗎？  
在 HTML4 noscript 只能出現在 body，而在 HTML5 出現在 head 和 body 中都是合法的。

## Modernizr & HTML5 Boilerplate ##

如何避免這個尷尬的情況呢？ 我們來看看 **modernizr** 和 **HTML5 Boilerplate** 的解法：

{% codeblock lang:html %}
<!doctype html>
<html class="no-js">
  <head>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
  </head>
  <body>

  </body>
</html>
{% endcodeblock %}

我們在 html 標籤裡加入一個 no-js 的 class，接著讀入 modernizr，modernizr 會把瀏覽器支援的東西寫入 html 的 class，
於是就會出現兩種情況：

-  不支援 JavaScript 的瀏覽器，不會執行 modernizr，html 就會有一開始設定的 no-js class。
-  支援 JavaScript 的瀏覽器，執行 modernizr，html 不會有 no-js class，而多出了 js 的 class。

我們用有支援 JavaScript 的瀏覽器跑看看結果：
{% codeblock lang:html %}
<!doctype html>
<html class=" js flexbox canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths" style="">
<head>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
</head>
  <body>
  </body>
</html>
{% endcodeblock %}

結果是我們想要的！接下來就可以很輕鬆得用 CSS 來控制不支援 JavaScript 的顯示方式：

{% codeblock lang:html %}
<!doctype html>
<html class="no-js">
  <head>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
    <style type="text/css">
      .hide-me {
        display: none;
      }
      .no-js .hide-me {
        display: block;
      }
    </style>
  </head>
  <body>

  </body>
</html>
{% endcodeblock %}

如果不想用 modernizr，也可以用一行輕鬆寫出來：

{% codeblock lang:html %}
<!doctype html>
<html class="no-js">
  <head>
    <script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement)</script>
  </head>
  <body>

  </body>
</html>
{% endcodeblock %}





