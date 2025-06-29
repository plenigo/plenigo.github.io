## Checkout with API v3.0

Frisbii Media started its APIv3.0 in late 2019. It comes with several new [API-calls](https://api.plenigo.com).

### Installation

The installation is equal to Frisbii Media Javascript-SDK and needs no changes. You can copy this code with matching company id from you Frisbii Media backend in section settings / developer.
Please note, that javascript embeds may slow down your page. Thats why we designed our sdk to be embeded at the end of your html code. Please also note, that your Frisbii Media stage account has a different company id to your live account. Working against Frisbii Media stage also means, to load the sdk from a different domain.
```html
   <div id="plenigoCheckout"></div>
   <!-- please replace {your_companyId} with your companyId -->
   <!-- for implementing in production environment -->
   <script src="https://static.frisbii-media.com/web/v1/frisbii_media.min.js"
                                    data-company-id="{your_companyId}"
                                    data-lang="en"></script>

   <!-- for implementing in stage environment only -->
   <script src="https://static.frisbii-media-stage.com/web/v1/frisbii_media.min.js"
                                    data-company-id="{your_companyId}"
                                    data-lang="en"></script>
```
#### Upgrade from legacy plenigo v3 checkout (before May 2025)
We changed the complete URL, please change it.
Please note, we removed companyId from SDK-path. 
We also removed some parameters and changed spelling of attribute **data-company-id**. You have to changed it in your implementation too.

#### Installation of legacy plenigo v3 checkout (before May 2025)
```html
   <div id="plenigoCheckout"></div>
   <!-- please replace {your_companyId} with your companyId -->
   <!-- for implementing in production environment -->
   <script src="https://static.plenigo.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js"
                                    data-disable-redirect="true"
                                    data-companyId="{your_companyId}"
                                    data-lang="en"></script>

   <!-- for implementing in stage environment only -->
   <script src="https://static.plenigo-stage.com/static_resources/javascript/{your_companyId}/plenigo_sdk.min.js"
                                    data-disable-redirect="true"
                                    data-companyId="{your_companyId}"
                                    data-lang="en"></script>
                            
```

### Starting checkout
To start a Frisbii Media Checkout you need to [obtain a purchaseId](https://api.plenigo-stage.com/#operation/preparePurchase)
Frisbii Media Checkout starts in an iframe and needs some Javascript to start:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseFailed", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseFailed") {
          return false;
        }
        console.info("Checkout failed! Custom data is: ", e.detail);
        // here we redirect to a new page         
         location.href = "/customer-came-again-page/";
      });

document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        let orderId = parseInt(e.detail.orderId);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
         if (orderId > 0) {
         // Solution from example before
            location.href = "/success-page/?order=" + orderId;
         } else {
            location.href = "/customer-came-again-page/";
         }
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout" }).start();
```
#### Dealing with already bought products
If customer starts a checkout with a product he has already bought, checkout will display a message and a next button. Next button will trigger `plenigo.PurchaseSuccess`-Event too, but not with the original orderId. It will use `-1` instead:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseFailed", function(e) {
     // debugging Code:
     if (e.type !== "plenigo.PurchaseFailed") {
       return false;
     }
     console.info("Checkout failed! Custom data is: ", e.detail);
     // here we redirect to a new page         
      location.href = "/customer-came-again-page/";
   });

document.addEventListener("plenigo.PurchaseSuccess", function(e) {
     // debugging Code:
     if (e.type !== "plenigo.PurchaseSuccess") {
       return false;
     }
     let orderId = parseInt(e.detail.orderId);
     console.info("Custom data is: ", e.detail);
     // here we redirect to a new page
      if (orderId > 0) {
      // Solution from example before
         location.href = "/success-page/?order=" + orderId;
      } else {
         location.href = "/customer-came-again-page/";
      }
   });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout" }).start();
```
#### Empty Checkout
If customer starts a checkout with a product he can't buy based on rules, checkout will show an error message. If user wants to proceed, checkout calls
`plenigo.PurchaseSuccess`-Event too, but not with the original orderId. It will use `-2` instead:
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseFailed", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseFailed") {
          return false;
        }
        console.info("Checkout failed! Custom data is: ", e.detail);
        // here we redirect to a new page         
         location.href = "/customer-came-again-page/";
      });

