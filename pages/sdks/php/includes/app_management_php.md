---
layout: default
title: App Management PHP
permalink: /app_management_php
---
# App Management

App Management allows a third party to access information for a specific product.

* [Allow a third party access to an information ?](https:/plenigo.github.io/app_management_java#allow-a-third-party-to-access-customer-information-for-a-specific-product)
* [Has user bought a product ?](https://plenigo.github.io/app_management_java#check-if-an-user-has-bought-a-product)
* [Query customer application Ids ?](https://plenigo.github.io/app_management_java#query-customer-application-ids)
* [Remove an application ID ?](https://plenigo.github.io/app_management_java#remove-an-application-id-for-a-customer)

## Allow a third party to access customer information for a specific product

You can register a third party and give him access to customer information and information about specific products by using the SDK.


For PHP integration you can use `plenigo\services\AppManagement#requestAppToken`  method in order to allow a third party access to to customer information and to information about specific products.


1: Configure an application ID

You have to add this using the Frisbii Media management interface, through the account menu, inside the extended settings tab(Settings->Apps).

![Configure an application ID ](/assets/images/ci/app_id.png)

2/3:  Request an access token and a customer application access

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| productId     | yes     | string         | The ID of the product |
| description     | yes     | string         | The description of the product |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company from the Frisbii Media backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company ID of your specific company from the Frisbii Media backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Request an access token.
$customerId = '56202510'; // The customer id from the Frisbii Media backend.
$productId = 'RgKUHT78563989856641'; // The product id from the Frisbii Media backend.
$description = 'test'; // The description of the product.
// This method returns a plenigo\services\AppAccessToken object.
$appAccessToken = AppManagementService::requestAppToken($customerId, $productId , $description);
```

Returned AppAccessToken object:
```text
{
  "customerId": "56202510",
  "token": "6176437516",
  "description": "test"
}
```

```php
<?php
// 3. Step: Request a customer application access with the AppTokenData object.
$customerId = '56202510'; // The customer id from the Frisbii Media backend. 
$productId = 'RgKUHT78563989856641'; // The product id from the Frisbii Media backend.
// This method returns a plenigo\services\AppAccessData object.
$appAccessData = AppManagementService::requestAppId($customerId, $productId);
```

Returned AppAccessData object:

```text
{
  "customerId": "56202510",
  "description": "test",
  "customerAppId": "3YByDayCvJ0upADCQzcQfW5ELS2TetaaHitIBt95",
  "productId": "RgKUHT78563989856641"
}
```
Once you have the application access data, you can give this information to the third party and they can reuse this as many times as they would like.

## Allow a third party to access customer information for a specific product without SDK

Another possibility to allow a third party access to information - is a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Check if an user has bought a product 


For PHP integration you can use the `plenigo\services\AppManagementService::hasUserBought` method in order to check if an user has bought a product.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| productId     | yes     | string         | The ID of the product |
| description     | yes     | string         |The description of the product |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj';  // The company ID of your specific company from the Frisbii Media backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The secret key of your specific company from the Frisbii Media backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

$customerId = '56202510'; // The customer ID from the Frisbii Media backend.
$productId = 'RgKUHT78563989856641'; // The product ID from the Frisbii Media backend.
$customerAppId = 'ftYHMpmIiRzM40ZDIQx5CIPPtN3H33mzPd7BSr3G'; // The customer app ID.

// With the customer application ID you can query product information.
// This returns a boolean that will tell you if the user did buy the product(true) or not(false).
$hasUserBought = AppManagementService::hasUserBought($customerId, $productId, $customerAppId);
```
### Implementation without SDK

Another possibility to access customer to information - is a direct call to our REST API:

* [Check if customer has bought a product ](https://api.plenigo.com/#!/app_management/requestAppAccessToken)

## Query customer application IDs 

You or a third party, you can request the current applications that you have registered for a specific customer.

You can use the `plenigo\services\AppManagement::getCustomerApps` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |

```php
<?php

// This method returns a list of  plenigo\services\AppAccessData objects 
$customerId = "56202510"; //The customer id 
$appsData = AppManagementService::getCustomerApps("customerId");
```

## Query customer application ids without SDK

Another possibility to query customer application IDs - is a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerAppAccess)

## Remove an application ID

As a company, if you would like to remove a customer application ID, you can do this with the application management service.


For PHP integration you can use the `plenigo\services\AppManagement::deleteCustomerApp` method in order to remove an application ID.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| customerAppId     | yes     | string         | The customer app ID |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company from the Frisbii Media backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company ID of your specific company from the Frisbii Media backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Delete the customer app.
$customerId = '56202510'; // The customer ID from the Frisbii Media backend.
$customerAppId = 'ftYHMpmIiRzM40ZDIQx5CIPPtN3H33mzPd7BSr3G'; // The customer app ID.
// This method does not return an exception, this will delete the customer app id for the specific customer.
AppManagementService::deleteCustomerApp($customerId, $customerAppId);
```
## Remove an application ID for a customer without SDK

Another possibility to remove an application id for a customer - is a direct call to our REST API:

* [Remove application id for a customer](https://api.plenigo.com/#!/app_management/deleteCustomerAppAccess)
