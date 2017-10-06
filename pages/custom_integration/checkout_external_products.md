---
layout: default
title: Checkout with external products
permalink: /checkout_external_products
---
# Checkout with external products 
If the product is not managed by the plenigo, you have to specify more information such as tax, description, currency, etc..

It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. 
Plenigo’s checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

## Workflow Checkout with external products 

![Workflow external products ](/assets/images/ci/CheckoutExternProduct.png)

(A) Create plenigo iFrame: If you want to create a registration and login page click the following link -> [Create plenigo iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with plenigo API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)
 
(C) Create plenigo iFrame checkout: If you want create a plenigo iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start plenigo checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

## Checkout with SDKs  

### Java     

By using the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the com.plenigo.sdk.models.Product class with the required information:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| price     | yes     | double         | The price of the product |
| description     | yes     | string         | The description of the product |
| id       | yes   | string        | The id of the product
| currency    | yes     | string         | The currency of the product |
| taxPercentage       | yes   | double        | The tax percentage of the product |

```java
public static void checkoutExternalProducts(BigDecimal price, String description, String id, String currency, BigDecimal taxPercentage) {
    //1.Step: Set product
    Product product = new Product(price, description, id, currency, taxPercentage);
    
    //2.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
    CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
    String snippet = snippetBuilder.build();
}
```
#### Use case Java

Use case for implementing checkout with external managed products.

##### Server logic

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      //We fill the request object with the appropriate get object and we get the Cookie header this way
      String cookieHeader = request.getHeader("Cookie");
      //the product id that the user wants to buy, remember that there are limits for the amount of characters
      String id = request.getParameter("id");
      //we fill the id with the correct product
      String returnPage = "news.jsp";
      //The id must not be empty
      if (id == null || id.trim().isEmpty()) {
          returnPage = "error.jsp";
      }
      //There is a limit for a product id, but the id can be alphanumeric
      if (id != null && id.length() > 20) {
          id = id.substring(0, 19);
      }
      try {
          //This method returns true if the user has already bought the product.
         boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader);
         boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
         //If the user has bought the product or has no more free views, metering should be disabled
         boolean disableMeter = hasBought || !hasFreeViews;
         if (!isNewsPaid) {
              BigDecimal price = 5.00;
              String description = "testDescription";
              String id = "RgKUHT563289910";
              String currency = "USD";
              BigDecimal taxPercentage = 28.00;
              // Here you have to call the checkoutExternalProducts method 
              //Since he has not bought the product, we need to build the checkout snippet so that he can
              //do the flow on the plenigo site and buy
              checkoutExternalProducts(price, description, id, currency, taxPercentage);
              request.setAttribute("checkoutSnippet", snippet);
              //Indicates if the news has been paid
          }
          //The company is required for the javascript SDK
          request.setAttribute("id", id);
          //If he has already bought the product, we do not need to create a checkout snippet, we
          //only need the companyId and an indicator that the product has been already paid
          request.setAttribute("companyId", PlenigoManager.get().getCompanyId());
          request.setAttribute("isPaid", isNewsPaid);
          //We set this for the javascript SDK, in order to disable metering when its not needed.
          request.setAttribute("disableMeter", disableMeter);
      } catch (PlenigoException pe){
          //error handling for PlenigoExceptions
          returnPage = "error.jsp";
      }
      RequestDispatcher rd = request.getRequestDispatcher(returnPage);
      rd.forward(request, response);
  }
}
```

##### Page logic

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>${id}</title>
    <!-- import the Plenigo Javascript SDK -->
    <script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/${companyId}/plenigo_sdk.min.js" data-disable-metered="${disableMeter}"></script>
</head>
<body>
<c:choose>
    //Display all the content if the user paid, else provide a button where the user can start the checkout flow
    <c:when test="${isPaid}">
        <p>This is the news content</p>
    </c:when>
    <c:otherwise>
        <p>Information about message that has to be paid here.</p>
        <button onclick="${checkoutSnippet}">You must buy this news in order to watch the content</button>
    </c:otherwise>
</c:choose>
</body>
</html>
```


### PHP

