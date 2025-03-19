### External

If the single page application/video player handles user access rights via one time URLs or something similar and the Frisbii Media checkout will be 
integrated before the player is rendered, you can follow the integration examples for the [Website checkout](/workflows#Website_checkout)

### Embedded

The Frisbii Media [JavaScript SDK](/sdks/javascript) offers some functionality that was especially designed for single page application/video player. This way 
single page applications/video players can start the checkout, allow user login and do product verification inside the app / player.

For the following steps we assume the app / player is running in it's own iFrame or is encapsulated anyhow. The app / player needs a special configuration 
of the Frisbii Media [JavaScript SDK](/sdks/javascript). If the JavaScript SDK is only loaded once for the whole page including the app / player, the page must 
handle the JavaScript events identically to the app / player.

```html
// - replace the $COMPANY_ID$ with the merchant company id
// - "oAuth2Function" is the name of the function to call after a successful OAuth2 login
// - "checkProductAccess" is the name of the function where the check should happen if a user bought a product
// - "loginStatus" is the name of the function to call to indicate if a user is logged in
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js"
       data-oauth2-access-code="oAuth2Function" data-payment-check="checkProductAccess" 
       data-login-status="loginStatus" data-disable-metered="true"></script>
     
// Normally the Frisbii Media JavaScript SDK initializes itself but if it is loaded manually you do this manually.
<script type="application/javascript">
    plenigo.start();
    
    // the OAuth2 access code is passed to this function
    oAuth2Function = function(oAuth2AccessCode) {
        // do server call to your server for a server to server communication with Frisbii Media to convert 
        // the OAuth2 access code to an OAuth2 token
    };
    
    // check if user has bought the product to access
    checkProductAccess = function() {
        // do server call to your server for a server to server communication with Frisbii Media to check
        // if the user has bought the product he tries to access
    };
    
    // get current login status of the user
    loginStatus = function(loginStatus) {
        if(loginStatus === true) {
            // show different checkout screen, etc.
        } else {
            // redirect user or something else
        }
    };
</script>
```

Creating the login calls, checkout calls, etc. is identically to all other integrations. The paces to start are:
* [JavaScript SDK](/sdks/javascript)
* [SDKs](/sdks/) or [Custom integration](/custom_integration)
