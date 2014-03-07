---
layout: post
title: '使用 Roadie 減輕 Email 排版的痛'
date: 2013-06-10 23:00
comments: true
categories: [rails, Gems]
---

Roadie Repo : <https://github.com/Mange/roadie>

在排版 Email 時最痛苦的就是要寫 Inline Style，跟平常在排版的時候習慣大不相同，
而且 Inline Style 非常難維護，一封信同樣的 Style 就要複製一次，不同信的同樣 Style 也要複製一次，
哪天單純只是要改一個小樣式，所有的 Email 都要拿出來改，光用想的就很恐怖，這就是每次要排版 Email 都很痛苦的其中一個原因。

Roadie 就是用來解決這個問題的，你可以像平常一樣用 `<style type="text/css"></style>`，或是直接包 Assets 裡面的 CSS 進來，甚至是 SCSS 也可以，
它會自動幫你把 CSS 轉成 Inline Style，還會幫你把 HTML 裡的圖片改成 absolute URL。

<!--more-->


# 安裝 Roadie

在 Rails 的 Gemfile 加入：

```ruby Gemfile
gem 'roadie' 
```

# 設定

在 `application.rb` 或環境設定檔裡面，依需求加入以下的設定：

```ruby application.rb
config.roadie.enabled = false # Roadie 是預設開啟的，可以設為 false 關閉 Roadie。  
config.action_mailer.default_url_options = {:host => 'example.com'} # 有這行會自動將圖片的網址變成 Absolute。  
config.assets.enabled = true # 預設是使用 assets pipeline 裡面的 CSS，如設為 false，則會到 `public/stylesheets` 裡面找。  
```

其他還有更進階的設定，請參考 [Roadie Repo](https://github.com/Mange/roadie)。


# 開始使用

先測試看看用 `<style type="text/css"></style>` ，是否能正確轉換：
```html
<style type="text/css">
  .red {
    color: red;
  }
</style>

<p class="red">Red text</p>
```

成功輸出成 Inline Style：
```html
<p style="color:red">Red text</p>
```


# 使用 Asset Pipeline

前面的簡介有提到，可以直接使用 Asset pipeline 裡面的 SCSS，這樣我們就可以不用每封 Email 都重寫 CSS 了。


在 Mailer 裡面加上 `default :css => :email`，代表使用 email 這個 CSS。
```ruby app/mailers/sample_mailer.rb
class SampleMailer < ActionMailer::Base
  default :css => :email, :from => "example@example.com"

  def send_example_email
    mail(:to => "example@example.com", :subject => "Sample Email")
  end

end
```

也可以個別在每個 method，加入 CSS：
```ruby app/mailers/sample_mailer.rb
class SampleMailer < ActionMailer::Base
  default :from => "example@example.com"

  def send_example_email
    mail(:to => "example@example.com", :subject => "Sample Email", :css => [:email])
  end

end
```

在 `app/assets/stylesheets` 加入 `email.css.scss`：

```scss app/assets/stylesheets/email.css.scss
$red: red;

.red {
  color: $red;
}
```

接著 Email 的 HTML 就更簡潔了：
```html
<p class="red">Red text</p>
```

太棒了！一樣可以看到正常運作：
```html
<p style="color:red">Red text</p>
```


# 圖片自動轉換 Absolute URL

先隨意的加一段 Image tag：
```html
<img src="logo.png">
```

可以看到自動變成：
```html
<img src="http://example.com/logo.png">
```

如果是 CSS 裡面的 Image：
{% codeblock app/assets/stylesheets/email.css.scss  lang:scss %}
.logo {
  background-image: image-url("logo.png")
}
{% endcodeblock %}

竟然也會自動轉換：

```html
<p style="background-image:url(http://example.com/assets/logo.png)">test</p>
```



# 小結

雖然 Email 排版依然很痛苦，但是已經輕鬆很多，這個 Gem 還有更多設定，可以在 [Roadie Repo](https://github.com/Mange/roadie) 找到，
可以更進階得去修改 Email 裡面的內容。




