document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        let orderId = parseInt(e.detail.orderId);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
         if (orderId > 0) {
         // Solution from example before
            location.href = "/success-page/?order=" + orderId;
         } else {
            location.href = "/customer-came-again-page/";
         }
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout" }).start();
```
#### Deal with errors
The Frisbii Media checkout tries to finish every checkout successfully. But during communication with payment providers there are rare cases checkout may fail. In these cases additional event `plenigo.PurchaseFailed` is used.
We recommend to restart checkout in these cases.
```javascript
// Checkout finishes with a javascript-Event one have to listen to
document.addEventListener("plenigo.PurchaseFailed", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseFailed") {
          return false;
        }
        console.info("Checkout failed! Custom data is: ", e.detail);
        // here we redirect to a new page         
         location.href = "/customer-came-again-page/";
      });
document.addEventListener("plenigo.PurchaseSuccess", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.PurchaseSuccess") {
          return false;
        }
        let orderId = parseInt(e.detail.orderId);
        console.info("Custom data is: ", e.detail);
        // here we redirect to a new page
         if (orderId > 0) {
         // Solution from example before
            location.href = "/success-page/?order=" + orderId;
         } else {
            location.href = "/customer-came-again-page/";
         }
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout" }).start();
```
### Important!
If you are using dynamic urls for the page to include the checkout, take care about the maximum length of its url. The url of the page containing a checkout should not be longer than 220 chars, including protocols, ports and all query parameters.<br>
An example: `https://www.example.com/news/architecture/park-and-garden/why-everybody-needs-to-have-oaks-behind-the-house.0a2937db-e3f1-471f-8a5d-80212929ee30.html?utm_source=homepage&utm_medium=web&utm_campaign=summer_sale&utm_term=architecture&utm_content=gardening` is 253 chars long and this will be too long.


