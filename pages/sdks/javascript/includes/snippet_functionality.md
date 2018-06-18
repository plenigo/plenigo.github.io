The plenigo JavaScript-SDK offers you the possibility to enable your users to do self management of their user data, orders, subscriptions, etc. This way you
provide a whole backend functionality without great programming efforts. What kind of data the user can see and edit can be freely defined by you. Only show
the snippets you want the user to see. Snippets are only available in embedded mode.

The snippet call expects the following parameters. All of these parameters are mandatory.

|Parameter|Type|Description|
|:--------|:-----|:----------|
|elementId|string|The id of the HTML element the snippet should be rendered into.|
|snippetId|string|The snippet type that should be rendered. there are predefined constants listed below.|
|loggedOutRedirectUrl|string|It is strongly recommended that you check if a user is logged in before showing a snippet. If you don't do this check the user will be redirected to this URL if the user is not logged in.|
|loginToken|string|string	The login token is the optional fourth parameter. It is only necessary and mandatory if the plenigo user management is not used but an external user management.|


Otherwise you can use one parameter as an object with the following keys

|Parameter|Type|Description|
|:--------|:-----|:----------|
|elementId|string|The id of the HTML element the snippet should be rendered into. (mandatory)|
|snippetId|string|The snippet type that should be rendered. there are predefined constants listed below. (mandatory)|
|loggedOutRedirectUrl|string|It is strongly recommended that you check if a user is logged in before showing a snippet. If you don't do this check the user will be redirected to this URL if the user is not logged in. (mandatory)|
|loginToken|string|The login token is the optional fourth parameter. It is only necessary and mandatory if the plenigo user management is not used but an external user management. (mandatory)|
|edit|boolean|Opens the snippet either in view or in edit mode. This works only for PERSONAL_DATA_ADDRESS snippet. (optional)|


Snippets that combine different elements
* `plenigo.Snippet.PERSONAL_DATA`
* `plenigo.Snippet.ORDER`
* `plenigo.Snippet.SUBSCRIPTION`
* `plenigo.Snippet.PAYMENT_METHODS`
* `plenigo.Snippet.ADDRESS_DATA`

Single elements
* `plenigo.Snippet.BILLING_ADDRESS_DATA`
* `plenigo.Snippet.DELIVERY_ADDRESS_DATA`
* `plenigo.Snippet.BANK_ACCOUNT`
* `plenigo.Snippet.CREDIT_CARD`
* `plenigo.Snippet.PERSONAL_DATA_SETTINGS`
* `plenigo.Snippet.PERSONAL_DATA_ADDRESS`
* `plenigo.Snippet.PERSONAL_DATA_PROTECTION`
* `plenigo.Snippet.PERSONAL_DATA_SOCIAL_MEDIA`
* `plenigo.Snippet.PERSONAL_DATA_PASSWORD`

Example snippet for the JavaScript to render a personal data snippet.

```html
<head><script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"></script></head>
<body>
    <div id="plenigoSnippet"></div>

    <!-- End of the HTML body. Not really necessary, but possible -->
    <script type="application/javascript">
        // we render the personal data snippet in this example ( parameter style)
        plenigo.renderSnippet("plenigoSnippet", plenigo.Snippet.PERSONAL_DATA, "https://www.YOUR_DOMAIN.com/");
    
    
        // we render the snippet in object style
        plenigo.renderSnippet({ 
            elementId:"plenigoSnippetPersonalData", 
            snippetId: plenigo.Snippet.PERSONAL_DATA_ADDRESS, 
            loggedOutRedirectUrl: "https://www.YOUR_DOMAIN.com/", 
            edit: false 
        });
    </script>
</body>
```
