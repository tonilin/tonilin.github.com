---
layout: post
title: 'Devise create user hook'
date: 2013-12-10 08:36
comments: true
categories: 
---
今天做案子時，需要在 Devise user create 前後做一些事情，但是又不想污染 User model，以往的方法就是寫一個 `Users::RegistrationsController` 去繼承 `Devise::RegistrationsController`，然後把整個 method copy 過來一次：

```ruby
class Users::RegistrationsController < Devise::RegistrationsController
  def create
    # 在這裡加入 before hook
  
    build_resource(sign_up_params)

    if resource.save
      # 在這裡加入 after hook
      
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_up(resource_name, resource)
        respond_with resource, :location => after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        respond_with resource, :location => after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      respond_with resource
    end
  end
end  

```

但是這樣的寫法非常髒，而且如果 devise 有什麼修改，這邊有可能會壞掉。

今天在翻 [Devise registrations_controller](https://github.com/plataformatec/devise/blob/master/app/controllers/devise/registrations_controller.rb) 的時候發現，在 `3.2.1` 版以後，create action 裡面多了一行：

```ruby
yield resource if block_given?
```

於是，如果想要在 create user 的前後做一些事情，只需要：

```ruby
class Users::RegistrationsController < Devise::RegistrationsController
  def create
    # 在這裡加入 before hook
    
    super do |resource|
      # 在這裡加入 after hook
    end
  end
end
```

仔細看會發現 update、destroy 也有這一行，所以也可以如法炮製用在 update、destroy user 上。



