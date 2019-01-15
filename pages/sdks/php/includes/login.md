---
layout: default
title: registration_login_php
permalink: /registration_login_php
---
# Registration
If you want a user to register at plenigo you can simply use the [Javscript SDK](/sdks/javascript#registration---open-the-plenigo-registration-window), or you can use this PHP-wrapper-method for this function

These are the ways you can provide a registration for your customers.

## Standard registration

This is the simplest way to register, below there are examples of how to generate the snippet.

For PHP integration you can use the `\plenigo\builders\RegisterSnippetBuilder` class to build the snippet.

```php
<?php
$builder = new \plenigo\builders\RegisterSnippetBuilder();
//This will generate the login snippet of the following format:
//plenigo.registration();
$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

This will create a snippet that can be used in a javascript event(such as onclick) and it will start the register flow when used in a webpage (html, jsp, gsp, php, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

## Merge existing user
If you already imported your users to our system, you can merge the registered user with his subscriber ID by passing the following parameter:

```php
<?php
// see all available config-options here: https://plenigo.github.io/sdks/javascript#registration---open-the-plenigo-registration-window
$builder = new \plenigo\builders\RegisterSnippetBuilder(array('loginIdentifier' => true));

//This will generate the login snippet of the following format:
//plenigo.registration({loginIdentifier: true});
$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

## Single sign on (OAuth2)

### Register Flow

Whenever you want to access user information, you can use this way of registration, the user will agree to share his information with you during the registartion flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

Below there are examples of how to generate this snippet.

In order to create the snippet you must fill a `\plenigo\models\LoginConfig` object with the following information.

```php
<?php

$builder = new  \plenigo\builders\RegisterSnippetBuilder(array(
    'ssoRedirectURL' => "https://www.example.com", // Redirect URL for the OAuth2 login process if OAuth2 is used.
    'scope' => "profile", // Scope of the OAuth2 login process. Currently the only available scope is profile   
));

$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

### Using a template engine

If you're using a template engine you can't use the SDK this way. Just use the config-Object this way:

your controller logic:
```php
<?php

$builder = new  \plenigo\builders\RegisterSnippetBuilder(array(
    // any parameters you need   
));

$snippet = $builder->build();

// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(false);

echo $twig->render('template.twig', array(
    'plenigo' => array(
        'registerConfig' => $config,
        'registerButton' => $snippet,        
    ),
));
```
your twig-template:

```html
...
<head>
    <script>
        // your javascript
        {{ plenigo.registerConfig }}
    </script>
</head>
<body>
...
    <a href="#" onclick="{{ plenigo.registerButton }}">Register</a>
...
</body>

```

## Login

Whenever you want the user to login in order to do things such as retrieving user information from plenigo, you can use the SDK to generate a login snippet that will start the flow on the plenigo website.

These are the following ways that you can login.

### Standard login

This is the simplest way to login, below there are examples of how to generate the snippet.

For PHP integration you can use the `\plenigo\builders\LoginSnippetBuilder` class to build the snippet.

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


### Use case

Use case for implementing the standard login.

#### Server logic

The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/configuration_php).

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
use plenigo\builders\LoginSnippetBuilder;

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q". true);


// 2.Step: Create the login snippet.
$builder = new LoginSnippetBuilder();
// This will generate the login snippet of the following format: plenigo.login();
$snippet = $builder->build();

// 3.Step: This method checks if the user is logged in. 
$isLoggedIn = \plenigo\services\UserService::isLoggedIn()
?>
``` 
#### Page logic

In the page you have to replace the **COMPANY_ID** in the JavaScript declaration, e.g if you have the following link:

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company. After replacing these things it should look like this:

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```

By clicking on the “Login” button the Checkout flow will start.

**Login flow from plenigo:**

1. User clicks on "Login" button. The plenigo login window will appear.  
  
2. The user need to fill in his personal data (e-mail-address and password).

3. After a successful login. The user will be redirected to the page.

**Note:** You can force on login the user to enter an username. (Plenigo backend: Settings -> Company Data -> Settings)

**Note:** You can configure the `plenigo.login()` method:  [Plenigo Login](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

## Single sign on (OAuth2)

### Login Flow

Whenever you want to access user information, you can use this way of login, the user will agree to share his information with you during the login flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

Below there are examples of how to generate this snippet.

In order to create the snippet you must fill a `\plenigo\models\LoginConfig` object with the following information.

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

##### Using CSRF Token

For a more secure way to communicate with the server you can generate a cross-site request forgery token so that when the user is redirected to the page, you can ensure that the redirect comes from the website you requested it to, below there are examples of how to generate the snippet.

You can use the `\plenigo\services\TokenService` class to generate a token.

```php
<?php
$code = "CODE_RECEIVED_FROM_THE_REDIRECTION";
//generating a random CSRF Token
$csrfToken = TokenService::createCsrfToken();

//this url must be registered in plenigo
$redirectUrl = "https://example.com/given_path";
//Now we pass the generated CSRF Token as third parameter
$data = TokenService::getAccessToken($code,$redirectUrl,$csrfToken);
```

Both of these examples will create a snippet that can be used in a javascript event(such as onclick) and it will start the login flow when used in a webpage (html, jsp, gsp, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

After the user has allowed the data access scope that you need, the login flow will redirect you to the uri you specified previously.

![redirect shortly](https://www.plenigo.com/assets/marketing/redirect-shortly.jpeg)

##### Access Code

If the login is not successful you will get the following URL, where you can retrieve the error name and the description.
https://example.com/given_path?error=ERROR_NAME&error_description=ERROR_DESCRIPTION&state=CSRF_TOKEN

If the login flow is successful, you will get the following response you can retrieve the access code from the query string.
https://example.com/given_path?code=7955ea3af225a0&state=CSRF_TOKEN

***
If you did not create a CSRF Token with the login snippet, you will not get a state in the query string parameters. 
***

With this you can get an access token which can be used to access information within the scope that you specified in the previous step, below there are examples of how to do this.

You must call the `\plenigo\services\TokenService.getAccessToken` method, all you have to provide is the code you got when the user was redirected and provide the redirect url that you specified when the user was going to login.

```php
<?php
$code = "CODE_RECEIVED_FROM_THE_REDIRECTION";
//this url must be registered in plenigo
$redirectUrl = "https://example.com/given_path";
//TokenData contains both the refresh and access token, so you can use it
$data = TokenService::getAccessToken($code,$redirectUrl);
```

The TokenData object contains the following fields:

|name|description|
|:---|:----------|
|accessToken|This token has an expiration date and can be used to get user information|
|expiresIn|The time in seconds where the access token will expire|
|refreshToken|This token is used to get more access token|
|state|This is the csrf token in case you specified one for a more secure request|
|tokenType|The type of token|

With this information you can access user data, a simple example of getting the user data is below.

You can retrieve user data using the `\plenigo\services\UserService::getUserData()` method.

```php
<?php
//.....from the last PHP example
$data = TokenService::getAccessToken($code,$redirectUrl);

//obtain the TokenData object with the tokenService or get it from the
//session if you have already done that
$userData = UserService::getUserData($data->getAccessToken());
```

## Verify user login

If you want to realize the Login into plenigo within your own application, you can verify the user’s login with this method. It works very straight forward. If the user provides the correct login data, the method retuns the complete user data, otherwise it returns false.
 
**Note: To prevent misuse, the user’s account will be deactivated after 3 failed login attempts.**

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company. 
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId, true);

// 2.Step: Call the login method with the data the user provided you
$email = $_POST['email'];
$password = $_POST['password'];
$user = \plenigo\services\UserService::verifyLogin($email, $password);

if ($user === false) {
    echo "E-Mail or Password was wrong. Please try again!";
}
```
### Retrieve error messages

This method can give you an error message from the service too. 

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company. 
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId, true);

