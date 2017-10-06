---
layout: default
title: server side paywall
permalink: /server_side_metered_paywall
---
# Server Side Metered Paywall

The first thing you have to do is enabling the metered paywall in the plenigo backend (Paywall-> Metered Settings).
After you have done this you can continue with the following step.

1. Check if the user has free views for the product
2. User has free views -> Show article
3. User has no free views -> Show paywall 

## Workflow metered views

![Metered views](/assets/images/ci/PaywallEnabled .png)

With SDKS

(A) + (B): [Java SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled), [PHP SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

Without plenigo SDKS

(A) + (B): [Implementation without SDKs](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

## Implementation with SDKs

The idea behind metered view functionality is demonstrated with the following pseudo code examples. If you do not know how to get the product id from the plenigo backend click the following link: [Get product id]()

### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| cookieHeader     | yes     | string         | The cookie header |
| requestQueryString     | yes     | string         | The url query string |

You can use the `com.plenigo.sdk.services.MeterService#hasFreeViews` method for this purpose:
```java
// We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
// Replaxe my_product_id with the product id from the plenigo backend
String productId = "RgKUHT78563989856641";
// This method returns true if the user has free views.
boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader, requestQueryString);
if (hasFreeViews) {
    showArticle();
    } else {
        showPaywall();
    }
```

The method `MeterService.hasFreeViews` returns true if the user has free views otherwise false.

#### Use case Java

Use case for implementing plenigo metered paywall.

##### Server logic


```java
protected void handlePaywall(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    //We fill the request object with the appropriate get object and we get the Cookie header this way
    String cookieHeader = request.getHeader("Cookie");
    // Replace my_product_id with the product it from the plenigo backend  
    String productId = "RgKUHT78563989856641"; 
    //This method returns true if the user has free views.
    boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader);
    //This method returns true if the user has already bought the product.
    boolean isNewsPaid = UserService.hasUserBought(id, cookieHeader);
    String returnPage = "news.jsp";
    //If the user has bought the product or has no more free views, metering should be disabled
    boolean disableMeter = hasBought || !hasFreeViews;
    if (!isNewsPaid) {
    Product prodToChkOut = new Product(productId);
    //Since he has not bought the product, we need to build the checkout snippet so that he can
    //do the flow on the plenigo site and buy
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

You can use the `\plenigo\services\UserService::hasUserBought` method for this purpose.


```php
<?php
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
if($hasUserBought) {
    showArticle();
    } else {
        showPaywall();
    }
```

#### Use case PHP

Use case for implementing plenigo metered paywall.

##### Server logic

```php
<?php
      // Replace my_product_id with the product it from the plenigo backend  
      $productId ="RgKUHT78563989856641";
      $returnPage = "news.php";
      //This method returns true if the user has already bought the
      //product
      $isNewsPaid = UserService::hasUserBought($productId);
      if ($isNewsPaid === FALSE) {
      $product = new \plenigo\models\ProductBase($productId);
      //Since he has not bought the product, we need to build the
      //checkout snippet so that he can do the flow on the plenigo
      //site and buy
       $snippet = new CheckoutSnippetBuilder($prodToChkOut)->build();
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
## Implementation without plenigo SDKs

If you are not able to use one of the existing SDKs you can also implement the metered paywall functionality of the [plenigo API](https://api.plenigo.com) by yourself.

The metered views are counted by the JavaScript SDK and the plenigo System. To block the user on the server side you still have to implement the functionality to show the Paywall if the user has reached his view limit. The exception to this case is if you are using the JavaScript only PayWall.

Preferred way to handle the metered check is via cookie (name: plenig_view). But the JavaScript SDK also adds a parameter to the URL (meteredLimitReached=true). This parameter prevents the user from blocking cookies and cheat the PayWall this way.

The are 2 things you have to do to implement a metered paywall.

1. Decrypt the cookie
2. Get the cookie content

### Cookie decryption

The metered view cookie is encrypted to prevent **easy manipulation**.

The cookie itself is called plenigo_view.

**Base information:**

* The decrypted data is formatted the following way {value}\|{value}\|{value}...
* The encryption method used is AES/CTR/NoPadding 128 bit with the following initialization vector: _7a134cc376d05cf6bc116e1e53c8801e_. The encrypted byte string is converted to a hexadecimal string.
* Key for encryption is a MD5 hash of the company id (not the company secret!) that can be retrieved from the company administration area.

Decrypting the cookie works as in the pseudo code below:


```java
decrypt("AES", "AES/CTR/NoPadding", Hex.decode(COMPANY_ID_MD5_VALUE), Hex.decode(COOKIE_DATA), Hex.decode(IV_STRING));
```

|Parameters|Description|
|:---------|:----------|
|COMPANY_ID_MD5_VALUE|The MD5 checksum of your company id.|
|COOKIE_DATA|Complete cookie data string.|
|IV_STRING|Always _7a134cc376d05cf6bc116e1e53c8801e_|

### Cookie content

After the decryption the following string will be represented:
`browserId|activated|freeViews|viewsTaken|limitReached|countOnlyUniqueViews|ignoreSearchEngines|ignoreSocialMedia|articlesVisited|freeViewsAfterLogin|viewsTakenAfterLogin|limitReachedAfterLogin|startTime|meteredPeriod|startWithFirstDay|cookieCreationTime
The values mentioned above will contain the following information`


|Value|Description|
|:----|:----------|
|browserId|unique browser fingerprint|
|activated|flag indicating if metered view is activated at all|
|freeViews|number of free views allowed|
|viewsTaken|number of free views already taken|
|limitReached|flag indicating if free view limit is reached|
|countOnlyUniqueViews|flag indicating to count only unique views|
|ignoreSearchEngines|flag indicating to ignore search engines|
|ignoreSocialMedia|flag indicating to ignore social media|
|articlesVisited|comma separated list containing the already visited articles (in case of the http-addresses these are the first 8 characters of the MD5 sum of the http-address)|
|freeViewsAfterLogin|free views available after login|
|viewsTakenAfterLogin|free views taken after login|
|limitReachedAfterLogin|flag indicating if limit of free views after login is reached|
|startTime|time of the first page hit|
|meteredPeriod|time period metered view counter is running. Possible values (DAY, WEEK, MONTH, YEAR)|
|startWithFirstDay|flag indicating if metered period starts with first visit or at first day / 0 o'clock, etc.|
|cookieCreationTime|time as long indicating representing cookie creating time|

The idea behind metered view functionality is demonstrated with the following pseudo code example:

```javascript
meteredViewInfo = extractMeteredViewCookie();
if (productIsBought)
   showProduct();
else if (meteredViewInfo.isMeteredViewAllowed)
   showProduct();
```

> If there is no plenigo_view cookie available your code should handle it the same way as if metered view is allowed by the user and the counter should start at 0. The Javascript SDK will correct this decision if it is incorrect.

The following checks must be done  if there is a cookie set:

```javascript
checkCookieValidity = function() {
    if (meteredPeriod == 'DAY' && cookieCreationTimeIsTheDayBefore())
        return false;
    else if (meteredPeriod == 'WEEK' && cookieCreationTimeIsTheWeekBefore())
        return false;
    else if (meteredPeriod == 'MONTH' && cookieCreationTimeIsTheMonthBefore())
        return false;
    else if (meteredPeriod == 'YEAR' && cookieCreationTimeIsTheYearBefore())
        return false;
    else
        return true;
}

if (limitReached && userNotLoggedIn() && checkCookieValidity())
   blockAccess();
else if (limitReachedAfterLogin && userLoggedIn() && checkCookieValidity())
   blockAcccess();

```