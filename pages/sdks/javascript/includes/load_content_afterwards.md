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
|<code>data-disable-metered</code>|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|<code>data-hide-metered-counter</code>|No|true/false|If set to true the plengio metered counter widget is not shown to the user.|
|<code>data-lang</code>|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|<code>data-client-paywall</code>|Yes|true|Must be set to enabled client side PayWall.|
|<code>data-test-mode</code>|No|true/false|Flag indicating if test mode should be used.|
|<code>data-paywall-type</code>|Yes|url|Indicates the client side PayWall type.|
|<code>data-paywall-base-url</code>|Yes|base URL to find real content|Base URL to find real content for. To access the content the product id will be hashed with MD5 and added to the paywall-base-url.|
|<code>data-paywall-target-element-id</code>|Yes|id of the element to add the content to.|id of the element to add the content to.|
|<code>data-paywall-external-content-id</code>|Yes|id of the external content|The MD5 hash of this value will identify the external content.|
|<code>data-paywall-registration-element-id</code>|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|<code>data-product-id</code>|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|<code>data-login-status</code>|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|<code>data-oauth2-access-code</code>|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|<code>data-original-site-url</code>|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|<code>data-metered-description-url</code>|No|metered description url|Link to a page that describes the metered model.|
|<code>data-profile-security-label</code>|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and load the content from another url if user has not bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="http://example.com" data-paywall-target-element-id="targetId" data-product-id="productId" data-paywall-external-content-id="externalContentId"></script>
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
                <button onclick="plenigo.checkout('YOUR_CHECKOUT_CODE_FROM_THE_PLENIGO_PRODUCT_PAGE')">
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