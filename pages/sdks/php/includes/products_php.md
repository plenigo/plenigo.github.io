---
layout: default
title: products
permalink: /products_php
---

# Products
Here you can get information about the product.
* [Check if an user bought a product ?](https://plenigo.github.io/products_php#check-if-an-user-has-bought-a-product)
* [Get list of bought products and subscriptions ?](https://plenigo.github.io/products_php#obtain-a-list-of-bought-products-and-subscriptions)
* [Get product information?](https://plenigo.github.io/products_php#get-product-information)
* [Get product list ?](https://plenigo.github.io/products_php#get-product-list)
* [Get category list ?](https://plenigo.github.io/products_php#get-category-list)
* [Is paywall enabled ?](https://plenigo.github.io/products_php#is-the-paywall-enabled)

## Check if an user has bought a product

To query if an user has bought a product, you must be logged in with plenigo, once you have done this you will have a cookie that contains encrypted data of the user, once you have this. The only thing you have to do is pass the product id and the cookie header to a service method, examples are provided below. 

For PHP integration you can use the `\plenigo\services\UserService::hasBoughtProduct` method in order to check if an user has bought a product.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product ID from the plenigo backend |
| $customerId     | yes     | string         | The customer ID you can get from the plenigo backend. |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2. Step: Get the product id from the plenigo backend.
$productId = 'aitnVIz1503443609941';

// This returns a boolean that will tell you if the user did buy the product(true) or not (false).
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
```
"$productId can be an array of several IDs, then the method will return true if any of the provided products has been bought.

This will return false too if the cookie has expired. This will return true always if the Paywall isn’t enabled, see below. 

### Use case
This is an example for using the hasUserBought function. Therefore we use the checkout snippet. The checkout snippets identifies if the user is logged in or not. After the login, we check if the user has bought the product.  

#### Server logic

**Prerequisites**
1. Configure the [PHP SDK](https://plenigo.github.io/configuration_php).
2. Create a product in the plenigo backend. In every checkout you need the ID for the corresponding product.

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\models\ProductBase;
use plenigo\services\UserService;
use plenigo\builders\CheckoutSnippetBuilder;

// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "23NuCmdPoiRRkQiCqP9Q", true);

// 2.Step: Set the product.
// Creating the product ($productId, $productTitle, $price, $currency).
$product = new ProductBase('123456', 'the best product',15.00,'USD');

//  3.Step: Type of the product that defines the taxes.
$product->setType(ProductBase::TYPE_EBOOK);

// 4.Step: This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($product->getId());
if ($hasUserBought === FALSE) {
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the plenigo site and buy.   
$checkout = new CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
}
?>

```

#### Page logic

In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from plenigo:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before). 
  
2. If the user **has bought** the product he will be redirected to the article page. 

   If the user **has not bought** the product a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment was successful the user will be redirect to the article page 


```html
<html>
<head>
    <title> The title of the article </title>
    <!--
        Let's use concrete values:
        company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
    -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
            data-lang="en">
    </script>
</head>
<body>
<?php if (!$hasUserBought) { ?>
    <p> The description of the article </p>
    <button onclick="<?php echo $snippet ?>"> Buy now</button>
<?php } else { ?>
    <p> Thank you for order </p>
<?php } ?>
</body>
</html>
```
###  Implementation without plenigo SDK

Another possiblity to check if the user has bought the product - can be a direct call to our REST API:
[Has user bought request](https://api.plenigo.com/#!/user/hasBoughtProduct)

##  Obtain a list of bought products and subscriptions

If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.
The user, company and secret data will be obtained from the current logged in user, and the configured Plenigo SDK.


For PHP integration can use the `\plenigo\services\UserService::getProductsBought()` in order to get an obtain list of bought products and subscriptions.

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Get the list of bought products and subscriptions.
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

###  Implementation without plenigo SDK

Another possibility to check if the user has bought products - can be a direct call to our REST API:
[Has user bought products and subscriptions request](https://api.plenigo.com/#!/user/hasBoughtProduct)

##  Is the Paywall enabled 

If you want to know if your paywall is enabled you can have a look at the plenigo backend.

![Enable paywall](/assets/images/ci/paywall.png)


For PHP integration you can use the `\plenigo\services\UserService::isPaywallEnabled()`in order to check if the paywall is enabled.

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Check if paywall is enabled.
// This method returns true if the paywall is enabeld otherwise it will return false.
$payWallEnabled = \plenigo\services\UserService::isPaywallEnabled();
```
### Implementation without plenigo SDK

Another possibility to check if the paywall is enabled - is a direct call to our REST API:
[Is the paywall enabeld request](https://api.s-devops.com/#!/paywall/isPaywallEnabledt)

## Get product information

In order to get product information you can call the product listing service.

For PHP integration you can use the `\plenigo\services\ProductService::getProductData` method in order to get product information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         |  The product id from the plenigo backend  |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj';  // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Get product information
$productId = "aitnVIz1503443609941"; // Replace this with the product ID from the plenigo backend.
// This method will return a ProductData object.
$productData = \plenigo\services\ProductService::getProductData(productId);
// The tile of the product.
$title = $productData->getTitle();
// The id of the product
$id = $productData->getId();
// The price of the product
$price = $productData->getPrice();
// The currency of the country.
$currency = $productData->getCurrency();
```

The returned  ProductData object look like this example:
```text
ProductData:
title: Test Product
id: RgKUHT78563989856641
price: 18,99 EUR
```

### Implementation without plenigo SDK

Another possibility to get product information - is a direct call to our REST API: [Get product information request](https://api.plenigo.com/#!/product/getProduct)

##  Get product list

In order to list all products for a company, you can call the product listing service.

For PHP integration you can use the `\plenigo\services\ProductService::getProductList` method in order to get a product list.

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Get a product list.
// This method returns a list of the ProductInfo(productId, title, description).
$productList = \plenigo\services\ProductService::getProductList();
// The ProductInfo objects are equal as in the Java example.
```

### Implementation without plenigo SDK

Another possibility to get product list - is a direct call to our REST API:

* [Get product list request](https://api.plenigo.com/#!/product/getProductsWithFullDetails)

## Get category list

In order to list all categories for a company, you can call the category listing service.


To get information of the categories you can use the `\plenigo\services\ProductService::getCategoryList` in order to get a category list.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company. 
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Get category list
$pageSize = 10;// range from 10...100.
// This method returns a list of CategoryInfo objects (productId, title, description).
$catList = ProductService::getCategoryList($pageSize);
// The CategoryInfo objects are equal as in the Java example .
```

### Implementation without plenigo SDK

Another possibility to get a category list - is a direct call to our REST API: [Get category list request](https://api.plenigo.com/#!/category/getCategories)