// 2.Step: Call the login method with the data the user provided you
$error = 'the error';
$email = $_POST['email'];
$password = $_POST['password'];
$data = [
  "browser": "Browser-Name",
  "os": "Betriebssystem",
  "source": "Website"
];
$user = \plenigo\services\UserService::verifyLogin($email, $password, $data, $error);

if ($user === false) {
    echo $error;
}
```

### Send additional data
You can use this method to enable users of your external apps a login in plenigo. To analyze such logins one can pass additional data to the method:


```php
<?php
// https://stackoverflow.com/questions/13646690/how-to-get-real-ip-from-visitor
function getUserIP()
{
    $ips = array(
            @$_SERVER['HTTP_CLIENT_IP'],
            @$_SERVER['HTTP_X_FORWARDED_FOR'],
            $_SERVER['REMOTE_ADDR'],    
    );
    
    foreach ($ips as $ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP)) {            
            break;
        }
    }
    return $ip;
}

// get this information from the settings in your plenigo backend
$companyId = "YOUR COMPANY ID"; 
$secret = "YOUR COMPANY SECRET";

// you have to configure the SDK with your data first
\plenigo\PlenigoManager::configure($secret, $companyId);

// call the login method with the data, the user provided you
// here we retrieve it from a form
$email = $_POST['email'];
$password = $_POST['password'];
// http://php.net/manual/en/function.get-browser.php
$browser = get_browser(null, true);

$data = array(
            'os'        => $browser['platform'],    // string Operation System of the User (max 40)
            'browser'   => $browser['browser'],     // string browser of the user (max 40)
            'source'    => 'my external application', // string source of the user or other additional data (max 255)
            'ipAddress' =>  getUserIP(),            // string IP-Address of the user (max 45)
);

$user = \plenigo\services\UserService::verifyLogin($email, $password, $data);


```
