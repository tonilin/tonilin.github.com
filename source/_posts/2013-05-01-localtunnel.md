---
layout: post
title: 'localtunnel - 分享 localhost web server'
date: 2013-05-01 13:00
comments: true
categories: [Tools, Server, Gems]
---
![localtunnel](http://user-image.logdown.io/user/7/blog/530/post/945/0q3U6Zx2TRS1PPyQQ69x_localtunnel.png)

localtunnel Official Site : <http://progrium.com/localtunnel/>


在接案公司裡，常常需要把做好的產品拿給客戶看，這時候如果沒有獨立 IP，
或是 Router 那邊沒有設定 Port Forwarding，客戶就無法從遠端看到內網的 Web。

localtunnel 可以建立一個通道，並產生一個網址，
客戶就可以用這個網址，連到內網的 Web Server。

<!--more-->

## 安裝 localtunnel

Localtunnel 需要使用 Gem 安裝:

{% codeblock lang:bash %}

sudo gem install localtunnel

{% endcodeblock %}

如果你是使用 rvm，則不需要加上 sudo：

{% codeblock lang:bash %}

gem install localtunnel

{% endcodeblock %}


## 打開你的 Web Server

他開你的 Web Server 並記下 Port，這裡以 8080 為例。


## 開始使用 localtunnel

第一次使用，必須附上 Public SSH key：

{% codeblock lang:bash %}

localtunnel -k ~/.ssh/id_rsa.pub 8080

{% endcodeblock %}


以後，則只需要打上 Web Server 的 Port

{% codeblock lang:bash %}

localtunnel 8080

{% endcodeblock %}


接著就會看到

{% codeblock lang:bash %}

Port 8080 is now publicly accessible from http://4mec.localtunnel.com ...

{% endcodeblock %}

後面那串網址就是 localtunnel 幫你產生的，使用者就可以透過這個網址看到內網的 Web Server 了！
















