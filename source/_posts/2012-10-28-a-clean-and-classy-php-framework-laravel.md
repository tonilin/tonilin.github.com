---
layout: post
title: 'PHP Framework Laravel (一) 簡介'
date: 2012-10-28 21:11
comments: true
categories: [php, Laravel]
---


![laravel.jpg](http://user-image.logdown.io/user/7/blog/530/post/924/QzVqHLaXQgiwCxqN7qyY_laravel.jpg)


[Laravel Official Site](http://laravel.com/)

最近剛好接觸一個 Framework 叫 Laravel ，是目前我用得最得心應手的 PHP Framework ，  
由於最近才接觸，印象還很清晰，所以就打算從這裡下手了。

<!--more-->

## 為什麼選擇 Laravel ? ##

{% blockquote %}
Laravel is a clean and classy framework for PHP web development.
Freeing you from spaghetti code, 
Laravel helps you create wonderful applications using simple, expressive syntax.
Development should be a creative experience
that you enjoy, not something that is painful.
Enjoy the fresh air.
{% endblockquote %}


對於一個 Framework ，我覺得最重要的就是要用得「舒服」，  
以前用過不少 Framework ，多多少少會有些礙手礙腳的地方，  
譬如， autoloader 不夠完善、架構太龐大、速度太慢、文件雜亂或是缺東缺西，  
這些缺點容易讓人分心，使得Coding的過程不是很順暢。


而今天要介紹的Laravel，就像它的標題講得一樣，Clean &amp; Classy ！  
它既不會像 Zend Framework 一樣包山包海什麼都有，
也不會只給你簡單的MVC其他什麼都不提供，  
Laravel 給我的感覺，就是一個剛剛好的 Framework 。  



## Laravel 的特色


**自訂性高的 Routing **  
不只可以使用 RESTful 的 Routing 規則，也可以使用傳統 MVC 的 /cotroller/action/param 的 Routing 
 
**namespace的實現**  
可以減少大型程式 Class 名稱的相衝，並有良好的 autoloader 來輔助讀取 Class 。  

**簡單易用的 ORM **  
在小型不太需要考慮效能的應用程式中，可以使用內建的 ORM ，加快開發的速度和程式的易讀性；不過不建議在有效率考量的應用程式中使用。  

**速度不慢**  
相較於一些熱門的 Framework ，我想 Laravel 的速度是相當經得起考驗的，  
可以看看測試結果：[PHP Framework MVC Benchmark - v20111201-4](http://www.ruilog.com/blog/view/b6f0e42cf705.html)

**良好的文件**  
*CodeIgniter* 會擁有這麼多使用者的其中一個原因就是文件寫得非常清楚，可以幫企業省下非常多的訓練成本。  
*Laravel* 在文件上也非常傑出，有一定英文基礎的都可以快速地上手，  
官方甚至有承諾：*一定會把文件寫好才會做 release 的動作*。



## 小結

其實會接觸 Laravel ，是因為在開發一個RESTful的網站，  
使用的是 Slim Framework ，雖然輕巧方便，但是寫起來不是挺順手，  
缺了一些 Framework 沒有實作的東西，而自己去實作那些功能的時候又覺得做得不是很理想。

看了很多網站，對 Laravel 的評價都是 **Awesome!!** ，所以決定來試一試，  
自己實際使用 Laravel 的時間只有一個月，所以還說不準，不過到現在還沒有讓我失望，  
如果你下一個專案還沒有決定使用哪個 Framework ，或許可以試一試 Laravel 。  

下一篇開始會從如何安裝 Laravel 開始講起。
   
   
   
[PHP Framework Laravel (一) 簡介](/blog/2012/10/28/a-clean-and-classy-php-framework-laravel/)  
[PHP Framework Laravel (二) 安裝](/blog/2012/10/30/a-clean-and-classy-php-framework-laravel-II/)  
[PHP Framework Laravel (三) Hello World!](/blog/2012/11/01/a-clean-and-classy-php-framework-laravel-III/)  
   
   
   
   





















