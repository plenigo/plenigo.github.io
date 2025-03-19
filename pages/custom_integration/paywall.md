---
layout: default
title: paywall
permalink: /paywall
---
# Paywall
Paywalls are systems designed to monetize online and other digital information by preventing visitors from accessing web sites and similar content providers without having a paid subscription.  Online news and sports web sites are the most frequent users of paywalls, with some sites implementing hard paywalls while others deploy soft paywalls. A hard paywall's content restrictions are much more stringent than a soft paywall, allowing either no access or minimal access to free content.  A soft paywall(metered views), on the other hand, provides significant access to free content as a means of encouraging users to subscribe for access to premium content.
## Client Side paywall 
**The first thing you have to do is enabling the paywall in the Frisbii Media backend (Paywall->Settings).** 

After you have done this you can use the PayWall functionality of Frisbii Media. You have to choose between three different use cases:
* [Hide content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)
* [Hide content by default](https://plenigo.github.io/sdks/javascript#hide-content-by-default)
* [Load content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)


### Hide content afterwards
The content will be visible on the page from the beginning and the Frisbii Media JavaScript-SDK is going to hide it if the user is not allowed to see the content. If JavaScript is disabled or the user blocks the Frisbii Media JavaScript-SDK it can access the whole page without any restrictions.

The Frisbii Media JavaScript checks if the user has all  necessary rights to see the content and if not the content is replaced with an up selling window or anything else. To integrate the JavaScript SDK add the following line to your template/html. The COMPANY_ID variable must be replaced with the actual company id.

```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="product"  data-disable-metered="true"></script>
```

There are additional configuration options. This options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the Frisbii Media metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-client-paywall|Yes|true|Must be set to enabled client side PayWall.|
|data-test-mode|No|true/false|Flag indicating if test mode should be used.|
|data-paywall-type|Yes|hide|Indicates the client side PayWall type.|
|data-paywall-source-element-id|Yes|id of the element to get the content from.|id of the element to get the content from.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and hide the content if user has not bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="product"></script>
```

#### Use case 
This is a complete example page where you only need to insert your data. 

![Enable paywall](/assets/images/ci/demo_paywall.png)

You only have to replace the company id(e.g.23NuCmdPoiRRkQiCqP9Q), the product id(e.g. aitnVIz1503443609941) and the checkout string which belongs to that product. This example assumes you are running in test mode with metered views enabled.

#### Page logic

In the Page you have to replace the **company id** and the **product ID** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="productID"></script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company and the **productID (e.g. aitnVIz1503443609941)** for the corresponding id of the product. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="upselling-teaser" data-paywall-target-element-id="page-content" data-product-id="aitnVIz1503443609941"></script>
```

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before). 
  
2. If the user **has bought** the product he will be redirected to the article page. 

   If the user **has not bought** the product a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment was successful the user will be redirect to the article page 


