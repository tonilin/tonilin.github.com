---
layout: post
title: '使用 OptiPNG 最佳化 PNG'
date: 2013-01-30 14:30
comments: true
categories: [Tools]
---

OptiPNG Official Site : <http://optipng.sourceforge.net/>

OptiPNG 是一個能無損壓縮 PNG 的工具，也可以將非 PNG 的檔案 (BMP, GIF, PNM and TIFF) 轉換成壓縮過後的 PNG。

<!--more-->

## 安裝 OptiPNG

如果你是 MAC 的使用者，可以使用 brew 安裝：
{% codeblock lang:bash %}
$ brew install optipng
{% endcodeblock %}

其他作業系統也有相對應的套件庫，例如 CentOS 可以使用 yum：
{% codeblock lang:bash %}
$ yum install optipng
{% endcodeblock %}

如果都沒有，可以到官網下載 tar 回來自己編譯。
{% codeblock lang:bash %}
$ wget http://prdownloads.sourceforge.net/optipng/optipng-0.7.4.tar.gz
$ tar -xzvf optipng-0.7.4.tar.gz
$ cd optipng-0.7.4
$ ./configure
$ make && make install
{% endcodeblock %}

## 使用 OptiPNG

使用 OptiPNG 很簡單：
{% codeblock lang:bash %}
$ optipng fat.png

1920x1080 pixels, 4x8 bits/pixel, RGB+alpha
Reducing image to 3x8 bits/pixel, RGB
Input IDAT size = 1969511 bytes
Input file size = 1969633 bytes

Trying:
  zc = 9  zm = 8  zs = 0  f = 5		IDAT size = 1765809
  zc = 9  zm = 8  zs = 1  f = 5		IDAT size = 1728639
  zc = 1  zm = 8  zs = 2  f = 5		IDAT size = 1635304
                               
Selecting parameters:
  zc = 1  zm = 8  zs = 2  f = 5		IDAT size = 1635304

Output IDAT size = 1635304 bytes (334207 bytes decrease)
Output file size = 1635426 bytes (334207 bytes = 16.97% decrease)
{% endcodeblock %}

隨便拿一張未壓縮的 PNG 來測試，可以看到檔案大小少了約 17% 。


可以加入參數，做最高等級的最佳化，但是最佳化的速度最慢：
{% codeblock lang:bash %}
$ optipng -o7 fat.png

920x1080 pixels, 4x8 bits/pixel, RGB+alpha
Reducing image to 3x8 bits/pixel, RGB
Input IDAT size = 1969511 bytes
Input file size = 1969633 bytes

Trying:
  zc = 9  zm = 9  zs = 0  f = 1		IDAT size = 1806167
  zc = 9  zm = 9  zs = 1  f = 1		IDAT size = 1772590
  zc = 9  zm = 9  zs = 0  f = 2		IDAT size = 1756210
  zc = 9  zm = 9  zs = 1  f = 2		IDAT size = 1730041
  zc = 1  zm = 9  zs = 2  f = 2		IDAT size = 1693082
  zc = 9  zm = 9  zs = 0  f = 3		IDAT size = 1679603
  zc = 9  zm = 9  zs = 1  f = 3		IDAT size = 1653177
  zc = 1  zm = 9  zs = 2  f = 3		IDAT size = 1569035
                               
Selecting parameters:
  zc = 1  zm = 9  zs = 2  f = 3		IDAT size = 1569035

Output IDAT size = 1569035 bytes (400476 bytes decrease)
Output file size = 1569157 bytes (400476 bytes = 20.33% decrease)
{% endcodeblock %}

可以看到比上一個例子又少了 3% 的大小，但是也多花了 3 分鐘來做最佳化。

也可以把圖片的 metadata　一併去除掉，減少檔案大小的同時，也可以避免一些 code injection：
{% codeblock lang:bash %}
$ optipng -strip all *.png
{% endcodeblock %}

當然如果需要整個目錄內的 PNG 都最佳化，可以下達：
{% codeblock lang:bash %}
$ optipng *.png
{% endcodeblock %}

如果怕最佳化的時候出錯，可以加一個 -k ，optiPNG 會自動備份原本的檔案。如果你本來就有在做版本控管，就不需要這個了。
{% codeblock lang:bash %}
$ optipng -k *.png
{% endcodeblock %}

## 更多資訊

OptiPNG 並不是唯一解，還有其他最佳化工具，壓縮的比例也都不同，網路上都可以找到評比，有需要的話可以自行 Google。

如果想要更了解 PNG 和壓縮原理可以參考：[A guide to PNG optimization](http://optipng.sourceforge.net/pngtech/optipng.html)









