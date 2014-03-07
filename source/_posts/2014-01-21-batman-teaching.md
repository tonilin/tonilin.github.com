---
layout: post
title: 'Batman 教學'
date: 2014-01-21 03:03
comments: true
categories: 
---
## 安裝 Batman

將 batman-rails 加入 Gemfile

```ruby Gemfile
gem 'batman-rails'
```

```bash
$ bundle
```

## 初始化 Batman

輸入:

```bash
$ rails g batman:app
```

會產生 batman skeleton 在 `app/assets/batman`，一個 BatmanController，一個 routing:

```bash
create  app/controllers/batman_controller.rb
create  app/views/layouts/batman.html.erb
insert  config/routes.rb
create  app/assets/batman/batman_example.js.coffee
create  app/assets/batman/models
create  app/assets/batman/models/.gitkeep
create  app/assets/batman/views
create  app/assets/batman/views/.gitkeep
create  app/assets/batman/controllers
create  app/assets/batman/controllers/.gitkeep
create  app/assets/batman/html
create  app/assets/batman/html/.gitkeep
create  app/assets/batman/lib
create  app/assets/batman/lib/.gitkeep
create  app/assets/batman/html/main
create  app/assets/batman/controllers/application_controller.js.coffee
create  app/assets/batman/controllers/main_controller.js.coffee
create  app/assets/batman/html/main/index.html
create  app/assets/batman/views/main/main_index_view.js.coffee
prepend  app/assets/batman/batman_example.js.coffee
prepend  app/assets/batman/batman_example.js.coffee
prepend  app/assets/batman/batman_example.js.coffee
prepend  app/assets/batman/batman_example.js.coffee
```

重新啟動 rails 以後打開 `http://batman-example.dev/` 就會看到 Batman 的 welcome page，因為所有的 routing 都被導走了。


## 結構

```
app/assets/batman/controllers# 相當於 Rails 的 controllers
app/assets/batman/html   # 相當於 Rails 的 views
app/assets/batman/models   # 相當於 Rails 的 models
app/assets/batman/views   # 用來控制 view 行為的 class，命名方式：ControllerName + ActionName + View
app/assets/batman/lib   # 相當於 Rails 的 helper
```

## 教學

http://requiremind.com/ruby-on-rails-4-and-batman-dot-js-another-getting-started-tutorial/

## 常用指令

```bash
$ rails generate batman:app  # 產生 Batman
$ rails generate batman:model # 產生 model
$ rails generate batman:controller # 產生 controller
```

## Routing 問題


原本的 Routing

```ruby
BatmanExample::Application.routes.draw do
  get "(*redirect_path)", to: "batman#index", constraints: lambda { |request| request.format == "text/html" }

  devise_for :users
  root :to => 'high_voltage/pages#show', :id => 'welcome'

end
```

應該把 batman routing 移到最後一行(Rails 的 routing 才不會都導到 batman)：

```ruby
BatmanExample::Application.routes.draw do
  devise_for :users
  root :to => 'high_voltage/pages#show', :id => 'welcome'

  get "(*redirect_path)", to: "batman#index", constraints: lambda { |request| request.format == "text/html" }
end
```









