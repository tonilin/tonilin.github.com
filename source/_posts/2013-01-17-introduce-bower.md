---
layout: post
title: 'Bower JavaScript 套件管理器'
date: 2013-01-17 21:42
comments: true
categories: [javascript, Tools]
---
![Bower](http://user-image.logdown.io/user/7/blog/530/post/938/SqDDFzpOShmkZLQa45DU_bower.png)

Bower Official Site : <http://twitter.github.com/bower/>

## 什麼是 Bower ?

Bower 是一個 JavaScript Package Manager，類似 node.js 的 npm 、 PHP 的 composer。  

在開發 Web 前端時，常常需要很多套件來輔助開發，例如需要 jQuery、Backbone、Bootstrap 和 Require.js 等等，
在沒有套件管理的情況下，通常有幾種方式：

-  從舊專案複製，但常常這樣做的話，會一直使用舊版本的 Library，如果新版的有修正一些 Bug，常常無法 follow 到。
-  到官網抓，不過一個專案需要很多 Library，一個一個找連結會花非常多時間。
-  使用 Git，同上，如果沒有 Repository 位置的話，一樣很花時間。

不管用上面哪種方法，如果想要更新套件，一樣的事情又得重做一次。如果需要特定版本的套件，又要花時間找。

而 Bower 就是用來解決這個問題的，只要列好所需的 Library 就可以一個指令全部抓回來，更新的時候也一樣快速。


<!--more-->

## 安裝 Bower

安裝 Bower 需要使用 Node 和 npm

{% codeblock lang:bash %}
$ npm install bower -g
{% endcodeblock %}

## 下載套件

首先我們先將目錄移到專案目錄，並下一個安裝 jQuery 的指令

{% codeblock lang:bash %}
$ bower install jquery
{% endcodeblock %}

等指令跑完就會看到 jQuery 已經出現在 ** ./components/jquery **


## Bower 設定檔

上面我們會發現，Bower 幫我放置的路徑，並不是我想要的路徑，沒關係，只需要在設定檔裡面指定路徑即可。

在專案根目錄新增一個檔案 **.bowerrc**，並指明路徑：

{% codeblock .bowerrc lang:json %}
{
  "directory" : "./public/js/vendor"
}
{% endcodeblock %}

重新下一次安裝 jQuery 的指令，就會發現已經安裝在 **./public/js/vendor/jquery**


## 搜尋套件

當不確定套件是否存在，或是想尋找套件相關的 plugin，可以使用 search 來尋找關鍵字相關的套件：

{% codeblock lang:bash %}
$ bower search backbone
{% endcodeblock %}

可以看到結果：

{% codeblock lang:bash %}
Search results:

  - backbone git://github.com/documentcloud/backbone.git
  - backbone-amd git://github.com/amdjs/backbone
  - backbone.eventbinder git://github.com/marionettejs/backbone.eventbinder.git
  - backbone-deep-model git://github.com/powmedia/backbone-deep-model.git
  - backbone.localStorage git://github.com/jeromegn/Backbone.localStorage.git
  - backbone-relational git://github.com/PaulUithol/Backbone-relational.git
  - backbone.stickit git://github.com/NYTimes/backbone.stickit.git
  - backbone-validation git://github.com/thedersen/backbone.validation.git
  - backbone.paginator git://github.com/addyosmani/backbone.paginator.git
  - backbone-amd-lodash git://github.com/nibblebot/backbone.git
  - backbone.wreqr git://github.com/marionettejs/backbone.wreqr.git
  - backbone-forms git://github.com/powmedia/backbone-forms
  ...
{% endcodeblock %}

## 使用 **component.json** 建立套件清單

上面的方法都是一次安裝一個套件，我們可以在根目錄建立 component.json ，把專案需要用到的套件都列進去，就可以一次安裝：
{% codeblock component.json lang:json %}
{
  "name": "PackageName",
  "version": "1.0.0",
  "dependencies": {
    "jquery": "1.8.3",   // 指定安裝 1.8.3 版
    "backbone-amd": null,   // 指定安裝最新版本
    "underscore-amd": ">= 1.4.3",   //指定安裝大於等於 1.4.3 的版本
    "requirejs": null
  }
}
{% endcodeblock %}
*上面的內容如果需要使用，請記得把註解拿掉*

接著下 install 指令就會自動安裝了：

{% codeblock lang:bash %}
$ bower install
{% endcodeblock %}


## 其他指令

升級套件
{% codeblock lang:bash %}
$ bower update
{% endcodeblock %}

反安裝套件
{% codeblock lang:bash %}
$ bower uninstall
{% endcodeblock %}

## 小結

Web 的開發上，一直不斷有新的工具來解決現存的問題，可惜台灣在這方面的資訊一直不太發達，最近跑了十幾家公司面試，
沒有人知道 Web 開發在流行什麼技術，一直 HTML5 、CSS3、Cloud 掛在嘴邊，公司還是一樣只用 LAMP 就解決所有問題。

這些技術不是開發產品的唯一途徑，但是卻是可以改善開發流程和速度的利器。



