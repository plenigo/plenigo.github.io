The plenigo JavaScript-SDK offers additional functionality in addition to the PayWall functionality. These functions are completely independent from the usage
of the SDK.

If you are using one of the plenigo SDKs you may not need all the functionality because the SDKs may already encapsulate some calls. Please refer to the
according SDK documentation to cover this up.

Functions that are not covered on this page are used by your own risk. Only functions covered here will be supported by plenigo and are guaranteed to live up.
If a function disappears it normally isn't needed anymore and if you are still using it nothing happens. But you could also remove this function. Functions that
must be replaced with other functions are marked as deprecated with an end date mentioned.

### Start - Initialization call

The plenigo JavaScript-SDK initialize itself automatically when it is included in the HTML page after the page is loaded completely. If you are loading the 
Javascript-SDK manually after the page is loaded you need to start the initialization by calling this method.

```javascript
/**
 * Initialize the plenigo JavaScript-SDK.
 */
plenigo.start();
```

### Checkout - Start a plenigo checkout

This function offers the possibility to start a checkout process for the customer including the login and registration process of plenigo.

```javascript
/**
 * Start a checkout process.
 * 
 * @param {object} configuration              
 */
plenigo.checkout(configuration);
```
The following tables describes the configuration object. Non mandatory parameters can be filled with _null_.

|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|paymentData|string|Yes|The encrypted and signed checkout string containing checkout information|
|startWithRegistration|boolean|Yes|Flag indicating if the process should start with the login or the registration screen.|
|sourceUrl|string|No|The source url for the checkout. This is only needed for better analytics.|
|targetUrl|string|No|Url the checkout process should redirect after being finished. If empty it will redirect to the current page.|
|affiliateId|string|No|Id of the affiliate defined in the plenigo backend. The affiliate module must be purchased for this functionality.|
|elementId|string|No|If you want to start the checkout in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|

### Checkout with remote login - Start a plenigo checkout with external user management

This function offers the possibility to start a checkout process for the customer including the login and registration process of plenigo.

```javascript
/**
 * Start checkout process for external managed users.
 * 
 * @param {object} configuration              
 */
plenigo.checkoutWithRemoteLogin(configuration);
```
The following tables describes the configuration object. Non mandatory parameters can be filled with _null_.

|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|paymentData|string|Yes|The encrypted and signed checkout string containing checkout information.|
|loginToken|string|Yes|Login token to verify the user identity.|
|sourceUrl|string|No|The source url for the checkout. This is only needed for better analytics.|
|targetUrl|string|No|Url the checkout process should redirect after being finished. If empty it will redirect to the current page.|
|affiliateId|string|No|Id of the affiliate defined in the plenigo backend. The affiliate module must be purchased for this functionality.|
|elementId|string|No|If you want to start the checkout in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|

### Login - Open the plenigo login window

This function offers the possibility to open up the plenigo login window. It is possible for the user to switch to the registration window if needed.

```javascript
/**
 * Open up login screen.
 * 
 * @param {object} configuration              
 */
plenigo.login(configuration);
```
The following tables describes the configuration object. Non mandatory parameters can be filled with _null_.

