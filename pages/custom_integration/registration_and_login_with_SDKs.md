---
layout: default
title: Registration and Login with SDKs
permalink: /registration_and_login_with_SDKs
---
# Registration and Login


## Registration

Frisbii Media offers you a simple registration functionality. 


### JavaScript


For JavaScript integration you  have to use the `plenigo.registration()` method in order to do a registration with Frisbii Media.


In the Page you have to replace the **COMPANY_ID** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```
  
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```

By clicking on the "Registration" Button the Registration flow will start:

**Registration flow from Frisbii Media:**

1. User clicks on "Registration" button. The Frisbii Media registration window will appear.  
  
2. The user need to fill in his personal data (e-mail-address and password) and has to accept the legal and privacy notes.

3. After a successful registration the user gets an e-mail.

**Note:** You can activate or deactivate the e-mail address verification in the Frisbii Media backend. (Settings -> Company Data -> Settings)

**Note:** You can configure the `plenigo.registration()` method:  [Frisbii Media Registration](https://plenigo.github.io/sdks/javascript#registration---open-the-plenigo-registration-window)

```html
<html>
<head>
    <title> The title  </title>
        <!-- import the Frisbii Media Javascript SDK
               Let's use concrete values:
               company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
        -->          <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<button onclick="plenigo.registration()">Registration</button>
</body>
</html>
```

## Login

Frisbii Media offers you different possibilities for login.

* [Standard Login](https://plenigo.github.io/login#standard-login)
* [Single sign on](https://plenigo.github.io/sdks/login#sso)

## Standard Login 

This is the simplest way to login, below there are examples of how to generate the snippet.

### Java

For Java integration you can use the `com.plenigo.sdk.builders.LoginSnippetBuilder` method for this purpose:

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode(true).
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // // The secret key of your specific company. 
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // // The company id of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Create the login snippet.
LoginSnippetBuilder snippetBuilder = new LoginSnippetBuilder();
// This will generate the login snippet of the following format: plenigo.login();
String snippet = snippetBuilder.build();
```
#### Use case 

This is a complete example page where you only need to insert your data. This example is done with the Spring MVC.

#### Server logic 
The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/sdks/java#configuration). 

```java
public class StandardLogin {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode(true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q");
    }

    /**
     * Shows the login snippet.
     *
     * @param model the model
     *
     * @throws PlenigoException Handles a plenigo exception.
     */
    public void login(Model model) throws PlenigoException {
        LoginSnippetBuilder loginSnippetBuilder = new LoginSnippetBuilder();
        String builder = loginSnippetBuilder.build();
        model.addAttribute("loginBuilder", builder);
    }

    /**
     * Checks if the user is logged in.
     *
     * @param request the request
     * @param model   the model
     *
     * @throws PlenigoException Handles a plenigo exception.
     */
    public void isLoggedIn(HttpServletRequest request, Model model) throws PlenigoException {
        String cookieHeader = request.getHeader("Cookie");
        boolean login = UserService.isLoggedIn(cookieHeader);
        model.addAttribute("isLoggedIn", login);
    }
}
```
#### Page logic

In the Page you have to replace the **COMPANY_ID** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```

By clicking on the “Login” button the Checkout flow will start.

**Login flow from Frisbii Media:**

1. User clicks on "Login" button. The Frisbii Media login window will appear.  
  
2. The user need to fill in his personal data (e-mail-address and password).

3. After a successful login. The user will be redirected to the page.

**Note:** You can force on login the user to enter an username. (Frisbii Media backend: Settings -> Company Data -> Settings)

**Note:** You can configure the `plenigo.login()` method:  [Frisbii Media Login](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

```html
<html>
<head>
    <title> The title </title>
        <!-- import the Frisbii Media Javascript SDK
               Let's use concrete values:
               company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
        -->          <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<#if (!$isLoggedIn)>
<button onclick="${loginBuilder}">Login</button>
<#else>
<button onclick="plenigo.logout(); window.location.href = '/'">Logout</button>
</body>
</html>
```

### PHP

For PHP integration you can use the `\plenigo\builders\LoginSnippetBuilder` method for this purpose:

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode(true).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Create the login snippet.
$builder = new \plenigo\builders\LoginSnippetBuilder();
//This will generate the login snippet of the following format:
//plenigo.login();
$snippet = $builder->build();
```

#### Use case 

Use case for implementing Frisbii Media standard login.

#### Server logic 
The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/sdks/java#configuration). 

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
use plenigo\builders\LoginSnippetBuilder;

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode(true).
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q");


// 2.Step: Create the login snippet.
$builder = new LoginSnippetBuilder();
// This will generate the login snippet of the following format:
// plenigo.login();
$snippet = $builder->build();
$isLoggedIn = \plenigo\services\UserService::isLoggedIn()
?>
```
#### Page logic

In the Page you have to replace the **COMPANY_ID** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```

By clicking on the “Login” button the Checkout flow will start.

**Login flow from Frisbii Media:**

1. User clicks on "Login" button. The Frisbii Media login window will appear.  
  
2. The user need to fill in his personal data (e-mail-address and password).

3. After a successful login. The user will be redirected to the page.

**Note:** You can force on login the user to enter an username. (Frisbii Media backend: Settings -> Company Data -> Settings)

**Note:** You can configure the `plenigo.login()` method:  [Frisbii Media Login](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)


```html
<html>
<head>
    <title> The title of the article  </title>
        <!-- import the Frisbii Media Javascript SDK
               Let's use concrete values:
               company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
        -->            <script type="application/javascript"
            src="https://static.s-devops.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<?php if (!$isLoggedIn) { ?>
    <button onclick="<?php echo $snippet ?>">Login</button>
<?php } else { ?>
    <button onclick="plenigo.logout(); window.location.href = '/'">Logout</button>
<?php } ?>
</body>
</html>
```

This will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, php, etc) that has the Frisbii Media Javascript SDK included as a script and initialized correctly.

### Single sign on (OAuth2)

#### Login Flow

Whenever you want to access user information, you can use this way of login, the user will agree to share his information with you during the login flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

Below there are examples of how to generate this snippet.

In order to create the snippet you must fill a com.plenigo.sdk.models.LoginConfig object with the following information:

| parameter 	| description |
| ------------- | ----------- |
redUri 	        | The URI where the user is going to be redirected to when the login flow is over, this url must be registered in Frisbii Media before using it |
dataAccessScope | The data access scope permission that you need from the user, the com.plenigo.sdk.models.DataAccessScope enum contains all the available values |

```java
   String redirectUrl = "https://example.com/given_path";
LoginConfig LoginConfig = new LoginConfig(redirectUrl, DataAccessScope.PROFILE);
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder(LoginConfig);
String snippet = snippetBuilder.build(); //This will generate the login snippet of the following format: plenigo.login('VAL','VAL','VAL');
```
##### Using CSRF Token

For a more secure way to communicate with the server you can generate a cross-site request forgery token so that when the user is redirected to the page, you can ensure that the redirect comes from the website you requested it to, below there are examples of how to generate the snippet.

You can use the `com.plenigo.sdk.services.TokenService` class to generate a token:

```java
String redirectUrl = "https://example.com/given_path";
LoginConfig LoginConfig = new LoginConfig(redirectUrl, DataAccessScope.PROFILE);
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder(LoginConfig);
String csrfToken = TokenService.createCsrfToken();
String snippet = snippetBuilder.withCSRFToken(csrfToken).build(); //The generated login snippet format: plenigo.login('VAL','VAL','VAL');
```

Both of these examples will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, etc) that has the Frisbii Media Javascript SDK included as a script and initialized correctly.

After the user has allowed the data access scope that you need, the login flow will redirect you to the uri you specified previously.

![redirect shortly](https://www.plenigo.com/assets/marketing/redirect-shortly.jpeg)

#### Access Code

If the login is not successful you will get the following URL, where you can retrieve the error name and the description.
https://example.com/given_path?error=ERROR_NAME&error_description=ERROR_DESCRIPTION&state=CSRF_TOKEN

If the login flow is successful, you will get the following response you can retrieve the access code from the query string.
https://example.com/given_path?code=7955ea3af225a0&state=CSRF_TOKEN

***
If you did not create a CSRF Token with the login snippet, you will not get a state in the query string parameters. 
***

With this you can get an access token which can be used to access information within the scope that you specified in the previous step, below there are examples of how to do this.

You must call the `com.plenigo.sdk.services.TokenService.getAccessToken` method, all you have to provide is the code you got when the user was redirected and provide the redirect url that you specified when the user was going to login, all this will be provided inside the com.plenigo.sdk.models.AccessTokenRequest object:

```java
//this url must be registered in Frisbii Media
String code = "CODE_RECEIVED_FROM_THE_REDIRECTION";
String redirectUrl = "https://example.com/given_path";
AccessTokenRequest request = new AccessTokenRequest(code, redirectUrl);
//TokenData contains both the refresh and access token, so you can use it
TokenData data = TokenService.getAccessToken(request);
```

The TokenData object contains the following fields:

| name 	       | description                                                                |
|:-------------|:---------------------------------------------------------------------------|
| accessToken  | This token has an expiration date and can be used to get user information  |
| expiresIn    | The time in seconds where the access token will expire                     |
| refreshToken | This token is used to get more access token                                |
| state        | This is the csrf token in case you specified one for a more secure request |
| tokenType    | The type of token                                                          |

With this information you can access user data, a simple example of getting the user data is below.
You can retrieve user data using the `com.plenigo.sdk.models.UserService#getUserData` method

```java
TokenData data = null;
//obtain the TokenData object with the tokenService or get it from the session if you have already done that
UserData userData = UserService.getUserData(data.getAccessToken());
```
