It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. ***
Frisbii Media’s checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the Frisbii Media backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)


If you want to do a checkout with external products click the following link : [Checkout with external products ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

### Checkout with Frisbii Media managed products
If the product is managed by the Frisbii Media and was configured in the Frisbii Media website, only the product id is required for checkout.

#### General Workflow Checkout with  Frisbii Media managed products 

![General Workflow Checkout with  Frisbii Media managed products](/assets/images/ci/Checkout .png)

(A) Create Frisbii Media iFrame: If you want to create a registration and login page click the following link -> [Create Frisbii Media iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with Frisbii Media API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)

(C) optional: Create product page with the help of Frisbii Media product management: If you want to create a product page with the help of Frisbii Media click the following link -> [Create product Page ](https://api.plenigo.com/#!/product/getProduct)
 
(D) Create Frisbii Media iFrame checkout: If you want create a Frisbii Media iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start Frisbii Media checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

#### Implementation with SDKs  

**Java**     

By using the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the com.plenigo.sdk.models.Product class with the required information:

```java
//Replace "MY_PRODUCT_ID" with the product id from the Frisbii Media backend
Product product = new Product("MY_PRODUCT_ID");
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
**PHP**

By using the `\plenigo\builders\CheckoutSnippetBuilder class, you can create snippets easily by filling out the \plenigo\models\ProductBase` class with the required information.
```php
<?php
//Replace "MY_PRODUCT_ID" with the product id from the Frisbii Media backend
$product = new \plenigo\models\ProductBase('MY_PRODUCT_ID');

// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Buy this Product</a>';
```

#### Implementation without SDKs

Python

Node js


### Checkout with external products

For these products, you have to specify more information such as tax, description, currency, etc. Below there are examples.

#### General Workflow external products


![General Workflow ](/assets/images/ci/CheckoutExternProduct.png)


(A) Create Frisbii Media iFrame: If you want to create a registration and login page click the following link -> [Create Frisbii Media iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with Frisbii Media API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)
 
(C) Create Frisbii Media iFrame checkout: If you want create a Frisbii Media iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start Frisbii Media checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

#### Implementation with SDKs

**Java** 

By using the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the com.plenigo.sdk.models.Product class with the required information:
```java
//Replace "MY_PRODUCT_PRICE", "MY_PRODUCT_ID", MY_CURRENCY,MY_TAX_PERCENTAGE with the real data
Product product = new Product(MY_PRODUCT_PRICE,"description","MY_PRODUCT_ID","MY_CURRENCY", MY_TAX_PERCENTAGE);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

**PHP**

By using the `\plenigo\builders\CheckoutSnippetBuilder class, you can create snippets easily by filling out the \plenigo\models\ProductBase` class with the required information.
```php
<?php
//Replace "MY_PRODUCT_ID", "MY_PRODUCT_TITLE", "MY_PRODUCT_PRICE",m"MY_PRODUCT_CURRENCY" with the real data
//creating the product ($productId, $productTitle, $price, $currency)
$product = new \plenigo\models\ProductBase('MY_PRODUCT_ID', 'MY_PRODUCT_TITLE',MY_PRODUCT_PRICE,'MY_PRODUCT_CURRENCY');
//the custom product can then be configured
//Type of the product that defines the taxes
$product->setType(ProductBase::TYPE_EBOOK);
//creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
//now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Buy this Product</a>';
```

#### Implementation without SDKs

Python

Node js

GO


### Failed Payments

If you want to create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this:
#### Implementation with SDKs

**Java**

```java
//just create a checkout snippet with a no args build
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

**PHP**

```php
<?php
// creating special product object for "Failed Payments"
$product = \plenigo\models\ProductBase::buildFailedPaymentProduct();
    
// creating the checkout snippet
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```


### Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:

#### Implementation with SDKs

**Java**
```java
//Replace "MY_PRODUCT_ID" with the product id from the Frisbii Media backend
Product product = new Product("MY_PRODUCT_ID");
 
//set the renewal flag
product.setSubscriptionRenewal(true);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
 
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

**PHP**
```php
<?php
// creating a Frisbii Media-managed product
$product = new \plenigo\models\ProductBase('item-123');
// setting the subscription renewal flag
$product->setSubscriptionRenewal(true);
    
// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```
