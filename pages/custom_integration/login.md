---
layout: default
title: login
permalink: /login
---
# Login

Plenigo offers you different possibilities for login.

* [Standard Login](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Single sign on](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Standard Login 

This is the simplest way to login, below there are examples of how to generate the snippet.

### Implementation with SDKS

#### Java

You can use the `com.plenigo.sdk.builders.LoginSnippetBuilder` class to build the snippet:

```java
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder();
String snippet = snippetBuilder.build(); //This will generate the login snippet of the following format: plenigo.login();
```
#### PHP

You can use the `\plenigo\builders\LoginSnippetBuilder` class to build the snippet.

```php
<?php
$builder = new \plenigo\builders\LoginSnippetBuilder();
//This will generate the login snippet of the following format:
//plenigo.login();
$snippet = $builder->build();

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Login to buy</a>';
```

This will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, php, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

### Implementation without plenigo SDKS

## Single Sign on

Single sign-on (SSO) is a session and user authentication service that permits a user to use one set of login credentials (e.g., name and password) to access multiple applications. The service authenticates the end user for all the applications the user has been given rights to and eliminates further prompts when the user switches applications during the same session. On the back end, SSO is helpful for logging user activities as well as monitoring user accounts.

There are two different ways to implement SSO with plenigo:

* 1.OAuth2 (recommended)
* 2.Cookie based

### Implementation with SDKS (OAUTH2)

Whenever you want to access user information, you can use this way of login, the user will agree to share his information with you during the login flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

#### Java 

For Java you can use the `com.plenigo.sdk.models.LoginConfig` method for this purpose:

| parameter 	| description |
| ------------- | ----------- |
redUri 	        | The URI where the user is going to be redirected to when the login flow is over, this url must be registered in plenigo before using it |
dataAccessScope | The data access scope permission that you need from the user, the com.plenigo.sdk.models.DataAccessScope enum contains all the available values |

```java
String redirectUrl = "https://example.com/given_path";
LoginConfig LoginConfig = new LoginConfig(redirectUrl, DataAccessScope.PROFILE);
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder(LoginConfig);
String snippet = snippetBuilder.build(); //This will generate the login snippet of the following format: plenigo.login('VAL','VAL','VAL');
```
#### PHP

For PHP you can use the `plenigo\models\LoginConfig` method for this purpose:

|parameter|description|
|:--------|:----------|
|redUri|The URI where the user is going to be redirected to when the login flow is over, this url must be registered in plenigo before using it|
|dataAccessScope|The data access scope permission that you need from the user, the \plenigo\models\AccessScope enum contains all the available values|

```php
<?php
$redirectUrl = "https://example.com/given_path";
$config = new \plenigo\models\LoginConfig($redirectUrl,\plenigo\models\AccessScope::PROFILE);
$builder = new  \plenigo\builders\LoginSnippetBuilder($config);
$snippet = $builder->build();

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Login to plenigo</a>';
```

