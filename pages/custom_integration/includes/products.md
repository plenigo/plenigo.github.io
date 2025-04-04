### Check if an user has bought a product

To query if an user has bought a product, you must be logged in with Frisbii Media, once you have done this you will have a cookie that contains encrypted data of the user, once you have this.
The only thing you have to do is pass the product id and the cookie header to a service method, examples are provided below.

#### Implementation with SDKs  

**Java**

For Java you can use the `com.plenigo.sdk.services.UserService#hasUserBought` method for this purpose:

```java
javax.servlet.http.HttpServletRequest request = null;
// Replace "MY_PRODUCT_ID" with the product id from the Frisbii Media backend
//We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
String productId = "MY_PRODUCT_ID";
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
```
**PHP**

For PHP you can use the `\plenigo\services\UserService::hasBoughtProductWithProducts` method for this purpose.

```php
// Replace "MY_PRODUCT_ID" with the product id from the Frisbii Media backend
<?php
$hasUserBought = \plenigo\services\UserService::hasUserBought($MY_PRODUCT_ID);
```
"MY_PRODUCT_ID" can be an array of several IDs, then the method will return true if ANY of the provided products has been bought.
This returns a boolean that will tell you if the user did buy the product(true) or not(false).This will return false too if the cookie has expired.
This will return true always if the Paywall isn't enabled, see below. 

#### Implementation without SDKs 

Another possiblity to check if the user has bought the product - can be a direct call to our REST API:
* [Has user bought request](https://api.plenigo.com/#!/user/hasBoughtProduct)

### Obtain a list of bought products and subscriptions
If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.
The user, company and secret data will be obtained from the current logged in user, and the configured Frisbii Media SDK

#### Implementation with SDKs  

**Java**

For java you can use the `com.plenigo.sdk.services.UserService#getProductsBought` method for this purpose.

```java
javax.servlet.http.HttpServletRequest request = null;
//We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
ProductsBought productsBought = instance.getProductsBought(PLENIGO_USER_SAMPLE_COOKIE);
```
**PHP**
```php
<?php
$listUserBought = \plenigo\services\UserService::getProductsBought();
```
This returns a `com.plenigo.sdk.models.ProductsBought` object with the required data.

***
This method will respond to the testMode configuration of the SDK
If the user is not found or there is a proble with the user id,  the result will be an empty object.
The error codes include 400 (if company/secret has a problem) and 401 (if paramteres are incorrect).
***
#### Implementation without SDKs 

* [Has user bought request](https://api.plenigo.com/#!/user/hasBoughtProductWithProducts)

### Get product information

In order to get product information you need the product ID, you can get it in the product management area of the Frisbii Media website, let's say for example that your product id is QFURxFv0098893021041, below there are examples of how to get the information of this product.

#### Implementation with SDKs  

**Java**

To get the information related to this product you can use the `com.plenigo.sdk.services.ProductService#getProductData` method, which requires the product id and returns a com.plenigo.sdk.models.ProductData object:

```java
String productId = "QFURxFv0098893021041";
ProductData productData = ProductService.getProductData(productId);
//do something with the product data object
```

**PHP**

To get the information related to this product you can use the `\plenigo\services\ProductService::getProductData` method, which requires the product id and returns a \plenigo\models\ProductData object.

```php
<?php
$productId = "QFURxFv0098893021041";
$productData = ProductService::getProductData(productId);
//do something with the product data object
```
#### Implementation without SDKs 

Another possibility to get product information - can be a direct call to our REST API:

* [Get product information request](https://api.plenigo.com/#!/product/getProduct)

### Get product list

In order to list all products for a company, you can call the product listing service. It will return a paginated list of products (id, name, description) and allows to query the page you request by using the size parameter and the last ID of the previous record set (optional).

#### Implementation with SDKs  

**Java**

To get the information of the products you can use the `com.plenigo.sdk.services.ProductService#getProductList` method, which requires the page size and an optional last id and returns a list as shown below

```java
int pageSize = 10; // range from 10...100
PagedList<ProductInfo> productList = ProductService.getProductList(pageSize, null); 
// null last ID means to query the first page
```

**PHP**

For PHP integration you can use the `\plenigo\services\UserService::hasBoughtProductWithProducts` method for this purpose:
 
```php
<?php
$listUserBought = \plenigo\services\UserService::getProductsBought();
```

#### Implementation without SDKs 

Another possibility to get product list - can be a direct call to our REST API:

* [Get product list request](https://api.plenigo.com/#!/product/getProductsWithFullDetails)

### Get category information

In order to get category information you need the category ID, you can get it in the category management area of the Frisbii Media website, let's say for example that your category id is QFURxFv0098893021041, below there are examples of how to get the information of this category.

#### Code Examples with SDKs  

```java
```
#### Implementation without SDKs 

Another possibility to get category information - can be a direct call to our REST API:

* [Get category information request](https://api.plenigo.com/#!/category/getCategory)

### Get category list

In order to list all categories for a company, you can call the category listing service. It will return a paginated list of categories (categorytId, name) and allows to query the page you request by using the size parameter and the last ID of the previous record set (optional).

#### Implementation with SDKs  

**Java**

To get the information of the categories you can use the `\plenigo\services\ProductService::getCategoryList` method, which requires the page size and optional last id and returns a list as shown below.

```java
int pageSize = 10; // range from 10...100
PagedList<CategoryInfo> categoryList = ProductService.getCategoryList(pageSize, null); 
// null last ID means to query the first page
```

**PHP**

To get the information of the categories you can use the \plenigo\services\ProductService::getCategoryList method, which requires the page size and page number and returns an associative array as shown below.

```php
<?php
//range from 10...100
$pageSize = 10;// No last ID means to query the first page
$catList = ProductService::getCategoryList($pageSize);
print_r($catList) // should look like this
//Array (
//    [totalElements] => 1
//    [size] => 10
//    [lastId] => "1234"
//    [elements] => Array (
//        [0] => Array (
//            [categoryId] => "1234"
//            [title] => "General Goods"
//        )
//    )
//)
```

#### Implementation without SDKs 

Another possibility to get a category list - can be a direct call to our REST API:

* [Get category list request](https://api.plenigo.com/#!/category/getCategories)


### Is the Paywall enabled

This method allows to check if the entire paywall has been disabled from the Frisbii Media Administration Page. It allows to Quickly bring down all payments for a given Company and is useful for testing and development purposes.


**Java** 

For JAVA you can use the com.`plenigo.sdk.services.UserService#isPaywallEnabled()` method for this purpose:
```java
boolean isPayWallEnabled = UserService.isPaywallEnabled();
```
**PHP**

For PHP you can use the `\plenigo\services\UserService::isPaywallEnabled()` method for this purpose.
```php
<?php
$payWallEnabled = \plenigo\services\UserService::isPaywallEnabled();
```

This returns a boolean that will tell you if the paywall is enabled (true) or not (false).

#### Implementation without SDKs 

Another possibility to check if the paywall is enabled- can be a direct call to our REST API:
 
* [Is paywall enabled request](https://api.s-devops.com/#!/paywall/isPaywallEnabled)
