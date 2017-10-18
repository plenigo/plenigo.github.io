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

## Workflow Checkout with plenigo managed products 

![General Workflow Checkout with  plenigo managed products](/assets/images/ci/Checkout .png)

(A) Create plenigo iFrame: If you want to create a registration and login page click the following link -> [Create plenigo iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with plenigo API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)

(C) optional: Create product page with the help of plenigo product management: If you want to create a product page with the help of plenigo click the following link -> [Create product Page ](https://api.plenigo.com/#!/product/getProduct)
 
(D) Create plenigo iFrame checkout: If you want create a plenigo iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start plenigo checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)
                                    
## Checkout with SDKs  

### Java     

For Java integration you can use  the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `com.plenigo.sdk.models.Product` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the plenigo backend |

```java
public static void checkoutPlenigoManagedProducts(String productId) {
    // 1.Step: The product id from the plenigo backend.
    Product product = new Product(productId);
    
    // 2.Step: Creating the checkout snippet for this product. The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
    CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
    String snippet = snippetBuilder.build();
}
```
#### Use case Java

Use case for implementing checkout with plenigo managed products.

##### Server logic

```java
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // We fill the request object with the appropriate get object and we get the Cookie header this way.
        String cookieHeader = request.getHeader("Cookie");
        // The product id from the plenigo backend.
        String productId = "RgKUHT78563989856641";
        // This method returns true if the user has free views.
        try {
            boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader);
            // This method returns true if the user has already bought the product.
            boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
            String returnPage = "news.jsp";
            // If the user has bought the product or has no more free views, metering should be disabled.
            boolean disableMeter = hasBought || !hasFreeViews;
            if (!isNewsPaid) {
                // Here you have to call the checkoutExternalProducts method. 
                checkoutPlenigoManagedProducts(productId)
                // Set all the attributes that you are going to need, the snippet is a url that opens a dialog.
                // Initiating the checkout process.
                request.setAttribute("checkoutSnippet", snippet);
            }
            // The company id is required for the javascript SDK.
            request.setAttribute("id", productId);
            // If he has already bought the product, we do not need to create a checkout snippet, we
            // only need the companyId and an indicator that the product has been already paid.
            request.setAttribute("companyId", PlenigoManager.get().getCompanyId());
            request.setAttribute("isPaid", isNewsPaid);
        } catch (PlenigoException pe) {
            // Error handling for PlenigoException.
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

For PHP integration you can use the `\plenigo\builders\CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `\plenigo\models\ProductBase` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |

```php
<?php
    public static function checkoutPlenigoManagedProducts($productId) {
        // 1.Step: The product if from the plenigo backend.
        $product = new \plenigo\models\ProductBase($productId);

        // 2.Step: Creating the checkout snippet for this product. The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
        $checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
        $plenigoCheckoutCode = $checkout -> build();
    }
```
#### Use case PHP

##### Server logic

```php
<?php
$pid = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_ENCODED);
$companyId = PlenigoManager::get()->getCompanyId();
// We fill the id with the correct product id from the plenigo backend.
$returnPage = "news.php";
try
    {
        // This method returns true if the user has already bought the product.
        $isNewsPaid = UserService::hasUserBought ($pid);
        if ($isNewsPaid === FALSE) {
            $productId = 'RgKUHT78563989856641';
            // Here you have to call the checkoutExternalProducts method. 
            // Since he has not bought the product, we need to build the checkout snippet so that he can
            // do the flow on the plenigo site and buy.
            checkoutPlenigoManagedProducts($productId);
        }
    } catch(PlenigoException $exc)
    {
        // Error handling for PlenigoExceptions.
        $returnPage = "error.php";
    }
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

If you want to create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this.

### Implementation with SDKs

#### Java

For Java integration you can use  the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class.

```java
// 1.Step: Configure the Java SDK
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Just create a checkout snippet with a no args build. The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String snippet = snippetBuilder.build();
```

#### PHP

```php
<?php
// 1.Step: Configure the PHP SDK.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company. 
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Creating special product object for "Failed Payments".
$product = \plenigo\models\ProductBase::buildFailedPaymentProduct();

// 3.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();

// 4.Step: Now we can use this snippet in a link or button.
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```


## Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:

### Implementation with SDKs

#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the plenigo backend |


```java
// 1.Step: Configure the Java SDK.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: The product id of the product.
Product product = new Product("RgKUHT78563989856641");

