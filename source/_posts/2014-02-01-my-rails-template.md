---
layout: post
title: '我的 Rails template'
date: 2014-02-01 06:21
comments: true
categories: 
---
Github 上有非常多的 Rails template，例如 [Rails Composer](https://github.com/RailsApps/rails-composer), [RailsBricks](https://github.com/nicoschuele/railsbricks/), [Bootstrappers](https://github.com/xdite/bootstrappers)，這些都是很好的 Template，有他們自己很棒的 Practice，但是不管這些 Template 有多好，生成出來的東西，有些還是不符合自己的需求，還是需要砍掉部分不需要的，加入一些自己習慣用的。

有鑑於每次產生出來以後還要做很多事情，所以，最近用了 [Rails Apps Composer](https://github.com/RailsApps/rails_apps_composer) 製作了自己的 Rails template，可以一行指令就產生我自己常用的 Gems, Settings, Views...等等：

```bash
rails new project_name -m https://raw.github.com/tonilin/rails_recipe/master/template.rb
```

( `project_name` 可以換成你想要的專案名稱。)

## 需求

- Rails 4.0
- Ruby 2.1.0
- RVM
- Mysql
- 使用 capistrano deploy
- Server side 使用 Unicorn 當 Server

因為是自己的 Best Practice 所以就裡面只會問你資料庫帳號密碼，其他一律是用我習慣使用的，不會用一堆命令行問你資料庫想用哪種，要不要裝 Devise 之類的。如果不是你習慣用的可以 fork [tonilin / rails-recipe](https://github.com/tonilin/rails-recipe) 回去改，或是用比較有彈性的 [Rails Composer](https://github.com/RailsApps/rails-composer) 或 [RailsBricks](https://github.com/nicoschuele/railsbricks/)。

有興趣自己寫 template 的，改天會開一篇文章教大家如何用 [Rails Apps Composer](https://github.com/RailsApps/rails_apps_composer) 產生自己習慣的 Rails template。


## 內容

使用 Rails Apps Composer 可以讓 recipe 看起來很乾淨，看 code 就可以知道包含了什麼，所以參考 https://github.com/tonilin/rails-recipe/blob/master/roachking.rb，大概可以知道包了什麼東西進去。



