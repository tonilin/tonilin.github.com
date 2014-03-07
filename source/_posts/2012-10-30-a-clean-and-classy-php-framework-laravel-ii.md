---
layout: post
title: 'PHP Framework Laravel (二) 安裝'
date: 2012-10-30 18:07
comments: true
categories: [php, Laravel]
---

![laravel.jpg](http://user-image.logdown.io/user/7/blog/530/post/924/QzVqHLaXQgiwCxqN7qyY_laravel.jpg)


[Laravel Official Site](http://laravel.com/)

[上一篇](/blog/2012/10/28/a-clean-and-classy-php-framework-laravel/)文章簡單介紹了 Laraval 的一些特色，今天就來實際安裝看看吧！

<!--more-->



## 系統需求

-  **PHP5.3.x 以上**   
Laravel 會用到一些 PHP5.3.x 以上才有的功能，如： closures, late-static binding and namespaces。  

-  **The FileInfo library**   
在 Linux 環境下的，這個 Library 在 PHP5.3.x 以上是預設安裝的， Windows 用戶可能要另外安裝。  

-  **Mcrypt library**  
用來產生 Hash ， PHP5.3.x 內建。  


## 下載並安裝

到官網下載 [Laravel](http://laravel.com/) 之後，解壓縮並放到網頁伺服器內。*(本篇文章以/var/www/laravel為例)*


## 目錄結構

這裡先簡單介紹 Laravel 的目錄結構：

{% codeblock %}
/ 
/application  放置有關application的目錄，包括 controllers 、 views 、 models 和 configs...等等。
/bundles  放置 bundles ， bundles 是 Laravel 的特色之一，本篇先跳過不介紹。
/laravel  放置 laravel framework
/public  靜態檔案，內有.htaccess和index.php，需將 virtual host 的 Document Root 設到此目錄。
/storage  檔案儲存空間，裡面有可能包含一些 cache 或 sessions 檔案。
/artisan  Laravel 的 CLI 工具。
/paths.php  在這裡可以設置一些常用的路徑。

{% endcodeblock %}

如果你是一位 MVC Framework 的初學者，你只需要關心application、public兩個資料夾，  
利用簡單的 controllers 、 views 和 models 來熟悉 MVC 的架構。


## 基本設定


### Application Key

在開始 Coding 之前，先來設定 Application Key ， Laravel 在應用程式的某些地方需要加密(如cookies)，需要 Application Key 來確保資料的安全性。

打開 *application/config/application.php*

{% codeblock application/config/application.php lang:php %}
<?
/*
|--------------------------------------------------------------------------
| Application Key
|--------------------------------------------------------------------------
|
| This key is used by the encryption and cookie classes to generate secure
| encrypted strings and hashes. It is extremely important that this key
| remain secret and should not be shared with anyone. Make it about 32
| characters of random gibberish.
|
*/
'key' => '',

{% endcodeblock %}


在 key 裡面填入32個字元以上的字串，看起來會像這樣：

{% codeblock application/config/application.php lang:php %}
<?
/*
|--------------------------------------------------------------------------
| Application Key
|--------------------------------------------------------------------------
|
| This key is used by the encryption and cookie classes to generate secure
| encrypted strings and hashes. It is extremely important that this key
| remain secret and should not be shared with anyone. Make it about 32
| characters of random gibberish.
|
*/
'key' => 'gkdckrdonbkscgedpekcvocxkdspfdokspdkfscmxvwertwerq',

{% endcodeblock %}

------------------------------------------------------------------------------------------------------------------------------



### 設置漂亮的 URL

到現在這個步驟應用程式已經能跑，因為所有的 request 都會導到 index.php ，
所以除了首頁以外，所有的網址都會有 index.php。現在要做的就是讓 index.php 隱藏起來。




打開 *application/config/application.php*


{% codeblock application/config/application.php lang:php %}
<?
/*
|--------------------------------------------------------------------------
| Application Index
|--------------------------------------------------------------------------
|
| If you are including the "index.php" in your URLs, you can ignore this.
| However, if you are using mod_rewrite to get cleaner URLs, just set
| this option to an empty string and we'll take care of the rest.
|
*/
'index' => 'index.php',
{% endcodeblock %}

將 index 的值留空，看起來會像這樣：

{% codeblock application/config/application.php lang:php %}
<?
/*
|--------------------------------------------------------------------------
| Application Index
|--------------------------------------------------------------------------
|
| If you are including the "index.php" in your URLs, you can ignore this.
| However, if you are using mod_rewrite to get cleaner URLs, just set
| this option to an empty string and we'll take care of the rest.
|
*/
'index' => '',
{% endcodeblock %}




## 執行

接著使用瀏覽器打開 *http://localhost/laravel/public* 就可以看到歡迎頁面：

{% img /upload/laravel_hello_world.png 640 493 Laravel %}

以上 Laravel 基本的設置就完成了，如果需要隱藏 Uri 內的 public，  
可以參考 [Laravel Server Configuration](http://laravel.com/docs/install#server-configuration)


## 小結

今天介紹了 Laravel 的安裝，因為篇幅的限制，這裡都只介紹最簡單的設置。如果需要更進階的東西，
可以參考官方的文件，或是需要特別教學的我會再另外開一篇文章介紹。

下一篇開始會介紹簡單的 Controllers 和 Views 的使用。

   
   
[PHP Framework Laravel (一) 簡介](/blog/2012/10/28/a-clean-and-classy-php-framework-laravel/)  
[PHP Framework Laravel (二) 安裝](/blog/2012/10/30/a-clean-and-classy-php-framework-laravel-II/)  
[PHP Framework Laravel (三) Hello World!](/blog/2012/11/01/a-clean-and-classy-php-framework-laravel-III/)  
   
   





















