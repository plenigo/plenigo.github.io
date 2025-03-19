### Check if an user has bought a product

To query if an user has bought a product, you must be logged in with Frisbii Media, once you have done this you will have a cookie that contains encrypted data of the user, once you have this

The only thing you have to do is pass the product id and the cookie header to a service method, examples are provided below.

You can use the `com.plenigo.sdk.services.UserService#hasUserBought` method for this purpose:

```java
javax.servlet.http.HttpServletRequest request = null;
//We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
String productId = "prod-id";
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
```
***
productId can be a list of several IDs, then the method will return true if ANY of the provided products has been bought 
***

This returns a boolean that will tell you if the user did buy the product(true) or not(false).

***
This will return false too if the cookie has expired.
This will return true always if the Paywall isn't enabled, see below. 
***

### Obtain a list of bought products and subscriptions
If you wish to show a listing of bought products (limited to your company's products and subscriptions) to the user or you want to cache the products into your system this method will come handy.

The user, company and secret data will be obtained from the current logged in user, and the configured Frisbii Media SDK

You can use the `com.plenigo.sdk.services.UserService#getProductsBought` method for this purpose.

```java
javax.servlet.http.HttpServletRequest request = null;
//We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
ProductsBought productsBought = instance.getProductsBought(PLENIGO_USER_SAMPLE_COOKIE);
```

This returns a `com.plenigo.sdk.models.ProductsBought` object with the required data.

***
This method will respond to the testMode configuration of the SDK
If the user is not found or there is a proble with the user id,  the result will be an empty object.
The error codes include 400 (if company/secret has a problem) and 401 (if paramteres are incorrect).
***

### Is the Paywall enabled

This method allows to check if the entire paywall has been disabled from the Frisbii Media Administration Page. It allows to Quickly bring down all payments for a given Company and is useful for testing and development purposes.

You can use the com.`plenigo.sdk.services.UserService#isPaywallEnabled()` method for this purpose:

```java
boolean isPayWallEnabled = UserService.isPaywallEnabled();
```

This returns a boolean that will tell you if the paywall is enabled (true) or not (false).

### Get product information

In order to get product information you need the product ID, you can get it in the product management area of the Frisbii Media website, let's say for example that your product id is QFURxFv0098893021041, below there are examples of how to get the information of this product.

To get the information related to this product you can use the `com.plenigo.sdk.services.ProductService#getProductData` method, which requires the product id and returns a com.plenigo.sdk.models.ProductData object:

```java
String productId = "QFURxFv0098893021041";
ProductData productData = ProductService.getProductData(productId);
//do something with the product data object
```

### Get product list

In order to list all products for a company, you can call the product listing service. It will return a paginated list of products (id, name, description) and allows to query the page you request by using the size parameter and the last ID of the previous record set (optional).

To get the information of the products you can use the `com.plenigo.sdk.services.ProductService#getProductList` method, which requires the page size and an optional last id and returns a list as shown below

```java
int pageSize = 10; // range from 10...100
PagedList<ProductInfo> productList = ProductService.getProductList(pageSize, null); // null last ID means to query the first page
```

### Get category list

In order to list all categories for a company, you can call the category listing service. It will return a paginated list of categories (categoryId, name) and allows to query the page you request by using the size parameter and the last ID of the previous record set (optional).

To get the information of the categories you can use the `com.plenigo.sdk.services.ProductService#getCategoryList` method, which requires the page size and optional last id and returns a list as shown below.

```java
int pageSize = 10; // range from 10...100
PagedList<CategoryInfo> categoryList = ProductService.getCategoryList(pageSize, null); 
// null last ID means to query the first page
```
