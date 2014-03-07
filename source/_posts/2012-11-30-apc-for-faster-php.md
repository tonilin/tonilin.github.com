---
layout: post
title: '使用 APC 加速你的 PHP！'
date: 2012-11-30 16:30
comments: true
categories: [Server, php]
---
![apc_plus_php](http://user-image.logdown.io/user/7/blog/530/post/933/hweiFLwzR8a0OVNE3Rjv_apc_plus_php.png)


PHP 是 Script 語言，在程式被執行的時候才會開始編譯，所以和其他預先編譯好的語言比起來速度會比較慢。
而如果 code 沒有變更，每次的編譯其實是多餘的，如果能將重複編譯的時間和資源省下來，就可以讓 PHP 加速不少。

市面上有很多 PHP 加速的外掛，可以用來達成這個目的，APC 就是其中一個。APC 會將編譯的結果暫存起來，省去每次需要重新編譯的時間。

<!--more-->

##安裝

下面安裝方法以 Centos 為範例：

首先，如果沒有 PEAR，請先安裝 PEAR： ( 如果需要最新版本，可以下載原始碼自行編譯 )

{% codeblock lang:bash %}

$ yum install php-pear

{% endcodeblock %}


接著使用 pecl 安裝 APC：

{% codeblock lang:bash %}

$ pecl install apc 

{% endcodeblock %}


安裝好後，在 /etc/php.ini 加入一行：

{% codeblock lang:bash %}

extension = apc.so

{% endcodeblock %}


接著重新啟動 Apache：

{% codeblock lang:bash %}

$ /etc/init.d/httpd restart

{% endcodeblock %}


如此 APC 的安裝程序就完成了！


##設定

安裝好後就可以在 phpinfo 裡面看到下面的資訊：

![apc_phpinfo](http://user-image.logdown.io/user/7/blog/530/post/933/4e2IxtqtTWGZvUwSGO3f_apc_phpinfo.png)

其中對速度影響最大的參數就是 **apc.stat**，當 stat 打開的時候，APC 每次都會去檢查檔案有沒有更新，
但是在 Production 平台，檔案變更通常伴隨著每次 release，每次檔案更新的時間都是可以確定的！
所以如果要讓速度更快，我們可以把 stat 關閉，檔案更新的時候，再去清除 APC 的快取即可。

要關閉 stat 只要在 php.ini 中加入一行：

{% codeblock lang:bash %}

apc.stat = 0

{% endcodeblock %}



##清除快取

我們可以直接使用 PHP 清除快取：


{% codeblock lang:php %}
<?php

apc_clear_cache();

{% endcodeblock %}


##管理後臺

APC 有內建的管理後臺，可以清楚得看到快取狀態，也可以在後台進行快取的清除。

在使用 PEAR 安裝好 APC 後其實就已經在 PEAR 的目錄下，我們只需要將它複製到 Apache 的 Document 目錄即可：

{% codeblock lang:bash %}

$ cp /usr/share/pear/apc.php /var/www/html/apc.php

{% endcodeblock %}

接著打開 http://localhost/apc.php 即可看到 APC 的管理後臺：

![apc_php.png](http://user-image.logdown.io/user/7/blog/530/post/933/Inmm32QhSbmjfqawy8JB_apc_php.png)

為了避免訪客也可以進行快取的清除，記得打開 apc.php 設上密碼：

{% codeblock lang:php %}
<?php

defaults('USE_AUTHENTICATION',1);			// Use (internal) authentication - best choice if 
											// no other authentication is available
											// If set to 0:
											//  There will be no further authentication. You 
											//  will have to handle this by yourself!
											// If set to 1:
											//  You need to change ADMIN_PASSWORD to make
											//  this work!
defaults('ADMIN_USERNAME','your_user_name'); 			// Admin Username
defaults('ADMIN_PASSWORD','your_password');  	// Admin Password - CHANGE THIS TO ENABLE!!!
{% endcodeblock %}


##Benchmark

APC 加速的效果如何？其實網路上可以找到很多 Benckmark 資料。  
如果單純只是 Hello World，APC 不能提供多大幫助，因為 APC 是編譯快取，但是在大型的應用程式裡面，APC 甚至可以提供原本兩倍的速度！




##小結

其實 APC 還有很多功能，可以暫存 PHP 經常使用的變數、可以偵測上傳進度等等，而且還有更多設定可以調配，
有需要的再自行 Google 吧！
