```html
<!DOCTYPE html>
<html>  <!--
        Let's use concrete values:
        company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
        data-product-id = e.g. "aitnVIz0982443600981"
        checkoutString = "cd6749ba9c67b0bbe3e29a672ba150713b3e7274a1cbfe64b89f22c41a8561e775fcddeaae0f3c97.6c87b959ec78b9fd9ce949967e04066439dfd6b480d40434264e2e419803debd"
        -->
    <head>
        <title> New York City Reimagines How It Works </title>
        <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="hide" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" data-product-id="aitnVIz0982443600981" data-test-mode="true" >
	</script>
<script type="application/javascript">
//The Live-String of the product from the Frisbii Media backend.
var checkoutString = 'cd6749ba9c67b0bbe3e29a672ba150713b3e7274a1cbfe64b89f22c41a8561e775fcddeaae0f3c97.6c87b959ec78b9fd9ce949967e04066439dfd6b480d40434264e2e419803debd';
</script>
    </head>
    <body>
        <h2> New York City Reimagines How It Works </h2>
        <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps, Leanne Spaulding landed a job at a Virginia-based trade association, working her way toa master's degree from Duke University in environmental management.
        Now Ms. Spaulding is in New York, where she was recently hired by the city?s Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others added in recent years that are slowly changing the day-to-day face of government service.</article>
        <div id="targetId">
            <article>There are now nearly 294,000 full-time city employees, more than at any point in the city's history. The growth under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly every city agency now employs more workers than it did in 2014, when the mayor took office.
	        The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R. Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
	        A report from Moody's earlier this year heralded the diversity in the city's economy, but noted that the city's debt service, pension and retiree health care costs were growing rapidly. Increasing headcount brings added costs with it in the future, said Nick Samuels, a senior credit officer and the author of the report. Keeping up with that over time will require additional economic growth.
            </article>
        </div>
        <div id="sourceId" style="display:none;">
            <p>
                <h2> Do you want to read this article ?</h2>
    		<span> Please buy a subscription</span>
                <button onclick="plenigo.checkout({paymentData: checkoutString})">
                    Buy now
                </button>
            </p>
        </div>
    </body>
</html>
```

### Hide content by default

The content will be placed in an HTML element that is hidden. After the user was verified to be allowed to see the content the content will be made visible by the Frisbii Media JavaScript-SDK. The user is still able to access the content in the HTML sources.

The Frisbii Media JavaScript checks if the user has all rights necessary to see the content and if the content is accessible the CSS style that hides the content is removed and the up selling window is hidden. To integrate the JavaScript SDK add the following line to your template/html. The COMPANY_ID variable must be replaced with the actual company id.


```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-disable-metered="true"></script>
```
There are additional configuration options. These options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the Frisbii Media metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-client-paywall|Yes|true|Must be set to enabled client side PayWall.|
|data-test-mode|No|true/false|Flag indicating if test mode should be used.|
|data-paywall-type|Yes|show|Indicates the client side PayWall type.|
|data-paywall-source-element-id|Yes|id of the element to get the content from.|id of the element to get the content from.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|data-paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and show the content if user has bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="page-content" data-paywall-target-element-id="upselling-teaser" data-product-id="productId"></script>
```
#### Use case 
This is a complete example page where you only need to insert your data.

![Enable paywall](/assets/images/ci/demo_paywall.png)


#### Page logic


In the Page you have to replace the **company id** and the **product ID** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" data-product-id="productId" data-test-mode="true"> </script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company and the **productID (e.g. aitnVIz1503443609941)** for the corresponding id of the product. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" data-product-id="aitnVIz1503443609941" data-test-mode="true"> </script>
```

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before). 
  
2. If the user **has bought** the product he will be redirected to the article page. 

   If the user **has not bought** the product a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment was successful the user will be redirect to the article page 

```html
<!DOCTYPE html>
<html>
   <!--
      Let's use concrete values:
      company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
      data-product-id = e.g. "EgLUrT56328991046641"
      checkoutString = "cd6749ba9c67b0bbe3e29a672ba150713b3e7274a1cbfe64b89f22c41a8561e775fcddeaae0f3c97.6c87b959ec78b9fd9ce949967e04066439dfd6b480d40434264e2e419803debd"

      -->
   <head>
      <title>New York City Reimagines How It Works</title>
      <script 
      type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
      data-client-paywall="true" data-paywall-type="show" data-paywall-source-element-id="sourceId" data-paywall-target-element-id="targetId" 
      data-product-id="aitnVIz0982443600981" data-test-mode="false">
      </script>
      <script type="application/javascript">
         //The Live-String from the product from the Frisbii Media backend.
         var checkoutString = 'cd6749ba9c67b0bbe3e29a672ba150713b3e7274a1cbfe64b89f22c41a8561e775fcddeaae0f3c97.6c87b959ec78b9fd9ce949967e04066439dfd6b480d40434264e2e419803debd';
      </script>
   </head>
   <body>
      <h2>New York City Reimagines How It Works</h2>
      <div id="targetId">
         <p>
         <p>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
            Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from
            Duke University in environmental management.Now Ms. Spaulding is in New York, where she was recently hired by the city?s Sanitation Department. Her duties, naturally, involve garbage, but not in 		the traditional sense: Ms. Spaulding is trying to help sell residents of the nation?s largest city on its ambitious composting effort.
            In that respect, her job is like thousands of others added in recent years that are slowly changing the day-to-day face of government service. 
         </p>
         <h2>Do you want to read this article ?</h2>
         <span> Please buy a subscription</span>
         <button onclick="plenigo.checkout({paymentData: checkoutString})">
         Buy now
         </button>
         </p>
      </div>
      <div id="sourceId" style="display:none;">
         <p>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
            Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
            Duke University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's
            Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
            the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
            added in recent years that are slowly changing the day-to-day face of government service.
            There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
            under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
            every city agency now employs more workers than it did in 2014, when the mayor took office.
            The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
            Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
            pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
         </p>
      </div>
   </body>
</html>
```
### Load content afterwards

