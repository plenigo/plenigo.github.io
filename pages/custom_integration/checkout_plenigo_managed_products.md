---
layout: default
title: Checkout with plenigo managed products
permalink: /checkout_plenigo_managed_products
---
# Checkout with plenigo managed products 
If the product is managed by plenigo and was configured in the plenigo website, only the product id is required for checkout.
If you do not know how to get the product id from the plenigo backend click the following link: [Get product id]()

It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. 
Plenigo’s checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

If you want to do a checkout with external products click the following link : [Checkout with external products ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

## Workflow Checkout with plenigo managed products 

![General Workflow Checkout with  plenigo managed products](/assets/images/ci/Checkout .png)

(A) Create plenigo iFrame: If you want to create a registration and login page click the following link -> [Create plenigo iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with plenigo API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)

(C) optional: Create product page with the help of plenigo product management: If you want to create a product page with the help of plenigo click the following link -> [Create product Page ](https://api.plenigo.com/#!/product/getProduct)
 
(D) Create plenigo iFrame checkout: If you want create a plenigo iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start plenigo checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)
                                    
## Checkout with SDKs  

### Java     

By using the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `com.plenigo.sdk.models.Product` class with the required information:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The [product id]() from the plenigo backend |

```java
public static void checkoutPlenigoManagedProducts(String productId) {
    //The product id from the plenigo backend
    Product product = new Product(productId);
    //Creating the checkout snippet for this product
    CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
    //The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
    String snippet = snippetBuilder.build();
}
```
#### Use case Java

Use case for implementing checkout with plenigo managed products.

##### Server logic

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //We fill the request object with the appropriate get object and we get the Cookie header this way
    String cookieHeader = request.getHeader("Cookie");
    //The product id from the plenigo backend  
    String productId = "RgKUHT78563989856641"; 
    //This method returns true if the user has free views.
    try{ 
        boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader);
        //This method returns true if the user has already bought the product.
        boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
        String returnPage = "news.jsp";
        //If the user has bought the product or has no more free views, metering should be disabled
        boolean disableMeter = hasBought || !hasFreeViews;
            if (!isNewsPaid) {  
            // Here you have to call the checkoutExternalProducts method 
            checkoutPlenigoManagedProducts(productId)
            //Set all the attributes that you are going to need, the snippet is a url that opens a dialog
            //initiating the checkout process
            request.setAttribute("checkoutSnippet", snippet);
         }
    //The company id is required for the javascript SDK
    request.setAttribute("id", productId);
    //If he has already bought the product, we do not need to create a checkout snippet, we
    //only need the companyId and an indicator that the product has been already paid
    request.setAttribute("companyId", PlenigoManager.get().getCompanyId());
    request.setAttribute("isPaid", isNewsPaid);
    } catch (PlenigoException pe) {
        //error handling for PlenigoException
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

By using the `\plenigo\builders\CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `\plenigo\models\ProductBase` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The [product id]() from the plenigo backend |

```php
<?php
public static function checkoutPlenigoManagedProducts ($productId){
    //The product if from the plenigo backend
    $product = new \plenigo\models\ProductBase($productId);
    //Creating the checkout snippet for this product
    $checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
    //The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
    $plenigoCheckoutCode = $checkout->build();
}
```
#### Use case PHP

##### Server logic

```php
<?php
//the product id that the user wants to buy, remember that there are
//limits for the amount of characters
$pid = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_ENCODED);
$companyId = PlenigoManager::get()->getCompanyId();
//we fill the id with the correct product
$returnPage = "news.php";
try {
    //This method returns true if the user has already bought the
    //product.
    $isNewsPaid = UserService::hasUserBought($pid);
    if ($isNewsPaid === FALSE) {
        $productId = 'RgKUHT78563989856641';
        // Here you have to call the checkoutExternalProducts method 
        //Since he has not bought the product, we need to build the checkout snippet so that he can
        //do the flow on the plenigo site and buy
        checkoutPlenigoManagedProducts($productId);
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

```java
//Just create a checkout snippet with a no args build
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### PHP

```php
<?php
//Creating special product object for "Failed Payments"
$product = \plenigo\models\ProductBase::buildFailedPaymentProduct();
//Creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```


## Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:

### Implementation with SDKs

#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The [product id]() from the plenigo backend |


```java
//The product id of the product
Product product = new Product("RgKUHT78563989856641");
//set the renewal flag
product.setSubscriptionRenewal(true);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The [product id]() from the plenigo backend |

```php
<?php
$productId = 'RgKUHT78563989856641';
$product = new \plenigo\models\ProductBase($productId);
// setting the subscription renewal flag
$product->setSubscriptionRenewal(true);
// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```

## Override product price

This is used when you want to replace the regular price of a plenigo managed product for another one of your liking:

### Implementation with SDKs

#### Java 

```java
// The product id of the product
String productId = "RgKUHT78563989856641";
// The price of the product
double price = 25.00; 
Product product = new Product(productId, price);
//set the override mode
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product).withOverrideMode();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
#### PHP

```
fehlt
```
