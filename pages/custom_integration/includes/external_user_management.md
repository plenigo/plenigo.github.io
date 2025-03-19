It is possible to use your own registration and login process and only login users into Frisbii Media via so called “Login Tokens”.

### Register an external user

#### General Workflow external user management 

![General Workflow External User Management](/assets/images/ci/ExternalUser.png)

(A) Register external user in the Frisbii Media system: -> [Register External User](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

#### Implementation with SDKs  


**PHP**

```php
<?php
/**
 * Registers a new user bound to the company that registers the user.
 *
 * @param string $email Email address of the user to register
 * @param string $language Language of the user as two digit ISO code
 * @param int $externalUserId An integer number that represents the user in the external system
 * @param string $firstName A given name for the new user
 * @param string $name A las name for the new user
 *
 * @return string Id of the created customer.
 *
 * @throws PlenigoException In case of communication errors or invalid parameters.
 */
\plenigo\services\UserManagementService::registerUser($email, $language = "en", $externalUserId = null, $firstName = null, $name = null)
```

#### Implementation without SDKs 

Another possibility to register an external user into the Frisbii Media system - can be a direct call to our REST API:

* [Register external user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)


### Change email address of an existing user

It is very important for the Frisbii Media system to know the correct email address of the user. Otherwise invoices, etc. cannot sent to the user. If the user or one of your support agents changes the email of the user in your user management system you have to inform the Frisbii Media system about the changes.

#### Implementation with SDKs

**Java**

For Java you can use the `com.plenigo.sdk.services.UserManagementService#changeEmail` method for this purpose:
```java
UserManagementService SDK useExternalCustomerID feld fehlt
```
**PHP**

```php
<?php
//Replaye MY_CUSTOMER, MY_EMAIL, MY_USE_EXTERNAL_CUSTOMER_ID with the real data
\plenigo\services\UserManagementService::changeEmail($MY_CUSTOMER, $MY_EMAIL, $MY_USE_EXTERNAL_CUSTOMER_ID = false)
```
#### Implementation without SDKs

Another possibility to change an email address of an existing user - can be a direct call to our REST API:

* [Change email address of an existing user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

### Create login token for an external user


#### Implementation with SDKs


**PHP**

To indicate a successful login to the Frisbii Media system you need to create a so called "Login Token". This login token is valid for 5 minutes and can be passed  e.g. to the `bulid()`- method of the \plenigo\builders\CheckoutSnippetBuilder`.

#### Implementation without SDKs 

Another possibility to get category information - can be a direct call to our REST API:

* [Create login token](https://api.plenigo.com/#!/external_user_management/createLoginToken)

* [Create multiple token](https://api.plenigo.com/#!/external_user_management/createMultipleLoginTokens)

### Giving a customer more access ids


With this functionality the company can provide several access ids to a given customer. This is useful if the company has internal systems for billing, CRM, customer engagement, etc. With this data entered, you can use any of these Ids to check for access to products below.

#### Implementation with SDKs

**Java**
sdk fehlt

**PHP**

The secret (e.g. "RYsDfmNzTWcQiO8PpLtwzNP8LHsV154TngrY5SSvj") and the company-ID (e.g. "51NuCmdDRTZZDkQqCqP2Q") of the Frisbii Media merchant backend.  
```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step Configure the Frisbii Media Manager:
$secret = 'SECRET';
$companyId = 'COMPANY_ID';

//configure Frisbii Media:
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2. Get the customer id
$isExternal = false; // False=Plenigo Customer ID / True=External customer ID
$customerIds = array('<MY_SAP_CUSTID>', '<MY_CRM_CUSTID>', '<MY_BILLING_CUSTID>', '<MY_ECOMMERCE_CUSTID>'); // one up to four access id

// (surround this code with a try/catch block to handle errors)
UserManagementService::importCustomerAccess($customerId, $isExternal, $customerIds);

// At this point if no Exceptions were thrown, then the customer access has been imported
```
### Has my user bought products 

To check if a customer has bought a product follow these steps:

**PHP**

```php
<?php
// 1.Step Configure the Frisbii Media Manager:
$secret = 'SECRET';
$companyId = 'COMPANY_ID';

\plenigo\PlenigoManager::configure($secret, $companyId);

//2. Get the customer id
//3. Get the product id
$hasBeenPaid = UserService::hasUserBought($productId, $customerId);
// $hasBeenPaid will be TRUE if the product has been bought by the customer, FALSE otherwise
```
