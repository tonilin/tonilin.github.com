---
layout: post
title: 'Gem button_link_to '
date: 2013-10-17 15:30
comments: true
categories: 
---
前陣子寫了一篇 [jQuery-ujs link_to issue](http://blog.roachking.net/blog/2013/10/02/jquery-ujs-remote-true-issue)，裡面我寫了一個 `button_link_to` helper 來解決 `button_to` 和 `link_to` 的問題。

寫完以後發現不同專案要用到這個 method，我都要複製一次太麻煩了XD，於是就把它包成 Gem 了。

Github: <https://github.com/tonilin/button_link_to>

如果想要看 Demo 可以到這: <http://button-link-to.herokuapp.com/>

<!--more-->

## 安裝

把下面這行加入 `Gemfile`

```ruby Gemfile
gem 'button_link_to'
```

把下面這兩行加入 `app/assets/javascript/application.js`

```javascript app/assets/javascript/application.js
//= require jquery_ujs
//= require button_link_to
```

## 使用方式

就跟 link_to 一樣用法，詳細可以參考 <http://button-link-to.herokuapp.com/>