The content to be protected isn't on the site at all. After the user was verified to be allowed to see the content the content will be loaded by another URL.
If the user disables JavaScript or blocks the Frisbii Media JavaScript-SDK he will not be able to see the content. It is also not visible in the HTML sources.
   
The page is only rendered with a teaser and an up selling window or anything else defined. The Frisbii Media JavaScript checks if the user has all rights 
necessary to see the content and if the content is accessible it loads the complete article snippet from another URL not visible to the user. 
To integrate the JavaScript SDK add the following line to your template/html. The `COMPANY_ID` variable must be replaced with the actual company id.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true"></script>                      
```

There are additional configuration options. This options are added as attributes to the JavaScript tag.

| Attribute | Mandatory | Values | Description |
|:----------|:----------|:-------|:------------|
|data-disable-metered|No|true/false|Deactivates the metered functionality and all the logic coming with it.|
|data-hide-metered-counter|No|true/false|If set to true the Frisbii Media metered counter widget is not shown to the user.|
|data-lang|No|de/en|Set the language used for metered counter, etc. If not set the browser language is taken.|
|data-client-paywall|Yes|true|Must be set to enabled client side PayWall.|
|data-test-mode|No|true/false|Flag indicating if test mode should be used.|
|data-paywall-type|Yes|url|Indicates the client side PayWall type.|
|data-paywall-base-url|Yes|base URL to find real content|Base URL to find real content for. To access the content the product id will be hashed with MD5 and added to the paywall-base-url.|
|data-paywall-target-element-id|Yes|id of the element to add the content to.|id of the element to add the content to.|
|data-paywall-external-content-id|Yes|id of the external content|The MD5 hash of this value will identify the external content.|
|data-paywall-registration-element-id|Yes, if two two phase metered is planed|id of the element containing the registration/login form.|id of the element containing the registration/login form.|
|data-product-id|Yes|product id of the product on this page.|Product id that identifies the product that is sold on this page.|
|data-login-status|No|function to call after user status change.|Function that should be called if user status changed. The only argument passed is the status as boolean value.|
|data-oauth2-access-code|No|function to call after OAuth2 was successful.|Function that should be called if OAuth2 is done. The only argument passed is the access code.|
|data-payment-check|No|function to call to check if the user has bought the product. This method is only called if the user is logged in successfully and the check should be done.|
|data-login-status|No|function called to indicate if a user is logged in or not. The only argument passed is a boolean value.|
|data-original-site-url|No|original site url|Original site url to detect if some kind of webproxy is used and prevent the user to access the site in this case.|
|data-metered-description-url|No|metered description url|Link to a page that describes the metered model.|
|data-profile-security-label|No|true/false|Do not show a security label around the profile snippets if rendered on a non https site.|

Example snippet for the JavaScript to include if you use the client side PayWall and load the content from another url if user has not bought the product.

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="http://example.com" data-paywall-target-element-id="targetId" data-product-id="productId" data-paywall-external-content-id="externalContentId" data-disable-metered="true" ></script>
```

