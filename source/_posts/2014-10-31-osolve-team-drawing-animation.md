---
layout: post
title: '使用 SVG 將圖片做成動畫'
date: 2014-10-31 15:00
comments: true
categories:
---

昨天朋友 Kay 幫我們團隊 [oSolve](http://osolve.com) 成員畫了一張人像插畫，覺得超像的！

![oSolve Team](/upload/osolve-team-draw.png)

看了這張圖以後，覺得線條粗細一致而且線條幾乎都有分開，而且最近都在玩 SVG，突然靈機一閃，想把這張圖做成動畫，
於是經過兩個小時的努力，就變成下面這樣了：

<p data-height="584" data-theme-id="9636" data-slug-hash="DsinJ" data-default-tab="result" data-user="tonilin" class='codepen'>See the Pen <a href='http://codepen.io/tonilin/pen/DsinJ/'>oSolve Team Drawing Animation</a> by tonilin (<a href='http://codepen.io/tonilin'>@tonilin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

下面簡單描述一下怎麼把一張非向量的圖做成這樣的效果

<!--more-->

## 將 PNG 轉成 SVG

這邊我用到的方法是 [Potrace](http://potrace.sourceforge.net/) 他可以將一般的 Bitmap 圖片轉成向量圖，但是 [Potrace](http://potrace.sourceforge.net/)
不支援 PNG，所以在做之前要先將 PNG 轉成 PNM 再處理。

```bash
convert osolve_team.png osolve_team.pnm
potrace osolve_team.pnm -s -o osolve_team.svg
```

出來的結果像這樣，可以看到跟原圖的相似度非常高：

![oSolve Team](/upload/osolve-team-draw-before_sketch.svg)


## 使用 Sketch 整理圖層

因為 Potrace 產生出來的 SVG 並不會由畫畫的順序排列 Path，理想的情況是畫完一顆頭再畫另一顆，所以這邊把 SVG 做一點簡單的分類，
三顆頭和下面的文字：

![Sketch Group](/upload/osolve-team-sketch-group.png)

另存新檔以後 Path 就會依照這個順序排列了。

## 使用 Javascript 計算 Stroke Dash 長度

這邊使用到 SVG Path 的動畫原理，詳細的原理可以參考 [How SVG Line Animation Works | CSS-Tricks](http://css-tricks.com/svg-line-animation-works/)

```coffeescript

pathPrepare = ($el) ->
  lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);

 $ ->
  $("svg path").each ->
    $this = $(this)
    pathPrepare($this)
```

## 使用 CSS Animation

使用 css animation 對 svg 做動畫的效果：

```css
@keyframes dash {
  from {
    fill: #fff;
  }
  to {
    stroke-dashoffset: 0;
    fill: #000;
  }
}


svg.animated path {
  animation-name: dash;
  stroke-width: 2;
  stroke: #000;
}
```

應該會注意到我沒有上 animation time 和 animation delay，是因為寫在 scss compile 出來太龐大了，所以這邊會用 Javascript 來處理：


```coffeescript
$ ->
  delayTime = 0
  animationTime = 0.15;

  $("svg path").each ->
    $this = $(this)
    $this.css("animation-delay", "#{delayTime}s")
    $this.css("animation-duration", "#{animationTime}s")
    $this.css("animation-fill-mode", "forwards")

    delayTime += animationTime
```

## 給 SVG animated 的 class

上面的 css 指定 `svg.animated` 下的 Path 才會有動畫效果，最後這邊只要加上 animated 的 class 就完成了！

```coffeescript
$("svg").attr("class", "animated")
```


## 成品

看起來效果還不錯！最近常常在玩 SVG，還滿有成就感的，最近 [oSolve](http://osolve.com) 的新產品 [Worknow 打工趣](http://worknowapp.com/) 的首頁也有用到
SVG 來呈現動畫效果，有興趣也可以連過去看。

<p data-height="584" data-theme-id="9636" data-slug-hash="DsinJ" data-default-tab="result" data-user="tonilin" class='codepen'>See the Pen <a href='http://codepen.io/tonilin/pen/DsinJ/'>oSolve Team Drawing Animation</a> by tonilin (<a href='http://codepen.io/tonilin'>@tonilin</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>







