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

$user = \plenigo\services\UserService::verifyLogin($email, $password, $error);

if ($user === false) {
    echo $error;
}

```
 
### Reactivate user

To reactive a blocked user account after 3 failed login attempts, one have to use the [login method](/sdks/php#login).   