#### Use case 
This is a complete example page where you only need to insert your data.

![Enable paywall](/assets/images/ci/demo_paywall.png)


#### Page logic

In the Page you have to replace the **company id** ,**product ID**, the **Your_Domain_URL**  and **YOUR_IDENTIFIER_FOR_THIS_CONTENT** in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"
                data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="YOUR_DOMAIN_URL"
                data-paywall-target-element-id="targetId" data-product-id="YOUR_PRODUCT_ID" data-paywall-external-content-id="YOUR_IDENTIFIER_FOR_THIS_CONTENT">
</script>
```
You will replace the **COMPANY_ID (e.g. 23NuCmdPoiRRkQiCqP9Q)** for the corresponding id of your company and the **productID (e.g. aitnVIz1503443609941)** for the corresponding id of the product. After replacing these things it should look like this:
In this example we do not replace the **data-paywall-external-content-id** and the **data-paywall-base-url**. After replacing these things it should look like this:


```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
                data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="YOUR_DOMAIN_URL"
                data-paywall-target-element-id="targetId" data-product-id="aitnVIz1503443609941" data-paywall-external-content-id="YOUR_IDENTIFIER_FOR_THIS_CONTENT">
</script>

``` 
 

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before). 
  
2. If the user **has bought** the product he will be redirected to the article page. 

   If the user **has not bought** the product a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment was successful the user will be redirect to the article page 

```html
<!DOCTYPE html>
<html>
   <!--
      The following configuration will load the content from the following url after
      the user has bought YOUR_DOMAIN_URL/MD5(YOUR_IDENTIFIER_FOR_THIS_CONTENT).
      Let's use concrete values:
      data-paywall-base-url="http://example.com" (has to be the same domain like the page)
      data-paywall-external-content-id="great-article-number-one"
      would produce the following url: http://example.com/a0048edd23a9aa85e37c248bd28f270b
      company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
      data-product-id = e.g. "EgLUrT56328991046641"
      -->
   <head>
      <title>New York City Reimagines How It Works</title>
      <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
         data-client-paywall="true" data-paywall-type="url" data-paywall-base-url="YOUR_DOMAIN_URL"
         data-paywall-target-element-id="targetId" data-product-id="EgLUrT56328991046641" data-paywall-external-content-id="YOUR_IDENTIFIER_FOR_THIS_CONTENT"></script>
      <script type="application/javascript">
         //The Live-String from the product from the Frisbii Media backend.
         var checkoutString = 'cd6749ba9c67b0bbe3e29a672ba150713b3e7274a1cbfe64b89f22c41a8561e775fcddeaae0f3c97.6c87b959ec78b9fd9ce949967e04066439dfd6b480d40434264e2e419803debd';
      </script>
   </head>
   <body>
      <h2>
         After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
         Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
         Duke University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's
         Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
         the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
         added in recent years that are slowly changing the day-to-day face of government service.
         There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
         under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
         every city agency now employs more workers than it did in 2014, when the mayor took office.
         The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
         Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
         pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
      </h2>
      <div id="targetId">
         <p>
         <h2>Do you want to read this article ?</h2>
         <span>Please buy a subscription</span>
         <button onclick="plenigo.checkout({paymentData: checkoutString})">
         Buy now
         </button>
         </p>
      </div>
   </body>
</html>
```

## Server Side Paywall

The first thing you have to do is enabling the paywall in the Frisbii Media backend (Paywall->Settings).
After you have done this you can continue with the following step.

1. Check if the user has bought product
2. User has bought product -> Show article
3. User has not bought product -> Show paywall 

### Implementation with SDKs

#### Java

For Java integration you can use the `com.plenigo.sdk.services.UserService#hasUserBought` method for this purpose.
```java
String cookieHeader = request.getHeader("Cookie");
// The_product_id from the Frisbii Media backend.
String productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
boolean hasUserBought = UserService.hasUserBought(productId, cookieHeader);
if (hasUserBought) {
    showArticle();
} else {
    showPaywall();
}
```

