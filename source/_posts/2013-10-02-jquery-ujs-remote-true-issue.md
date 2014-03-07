---
layout: post
title: 'jQuery-ujs link_to issue'
date: 2013-10-02 10:34
comments: true
categories: [rails]
---

在 Rails 中，常常會使用 `remote => true` 的方式，使連結變成 Ajax 的方式送出去：

```ruby
link_to "Delete Comment", comment_path(@comment), :remote => true, :method => :delete
```

這樣的好處是不用另外寫 Ajax ，就可以輕鬆得送出 Ajax。

如果不指定 `remote => true` 只有指定 `method`，在點擊連結以後 jquery-ujs 會幫你產生一個表單，這個表單會放在 `<body>` 裡面，而且馬上送出去，如此，可以讓連結不只有 GET ，更可以做到 RESTful的效果。

```ruby
link_to "Delete Comment", comment_path(@comment), :method => :delete
```

但是這樣的方法卻會產生一些 issue。

<!--more-->


## Issue

以上兩個方法產生出來的 HTML 是一般的 `<a>` tag：

```html
<a href="/comments" data-remote="true" data-method="delete">Delete Comment</a>
```

這樣看起來似乎不會有什麼問題，但如果使用者對連結做了開新視窗的動作：

1. 按滑鼠中鍵點連結
2. 按右鍵 -> 選擇開新視窗
3. 按住 `CMD`，再點連結

相當於：

```html
<a href="/comments" target="_blank">Delete Comment</a>
```

這樣的行為是發出 `GET` 到 CommentsController 的 index action，跟原本的發 `DELETE` 到 destroy action 是不相同的，使用者達不到刪除的效果，而且如果 index 沒東西，那就會造成 500。

## button_to solution

在 Rails 有一個 button_to 的 helper：

```ruby
button_to "Delete Comment", comment_path(@comment), :remote: true, :method => :delete
```

用 button_to 雖然可以解決部份的問題，但仔細看一下他產生的 html：


```html
<form method="post" action="/comments" class="button_to" data-remote="true">
  <div>
  <input type="hidden" name="_method" value="delete" />
  <input value="Delete Comment" type="submit" />
  <input name="authenticity_token" type="hidden" value="xxxxxxx"/>
  </div>
</form>"
```

這樣的 HTML 會產生幾個問題：

1. 因為產生的是 `<form>` 所以不能在 `<form>` 裡面使用，HTML 是不允許 nested form 的。
2. `<form>` 預設是 `display:block`，跟原本的 `<a>`，表現方式不一樣，需要 overide style。
3. `<input>` value 裡面不能塞 HTML，所以如果這個按鈕有 icon 之類的 tag 就無法放進去(這個問題在 Rails 4.0有修正)。

## Solution

這個問題真的很惱人，原本很好用的小技巧，變成天天被 Airbrake 轟炸的原兇，所以就寫了一個 button_link_to helper：

```ruby application_helper.rb
module ApplicationHelper
  def button_link_to(name = nil, options = nil, html_options = nil, &block)
    html_options, options = options, name if block_given?
    options ||= {}
    html_options = convert_options_to_data_attributes(options, html_options)
    url = url_for(options)
  
    html_options.merge!({"data-url" => url, :type => "button"})
  
    content_tag(:button, name || url, html_options, &block)
  end
end
```

這個方法跟 `link_to` 使用的方式一模一樣，產生出來的是 `<button>` tag，而且是單純的 tag，不會有 `<form>` 包在外面：

```ruby
button_link_to "Delete Comment", "/comments", :remote => true
```

```html
<button data-url="/comments" data-remote="true" type="button">Delete Comment</button>
```

預設的 jquery-ujs，按到這個 button，就已經會自動發 ajax 出去，但是這邊應該要讓按中鍵也會跟按左鍵有一樣的效果，於是要加上下面的 js：

```javascript application.js
$(document).on("mouseup", "button[data-remote]", function(e) {
  // middle button click
  if(e.which == 2) {
    $(e.currentTarget).trigger("click.rails")
  }
});
```

但是如果沒有 `:remote => true`，只有指定 `method`，照原本的規則應該在 `<body>` 裡面塞 form，並自動送出去，所以要再加入：

