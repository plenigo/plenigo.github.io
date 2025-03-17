---
layout: default
title: App Management
permalink: /app_management_java
---
# App Management

App Management allows a third party to access information for a specific product.

* [Allow a third party access to an information ?](https:/plenigo.github.io/app_management_java#allow-a-third-party-to-access-customer-information-for-a-specific-product)
* [Has user bought a product ?](https://plenigo.github.io/app_management_java#check-if-an-user-has-bought-a-product)
* [Query customer application Ids ?](https://plenigo.github.io/app_management_java#query-customer-application-ids)
* [Remove an application ID ?](https://plenigo.github.io/app_management_java#remove-an-application-id)

## Allow a third party to access customer information for a specific product

You can register a third party and give him access to customer information and information about specific products by using the SDK.


For Java integration you can use `com.plenigo.sdk.services.AppManagement#requestAppToken`method in order to a allow a third party access to customer information and information about specific products. 

1: Configure an application ID

As a company, you have to add this by using the Frisbii Media management interface, through the account menu, inside the extended settings tab.

![Configure an application ID ](/assets/images/ci/app_id.png)


2/3:  Request access token and a customer application 

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| productId     | yes     | string         | The ID of the product |
| description     | yes     | string         | The description of the product |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";   // The comapny ID of your specific company from the plengigo backend.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The secret key of your specific company from the plengigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2. Step: 3. Request an access token.
String customerId = "56202510";  // The customer id from the Frisbii Media backend.
String productId "RgKUHT78563989856641"; // The product id from the Frisbii Media backend.
String description = "test"; // The description of the product.
AppAccessToken apptoken = new AppAccessToken(customerId, productId, description);
AppAccessToken appAccessToken = AppManagementService.requestAppToken(apptoken);
```

Returned AppAccessToken object:
```text
{
  "customerId": "56202510",
  "token": "6176437516",
  "description": "test"
}
```

```java
// 4.Step: Request a customer application access with the AppTokenData object.
// Once you have the access token, you can use this to request a customer application ID for the third party.
String customerId = "56202510"; // The product ID from the Frisbii Media backend.
String accessToken = "6176437516" // The access token.
// This method returns a com.plenigo.sdk.models.AppAccessData object.
AppAccessData appAccessData = AppManagementService.requestAppId(customerId, accessToken);
```

Returned AppAccessData object:

```text
{
  "customerId": "56202510",
  "description": "test",
  "customerAppId": "ftYHMpmIiRzM40ZDIQx5CIPPtN3H33mzPd7BSr3G",
  "productId": "RgKUHT78563989856641"
}
```
Once you have the application access data, you can give this information to a third party and they can reuse this as many times as they would like. There is a limit of how many customer application IDs you can request, but you can configure that in the company management interface of Frisbii Media. 


## Allow a third party to access customer information for a specific product without SDK

Another possibility to allow a third party access to information - is a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Check if an user has bought a product 


For Java integration you can use the `com.plenigo.sdk.services.AppManagementService#hasUserBought` method in order to check if an user has bought a product.


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| productId     | yes     | string        | The ID of the product |
| description     | yes     | string         | The description of the product |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company from the Frisbii Media Backend.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company from the Frisbii Media Backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Check if user has bought product.
String customerId = "56202510"; // The customer ID from the Frisbii Media backend.
String productId = "RgKUHT78563989856641"; // The product ID of the product from the Frisbii Media Backend.
String customerAppId "ftYHMpmIiRzM40ZDIQx5CIPPtN3H33mzPd7BSr3G" // The customer App ID.
ProductAccessRequest productAccessRequest = new ProductAccessRequest(customerId, productId, customerAppId); 

// With the customer application ID you can query product information.
// This returns a boolean that will tell you if the user did buy the product(true) or not(false).
ProductAccessRequest request = AppManagementService.hasUserBought(productAccessRequest);
```

### Implementation without SDK

Another possibility to access customer to information - is a direct call to our REST API:

* [Check if customer has bought a product ](https://api.plenigo.com/#!/app_management/requestAppAccessToken)

## Query customer application IDs 

You or a third party can request the current applications that you have registered for a specific customer.

For Java integration you can use the `com.plenigo.sdk.services.AppManagement#getCustomerApps` method in order to request customer application IDs.


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |

```java
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj"; // The secret key of your specific company from the Frisbii Media Backend.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company from the Frisbii Media Backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Query customer application ids.
String customerId ="56202510"; // The customer id from the Frisbii Media Backend.

// This method returns a list plenigo\services\AppAccessData objects 
List<AppAccessData> appTokenData = AppManagementService.getCustomerApps(new CustomerAppRequest(customerId));
```

## Query customer application ids without SDK

Another possibility to query customer application IDs - is a direct call to our REST API:

* [Get all customer apps](https://api.plenigo.com/#!/app_management/getCustomerAppAccess)

## Remove an application ID

As a company, if you would like to remove a customer application ID, you can do this with the application management service.


For Java integration you can use the `com.plenigo.sdk.services.AppManagement.deleteCustomerApp` method in order to remove an application ID.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer ID |
| customerAppId     | yes     | string         | The customer app ID |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company from the Frisbii Media Backend.
String companyId = "23NuCmdPoiRRkQiCqP9Q";  // The comapny ID of your specific company from the Frisbii Media Backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Delete the customer app.
String customerId = "56202510"; // The customer ID from the Frisbii Media Backend.
String customerAppId = "ftYHMpmIiRzM40ZDIQx5CIPPtN3H33mzPd7BSr3G"; // The customer app ID
// This method does not return an exception, this will delete the customer app ID for the specific customer.
AppManagementService.deleteCustomerApp(new DeleteAppIdRequest(customerId, customerAppId);
```

## Remove an application ID for a customer without SDK

Another possibility to remove an application id for a customer - is a direct call to our REST API:

* [Remove application id for a customer](https://api.plenigo.com/#!/app_management/deleteCustomerAppAccess)