### Use case 

This is a complete example page where you only need to insert your data. 

![Enable paywall](/assets/images/ci/demo_paywall.png)


#### Server logic


The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/sdks/java#configuration). After that you can implement the Frisbii Media paywall.

```java
@Controller
public class Paywall {

    @PostConstruct
    public void config() {
        // Configure the Java SDK (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }
    
    public void handlePaywall(HttpServletRequest request, Model model) throws PlenigoException, InvalidDataException {
        String cookieHeader = request.getHeader("Cookie");
        boolean isHasUserBought;
        // The product id  from the Frisbii Media backend.
        String productId = "aitnVIz1503443609941";
        // This method returns true if the user has already bought the product.
        isHasUserBought = UserService.hasUserBought(productId, cookieHeader);
        model.addAttribute("showPaywall", false);
        if (!isHasUserBought) {
            Product product = new Product(productId);
            // Since he has not bought the product, we need to build the
            // checkout snippet so that he can do the flow on the Frisbii Media
            // site and buy.
            CheckoutSnippetBuilder builder = new CheckoutSnippetBuilder(product);
            String checkoutCode = builder.build();
            model.addAttribute("checkoutCode", checkoutCode);
            model.addAttribute("showPaywall", true);
        }
    }
}
```

#### Page logic

In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).

```html
<!DOCTYPE html>
<html>
   <!--
      Let's use concrete values:
      company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
   -->
   <head>
      <title>New York City Reimagines How It Works</title>
      <script type="application/javascript"
         src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
         data-disable-metered="true"></script>
   </head>
   <body>
      <p>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
         Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from Duke
         University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's Sanitation Department.
         Her duties,naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of the
         nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others added in
         recent years that are slowly changing the day-to-day face of government service.
      </p>
      <#if showPaywall>
      <h2>Do you want to read this article ?</h2>
      <span>Please buy a subscription</span>
      <button onclick="${checkoutCode}">Buy now</button>
      <#else>
      <p>There are now nearly 294,000 full-time city employees, more than at any point in the city's history. The growth under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly every city agency now employs more workers than it did in 2014, when the mayor took office. The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R. Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn. A report from Moody's earlier this year heralded the diversity in the city?s economy, but noted that the city's debt service,
         pension and retiree health care costs were growing rapidly. Increasing headcount brings added costs with it in the future, said Nick Samuels, a senior credit officer and the author of the report.
         Keeping up with that over time will require additional economic growth. Carol Kellermann, the president of the nonprofit Citizens Budget Commission, a fiscal watchdog group, questioned Mr. de Blasio's decision to rapidly grow the city's head count during flush times, saying that it made it more likely that new rounds of painful layoffs could be necessary in the city's future.
         You don't have to keep adding people every year, she said. You could manage what you have and use the staff that you have to run programs. Find a way to do the things you want to do with the existing work force.
      </p>
   </body>
</html>
```
### PHP

For PHP integration can use the `\plenigo\services\UserService::hasUserBought` method for this purpose.

```php
<?php
// The_product_id from the Frisbii Media backend.
$productId = 'EgLUrT56328991046641';
// This method returns true if the user has already bought the product.
$hasUserBought = \plenigo\services\UserService::hasUserBought($productId);
if($hasUserBought) {
    showArticle();
    } else {
        showPaywall();
    }
```

### Use case 



