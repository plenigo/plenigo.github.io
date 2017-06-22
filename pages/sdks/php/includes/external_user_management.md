It is possible to use your own registration and login process and only login users into plenigo via so called "Login Tokens".

### Register an external user
To register an external user into the plenigo system you shoul use the method \plenigo\services\UserManagementService::registerUser. This method returns you the plenigo-user-id of the external user in the plenigo system. This user id will only be used for internal references. In the whole checkout process the user will only see the id you passed as external user id parameter to the method.

If you try to register a user twice you will get the user id returned that was created during the first registration process.

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

###  Change email address of an existing user
It is very important for the plenigo system to know the correct email address of the user. Otherwise invoices, etc. cannot sent to the user. If the user or one of your support agents changes the email of the user in your user management system you have to inform the plenigo system about the changes. 

```php
<?php
/**
 * Change email address of an existing user.
 *
 * @param string $customerId Customer id of the user to change email address for
 * @param string $email New email address of user
 * @param bool $useExternalCustomerId Flag indicating if customer id sent is the external customer id
 *
 * @return bool TRUE Email address changed
 *
 * @throws PlenigoException In case of communication errors or invalid parameters
 */
\plenigo\services\UserManagementService::changeEmail($customerId, $email, $useExternalCustomerId = false)
```

### Create login token for an external user
To indicate a successful login to the plenigo system you need to create a so called "Login Token". This login token is valid for 5 minutes and can be passed e.g. to the `build()`-method of the `\plenigo\builders\CheckoutSnippetBuilder`. 

```php
<?php
/**
 * Create a login token for an existing user.
 *
 * @param string $customerId Customer id of the user to create login token for
 * @param bool $useExternalCustomerId Flag indicating if customer id sent is the external customer id
 *
 * @return string One time token used to create a valid user session
 *
 * @throws PlenigoException In case of communication errors or invalid parameters
*/
\plenigo\services\UserManagementService::createLoginToken($customerId, $useExternalCustomerId = false)
```
Example for using the login token in combination with the checkout.

```php
<?php
//1. Configure the Plenigo Manager as usual
//2. Get the customer id
$loginToken = UserManagementService::createLoginToken($customerId);
//3. $loginToken will contain the token that can be used to generate a buy button

// Create a product
$product = new \plenigo\models\ProductBase('item-123');

// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
// other settings (like CSRF token, etc.)
$settings = array();
// No settings but loginToken provided
$plenigoCheckoutCode = $checkout->build($settings, $loginToken);
// now we can use this snippet in a link or button
echo '<a href="#" onclick="' . $plenigoCheckoutCode . 'return false;">Specially offer for you!</a>';
```

To use these snippet on your site you have to include the [plenigo JavaScript SDK](https://developer.plenigo.com/sdks/javascript/server).

### Giving a Customer more access ids

With this functionality the company can provide several access ids to a given customer. This is useful if the company has internal systems for billing, CRM, customer engagement, etc. With this data entered, you can use any of these Ids to check for access to products below.

```php
<?php
//1. Configure the Plenigo Manager as ususal
//2. Get the customer id

$isExternal = false; // False=Plenigo Customer ID / True=External customer ID
$customerIds = array('<MY_SAP_CUSTID>', '<MY_CRM_CUSTID>', '<MY_BILLING_CUSTID>', '<MY_ECOMMERCE_CUSTID>'); // one up to four access id

// (surround this code with a try/catch block to handle errors)
UserManagementService::importCustomerAccess($customerId, $isExternal, $customerIds);

// At this point if no Exceptions were thrown, then the customer access has been imported
```

### Has my customer bought this?

Good for product listings. To check if a customer has bought a product follow these steps:

```php
<?php
//1. Configure the Plenigo Manager as ususal
//2. Get the customer id
//3. Get the product id

$hasBeenPaid = UserService::hasUserBought($productId, $customerId);
// $hasBeenPaid will be TRUE if the product has been bought by the customer, FALSE otherwise
```

> NOTE: Make sure you disable error showing and handle exceptions accordingly to detect all problems and react gracefully.