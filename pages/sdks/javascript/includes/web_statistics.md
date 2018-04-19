## Web Statistics

As by design, the SDK opens up an iframe to offer the plenigo checkout process. This makes it difficult to track the user experience through this process. With the plenigo module _web analytics_ we offer you a look inside this process and give the missing data.

### Installation

The installation is just adding the new attribute __data-on-action__ to your plenigo SDK call:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Track even interactive elements</title>
    
        // Replace $COMPANY_ID$ with the company id from the plenigo merchant backend. 
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js"
            data-disable-metered="true"
            data-on-action="statisticFunction">
        </script>
  ```
You are free to name the method _statisticFunction_. It can be a method at an object, but has to be accessible or be part of the _window_ object. 

### Debugging

To debug this function simply use the _console_ function:

```html
<script>
  var statisticFunction = function (data) { console.log(data) }
</script>
```
On Submit this will result in the following data:
```javascript
action: "submit"
data: Array(6)
  0: {name: "userCountry", value: "DE"}
  1: {name: "userState", value: ""}
  2: {name: "billingAddressNeeded", value: "false"}
  3: {name: "paymentMethod", value: "BILLING"}
  4: {name: "useVoucher", value: "true"}
  5: {name: "ageVerification", value: "false"}
```



The JavaScript only checkout can be used on LandingPages or something similar. This way you can integrate plenigo easily
on pages where you don't have direct control over the server side code execution.

To get a working example you have to replace some variables. Variables to are starting and ending with a dollar sign, e.g.
`$COMPANY_ID$` and described in a comment.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Greatest product ever!</title>
    
        // Replace $COMPANY_ID$ with the company id from the plenigo merchant backend. 
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js"
            data-disable-metered="true">
        </script>
        
        <script type="application/javascript">
            // Replace $CHECKOUT_STRING$ with the checkout string of the product that you can retrieve 
            // from the product overview page in the plenigo backend.
            // Replace $TARGET_URL$ with the url the checkout should redirect after being finished. Could be
            // a thank you page.
            var checkoutConfig = {
                paymentData: "$CHECKOUT_STRING$",
                startWithRegistration: "true",
                sourceUrl: null,
                targetUrl: "$TARGET_URL$",
                affiliateId: null,
                elementId: null
            }
        </script>
    </head>
    <body>
        <h2>The greatest product ever available</h2>
        
        
        <p>
            This is your chance to buy the best product ever available!
            
            <button onclick="plenigo.checkout(checkoutConfig); return false;">
                Buy now
            </button>
        </p>
    </body>
</html>
```

