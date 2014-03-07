---
layout: post
title: '恐怖的 Nesting if statements '
date: 2012-11-12 20:30
comments: true
categories: [php]
---

在上一家公司裡，公司自行開發了一套 Framework，工程師都必須 Follow 這套 Framework 和設計標準，
而這套 Framework 是由其中一個有十年經驗的工程師所開發。他跟我說這套程式碼的開發流程後，給了我一個 Sample Code，
一看之下，讓我馬上決定離開這家公司。

先不論這個 Framework 好不好用，光看裡面的 Coding Style，我就覺得無法從這家公司學到高深的技術了。
在那個 Sample Code 中，我看到最噁心的東西就是，不斷的 if else if else，少則三四層，多則五六層。
他跟我說程式碼可以維護是很重要的，結果我看到他的寫的東西卻是這樣...這種東西可以維護嗎(怒)？

<!--more-->

下面就是我看到的東西，其實只要稍微下點工夫雕琢，就可以讓 Code 更好看：

##Example 1

{% codeblock lang:php %}
<?
function some_function($param) {
    if ($param === 'OK') {
        /*
    
            A


            lot
            
            
            of
            
            
            statement ...
            
        */
        return true;
    } else {
        return false;
    }
}
{% endcodeblock %}

這種 Code 很常見，但是要看完一整頁的 Code ，才會發現，原來條件不符合會 return false。

如果改成這樣寫：

{% codeblock lang:php %}
<?
function some_function($param) {
    if ($param !== 'OK') {
        return false;
    }
    
    /*

        A


        lot
        
        
        of
        
        
        statement ...
        
    */
    return true;
}
{% endcodeblock %}

一開始不符合的條件就直接 return false ，剩下來的全部都是 else！


##Example 2

再來就是恐怖的 Nesting if statements ：

{% codeblock lang:php %}
<?
function do_something() {
    if ($condition1) {
        if ($condition2) {
            if ($condition3) {
                do_something_special();
            }
            do_something_else();
        }
    }
}
{% endcodeblock %}

這種槽狀式的 statements ，通常看到第三層就頭昏眼花了，更別說過幾個月以後還要回來維護。
其實大部分超過三層的 if...else 通常都可以縮減到兩層以下。

以上面的例子，如果改成：

{% codeblock lang:php %}
<?
function do_something() {
    if (!$condition1) {
        return false;
    }
    
    if (!$condition2) {
        return false;
    }
    
    if ($condition3) {
        do_something_special();
    }
    
    do_something_else();

}
{% endcodeblock %}

這樣不就清楚多了？


##Example 3

在表單送出後，做一些條件判斷：

{% codeblock lang:php %}
<?
    $error_message = null;

    if($statementA)
    {   
        $error_message = '錯誤A';
    }
    
    if($statementB)
    {
        $error_message = '錯誤B';
    }
    
    if($statementC)
    {
        $error_message = '錯誤C';
    }
    
    if($error_message == null) {
        //show error message
        echo json_encode(array('msg' => $error_message));
        exit;
    } else {
        //store to database
        $some_model->save();
    }

{% endcodeblock %}

看起來沒問題，也是很直觀的寫法，但是如果條件一多起來，亂七八糟的 if else 就會非常難懂。
在這邊只要使用 try catch，不僅能讓 code 更簡潔，維護性也更好：

{% codeblock lang:php %}
<?
    try {
    
        if($statementA)
        {
            throw new Exception("錯誤A");
        }
    
        if($statementB)
        {
            throw new Exception("錯誤B");
        }
        
        if($statementC)
        {
            throw new Exception("錯誤C");
        }
    
        //store to database
        $some_model->save();
    
    } catch(Exception $e) {
        //show error message
        echo json_encode(array('msg' => $e->getMessage()));
        exit;
    }

{% endcodeblock %}

## 小技巧

當你一直在做重複的事情，或是開始察覺你的程式碼越來越多層、越來越難懂之時，

依案件的情況，你可以選擇馬上停下來思考一下，或是註解起來，等重構的時候再來處理。



## 小結

在要離開公司之前，跟那位十年經驗的前輩聊了一下，他始終覺得 OOP 、 refactoring 、 namespace 和 autoloading 
是沒必要的，他跟我說「 一開始程式寫好好的為什麼要重構？我的方法快速又有效 」。只可惜我只有一年年資，也敬重他是前輩，
所以不好意思當面嗆他。

我很委婉的跟他說公司的技術目前停在五年前，而且以這種 Coding 方式，這家公司的技術未來很難再成長。
或許他有他的道理，因為在台灣，接案的公司往往只要東西跑得出來就好了，技術和品質客戶不懂，也沒有心想去懂。

{% blockquote %}
Steve Jobs：Stay Hungry, Stay Foolish
{% endblockquote %}

不僅賈伯斯這麼說，三個傻瓜裡面也說「追求卓越，成功就會來追你」。不斷的學習、更新自己，似乎才是成功的不二法門。








