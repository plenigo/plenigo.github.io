---
layout: default
title: Metered views
permalink: /metered_paywall
---

# Metered views 
Frisbii Media makes it simple to add a paywall to your system. First of all you have to enable the paywall. Therefore you have to login in the merchant backend with your credentials.
Navigate to "Paywall" -> "Settings". Here you must activate the paywall. Furthermore you can disable and enable the paywall with the timing.

## Workflow metered views 

![Metered views](/assets/images/ci/PaywallEnabled .png)

**With SDKs**

(A) + (B): [Java SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled), [PHP SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

**Without Frisbii Media SDKs**

(A) Check with Frisbii Media API -> [Paywall state](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

(B)


### Implementation with SDKs

##### Java

For Java you can use the `com.plenigo.sdk.services.MeterService#hasFreeViews` method for this purpose:

```java
boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader, requestQueryString);
if (hasFreeViews) {
        showArticle();
}
else {
        showPaywall(); 
     }
```

##### PHP

For PHP you can use the `plenigo\services\MeterService::hasFreeViews` method for this purpose:

```php
$freeViews = \plenigo\services\MeterService::hasFreeViews();
if ($freeViews) {
        showArticle();
} 
else {
        showPaywall();
     }
```
### Implementation without Frisbii Media SDKs

If you are using a programming language that is not supported by one of our SDKs you have to do the following steps.

1. Cookie decryption
2. Cookie content

#### Cookie decryption

The metered view cookie is decrypted to prevent easy manipulation. The encryption will not prevent manipulation completely but needs a deeper technical understanding.
The cookie itself is called _plenigo_view_

Base information:

* The decrypted data is formatted the following way {value}\|{value}\|{value}...
* The encryption method used is AES/CTR/NoPadding 128 bit with the following initialization vector: _7a134cc376d05cf6bc116e1e53c8801e_. The encrypted byte string is converted to a hexadecimal string.
* Key for encryption is a MD5 hash of the company id (not the company secret!) that can be retrieved from the company administration area.

Decrypting the cookie works as in the pseudo code below:

```javascript
decrypt("AES", "AES/CTR/NoPadding", Hex.decode(COMPANY_ID_MD5_VALUE), Hex.decode(COOKIE_DATA), Hex.decode(IV_STRING));
```

|Parameters|Description|
|:---------|:----------|
|COMPANY_ID_MD5_VALUE|The MD5 checksum of your company id.|
|COOKIE_DATA|Complete cookie data string.|
|IV_STRING|Always _7a134cc376d05cf6bc116e1e53c8801e_|

#### Cookie content

After decryption the following string will be presented:
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

The idea behind metered view functionality is demonstrated with the following pseudo code example

```javascript
meteredViewInfo = extractMeteredViewCookie();
if (productIsBought)
   showProduct();
else if (meteredViewInfo.isMeteredViewAllowed)
   showProduct();
```

> If there is no plenigo_view cookie available the SDKs should handle it the same way as if metered view is allowed by the user and the counter should start at 0. The Javascript SDK will correct this decision if it is incorrect.

The following checks must be done by the SDKs if there is a cookie set

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
