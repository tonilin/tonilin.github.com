---
layout: post
title: 'Pygments.rb 效能調校'
date: 2014-07-08 15:38
comments: true
categories: Rails, Gems
---

最近[公司](http://osolve.com)的新產品 [Torchpad](https://torchpad.com/) 剛上線，一開始效能都很好，

可是在文章在 render markdown 的時候非常慢，在觀察之後，發現只有在有 fenced code 的頁面才會特別慢，

在仔細看，原來是使用者沒有輸入正確的語言格式(誤把檔案名稱當語言)：

```plain
  ```app/assets/javascripts/angular/app.js
    app = angular.module("app", [])
  ```
```

正確的寫法應該是

```plain
  ```javascript app/assets/javascripts/angular/app.js
    app = angular.module("app", [])
  ```
```

第一種錯誤的寫法會讓回應時間多了 200ms，如果一個頁面裡面有 5 個這種寫錯的 fenced code，就至少會慢 1000ms，而且使用者一定會有出錯的時候。

<!--more-->


來看看 Pygments.rb Highlight 的 code，非常簡單，正確的語言進去就直接 render 出來，錯誤的會 raise exception，把 lexer 用 text 傳進去，確保不支援的語言也會顯示出來。


```ruby
def code_highlight(code, language)
    Pygments.highlight(code, :lexer => language, options: {linespans: 'line'})
  rescue => e
    Pygments.highlight(code, :lexer => "text", options: {linespans: 'line'})
end
```
 
速度既然是慢在不支援的語言噴錯以後 rescue 非常慢，現在要做的就是 Pygments 不支援的語言不要傳進去，於是去翻 Pygments.rb 的 code 發現一個方法，可以尋找 Pygments 支援的語言

```ruby
Pygments::Lexer.find(language)
```

試了一下這個 method，就算傳進錯誤的或不存在的語言，速度也非常快。

於是解決方法就出來了，只要先判斷再 Highlight 就好了：

```ruby
if Pygments::Lexer.find(language)
  Pygments.highlight(code, :lexer => language)
else
  Pygments.highlight(code, :lexer => "text")
end
```

## Benchmark


寫了一個簡單的 script 來測試一下兩種方法的速度

```ruby
require 'pygments'
require 'benchmark'

include Benchmark
# number of iterations
num = 20

code = 'app = angular.module("app", [])'

puts "Benchmarking....\n"
puts "Iterations: " + num.to_s + "\n"

def highlight_fail_raise_exception(code, language)
  Pygments.highlight(code, :lexer => language, options: {linespans: 'line'})
rescue => e
  Pygments.highlight(code, :lexer => "text", options: {linespans: 'line'})
end

def highlight_fail_dont_raise_exception(code, language)
  if Pygments::Lexer.find(language)
    Pygments.highlight(code, :lexer => language)
  else
    Pygments.highlight(code, :lexer => "text")
  end
end

Benchmark.bm(40) do |x|
  x.report("Currect language before fixed")  do
    for i in 1..num
      highlight_fail_raise_exception(code, "javascript")
    end
  end
end

Benchmark.bm(40) do |x|
  x.report("Wrong language before fixed")  do
    for i in 1..num
      highlight_fail_raise_exception(code, "app/assets/javascripts/angular/app.js")
    end
  end
end

Benchmark.bm(40) do |x|
  x.report("Currect language after fixed")  do
    for i in 1..num
      highlight_fail_dont_raise_exception(code, "javascript")
    end
  end
end

Benchmark.bm(40) do |x|
  x.report("Wrong language after fixed")  do
    for i in 1..num
      highlight_fail_dont_raise_exception(code, "app/assets/javascripts/angular/app.js")
    end
  end
end

```

可以看到差異是非常大的：

```text
Benchmarking....
Iterations: 20
                                               user     system      total        real
Currect language before fixed              0.010000   0.000000   0.010000 (  0.198326)
                                               user     system      total        real
Wrong language before fixed                0.020000   0.010000   3.030000 (  3.083720)
                                               user     system      total        real
Currect language after fixed               0.020000   0.000000   0.020000 (  0.059186)
                                               user     system      total        real
Wrong language after fixed                 0.000000   0.010000   0.010000 (  0.015615)
```











