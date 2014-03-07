---
layout: post
title: '不要使用 INT 來儲存 Facebook ID 或 Twitter ID'
date: 2014-01-20 03:15
comments: true
categories: 
---
今天在修一個使用者回報的 Facebook Binding 登入到錯誤帳號的問題，於是就開啟資料庫來看，發現一堆 Binding 都是綁到 Facebook 的 2147483647 這個 UID。 靠！好熟悉的數字，這不是天堂金幣的上限嗎？

這麼熟悉的數字一看就知道溢位了 Orz ，用 mysql 的話把欄位改成 BIGINT 就沒問題了，Rails 的修改方式：

```ruby
class ModifyUidToBigIntToAuthorizations < ActiveRecord::Migration
  def change
    change_column :users, :facebook_id, :integer, :limit => 8
  end
end
```

至於為什麼是 limit 8，

Mysql：

```ruby active_record/connection_adapters/abstract_mysql_adapter.rb https://github.com/rails/rails/blob/c28d0f2031d31aeb5289b73acbb5c1adb7bd71d4/activerecord/lib/active_record/connection_adapters/abstract_mysql_adapter.rb#L109
def extract_limit(sql_type)
  case sql_type
  when /^enum\((.+)\)/i
    $1.split(',').map{|enum| enum.strip.length - 2}.max
  when /blob|text/i
    case sql_type
    when /tiny/i
      255
    when /medium/i
      16777215
    when /long/i
      2147483647 # mysql only allows 2^31-1, not 2^32-1, somewhat inconsistently with the tiny/medium/normal cases
    else
      super # we could return 65535 here, but we leave it undecorated by default
    end
  when /^bigint/i;    8
  when /^int/i;       4
  when /^mediumint/i; 3
  when /^smallint/i;  2
  when /^tinyint/i;   1
  else
    super
  end
end
```

Postgresql：

```ruby active_record/connection_adapters/abstract_mysql_adapter.rb https://github.com/rails/rails/blob/1543863548bcd7515fac7b7b1931b6e23fedf80f/activerecord/lib/active_record/connection_adapters/postgresql_adapter.rb#L169
def extract_limit(sql_type)
  case sql_type
  when /^bigint/i;    8
  when /^smallint/i;  2
  when /^timestamp/i; nil
  else super
  end
end

```
