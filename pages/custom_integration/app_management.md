---
layout: default
title: App Management
permalink: /app_management
---
# App Management

App Management allows a third party to access information for a specific product.

* [Allow a third party access to an information ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Has user bought a product ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Query customer application ids ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove an application id for a customer ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Allow a third party to access customer information for a specific product(only companies can do this)

As a company, if you want to register a third party so that they can query product access of a specific customer, you can do this using the sdk. 

There are a couple of steps that you have to do in order to do this:

1. Configure an application id
2. Request an access token
3. Request a customer application access


### Implementation with SDKs

#### Java

You can use the `com.plenigo.sdk.services.AppManagement#requestAppToken` method for this purpose followed by the  `com.plenigo.sdk.services.AppManagement#requestAppID` method:

1: Configure an application id

As a company, you have to add this using the plenigo management interface, through the account menu, inside the extended settings tab(Settings->Apps).

2/3:  Request an access token and a customer application access

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string         | The id of the product |
| description     | yes     | string         | The description of the product |

```java
String customerId = "0987"; //The customer id
String productId "12345"; //The product id of the product
String description = "testDescripiton"; //The description of the product
AppAccessToken apptoken = new AppAccessToken(customerId,productId,description);
//2. Request an access token
//This object is used to request the token, you specificy the customer id, the product and the description
AppAccessToken appAccessToken = AppManagementService.requestAppToken(apptoken);
//3. Request a customer application access with the AppTokenData object
//Once you have the access token, you can use this to request a customer application id for the third party
AppAccessData appAccessData = AppManagementService.requestAppId(appAccessToken.getCustomerId(), $appAccessToken.getAppToken());
```
Once you have the application access data, you can give this information to the third party and they can reuse this as many times as they would like. There is a limit of how many customer application ids you can request, but you can configure that in the company management interface of plenigo. 


#### PHP

You can use the `com.plenigo.sdk.services.AppManagement::requestAppToken` method for this purpose, followed by the `com.plenigo.sdk.services.AppManagement#requestAppId` method:

1: Configure an application id

As a company, you have to add this using the plenigo management interface, through the account menu, inside the extended settings tab(Settings->Apps).

2/3:  Request an access token and a customer application access

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string         | The id of the product |
| description     | yes     | string         | The description of the product |

```php
<?php
$customerId = '0987';
$productId = '12345';
$description = 'testDescription';
$appAccessToken = AppManagementService::requestAppToken($customerId, $productId ,$productId);
//3. Request a customer application access with the AppTokenData object
//Once you have the access token, you can use this to request a customer application id for the third party
$appAccessData = AppManagementService::requestAppId($appAccessToken->getCustomerId(), $appAccessToken->getAppToken());
```

Once you have the application access data, you can give this information to the third party and they can reuse this as many times as they would like.
There is a limit of how many customer application ids you can request, but you can configure that in the company management interface of plenigo.

### Implementation without SDKs

Another possibility to allow a third party access to information - can be a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Check if an user has bought a product (companies and third parties can do this)

### Implementation with SDKs

#### Java

The `CompanyService#getUserList()` method one parameter

You can use the `com.plenigo.sdk.services.AppManagementService#hasUserBought` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string        | The id of the product |
| description     | yes     | string         | The description of the product |

```java
String customerId = "0987"; //The customer id
String productId = "12345"; //The product id of the product
String customerAppId "012345" //The customer App ID 
ProductAccessRequest productAccessRequest = new ProductAccessRequest(customerId, productId, customerAppId); 
//With the customer application id you can query product information, in the example below, we are requesting to see
//if an user has bought a product.
//This returns a boolean that will tell you if the user did buy the product(true) or not(false).
ProductAccessRequest request = AppManagementService.hasUserBought(productAccessRequest);

```

#### PHP

You can use the `com.plenigo.sdk.services.AppManagementService::hasUserBought` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| productId     | yes     | string         | The id of the product |
| description     | yes     | string         |The description of the product |

```php
<?php
$customerId = '0987';//The customer id
$productId = '12345'; //The product id
$customerAppId = '012345'; //The customer app id
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

You can use the `com.plenigo.sdk.services.AppManagement#getCustomerApps` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |

```java
String customerId ="12345";
//This method will return a list of customer application access information
List<AppAccessData> appTokenData = AppManagementService.getCustomerApps(new CustomerAppRequest(customerId));
```

#### PHP
You can use the `com.plenigo.sdk.services.AppManagement::getCustomerApps` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |

```php
<?php
//This method will return a list of customer application access information
$customerId = "12345";
$appsData = AppManagementService::getCustomerApps("customerId");
```

### Implementation without SDKs

Another possibility to query customer application ids - can be a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)

## Remove an application id for a customer(only companies can do this)

As a company, if you would like to remove a customer application id, you can do this with the Application management service.

### Implementation with SDks

#### Java

You can use the `com.plenigo.sdk.services.AppManagement.deleteCustomerApp` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| customerAppId     | yes     | string         | The customer app id |

```java
String customerId = "12345";
String customerAppId = "012345";
//As long as this method does not return an exception, this will delete the customer app id for the specific //customer
AppManagementService.deleteCustomerApp(new DeleteAppIdRequest(customerId, customerAppId);
```

#### PHP

You can use the `com.plenigo.sdk.services.AppManagement::deleteCustomerApp` method, an example is provided below:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| customerAppId     | yes     | string         | The customer app id |

```php
<?php
//As long as this method does not return an exception, this will delete the customer app id for the specific //customer
$customerId = '12345';
$customerAppId = '012345';
AppManagementService::deleteCustomerApp($customerId, $customerAppId);
```
### Implementation without SDKs

Another possibility to remove an application id for a customer - can be a direct call to our REST API:

* [Remove application id for a customer](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)
