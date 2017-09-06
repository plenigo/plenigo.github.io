The content will be visible on the page from the beginning and the plenigo JavaScript-SDK is going to hide it if the user is not allowed to see the content.
If JavaScript is disabled or the user blocks the plenigo JavaScript-SDK she can access the whole page without any restrictions.
   
The plenigo JavaScript checks if the user has all rights necessary to see the content and if 
not the content is replaced with an up selling window or anything else. To integrate the JavaScript SDK add the following line to your template/html. 
The `COMPANY_ID` variable must be replaced with the actual company id.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true"></script>
```

There are additional configuration options. This options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the plengio metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-client-paywall|Yes|true|Must be set to enabled client side PayWall.|
|data-test-mode|No|true/false|Flag indicating if test mode should be used.|
|data-paywall-type|Yes|hide|Indicates the client side PayWall type.|
|data-paywall-source-element-id|Yes|id of the element to get the content from.|id of the element to get the content from.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|data-paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|
|data-disable-redirect|No|true/false|Flag indicating if there should be a redirect after the user has logged in or bought something.|

Example snippet for the JavaScript to include if you use the client side PayWall and hide the content if user has not bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="product"></script>
```

A complete example page where you only need to insert your data. This example assumes you are running in test mode with metered views enabled.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>A great news page </title>
    
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" data-product-id="YOUR_PRODUCT_ID" data-test-mode="true">
        </script>
    </head>
    <body>
        <h2>This is the content area</h2>
        
        <div id="targetId">
            <p>
                This is the content you waited for!
            </p>
        </div>
        <div id="sourceId" style="display:none;">
            <p>
                You don't have the right to see this content! Sry!
                <button onclick="plenigo.checkout({paymentData: 'CHECKOUT_STRING'})">
                    Buy now
                </button>
                <button onclick="plenigo.login();">
                    Login
                </button>
            </p>
        </div>
    </body>
</html>
```