By using the `\plenigo\builders\CheckoutSnippetBuilder` class, you can create snippets easily by filling out the \plenigo\models\ProductBase` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $id       | yes   | string        | The id of the product
| $productTitle    | yes     | string         | The product title of the product |
| $price       | yes   | double        | The price of the product |
| $currency       | yes   | string        | The currency of the product |

```php
<?php
public static function checkoutExternalProducts($productId, $productTitle, $price, $currency){
    $product = new \plenigo\models\ProductBase($productId, $productTitle, $price, $currency);
    //the custom product can then be configured
    //Type of the product that defines the taxes
    $product->setType(ProductBase::TYPE_EBOOK);
    //creating the checkout snippet for this product
    $checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
    $plenigoCheckoutCode = $checkout->build();
}
```
#### Use case PHP

Use case for implementing checkout with external managed products.

##### Server logic

```php
<?php
//the product id that the user wants to buy, remember that there are
//limits for the amount of characters
$pid = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_ENCODED);
$companyId = PlenigoManager::get()->getCompanyId();
//we fill the id with the correct product
$returnPage = "news.php";
//The id must not be empty
if (is_null($pid) || $pid === FALSE || trim($pid) === '') {
    $returnPage = "error.php";
}
try {
    //This method returns true if the user has already bought the
    //product.
    $isNewsPaid = UserService::hasUserBought($pid);
    if ($isNewsPaid === FALSE) {
        $productId = 'RgKUHT563289910';
        $productTitle = 'testTitle';
        $price = 15.00; //the price of the product 
        $currency = //the currency of the price 
        // Here you have to call the checkoutExternalProducts method 
        //Since he has not bought the product, we need to build the checkout snippet so that he can
        //do the flow on the plenigo site and buy
        checkoutExternalProducts($price, $description, $id, $currency);
    }
}catch(PlenigoException $exc){
    //error handling for PlenigoExceptions
    $returnPage = "error.php";
}
```

##### Page logic

```html
<html>
<head>
    <title><?php echo $pid; ?></title>
    <!-- import the Plenigo Javascript SDK -->
    <script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/<?php echo $companyId; ?>/plenigo_sdk.min.js"></script>
</head>
<body>
    <?php if($isNewsPaid){ ?>
        <p>This is the news content</p>
    <?php }else{ ?>
        <p>Information about message that has to be paid here.</p>
        <button onclick="<?php echo $snippet; ?>">
            You must buy this news in order to watch the content
        </button>
    <?php } ?>
</body>
</html>
```

## Checkout without SDKs

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

## Failed Payments

If you want to create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this:
### Implementation with SDKs

#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the plenigo backend |

```java
//1.Step: Configure the Java SDK
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; //Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; //Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

//2.Step: Create a checkout snippet with a no args build.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String snippet = snippetBuilder.build();
```

#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
//1.Step: Configure the PHP SDK
$companyId = '12NuCmdZUTRRkQiCqP2Q'; //the company id of your specific company 
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; //the secret key of your specific company 
\plenigo\PlenigoManager::configure($secret, $companyId);

//2.Step: Creating special product object for "Failed Payments"
$product = \plenigo\models\ProductBase::buildFailedPaymentProduct();
    
//3.Step: Creating the checkout snippet
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();

//4.Step: Now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```

## Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:

### Implementation with SDKs

#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |

```java
//1.Step: Configure the Java SDK
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; //Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; //Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

//2.Step: Set the external product id
Product product = new Product("RgKUHT563289910");

//3.Step: Set the renewal flag
product.setSubscriptionRenewal(true);

//4.Step: Creating the checkout snippet:The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
String snippet = snippetBuilder.build();
```

#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
//1.Step: Configure the PHP SDK
$companyId = '12NuCmdZUTRRkQiCqP2Q'; //the company id of your specific company 
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; //the secret key of your specific company 
\plenigo\PlenigoManager::configure($secret, $companyId);

//2.Step: Create a Plenigo-managed product
$product = new \plenigo\models\ProductBase('RgKUHT563289910');

//3.Step: Set the subscription renewal flag
$product->setSubscriptionRenewal(true);

//4.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();

//5.Step: Now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```