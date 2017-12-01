If you want to realize the Login into plenigo within your own application, you can verify the user's login with this method.
It works very straight forward. If the user provides the correct login data, the method retuns the complete user data, otherwise it returns false.
To prevent misuse, the **user's account will be deactivated after 3 failed login attempts**.

```php
<?php

// get this information from the settings in your plenigo backend
$companyId = "YOUR COMPANY ID"; 
$secret = "YOUR COMPANY SECRET";

// you have to configure the SDK with your data first
\plenigo\PlenigoManager::configure($secret, $companyId);

// call the login method with the data, the user provided you
// here we retrieve it from a form
$email = $_POST['email'];
$password = $_POST['password'];

$user = \plenigo\services\UserService::verifyLogin($email, $password);

if ($user === false) {
    echo "E-Mail or Password was wrong. Please try again!";
}

```

### Retrieve error messages

The method can give you an error message from the service too. It uses a the pass by reference parameter `$error`.

```php
<?php

// get this information from the settings in your plenigo backend
$companyId = "YOUR COMPANY ID"; 
$secret = "YOUR COMPANY SECRET";
$error = "";

// you have to configure the SDK with your data first
\plenigo\PlenigoManager::configure($secret, $companyId);

// call the login method with the data, the user provided you
// here we retrieve it from a form
$email = $_POST['email'];
$password = $_POST['password'];

$user = \plenigo\services\UserService::verifyLogin($email, $password, [], $error);

if ($user === false) {
    echo $error;
}

```

### Send additional data

You can use this method to enable users of your external apps a login in plenigo. To analyze such logins one can pass 
additional data to the method:

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

 
### Reactivate user

To reactive a blocked user account after 3 failed login attempts, one have to use the [login method](/sdks/php#login).   
