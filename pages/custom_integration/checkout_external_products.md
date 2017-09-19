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

If you want to do a checkout with plenigo managed products click the following link : [Checkout with external products ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

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
| $price     | yes     | string         | The price of the product |
| $description     | yes     | string         | The description of the product |
| $id       | yes   | string        | The id of the product


```java
// price of the product, description, id, currency and  the tax percentage (28% in this case) of tax that should be calculated for this product
Product product = new Product(5.00,"Important News 2014","news-2014","USD", 28.00);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
#### Use case Java

Use case for implementing checkout with plenigo managed products.

##### Server logic

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
              //In this example, the product costs 0.99 euros and is a non managed plenigo product
              //The description usually is filled depending on the product, but for simplicity,
              //we will hardcode it
              Product prodToChkOut = new Product(0.99, "Sample news title description", id, "EUR", 0.55);
              //Since he has not bought the product, we need to build the checkout snippet so that he can
              //do the flow on the plenigo site and buy
              String snippet = new CheckoutSnippetBuilder(prodToChkOut).build();
              //Set all the attributes that you are going to need, the snippet is a url that opens a dialog
              //initiating the checkout process
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

By using the `\plenigo\builders\CheckoutSnippetBuilder class, you can create snippets easily by filling out the \plenigo\models\ProductBase` class with the required information.
```php
<?php
//Replace "my_product_id" with the product id from the plenigo backend
$product = new \plenigo\models\ProductBase('my_product_id');

// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick
="'.$plenigoCheckoutCode.'return false;">Buy this Product</a>';
```
#### Use case PHP

##### Server logic

##### Page logic

## Checkout without SDKs

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)


## Failed Payments

If you want to create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this:
### Implementation with SDKs

#### Java

```java
//just create a checkout snippet with a no args build
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### PHP

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


## Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:

### Implementation with SDKs

#### Java
```java
//Replace "my_product_id" with the product id from the plenigo backend
Product product = new Product("my_product_id");
 
//set the renewal flag
product.setSubscriptionRenewal(true);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
 
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### PHP
```php
<?php
// creating a Plenigo-managed product
$product = new \plenigo\models\ProductBase('item-123');
// setting the subscription renewal flag
$product->setSubscriptionRenewal(true);
    
// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```
