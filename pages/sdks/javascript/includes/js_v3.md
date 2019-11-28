## Checkout with API v3.0

plenigo starts its APIv3.0 in late 2019. It comes with several new [API-calls](https://api.plenigo.com/doc/v3/) and needs some 
changing to Javascript Implementations.

### Installation

The installation is is equal to plenigo Javscript-SDK and needs no changes.
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
new plenigo.Checkout("{{ purchase.purchaseId }}", { elementId: "plenigoCheckout" }).start();
    </script>

</body>
</html>

```
