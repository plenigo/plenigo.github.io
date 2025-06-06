---
layout: default
title: Checkout with Frisbii Media managed products
permalink: /checkout_plenigo_managed_products_java
---
# Checkout with Frisbii Media managed products 
If the product is managed by Frisbii Media and was configured in the Frisbii Media website, only the product id is required for checkout.

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the Frisbii Media backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

## Workflow Checkout with Frisbii Media managed products 

![General Workflow Checkout with Frisbii Media managed products](/assets/images/ci/Checkout .png)

(A) Create Frisbii Media iFrame: If you want to create a registration and login page click the following link -> [Create Frisbii Media iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with Frisbii Media API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)

(C) optional: Create product page with the help of Frisbii Media product management: If you want to create a product page with the help of Frisbii Media click the following link -> [Create product Page ](https://api.plenigo.com/#!/product/getProduct)
 
(D) Create Frisbii Media iFrame checkout: If you want create a Frisbii Media iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/#encrypted-checkout-string),
                                    [Start Frisbii Media checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

## Checkout including Frisbii Media login
If the product is managed by the Frisbii Media and was configured in the Frisbii Media website, only the product id is required for checkout. 

In the Frisbii Media Backend you can create different types of products:
* Subscription
* Subscription with delivery
* Time Pass
* Single Product


It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. Frisbii Media’s checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

For Java integration you can use  the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `com.plenigo.sdk.models.Product` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| productId     | yes     | string         | The product id from the Frisbii Media Backend |

```java
// 1.Step: Configure the Java SDK: Provide the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company. 
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Set the product id from the Frisbii Media Backend.
String productId = "EgLUrT56328991046641"; 
Product product = new Product(productId);

// 3.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
String snippet = snippetBuilder.build();
```
### Use case 

Use case for implementing checkout with Frisbii Media managed products including Frisbii Media login. 

This is a complete example page where you only need to replace the company ID(e.g.23NuCmdPoiRRkQiCqP9Q ), the secret(e.g.QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the productID (aitnVIz1503443609941). This example assumes you are running in test mode.

#### Server logic
The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/configuration_java).


```java
@Controller
public class Paywall {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode (true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }
    
    public void handlePaywall(HttpServletRequest request, Model model) throws PlenigoException, InvalidDataException {
        String cookieHeader = request.getHeader("Cookie");
        boolean isHasUserBought;
        // 2.Step: The product id  from the Frisbii Media Backend.
        String productId = "aitnVIz1503443609941";
        // 3.Step: This method returns true if the user has already bought the product.
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

In the Page you have to replace the company ID in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```


You will replace COMPANY_ID for the corresponding ID of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 

```html
 <script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```
By clicking on the “Buy now” button the Checkout flow will start.

**Checkout flow from Frisbii Media:**

1. User clicks on "Buy now" button. A login screen will appear, the user has to login in (the checkout flow is smart enough to identify when the user is not, and asks him to do so before).

2. After the login was successful a payment screen will appear. There the user has to choose a payment method for the product.

3. After the payment is successful the user will be redirect to the article page.

```html
<!DOCTYPE html>
<html>
   <!--import the Frisbii Media Javascript SDK
      Let's use concrete values:
      company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
   -->
   <head>
      <title> The title of the article </title>
      <script type="application/javascript"
         src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
      </script>
   </head>
   <body>
      <p>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
         Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from Duke
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
      <p>There are now nearly 294,000 full-time city employees, more than at any point in the city's history. The growth under Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly every city agency now employs more workers than it did in 2014, when the mayor took office.
         The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R. Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn. 
         A report from Moody's earlier this year heralded the diversity in the city's economy, but noted that the city's debt service,
         pension and retiree health care costs were growing rapidly. Increasing headcount brings added costs with it in the future, said Nick Samuels, a senior credit officer and the author of the report.
         Keeping up with that over time will require additional economic growth. Carol Kellermann, the president of the nonprofit Citizens Budget Commission, a fiscal watchdog group, questioned Mr. de Blasio's decision to rapidly grow the city's head count during flush times, saying that it made it more likely that new rounds of painful layoffs could be necessary in the city's future.
         You don't have to keep adding people every year, she said. You could manage what you have and use the staff that you have to run programs. Find a way to do the things you want to do with the existing work force.
      </p>
   </body>
</html>
```


## Checkout without SDKs

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the Frisbii Media Backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

## Failed Payments 

If a payment gets failed form a customer you can create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this.


For Java integration you can use the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class.

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj";  // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId);

// 2.Step: Just create a checkout snippet with a no args build. The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String snippet = snippetBuilder.build();
```
### Use case 

Use case for implementing failed payments. The only thing you have to do is creating a product in the Frisbii Media Backend. Then you have to replace the company ID (e.g.23NuCmdPoiRRkQiCqP9Q) and the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj).This example assumes you are running in test mode.

#### Server logic
The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/configuration_java). 

```java
public class FailedPayments {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode (true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }

    public void createFailedPayment(Model model) throws PlenigoException {
        CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
        String snippet = snippetBuilder.build();
        model.addAttribute("checkoutCode", snippet);
    }
}
```

#### Page logic 
In the Page you have to replace the company ID in the Javascript declaration, e.g. if you have the following link: 

```html
<script type="application/javascript"src="https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js" data-lang="en"> </script>
```

You will replace COMPANY_ID for the corresponding ID of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 

```html
<script type="application/javascript" src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en"> </script>
```

By clicking on the “Buy now” button the Checkout flow will start.

```html
<!DOCTYPE html>
<html>
<head>
    <title> The title of the article  </title>
    <!--
        Let's use concrete values
        company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
    -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<a href="#" onclick="${checkoutCode}> return false;">Buy now</a>';
</body>
</html>
```

## Subscription renewal 

If the product correspond to the subscription renewal, there is a flag in the Product object. This way you can create a subscription renewal button in your site easily setting this flag:


```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company. 
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company. 
PlenigoManager.get().configure(secret, companyId );

// 2.Step: The product id of the product from the Frisbii Media Backend.
Product product = new Product("EgLUrT56328991046641");

// 3.Step: Set the renewal flag.
product.setSubscriptionRenewal(true);

// 4.Step: Creating the checkout snippet:The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
String snippet = snippetBuilder.build();
```
### Use case 

Use case for implementing subscription renewal. The only thing you have to do is creating a product in the Frisbii Media Backend. Then you have to replace the company id(e.g.23NuCmdPoiRRkQiCqP9Q), the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the product id(e.g. aitnVIz1503443609941).This example assumes you are running in test mode.


#### Server logic

The first thing you have to do is configuring the [Java SDK](https://plenigo.github.io/configuration_java). 

```java
public class SubscriptionRenewal {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret (e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g. 23NuCmdPoiRRkQiCqP9Q) from the Frisbii Media backend , in Test Mode (true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }

    public void createFailedPayment(Model model) throws PlenigoException {
        CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
        Product product = new Product("EgLUrT56328991046641");
        product.setSubscriptionRenewal(true);
        String snippet = snippetBuilder.build();
        model.addAttribute("checkoutCode", snippet);
    }
}

```

#### Page logic
In the Page you have to replace the company ID in the Javascript declaration, e.g. if you have the following link: 
**"https://static.plenigo.com/static_resources/javascript/COMPANY_ID/plenigo_sdk.min.js"**

You will replace COMPANY_ID for the corresponding ID of your company(e.g. 23NuCmdPoiRRkQiCqP9Q), after replacing it should look like this: 
**"https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js"**


```html
<!DOCTYPE html>
<html>
<head>
    <title> The title of the article  </title>
    <!--
        Let's use concrete values
        company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
    -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<a href="#" onclick="${checkoutCode}> return false;">Renew your subscription</a>';
</body>
</html>
```


## Override product price 

This is used when you want to replace the regular price of a Frisbii Media managed product for another one of your liking:


```java
// 1.Step: Configure the Java SDK:  Provide the secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company. 
String companyId = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company. 
PlenigoManager.get().configure(secret, companyId );

// 2.Step: The product ID of the product from the Frisbii Media Backend.
String productId = "EgLUrT56328991046641";

// 3.Step: The price of the product.
double price = 25.00; 
Product product = new Product(productId, price);

// 4.Step: Set the override mode.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product).withOverrideMode();
String snippet = snippetBuilder.build();
```
