---
layout: post
title: 'Rails 4.1.0 invalid locale 問題'
date: 2014-04-12 21:00
comments: true
categories: [Rails]
---

最近 Rails 4.1.0 release，在升級的時候發生了一個錯誤:

```bash
:zh is not a valid locale
```

application.rb 的 code 佷簡單：


```ruby
module Demo
  class Application < Rails::Application
    config.i18n.default_locale = :"zh-TW"
  end
end
```



以前不會出錯，為什麼現在會呢？於是 Google 了一下，發現 Rails 4.1.0 會將 `I18n.config.enforce_available_locales` 預設為 `true`

在 `enforce_available_locales` 為 `true` 的情況下，只要將 `locale` 設為不包含在 `available_locales` 內的值，就會報錯。


解法佷簡單就直接在 `application.rb` 裡面把 enforce_available_locales 改為 false：

```ruby
module Demo
  class Application < Rails::Application

    config.i18n.enforce_available_locales = false
    config.i18n.default_locale = :"zh-TW"
  end
end
```

如果想用 enforce_available_locales 但又不希望報錯呢？試著加入 available_locales 看看：

```ruby
module Demo
  class Application < Rails::Application

    config.i18n.available_locales = [:"zh-TW"]
    config.i18n.default_locale = :"zh-TW"
  end
end
```

依然還是會出現一樣的錯誤 `:zh is not a valid locale`，奇怪，我設定的是 `:"zh-TW"`，怎麼會報 `:zh` 不允許呢？
找了很久，發現在 `production.rb` 裡面有一行 i18n fallback：

```ruby
  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found).
  config.i18n.fallbacks = true
```

把 i18n fallbacks 設為 `true`，在找不到 `:"zh-TW"` 的 locale 的時候，會接著尋找 `:zh`，`:zh` 找不到才會接著找 `:en`。


於是解決方法就很清楚了，只要連 `:zh` 一起 available 就可以了：

```ruby
module Demo
  class Application < Rails::Application

    config.i18n.available_locales = [:"zh-TW", :zh]
    config.i18n.default_locale = :"zh-TW"
  end
end
```












