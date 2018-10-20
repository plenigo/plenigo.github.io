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
// on submit
data = {
    action: "submit"
    data: [
      0: {name: "userCountry", value: "DE"}
      1: {name: "userState", value: ""}
      2: {name: "billingAddressNeeded", value: "false"}
      3: {name: "paymentMethod", value: "BILLING"}
      4: {name: "useVoucher", value: "true"}
      5: {name: "ageVerification", value: "false"}
      ]
};

// on load
data = { 
    action:"load"
    data: [],
    page: "previousStep",
    pageName: "basket",
    product: ""
    };
    
```
### Description of data

The onAction Callback gets some data to have a better look inside of tho plenigo checkout process. Best way to know the path, your customer takes through the checkout is, tracking each page of the checkout process. This is done by only taking calls with `action === "load"`. In these cases you will miss some data and get the name of the page on pageName. Since one can easily change the product during the checkout, we will put in the productID on the `product`-parameter whenever the change of it is done. This should always be the basket page.

### Example with analytics

To get a working example you have to replace some variables. Variables to are starting and ending with a dollar sign, e.g.
`$COMPANY_ID$` and described in a comment.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Greatest product ever!</title>
    
        // Replace $COMPANY_ID$ with the company id from the plenigo merchant backend. 
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/$COMPANY_ID$/plenigo_sdk.min.js"
            data-disable-metered="true"
            data-on-action="statistics.checkout">
        </script>
        
        <script type="application/javascript">
            var statistics = {
                checkout: function(data) {
                    var i = 0, form = [];
                    // checks, if analytics is fully initialized
                    if (typeof ga === "undefined") {
                        return;
                    }

                    if (data.action === "load") {
                        ga("send", {
                            hitType: "pageview",
                            page: "/checkout/" + data.pageName
                        });
                    } else if (data.action === "submit") {
                        form = data.data || form;
                        for (i = 0; i < form.length; i++) {
                            if (form[i].name === "paymentMethod") {
                                ga("send", {
                                    hitType: "event",
                                    eventCategory: "PaymentMethod",
                                    eventAction: form[i].name,
                                    eventLabel: "plenigo"
                                });
                            }
                        }
                    }
                }
            };
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

