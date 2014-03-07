---
layout: post
title: '使用 Vagrant 管理虛擬機器'
date: 2012-12-28 21:42
comments: true
categories: [Server, Tools]
---
![Vagrant](http://user-image.logdown.io/user/7/blog/530/post/937/LSQ4lpQRWJKvY2x4LRLA_vagrant.png)

Vagrant Official Site : <http://vagrantup.com/>

## 什麼是 Vagrant ?

以往在建立 VM 的時候，就算 Guest Machine 都已經安裝好了，在部屬 Share Folder 、 Port Forwarding 
時也會花非常多的時間，如果是在一個團隊裡，要求大家開發的環境都一樣，而 Server 內要有
Apache 2.2 、 PHP 5.4 、 Redis 和 MongoDB，設定檔也都要一樣，光想到這些就令人頭痛。

而 Vagrant 就是用來解決這個問題的，它能將你配置好的 VM 封裝起來，以後，如果其他開發者進來，
只要一個指令，就可以把開發環境建立起來，開發環境一起來，馬上就能進入狀況，可以節省非常多的時間成本！

<!--more-->

## 開始使用 Vagrant

Vagrant 是使用 Ruby 寫的，我們可以用 gem 來安裝：
{% codeblock lang:bash %}
$ gem install vagrant
{% endcodeblock %}


接著到 [Vagrantbox.es](http://www.vagrantbox.es/) ，選擇一個已經封裝好的 Vagrant Box，
像我習慣使用 CentOS x64，所以下面以 CentOS x64 做範例。

將 Box 加進 Vagrant 裡：
{% codeblock lang:bash %}
$ vagrant box add centos https://s3.amazonaws.com/itmat-public/centos-6.3-chef-10.14.2.box
{% endcodeblock %}

建立一個專案資料夾：
{% codeblock lang:bash %}
$ mkdir ~/vagrant_project
$ cd ~/vagrant_project
{% endcodeblock %}

使用剛剛加進來的 box 初始化環境：
{% codeblock lang:bash %}
$ vagrant init centos
{% endcodeblock %}

接著就可以啟動 VM 了：
{% codeblock lang:bash %}
$ vagrant up
{% endcodeblock %}

## 使用 SSH 進入 VM 

以往建立 VM 以後，要手動設定網路和 Port Forwarding，現在只需要在 VM 啟動以後，
使用一個指令就可以用 SSH 進入 VM：

{% codeblock lang:bash %}
$ vagrant ssh
{% endcodeblock %}

*( 如果需要 root 權限，密碼是 vagrant )*

## 分享資料夾 

Vagrant 在部屬好以後，已經自動幫我們配置好 Share Folder 了。

- 在 Host Machine 的位置在 Vagrant 專案的資料夾，以先前的例子是在 ~/vagrant_project/ 。
- 在 Guest Machine 中，則是在 /vagrant。

到這裡，你應該就可以知道，只要把 apache 的 Document Path 指到 /vagrant，就可以在 Host Machine
開發了！

## 設定 Port Forwarding

設定 Port Forwarding ，我們才能輕鬆得從 Host Machine 連到 Guest 建立起來的伺服器。
在 vagrant 專案的資料夾下，會看到一個 Vagrantfile，這是 Vagrant 自動幫我們建立的。

一開始它可能看起來會像這樣：
{% codeblock lang:bash %}
Vagrant::Config.run do |config|
  config.vm.box = "base"
end
{% endcodeblock %}

現在我們要將 Host 的 8080，轉發到 Guest 的 80：

{% codeblock lang:bash %}
Vagrant::Config.run do |config|
  config.vm.box = "base"
  config.vm.forward_port "http", 80, 8080
end
{% endcodeblock %}

重新啟動 VM：
{% codeblock lang:bash %}
$ vagrant reload
{% endcodeblock %}


如果你已經用 SSH 將 Apache 安裝好，現在在瀏覽器輸入 http://localhost:8080，應該就可以看到畫面了。

## 關閉 VM

在系統重開機之前，千萬要記得先關掉 VM，不正常關閉 VM，可能會造成一些系統錯誤。

關閉 VM 只需要一個指令：
{% codeblock lang:bash %}
$ vagrant halt
{% endcodeblock %}



## 封裝 VM

如果你已經將所有東西配置好，打算將這個 VM 封裝起來使用，你只需要輸入：
{% codeblock lang:bash %}
$ vagrant package
{% endcodeblock %}

如此就可以在目錄下看到一個 package.box，其他使用者只需要使用 vagrant box add，就可以立即部屬一個
你建立好的環境。

## 小結

開始使用 Vagrant 後，第一個想法就是，這一定可以幫團隊節省非常多的成本，每個剛進來的工程師，
都可以使用簡單的幾個指令，就建置好環境，而且馬上就可以成為戰力！

Vagrant 還有更多便利的功能，可以在官網找到，可以讓建立開發環境更自動化，有興趣的可以參考官方網站。