#### Server logic
The first thing you have to do is configuring the [PHP SDK](https://plenigo.github.io/sdks/php#configuration). After that you can implement the Frisbii Media paywall.

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;


//Configure the PHP SDK: The secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl) and the company id(e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend.
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl", "23NuCmdPoiRRkQiCqP9Q", true);
// The_product_id from the Frisbii Media backend.
$productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productId);
if ($hasUserBought === FALSE) {
    $product = new ProductBase($productId);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the Frisbii Media
    // site and buy.
    $prodToChkOut = new ProductId($productId);
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

#### Page logic


In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).


```php
<!DOCTYPE html>
<html>
<head>
    <title>New York City Reimagines How It Works</title>
    <!-- import the Frisbii Media Javascript SDK -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"
            data-disable-metered="true"></script>
</head>
<body>
<?php if (!$hasUserBought) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
    Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from
    Duke University in environmental management.</article>
    <h2>Do you want to read this article ?</h2>
    <span>Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>">Buy now</button>
<?php } else { ?>
    <article>Now Ms. Spaulding is in New York, where she was recently hired by the city's Sanitation Department. Her duties,
    naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
    the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
    added in recent years that are slowly changing the day-to-day face of government service.
    There are now nearly 294,000 full-time city employees, more than at any point in the city's history. The growth
    under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
    every city agency now employs more workers than it did in 2014, when the mayor took office.
    The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
    Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
    pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
<?php } ?>
</body>
</html>
```

## Server Side Metered Paywall
A soft paywall(metered paywall)  provides significant access to free content as a means of encouraging users to subscribe for access to premium content.

The first thing you have to do is enabling the metered paywall in the Frisbii Media backend (Paywall-> Metered Settings).
After you have done this you can continue with the following step.

1. Check if the user has free views for the product
2. User has free views -> Show article
3. User has no free views -> Show paywall 

### Workflow metered paywall

![Metered views](/assets/images/ci/PaywallEnabled .png)

With SDKs

