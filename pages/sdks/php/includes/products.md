### Check if an user has bought a product

To query if an user has bought a product, you must be logged in with plenigo, once you have done this you will have a cookie that contains encrypted data of the user, once you have this

The only thing you have to do is pass the product id to a service method, examples are provided below.

You can use the `\plenigo\services\UserService::hasUserBought` method for this purpose.

```php
<?php
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
```

***
$productId can be an array of several IDs, then the method will return true if ANY of the provided products has been bought 
***

This returns a boolean that will tell you if the user did buy the product(true) or not(false).

***
This will return false too if the cookie has expired.
This will return true always if the Paywall isn't enabled, see below. 
***

### Check if an user has bought a product and get back product information

If you want to detect if a user has bought a product and get detailed information about the product bought you can check it with the method below

You can use the \plenigo\services\UserService::hasBoughtProductWithProducts method for this purpose.

    $accessInformation = \plenigo\services\UserService::hasBoughtProductWithProducts($productId);

***
$productId can be an array of several IDs, then the method will indicate that access is granted if ANY of the provided products has been bought 
***

This returns an array with the following information:

```php
<?php
print_r($accessInformation) // should look like this
//Array (
//    [accessGranted] => true
//    [userProducts] => Array (
//        [0] => Array (
//            [productId] => "QFURxFv0098893021041"
//            [lifeTimeEnd] => "124123412432131"
//        )
//    )
//)
```

The userProducts array contains all products that the user owns and that were in the list of product ids passed to the `\plenigo\services\UserService::hasBoughtProductWithProducts` method.

### Obtain a list of bought products and subscriptions

If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.

The user, company and secret data will be obtained from the current logged in user, and the configured Plenigo SDK

You can use the `\plenigo\services\UserService::getProductsBought()` method for this purpose.

```php
<?php
$listUserBought = \plenigo\services\UserService::getProductsBought();
```

This returns an associative array with two main sub-arrays, "singleProducts" and "subscriptions":

```php
<?php
array (
  singleProducts' => array (
    0 => array(
      'productId' => 'xxxx',
      'title' => 'prod title',
      'buyDate' => 'YYYY-MM-DD HH:mm:ss +0100',
    ),
  ),
  subscriptions => array (
    0 => array(
      'productId' => 'yyyyyy',
      'title' => 'Subscription title',
      'buyDate' => 'YYYY-MM-DD HH:mm:ss +0100',
      'endDate' => 'YYYY-MM-DD HH:mm:ss +0100',
    ),
  ),
)
```

***
This method will respond to the testMode configuration of the SDK
If the user is not found or there is a proble with the user id,  the result will be an empty array.
The error codes include 400 (if company/secret has a problem) and 401 (if paramteres are incorrect).
***

### Is the PayWall enabled

This method allows to check if the entire PayWall has been disabled from the Plenigo Administration Page. It allows to Quickly bring down all payments for a given Company and is useful for testing and development purposes.

You can use the `\plenigo\services\UserService::isPaywallEnabled()` method for this purpose.

```php
<?php
$payWallEnabled = \plenigo\services\UserService::isPaywallEnabled();
```

This returns a boolean that will tell you if the paywall is enabled (true) or not (false).

### Get product information

In order to get product information you need the product ID, you can get it in the product management area of the plenigo website, let's say for example that your product id is QFURxFv0098893021041, below there are examples of how to get the information of this product.

To get the information related to this product you can use the `\plenigo\services\ProductService::getProductData` method, which requires the product id and returns a \plenigo\models\ProductData object.

```php
<?php
$productId = "QFURxFv0098893021041";
$productData = ProductService::getProductData(productId);
//do something with the product data object
```

### Get product list

In order to list all products for a company, you can call the product listing service. It will return a paginated list of products (id, name, description) and allows to query the page you request by using the size parameter.

To get the information of the products you can use the `\plenigo\services\ProductService::getProductList` method, which requires the page size and optional last id and returns an associative array as shown below.

```php
<?php
print_r($productList) // should look like this
//Array (
//    [totalElements] => 1
//    [size] => 10
//    [elements] => Array (
//        [0] => Array (
//            [productId] => "QFURxFv0098893021041"
//            [title] => "Shoes for people"
//            [description] => "This product allows you to acquire shoes for people..."
//            [categoryId] => "categoryId"
//            [images] => Array()
//        )
//    )
//)
```

### Get product detail list

In order to list all products with detailed product information for a company, you can call the product detail listing service. It will return a paginated list of products (id, name, description) and allows to query the page you request by using the size parameter and the last ID of the previous record set (optional).

To get the information of the products you can use the `\plenigo\services\ProductService::getProductListWithDetails` method, which requires the page size and the page number and returns an associative array as shown below.

```php
<?php
print_r($productList) // should look like this
//Array (
//    [totalElements] => 1
//    [size] => 10
//    [elements] => Array (
//        [0] => Array (
//            [productId] => "QFURxFv0098893021041"
//            [title] => "Shoes for people"
//            [description] => "This product allows you to acquire shoes for people..."
//            [categoryId] => "categoryId"
//            [images] => Array()
//            ... additional attributes of the product
//        )
//    )
//)
```

### Get category list

In order to list all categories for a company, you can call the category listing service. It will return a paginated list of categories (categorytId, name) and allows to query the page you request by using the size parameter.

To get the information of the categories you can use the `\plenigo\services\ProductService::getCategoryList` method, which requires the page size and page number and returns an associative array as shown below.

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