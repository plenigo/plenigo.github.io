---
layout: default
title: Client side JavaScript-SDK
permalink: /sdks/javascript
---

# JavaScript SDK client side integration

The plenigo JavaScript-SDK offers the possibility to implement the plenigo functionality without a need for a server side request. 

## PayWall functionality

If you plan to use the PayWall functionality of plenigo you have to choose between three different use cases:

1. [Hide content afterwards](/sdks/javascript/hide_content_afterwards)

   The content will be visible on the page from the beginning and the plenigo JavaScript-SDK is going to hide it if the user is not allowed to see the content.
   If JavaScript is disabled or the user blocks the plenigo JavaScript-SDK she can access the whole page without any restrictions.
   
2. [Hide content by default](/sdks/javascript/hide_content_by_default)

   The content will be placed in an HTML element that is hidden. After the user was verified to be allowed to see the content the content will be made visible
   by the plenigo JavaScript-SDK. The user is still able to access the content in the HTML sources.
   
3. [Load content afterwards](/sdks/javascript/load_content_afterwards)

   The content to be protected isn't on the site at all. After the user was verified to be allowed to see the content the content will be loaded by another URL.
   If the user disables JavaScript or blocks the plenigo JavaScript-SDK he will not be able to see the content. It is also not visible in the HTML sources.
   
## Snippets functionality

The plenigo JavaScript-SDK offers you the possibility to enable your users to do self management of their user data, orders, subscriptions, etc. This way you
provide a whole backend functionality without great programming efforts. What kind of data the user can see and edit can be freely defined by you. Only show
the snippets you want the user to see. Snippets are only available in embedded mode.

The snippet call expects the following parameters. All these parameters are mandatory.

|Parameter|Type|Description|
|:--------|:-----|:----------|
|elementId|string|The id of the HTML element the snippet should be rendered into.|
|snippetId|There are predefined constants for the different snippets.<br/><br/>Snippets that combine different elements:<br/><ul><li>plenigo.Snippet.PERSONAL_DATA</li><li>plenigo.Snippet.ORDER</li><li>plenigo.Snippet.SUBSCRIPTION</li><li>plenigo.Snippet.PAYMENT_METHODS</li><li>plenigo.Snippet.ADDRESS_DATA</li></ul><br/>Single elements:<br/><ul><li>plenigo.Snippet.BILLING_ADDRESS_DATA</li><li>plenigo.Snippet.DELIVERY_ADDRESS_DATA</li><li>plenigo.Snippet.BANK_ACCOUNT</li><li>plenigo.Snippet.CREDIT_CARD</li><li>plenigo.Snippet.PERSONAL_DATA_SETTINGS</li><li>plenigo.Snippet.PERSONAL_DATA_ADDRESS</li><li>plenigo.Snippet.PERSONAL_DATA_PROTECTION</li><li>plenigo.Snippet.PERSONAL_DATA_SOCIAL_MEDIA</li><li>plenigo.Snippet.PERSONAL_DATA_PASSWORD</li></ul>|The snippet type that should be rendered.|
|loggedOutRedirectUrl|string|It is strongly recommended that you check if a user is logged in before showing a snippet. If you don't do this check the user will be redirected to this URL if the user is not logged in.|
|loginToken|string|string	The login token is the optional fourth parameter. It is only necessary and mandatory if the plenigo user management is not used but an external user management.|

Example snippet for the JavaScript to render a personal data snippet.

```html
<head><script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"></script></head>
<body>
    <div id="plenigoSnippet"></div>

    <!-- End of the HTML body. Not really necessary, but possible -->
    <script type="application/javascript">
        // we render the personal data snippet in this example
        plenigo.renderSnippet("plenigoSnippet", plenigo.Snippet.PERSONAL_DATA, "https://www.YOUR_DOMAIN.com/");
    </script>
</body>
```
   
## General functionality

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

|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|ssoRedirectURL|string|No|Redirect URL for the OAuth2 login process if [OAuth2](https://tools.ietf.org/html/rfc6749) is used.|
|scope|string|No|Scope of the [OAuth2](https://tools.ietf.org/html/rfc6749) login process. Currently the only available scope is _profile_|
|state|string|No|CSRF token for the [OAuth2](https://tools.ietf.org/html/rfc6749) process to use. This way you can verify the request source.|
|elementId|string|No|If you want to start the login in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|

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

|Name|Type|Mandatory|Description|
|:---|:---|:--------|:----------|
|ssoRedirectURL|string|No|Redirect URL for the OAuth2 login process if [OAuth2](https://tools.ietf.org/html/rfc6749) is used.|
|scope|string|No|Scope of the [OAuth2](https://tools.ietf.org/html/rfc6749) login process. Currently the only available scope is _profile_|
|state|string|No|CSRF token for the [OAuth2](https://tools.ietf.org/html/rfc6749) process to use. This way you can verify the request source.|
|elementId|string|No|If you want to start the login in embedded mode you have to pass the id of the element the checkout iFrame should be inserted to here.|

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