(A) + (B): [Java SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled), [PHP SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

Without Frisbii Media SDKs

(A) + (B): [Implementation without SDKs](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

### Implementation with SDKs

The idea behind metered view functionality is demonstrated with the following pseudo code examples.


#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| cookieHeader     | yes     | string         | The cookie header |
| productId     | yes     | string         | The product id from the Frisbii Media backend string |

For Java integration you  can use the `com.plenigo.sdk.services.MeterService#hasFreeViews` method for this purpose.
```java
// We fill the request object with the appropriate get object and we get the Cookie header this way
String cookieHeader = request.getHeader("Cookie");
// Replace my_product_id with the product id from the Frisbii Media backend
String productId = "EgLUrT56328991046641";
// This method returns true if the user has free views.
boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader, productId);
if (hasFreeViews) {
    showArticle();
    } else {
        showPaywall();
    }
```

#### Use case 

Use case for implementing Frisbii Media metered paywall.

#### Server logic
The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/sdks/php#configuration). After that you can implement the Frisbii Media paywall.


```java
public class MeteredPaywall {

    @PostConstruct
    public void config() {
        // Configure the Java SDK (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl", "23NuCmdPoiRRkQiCqP9Q");
    }
   
    protected void handlePaywall(HttpServletRequest request, Model model) throws PlenigoException, InvalidDataException {
        String cookieHeader = request.getHeader("Cookie");
        boolean isHasUserBought;
        // The product id from the Frisbii Media backend.
        String productId = "EgLUrT56328991046641";
        isHasUserBought = UserService.hasUserBought(productId, cookieHeader);
        model.addAttribute("showPaywall", false);
        if (!isHasUserBought) {
            boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader, null);
            if (!hasFreeViews) {
                Product product = new Product(productId);
                // Since he has not bought the product, we need to build the
                // checkout snippet so that he can do the flow on the Frisbii Media
                // site and buy.
                Product product = new Product(productId);
                CheckoutSnippetBuilder builder = new CheckoutSnippetBuilder(product);
                String checkoutCode = builder.build();
                model.addAttribute("checkoutCode", checkoutCode);
                model.addAttribute("showPaywall", true);
            }
        }
    }
}

```

#### Page logic

In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).


```html
<!DOCTYPE html>
<html>
<head>
        <title>New York City Reimagines How It Works</title>
        <!-- import the Frisbii Media Javascript SDK
               Let's use concrete values:
               company id = e.g. "23NuCmdPoiRRkQiCqP9Q"
        -->               
        <script type="application/javascript"
                src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"></script>
</head>
<body>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from
        Duke University in environmental management.Now Ms. Spaulding is in New York, where she was recently hired by the city?s Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of the nation?s largest city on its ambitious composting effort.
        In that respect, her job is like thousands of others added in recent years that are slowly changing the day-to-day face of government service. 
    </article>
    <#if showPaywall>
    <h2>Do you want to read this article ?</h2>
    <span>Please buy a subscription</span>
    <button onclick="${checkoutCode}">Buy now</button>
    <#else>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
             Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
             Duke University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's
             Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
             the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
             added in recent years that are slowly changing the day-to-day face of government service.
             There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
             under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
             every city agency now employs more workers than it did in 2014, when the mayor took office.
             The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
             Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
             pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
</body>
</html>
```
### PHP

For PHP integration you can use the `\plenigo\services\UserService::hasFreeViews` method for this purpose.

```php
<?php
$hasFreeViews = \plenigo\services\UserService::hasFreeViews($productId);
if($hasFreeViews) {
    showArticle();
    } else {
        showPaywall();
    }
```

#### Use case 

Use case for implementing Frisbii Media metered paywall.

##### Server logic

The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/sdks/php#configuration). After that you can implement the Frisbii Media paywall.

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;
use plenigo\services\MeterService;

// The secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company(e.g. 23NuCmdPoiRRkQiCqP9Q) id from the Frisbii Media backend.
\plenigo\PlenigoManager::configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddpl", "23NuCmdPoiRRkQiCqP9Q", false);
// The_product_id from the Frisbii Media backend.
$productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productId);
$hasFreeViews = MeterService::hasFreeViews();
if (!$hasUserBought || !$hasFreeViews) {
    $product = new ProductBase($productId);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the Frisbii Media
    // site and buy.
    $prodToChkOut = new ProductId($productId);
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

##### Page logic
In the Page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**

By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).


```php
<!DOCTYPE html>
<html>
<head>
    <title>New York City Reimagines How It Works</title>
    <!-- import the Frisbii Media Javascript SDK -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js">
    </script>
</head>
<body>
<?php if (!$hasUserBought && !$hasFreeViews) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
        Duke University in environmental management.Now Ms. Spaulding is in New York, where she was recently hired by the city?s Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of the nation?s largest city on its ambitious composting effort.
        In that respect, her job is like thousands of others added in recent years that are slowly changing the day-to-day face of government service. 
    </article>
    <h2>Do you want to read this article ?</h2>
    <span>Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>">Buy now</button>
<?php } else { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
        Duke University in environmental management. Now Ms. Spaulding is in New York, where she was recently hired by the city's
        Sanitation Department. Her duties, naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
        the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
        added in recent years that are slowly changing the day-to-day face of government service.
        There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
        under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
        every city agency now employs more workers than it did in 2014, when the mayor took office.
        The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
        Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
        pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
<?php } ?>
</body>
</html>
```
### Implementation without Frisbii Media SDKs