### Example with full html
Just put the Frisbii Media Javascript call somewhere in your html.
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
   <script src="https://static.frisbii-media-stage.com/web/v1/frisbii_media.min.js"
                                    data-company-id="{your_companyId}"
                                    data-lang="en"></script>   
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
### Dealing with errors
If there are Errors in the checkout, user gets displayed error message and steps, how to proceed. If there are errors, the customer can not fix, checkout will stop with an error message. If customer is not able to restart the checkout process by simply reloading the whole page, you should implement some error handling here. You should start by listening to error events:
```html
   <script>
// Checkout breaks with a javascript-Event one have to listen to
document.addEventListener("plenigo.Error", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.Error") {
          return false;
        }
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we display error message in console:
        console.info(e.detail.errorMsg);
      // reload the page to restart checkout
      location.reload(true);
         
      });
   </script>
```
### Configuration
```javascript
var config = { elementId: "plenigoCheckout" };
new plenigo.Checkout(purchase.purchaseId, config).start();
```
`config` can have the following attributes:
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">Attribute name</th>
    <th class="tg-0pky">is mandatory?</th>
    <th class="tg-0pky">example</th>
    <th class="tg-0pky">description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">elementId</td>
    <td class="tg-0pky">mandatory</td>
    <td class="tg-0pky">"plenigoCheckout"</td>
    <td class="tg-0pky">Value of the id-attribute of an existing HTML-Element in current DOM. It should be accessible with document.getElementById</td>
  </tr>
  <tr>
    <td class="tg-0pky">returnUrl</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">"<a href="https://example.com/checkout&quot;"><span style="color:#905">https://example.com/checkout"</span></a></td>
    <td class="tg-0pky">If it comes to a return from a external payment page like PayPal, PayOne, Stripe, AmazonPay or similar, plenigo checkout will use url of current page (location.href) or attribute returnUrl, if provided. Length of `returnUrl` is limited to 220 characters including protocols, ports and all query parameters.</td>
  </tr>
    <tr>
    <td class="tg-0pky">restartUrl</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">"<a href="https://example.com/checkout&quot;"><span style="color:#905">https://example.com/products"</span></a></td>
    <td class="tg-0pky">If it comes to an error during checkout process, some error pages offer your customer ability to restart the process. This normally reloads the whole page. If this doesn't fit to your application, you can provide an url, where the customer can restart the process.</td>
  </tr>
   <tr>
    <td class="tg-0pky">supportedCardTypes</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">['V','M','J','A']</td>
    <td class="tg-0pky">If you are using PayOne as PSP you can configure card types. Use <a href="https://docs.payone.com/pages/releaseview.action?pageId=1214523"><span style="color:#905">[PayOne documentation](https://docs.payone.com/pages/releaseview.action?pageId=1214523)</span></a>.</td>
  </tr>
  <tr>
    <td class="tg-0pky">filterSalutations</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">['DIVERSE']</td>
    <td class="tg-0pky">Use `filterSalutations` if you want to filter salutation values. It's value has to be of type array. Avaiable values are `DIVERSE`, `NONE`, `MR`, `MRS`</td>
  </tr>
  <tr>
    <td class="tg-0pky">address</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">{ postbox: true, phoneNumber: true }</td>
    <td class="tg-0pky">Use `address` if you want to display additional input fields in address forms. It's value has to be of type object. Avaiable keys are `postbox`, `phoneNumber`. Value has to be of type `bool`.</td>
  </tr>
  <tr>
    <td class="tg-0pky">customCSS</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">https://example.com/assets/checkout.css</td>
    <td class="tg-0pky">Use `customCSS` if you want to overwrite checkout styles. You have to use complete https url of your custom css file. This file will be loaded as last source. Please take care of CORS Headers.</td>
  </tr>
  <tr>
    <td class="tg-0pky">checkoutDesignId</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">CD_R0MWF7YXMJ13TNDED</td>
    <td class="tg-0pky">Use `checkoutDesignId` if you want to overwrite checkout design variant. (in legacy checkout only)</td>
  </tr>
  <tr>
    <td class="tg-0pky">VariantUniqueId</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">fastTrack</td>
    <td class="tg-0pky">Use the `VariantUniqueId` if you want to overwrite an individual checkout variant created in the Checkout Editor. (Available in the new checkout since May 2025)</td>
  </tr>
  <tr>
    <td class="tg-0pky">title</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">Customer Self Service</td>
    <td class="tg-0pky">Use `title` do set title attribute of iframe due to accessibility requirements. If not set it falls back to defaults.</td>
  </tr>

</tbody>
</table>
### Passing additional data through the checkout
You can pass some additional data through the checkout. This would be usable for example to have a redirect url after the checkout.
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
        console.info("additional data is: ", e.detail.data);
        
        if (typeof e.detail.orderId !== "undefined") {
              location.href = e.detail.data.redirectUrl;
              return;
        }
        
        // here we redirect to a new page
        location.href = "/success-page/?order=" + e.detail.orderId ;
      });
// start Checkout
// put in purchaseId and elementId to start checkout
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout", redirectUrl: "https://www.example.com/link/to/article.html" }).start();
```




If there are Errors in the checkout, user gets displayed error message and steps, how to proceed. If there are errors, the customer can not fix, checkout will stop with an error message. If customer is not able to restart the checkout process by simply reloading the whole page, you should implement some error handling here. You should start by listening to error events:
```html
   <script>
// Checkout breaks with a javascript-Event one have to listen to
document.addEventListener("plenigo.Error", function(e) {
        // debugging Code:
        if (e.type !== "plenigo.Error") {
          return false;
        }
        console.info("Event is: " + e.type);
        console.info(e);
        console.info("Custom data is: ", e.detail);
        // here we display error message in console:
        console.info(e.detail.errorMsg);
      // reload the page to restart checkout
      location.reload(true);
         
      });
   </script>
