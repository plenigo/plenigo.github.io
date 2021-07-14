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
To start a plenigo Checkout you need to [obtain a purchaseId](https://api.plenigo-stage.com/#operation/preparePurchase)
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
new plenigo.Checkout(purchase.purchaseId, { elementId: "plenigoCheckout" }).start();
```

### Important!
If you are using dynamic urls for the page to include the checkout, take care about the maximum length of its url. The url of the page containing a checkout should not be longer than 220 chars, including protocols, ports and all query parameters.<br>
An example: `https://www.example.com/news/architecture/park-and-garden/why-everybody-needs-to-have-oaks-behind-the-house.0a2937db-e3f1-471f-8a5d-80212929ee30.html?utm_source=homepage&utm_medium=web&utm_campaign=summer_sale&utm_term=architecture&utm_content=gardening` is 253 chars long and this will be too long.



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
    <td class="tg-0pky">supportedCardTypes</td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky">['V','M','J','A']</td>
    <td class="tg-0pky">If you are using PayOne as PSP you can configure card types. Use <a href="https://docs.payone.com/pages/releaseview.action?pageId=1214523"><span style="color:#905">[PayOne documentation](https://docs.payone.com/pages/releaseview.action?pageId=1214523)</span></a>.</td>
  </tr>
</tbody>
</table>
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

### Additional configuration examples
Javascript methods know some more configuration
```javascript
// start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         email: "john.doe@example.com", // default: '' -> prefill email address in forms
         source: "news-website", // default: 'plenigoSSO' -> source for registration, to filter users by their origin
      };
new plenigo.SSO(config).login();
```

### Starting Registration without using plenigo token process
You may wonder about the token plenigo process: If you register as a new user, you have to validate email address with a token plenigo sends to the new registered email. If you want to implement a different process, you can use your own implementation. Simply add a verification url to the process. You will find this url in the email templates in plenigo backend to be able to start your very own process right here.
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
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         verificationUrl: "https://www.example.com/start-email-verification" // url that points to verification process on your site
      };
new plenigo.SSO(config).register();
```
#### Implementation
If configured plenigo adds two parameters to verification URL: `verificationToken` and `token`. You simply grab these two parameters and call: https://api.plenigo-stage.com/#operation/validateRegistration to verify user.


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
If you want to set the email address before starting password forgot process you have to change your code in the following way:
```javascript
   // start the process
      var config = {
         elementId: "plenigoLogin", // the DOM element you want to put the iframe in
         email: "john.doe@example.com" // use config attribute email to set the email address in password forgot form
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
To start with registration instead of login, please use `new plenigo.Checkout("$purchase.purchaseId", { elementId: "plenigoCheckout" }).login();`.


### Multi user products
plenigo enables you to sell products for families or B2B customers. These products work with an invitation. Once a multi user product is bought, customer can invite people to use it together with himself. You can start invitation process with plenigo javascript SDK.

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
    <th class="tg-0pky"> <br>category </th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky"> <br>  defaultAddressesForm </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Enter an address </td>
    <td class="tg-0pky"> <br>data </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultAddressesSelect                  </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Select an existing address </td>
    <td class="tg-0pky"> <br>data </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentAmazonForm                </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Start amazon payment </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentAmazonSuccess             </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Submit amazon payment </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentCreditcardPayoneForm      </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Start PayOne Payment with credit card </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentCreditcardStripeForm      </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Start Stripe Payment with credit card </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentCreditcardSubmit          </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Submit credit card form </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultCrossSellingForm                 </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Cross Selling formular </td>
    <td class="tg-0pky"> <br>Subscription </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultCrossSellingSubmit               </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Cross Selling submit </td>
    <td class="tg-0pky"> <br>Subscription </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentExistingSubmit            </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Existing payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentIdealSubmit               </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>iDeal payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentIdealForm                 </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>iDeal payment form </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentInvoiceSubmit             </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Invoice payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentInvoiceForm               </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Invoice payment form </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentAddressForm               </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Enter an address </td>
    <td class="tg-0pky"> <br>data </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentPaypalForm                </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>PayPal payment form </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentPaypalSuccess             </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>PayPal payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentSepaSubmit                </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Sepa payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentSepaForm                  </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Sepa payment form </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultVoucherForm                      </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Voucher input form </td>
    <td class="tg-0pky"> <br>voucher </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPaymentZeroSubmit                </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Zero payment submit </td>
    <td class="tg-0pky"> <br>payment </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultConnectForm                      </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Corporate Account connecting form </td>
    <td class="tg-0pky"> <br>Corporate account </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultConnectSkip                      </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Corporate Account skip connect process </td>
    <td class="tg-0pky"> <br>Corporate account </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultConnectValidate                  </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>Corporate Account validate connect key </td>
    <td class="tg-0pky"> <br>Corporate account </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultLoginForm                        </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Login form </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultLoginLoginVerifyTwoFactor        </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Two factor form </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPasswordForgottenResendMail      </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Resend mail in password forgotten process </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPasswordForgottenPasswordReset   </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Reset password form </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPasswordForgottenVerificationCode </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Reset password verification code form </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPasswordForgottenPasswordSet       </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Reset password form </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultPasswordForgottenVerifyTwoFactor </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Two factor form in password forgotten process </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultRegisterForm                     </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Register process form </td>
    <td class="tg-0pky"> <br>Sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultRegisterResendMail               </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Register process resend mail </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultStepAdditonalDataForm            </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Additional data form, called, if company account needs some more data from customer </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultLoginStepSessionForm             </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Verify sessions after login </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultLoginStepSessionRemoveAll        </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Remove alle sessions after login </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultStepSuccessRegister              </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Successfully registered </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
  <tr>
    <td class="tg-0pky"> <br>  defaultStepSuccessLogin                 </td>
    <td class="tg-0pky"> <br> </td>
    <td class="tg-0pky"> <br>x </td>
    <td class="tg-0pky"> <br>Successfully logged in </td>
    <td class="tg-0pky"> <br>sso </td>
  </tr>
</tbody>
</table>

## Using Selfservice with API v3.0
plenigo offers a complete customer selfservice portal, where users can manage their SSO profiles, payment methods and orders. 

You can embedd this selfservice portal into your website with a single Javascript method: `new plenigo.Snippets(plenigoTransferToken, {elementId: "plenigoSnippets"}).start();`. Where `plenigoTransferToken` represents a secure transfer token for a plenigoSessionString.

### Create a session
If you are using plenigo SSO you should already have a plenigo session string. Otherwise you have to create a plenigo session with an api call [https://api.plenigo-stage.com/#operation/createCustomerSession](https://api.plenigo-stage.com/#operation/createCustomerSession). You can limit sessions in the plenigo backend, the default limit is 2 sessions per user. If you then create a 3rd session, you will get an error message and have to delete one of the existing sessions.

### Create a transfer token
For security reasons it is not recommended to work directly with this session string in any frontend application, javascript or html, since 3rd parties will have access to it. Thats why plenigo uses a mechanism called plenigo transfer token. It is used to generate a single one time token out of a session to be able to share it. To create a transfer token use the following call: [https://api.plenigo-stage.com/#operation/createTransferToken](https://api.plenigo-stage.com/#operation/createTransferToken).

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