If you are not able to use one of the existing SDKs you can also implement the metered paywall functionality of the [Frisbii Media API](https://api.plenigo.com) by yourself.

The metered views are counted by the JavaScript SDK and the Frisbii Media System. To block the user on the server side you still have to implement the functionality to show the Paywall if the user has reached his view limit. The exception to this case is if you are using the JavaScript only PayWall.

Preferred way to handle the metered check is via cookie (name: plenig_view). But the JavaScript SDK also adds a parameter to the URL (meteredLimitReached=true). This parameter prevents the user from blocking cookies and cheat the PayWall this way.

The are 2 things you have to do to implement a metered paywall.

1. Decrypt the cookie
2. Get the cookie content

#### Cookie decryption

The metered view cookie is encrypted to prevent **easy manipulation**.

The cookie itself is called plenigo_view.

**Base information:**

* The decrypted data is formatted the following way {value}\|{value}\|{value}...
* The encryption method used is AES/CTR/NoPadding 128 bit with the following initialization vector: _7a134cc376d05cf6bc116e1e53c8801e_. The encrypted byte string is converted to a hexadecimal string.
* Key for encryption is a MD5 hash of the company id (not the company secret!) that can be retrieved from the company administration area.

Decrypting the cookie works as in the pseudo code below:


```java
decrypt("AES", "AES/CTR/NoPadding", Hex.decode(COMPANY_ID_MD5_VALUE), Hex.decode(COOKIE_DATA), Hex.decode(IV_STRING));
```

|Parameters|Description|
|:---------|:----------|
|COMPANY_ID_MD5_VALUE|The MD5 checksum of your company id.|
|COOKIE_DATA|Complete cookie data string.|
|IV_STRING|Always _7a134cc376d05cf6bc116e1e53c8801e_|

#### Cookie content

After the decryption the following string will be represented:
`browserId|activated|freeViews|viewsTaken|limitReached|countOnlyUniqueViews|ignoreSearchEngines|ignoreSocialMedia|articlesVisited|freeViewsAfterLogin|viewsTakenAfterLogin|limitReachedAfterLogin|startTime|meteredPeriod|startWithFirstDay|cookieCreationTime
The values mentioned above will contain the following information`


|Value|Description|
|:----|:----------|
|browserId|unique browser fingerprint|
|activated|flag indicating if metered view is activated at all|
|freeViews|number of free views allowed|
|viewsTaken|number of free views already taken|
|limitReached|flag indicating if free view limit is reached|
|countOnlyUniqueViews|flag indicating to count only unique views|
|ignoreSearchEngines|flag indicating to ignore search engines|
|ignoreSocialMedia|flag indicating to ignore social media|
|articlesVisited|comma separated list containing the already visited articles (in case of the http-addresses these are the first 8 characters of the MD5 sum of the http-address)|
|freeViewsAfterLogin|free views available after login|
|viewsTakenAfterLogin|free views taken after login|
|limitReachedAfterLogin|flag indicating if limit of free views after login is reached|
|startTime|time of the first page hit|
|meteredPeriod|time period metered view counter is running. Possible values (DAY, WEEK, MONTH, YEAR)|
|startWithFirstDay|flag indicating if metered period starts with first visit or at first day / 0 o'clock, etc.|
|cookieCreationTime|time as long indicating representing cookie creating time|

The idea behind metered view functionality is demonstrated with the following pseudo code example:

```javascript
meteredViewInfo = extractMeteredViewCookie();
if (productIsBought)
   showProduct();
else if (meteredViewInfo.isMeteredViewAllowed)
   showProduct();
```

> If there is no plenigo_view cookie available your code should handle it the same way as if metered view is allowed by the user and the counter should start at 0. The Javascript SDK will correct this decision if it is incorrect.

The following checks must be done  if there is a cookie set:

```javascript
checkCookieValidity = function() {
    if (meteredPeriod == 'DAY' && cookieCreationTimeIsTheDayBefore())
        return false;
    else if (meteredPeriod == 'WEEK' && cookieCreationTimeIsTheWeekBefore())
        return false;
    else if (meteredPeriod == 'MONTH' && cookieCreationTimeIsTheMonthBefore())
        return false;
    else if (meteredPeriod == 'YEAR' && cookieCreationTimeIsTheYearBefore())
        return false;
    else
        return true;
}
if (limitReached && userNotLoggedIn() && checkCookieValidity())
   blockAccess();
else if (limitReachedAfterLogin && userLoggedIn() && checkCookieValidity())
   blockAcccess();

```
