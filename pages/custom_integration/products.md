---
layout: default
title: products
permalink: /products
---

# Products
If the product is managed by plenigo and was configured in the plenigo website you can get information about that.

* [Has user bought a product ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get list of bought products and subscriptions ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get product information?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get product list ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get category list ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Is paywall enabled ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Check if an user has bought a product

To query if an user has bought a product, you must be logged in with plenigo, once you have done this you will have a cookie that contains encrypted data of the user, once you have this. The only thing you have to do is pass the product id and the cookie header to a service method, examples are provided below.
 
### Implementation with SDKs

#### Java
 
Steps:
1. Login with plenigo follow this link: [Login with plenigo](https://api.plenigo.com/#!/user/hasBoughtProduct)
2. Get the product id from the plengio backend

![Workflow external products ](/assets/images/ci/product_id.png)

For Java integration you can use the `com.plenigo.sdk.services.UserService#hasUserBought` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the plenigo backend |
| cookieHeader     | yes     | string         | The cookie  header |

```java
javax.servlet.http.HttpServletRequest request = null;
//We fill the request object with the appropriate get object and we get the Cookie header this way
String productId = "RgKUHT78563989856641";
String cookieHeader = request.getHeader("Cookie");
//This returns a boolean that will tell you if the user did buy the product(true) or not (false).
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
```
This will return false too if the cookie has expired. This will return true always if the Paywall isn’t enabled, see below. 

#### PHP

1. Login with plenigo follow this link: [Login with plenigo](https://api.plenigo.com/#!/user/hasBoughtProduct)
2. Get the product id and the customer id from the plengio backend

![Workflow external products ](/assets/images/ci/customer_id.png)


For PHP integration you can use the `\plenigo\services\UserService::hasBoughtProductWithProducts` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |
| $customerId     | yes     | string         | The customer id you can get from the plenigo backend. |

```php
<?php
$productId = 'RgKUHT78563989856641';
$customerId = '56202510';
//This returns a boolean that will tell you if the user did buy the product(true) or not (false).
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId, $customerId);
```
"$productId can be an array of several IDs, then the method will return true if ANY of the provided products has been bought.

This will return false too if the cookie has expired. This will return true always if the Paywall isn’t enabled, see below. 

### Implementation without plenigo SDKs

Another possiblity to check if the user has bought the product - can be a direct call to our REST API:
[Has user bought request](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Obtain a list of bought products and subscriptions

If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.
The user, company and secret data will be obtained from the current logged in user, and the configured Plenigo SDK.

### Implementation with SDKs

#### Java 
For Java integration you can use the `com.plenigo.sdk.services.UserService#getProductsBought` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| cookieHeader     | yes     | string         | The cookie  header |

```java
javax.servlet.http.HttpServletRequest request = null;
// We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
// This method returns a com.plenigo.sdk.models.ProductsBought object with the required data
ProductsBought productsBought = UserService.getProductsBought(cookieHeader);
```

Returned ProductData object:

```text
{
  "subscriptions": [
    {
      "productId": "RgKUHT78563989856641",
      "title": "Test Product",
      "buyDate": "2017-07-31 13:03:27 +0200"
    }
  ],
  "singleProducts": [
    {
      "productId": "SVjYNCn5024345046641",
      "title": "News",
      "buyDate": "2017-07-31 13:01:10 +0200",
    }
  ]
}
```

#### PHP 

For PHP integration can use the `\plenigo\services\UserService::getProductsBought()` method for this purpose.

```php
<?php
$listUserBought = \plenigo\services\UserService::getProductsBought();
```
This returns an associative array with two main sub-arrays, “singleProducts” and “subscriptions”:

```php
<?php
array (
  subscriptions => array (
    0 => array(
      'productId' => 'RgKUHT78563989856641',
      'title' => 'Test Product',
      'buyDate' => '2017-07-31 13:03:27 +0200',
      'endDate' => 'YYYY-MM-DD HH:mm:ss +0100',
    ),
  ),
  singleProducts => array (
    0 => array(
      'productId' => 'SVjYNCn5024813046641',
      'title' => 'News',
      'buyDate' => '2017-07-31 13:01:10 +0200',
    ),
  ),
)
```

### Implementation without plenigo SDKs

Another possibility to check if the user has bought products - can be a direct call to our REST API:
[Has user bought products and subscriptions request](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Is the Paywall enabled 

If you want to know if your paywall is enabled you can have a look at the plenigo backend.

![Enable paywall](/assets/images/ci/paywall.png)

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.UserService#isPaywallEnabled()` method for this purpose.

```java
// This method returns true if the paywall is enabeld otherwise it will return false.
boolean isPayWallEnabled = UserService.isPaywallEnabled();
```

#### PHP

For PHP integration you can use the `com.plenigo.sdk.services.UserService::isPaywallEnabled()` method for this purpose.

```php
<?php
// This method returns true if the paywall is enabeld otherwise it will return false.
$payWallEnabled = \plenigo\services\UserService::isPaywallEnabled();
```
### Implementation without plenigo SDKs

Another possibility to check if the paywall is enabled - can be a direct call to our REST API:
[Is the paywall enabeld request](https://api.s-devops.com/#!/paywall/isPaywallEnabledt)

## Get product information

In order to get product information you can call the product listing service.

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService#getProductData` method for this purpose and returns a `com.plenigo.sdk.models.ProductData` object:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         |  The product id from the plenigo backend  |

```java
String productId = "RgKUHT78563989856641";
// This method returns a com.plenigo.sdk.models.ProductsBought object with the required data
ProductData productData = ProductService.getProductData(productId);
// The title of the product
String title = productData.getTitle();
// The id of the product
String id = productData.getId();
// The price of the product
double price = productData.getPrice();
// The currency of the country
String currency = productData.getCurrency();
```

Returned ProductData object:
```text
  ProductData:
  title: Test Product
  id: RgKUHT78563991046641
  price: 18,99 EUR
```

#### PHP

For PHP integration you can use the `\plenigo\services\ProductService::getProductData` method for this purpose and this returns a `\plenigo\models\ProductData` object:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         |  The product id from the plenigo backend  |

```php
<?php
$productId = "RgKUHT78563989856641";
// This method will return a ProductData object
$productData = ProductService::getProductData(productId);
$title = $productData->getTitle();
$id = $productData->getId();
$price = $productData->getPrice();
$currency = $productData->getCurrency();
// The ProductData object is equal as in the Java example 
```

Returned ProductData object:
```text
ProductData:
title: Test Product
id: RgKUHT78563989856641
price: 18,99 EUR
```

### Implementation without plenigo SDKs

Another possibility to get product information - can be a direct call to our REST API: [Get product information request](https://api.plenigo.com/#!/product/getProduct)

## Get product list

In order to list all products for a company, you can call the product listing service.

### Implementation with SDKs  

#### Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService#getProductList` method for this purpose and this returns a `com.plenigo.sdk.models.ProductInfo` object:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |
| page     | yes     | string         | The page number |

```java
int pageSize = 10; // Range from 10...100
int page = 0;
// This method returns a list of the ProductInfo(productId, title, description) objects
PagedList<ProductInfo> productList = ProductService.getProductList(pageSize, page);
productList.getList();
```
Returned ProductInfo objects:
```
ProductInfo:
title: Test Product
id: RgKUHT78563989856641
description: Test

ProductInfo:
title: News
id: SVjYNCn5024345046641
description: Test 

```

#### PHP

For PHP integration you can use the `\plenigo\services\ProductService::getProductList` method for this purpose and this returns a `\plenigo\models\ProductInfo` object:

```php
<?php
// This method returns a list of the ProductInfo(productId, title, description)
$productList = \plenigo\services\UserService::getProductsList();
// The ProductInfo objects are equal as in the Java example 
```

### Implementation without plenigo SDKs 

Another possibility to get product list - can be a direct call to our REST API:

* [Get product list request](https://api.plenigo.com/#!/product/getProductsWithFullDetails)

## Get category list

In order to list all categories for a company, you can call the category listing service.

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService:getCategoryList` method for this purpose:


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |
| page     | yes     | string         | The page number |

```java
int pageSize = 10; // range from 10...100
int page = 0;
// This method returns a list of CategoryInfo objects (productId, title, description)
PagedList<CategoryInfo> categoryList = ProductService.getCategoryList(pageSize, page); 

```
Returned CategoryInfo object:

```text
{
    {
      "categoryId": "bbxEfY22724581319741"
      "title": "Test Category for API",
    },
    {
      "categoryId": "9RQtmq06165103137741"
      "title": "Test Category for API 2",
    },
    {
      "categoryId": "6g3lbAZ8762418866641"
      "title": "Test Category for API 3",
    }
}
```
![Enable paywall](/assets/images/ci/category.png)


#### PHP

To get information of the categories you can use the `\plenigo\services\ProductService::getCategoryList` method, which requires the page size and page number and returns an associative array as shown below.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |

```php
<?php
$pageSize = 10;//range from 10...100
// This method returns a list of CategoryInfo objects (productId, title, description)
$catList = ProductService::getCategoryList($pageSize);
// The CategoryInfo objects are equal as in the Java example 
```

#### Implementation without plenigo SDKs

Another possibility to get a category list - can be a direct call to our REST API: [Get category list request](https://api.plenigo.com/#!/category/getCategories)
