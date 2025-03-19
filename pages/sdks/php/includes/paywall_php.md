---
layout: default
title: paywall PHP
permalink: /paywall_php
---
# Paywall
Paywalls are systems designed to monetize online and other digital information by preventing visitors from accessing web sites and similar content providers without having a paid subscription.  Online news and sports web sites are the most frequent users of paywalls, with some sites implementing hard paywalls while others deploy soft paywalls. A hard paywall's content restrictions are much more stringent than a soft paywall, allowing either no access or minimal access to free content.  A soft paywall(metered views), on the other hand, provides significant access to free content as a means of encouraging users to subscribe for access to premium content.


You have to choose between three different paywall types:
* [Hide content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)
* [Hide content by default](https://plenigo.github.io/sdks/javascript#hide-content-by-default)
* [Load content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)

## Server side Paywall

**Note: The first thing you have to do is enabling the paywall in the Frisbii Media backend (Paywall->Settings).** 

After you have done this you can continue with the following step.

1. Check if the user has bought product
2. User has bought product -> Show article
3. User has not bought product -> Show paywall 

For PHP integration can use the `\plenigo\services\UserService::hasUserBought` method for this purpose.

```php
<?php
// The_product_id from the Frisbii Media backend.
$productId = 'EgLUrT56328991046641';
// This method returns true if the user has already bought the product.
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
if($hasUserBought) {
    showArticle();
    } else {
        showPaywall();
    }
```

### Use case 
This is a complete example page where you only need to insert your data.

The paywall in this example looks like this:

![Enable paywall](/assets/images/ci/demo_paywall.png)


#### Server logic

**Prerequisites**

The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/configuration_php).

 
```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;


//Configure the PHP SDK: The secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend.
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl", "23NuCmdPoiRRkQiCqP9Q", true);
// The_product_id from the Frisbii Media Backend.
$productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productId);
if ($hasUserBought === FALSE) {
    $product = new ProductBase($productId);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the Frisbii Media
    // site and buy.
    $prodToChkOut = new ProductId($productId);
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

#### Page logic

In the page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"></script>
```
You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 

```html
<script type="application/javascript"src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-disable-metered="true"></script>
```

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).


```php
<!DOCTYPE html>
<html>
<head>
    <title>New York City Reimagines How It Works</title>
    <!-- import the Frisbii Media Javascript SDK -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
            data-disable-metered="true"></script>
</head>
<body>
<?php if (!$hasUserBought) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
    Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from
    Duke University in environmental management.</article>
    <h2>Do you want to read this article ?</h2>
    <span>Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>">Buy now</button>
<?php } else { ?>
    <article>Now Ms. Spaulding is in New York, where she was recently hired by the city's Sanitation Department. Her duties,
    naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
    the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
    added in recent years that are slowly changing the day-to-day face of government service.
    There are now nearly 294,000 full-time city employees, more than at any point in the city's history. The growth
    under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
    every city agency now employs more workers than it did in 2014, when the mayor took office.
    The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
    Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
    pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
<?php } ?>
</body>
</html>
```

## Server Side Metered Paywall
A soft paywall(metered paywall)  provides significant access to free content as a means of encouraging users to subscribe for access to premium content.

**Note: The first thing you have to do is enabling the paywall in the Frisbii Media Backend (Paywall-> Metered Settings).** 

After you have done this you can continue with the following step.

1. Check if the user has free views for the product
2. User has free views -> Show article
3. User has no free views -> Show paywall 

### Workflow metered paywall

![Metered views](/assets/images/ci/PaywallEnabled .png)


The idea behind metered view functionality is demonstrated with the following pseudo code examples.

### PHP

For PHP integration you can use the `\plenigo\services\UserService::hasFreeViews` in order to check if an user has free views.

```php
<?php
$hasFreeViews = \plenigo\services\UserService::hasFreeViews($productId);
if($hasFreeViews) {
    showArticle();
    } else {
        showPaywall();
    }
```

#### Use case 

Use case for implementing Frisbii Media metered paywall.

##### Server logic

The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/sdks/php#configuration).

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;
use plenigo\services\MeterService;

// The secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company(e.g. 23NuCmdPoiRRkQiCqP9Q) id from the Frisbii Media backend.
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl", "23NuCmdPoiRRkQiCqP9Q", true);
// The_product_id from the Frisbii Media Backend.
$productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productId);
$hasFreeViews = MeterService::hasFreeViews();
if (!$hasUserBought || !$hasFreeViews) {
    $product = new ProductBase($productId);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the Frisbii Media
    // site and buy.
    $prodToChkOut = new ProductId($productId);
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

##### Page logic
In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).


```php
<!DOCTYPE html>
<html>
<head>
    <title>New York City Reimagines How It Works</title>
    <!-- import the Frisbii Media Javascript SDK -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js">
    </script>
</head>
<body>
<?php if (!$hasUserBought && !$hasFreeViews) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
        Duke University in environmental management.Now Ms. Spaulding is in New York, where she was recently hired by the city?s Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of the nation?s largest city on its ambitious composting effort.
        In that respect, her job is like thousands of others added in recent years that are slowly changing the day-to-day face of government service. 
    </article>
    <h2>Do you want to read this article ?</h2>
    <span>Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>">Buy now</button>
<?php } else { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
        Duke University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's
        Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
        the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
        added in recent years that are slowly changing the day-to-day face of government service.
        There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
        under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
        every city agency now employs more workers than it did in 2014, when the mayor took office.
        The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
        Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
        pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
<?php } ?>
</body>
</html>
```
### Implementation without Frisbii Media SDK

If you are not able to use one of the existing SDKs you can also implement the metered paywall functionality of the [Frisbii Media API](https://api.plenigo.com) by yourself.

The metered views are counted by the JavaScript SDK and the Frisbii Media System. To block the user on the server side you still have to implement the functionality to show the Paywall if the user has reached his view limit. The exception to this case is if you are using the JavaScript only PayWall.

Preferred way to handle the metered check is via cookie (name: plenigo_view). But the JavaScript SDK also adds a parameter to the URL (meteredLimitReached=true). This parameter prevents the user from blocking cookies and cheat the PayWall this way.

The are 2 things you have to do to implement a metered paywall.

1. Decrypt the cookie
2. Get the cookie content

#### Cookie decryption

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

#### Cookie content

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
