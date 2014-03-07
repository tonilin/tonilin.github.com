---
layout: post
title: 'Bundle Install Parallel'
date: 2013-12-30 15:25
comments: true
categories: 
---
Bundler 在 v1.4 以後新增了 parallel install 的功能，可以增快 `bundle install` 的速度。

根據 <https://github.com/bundler/bundler/pull/2481> 這個 pull requst 來看，在 gem 的數量很多的時候，速度是相差非常大的：

```
bundle --path sequential  183.03s user 45.13s system 38% cpu 9:55.48 total
bundle --path parallel -j4  234.85s user 50.14s system 77% cpu 6:05.52 total
```

## 事先準備

首先要確定自己的 bundler 版本是不是大於 1.4:

```bash
bundle --version
```

如果不是的話請先升級 bundler:

```
gem install bundler -v ">=1.5.1"
```

確認自己 cpu 有幾個核心(以 osx 為範例)：

```bash
sysctl -n hw.ncpu
```

我是用 macbook air，是四核，下面都以 4 核為範例。

## 使用 parallel install

升級 bundler 後就可以使用 parallel 了，只要在後面加上 -j4，4 代表 4 個 jobs：

```bash
bundle install -j4
```

也可以 global 更改預設的 jobs 數：

```
bundle config --global jobs 4
```

這樣就不用每次都打 `-j4` 。



## 使用在 capistrano 上

如果在 capistrano 的 `deploy.rb` 是使用 `require "bundler/capistrano"`，只要在 `deploy.rb` 裡面加上：

```
set :bundle_flags,    "--deployment --quiet -j4"
```

這樣在跑 `cap deploy` 的時候， `bundle install` 就會加上 `-j4` 了。




