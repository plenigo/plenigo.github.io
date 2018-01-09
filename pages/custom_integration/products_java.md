---
layout: default
title: products
permalink: /products_java
---

# Products
Here you can get information about the product.
* [Check if an user bought a product ?](https://plenigo.github.io/products_java#check-if-an-user-has-bought-a-product)
* [Get list of bought products and subscriptions ?](https://plenigo.github.io/products_java#obtain-a-list-of-bought-products-and-subscriptions)
* [Get product information?](https://plenigo.github.io/products_java#get-product-information)
* [Get product list ?](https://plenigo.github.io/products_java#get-product-list)
* [Get category list ?](https://plenigo.github.io/products_java#get-category-list)
* [Is paywall enabled ?](https://plenigo.github.io/products_java#is-the-paywall-enabled)

## Check if an user has bought a product

To query if an user has bought a product, you must be logged in with plenigo, once you have done this you will have a cookie that contains encrypted data of the user, once you have this. The only thing you have to do is pass the product id and the cookie header to a service method, examples are provided below. 

###  Java
 
For Java integration you can use the `com.plenigo.sdk.services.UserService#hasUserBought` in order to check if an user has bought a product.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the plenigo backend |
| cookieHeader     | yes     | string         | The cookie  header |


```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company. 
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2. Step: Get the product id from the plenigo backend.
// We fill the request object with the appropriate get object and we get the Cookie header this way.
javax.servlet.http.HttpServletRequest request = null;
String productId = "aitnVIz1503443609941";
String cookieHeader = request.getHeader("Cookie");

// 3.Step: This returns a boolean that will tell you if the user did buy the product(true) or not (false).
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
```
This will return false too if the cookie has expired. This will return true always if the Paywall isn’t enabled, see below. 

#### Use case

Use case for checking if a user has bought a product. Therefore you need the product id. This use case is made with the Spring MVC.


#### Server logic
In order to check if an user has bought a product you have to do some prerequisites. 

**Prerequisites**
1. Configure the [Java SDK](https://plenigo.github.io/sdks/java#configuration).
2. Create a product in the plenigo backend. In every checkout you need the id for the corresponding product.


```java
@Controller
public class Paywall {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }
    
    public void handlePaywall(HttpServletRequest request, Model model) throws PlenigoException, InvalidDataException {
        String cookieHeader = request.getHeader("Cookie");
        boolean isHasUserBought;
        // 2.Step: The product id  from the plenigo backend.
        String productId = "aitnVIz1503443609941";
        // 3.Step: This method returns true if the user has already bought the product.
        isHasUserBought = UserService.hasUserBought(productId, cookieHeader);
        model.addAttribute("showPaywall", false);
        if (!isHasUserBought) {
            Product product = new Product(productId);
            // Since he has not bought the product, we need to build the
            // checkout snippet so that he can do the flow on the plenigo
            // site and buy.
            CheckoutSnippetBuilder builder = new CheckoutSnippetBuilder(product);
            String checkoutCode = builder.build();
            model.addAttribute("checkoutCode", checkoutCode);
            model.addAttribute("showPaywall", true);
        }
    }
}
```
#### Page logic


In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

```html
<!DOCTYPE html>
<html>
   <!--import the Plenigo Javascript SDK
      Let's use concrete values:
      company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
   -->
   <head>
      <title> The title of the article </title>
      <script type="application/javascript"
         src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
      </script>
   </head>
   <body>
      <p> The description of your product.
      </p>
      <#if showPaywall>
      <button onclick="${checkoutCode}">Buy now</button>
      <#else>
      <p> Thank you for your order.  </p>
   </body>
</html>
```

###  Implementation without plenigo SDK

Another possiblity to check if the user has bought the product - can be a direct call to our REST API:
[Has user bought request](https://api.plenigo.com/#!/user/hasBoughtProduct)

##  Obtain a list of bought products and subscriptions

If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.
The user, company and secret data will be obtained from the current logged in user, and the configured Plenigo SDK.

### Java 
For Java integration you can use the `com.plenigo.sdk.services.UserService#getProductsBought` method in order to get an obtain list of bought products and subscriptions.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| cookieHeader     | yes     | string         | The cookie  header |

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj";  // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q";  // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Get the list of bought products and subscriptions.
// We fill the request object with the appropriate get object and we get the Cookie header this way.
javax.servlet.http.HttpServletRequest request = null;
String cookieHeader = request.getHeader("Cookie");

// This method returns a com.plenigo.sdk.models.ProductsBought object with the required data.
ProductsBought productsBought = UserService.getProductsBought(cookieHeader);
```

The returned  ProductData object look like this example:

```text
{
  "subscriptions": [
    {
      "productId": "RgKUHT56328991046641",
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


###  Implementation without plenigo SDK

Another possibility to check if the user has bought products - can be a direct call to our REST API:
[Has user bought products and subscriptions request](https://api.plenigo.com/#!/user/hasBoughtProduct)

##  Is the Paywall enabled 

If you want to know if your paywall is enabled you can have a look at the plenigo backend.

![Enable paywall](/assets/images/ci/paywall.png)

### Java

For Java integration you can use the `com.plenigo.sdk.services.UserService#isPaywallEnabled()` method in order to check if the paywall is enabled.

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q";// The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2. Check if the paywall is enabled.
// This method returns true if the paywall is enabeld otherwise it will return false.
boolean isPayWallEnabled = UserService.isPaywallEnabled();
```

## Get product information

In order to get product information you can call the product listing service.

###  Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService#getProductData` method in order to get product information.
|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         |  The product id from the plenigo backend  |

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The company ID of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The secret key of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Get product information.
String productId = "aitnVIz1503443609941"; // The product id from the plenigo backend.
// This method returns a com.plenigo.sdk.models.ProductsBought object with the required data.
ProductData productData = ProductService.getProductData(productId);
// The title of the product.
String title = productData.getTitle();
// The id of the product.
String id = productData.getId();
// The price of the product.
double price = productData.getPrice();
// The currency of the country.
String currency = productData.getCurrency();
```

The returned  ProductData object look like this example:
```text
  ProductData:
  title: Test Product
  id: RgKUHT78563991046641
  price: 18,99 EUR
```



### Implementation without plenigo SDK

Another possibility to get product information - can be a direct call to our REST API: [Get product information request](https://api.plenigo.com/#!/product/getProduct)

##  Get product list

In order to list all products for a company, you can call the product listing service.

###  Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService#getProductList` method in order to get a product list.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |
| page     | yes     | string         | The page number |

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company id of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Get a product list 
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
### Implementation without plenigo SDK

Another possibility to get product list - can be a direct call to our REST API:

* [Get product list request](https://api.plenigo.com/#!/product/getProductsWithFullDetails)

## Get category list

In order to list all categories for a company, you can call the category listing service.

### Java

For Java integration you can use the `com.plenigo.sdk.services.ProductService:getCategoryList` in order to get a category list.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| pageSize     | yes     | string         | The size of the page |
| page     | yes     | string         | The page number |

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj"; // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company id of your specific your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Get category list
int pageSize = 10; // range from 10...100.
int page = 0;
// This method returns a list of CategoryInfo objects (productId, title, description).
PagedList<CategoryInfo> categoryList = ProductService.getCategoryList(pageSize, page); 

```
The returned  ProductData object look like this example:

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
The category ids in the plenigo backend looks like this example:
![Enable paywall](/assets/images/ci/category.png)


### Implementation without plenigo SDK

Another possibility to get a category list - can be a direct call to our REST API: [Get category list request](https://api.plenigo.com/#!/category/getCategories)