---
layout: post
title: 'VirtualBox Apache Sendfile'
date: 2013-01-26 19:30
comments: true
categories: [Server, Tools]
---

之前在 VirtualBox 的 Shared Folder 進行開發，在寫 PHP 的時候都沒問題，
但是只要碰到靜態檔案，例如 Js 檔，明明修改了，看到的還是舊的版本。

這時候只要重開 Apache 就好了，但是每次這樣重開也不是辦法，於是 Google 一下是哪裡出了問題。
發現是 Apache 的 sendfile 在做怪，這是一個利用 Kernel 的 sendfile 來加速靜態檔案發送的功能。

但是 sendfile 在目錄是網路掛載的情況下會出問題，所以在開發環境，把這個功能關掉，才不會出現檔案沒更新的錯誤。

打開 **httpd.conf**，找到 EnableSendfile ，並設成 off：

{% codeblock httpd.conf lang:apacheconf %}
#
# EnableSendfile: Control whether the sendfile kernel support is
# used to deliver files (assuming that the OS supports it).
# The default is on; turn this off if you serve from NFS-mounted
# filesystems. Please see
# http://httpd.apache.org/docs/2.2/mod/core.html#enablesendfile
#
EnableSendfile off
{% endcodeblock %}

更多有關 Apache Sendfile 可以參考：[Apache Documentation](http://httpd.apache.org/docs/2.0/mod/core.html#enablesendfile)









