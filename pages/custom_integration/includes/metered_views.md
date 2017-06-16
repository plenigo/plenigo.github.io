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

### Cookie content

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