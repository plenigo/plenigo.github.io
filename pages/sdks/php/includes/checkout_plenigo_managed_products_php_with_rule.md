---
layout: default
title: Checkout with plenigo managed products including rules
permalink: /checkout_plenigo_managed_products_with_rule_php
---

## Checkout with external login
If you want to do a checkout without the login functionality of plenigo you have to do the following steps. First of all you have to register the external user into the plenigo system. After you have done this you have to create a Login Token for this user.


### Use case  
Use case for implementing checkout with plenigo managed products wihout plenigo login. The only thing you have to do is creating a product in the plenigo backend.
Then you have to replace the company ID (e.g.23NuCmdPoiRRkQiCqP9Q), the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj)  and the product id(e.g. aitnVIz1503443609941).This example assumes you are running in test mode.

#### Server logic
The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/configuration_php).

#### Rule Logic
plenigo offers ability to add rules to each product. One have to add those rules within plenigo Backend. Rules append logic to each purchase. So one can sell a cheaper product only, if the customer is younger than 20 years - if the customer is older he will buy the normal priced product automatically.  If a 19 years old customer buys this product, he will be switched to the normal priced product at his 20th birthday.
To validate a rule, plenigo normally shows additional screens in the checkout.

##### Rule via API
Otherwise you can validate a rule before starting a checkout. You have to decide, which product should be shown to the user. plenigo will switch the products automatically at the customer's birthday. You only have to add the birthday rule via API:
 
```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the Java SDK: Provide the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode (true).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company. 
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId, true);

// 2.Step: The product id from the plenigo backend.
$productId = 'EgLUrT56328991046641';
$customerId = '12345'; // The customer id

// 3.Step: Register the user into the plenigo system.
$userId = UserManagementService::registerUser("user@testmail.com", "language", "theCustomerId", 'firstName', 'name');

// 4.Step: Create the login token for this user. 
$loginToken = UserManagementService::createLoginToken($userId);

// 5.Step: Set the product id.
$product = new ProductBase($productId);

// 6.Step: add a birthday to validate the rule
$checkout->addBirthdayRule(new DateTime("10.09.1976"));

// For example CRSF Token....
$settings = array();

// 7.Step: Create the login token.
$plenigoCheckoutCode = $checkout->build($settings, $loginToken);

// 8.Step: Creating the checkout snippet for this product. The snippet will have the following format: plenigo.checkoutWithRemoteLogin('ENCRYPTED_STRING_HERE').
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout -> build();
```

Please compare with [Checkout](/checkout_plenigo_managed_products_php)
