---
layout: default
title: Checkout with external products
permalink: /checkout_external_products
---
# Checkout with external products 
If the product is not managed by the plenigo, you have to specify more information such as tax, description, currency, etc..

It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. 
Plenigo’s checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)

## Workflow Checkout with external products 

![Workflow external products ](/assets/images/ci/CheckoutExternProduct.png)

(A) Create plenigo iFrame: If you want to create a registration and login page click the following link -> [Create plenigo iFrame](https://plenigo.github.io/sdks/javascript#login---open-the-plenigo-login-window)

(B) Check with plenigo API: If you want to check if the user has bought the product click the following link -> [Has user bought ](https://api.plenigo.com/#!/user/hasBoughtProduct)
 
(C) Create plenigo iFrame checkout: If you want create a plenigo iFrame checkout click the following link -> [Encrpyt checkout String ](https://plenigo.github.io/custom_integration#encrypted-checkout-string),
                                    [Start plenigo checkout ](https://plenigo.github.io/sdks/javascript#checkout---start-a-plenigo-checkout)

## Checkout with SDKs  

### Java     

For Java integration you can use the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the com.plenigo.sdk.models.Product class with the required information.


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| price     | yes     | double         | The price of the product |
| description     | yes     | string         | The description of the product |
| id       | yes   | string        | The id of the product
| currency    | yes     | string         | The currency of the product |
| taxPercentage       | yes   | double        | The tax percentage of the product |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj"; // // The secret key of your specific company. 
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // // The company id of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Set the product.
double price = 12.99; // The price of the product.
String description = "Test"; // The description of the product.
String productId = "123456"; // The product id of the product.
String currency = "USD"; // The currency.
Product product = new Product(price, description, id, currency, TaxType.DOWNLOAD);
    
// 3.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
String snippet = snippetBuilder.build();
```
#### Use case Java

Use case for implementing checkout with external managed products.

##### Server logic

```java
@Controller
public class Paywall {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
        PlenigoManager.get().configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");
    }
    
    public void handlePaywall(HttpServletRequest request, Model model) throws PlenigoException, InvalidDataException {
        String cookieHeader = request.getHeader("Cookie");
        boolean isHasUserBought;
        // 2.Step: The product id  from the plenigo backend.
        String productId = "EgLUrT56328991046641";
        // 3.Step: This method returns true if the user has already bought the product.
        isHasUserBought = UserService.hasUserBought(productId, cookieHeader);
        model.addAttribute("showPaywall", false);
        if (!isHasUserBought) {
            double price = 12.99; // The price of the product.
            String description = "Test"; // The description of the product.
            String productId = "123456"; // The product id of the product.
            String currency = "USD"; // The currency.
            // Price of the product, description, id, currency and  the tax percentage (28% in this case) of tax that should be calculated for this product
            Product product = new Product(price, description, id, currency, TaxType.DOWNLOAD);
            // Since he has not bought the product, we need to build the
            // checkout snippet so that he can do the flow on the plenigo site and buy.
            CheckoutSnippetBuilder builder = new CheckoutSnippetBuilder(product);
            String checkoutCode = builder.build();
            model.addAttribute("checkoutCode", checkoutCode);
            model.addAttribute("showPaywall", true);
        }
    }
}
```

##### Page logic

```html
<!DOCTYPE html>
<html>
   <!--
      Let's use concrete values:
      company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
   -->
   <head>
      <title>New York City Reimagines How It Works</title>
      <script type="application/javascript"
         src="https://static.plenigo.com/static_resources/javascript/12NuCmdZUTRRkQiCqP2Q/plenigo_sdk.min.js"
         data-disable-metered="true"></script>
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

### PHP

For PHP integration you can use the `\plenigo\builders\CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `\plenigo\models\ProductBase` class with the required information.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $id       | yes   | string        | The id of the product
| $productTitle    | yes     | string         | The product title of the product |
| $price       | yes   | double        | The price of the product |
| $currency       | yes   | string        | The currency of the product |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company. 
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Set the product.
$productId = '12345'; // The product id of the product.
$productTitle = 'test'; // The title of the product.
$price = 15.00;  // The price of the product.
$currency = 'USD'; // The currency.
$product = new ProductBase($productId, $productTitle, $price, $currency);

// 3.Step: Type of the product that defines the taxes.
$product->setType(ProductBase::TYPE_EBOOK);

// 4.Step: Creating the checkout sinppet for this product.
$checkout = new CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
```
#### Use case PHP

Use case for implementing checkout with external managed products.

##### Server logic

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\models\ProductBase;
use plenigo\services\UserService;
use plenigo\builders\CheckoutSnippetBuilder;

// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q", true, "https://api.s-devops.com", "http://www.s-devops.com");

// 2.Step: Set the product.
// Creating the product ($productId, $productTitle, $price, $currency)
$product = new ProductBase('123456', 'the best product',15.00,'USD');

// 3.Step: This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($product->getId());
if ($hasUserBought === FALSE) {
    
//  4.Step: Type of the product that defines the taxes.
$product->setType(ProductBase::TYPE_EBOOK);

//  5.Step: Creating the checkout snippet for this product.
$checkout = new CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
}
?>
```

##### Page logic

```html
<!DOCTYPE html>
<html>
<head>
    <title> New York City Reimagines How It Works  </title>
     <!--
         Let's use concrete values
         company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
     -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/12NuCmdZUTRRkQiCqP2Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<?php if (!$hasUserBought ) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
        Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
        Duke University in environmental management.</p>
    </article>
    <h2> Do you want to read this article ?</h2>
    <span> Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>"> Buy now</button>
<?php } else { ?>
    <article>
        <p>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
            Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master?s degree from
            Duke University in environmental management.
            Now Ms. Spaulding is in New York, where she was recently hired by the city's Sanitation Department. Her duties,
            naturally, involve garbage, but not in the traditional sense: Ms. Spaulding is trying to help sell residents of
            the nation's largest city on its ambitious composting effort. In that respect, her job is like thousands of others
            added in recent years that are slowly changing the day-to-day face of government service.
            There are now nearly 294,000 full-time city employees, more than at any point in the city?s history. The growth
            under  Mayor Bill de Blasio comes at a time of record revenues in a booming city, and has been across the board; nearly
            every city agency now employs more workers than it did in 2014, when the mayor took office.
            The hiring has allowed the de Blasio administration to restaff agencies that were cut back by Mayor Michael R.
            Bloomberg after the economic downturn of 2008. But Mr. de Blasio has gone far further, expanding the work force beyond its
            pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic
            downturn.</p>
    </article>
<?php } ?>
</body>
</html>
```

## Checkout without SDKs

If you are using a programming language that is not supported by one of our SDKs and the pre generated checkout string from the plenigo backend sufficient enough you must create the checkout string dynamically. [Enrypt Checkout String](https://plenigo.github.io/custom_integration#encrypted-checkout-string)


## Failed Payments with SDKs

If you want to create a button/link to the “Failed Payments” listing for the customer you can do it by creating a special product object like this.


### Java

For Java integration you can use  the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class for this purpose:

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company.
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // The company id of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Just create a checkout snippet with a no args build. The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String snippet = snippetBuilder.build();
```
#### Use case Java

Use case for implementing failed payments.

#### Server logic
```java
public class FailedPayments {

    @PostConstruct
    public void config() {
        // Configure the Java SDK (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
        PlenigoManager.get().configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");
    }

    public void createFailedPayment(Model model) throws PlenigoException {
        CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
        String snippet = snippetBuilder.build();
        model.addAttribute("checkoutCode", snippet);
    }
}
```

#### Page logic 

```html
<!DOCTYPE html>
<html>
<head>
    <title>Title of the product </title>
    <!--
        Let's use concrete values
        company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
    -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/12NuCmdZUTRRkQiCqP2Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<a href="#"  onclick="${checkoutCode}> return false;">Renew your subscription</a>';
</body>
</html>
```

### PHP

For PHP integration you can use the `\plenigo\builders\CheckoutSnippetBuilder` class, you can create snippets easily by filling out the `\plenigo\models\ProductBase` class with the required information.

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK.
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Creating special product object for "Failed Payments".
$product = ProductBase::buildFailedPaymentProduct();
    
// 3.Step: Creating the checkout snippet.
$checkout = new CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();

// 4.Step: Now we can use this snippet in a link or button.
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```
#### Use case PHP

Use case for implementing failed payments.

#### Server logic

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductBase;

// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");

// 2.Step: Creating special product object for "Failed Payments".
$product = ProductBase::buildFailedPaymentProduct();

// 3.Step: Creating the checkout snippet for this product.The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE').
$checkout = new CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
?>
```
#### Page logic

```html
<!DOCTYPE html>
<html>
<head>
    <title> Title of the product </title>
    <!--
        Let's use concrete values
        company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
    -->
    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/12NuCmdZUTRRkQiCqP2Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<a href="#" onclick="<?php echo $plenigoCheckoutCode ?> return false;">Renew your subscription</a>';
</body>
</html>
```