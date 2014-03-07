---
layout: post
title: '搬 Logdown Editor Guide'
date: 2013-11-06 09:54
comments: true
categories: 
---
## 搬 Javascript

### 複製以下檔案
```
/app/assets/javascripts/editor
/app/assets/javascripts/codemirror_wrapper.js
/app/assets/javascripts/codemirror_composition_mod.js.coffee
```
### Gemfile 加入以下幾行
```ruby Gemfile
gem "font-awesome-rails", "3.2.1.1"
gem 'codemirror-rails', '~> 3.15.0', :git => "git@github.com:zhusee2/codemirror-rails.git"
```

### 修改 production.rb 的 `config.assets.precompile`
```ruby production.rb
  config.assets.precompile += %w( editor.js codemirror_wrapper.js)
```

## 搬 stylesheets

### 複製以下檔案

```
/app/assets/stylesheets/editor
/vendor/assets/stylesheets/datetimepicker.css
/app/assets/stylesheets/codemirror_custom.css.scss
/app/assets/stylesheets/logdown_theme.css.scss
/app/assets/stylesheets/solarized.css
```

### application.css.scss 加入：

```scss
//= require font-awesome
//= require datetimepicker
//= require codemirror
//= require codemirror_custom
//= require logdown_theme
//= require solarized
```

## 搬 i18n

### 複製以下檔案

```
/config/locales/views/editor.en.yml
/config/locales/views/editor.ja.yml
/config/locales/views/editor.zh-CN.yml
/config/locales/views/editor.zh-TW.yml
```

### application.rb 加入：

```ruby application.rb
config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]
```

## 搬 view

### 複製以下檔案

```
/app/views/account/posts/editor
/app/views/account/posts/_form.html.erb
/app/views/account/posts/preview_content.json.jbuilder
/app/views/account/posts/update.js.erb
```

### 設定


### 修改所有 View 內的 ruby varaiable 和 partial path 以符合目前project 需要

### helper 加入 mathjax_tag

```ruby application_helper.rb
  def mathjax_tag
    if request.try(:ssl?)
      javascript_include_tag "https://s3-ap-northeast-1.amazonaws.com/logdown-mathjax/MathJax.js?config=TeX-AMS_HTML"
    else
      javascript_include_tag "http://mathjax.logdown.io/MathJax.js?config=TeX-AMS_HTML"
    end
  end
```


### config.yml 加入 filepicker 和 s3 資訊

```yaml config.yml
defaults: &defaults
  filepicker_key: xxxxx
  filepicker_secret: xxxxx
  s3_root_url: xxxx
```

### Javascript Global Variable

開一個檔案：
```javascript common/_javascript_settings.js.erb
var setting = {
  filepicker_key: "<%= Setting.filepicker_key %>",
  s3_root_url: "<%= Setting.s3_root_url %>"
}
```

需插在 application.js 前面：
```html application.html.erb
  <script>
    <%= render :partial => "common/javascript_settings.js.erb" %>
  </script>

  <%= javascript_include_tag "application" %>
```




### Javascript 設定

```javascript _form.html.erb
    var options = {
      s3Path: "<%= @s3_path %>",    //由 post_controller#handle_filepicker_signature 產生
      signature: "<%= @signature %>",   //由 post_controller#handle_filepicker_signature 產生
      encoded_policy: "<%= @encoded_policy %>",  //由 post_controller#handle_filepicker_signature 產生
      s3RootUrl: setting.s3_root_url,  //這邊需傳入 s3 root_url
      filepickerKey: setting.filepicker_key,  //這邊需傳入 filepicker key
      previewEndPoint: "<%= preview_content_account_posts_path %>", //根據 project 指定 path
      imageUploadCalculateEndPoint: "<%= increase_image_upload_counter_account_settings_path %>", //根據 project 指定 path
      categoryCreateEndPoint: "<%= account_blog_categories_path(@blog, :json) %>", //根據 project 指定 path
      isUserEnableUploadImage: <%= current_user.enable_upload_image? %>, // true 或 false，決定使用者能否上傳圖片
      localStorageKey: "post_<%= @post.id %>"  // 根據 model name 指定
    }

    var elements = {
      editorContainer: ".logdown-editor",
      editorBody: ".editor-body",
      editorToolbar: ".editor-toolbar",
      editorToolbarWrapper: ".editor-toolbar-wrapper",
      editorSidebar: ".editor-sidebar",
      editorPreview: ".editor-preview",
      form: "form",
      contentTextarea: "#post_content",
      settingsPopover: ".settings-popover",
      stateField: "#post_current_state",
      tagsFieldWrapper: ".editor-tags-field",
      tagsFieldInput: "#post_tag_list",
      categoryField: ".settings-popover .category-field"
    }

    var logdownEditor = new Logdown.LogdownEditor(options, elements)
```




