---
layout: default
title: manage_user_access_rights
permalink: /manage_user_access_rights
---
# Manage user access rights

Manage user access rights allows you to add access right for products to a user.

* [Grant access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Grant user product access to an existing user with SDKs

Grant a user access to one or multiple products.

### Java

### PHP

For PHP integration you can use `plenigo\services\AccessService::grantUserAccess` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | string         | The external customer id |
| $startTime     | yes     | string         | The start time |
| $endTime     | yes     | string         | The end time |
| $products     | yes     | string         | The product ids |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Grant user access.
$customerId = 'WMAQRX4EQ7R5'; // The customer id from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer id.
$startTime = '2019-11-06'; // The start date.
$endTime = '2099-11-06'; // The end time.
$productIds = 'EgLUrT56328991046641'; // The product ids from the plenigo backend.
AccessService::grantUserAccess($customerId, $useExternalCustomerId, $startTime, $endTime, array($productIds));
```

#### Use case PHP

Use case for adding a product access to an existing user.

#### Server logic

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;
use plenigo\services\CheckoutService;

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");

// 2.Step: Grant user access for a product.
$customerId = 'WMAQRX4EQ7R5'; // The customer id from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer id.
$startTime = '2019-11-06'; // The start time.
$endTime = '2019-11-09'; // The end time.
$productIds = 'EgLUrT56328991046641'; // The product ids from the plenigo backend.
AccessService::grantUserAccess($customerId, $useExternalCustomerId, $startTime, $endTime, array($productIds));

// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productIds);
if ($hasUserBought === FALSE) {
    $prodToChkOut = new ProductId($productIds);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the plenigo
    // site and buy.
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```
#### Page logic

```html
<!DOCTYPE html>
<html>
<head>
    <title> New York City Reimagines How It Works  </title>
    <!-- import the Plenigo Javascript SDK -->
    <script type="application/javascript"
            src="https://static.s-devops.com/static_resources/javascript/6hpZhjEgxMa9dAJFDxab/plenigo_sdk.min.js" data-lang="en">
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
## Add a product access to an existing user without SDKs

Another possibility to allow a third party access to information - can be a direct call to our REST API:

* [Grant access rights](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Remove access rights with SDKs

Remove user' s access to one or multiple products.

### Java

#### Use case Java

#### Server logic

#### Page logic

### PHP

For PHP integration you can use the `plenigo\services\AccessService::removeUserAccess` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | boolean         | Flag indicating external customer id|
| $productIds     | yes     | string         |The product ids |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Remove user access.
$customerId = 'WMAQRX4EQ7R5'; // The customer id from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer id.
$productIds = 'EgLUrT56328991046641'; // The product ids from the plenigo backend.
AccessService::removeUserAccess($customerId, $useExternalCustomerId, array($productIds));
```
#### Use case PHP

Use case for removing user access to one or multiple products.
 
#### Server logic

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Remove user access.
$customerId = 'WMAQRX4EQ7R5'; // The customer id from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer id.
$productIds = 'EgLUrT56328991046641'; // The product ids from the plenigo backend.
AccessService::removeUserAccess($customerId, $useExternalCustomerId, array($productIds));

// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productIds);
if ($hasUserBought === FALSE) {
    $prodToChkOut = new ProductId($productIds);
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the plenigo
    // site and buy.
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

#### Page logic  

```html

```

## Remove access rights without SDKs

Another possibility to remove access rights - can be a direct call to our REST API:

* [Remove access rights ](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)