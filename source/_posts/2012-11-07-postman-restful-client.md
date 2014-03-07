---
layout: post
title: 'Postman - 測試 API 的好工具'
date: 2012-11-07 19:00
comments: true
categories: [Tools]
---
![Postman](http://user-image.logdown.io/user/7/blog/530/post/929/k56jAS0Q4yOylsYylMqj_postman.jpg)

[POSTMAN in Google APP Store](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm)


因為工作的關係，常常寫一些 API 供 APP 使用。  
以前傻傻的，每次測試的時候都會自己刻一個 HTML 的表單，一個一個填入 input ，接著送出。
後來覺得這樣太慢了，就用 JavaScript 寫了一個程式來送，
可是效率都沒有很好，尤其是需要反覆測試更改條件的時候。

之後在同事的推薦下用了 Burpsuite ，而這套軟體確實是可以做到沒錯，但是讓人有一種「殺雞焉用牛刀」的感覺。
因此又陸續找了幾個模擬 HTTP requests 的工具，卻都不甚理想。最近終於找到一套滿意的，也就是今天要介紹的 Postman。

<!--more-->

Postman 是一個 Chrome 的 Extension，安裝以後可以在分頁欄裡面看到 Postman 的 Icon：

![postman_in_chrome.png](http://user-image.logdown.io/user/7/blog/530/post/929/KfEJlHOtThageiH9teBZ_postman_in_chrome.png)

##Postman 的主要功能

- **模擬各種 HTTP requests**：從常用的 GET、POST 到 RESTful 的 PUT 、 DELETE ...等等。
甚至還可以送出檔案、送出額外的 header。

- **Collection 功能**：Collection 是 requests的集合，在做完單一個測試的時候，
你可以把這次的 request 存到特定的 Collection 裡面，如此一來，下次要測試的時候，就不需要重新輸入。  
養成習慣以後，網站 API 的每個方法都寫好存進去，以後在開發的時候，就可以迅速得看到結果。
而 Collection 還可以 Import 或是 Share 出來，讓團隊裡面的其他人，可以一起使用你建立起來的 Collection。

- **整理過後的回傳結果**：一般在用其他工具來測試的時候，回傳的東西通常都是純文字的 raw，
但如果是 JSON ，就是塞成一整行的 JSON。這會造成閱讀時的障礙 ，而 Postman 可以針對回傳資料的格式自動美化。
JSON、 XML 或是 HTML 都會整理成人類可以閱讀的型態。

- **設定環境**：Postman 可以自由新增 Environment，一般我們可能會有多種環境， development 、 staging 或 local，
而這幾種環境的 request URL 也各不相同。新增 Environment，可以讓我們設定一些環境變數，使得切換環境測試的時候，
不用重寫 request。


##小測試

我們丟一個 Request 到 Google Geocoding API ，讓大家看看實際的執行結果：

![Postman](http://user-image.logdown.io/user/7/blog/530/post/929/X9RiVDZhSDaCGAdDG0dC_postman_test.png)

可以 一目瞭然地看到，送出什麼要求、得到什麼回應， 而 JSON 也整理好，且上好了顏色。

##小結

自從用了 Postman 很滿意以後，也陸續推薦給其他同事，現在整個公司都在用 Postman 了！

如果你的專案也常常在處理 request，而且苦無測試工具，你可以試試 Postman。












