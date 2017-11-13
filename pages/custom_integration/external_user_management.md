---
layout: default
title: external user management
permalink: /external_user_management
---

# External user management

It is possible to use your own registration and login process and only login users into plenigo via so called “Login Tokens”.

* [Register an external user ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Create a login token for an external user ? ](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Change email address of an existing user ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Giving a customer more access ids ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Add external user id ?](https://api.plenigo.com/#!/user/hasBoughtProduct)


## General Workflow external user management 

![General Workflow External User Management](/assets/images/ci/ExternalUser.png)

(A) Register external user in the plenigo system: -> [Register External User](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

## Register an external user with SDKs  

### Java

For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#registerUser` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| email     | yes     | string         | The email of the user to register |
| language     | yes     | string         | The language |
| externalUserId       | yes   | long        | The external user id for the new customer |
| firstName       | yes   | string        | The given name for the new customer |
| name       | yes   | string        | The name of the new customer|

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj"; // The secret key of your specific company. 
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // The company id of your specific company. 
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Fill the data for the registerUser() method.
String email = "testAddNewUser@mail.com";  // The email address of the customer.
String language = "en"; // The language.
String externalUserId = "A1BKAFZZ3H0H"; // The external customer id e.g "A1BKAFZZ3H0H" that the customer should have.
String firstName = "new"; // The first name of the customer.
String name = "user"; // The name of the customer.

// This method returns true if the external user was registrated successfully otherwise, it will return false.
String registerUser = UserManagementService.registerUser(email, language, externalUserId, firstName, name); 
```

### PHP

For PHP integration you can use the `plenigo\services\UserManagementService::registerUser` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $email     | yes     | string         | The email of the user to register |
| $language     | yes     | string         | The language |
| $externalUserId       | yes   | int        | The external user id for the new customer |
| $firstName       | yes   | string        | The given name for the new customer |
| $name       | yes   | string        | The name of the new customer|
   
```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The company id of your specific company. 
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The secret key of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

//2.Step: Fill the data for the registerUser() method.
$email = "testAddNewUser@mail.com"; // The email address of the customer.
$language = "en"; // The language.
$externalUserId = "A1BKAFZZ3H0H"; // The external customer id e.g "A1BKAFZZ3H0H" that the customer should have.
$firstName = "new"; // The first name of the customer. 
$name = "user"; // The name of the customer.

// 3.Step: This method returns true if the external user was registrated successfully otherwise, it will return false.
$registerUser = \plenigo\services\UserManagementService::registerUser($email, $language , $externalUserId, $firstName , $name );
```

## Implementation without SDKs 

Another possibility to register an external user into the plenigo system - can be a direct call to our REST API:

* [Register external user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)


## Create login token with SDKs

To indicate a successful login to the plenigo system you need to create a so called “Login Token”. This login token is valid for 5 minutes and can be passed e.g. to the build()-method of the `\plenigo\builders\CheckoutSnippetBuilder`.

### Java

For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#createLoginToken` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```java
// 1.Step: Configure the PHP SDK.
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj"; // The secret key of your specific company.
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // The company id of your specific company. 
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Fill the data for the createLoginToken() method.
String customerId = "56202510"; // The customer id.
String useExternalCustomerId = ""; 

// 3.Step: This method returns a login token for the customer.
String loginToken = UserManagementService.createLoginToken(String customerId, String useExternalCustomerId);
```
#### Use case Java

Use case for registrating and creating a login token for a checkout.

#### Server logic

```java

```

#### Page logic


### PHP

For PHP integration you can use the `plenigo\services\UserManagementService::createLoginToken` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step : Fill the data for the createLoginToken() method.
$customerId = '56202510'; // The customer id.
$useExternalCustomerId = false;

// 3.Step: This method returns a login token for the customer.
$loginToken = \plenigo\services\UserManagementService::createLoginToken($customerId, $useExternalCustomerId);
```

#### Use case PHP

Use case for registrating  and creating a login token for a checkout.

#### Server logic
```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\models\ProductBase;
use plenigo\services\UserManagementService;
use plenigo\builders\CheckoutSnippetBuilder;

// 1.Step: Configure the PHP SDK.The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("Tiiqfmpb9XuQUcnAcRdQhQZYq0inmiaSRv4zTFCm", "6hpZhjEgxMa9dAJFDxab");

// 2.Step: The product id.
$product = new ProductBase('EgLUrT56328991046641');

// 3.Step: Creating a checkout.
$checkout = new CheckoutSnippetBuilder($product);

// 4.Step: Fill the data for the registerUser() method.
$email = "test@mail.com"; // The email address.
$language = "en"; // The language.
$externalUserId = "12345"; // The external user id.
$firstName = "new"; // The first name.
$name = "customer"; // The name.
$userId = UserManagementService::registerUser($email, $language, $externalUserId, $firstName, $name);

// 5.Step: Add login token to this user.
$loginToken = UserManagementService::createLoginToken($userId);
$settings = array();

// 6.Step: Add the login token to the checkout snippet builder.
$plenigoCheckoutCode = $checkout->build($settings, $loginToken);
?>

```
#### Page logic 

```html
<html>
<head>
    <title> Title of the product </title>
    <!-- import the Plenigo Javascript SDK -->
    <script type="application/javascript"
            src="https://static.s-devops.com/static_resources/javascript/6hpZhjEgxMa9dAJFDxab/plenigo_sdk.min.js"
            data-lang="en">
    </script>
</head>
<body>
<button onclick="<?php echo $plenigoCheckoutCode ?>"> Special offer for you</button>
</body>
</html>
```

### Implementation without SDKs 

Another possibility to create login token - can be a direct call to our REST API:

* [Create login token](https://api.plenigo.com/#!/external_user_management/createLoginToken)

## Change email address of an existing user

It is very important for the plenigo system to know the correct email address of the user. Otherwise invoices, etc. cannot sent to the user. If the user or one of your support agents changes the email of the user in your user management system you have to inform the plenigo system about the changes.

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#changeEmail` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| email     | yes     | string         | The new email address for that customer |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```java
// 1.Step: Configure the Java SDK.
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company.
String companyId = "12NuCmdZUTRRkQiCqP2Q";  // The company id of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Fill the data for changeEmail() mehtod.
String email =  "testChangeEMail@mail.com"; // The new email address for that customer.

// 3.Step:  This method returns true if the email was changed successfully otherwise it will return false.
boolean useExternalCustomerId = false; // Flag indicating if customer id sent is the external customer id.
boolean changeEmail = UserManagementService.changeEmail(String customerId, String email, useExternalCustomerId);
```
#### PHP

For PHP integration you can use the `plenigo\services\UserManagementService::changeEmail` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $email     | yes     | string         | The new email address for that customer |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|


```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK.
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Fill the data for the changeEmail() method.
$customerId = "A1BKAFZZ3H0H"; // The customer id.
$email = "testChangeEMail@mail.com"; // The new email address.
$useExternalCustomerId = false; // The use external customer id. 

// 3.Step: $changeEmail will be TRUE if the email address was changed successfully
$changeEmail = \plenigo\services\UserManagementService::changeEmail($customerId, $email, $useExternalCustomerId);
```
### Implementation without SDKs

Another possibility to change an email address of an existing user - can be a direct call to our REST API:

* [Change email address of an existing user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)


## Giving a customer more access ids

With this functionality the company can provide several access ids to a given customer.
This is useful if the company has internal systems for billing, CRM, customer engagement, etc. With this data entered, you can use any of these Ids to check for access to products below.

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#importCustomerAccess` method for this purpose:

```
Java sdk Folgt
```


#### PHP

For PHP integration you can use the `plenigo\services\UserManagementService::importCustomerAccess` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|
| $customerIds     | yes     | String         | Array of one of four customer access ids |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK.
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Fill the data for the importCustomerAccess() method.
$customerId = 'A1BKAFZZ3H0H';// The customer id
$isExternal = 'false'; 
$customerIds = '12345'; // The customer ids.

// 3.Step: This method returns true if the customer access added successfully otherwise it will return false.
$importCustomerAccess = UserManagementService::importCustomerAccess($customerId, $isExternal, $customerIds);
```
## Add external user id

Add an external user id to a user that doesn't have an external user id assigned yet.

### Implementation with SDKs

#### Java

```java
Sdk fehlt 
```
#### PHP

For PHP integration you can use the `plenigo\services\UserManagementService::addExternalCustomerId` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $externalCustomerId     | yes     | String         | The external user id for the customer you want to add to the customer|

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK.
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Fill the data for the addExternalCustomerId() method.
$customerId = '56202510'; // The customer id from the plenigo backend.
$externalCustomerId = '12345'; // The external user id you want to add to the customer and which is not existing in the plenigo backend yet.

// 3.Step: This method return true if the user is added successfully otherwise it will return false.
$addExternalCustomerId = UserManagementService::addExternalCustomerId($customerId, $externalCustomerId);
```
### Implementation with SDKs

Another possibility to add external user id - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/external_user_management/createMultipleLoginTokens)