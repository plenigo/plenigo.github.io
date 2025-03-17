---
layout: default
title: Frisbii Media SixCMS plugin
permalink: /plugins/sixcms
---

# Frisbii Media SixCMS plugin

Frisbii Media offers a plugin for the SixCMS to integrate and enable Frisbii Media out-of-the-box. The plugin uses the Frisbii Media [PHP-SDK](/sdks/php).
This way all the functionality that is available in the Frisbii Media PHP-SDK can also be added manually.

## Installation 

The Frisbii Media SixCMS plugin is a standardised SixCMS system and can be installed as such.

## How does the plugin works?

When you use the SixCMS templates to publish your html pages it will provide you with a few useful placeholders for use:

Include the place holder %CMS_PLUGIN_PLENIGO::start() into your header part of your html.

```html
<!doctype html>
<html class="no-js" lang="">
    <head>
         <meta charset="utf-8">
         <meta http-equiv="x-ua-compatible" content="ie=edge">
         <title></title>
         <meta name="description" content="">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         %CMS_PLUGIN_PLENIGO::start(metered=true)

         <link rel="apple-touch-icon" href="apple-touch-icon.png">

         <!-- Place favicon.ico in the root directory -->

    </head>
    <body>
        <!-- Your content -->
    </body>
</html>
```
The parameter _metered_ is optional. The default value is true, so metered will be shown and free views will be counted. If the setting is set to false, then the metered is not shown anymore and the free views are not counted. This is options is used for free products or overview pages.

## Include article template

### Default method

If your content is shown in a complex template, it is useful to only include it when the customer has payed for it. The place holder for this is %CMS_PLUGIN_PLENIGO::article()

```html
<article>
    %CMS_PLUGIN_PLENIGO::article(id=8

    if_template=plenigo_if

    else_template=plenigo_else)
</article>
```

Parameter:

|Name|Mandatory|Description|
|:---|:--------|:----------|
|id|No|ID of the Frisbii Media product. If it is empty it will be used the ID of the template context.|
|if_template|Yes|Template which represents the article.|
|else_template|Yes|Template which will be loaded if the content is not payed.|

### Alternative inline method

If your content is not complex you can simple surround it with two place holder:

```html
<article>
    %CMS_PLUGIN_PLENIGO::articleStart(else_text="You have not payed")
    <h1>%CMS_DATA(title)</h1>
    %CMS_DATA(field=text prefix="<p>" suffix="</p>")
    %CMS_PLUGIN_PLENIGO::articleEnd()
</article>
```

Parameter:

|Name|Mandatory|Description|
|:---|:--------|:----------|
|else_text|Yes|Text which should be shown if the content is not payed.|
|else_template|Yes|Template which should be shown if the content is not payed.|

## Login method

### Usage

If the user is not logged in, then he can simple login with the help of JavaScript interface from the Frisbii Media system.

```html
<button onclick="%CMS_PLUGIN_PLENIGO::login(redirect="http://example.com/sixcms/detail.php/template/login")">Login</button>
```

Parameter:

|Name|Mandatory|Description|
|:---|:--------|:----------|
|Redirect|No|URL which should be called after successfully logged in into the Frisbii Media system.|

In the called template you can get the logged in user and add a session to your system or add an account into the SixCMS.

### Login template example

The method %CMS_PLUGIN_PLENIGO::getUser() gives you the email address of the logged in user. You can now search in the SixCMS for this user and login him.

```html
 %CMS_PLUGIN_PLENIGO::getUser(redirect="http://example.com/sixcms/detail.php/109")
```
