---
layout: post
title: '新作品 Lovey 完成開發上市！'
date: 2012-11-28 23:30
comments: true
categories: [Portfolio]
---
![Lovey](http://user-image.logdown.io/user/7/blog/530/post/932/SbaLbmAeSPmfm5s2nIHO_lovey.png)

<http://lovey.tw/>

Lovey 是我跟同事千千一起合作完成的專案。是一個 Pinterest Like 網站，以女性服飾和配件為主要經營方向。

在做這個網站之前，也做了一個類似 Pinterest 的網站，但是因為圖片太雜，網站沒有一個主軸，使得客源非常不穩定。
做足功課以後，發現不少女生停留在網拍和 PTT  e-shopping 的時間非常得長！於是考慮到在女性導購的方面，應該會有很多商機，
於是結合了女性導購和 Pinterest 的網站就誕生了！

<!--more-->

## 開發時間 ##

雖然這個網站功能很簡單，也不難寫，但是因為只能利用業餘時間開發，加上我和同事都不善美術，所以開發時間長達半年。
我們都是利用上班前後的閒暇時間做開發，所有的功能完成後，另外自掏腰包請美術來設計 LOGO、ICON 和一些排版。
在跟美術溝通的地方也花了很長的時間，中間還穿插了很多程式的重構和最佳化，這也是為什麼一個簡簡單單的網站，
可以拖到這麼長的時間。


## 相關技術 ##

- PHP   
  Lovey 使用 PHP 為 Server Side 的語言，並使用 Slim Framework 來輔助開發，但後來發現 Slim Framework 並不是很完善，
  可能在未來改用其他 Framework。

- JavaScript  
  在 Javascript 套件使用到 Jquery、Chosen、Head、History 和 imgAreaSelect 等等，為了避免重造輪子和加快開發速度，
  其實用了非常多現成的東西。

- Less.css  
  首次嘗試使用 Less.css，節省了非常多重複撰寫的部分，非常好用！唯一的缺點就是每次看結果都要編譯一次。

- ImageMagick  
  為了更高品質和更快的速度，採用 ImageMagick 來做縮圖的處理。

- HTML5  
  大量套用 HTML5 Boilerplate 的 .htaccess。並使用 Microdata 來進行搜尋引擎最佳化，加上 History 來控制瀏覽器的上一頁下一頁。

- MongoDB  
  在社群網站裡，資料是很需要彈性的，所以採用了 NoSQL 資料庫，在資料的擷取上也比 SQL 快上不少。

- Redis  
  以記憶體為儲存媒介的資料庫，當作 Session 的儲存媒介，也存放一些經常讀取的資料，以加快網站速度和減少資料庫負擔。
  
- Crontab  
  使用 Crontab 進行一些需要背景執行的程序，例如熱門度計算、Sitemap 產生和資料庫備份。

- Git Auto Deploy  
  使用 Git 的 Hook 進行自動佈署，在 Test 平台完成測試的程式碼，只需要一個 PUSH 就會自動部屬到 Production 平台。

- CloudFlare  
  在 Lovey 裡，圖片的流量是非常恐怖的！所以利用了免費的 CDN 來減少伺服器的負擔，如果以後網站流量變大，
  會考慮付費。

## 小潔癖 ##
  
![Lovey](http://user-image.logdown.io/user/7/blog/530/post/932/RDuNXfVgRQCs4s08c9Mr_lovey_html5.png)

雖然 HTML5 容錯性很高，但是還是照著 w3c 的標準把它用到 0 Error。
  
  
## 最佳化 ##

![lovey_pagespeed.png](http://user-image.logdown.io/user/7/blog/530/post/932/Uc6PQdCTRruxGkJnvc4z_lovey_pagespeed.png)

在等美術設計的期間，除了進行網站的重構，花最多時間的就是最佳化了！  
照著 Google PageSpeed 的指示，將網站的分數提升到 99 分，超級有成就感！
不僅短期可以增加使用者體驗，長期下來流量也省了不少！


## 伺服器 ##

為了節省成本，選用美國的獨立伺服器，在比較了多家伺服器供應商以後，選擇了 [QuadraNet](http://www.quadranet.com/)，
也確實是物超所值！目前網站的速度我自己非常滿意！


## 小結 ##

網站完成上市了！接下來就是關係到網站會不會發展起來的行銷！希望一切順利！

這篇大略介紹了 Lovey 用到的技術，改天有空再一一詳細分析！







