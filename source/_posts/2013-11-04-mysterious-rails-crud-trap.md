---
layout: post
title: '神祕的 Rails CRUD 陷阱'
date: 2013-11-04 03:25
comments: true
categories: 
---
最近做專案的時候，要把一個由 Form 送出去的 DELETE，變成用 Ajax 送出去，發生了很危險而且意料之外的事情。

## 情境

先來重現一下一開始的情境：

一開始先有一個 comment 的 Controller，裡面有一個 Destroy 的 Action，在使用者送 DELETE 到 `/posts/1/comments/1`時，會刪除 ID 為 1 的 Comment，接著 redirect 到 `/posts/1`。

```ruby comments_controller.rb
class CommentsController < ApplicationController
  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    redirect_to post_url(@post)
  end
end
```

接著使用 jQuery ujs，送出 DELETE Form 到 post_comment_path(1, 1)：

```erb destroy_comment.html.erb
<%= link_to("Delete comment", post_comment_path(1, 1), :method => :delete) %>
```

## 狀況

這個時候覺得每次刪除 comment，都會重新刷新畫面，太擾人了，想改用 Ajax 來完成，於是我們把 HTML 多了一個， `:remote => true`：

```erb destroy_comment.html.erb
<%= link_to("Delete comment", post_comment_path(1, 1), :method => :delete, :remote => true) %>
```

Controller 則是維持不變。

這樣會發生什麼事情呢？如果你也覺得只會刪除 comment 那就掉入陷阱了。

## 實際情況

按下 Delete comment 會發生什麼事情呢？首先會刪除 comment，這應該沒有什麼問題。那接下來遇到的 redirect 會發生什麼事情呢？

如果送過來的不是 ajax，他會直接 redirect 到 `/post/1` 也就是 post_controller 的 show action，很理所當然的 show 出 post 內容。

但如果是 Ajax 呢？他一樣會 redirect 到 `/post/1`，但是卻會用 `DELETE`，所以是丟到 post_controller 的 destroy action，於是你的 post 就會被刪除了XDDD

為什麼會這樣呢？我也不知道XDDD，改天有空研究再另外 PO 一篇。

## 解決方法

其實只要依照不同的要求，回應不同的處理方法就好：

```ruby  comments_controller.rb
class CommentsController < ApplicationController
  def destroy
    @comment = @post.comments.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html do
        redirect_to post_url(@post)
      end
      format.js do
        head :no_content
      end
    end
  end
end
```

但是如果非常有自信得只改前端，肯定會掉入陷阱。第一次掉進去的時候，還真的嚇到我了，還好是在開發環境，沒刪到什麼重要資料，學了 Rails 半年多，到現在還是能給我驚奇 >////<




