## Checkout with API v3.0

plenigo starts its APIv3.0 in late 2019. It comes with several new [API-calls](https://api.plenigo.com/doc/v3/) and needs some 
changing to Javascript Implementations.

### Installation

The installation is equal to plenigo Javscript-SDK and needs no changes.
```html
   <div id="plenigoCheckout"></div>
   <!-- please replace {your_companyId} with your companyId -->
   <script src="https://static.plenigo.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js" data-disable-redirect="true" data-lang="de"></script>
```

### Starting checkout
To start a plenigo Checkout you need to [obtain a purchaseId](https://api.plenigo.com/doc/v3/#/checkout/post_checkout_preparePurchase)
plenigo Checkout starts in an iframe and needs some Javscript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/success-page/?order=" + e.detail.orderId ;
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout("{{ purchase.purchaseId }}", { elementId: "plenigoCheckout" }).start();
```


### Example with full html

Just put the plenigo Jacascript call somewhere in your html.

```html

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
</head>
<body>

    <header class="main">
        <h1>My 1st Checkout</h1>
    </header>


        <div id="plenigoCheckout"></div>
    
    
<!-- please replace {your_companyId} with your companyId -->
   <script src="https://static.plenigo.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js" data-disable-redirect="true" data-lang="de"></script>
   
   <script>
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/success-page/?order=" + e.detail.orderId ;
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout("$purchase.purchaseId", { elementId: "plenigoCheckout" }).start();
    </script>

</body>
</html>

```

## Using plenigo SSO

The code above shows, how to start a plenigo checkout with you own user provider. plenigo itselfs offers you an outstanding SSO functionality to enable you using users credentials on every website.
Starting it is quite easy. The plenigo Javascript comes with its SSO object: `plenigo.SSO`.
The login or registration process is completely in an iframe. To start it, you can chose between one of these functions: `login`, `register`, `forgotPassword`.

### Installation

The installation is equal to plenigo Javscript-SDK.
```html
   <div id="plenigoLogin"></div>
   <!-- please replace {your_companyId} with your companyId -->
   <script src="https://static.plenigo.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js" 
           data-disable-redirect="true" 
           data-sso="true"
           data-companyId="{your_companyId}"
           data-lang="de"></script>
```

### Starting Registration
To start a plenigo SSO Registration you need to the following code.
plenigo SSO starts in an iframe and needs some Javscript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.LoginSuccess", function(e) {
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/start-session/?session=" + e.detail.customerSession;
      });
      // start the process
      var config = {
         elementId: "plenigoLogin" // the DOM element you want to put the iframe in
      };
new plenigo.SSO(config).register();
```

### Starting Login
To start a plenigo SSO Login you need to the following code.
plenigo SSO starts in an iframe and needs some Javscript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.LoginSuccess", function(e) {
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/start-session/?session=" + e.detail.customerSession;
      });
      // start the process
      var config = {
         elementId: "plenigoLogin" // the DOM element you want to put the iframe in
      };
new plenigo.SSO(config).login();
```


### Starting Password forgot
To start a plenigo SSO Login you need to the following code.
plenigo SSO starts in an iframe and needs some Javscript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.LoginSuccess", function(e) {
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/start-session/?session=" + e.detail.customerSession;
      });
      // start the process
      var config = {
         elementId: "plenigoLogin" // the DOM element you want to put the iframe in
      };
new plenigo.SSO(config).forgotPassword();
```

### Starting a Checkout with plenigo SSO
To start a plenigo Checkout you need to [obtain a purchaseId](https://api.plenigo.com/doc/v3/#/checkout/post_checkout_preparePurchase)
plenigo Checkout starts in an iframe and needs some Javscript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
        location.href = "/success-page/?order=" + e.detail.orderId + "&session=" + e.detail.customerSession;
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout("$purchase.purchaseId", { elementId: "plenigoCheckout" }).login();
```


### Using Web-Analytics
Since the plenigo checkout is running in an iFrame, you can't track the whole process in your analytics tool. We offer the ability to track all page loads inside of the iFrame by using Javascript Events.

```javascript
// All page loads trigger this event
  document.addEventListener("plenigo.WebAnalyticsLoad", function (e) {
    // debugging Code:
    console.group("ANALYTICS");
    console.info("Event is: ", e);
    console.info("Custom data is: ", e.detail);
    console.groupEnd();
  });
```

## Using Selfservice with API v3.0
plenigo offers a complete customer selfservice portal, where users can manage their SSO profiles, payment methods and orders. 

You can embedd this selfservice portal into your website with a single Javascript method: `new plenigo.Snippets(plenigoCustomerSession, {elementId: "plenigoSnippets"}).start();`. Where `plenigoCustomerSession` represents the plenigoSessionString.

You can create such a session with an api call (https://api.plenigo-stage.com/#operation/createCustomerSession) or with the plenigo SSO functionality.

### Starting Snippets
```html
<div id="plenigoSnippets"></div>

<!-- please replace {your_companyId} with your companyId -->
<script src="https://static.plenigo.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js" 
        data-disable-redirect="true" 
        data-sso="true"
        data-companyId="{your_companyId}"
        data-lang="de"></script>
<script>
   // use plenigo session to create transfer token: https://api.plenigo-stage.com/#operation/createTransferToken
   new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets"}).start();
</script>
```

### Starting Snippets with special pages

If you want to display only one page of the selfservice, you can control it by using method 
```javascript
   new plenigo.Snippets(plenigoCustomerSession, {elementId: "plenigoSnippets"}).open(plenigo.CONSTS.SNIPPETS.PAYMENT_METHODS);
```
The available constants are the following:
```javascript
    PERSONAL_DATA: 'PERSONAL_DATA',
    PERSONAL_DATA_ADDRESS: 'PERSONAL_DATA_ADDRESS',
    PERSONAL_DATA_SETTINGS: 'PERSONAL_DATA_SETTINGS',
    ADDRESS_DATA: 'ADDRESS_DATA',
    PERSONAL_DATA_PASSWORD: 'PERSONAL_DATA_PASSWORD',
    ORDER: 'ORDER',
    DASHBOARD: 'DASHBOARD',
    SUBSCRIPTION: 'SUBSCRIPTION',
    PAYMENT_METHODS: 'PAYMENT_METHODS',
    BILLING_ADDRESS_DATA: 'BILLING_ADDRESS_DATA',
    DELIVERY_ADDRESS_DATA: 'DELIVERY_ADDRESS_DATA',
    CREDIT_CARD: 'CREDIT_CARD',
    BANK_ACCOUNT: 'BANK_ACCOUNT',
    PERSONAL_DATA_PROTECTION: 'PERSONAL_DATA_PROTECTION',
    TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
    NEWSLETTER: 'NEWSLETTER',
    OPT_IN: 'OPT_IN'
```

### manipulate or hide Snippets navigation

You can hide navigation or toggle navigation type
```javascript
   new plenigo.Snippets(plenigoCustomerSession, {elementId: "plenigoSnippets", navigation: plenigo.CONSTS.SNIPPET_NAVIGATION.DEFAULT}).open(plenigo.CONSTS.SNIPPETS.PAYMENT_METHODS);
```
The available constants are the following:
```javascript
    OFF: 'OFF', // hide navigation
    HORIZONTAL: 'HORIZONTAL', // display navigation on top of the page
    VERTICAL: 'VERTICAL', // display navigation on the left side of the page
    DEFAULT: 'HORIZONTAL', // the default setting
```






