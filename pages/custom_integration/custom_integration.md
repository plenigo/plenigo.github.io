---
layout: default
title: plenigo custom integration
permalink: /custom_integration
---

# plenigo custom integration

If you are not able to use one of the existing SDKs you can also implement the functionality of the [plenigo API](https://api.plenigo.com) by yourself.

There are some additional things you have to implement besides the API to use the full feature set of plenigo.

## Metered Views

The metered views are counted by the JavaScript SDK and the plenigo system. To block the user on the server side you still have to implement the functionality
to show the PayWall if the user has reached his view limit. The exception to this case is if you are using the JavaScript only PayWall.

Preferred way to handle the metered check is via cookie (name: _plenigo_view_). But the JavaScript SDK also adds an parameter to the URL (_meteredLimitReached=true_).
This parameter prevents the user from blocking cookies and cheat the PayWall this way.

You can only implement the URL parameter variant, but the cookie variant enables you to get additional information over the user.

### Cookie encryption

The metered view cookie is encrypted to prevent easy manipulation. The encryption will not prevent manipulation completely but needs a deeper technical understanding.
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

### Encrypted checkout string

The [checkout functionality of the JavaScript-SDK](/sdks/javascript#checkout---start-a-plenigo-checkout) request an encrypted and signed string as `paymentData` value.
This string can be received from the product management page of the plenigo merchant backend or be generated on the fly. The encrypted string itself can handle
different configurations so it is suggested to generate it on the server side.

Base information:

* Decrypted data is formatted the following way {key}=>{value}&{key}=>{value}&{key}=>{value}...
* The key to use for encryption is the MD5 hash of your company secret from the plenigo merchant backend.
* Encryption method to use is AES/CTR/NoPadding 128 bit. The encrypted byte string is converted to a hexadecimal string
* Initialization vector to use is 16 bit long and converted to a hexadecimal string
* Add the initialization vector hexadecimal string to the end of the encrypted data hexadecimal string (Hex.encode(encryptedData) + Hex.encode(iv))
* Create a HmacSHA256 checksum of the concatenated string and add it to the end of the string separated by a dot (.). The secret key to use is your company secret from the plenigo merchant backend.

The encrypted payment data can include the following parameter. The mandatory parameters change if the plenigo is managed by the plenigo backend or
if you create a product dynamically on the fly by every checkout. Non plenigo managed products can only be one time purchases. Subscriptions must be
managed over the plenigo merchant backend.

1. Parameters plenigo managed product:

    |Parameter|Mandatory|Description|
    |:--------|:--------|:----------|
    |pi|Yes|plenigo product id of the product in the plenigo merchant backend|
    |ts|Yes|flag indicating if checkout should run in test mode, must be `true` or `false`|
    |pr|No|Price of the product (only usable for single purchases, not for subscriptions)|
    |cu|No|Currency identifier - ISO 4217 (only usable for single purchases, not for subscriptions)|
    |pt|No|Type identifier that indicates the type of the product - Important for tax rates (available values below)|
    |ti|No|Title to overwrite product title with|
    |ci|No|plenigo category id of the category in the plenigo merchant backend to provide additional settings to the product|
    |sso|No|OAuth2 redirect url if OAuth2 should be used|
    |csrf|No|OAuth2 csrf token|
    |rs|No|Flag indicating if the checkout is for a product renewal - necessary for payment methods that don't support auto recurring e.g. SOFORT-Überweisung (only usable for subscription products)|
    |fp|No|Flag indicating if the checkout should be a failed payment checkout process that allows the user to close his open debts|
    |sc|No|Shipping costs (only usable for single purchases, not for subscriptions)|
    |om|No|Flag indicating if you want to use a plenigo managed product but still want to overwrite the price, the title, and the product id - the plenigo product only delivers the base information that are going to be overwritten dynamically|
    |pir|No|Product id to overwrite the plenigo product id with. Only usable in combination with the `om`-Flag|
    |si|No|Unique id of the price segment to use - the price segment passed here will be used no matter of user country or anything else|
    |pa|No|Flag indicating if the customers billing address should be pre filled with the name and first name saved by the personal user data|
2. Parameters foreign product:

    |Parameter|Mandatory|Description|
    |:--------|:--------|:----------|
    |pi|Yes|Your unique product id for this product|
    |ts|Yes|flag indicating if checkout should run in test mode, must be `true` or `false`|
    |pr|Yes|Price of the product|
    |cu|Yes|Currency identifier - ISO 4217|
    |pt|Yes|Type identifier that indicates the type of the product - Important for tax rates (available values below)|
    |ti|Yes|Product title|
    |ci|No|plenigo category id of the category in the plenigo merchant backend to provide additional settings to the product|
    |sso|No|OAuth2 redirect url if OAuth2 should be used|
    |csrf|No|OAuth2 csrf token|
    |sc|No|Shipping costs|
    |pa|No|Flag indicating if the customers billing address should be pre filled with the name and first name saved by the personal user data|
    
Available product type identifier:

* `EBOOK`
* `DIGITALNEWSPAPER`
* `DOWNLOAD`
* `VIDEO`
* `MUSIC`
* `DIGITALPRODUCT`
* `BOOK`
* `NEWSPAPER`
* `SHIPPINGCOSTS`
* `MEMBERSHIP`