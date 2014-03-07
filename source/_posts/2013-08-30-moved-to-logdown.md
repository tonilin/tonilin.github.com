---
layout: post
title: '搬家到 Logdown'
date: 2013-08-30 16:04
comments: true
categories: 
---
<img class="center" src="http://user-image.logdown.io/user/7/blog/530/post/98550/kTe0CHbHQc2vguBwp23F_logo-full.jpg" alt="logo-full.jpg">

最近把 Blog 搬家到 [Logdown](http://logdown.com)，Logdown 是公司的產品，所以把 Blog 搬到這邊，實際體驗，才能即時發現一些使用者體驗的問題(其實是不想維護 Octopress..XDD)。也因為有 Custom Theme 的關係，所以 Blog 的外觀看起來跟原本的 Octopress一模一樣。

<!--more-->

## 為什麼搬家

Octopress 雖然很好用，產生出來的 Blog 也非常令人滿意，但是每次寫個文章就得跑一堆指令：

```bash
rake new_post["hello world"]
rake generate
rake deploy
```

我只是想簡單得寫一篇文章阿！！而且因為安裝環境不方便，即使 source code 都放在 Github repo 上，換台電腦時，如果要開始寫文章，大概要花個半小時安裝環境吧...Orz

Octopress 是使用 jekyll + compass 來產生 static files，檔案越多每次 generate 的速度就越慢，雖然我的文章沒有多到會讓我感覺很慢，但是感覺不是長久之計。

## 怎麼搬家

Octopress 搬家超級簡單，把所有 post 壓縮起來，就可以自動匯入了：

![螢幕快照 2013-08-30 下午11.39.23.png](http://user-image.logdown.io/user/7/blog/530/post/98550/mOBu5nY5Qtuw2ARPwkhF_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-08-30%20%E4%B8%8B%E5%8D%8811.39.23.png)

其他還支援 Wordpress、Tumblr、Blogger 和 Movable Type。

## 編輯器

超級好用 BJ4，請自行體驗，不用打 `rake preview`，按 `cmd + D ` 就可以直接看到preview真棒！

![螢幕快照 2013-08-30 下午11.42.28.png](http://user-image.logdown.io/user/7/blog/530/post/98550/ygmFtSuwQJW9MNpCWub8_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-08-30%20%E4%B8%8B%E5%8D%8811.42.28.png)

## Custom theme

Logdown 內建 Theme 是使用 its-compiling，如果不喜歡也可以到後台換 Theme：

![螢幕快照 2013-08-30 下午11.45.14.png](http://user-image.logdown.io/user/7/blog/530/post/98550/eBshQjydTCO64gTucslO_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-08-30%20%E4%B8%8B%E5%8D%8811.45.14.png)


如果都不喜歡也可以自己編輯 Theme：

![螢幕快照 2013-08-30 下午11.48.24.png](http://user-image.logdown.io/user/7/blog/530/post/98550/1yCBcIPTnmb2HkZX4tVA_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-08-30%20%E4%B8%8B%E5%8D%8811.48.24.png)

## Custom Domain

可以自行設定 Custom Domain，算是滿重要的功能，如果自己沒有 Domain，也可以使用 your_name.logdown.com：

![螢幕快照 2013-08-30 下午11.49.47.png](http://user-image.logdown.io/user/7/blog/530/post/98550/k8imH1RgRT6qKzW2wpu2_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-08-30%20%E4%B8%8B%E5%8D%8811.49.47.png)

## Drag & Drop upload Image

這個功能實在太棒了！！這篇文章的圖片都是這樣上傳的。以前用 octopress，或是其他 Blog 平台，上傳圖片簡直悲劇 Orz

<iframe width="600" height="500" src="//www.youtube.com/embed/DOOg-_KimWQ" frameborder="0" allowfullscreen></iframe>


## 小結

最近除了做客戶的案子的時間以外，花了非常多時間做 Logdown，裡面用到的技術，有時候連我都不太相信是我自己寫的XD，多虧了 Ruby 有非常多好用的 Gem，不然如果用 PHP 我還真的不知道要寫到什麼時候。總之歡迎來試試 Logdown，這大概是我看過目前最適合專業人員寫 Blog 的平台了(好像有點老王賣瓜？)。





