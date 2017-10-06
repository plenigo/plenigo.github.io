---
layout: default
title: manage user access rights
permalink: /manage user access rights
---
# Manage user access rights

Manage user access rights allows you to add access right for products to a user.

* [Grant access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove grant access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Query customer application ids ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove an application id for a customer ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Grant access rights

### Implementation with SDKs

#### Java

For Java integration you can use method.

 


#### PHP

For PHP integration you can use `plenigo\services\AccessService::grantUserAccess` method.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | string         | The external customer id |
| $startTime     | yes     | string         | The start time |
| $endTime     | yes     | string         | The end time |
| $products     | yes     | string         | The product ids |

```php
<?php
$customerId = '56202510'; //The customer id 
$useExternalCustomerId = 'true';//The external customer id
$startTime = '2019-09-09'; //The start time
$endTime = '2021-09-09'; //The end time
$productId = 'RgKUHT78563989856641'; //The product id 
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
$customerId = '56202510'; //The customer id 
$productId = 'RgKUHT78563989856641'; //The product id 
//2. Request a customer application access with the AppTokenData object
//This method returns a plenigo\services\AppAccessData object 
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
There is a limit of how many customer application ids you can request, but you can configure that in the company management interface of plenigo.

### Implementation without SDKs

Another possibility to allow a third party access to information - can be a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Check if an user has bought a product (companies and third parties can do this)

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.AppManagementService#hasUserBought` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string        | The id of the product |
| description     | yes     | string         | The description of the product |

```java
String customerId = "56202510"; //The customer id
String productId = "RgKUHT78563989856641"; //The product id of the product
String customerAppId "3YByDayCvJ0upADCQzcQfW5ELS2TetaaHitIBt95" //The customer App ID 
ProductAccessRequest productAccessRequest = new ProductAccessRequest(customerId, productId, customerAppId); 
//With the customer application id you can query product information, in the example below, we are requesting to see
//if an user has bought a product.
//This returns a boolean that will tell you if the user did buy the product(true) or not(false).
ProductAccessRequest request = AppManagementService.hasUserBought(productAccessRequest);
```

#### PHP

For PHP integration you can use the `plenigo\services\AppManagementService::hasUserBought` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string         | The id of the product |
| description     | yes     | string         |The description of the product |

```php
<?php
$customerId = '56202510'; //The customer id
$productId = 'RgKUHT78563989856641'; //The product id
$customerAppId = '3YByDayCvJ0upADCQzcQfW5ELS2TetaaHitIBt95'; //The customer app id
//With the customer application id you can query product information, in the example below, we are requesting to see
//if an user has bought a product.
//This returns a boolean that will tell you if the user did buy the product(true) or not(false).
$hasUserBought = AppManagementService::hasUserBought($customerId, $productId, $customerAppId);
```
### Implementation without SDKs

Another possibility to get category information - can be a direct call to our REST API:

* [Check if customer has bought product ](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)

## Query customer application ids (companies and third parties can do this)

As a company or a third party, you can request the current applications that you have registered for a specific customer(As a third party, you must configure the application id in the plenigo manager to do this, for more information see the “Sample usage of customer application id for third parties” in this wiki).

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.AppManagement#getCustomerApps` method for this purpose:


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |

```java
String customerId ="56202510"; //The customer id 
//This method returns a list plenigo\services\AppAccessData objects 
List<AppAccessData> appTokenData = AppManagementService.getCustomerApps(new CustomerAppRequest(customerId));
```

#### PHP
You can use the `plenigo\services\AppManagement::getCustomerApps` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |

```php
<?php
//This method returns a list plenigo\services\AppAccessData objects 
$customerId = "56202510"; //The customer id 
$appsData = AppManagementService::getCustomerApps("customerId");
```

### Implementation without SDKs

Another possibility to query customer application ids - can be a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)

## Remove an application id for a customer(only companies can do this)

As a company, if you would like to remove a customer application id, you can do this with the Application management service.

### Implementation with SDks

#### Java

For Java integration you can use the `com.plenigo.sdk.services.AppManagement.deleteCustomerApp` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| customerAppId     | yes     | string         | The customer app id |

```java
String customerId = "56202510"; //The customer id 
String customerAppId = "3YByDayCvJ0upADCQzcQfW5ELS2TetaaHitIBt95"; //The customer app id
//This method does not return an exception, this will delete the customer app id for the specific //customer
AppManagementService.deleteCustomerApp(new DeleteAppIdRequest(customerId, customerAppId);
```

#### PHP

For PHP integration you can use the `plenigo\services\AppManagement::deleteCustomerApp` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| customerAppId     | yes     | string         | The customer app id |

```php
<?php
$customerId = '56202510'; //The customer id
$customerAppId = '3YByDayCvJ0upADCQzcQfW5ELS2TetaaHitIBt95'; //The customer app id 
//This method does not return an exception, this will delete the customer app id for the specific //customer
AppManagementService::deleteCustomerApp($customerId, $customerAppId);
```
### Implementation without SDKs

Another possibility to remove an application id for a customer - can be a direct call to our REST API:

* [Remove application id for a customer](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)