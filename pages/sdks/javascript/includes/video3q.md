## Video-Player with access control

Based on the 3q video player plenigo offers you a video player with access control. You may need a 3q account one can create at (3q video)[https://3q.video/de/]

There one can upload multiple videos.


### Installation

The installation is based on the 3qvideo player. All the configuration parameters you can see in their (documentation)[https://github.com/3QSDN/3q.js]
```javascript
        window.plenigoVideoPlayer = window.plenigoVideoPlayer || [];

            plenigoVideoPlayer.push({
                'data-id': '5280e612-c311-11e8-ae4b-0cc47a188158', // Video ID from 3q backend
                'container': 'video1', // ID of HTML-Element in you html page
                'productIDs': 'P_PWywB6996251827351,P_ygHn66932077286351', // lst of plenigo product IDs to check access against
                'teaserLength': 2, // length of free videoteaser until video is stopped
                'no-access-callback': function (par1, par2) { // callbackfunction we call, if customer has no access
                    location.href = "/landingpage";
                }
            });
  ```
 


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
    pageName: "basket"
    };
    
```

### Example with analytics

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

