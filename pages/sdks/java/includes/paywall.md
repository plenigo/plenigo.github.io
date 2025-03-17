---
layout: default
title: Paywall
permalink: /paywall_java
---
# Paywall
Paywalls are systems designed to monetize online and other digital information by preventing visitors from accessing web sites and similar content providers without having a paid subscription.  Online news and sports web sites are the most frequent users of paywalls, with some sites implementing hard paywalls while others deploy soft paywalls. A hard paywall's content restrictions are much more stringent than a soft paywall, allowing either no access or minimal access to free content.  A soft paywall(metered views), on the other hand, provides significant access to free content as a means of encouraging users to subscribe for access to premium content.


You have to choose between three different paywall types:
* [Hide content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)
* [Hide content by default](https://plenigo.github.io/sdks/javascript#hide-content-by-default)
* [Load content afterwards](https://plenigo.github.io/sdks/javascript#hide-content-afterwards)

## Server side Paywall

**Note: The first thing you have to do is enabling the paywall in the Frisbii Media backend (Paywall->Settings).** 


After you have done this you can continue with the following step.

1. Check if the user has bought product
2. User has bought product -> Show article
3. User has not bought product -> Show paywall 

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

The paywall in this example looks like this:

![Enable paywall](/assets/images/ci/demo_paywall.png)

#### Server logic

**Prerequisites**

1. Configure the [Java SDK](https://plenigo.github.io/configuration_java).

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
        // The product id  from the Frisbii Media Backend.
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


In the page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 

```javascript 
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"> </script>
```
You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 

```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-disable-metered="true"> </script>
```

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).

```html
<!DOCTYPE html>
<html>
   <!--
      Let's use concrete values:
      company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
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

## Server Side Metered Paywall

A soft paywall(metered paywall)  provides significant access to free content as a means of encouraging users to subscribe for access to premium content.

**Note: The first thing you have to do is enabling the paywall in the Frisbii Media Backend (Paywall-> Metered Settings).** 

After you have done this you can continue with the following step.

1. Check if the user has free views for the product
2. User has free views -> Show article
3. User has no free views -> Show paywall 

### Workflow metered paywall

![Metered views](/assets/images/ci/PaywallEnabled .png)

With SDKs

(A) + (B): [Java SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)

Without Frisbii Media SDKs

(A) + (B): [Implementation without SDK](https://api.plenigo.com/metered_paywall.md#!/paywall/isPaywallEnabled)


The idea behind metered view functionality is demonstrated with the following pseudo code examples.


```java
String cookieHeader = request.getHeader("Cookie");
// The_product_id from the Frisbii Media Backend.
String productId = "EgLUrT56328991046641";
// This method returns true if the user has already bought the product.
boolean hasfreeViews = UserService.hasUserBought(productId, cookieHeader);
if (hasFreeViews) {
    showArticle();
} else {
    showPaywall();
}
```

### Use case 

This is a complete example page where you only need to insert your data.


#### Server logic

**Prerequisites**
1. Configure the [Java SDK](https://plenigo.github.io/configuration_java).

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
            // The product id  from the Frisbii Media Backend.
            String productId = "aitnVIz1503443609941";
            // This method returns true if the user has already bought the product.
            isHasUserBought = UserService.hasUserBought(productId, cookieHeader);
            model.addAttribute("showPaywall", false);
           if (isHasUserBought) {
                      model.addAttribute("userPaid", true);
                      model.addAttribute("showPaywall", false);
                  } else {
                      model.addAttribute("userPaid", false);
                      boolean hasFreeViews = MeterService.hasFreeViews(cookieHeader, null);
                      if (hasFreeViews) {
                          model.addAttribute("showPaywall", false);
                      } else {
                          Product product = new Product(productId);
                          CheckoutSnippetBuilder builder = new CheckoutSnippetBuilder(product);
                          String checkoutCode = builder.build();
                          model.addAttribute("checkoutCode", checkoutCode);
                          model.addAttribute("showPaywall", true);
                      }
                  }
        }
```

#### Page logic


In the page you have to replace the company id in the Javascript declaration, e.g. if you have the following link: 

```javascript 
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-disable-metered="true"> </script>
```
You will replace COMPANY_ID for the corresponding id of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 

```javascript
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-disable-metered="true"> </script>
```

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear(If the user has not paid the product). There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page (in this example the user can read the whole article).

```html
<!DOCTYPE html>
<html>
   <!--
      Let's use concrete values:
      company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
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
