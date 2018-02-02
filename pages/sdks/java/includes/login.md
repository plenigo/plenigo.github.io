---
layout: default
title: Registration and Login
permalink: /registration_login_java
---

# Login 

Whenever you want the user to login in order to do things such as retrieving user information from plenigo, you can use the SDK to generate a login snippet that will start the flow on the plenigo website.

These are the following ways that you can login.

## Standard Login

This is the simplest way to login, below there are examples of how to generate the snippet.

For Java integration you can use the `com.plenigo.sdk.builders.LoginSnippetBuilder` class in order to use the standard login.

```java
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder();
String snippet = snippetBuilder.build(); //This will generate the login snippet of the following format: plenigo.login();
```
This will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, php, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

### Use case 
This is a complete example page where you only need to insert your data. This example was done with the Spring MVC.


#### Server logic

The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/configuration_java).

```java
public class StandardLogin {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
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

In the page youhave to replaye **COMPANY_ID** in the JavaScript declaration, e.g. if you have the following link:

```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company. After replacing these thing it should look like this:

```java
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```

## Single sign on (OAuth2)

### Login Flow

Whenever you want to access user information, you can use this way of login, the user will agree to share his information with you during the login flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

Below there are examples of how to generate this snippet.

In order to create the snippet you must fill a com.plenigo.sdk.models.LoginConfig object with the following information:

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
#### Using CSRF Token

For a more secure way to communicate with the server you can generate a cross-site request forgery token so that when the user is redirected to the page, you can ensure that the redirect comes from the website you requested it to, below there are examples of how to generate the snippet.

You can use the `com.plenigo.sdk.services.TokenService` class to generate a token:

```java
String redirectUrl = "https://example.com/given_path";
LoginConfig LoginConfig = new LoginConfig(redirectUrl, DataAccessScope.PROFILE);
LoginSnippetBuilder snippetBuilder = new  com.plenigo.sdk.builders.LoginSnippetBuilder(LoginConfig);
String csrfToken = TokenService.createCsrfToken();
String snippet = snippetBuilder.withCSRFToken(csrfToken).build(); //The generated login snippet format: plenigo.login('VAL','VAL','VAL');
```

Both of these examples will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

After the user has allowed the data access scope that you need, the login flow will redirect you to the uri you specified previously.

![redirect shortly](https://www.plenigo.com/assets/marketing/redirect-shortly.jpeg)

### Access Code

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
//this url must be registered in plenigo
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

You can retrieve user data using the com.plenigo.sdk.models.UserService#getUserData method

```java
TokenData data = null;
//obtain the TokenData object with the tokenService or get it from the session if you have already done that
UserData userData = UserService.getUserData(data.getAccessToken());
```