```

### Work with custom css

In the Frisbii Media backend, or with additional configration `customCSS` you simply can override Frisbii Media styles to provide your own style by using the logic of [cascading style sheets](https://developer.mozilla.org/en-US/docs/Web/CSS). Checkout at the moment shows most common information and hides some very specific information. As there are:

#### Cancelation information
```
.price-list table tr.cancel-rules {
   display: inherit;
}
```

## Using Frisbii Media SSO

The code above shows, how to start a Frisbii Media checkout with you own user provider. Frisbii Media itself offers you an outstanding SSO functionality to enable you using users credentials on every website.
Starting it is quite easy. The Frisbii Media Javascript comes with its SSO object: `plenigo.SSO`.
The login or registration process is completely in an iframe. To start it, you can chose between one of these functions: `login`, `register`, `forgotPassword`.

### Installation

The installation is equal to Frisbii Media Javascript-SDK.
```html
   <div id="plenigoLogin"></div>
   <!-- please replace {your_companyId} with your companyId -->
   <script src="https://static.frisbii-media-stage.com/web/v1/frisbii_media.min.js"
                                    data-company-id="{your_companyId}"
                                    data-lang="en"></script>
```

### Starting Registration
To start a Frisbii Media SSO Registration you need to the following code.
Frisbii Media SSO starts in an iframe and needs some Javascript to start:
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
To start a Frisbii Media SSO Login you need to the following code.
Frisbii Media SSO starts in an iframe and needs some Javascript to start:
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

### Additional configuration examples
Javascript methods know some more configuration
```javascript
// start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         email: "john.doe@example.com", // default: '' -> prefill email address in forms
         source: "news-website", // default: 'plenigoSSO' -> source for registration, to filter users by their origin
         showTabs: true, // show registration and login as tabs on top of the page
      };
new plenigo.SSO(config).login();
```


### Starting Registration with connect feature (loginIdentifier) 
If you import subscriptions into Frisbii Media system there may be some users without an e-mail address. To enable these users to login into Frisbii Media SSO they have to connect their imported account with their e-mail address. Frisbii Media connect feature will lead you customer through this process.

You have to enable and configure this feature in checkout settings in the Frisbii Media backend. To start the process you should create an additional registration process with the following settings:
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
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         loginIdentifier: true
      };
new plenigo.SSO(config).register();
```
To display the connect feature in registration screen you can use property `showLoginIdentifier`:
```javascript
      // start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         showLoginIdentifier: true // show link to connect feature in registration screen
      };
new plenigo.SSO(config).register();
```
You can use custom text for the link:
```javascript
      // start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         showLoginIdentifier: "Click here to connect with an existing subscription" // show link to connect feature in registration screen
      };
new plenigo.SSO(config).register();
```

### Starting Registration without using Frisbii Media token process
You may wonder about the token process: If you register as a new user, you have to validate email address with a token Frisbii Media sends to the new registered email. If you want to implement a different process, you can use your own implementation. Simply add a verification url to the process. You will find this url in the email templates in Frisbii Media backend to be able to start your very own process right here.
Frisbii Media SSO starts in an iframe and needs some Javascript to start:
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
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         verificationUrl: "https://www.example.com/start-email-verification" // url that points to verification process on your site
      };
new plenigo.SSO(config).register();
```
#### Implementation
If configured Frisbii Media adds two parameters to verification URL: `verificationToken` and `token`. You simply grab these two parameters and call: https://api.plenigo-stage.com/#operation/validateRegistration to verify user.


### Starting Password forgot
To start a Frisbii Media SSO Login you need to the following code.
Frisbii Media SSO starts in an iframe and needs some Javascript to start:
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
If you want to set the email address before starting password forgot process you have to change your code in the following way:
```javascript
   // start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         email: "john.doe@example.com" // use config attribute email to set the email address in password forgot form
      };
new plenigo.SSO(config).forgotPassword();
```

### Starting a Checkout with Frisbii Media SSO
To start a Frisbii Media Checkout you need to [obtain a purchaseId](https://api.plenigo.com#/checkout/post_checkout_preparePurchase)
Frisbii Media Checkout starts in an iframe and needs some Javascript to start:
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
To start with registration instead of login, please use `new plenigo.Checkout("$purchase.purchaseId", { elementId: "plenigoCheckout" }).register();`.


### Multi user products
Frisbii Media enables you to sell products for families or B2B customers. These products work with an invitation. Once a multi user product is bought, customer can invite people to use it together with himself. You can start invitation process with Frisbii Media javascript SDK.

#### Start invitation
The invitation process is called `connection`. You connect a permission to use a product with a person. The process itself will start either login or registration process. Thats why it is an enhancement of these already known processes. Connect process starts like this:
```javascript
// starting with login
new plenigo.SSO({
    elementId: 'plenigoCheckout',
    connect: 'USER',
  }).login();
