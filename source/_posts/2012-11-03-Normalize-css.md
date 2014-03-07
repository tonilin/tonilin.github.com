---
layout: post
title: 'Normalize.css'
date: 2012-11-03 21:00
comments: true
categories: [css, HTML5]
---
{% blockquote %}
Normalize.css makes browsers render all elements more 
consistently and in line with modern standards. It precisely 
targets only the styles that need normalizing.
{% endblockquote %}


Normalize.css Official Site : <http://necolas.github.com/normalize.css/>

「跨瀏覽器問題」一直是網頁設計師最頭痛的問題之一，在 CSS 方面，
以往習慣用 [reset.css](http://meyerweb.com/eric/tools/css/reset/) 來重置 CSS 屬性。
reset.css 將所有元素的屬性歸零，當使用到這些元素的時候 ，後再賦予其屬性，以達到跨瀏覽器呈現一致。

<!--more-->

不過，reset.css 會產生一個缺點，當我要使用 &lt;p&gt; 時，在瀏覽器預設下，它應該是跟下一個元素有一段距離的。
原本瀏覽器就將這個距離設定得很好，可是用了 reset.css ，卻要自己設定 &lt;p&gt; 的 margin，
然而自己設定的數值往往沒有瀏覽器預設的好看。

如果要解決上面的問題，我們應該做的是：保留瀏覽器好的屬性，並保持跨瀏覽器的呈現一致。

Normalize.css 做的不是重置這些屬性，而是「標準化」這些屬性，保留這些屬性原本的優點，
進而達到跨瀏覽器的呈現一致。 像官網一開始所說的一樣， Normalize.css 更符合現代設計，
且支援 HTML5 ，是一個 reset.css 的取代方案。

最近非常火紅的 Bootstrap 和 HTML5 Boilerplate 也都是使用 Normalize.css，  
下一次在寫網頁的時候，不仿試試看 Normalize.css ！

下面是 Normalize.css 的原始碼，有興趣的讀者可以拿來跟 reset.css 比較看看。


{% codeblock normalize.css lang:css %}
/*! normalize.css v2.0.1 | MIT License | git.io/normalize */

/* ==========================================================================
   HTML5 display definitions
   ========================================================================== */

/*
 * Corrects `block` display not defined in IE 8/9.
 */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
nav,
section,
summary {
    display: block;
}

/*
 * Corrects `inline-block` display not defined in IE 8/9.
 */

audio,
canvas,
video {
    display: inline-block;
}

/*
 * Prevents modern browsers from displaying `audio` without controls.
 * Remove excess height in iOS 5 devices.
 */

audio:not([controls]) {
    display: none;
    height: 0;
}

/*
 * Addresses styling for `hidden` attribute not present in IE 8/9.
 */

[hidden] {
    display: none;
}

/* ==========================================================================
   Base
   ========================================================================== */

/*
 * 1. Sets default font family to sans-serif.
 * 2. Prevents iOS text size adjust after orientation change, without disabling
 *    user zoom.
 */

html {
    font-family: sans-serif; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    -ms-text-size-adjust: 100%; /* 2 */
}

/*
 * Removes default margin.
 */

body {
    margin: 0;
}

/* ==========================================================================
   Links
   ========================================================================== */

/*
 * Addresses `outline` inconsistency between Chrome and other browsers.
 */

a:focus {
    outline: thin dotted;
}

/*
 * Improves readability when focused and also mouse hovered in all browsers.
 */

a:active,
a:hover {
    outline: 0;
}

/* ==========================================================================
   Typography
   ========================================================================== */

/*
 * Addresses `h1` font sizes within `section` and `article` in Firefox 4+,
 * Safari 5, and Chrome.
 */

h1 {
    font-size: 2em;
}

/*
 * Addresses styling not present in IE 8/9, Safari 5, and Chrome.
 */

abbr[title] {
    border-bottom: 1px dotted;
}

/*
 * Addresses style set to `bolder` in Firefox 4+, Safari 5, and Chrome.
 */

b,
strong {
    font-weight: bold;
}

/*
 * Addresses styling not present in Safari 5 and Chrome.
 */

dfn {
    font-style: italic;
}

/*
 * Addresses styling not present in IE 8/9.
 */

mark {
    background: #ff0;
    color: #000;
}


/*
 * Corrects font family set oddly in Safari 5 and Chrome.
 */

code,
kbd,
pre,
samp {
    font-family: monospace, serif;
    font-size: 1em;
}

/*
 * Improves readability of pre-formatted text in all browsers.
 */

pre {
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/*
 * Sets consistent quote types.
 */

q {
    quotes: "\201C" "\201D" "\2018" "\2019";
}

/*
 * Addresses inconsistent and variable font size in all browsers.
 */

small {
    font-size: 80%;
}

/*
 * Prevents `sub` and `sup` affecting `line-height` in all browsers.
 */

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

/* ==========================================================================
   Embedded content
   ========================================================================== */

/*
 * Removes border when inside `a` element in IE 8/9.
 */

img {
    border: 0;
}

/*
 * Corrects overflow displayed oddly in IE 9.
 */

svg:not(:root) {
    overflow: hidden;
}

/* ==========================================================================
   Figures
   ========================================================================== */

/*
 * Addresses margin not present in IE 8/9 and Safari 5.
 */

figure {
    margin: 0;
}

/* ==========================================================================
   Forms
   ========================================================================== */

/*
 * Define consistent border, margin, and padding.
 */

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

/*
 * 1. Corrects color not being inherited in IE 8/9.
 * 2. Remove padding so people aren't caught out if they zero out fieldsets.
 */

legend {
    border: 0; /* 1 */
    padding: 0; /* 2 */
}

/*
 * 1. Corrects font family not being inherited in all browsers.
 * 2. Corrects font size not being inherited in all browsers.
 * 3. Addresses margins set differently in Firefox 4+, Safari 5, and Chrome
 */

button,
input,
select,
textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 2 */
    margin: 0; /* 3 */
}

/*
 * Addresses Firefox 4+ setting `line-height` on `input` using `!important` in
 * the UA stylesheet.
 */

button,
input {
    line-height: normal;
}

/*
 * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
 *    and `video` controls.
 * 2. Corrects inability to style clickable `input` types in iOS.
 * 3. Improves usability and consistency of cursor style between image-type
 *    `input` and others.
 */

button,
html input[type="button"], /* 1 */
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
}

/*
 * Re-set default cursor for disabled elements.
 */

button[disabled],
input[disabled] {
    cursor: default;
}

/*
 * 1. Addresses box sizing set to `content-box` in IE 8/9.
 * 2. Removes excess padding in IE 8/9.
 */

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
}

/*
 * 1. Addresses `appearance` set to `searchfield` in Safari 5 and Chrome.
 * 2. Addresses `box-sizing` set to `border-box` in Safari 5 and Chrome
 *    (include `-moz` to future-proof).
 */

input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
}

/*
 * Removes inner padding and search cancel button in Safari 5 and Chrome
 * on OS X.
 */

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

/*
 * Removes inner padding and border in Firefox 4+.
 */

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

/*
 * 1. Removes default vertical scrollbar in IE 8/9.
 * 2. Improves readability and alignment in all browsers.
 */

textarea {
    overflow: auto; /* 1 */
    vertical-align: top; /* 2 */
}

/* ==========================================================================
   Tables
   ========================================================================== */

/*
 * Remove most spacing between table cells.
 */

table {
    border-collapse: collapse;
    border-spacing: 0;
}
{% endcodeblock %}