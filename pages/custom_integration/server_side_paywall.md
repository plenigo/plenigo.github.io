---
layout: default
title: server side paywall metered paywall
permalink: /server_side_paywall
---
# Server Side Paywall

The first thing you have to do is enabling the paywall in the Frisbii Media backend (Paywall->Settings).
After you have done this you can continue with the following step.

1. Check if the user has bought product
2. User has bought product -> Show article
3. User has not bought product -> Show paywall 

## Implementation with SDKs

### Java

You can use the `com.plenigo.sdk.services.UserService#hasUserBought` method for this purpose:
```java
String cookieHeader = request.getHeader("Cookie");
// Replaxe my_product_id with the product id from the Frisbii Media backend
String productId = "my_product_id";
// This method returns true if the user has already bought the product.
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
if (hasUserBought) {
    showArticle();
} else {
    showPaywall();
}
```

#### Use case Java

Use case for implementing Frisbii Media paywall.

##### Server logic

```java
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //We fill the request object with the appropriate get object and we get the Cookie header this way
    String cookieHeader = request.getHeader("Cookie");
    //the product id that the user wants to buy, remember that there are limits for the amount of characters
    String productId = "my_product_id"; 
    //we fill the id with the correct product
    String returnPage = "news.jsp";    
    //This method returns true if the user has already bought the product.
    boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
    if (!isNewsPaid) {
    Product prodToChkOut = new Product(productId);
    //Since he has not bought the product, we need to build the checkout snippet so that he can
    //do the flow on the Frisbii Media site and buy
    String snippet = new CheckoutSnippetBuilder(prodToChkOut).build();
    //Set all the attributes that you are going to need, the snippet is a url that opens a dialog
    //initiating the checkout process
    request.setAttribute("checkoutSnippet", snippet);
    }
    //The company is required for the javascript SDK
    request.setAttribute("id", productId);
    //If he has already bought the product, we do not need to create a checkout snippet, we
    //only need the companyId and an indicator that the product has been already paid
    request.setAttribute("companyId", PlenigoManager.get().getCompanyId());
    request.setAttribute("isPaid", isNewsPaid);
    RequestDispatcher rd = request.getRequestDispatcher(returnPage);
    rd.forward(request, response);
}
```

##### Page logic
```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>${id}</title>
    <!-- import the Frisbii Media Javascript SDK -->
    <script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/${companyId}/plenigo_sdk.min.js" data-disable-metered="true"></script>
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

You can use the `\plenigo\services\UserService::hasUserBought` method for this purpose.


```php
<?php
// This method returns true if the user has already bought the product.
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
if($hasUserBought) {
    showArticle();
    } else {
        showPaywall();
    }
```


#### Use case PHP

Use case for implementing Frisbii Media paywall.


##### Server logic

```php
<?php
      // Replace my_product_id with the product it from the Frisbii Media backend  
      $productId ="my_product_id";
      $returnPage = "news.php";
      //This method returns true if the user has already bought the
      //product
      $isNewsPaid = UserService::hasUserBought($productId);
      if ($isNewsPaid === FALSE) {
      $product = new \plenigo\models\ProductBase($productId);
      //Since he has not bought the product, we need to build the
      //checkout snippet so that he can do the flow on the Frisbii Media
      //site and buy
       $snippet = new CheckoutSnippetBuilder($prodToChkOut)->build();
      }
```

##### Page logic

```html
<html>
<head>
    <title><?php echo $pid; ?></title>
    <!-- import the Frisbii Media Javascript SDK -->
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
## Implementation without SDKs

If you are not able to use one of the existing SDKs you can also implement the paywall functionality of the [Frisbii Media API](https://api.plenigo.com) by yourself.

* [Enable paywall request](https://api.plenigo.com/#!/paywall/isPaywallEnabled)