```
```javascript
// starting with registration
new plenigo.SSO({
    elementId: 'plenigoCheckout',
    connect: 'USER',
  }).register();
```
You can prefill the token for your customers to skip this step in the process:
```javascript
// starting with registration, prefill process and skip token form
new plenigo.SSO({
    elementId: 'plenigoCheckout',
    connect: 'USER',
    connectToken: 'E97876wef8EFGRWR',
  }).register();
```
If customer is already logged in, you can skip login during connection process. You need to [create a transferToken](https://api.plenigo-stage.com/#operation/createTransferToken) to pass it into the javascript method:
```javascript
// starting with registration, prefill process and skip token form
new plenigo.SSO({
    elementId: 'plenigoCheckout',
    connect: 'USER',
    transferToken: 'Jhge6jhgIRBMkjhe9'
  }).register();
```

### Using Web-Analytics
Since the Frisbii Media checkout is running in an iFrame, you can't track the whole process in your analytics tool. We offer the ability to track all page loads inside of the iFrame by using Javascript Events.

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
The different pages are:
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky"> <br>Eventname </th>
    <th class="tg-0pky"> <br>Checkout </th>
    <th class="tg-0pky"> <br>SSO </th>
    <th class="tg-0pky"> <br>Description </th>
  </tr>
</thead>
<tbody>
  </tr>
    <td class="tg-0pky"> <br>defaultSelectForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Select an existing address</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultAddressShowForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Enter an address</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultAgeCheckForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Processing screen for age check</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultAgeCheckShowForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Enter data for age check</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultCrossSellingShowForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show cross selling form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultConnectShowForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show connect form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentExistingSubmitForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show existing payment method submit form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentSelectForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show payment selection form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentSubmitForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show payment submit form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentRedirectForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Execute payment redirect if payment method requires a redirect</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentSuccessForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show payment success form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentVoucherForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show payment voucher form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentWaitForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show waiting page for successful payment</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPurchaseOrderIndicatorForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show form to enter purchase order indicator</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultBlockedCountryForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that country is blocked for purchase</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultConfigurationFailedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show configuration failure page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultEmergencyModeForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show emergency mode enabled page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultInvalidDomainForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that the checkout must not be used under this domain</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultMissingOffersForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that there are no offers available for sale</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPageNotFoundForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show not found page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPaymentMethodFailedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show payment method failed page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultOfferSalesStoppedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that sales for this specific offer has been stopped</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPurchaseAlreadyFinishedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that product is already bought</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPurchaseFinishedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show purchase finished page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultSessionOutdatedForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that session is outdated</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultTooManyRequestsForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show page that there were too many requests</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultErrorForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show error page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultLoginForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Login form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultAdditionalDataStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Page requesting additional data from the user if necessary, e.g. username, terms and conditions</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultAdditionalNameStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Page requesting a firstname and lastname if necessary</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultLoginTwoFactorStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Page requesting two factor code</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultLoginSuccessForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Login success page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultLoginSessionsForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Form shown if there are too many active sessions</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPasswordForgottenEmailForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Password forgotten form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPasswordForgottenVerifyStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Password forgotten verification code page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPasswordForgottenTwoFactorStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Password forgotten two factor code page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPasswordForgottenPasswordStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Enter new password step</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultRegistrationForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show registration form</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultRegistrationWithIdentifierForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show registration form with merge identifier</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultRegistrationVerifyStepForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show registration form verification code step</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultConfigurationFailedForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show configuration failed page</td>
  </tr>
 <tr>
    <td class="tg-0pky"> <br>defaultEmergencyModeForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show emergency mode enabled page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultInvalidDomainForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show page that the checkout must not be used under this domain</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultPageNotFoundForm</td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Show not found page</td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>defaultErrorForm</td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Show error page</td>
  </tr>
</tbody>
</table>

## Using Selfservice with API v3.0
Frisbii Media offers a complete customer selfservice portal, where users can manage their SSO profiles, payment methods and orders. 

You can embed this selfservice portal into your website with a single Javascript method: `new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets"}).start();`. Where `plenigoTransferToken` represents a secure transfer token for a Frisbii MediaSessionString.

