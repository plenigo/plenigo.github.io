---
layout: default
title: paywall
permalink: /paywall
---
# Client Side Paywall

If you plan to use the PayWall functionality of plenigo you have to choose between three different use cases:

## Client Side paywall 

If you want to use a client side paywall you have to do the following steps:

### Hide content afterwards
The content will be visible on the page from the beginning and the plenigo JavaScript-SDK is going to hide it if the user is not allowed to see the content. If JavaScript is disabled or the user blocks the plenigo JavaScript-SDK she can access the whole page without any restrictions.

The plenigo JavaScript checks if the user has all rights necessary to see the content and if not the content is replaced with an up selling window or anything else. To integrate the JavaScript SDK add the following line to your template/html. The COMPANY_ID variable must be replaced with the actual company id.

```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="product"  data-disable-metered="true"></script>
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
|paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

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

### Hide content by default

The content will be placed in an HTML element that is hidden. After the user was verified to be allowed to see the content the content will be made visible by the plenigo JavaScript-SDK. The user is still able to access the content in the HTML sources.

The plenigo JavaScript checks if the user has all rights necessary to see the content and if the content is accessible the CSS style that hides the content is removed and the up selling window is hidden. To integrate the JavaScript SDK add the following line to your template/html. The COMPANY_ID variable must be replaced with the actual company id.


```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-disable-metered="true"></script>
```
There are additional configuration options. This options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the plengio metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-client-paywall|Yes|true|Must be set to enabled client side PayWall.|
|data-test-mode|No|true/false|Flag indicating if test mode should be used.|
|data-paywall-type|Yes|show|Indicates the client side PayWall type.|
|data-paywall-source-element-id|Yes|id of the element to get the content from.|id of the element to get the content from.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|data-paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and show the content if user has bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="page-content" data-paywall-target-element-id="upselling-teaser" data-product-id="productId"></script>
```

A complete example page where you only need to insert your data. This example assumes you are running in test mode with metered views enabled.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>A great news page </title>
    
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" data-product-id="YOUR_PRODUCT_ID" data-test-mode="true" data-disable-metered="true"> </script>
    </head>
    <body>
        <h2>This is the content area</h2>
        
        <div id="targetId">
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
        <div id="sourceId" style="display:none;">
            <p>
                This is the content you waited for!
            </p>
        </div>
    </body>
</html>
```
### Load content afterwards

The content to be protected isn't on the site at all. After the user was verified to be allowed to see the content the content will be loaded by another URL.
If the user disables JavaScript or blocks the plenigo JavaScript-SDK he will not be able to see the content. It is also not visible in the HTML sources.
   
The page is only rendered with a teaser and an up selling window or anything else defined. The plenigo JavaScript checks if the user has all rights 
necessary to see the content and if the content is accessible it loads the complete article snippet from another URL not visible to the user. 
To integrate the JavaScript SDK add the following line to your template/html. The `COMPANY_ID` variable must be replaced with the actual company id.

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
|data-paywall-type|Yes|url|Indicates the client side PayWall type.|
|data-paywall-base-url|Yes|base URL to find real content|Base URL to find real content for. To access the content the product id will be hashed with MD5 and added to the paywall-base-url.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|data-paywall-external-content-id|Yes|id of the external content|The MD5 hash of this value will identify the external content.|
|data-paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and load the content from another url if user has not bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="http://example.com" data-paywall-target-element-id="targetId" data-product-id="productId" data-paywall-external-content-id="externalContentId" data-disable-metered="true" ></script>
```

A complete example page where you only need to insert your data. This example assumes you are running in test mode with metered views enabled.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>A great news page </title>
    
        <!--
        The following configuration will load the content from the following url after
        the user has bought YOUR_DOMAIN_URL/MD5(YOUR_IDENTIFIER_FOR_THIS_CONTENT).
        Let's use concrete values
        data-paywall-base-url="http://example.com" (has to be the same domain like the page)
        data-paywall-external-content-id="great-article-number-one"
        would produce the following url
        http://example.com/a0048edd23a9aa85e37c248bd28f270b
        -->
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"
                data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="YOUR_DOMAIN_URL"
                data-paywall-target-element-id="targetId" data-product-id="YOUR_PRODUCT_ID" data-paywall-external-content-id="YOUR_IDENTIFIER_FOR_THIS_CONTENT">
        </script>
    </head>
    <body>
        <h2>This is the content area</h2>
        
        <div id="targetId">
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

## Server Side paywall

Java
PHP