---
layout: default
title: Client side JavaScript-SDK
permalink: /sdk/javascript/hide_content_afterwards
---

# Server side paywall

In the case of a server side paywall the JavaScript SDK is responsible for:

* User login
* User status
* Count metered views
* Show metered view counter

To integrate the JavaScript SDK add the following line to your template/html. The COMPANY_ID variable must be replaced with the actual company id.

```html
<script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"></script>
```

There are additional configuration options. This options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|Yes, if product is owned by user|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the plengio metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-auto-browser-prepare|No|deactivate automatic browser preparation|You can disable automatic browser configuration but you have to call plenigo.initializeBrowser() in that case before any call to the plenigo script.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Important: The data-disable-metered tag don't need to be used if metered shouldn't be used at all. This can be configured within the plenigo backend. It is only necessary for the case the user has bought the product. 

Examples:

1. User has bought the product so metered must be disabled for this product
    ```html
    <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"></script>
    ```
2. Use metered functionality but don't show the plenigo metered counter widget
    ```html
    <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-hide-metered-counter="true"></script>
    ```

[back](/)