### Create a session
If you are using Frisbii Media SSO you should already have a Frisbii Media session string. Otherwise you have to create a Frisbii Media session with an api call [https://api.plenigo-stage.com/#operation/createCustomerSession](https://api.plenigo-stage.com/#operation/createCustomerSession). You can limit sessions in the Frisbii Media backend, the default limit is 2 sessions per user. If you then create a 3rd session, you will get an error message and have to delete one of the existing sessions.

### Create a transfer token
For security reasons it is not recommended to work directly with this session string in any frontend application, javascript or html, since 3rd parties will have access to it. Thats why Frisbii Media uses a mechanism called Frisbii Media transfer token. It is used to generate a single one time token out of a session to be able to share it. To create a transfer token use the following call: [https://api.plenigo-stage.com/#operation/createTransferToken](https://api.plenigo-stage.com/#operation/createTransferToken).

### Starting Snippets
```html
<div id="plenigoSnippets"></div>

<!-- please replace {your_companyId} with your companyId -->
<script src="https://static.frisbii-media-stage.com/web/v1/frisbii_media.min.js"
                                 data-company-id="{your_companyId}"
                                 data-lang="en"></script>
<script>
   // use Frisbii Media session to create transfer token: https://api.plenigo-stage.com/#operation/createTransferToken
   new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets"}).start();
</script>
```

### Starting Snippets with special pages

If you want to display only one page of the selfservice, you can control it by using method 
```javascript
   new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets"}).open(plenigo.CONSTS.SNIPPETS.PAYMENT_METHODS);
```
The available constants are the following:
```javascript
    PERSONAL_DATA: 'PERSONAL_DATA',
    PERSONAL_DATA_ADDRESS: 'PERSONAL_DATA_ADDRESS',
    PERSONAL_DATA_SETTINGS: 'PERSONAL_DATA_SETTINGS',
    ADDRESS_DATA: 'ADDRESS_DATA',
    PERSONAL_DATA_PASSWORD: 'PERSONAL_DATA_PASSWORD',
    ORDER: 'ORDER',
    INVOICE: 'INVOICE',
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
    MULTI_USER_ACCOUNTS: 'MULTI_USER_ACCOUNTS',
    OPT_IN: 'OPT_IN'
```

#### Show a subscription detail page only
If you want to provide the shortest possible way to a customers subscription, you can start self service just in a detail view:
```javascript
   new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets", subscriptionId: 123456}).start();
```

### manipulate or hide Snippets navigation

You can hide navigation or toggle navigation type
```javascript
   new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets", navigation: plenigo.CONSTS.SNIPPET_NAVIGATION.DEFAULT}).open(plenigo.CONSTS.SNIPPETS.PAYMENT_METHODS);
```
The available constants are the following:
```javascript
    OFF: 'OFF', // hide navigation
    HORIZONTAL: 'HORIZONTAL', // display navigation on top of the page
    VERTICAL: 'VERTICAL', // display navigation on the left side of the page
    DEFAULT: 'HORIZONTAL', // the default setting
```

### Disable User Data to prevent changes
If Frisbii Media is not your SSO, customers should change their user data as there are e-mail address, password or 2-factor settings directly in your SSO. In this case you can disable or hide managing user data in self service. You simply have to enhance the configuration a bit:
```javascript
{
 elementId: "plenigoSnippets",
 displaySettings: {
    SSO: {
        personalDetails: 'VIEW',
        twoFactor: 'HIDE'
    }
  }
}
```
You can chose from these values: `SHOW`, `HIDE` and `EDIT`. Here is the complete example:
```javascript
   let snippetConfig = {
    elementId: "plenigoSnippets",
    displaySettings: {
       SSO: {
           personalDetails: 'VIEW',
           twoFactor: 'HIDE'
       }
    }
};

new plenigo.Snippets(plenigoTransferToken, snippetConfig).start();
```