// 3.Step: Set the renewal flag.
product.setSubscriptionRenewal(true);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
String snippet = snippetBuilder.build();
```

#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id from the plenigo backend |

```php
<?php
// 1.Step: Configure the PHP SDK.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // Replace this with your company id from the plenigo backend.
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; // Replace this with your secret from the plenigo backend. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Set the product id.
$productId = 'RgKUHT78563989856641';
$product = new \plenigo\models\ProductBase($productId);

// 3.Step: Set the subscription renewal flag.
$product->setSubscriptionRenewal(true);

// 4.Step_ Creating the checkout snippet for this product.
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();

// 5.Step: Now we can use this snippet in a link or button.
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```

## Override product price

This is used when you want to replace the regular price of a plenigo managed product for another one of your liking:

### Implementation with SDKs

#### Java 

```java
// 1.Step: Configure the Java SDK.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: The product id of the product from the plenigo backend.
String productId = "RgKUHT78563989856641";

// 3.Step: The price of the product.
double price = 25.00; 
Product product = new Product(productId, price);

// 4.Step: Set the override mode.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product).withOverrideMode();
String snippet = snippetBuilder.build();
```
#### PHP

```
fehlt
```
## Login Token

This is used when you want to provide access a specific user that he can do a checkout.

### Implementation with SDKs

#### Java

```java
// 1.Step: Configure the Java SDK.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );


// 2.Step: Set the product id.
Product product = new Product("RgKUHT78563989856641"); // Replace this with the product from the plenigo backend.

// 3.Step: Register an user and create a login token to use in the checkout.
String userId = UserManagementService.registerUser("email@example.com");
String loginToken = UserManagementService.createLoginToken(userId);

// 4.Step: Add the login token to the checkout snippet builder.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
snippetBuilder.withLoginToken(loginToken);
```

## Using CSRF Token

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.TokenService#createCsrfToken()` method to generate a token.

```java
// 1.Step: Configure the Java SDK.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step : Generate a random CSRF token.
String csrfToken = TokenService.createCsrfToken();

// 3.Step: Create and Configure the snipped builder.
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String snippet = snippetBuilder.withCSRFToken(csrfToken).build(); 
```

#### PHP

```php
<?php
// 1.Step: Configure the PHP SDK.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // Replace this with your company id from the plenigo backend.
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; // Replace this with your secret from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: The product id of the product from the plenigo backend.
$product = new \plenigo\models\ProductBase('RgKUHT78563989856641');

// 3.Step: Generate a random CSRF Token.
$csrfToken = TokenService::createCsrfToken();

// 4.Step: Create and Configure the snippet builder.
$builder = new CheckoutSnippetBuilder($product);
$snippet = $builder->build(array('csrfToken'=>$csrfToken));

// 5.Step: Now we can use this snippet in a link or button.
echo '<a href="#" onclick="'.$snippet.'return false;">Buy this Product</a>'; 
```

## Checkout combined with OAUTH2

### Implementation with SDKs

#### Java

```java
// 1.Step: Configure the Java SDK.
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; // Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; // Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Create a plenigo managed product.
Product product = new Product("RgKUHT78563989856641"); // Replace this with the product id from the plenigo backend.
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);

// 3.Step: Generate a random CSRF Token.
String csrfToken = TokenService.createCsrfToken();

// 4.Step: Adding URL (Thismust be registered within plenigo prior to being used.)
String redirectUrl = "http//thisisanexample.com";

// 5.Step: The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.withCSRFToken(csrfToken).withSSO(redirectUrl).build();
```

#### PHP

```php
<?php
// 1.Step: Configure the PHP SDK.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // Replace this with your company id from the plenigo backend.
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; // Replace this with your secret from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Create a plenigo managed product.
$product = new \plenigo\models\ProductBase('RgKUHT78563989856641'); // Replace this with the product id from the plenigo backend.

// 3.Step: Generate a random CSRF Token.
$csrfToken = TokenService::createCsrfToken();

// 4.Step: Create and Configure the snippet builder.
$builder = new CheckoutSnippetBuilder($product);

// 5.Step: Adding an OAUTH2 redirect URL.
$snippet = $builder->build(array('csrfToken'=>$csrfToken, 'oauth2RedirectUrl'=>'http//thisisanexample.com'));

// 6.Step: Now we can use this snippets in a link or button.
echo '<a href="#" onclick="'.$snippet.'return false;">Buy this Product</a>';
```