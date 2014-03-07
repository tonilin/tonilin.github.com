---
layout: post
title: '開發時 Error Reporting 永遠使用 E_ALL'
date: 2012-11-09 19:00
comments: true
categories: [php]
---

PHP 允許開發者自行設定 Error Reporting *(錯誤報告)* 的 Level。有些開發者因為開發方便而設成 (E_ERROR |  E_PARSE)，
故意去忽略 notices 和 warmings 的訊息。雖然這些訊息只是在提醒你，
但也說明了你的程式不夠嚴謹。打開這些訊息，讓 Error Reporting 來告訴你哪些寫法是具有危險性的。

將 Error Reporting 設成 E_ALL 有兩種方法，一種是從 php.ini 設置；
而另外一種則是在 runtime 的時候加入一行：

{% codeblock lang:php %}
<?
error_reporting( E_ALL );

{% endcodeblock %}

如果你的專案已經開發到一定程度，而且從來沒開過 E_ALL，那你可能會看到非常多的錯誤訊息，下面簡單介紹一些常見的錯誤：

- 沒初始化的變數
- 不存在的 key
- 裸露的字串

<!--more-->

## 沒初始化的變數

初始化字串雖然很簡單，但卻是非常常犯的錯誤，看看下面的 Code：

{% codeblock lang:php %}
<?
if ($_POST['password'] == 'foo') {
    $admin_ok = 1;
}
{% endcodeblock %}

看起來雖然很正常，但是 $admin_ok 並沒有初始化，所以當 password 不等於 foo 的時候，
去呼叫 $admin_ok 就會出現錯誤，像這樣：

{% codeblock lang:php %}
<?
if ($_POST['password'] == 'foo') {
    $admin_ok = 1;
}
echo $admin_ok;
{% endcodeblock %}

解決的辦法很簡單，就是先給他一個初始值：

{% codeblock lang:php %}
<?
$admin_ok = 0;

if ($_POST['password'] == 'foo') {
    $admin_ok = 1;
}
{% endcodeblock %}

或是寫成：

{% codeblock lang:php %}
<?
    $admin_ok = ($_POST['password'] == 'foo') ? 1 : 0;
{% endcodeblock %}


## 不存在的 key

在上個例子中，如果表單沒有 password 這個欄位，那 $_POST 這個陣列就不會有 password 這個健值，
解決方法就是，在使用前先檢查這個 key 存不存在：

{% codeblock lang:php %}
<?
$password = "";

if (array_key_exists('password', $_POST)){
    $password = $_POST['password'];
}
{% endcodeblock %}

或是

{% codeblock lang:php %}
<?
$password = "";
array_key_exists('password', $_POST) AND $password = $_POST['password'];
{% endcodeblock %}

也可以寫成一行：

{% codeblock lang:php %}
<?
$password = array_key_exists('password', $_POST) ? $_POST['password'] : "";
{% endcodeblock %}



## 裸露的字串

這個應該算是少數人會犯的錯誤，有些人會在指定 key 的時候不將 key 括起來：

{% codeblock lang:php %}
<?
$foo[bar];
{% endcodeblock %}

只要改成這樣就可以了：

{% codeblock lang:php %}
<?
$foo['bar'];
{% endcodeblock %}



## 小結

如果沒有用過 E_ALL 的，在設定完後可能會常常遇到錯誤，不用害怕！

當你越來越習慣嚴格的開發環境的時候，你的程式會越來越嚴謹，並減少一些不可預期的錯誤！





