---
layout: post
title: 'PHP Framework Laravel (三) Hello World!'
date: 2012-11-01 20:00
comments: true
categories: [php, Laravel]
---
![laravel.jpg](http://user-image.logdown.io/user/7/blog/530/post/924/QzVqHLaXQgiwCxqN7qyY_laravel.jpg)


[Laravel Official Site](http://laravel.com/)

今天要來介紹：怎麼使用 Laravel 做一個 Hello World ! 頁面。

<!--more-->

## Laravel 的 Routing

Laravel 的 Routing ，不像以往的 Framework 有預設的 Routing (如 controller/action/param )，  
在 Laravel 中，每一個 Routing 都必須給予明確的指定！  
而這時候可能有人會問：每個都指定那不是非常麻煩？  
幸好 Laravel 提供了兩種 Routing 方式：一種跟傳統的 MVC Routing 方式一樣，另外一種則是自己指定的 Routing 。

## 基本 Routing

首先打開 */application/routes.php* ，會看到一個官方已經預設好的 Route ，可以先將它刪掉沒關係。

{% codeblock /application/routes.php lang:php %}
<?
Route::get('/', function()
{
	return View::make('home.index');
});
{% endcodeblock %}




**註冊一個Route至 "GET /":**

{% codeblock /application/routes.php lang:php %}
<?
Route::get('/', function()
{
    return "Hello World!";
});
{% endcodeblock %}

用瀏覽器打開 *http://localhost/laravel/*，一個簡單的 Hello World! 就完成了！


**註冊一個接受任何HTTP Method (GET, POST, PUT, and DELETE)的Route：**

{% codeblock /application/routes.php lang:php %}
<?
Route::any('/', function()
{
    return "Hello World!";
});
{% endcodeblock %}



**註冊一個接受參數傳遞的Route：**

{% codeblock application/routes.php lang:php %}
<?
Route::get('hello/(:any)', function($name)
{
    return "Hello " . $name . "!";
});
{% endcodeblock %}

打開 *http://localhost/laravel/hello/tonilin* 就可以看到 Hello tonilin!


**各種 HTTP Method**

前面介紹了 get 和 any ，當然也可以替換成put 、 post 和 delete，來建立一個 RESTful 的應用程式。

Laravel 還提供更細節的參數 filter，相關資訊可以在官網文件的 Routing 分類找到。


##Controller Routing
 
如本篇開頭所講的，Laravel 還提供傳統 MVC 的 Routing 方式，

在 Laravel 中的 Default Controller為 Home Controller。

下面我們就介紹：用 Controller 的方式來建立一個 Hello World 吧！


**在/application/controllers中建立一個home.php的檔案：**

{% codeblock /application/controllers/home.php lang:php %}
<?
class Home_Controller extends Base_Controller {
	public function action_index()
	{
		return "Hello World!";
	}
}

{% endcodeblock %}

**在/application/routes.php中加入一個Controller Route：**

 之前有提過**每一個** Routing 都必須明確的指定！

所以剛剛加了一個 Home Controller ，我們也必須加入一個 Home Route：

{% codeblock /application/routes.php lang:php %}
<?
Route::controller('home');

{% endcodeblock %}



**測試**

接著以瀏覽器打開 *http://localhost/laravel/* 就可以看到 Hello World!
 
 
 
##Controller AND View

直到剛剛，我們都還只有使用到 Routing 和 Controller，  
接下來，我們試著把之前的 Hello World! 分成 Controller 和 view。

**打開之前寫好的 /application/controllers/home.php**

我們將return 回去的東西，改成view：

{% codeblock /application/controllers/home.php lang:php %}
<?
class Home_Controller extends Base_Controller {
	public function action_index()
	{
		return View::make('home.index');
	}
}

{% endcodeblock %}

**在/application/views/home中建立一個index.php的檔案：**

{% codeblock /application/views/home/index.php lang:php %}

Hello World !

{% endcodeblock %}

為什麼要特別開一個資料夾 home 呢？  
因為我們是在 Home Controller 裡面的 index action  ，
為了以後方便找檔案，所以我們通常會有一套放置 view 的方法。  
規則就是很簡單的(controller)/(action).php。


**測試**

接著以瀏覽器打開 *http://localhost/laravel/* ，如果你也是看到Hello World!，那就是成功了！



##小結

如同以往，我們在這邊只簡單介紹基礎的應用，如需要更詳細的文件，請到 Laravel 官網搜尋。

相信從這一篇開始，就可以看出一些 Laravel 跟其他 Framework 不相同的 Routing 方式，

下一篇開始會介紹我覺得很好用的 RESTful Controller ！

   
[PHP Framework Laravel (一) 簡介](/blog/2012/10/28/a-clean-and-classy-php-framework-laravel/)  
[PHP Framework Laravel (二) 安裝](/blog/2012/10/30/a-clean-and-classy-php-framework-laravel-II/)  
[PHP Framework Laravel (三) Hello World!](/blog/2012/11/01/a-clean-and-classy-php-framework-laravel-III/)  
   






