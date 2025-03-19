---
layout: default
title: login
permalink: /login
---
# Registration and Login


## Registration

Frisbii Media offers you a simple registration functionality. 


### JavaScript


For JavaScript integration you  have to use the `plenigo.registration()` method for this purpose:


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

**Note:** You can configure the `plenigo.registration()` method:  [Frisbii Media Registration](https://Frisbii Media.github.io/sdks/javascript#registration---open-the-Frisbii Media-registration-window)

```html
html>
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
You can retrieve user data using the `com.plenigo.sdk.models.UserService#getUserData` method

```java
TokenData data = null;
//obtain the TokenData object with the tokenService or get it from the session if you have already done that
UserData userData = UserService.getUserData(data.getAccessToken());
```



## SSO without SDKs

Single sign-on (SSO) is a session and user authentication service that permits a user to use one set of login credentials (e.g., name and password) to access multiple applications. The service authenticates the end user for all the applications the user has been given rights to and eliminates further prompts when the user switches applications during the same session. On the back end, SSO is helpful for logging user activities as well as monitoring user accounts.

There are two different ways to implement SSO with Frisbii Media:

* OAuth2 (recommended)
* Cookie based

### OAuth2

#### Definition OAuth 2.0 

OAuth is an [open standard](https://en.wikipedia.org/wiki/Open_standard) for [authorization](https://en.wikipedia.org/wiki/Authorization). OAuth provides client applications a 'secure delegated access' to server resources on behalf of a resource owner. 
It specifies a process for resource owners to authorize third-party access to their server resources without sharing their credentials. Designed specifically 
to work with [Hypertext Transfer Protocol (HTTP)](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), OAuth essentially allows [access tokens](https://en.wikipedia.org/wiki/Access_token) to be issued to third-party clients by an authorization server, 
with the approval of the resource owner, or end-user. The client then uses the access token to access the protected resources hosted by the resource server.

#### What OAuth 2.0 does for you and what not
* OAuth 2.0 enables your users to use existing accounts for signing in to your application/website
* OAuth 2.0 allows you to access resources from other services in a defined way, e.g. retrieve user profile data without the need to request them from the user
* OAuth 2.0 doesn't replace your own user management

#### General OAuth 2.0 Workflow
```text
    1.Authorization Request: A Client Application must first obtain authorization from the Resource Owner before it can access a protected resource.
    2.Grant Request: The Client Application then exchanges the access grant for an access token.
    3.Access Token: Lastly, the Client Application accesses the protected resource by presenting the access token to the resource server.
+--------+                               +---------------+
|        |--(1)- Authorization Request ->|   Resource    |
|        |                               |     Owner     |
|        |<-(1.1)- Authorization Grant --|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(2)-- Authorization Grant -->| Authorization |
| Client |                               |     Server    |
|        |<-(2.1)----- Access Token -----|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |--(3)----- Access Token ------>|    Resource   |
|        |                               |     Server    |
|        |<-(3.1)-- Protected Resource --|               |
+--------+                               +---------------+
```
#### Example usage for OAuth 2.0 with Frisbii Media

In the following example we assume that a Frisbii Media client called "Merchant" is using the Frisbii Media OAuth 2.0 interfaces. To concentrate on the actual logic, 
there will be no concrete programming languages included. Please consult the SDK documentations for that case.

We are starting with the following scenario:
* UserA is registered at Frisbii Media
* UserA is not known by Merchant
* UserB is registered at Frisbii Media
* UserB was logged in via OAuth 2.0 and Frisbii Media by Merchant before

Let's start with UserA
1. UserA visits the homepage of Merchant and click login
2. Merchant calls the Frisbii Media login screen snippet
3. UserA enters his user data at Frisbii Media and logs in
4. UserA gets redirected to the Merchant's homepage together with a so called access code
5. Merchant's server takes this access code and requests an access token and a refresh token from Frisbii Media. Both codes are saved within the users session. (After requesting an access token for the first time UserA will never be prompted again to authorize Merchant)
   > A access token has only a limited lifetime, after that the Frisbii Media server will response with a timeout message. Then the Merchant server has to request a new access token with the refresh token.
     If Merchant wants to access the Frisbii Media API over a longer time period, e.g. 20 days without requesting a new login process for the user, it can save the refresh token to create new access tokens at anytime.
     
6. With the access token Merchant requests the user profile of the user from the Frisbii Media API
7. Merchant now compares the customerId of Frisbii Media with the ones he has within his user database and will not find it, because UserA was never there before. So Merchant creates a new customer profile for UserA with the data delivered by Frisbii Media.
8. Merchant can now use this customer as if it was his own customer only future logins must done via Frisbii Media

Now let's see what is going on with UserB

1. UserB visits the homepage of Merchant and click login
2. Merchant calls the Frisbii Media login screen snippet
3. UserB enters his user data at Frisbii Media and logs in
4. UserB gets redirected to the Merchant's homepage together with a so called access code
5. Merchant's server takes this access code and requests an access token and a refresh token from Frisbii Media. Both codes are saved within the users session. (After requesting an access token for the first time UserA will never be prompted again to authorize Merchant)
   > Any old refresh tokens will be invalid from this point on.
   
6. With the access token Merchant requests the user profile of the user from the Frisbii Media API
7. Merchant now compares the customerId of Frisbii Media with the ones it has within its user database and will find it, because UserB was there before. So the login is finished now. (Of course you could check if user data has changed and update them if necessary)

#### Using OAuth 2.0 to use Frisbii Media as SSO 


Frisbii Media APIs use the [OAuth 2.0 protocol](https://tools.ietf.org/html/draft-ietf-oauth-v2-31) for authentication and authorization. Frisbii Media supports common OAuth 2.0 scenarios such as those for web server, installed, and client-side applications.

OAuth 2.0 is a relatively simple protocol. To begin, a customer must obtain OAuth 2.0 credentials from the company dashboard. Then the different log in features the Javascript SDK offers can be used in combination with the server side SDKs.

> All responses are JSON formatted.

#### Authenticating the user

There are two possible ways to start the user authentication
1. During a checkout process by providing the SSO flag
2. Implementing a javascript snippet that starts a login process at Frisbii Media

### Start user authentication

#### Login Process

Customers should protect the security of their end users by preventing request forgery attacks. The first step is creating a unique session token that holds state between the customers server and the end user's client. This unique session token is later matched with the authentication response returned by the Frisbii Media OAuth Login service to verify that the user is making the request and not a malicious attacker. These tokens are often referred to as cross-site request forgery (CSRF) tokens.

One good choice for a state token is a string of 30 or so characters constructed using a high-quality random-number generator. Another one is a hash generated by signing some of the session state variables with a key that is kept secret on the back-end.

Java example
```java
// Create a state token to prevent request forgery and store it in the session for later validation.
String state = new BigInteger(130, new SecureRandom()).toString(32);
request.session().attribute("state", state);
```

PHP example
```php
<?php
// Create a state token to prevent request forgery and store it in the session for later validation.
$state = md5(rand());
$app['session']->set('state', $state);
```

Python example
```python
# Create a state token to prevent request forgery and store it in the session for later validation.
state = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in xrange(32))
session['state'] = state
```

#### Frisbii Media Login

After the optional CSRF token creation, the SDKs should offer the functionality to create the following Javascript snippet

```javascript
plenigo.login("REDIRECT_URI", "SCOPE", "STATE");
```

The three parameters to use can partially be filled automatically and some has to be offered by the customer.

|Name|Value|
|:---|:----|
|REDIRECT_URI|The URL to be redirected to after successful login to finish up the server side workflow. The given URL (or at least the starting part) must be registered in the Frisbii Media backend. Otherwise an error is returned.|
|SCOPE|Currently the only supported scope is profile. But more will come so this should be set by the customer.|
|STATE|The state is the CSRF. During the management of the CSRF by the SDK this should be provided by the SDK.|
 

Javascript Example
```javascript
     var config = {
         ssoRedirectURL: 'http://redirectUrl.com',
         scope: 'profile'
     };
     plenigo.login(config);
```
  
After the user finished the login process and accepts the company to be authorized to access his data, he will be redirected to the given target URL.

In case of an error the given redirect URL is called with the following parameters.

```html
https://example.com/given_path?error=ERROR_NAME&error_description=ERROR_DESCRIPTION
```

The possible values for error can be found in the [OAuth 2.0 protocol](https://tools.ietf.org/html/draft-ietf-oauth-v2-31) specification.

### Get access token

After the login process or checkout process including login finished the redirect URL will be called and look the following way.

```html
https://example.com/given_path?state=&security_token=138r5719ru3e1&code=AdE123412EdVD
```

The parameters are

|Name|Value|Mandatory|
|:---|:----|:--------|
|state|The CSRF token created|No|
|code|	Access code to request a access token with|Yes|

The first step depends if a CSRF token was provided or not. If yes the CSRF request token should be checked first.

Java example
```java
// Ensure that there is no request forgery going on, and that the user sending us this connect request is the user that was supposed to.
if (!request.queryParams("state").equals(savedState)) {
    // show error to the user (HttpStatus code 401)
}
```

PHP example
```php
<?php
// Ensure that there is no request forgery going on, and that the user sending us this connect request is the user that was supposed to.
if ($request->get('state') != ($app['session']->get('state'))) {
    // show error to the user (HttpStatus code 401)
}
```

Python example
```python
# Ensure that the request is not a forgery and that the user sending this connect request is the expected user.
if request.args.get('state', '') != session['state']:
  # show error to the user (HttpStatus code 401)
```

Now the access token has to be obtained in exchange for the access code received after the login.
To do so the a server side request to the Frisbii Media server must be executed and call the following URL. The request is an HTTP POST request.

```html
https://api.plenigo.com/api/v2/oauth2/verify
```

The body has to contain the following parameters

|Name|Value|Mandatory|
|:---|:----|:--------|
|grant_type|The only allowed value is _authorization_code_.|Yes|
|code|	The authorization code returned in the code parameter after the login.|Yes|
|redirect_uri|A valid return URL defined in the Frisbii Media company backend.|Yes|
|client_id|The company id offered by Frisbii Media.|Yes|
|client_secret|The company secret also used for encryption, etc.|Yes|
|state|There can be added an optional identifier like in the request above and it will be returned in the result.|No|

The response will contain the following body in case of success

|Name|Value|Mandatory|
|:---|:----|:--------|
|access_token|Access token to be used for future request to services.|Yes|
|token_type|Token type is always _bearer_.|Yes|
|expires_in|Expire time for the access token after that time a new access_token must be received with the help of the refresh token.|Yes|
|refresh_token|Refresh token to request a new access token if access token is lost or timed out.|Yes|
|state|Optional identifier if it was send during request.|No|

In case of an error the the following parameters are returned.

|Name|Value|
|:---|:----|
|error|error code|
|error_description|error description|

The possible values for error can be found in the [OAuth 2.0 protocol](https://tools.ietf.org/html/draft-ietf-oauth-v2-31) specification.

#### Refresh access token

With the help of the refresh token received during the request of an access token a new access token can be requested if the current access token times out.

> If the refresh token is no longer available the login process has to be restarted from the Javascript part.

To get a new access token the SDK has to make a server side request to the Frisbii Media server and call the following URL. The request is a HTTP POST request.

```html
https://api.plenigo.com/api/v2/oauth2/renew
```

The body has to contain the following parameters

|Name|Value|Mandatory|
|:---|:----|:--------|
|grant_type|The only allowed value is _refresh_token_.|Yes|
|refresh_token|	he refresh token received during the authorization token request.|Yes|
|client_id|The company id offered by Frisbii Media.|Yes|
|client_secret|The company secret also used for encryption, etc.|Yes|
|state|There can be added an optional identifier like in the request above and it will be returned in the result.|No|

The response will contain the following body in case of success

|Name|Value|Mandatory|
|:---|:----|:--------|
|access_token|Access token to be used for future request to services.|Yes|
|token_type|Token type is always _bearer_.|Yes|
|expires_in|Expire time for the access token after that time a new access_token must be received with the help of the refresh token.|Yes|
|state|Optional identifier if it was send during request.|No|

In case of an error the the following parameters are returned.

|Name|Value|
|:---|:----|
|error|error code|
|error_description|error description|

### Cookie based

To verify if a user is logged in you need to read the cookie `plenigo_user` and sent it to the Frisbii Media API [getUserProfileBySessionCookie](https://api.plenigo.com/#!/user/getUserProfileBySessionCookie).

* `403 HTTP Response` - user is not logged in 
* `200 HTTP Response` - user is logged in and user data is returned 