|Name|Type|Mandatory|Partner only|Description|
|:---|:---|:--------|:-----------|:----------|
|ssoRedirectURL|string|No|No|Redirect URL for the OAuth2 login process if [OAuth2](https://tools.ietf.org/html/rfc6749) is used.|
|scope|string|No|No|Scope of the [OAuth2](https://tools.ietf.org/html/rfc6749) login process. Currently the only available scope is _profile_|
|state|string|No|No|CSRF token for the [OAuth2](https://tools.ietf.org/html/rfc6749) process to use. This way you can verify the request source.|
|elementId|string|No|No|If you want to start the login in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|
|targetUrl|string|No|No|Url redirect customer to after a successful login process. _Will only be used if ssoRedirectUrl is not set._|
|partnerId|string|No|Yes|Unique partner id|
|origin|string|No|Yes|Origin parameter after a successful login.|
|productIds|string|No|Yes|If set plenigo checks if the customer has bought one of the products passed here. The product ids must be comma separated. A detailed explanation follows bellow.|

If the "productIds" parameter is passed the targetUrl will only be called if the customer has successfully bought a product. Otherwise the user will stay on the current page.
If the user has bought a product the target url will be called with the following additional parameters.
|Name|Description|
|:---|:----------|
|Id|Email address of the user|
|d|Today's date, UTC, in YYYY-MM-DD format|
|r|Always the value "none"|
|c|MD5 Hash of Id, d, r, and the secret of the company the checkout is for| 

### Registration - Open the plenigo registration window

This function offers the possibility to open up the plenigo registration window. It is possible for the user to switch to the login window if needed.

```javascript
/**
 * Open up registration screen.
 * 
 * @param {object} configuration              
 */
plenigo.registration(configuration);
```
The following tables describes the configuration object. Non mandatory parameters can be filled with _null_.

|Name|Type|Mandatory|Partner only|Description|
|:---|:---|:--------|:-----------|:----------|
|ssoRedirectURL|string|No|No|Redirect URL for the OAuth2 login process if [OAuth2](https://tools.ietf.org/html/rfc6749) is used.|
|scope|string|No|No|Scope of the [OAuth2](https://tools.ietf.org/html/rfc6749) login process. Currently the only available scope is _profile_|
|state|string|No|No|CSRF token for the [OAuth2](https://tools.ietf.org/html/rfc6749) process to use. This way you can verify the request source.|
|elementId|string|No|No|If you want to start the login in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|
|targetUrl|string|No|No|Url redirect customer to after a successful login process. _Will only be used if ssoRedirectUrl is not set._|
|partnerId|string|No|Yes|Unique partner id|
|origin|string|No|Yes|Origin parameter after a successful login.|
|productIds|string|No|Yes|If set plenigo checks if the customer has bought one of the products passed here. The product ids must be comma separated. A detailed explanation follows bellow.|

If the "productIds" parameter is passed the targetUrl will only be called if the customer has successfully bought a product. Otherwise the user will stay on the current page.
If the user has bought a product the target url will be called with the following additional parameters.
|Name|Description|
|:---|:----------|
|Id|Email address of the user|
|d|Today's date, UTC, in YYYY-MM-DD format|
|r|Always the value "none"|
|c|MD5 Hash of Id, d, r, and the secret of the company the checkout is for| 

### Logout - Logout the user

This function deletes the user's login cookie. It doesn't have any additional functionality.

```javascript
/**
 * Logout the user.
 * 
 * @param {object} configuration              
 */
plenigo.logout();
```

### Is user logged in - Indicates if the user is currently logged in

This function indicates if the user is logged in.

```javascript
/**
 * Get flag indicating if user is logged in.
 *
 * @returns {*|boolean} true if the user is logged in false otherwise
 */
plenigo.isUserLoggedIn();
```

### Reset layer opened detection - reset detection to prevent double opened login and checkout layers

Reset the detection for preventing double opened login and checkout layers.

```javascript
/**
 * Resets the SDKs detection to prevent double opened login and checkout layers.
 */
plenigo.resetLayerOpenedDetection();
```

### Usage examples

Following are a few examples of the usage for JavaScript-SDK.

#### JavaScript only checkout

The JavaScript only checkout can be used on LandingPages or something similar. This way you can integrate plenigo easily
on pages where you don't have direct control over the server side code execution.

To get a working example you have to replace some variables. Variables to are starting and ending with a dollar sign, e.g.
`$COMPANY_ID$` and described in a comment.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Greatest product ever!</title>
    
        // Replace $COMPANY_ID$ with the company id from the plenigo merchant backend. 
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js"
            data-disable-metered="true">
        </script>
        
        <script type="application/javascript">
            // Replace $CHECKOUT_STRING$ with the checkout string of the product that you can retrieve 
            // from the product overview page in the plenigo backend.
            // Replace $TARGET_URL$ with the url the checkout should redirect after being finished. Could be
            // a thank you page.
            var checkoutConfig = {
                paymentData: "$CHECKOUT_STRING$",
                startWithRegistration: "true",
                sourceUrl: null,
                targetUrl: "$TARGET_URL$",
                affiliateId: null,
                elementId: null
            }
        </script>
    </head>
    <body>
        <h2>The greatest product ever available</h2>
        
        
        <p>
            This is your chance to buy the best product ever available!
            
            <button onclick="plenigo.checkout(checkoutConfig); return false;">
                Buy now
            </button>
        </p>
    </body>
</html>
```