```javascript application.js
  $(document).on("click.rails", "button[data-method]", function(e) {
    button = $(e.currentTarget)


    if (button.data('method') && button.data('remote') === undefined) {
      if (!$.rails.allowAction(button)) return $.rails.stopEverything(e);
      
      handleMethod(button)
    }

  });


  var handleMethod = function(button) {
    var url = button.data("url"),
      method = button.data('method'),
      target = button.data('target'),
      csrf_token = $('meta[name=csrf-token]').attr('content'),
      csrf_param = $('meta[name=csrf-param]').attr('content'),
      form = $('<form method="post" action="' + url + '"></form>'),
      metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

    if (csrf_param !== undefined && csrf_token !== undefined) {
      metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
    }

    if (target) { form.attr('target', target); }

    form.hide().append(metadata_input).appendTo('body');
    form.submit();
  }

```

這樣一來 button_link_to 就可以做到 ajax send 和 form submit 的功能了！


## Style

原本的 `<a>` 和 `<button>` 樣式是不一樣的，一個是文字，一個是按鈕。

這時候只要加上 Twitter Bootstrap 的 `btn-link` class 就好了：

```ruby
button_link_to "Delete Comment", "/comments", :remote => true, :class => "btn-link"
```

## HTML button

因為使用的是 button 而不是 input，所以也可以塞 HTML 進去，Icon 就可以正常運作了，使用跟 link_to 一樣的方式丟入 block：

```html
button_link_to , "/comments", :remote => true, :class => "btn-link" do
  <i class="icon-remove"></i>  Delete Comment
end
```

## 實現 Confirm message

```javascript
  $(document).on("click.rails", "button[data-method]", function(e) {
    button = $(e.currentTarget)

    if (button.data('method') && button.data('remote') === undefined) {
      if (!$.rails.allowAction(button)) return $.rails.stopEverything(e);

      handleMethod(button)
    }

  });

```

## 實現 data-disabled-with

```javascript

  $(document).on("click.rails", "button[data-method]", function(e) {
    button = $(e.currentTarget)

    if (button.data('disable-with')) $.rails.disableElement(button);

    if (button.data('method') && button.data('remote') === undefined) {
      if (!$.rails.allowAction(button)) return $.rails.stopEverything(e);

      handleMethod(button)
    }

  });


  $(document).on("ajax:complete", "button[data-disable-with]", function() {
    $.rails.enableElement($(this));
  });

```


## Code

這邊我把會用到的 code 總結起來，把這些 code 貼到 `application_helper.rb` 和 `application.js` 裡面，接著把 link_to 改成 button_link_to，再修一下 style 就可以了！

```ruby application_helper.rb
module ApplicationHelper
  def button_link_to(name = nil, options = nil, html_options = nil, &block)
    html_options, options = options, name if block_given?
    options ||= {}
    html_options = convert_options_to_data_attributes(options, html_options)
    url = url_for(options)
  
    html_options.merge!({"data-url" => url, :type => "button"})
  
    content_tag(:button, name || url, html_options, &block)
  end
end
```

```javascript application.js
(function() {
  $document = $(document)

  $(document).on("mouseup", "button[data-remote]", function(e) {
    // middle button click
    if(e.which == 2) {
      $(e.currentTarget).trigger("click.rails")
    }
  });


  $document.on("click.rails", "button[data-method]", function(e) {
    button = $(e.currentTarget)

    if (button.data('disable-with')) $.rails.disableElement(button);

    if (button.data('method') && button.data('remote') === undefined) {
      if (!$.rails.allowAction(button)) return $.rails.stopEverything(e);

      handleMethod(button)
    }

  });


  $document.on("ajax:complete", "button[data-disable-with]", function() {
    $.rails.enableElement($(this));
  });


  var handleMethod = function(button) {

    var url = button.data("url"),
      method = button.data('method'),
      target = button.data('target'),
      csrf_token = $('meta[name=csrf-token]').attr('content'),
      csrf_param = $('meta[name=csrf-param]').attr('content'),
      form = $('<form method="post" action="' + url + '"></form>'),
      metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

    if (csrf_param !== undefined && csrf_token !== undefined) {
      metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
    }

    if (target) { form.attr('target', target); }

    form.hide().append(metadata_input).appendTo('body');
    form.submit();
  }



})();

```









