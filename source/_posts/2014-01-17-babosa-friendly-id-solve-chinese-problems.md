---
layout: post
title: '使用 babosa 配合 friendly_id 解決中文網址問題'
date: 2014-01-17 07:01
comments: true
categories: 
---
[FriendlyId](https://github.com/norman/friendly_id) 是用來讓 ActiveRecord 產生 Slug 的 Gem，一般 Rails App 通常是用資料庫的 id，以 SQL 資料庫來說就會是一個遞增的整數 `http://example.com/users/1`，這樣的網址沒有意義，會讓競爭對手知道你有多少 Record，而且要寫爬蟲也非常簡單，一直遞增數字就可以把整個網站爬完了。

為了解決這個問題，通常會產生 Slug 來當做 record 的識別，一般的用法是這樣：

```ruby user.rb
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
end
```

如果 slug 是唯一的，就可以用 `http://example.com/users/roach-king` 來讀取到唯一的 record，而不會有醜醜的網址：

```ruby
user = User.create! name: "Roach King"
user.to_param #=> "roach-king"

# In UserController#show

user.friendly.find(parmas[:id])
```



可是這個 Gem 的設計會使用 ActiveSupport 的 [parameterize](http://apidock.com/rails/ActiveSupport/Inflector/parameterize)，把非 `a-z,0-9,-` 的字元全部變成 `-`，於是中文字就會被吃掉了：

```ruby  friendly_id/lib/friendly_id/slugged.rb https://github.com/norman/friendly_id/blob/5768abaa426078cc25a651fa9fed9145721f780e/lib/friendly_id/slugged.rb#L274
def normalize_friendly_id(value)
  value.to_s.parameterize
end
```


為了解決這個問題，可以用另外一個 Gem [babosa](https://github.com/norman/babosa) 來配合，他可以把 UTF-8 字元處理好，而不是都消滅：

```ruby
"蟑 & 螂  窩".to_slug.normalize.to_s #=> "蟑螂窩"
```

跟 FriendlyId 配合只要把 `normalize_friendly_id` override 就可以了：

```ruby user.rb
class User < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize.to_s
  end

end
```



