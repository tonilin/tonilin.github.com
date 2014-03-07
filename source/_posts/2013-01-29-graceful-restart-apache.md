---
layout: post
title: '優雅地重開 Apache'
date: 2013-01-29 21:30
comments: true
categories: [Server]
---

Apache 在更動設定檔以後，如果要套用新設定，一般都會下 restart 來重新啟動 Web server：

{% codeblock lang:bash %}
$ /etc/init.d/httpd restart
{% endcodeblock %}

這個指令會*立即*關掉所有的子進程，然後再重新讀取設定。但是在 production 伺服器，這樣可能會造成使用者的 request 被中斷。

比較少人知道還有一個 graceful 的指令：

{% codeblock lang:bash %}
$ /etc/init.d/httpd graceful
{% endcodeblock %}

發出這個指令以後，每個子進程都會處理完目前的 request 後，再套用新的設定。在 production 伺服器更改設定，使用 graceful 才能避免造成使用者的困擾。

參考資料：[Apache Stopping and Restarting](http://httpd.apache.org/docs/2.0/stopping.html#graceful)




