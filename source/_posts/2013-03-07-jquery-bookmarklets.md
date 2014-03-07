---
layout: post
title: 'jQuerify : jQuery Bookmarklets'
date: 2013-03-07 23:00
comments: true
categories: [javascript]
---

在開發不需要使用到 jQuery 的專案時，有時候需要在 console 下一些指令，來進行測試，這時如果沒有 jQuery selector 是很不方便的。這裡寫了一個 Bookmarklets，可以按一下就把 jQuery 包進來：

<a href="javascript:void((function(){var jq = document.createElement('script');jq.type = 'text/javascript';jq.src = 'http://code.jquery.com/jquery-latest.min.js';document.getElementsByTagName('head')[0].appendChild(jq);})());">jQuerify</a> - Drag this link to bookmarks bar.

將上面連結拖放到書籤列，在沒有支援 jQuery 的網站中按一下按鈕，就可以使用 jQuery。



