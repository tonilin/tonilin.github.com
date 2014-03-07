---
layout: post
title: 'Filepicker.io Security in Ruby'
date: 2013-09-04 12:40
comments: true
categories: 
---

![螢幕快照 2013-09-04 下午7.46.01.png](http://user-image.logdown.io/user/7/blog/530/post/100056/hHoFBaZCSyOVjjw8KDF9_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-09-04%20%E4%B8%8B%E5%8D%887.46.01.png)

Filepicker 是一個非常好用的 File upload service，它可以讓你用簡單的 Javascript，就能做出超好用的圖片上傳，Backend 完全不用寫 Code，就可以讓使用者把圖片傳到 S3 上，詳細的介紹可以參考[官網](https://www.inkfilepicker.com/)，這篇主要介紹 Filepicker 安全性問題。

<!--more-->

## 簡單的 Pick & Store

Filepicker 只要簡單的一小段 code，就可以讓使用者挑選檔案，並傳到 S3：

```javascript filepicker.js
filepicker.pickAndStore({
  maxSize: 50 * 1024
},{
  access: 'public',
  location: 'S3',
  path: "/"
},function(InkBlobs){
  console.log(JSON.stringify(InkBlobs));
});
```

但如果稍微想一下，就會發現 maxSize 和 path 都寫在前端，那如果稍微懂點 Javascript 的使用者，把這兩個變數塞別的數值進去，那他就可以傳任意大小的檔案到任意的路徑。

## Filepicker 安全機制

Filepicker 提供一個 Security 機制，可以避免這個問題，流程如下：

1. 跟 Filepicker 申請一個 `App Secret`
2. 在 Server Backend 定義 `policy`，並用 Base64 加密。
3. 在 Server Backend 使用 `App Secret` 加密 `policy`，產生出 `signature`
4. Javascript 在呼叫 API 的時候，送出 `policy` 和 `signature` 做驗證。

但是官網提供的 [Security文件](https://developers.inkfilepicker.com/docs/security/) 是用 python 做範例，這邊我們用 ruby 來一步一步教學。

## 申請 `App Secret`

到官網後台的左邊選單 `App Secret` 處，就可以申請一個 Secret：

![Ink_File_Picker___Developer_Portal_-_logdown_rocodev.com.jpeg](http://user-image.logdown.io/user/7/blog/530/post/100056/bPjkFPwXSXyI77n8vDU6_Ink_File_Picker___Developer_Portal_-_logdown_rocodev.com.jpeg)

注意，上面的 `Use Security` 勾選以後，前端送出的 request 就全部都要送 policy 和 signature，不然會失敗。


## 定義 `policy`

Policy 就是定義使用者可以用哪些功能、上傳多大的檔案、上傳路徑為何 ...，詳細的 options 可以參考官網文件。

用 Ruby 先定義簡單的 policy:

```ruby Filepicker.rb
policy = {
  "expiry" => (Time.now  + 3.days).to_i,   # 這組 Policy產生出來的 signature，只能在三天內使用
  "maxSize" => 1024 * 1024 * 10, # 10mb			# 最大只能上傳 10mb
  "call" => ["pick", "store"],              # 只能使用pick , store
  "path" => ".*"                       			# Path 的 Regular Expression
}
```

接著用 Base64 幫 policy 加密：

```ruby Filepicker.rb
json_policy = policy.to_json
encoded_policy = Base64.urlsafe_encode64(json_policy)
```

## 產生 signature

有了 encoded_policy 和 app secret 就能產生 signature

```ruby Filepicker.rb
app_secret = "your secret"
signature = OpenSSL::HMAC.hexdigest('sha256', file_picker_secret, encoded_policy)
```

Filepicker 會檢查加密後的 policy 和 Signature 是否一致，而且只有我們和 Filepicker 才知道 `App Secret` 是什麼，第三方如果沒有 App Secret 是沒辦法產生出 Signature 的。

## 使用 Security 機制

接著就可以把產生出來的 signature 和 encoded_policy 塞進 Javascript：

```javascript filepicker.js
filepicker.pickAndStore({
  maxSize: 50 * 1024,
  policy: encoded_policy,
  signature: signature
},{
  access: 'public',
  location: 'S3',
  path: "/"
},function(InkBlobs){
  console.log(JSON.stringify(InkBlobs));
});
```

## 簡單測試

我們把 Server side Policy 的 maxSize 設成 1kb：

```ruby Filepicker.rb
policy = {
  "expiry" => (Time.now  + 3.days).to_i,
  "maxSize" => 1024, # 1kb
  "call" => ["pick", "store"]
}
```

在 Javascript 那邊假裝惡意使用者，把 maxSize 設成 10mb：

```javascript filepicker.js
filepicker.pickAndStore({
  maxSize: 1024 * 1024 * 10, // 10mb,
  policy: encoded_policy,
  signature: signature
},{
	access: 'public',
	location: 'S3',
	path: "/"
},function(InkBlobs){
	console.log(JSON.stringify(InkBlobs));
});
```

接著上傳一個超過 1kb 的檔案，可以看到錯誤訊息：

![螢幕快照 2013-09-04 下午8.28.57.png](http://user-image.logdown.io/user/7/blog/530/post/100056/zT9LEJmESQmqBhhwz02p_%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7%202013-09-04%20%E4%B8%8B%E5%8D%888.28.57.png)

## 小結

用了 Security 以後，就可以對網站不一樣的使用者，做不一樣的權限控管，未付費會員不能上傳檔案，因此就不產生 signature 給他，以及各種 User 檔案上傳大小限制之類的。不會因為是寫在 Javascript，而被輕鬆破解。








