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
|snippetId|string|The snippet type that should be rendered. there are predefined constants listed below.|
|loggedOutRedirectUrl|string|It is strongly recommended that you check if a user is logged in before showing a snippet. If you don't do this check the user will be redirected to this URL if the user is not logged in.|
|loginToken|string|string	The login token is the optional fourth parameter. It is only necessary and mandatory if the plenigo user management is not used but an external user management.|

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
        // we render the personal data snippet in this example
        plenigo.renderSnippet("plenigoSnippet", plenigo.Snippet.PERSONAL_DATA, "https://www.YOUR_DOMAIN.com/");
    </script>
</body>
```
   
## General functionality

{% include_relative includes/general_functionality.md %}