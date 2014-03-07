---
layout: post
title: '我的常用軟體'
date: 2012-11-02 22:51
comments: true
categories: [Tools]
---

今天來介紹我的常用軟體。對於靠電腦吃飯的人而言，熟悉作業系統的環境是非常重要的！  
一直以來， Windows 就不是工程師所推崇的開發環境，而我們也常常聽到 mac 多好用，或是 Linux 才專業之類的說法。
我雖然也很詬病微軟的東西，但是從小學用 Windows 到現在，自己實在太習慣 Windows 的環境了(口嫌體正直？XDD)，
我想不管是什麼作業環境，用得舒服、效率快才是真正重要的。

如果你也一樣也是使用 Windows 當開發環境，可以參考看看我常用的軟體：

<!--more-->


##作業環境
###[Q-dir](http://www.softwareok.com/?seite=Freeware/Q-Dir)
在開發 MVC 專案的時候， Controller 、 Model 和 View 是在不同資料夾裡面的。如果沒有使用專案管理軟體，
找檔案是非常麻煩的。有了這個軟體，你可以在一個視窗裡顯示多個目錄，
如此一來，要找尋檔案的時候就會非常方便。


###[Daemon](http://www.daemon-tools.cc/eng/products/dtLite)
這是一套虛擬光碟軟體，雖然市面上很多類似的軟體，但是還是這個用得最順手。

###7 Taskbar Tweaker x64
Win 7 在開始功能表「不合併」的情況下，如果開啟多個相同的程式，
會自動將這些程式併為一個「群組」，這個群組內的程式無法任意變換順序，
倘若拖動一個程式，其他相同的程式就會跟著移動。

這個軟體就是用來解決這種問題，可以讓你任意編排開始功能表內程式的順序。



###[Fences 2.0](http://www.stardock.com/products/fences/download.asp)
雖然是付費軟體，但還是大力推薦！！詳細的內容請看[「最好用的桌面管理軟體 Fences 2.0」](/blog/2012/10/31/fences2/)


###Vmware WorkStation

在跑 LAMP 的環境下，未來 Production 的伺服器八成是 Linux 。  
如果開發環境不是 Linux ，到時候搬到 Production 伺服器時，
會遇到很多無法預期的狀況，甚至很多功能、套件在 Windows 根本無法使用。所以建議開發的時候就使用 Linux 環境。 
因此我會用 Vmware 裝 Centos，在裡面架設 LAMP 環境，再用 SAMBA 分享資料夾給 Windows，  
如此不僅可以在自己熟悉的環境下編輯，程式還可以在理想的環境跑。


##編輯器

###[Pocket](http://getpocket.com/)
這是一個「稍後再讀」軟體，有各種瀏覽器的外掛。  
網路上常常會有很多好文章值得一讀，但是看到文章的當下不一定是適合閱讀的時間，
這時候我就會按一下 Pocket 的按鈕，文章便會自動儲存起來，等我有空的時間再來慢慢閱讀。

###[Evernote](http://evernote.com/intl/zh-tw/)
這是近來很紅的雲端筆記軟體，支援各種平台。  
一般我會拿來記一些容易忘記的程式碼片段，或是閱讀 Pocket 後值得收藏的文章。

###[Notepad++](http://notepad-plus-plus.org/)
不用多介紹的文字編輯器，是我主要的 Coding 工具，輕巧而且功能齊全。
順便提一下我使用的字體： [Inconsolata](http://levien.com/type/myfonts/inconsolata.html) ，是目前最推薦用來 Coding 的字體。


###[MarkdownPad](http://markdownpad.com/)
Markdown 是近來非常受歡迎的文件撰寫語法，
Markdown 只提供在撰寫文件時所需要的語法，所以在寫技術文件的時候速度會非常快，
格式也會非常統一；如果遇到 Markdown 沒有提供的語法，則可以直接插入 HTML 語法，可以說非常具有彈性。
相比之下， HTML 有太多瑣碎的語法，在文件維護和撰寫速度上會有很大的問題，  

MarkdownPad 提供了一個馬上編輯，馬上就可以看到結果的GUI介面。


##影像
###[PicPick](http://www.picpick.org/en/)
同事推薦的工具軟體，一用就上癮了XD   

**截圖**：截取全螢幕、框選範圍、視窗範圍...等等，截完圖還有比小畫家更強一些的編輯程式。  
**吸管**：擷取螢幕內任一 pixel 的顏色，而且還有放大鏡功能， 不怕取錯。  
**量角器**：顧名思義就是量角器。  
**尺規**：量螢幕元素的長度，在切版的時候非常方便。  
**白板**：可以在目前的畫面上塗鴉。



###[Imagine](http://www.nyam.pe.kr/phpBB3/viewtopic.php?f=2&t=1802)
可支援 Unicode 的免費看圖軟體！目前用過看圖速度最快的軟體，
甚至連PSD檔都可以看，不用開慢得要死的 PhotoShop 就可以看到圖片，實在太方便了！

可惜在讀取多目錄和壓縮檔的圖檔上不是非常理想。



##資料庫
###[Navicat](http://www.navicat.com/cht)
非常好用的資料庫管理軟體，支援目前主流資料庫，而會用這個的原因是， phpMyAdmin 太難用了QQ

###[Mysql Workbench](https://www.mysql.com/products/workbench/)
資料庫設計軟體，雖然 Navicat 也有提供設計的功能，但是沒這麼理想，  
所以我通常都在 Mysql Workbench 上設計好資料庫，再使用 Navicat 匯入 SQL 檔。 


##開發工具
###[WinCacheGrind](http://sourceforge.net/projects/wincachegrind/)
可以觀看 Xdebug profile 的結果，是 Debug 和 Optimization 時不可或缺的工具。

###[TortoiseGit](http://code.google.com/p/tortoisegit/)
Windows 的 Git GUI介面。

###[Burpsuite](http://www.portswigger.net/burp/)
知名的 Http 測試工具。


###[WinLess](http://winless.org/)
[Less](http://lesscss.org/) 是一個補足 css 不足的語言，可以在客戶端執行，也可以在 Server 端編譯出 css 檔案。

而 Winless 就是在 Windows 下的編譯器，會自動偵測 less 檔有無變更，並自動編譯出結果。


###[Filezilla](http://filezilla-project.org/)

不用多介紹的老牌 FTP 軟體。








　





















