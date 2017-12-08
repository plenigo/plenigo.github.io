---
layout: default
title: voucher campaigns
permalink: /voucher_campaigns
---
# Voucher Campaigns

It is possible to create vouchers for specific customer.

* [Create loyalty campaigns by giving vouchers as giveaways ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Creating a Voucher ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Redeeming a voucher ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* ['Buying' a free product ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Create loyalty campaigns by giving vouchers as giveaways

As a company if you want to give free access to customers you can generate a voucher campaign (by creating voucher Ids that can be redeemed as a free purchase of a product.

Vouchers are numbered and limited in nature (up to 10 thousand per channel) but if you are looking for an unlimited free giveaway, you can create and allow purchase of a free (as in $0-. price) product.

### Campaigns 

Campaigns are a set of channels with an amount of vouchers generated for each channel. Campaigns contain a name and a date range when that campaign will be active. After the expiration date or before the start date, the vouchers will not be able to be redeemed. Some examples:

* “YouTube Channel push campaign”
* “New product campaign”
* “New advertising push”
* “New branding acquisition”

### Channels

Channels are a way to funnel your customers in order to measure statistics on the redemption of vouchers. You can name the channel anything you want and assign that channel to a product when creating the campaign. Some examples:

* “Facebook Group”
* “Newsletter giveaway”
* “Mobile users”
* “People at the mall in downtown New Jersey

## Creating a voucher with SDKs

A voucher can be used to put a “tag” on a free product purchase. Also, if you only provide the purchase though Voucher Redemption, it means that when the voucher Ids are redeemed, then there is no more purchases left for the product.

### Java

SDK coden

### PHP

You can create a campaign programmatically by calling the `VoucherService::generateCampaign()` method with these parameters:

|Parameter|Required|Value type|Description|
|:--------|:-------|: --------|:----------|
| $name     | no     | string         | The name you wish to give this campaign. Campaigns can have several channels (user acquisition funnels) |
| $productId     | yes     | string         | The product id |
| $startDate     | no     | string         | The start date of the campaign in the following format: YYYY-MM-DD. |
| $expirationDate     | no     | string         | The expiration date of the campaign in the following format: YYYY-MM-DD. |
| $type     | optional     | string         |(default: 'SINGLE') the voucher type, it can be 'SINGLE' or 'MULTI' |
| $amount     | optional     | string         | (default: 1, max: 10000) The amount of vouchers to generate for each channel, will always be 1 for SINGLE voucher types. |
| $channels     | optional     | array(string)         | Array of channel names (string[]) |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Creating the voucher.
$name = "Test campaign "; // The name of the campaign.
$prodId = "EgLUrT56328991046641";  // The free product id. (Price of the product 0.00).                             
$startDate = "2001-01-01";  // The start date.
$expirationDate = "2090-12-31"; // The expiration date.
$type = 'MULTI';  // The voucher type, it can be 'SINGLE' or 'MULTI'.
$amount = 100; // The amount of the voucher.
$funnels = array(
  "Test channel 1",
  "Test channel 2",
  "Test channel 3"
); 
$amount = 100; // Vouchers per channel.
$result = VoucherService::generateCampaign($name, $prodId, $startDate, $expirationDate, $type, $amount, $funnels);

// 3.Step: Get channel ids
$channels = $result->getChannelVouchers();
$channelYT = $channels[0]; // Test channel 1
$ytVouchers = $channelYT->getIds(); // Array of strings with 100 voucher ids.
```

## Creating a voucher without SDKs

Another possibility to create a voucher - can be a direct call to our REST API:

* [Create a voucher](https://api.plenigo.com/#!/voucher/createVoucher)

## Redeeming a voucher with SDKs

### Java

SDK coden

### PHP

Once you got the voucher code you can redeem it using the `CheckoutService::redeemVoucher()` with these parameters:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $voucherCode     | yes     | string         | The voucher code you got when creating the campaign |
| $customerId     | yes     | string         | The customer id  |
| $externalUserId     | no     | boolean         | TRUE to specify you are using [[external user management |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g.QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step : Redeem the voucher.
$voucherCode = "X1XZ-12DF-74ZI"; // The voucher code from the plenigo backend.
$customerId = "EgLUrT56328991046641"; // The customer id from the plenigo backend.
$useExternalUserId = false; // The external user id.
$result = CheckoutService::redeemVoucher($voucherCode, $customerId, $useExternalUserId);
```

#### Use case Java

Use case for creating and redeeming a voucher.

#### Server logic 

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;
use plenigo\services\CheckoutService;

// 1.Step: Configure the PHP SDK. The secret (e.g.QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");

// 2.Step: Redeem the voucher.
$productId = "EgLUrT56328991046641";
$voucherCode = "R7R2-ZLJX-LDKD"; // The voucher code from the plenigo backend.
$customerId = "YDZKV7DPBH0Z"; // The customer id from the plenigo backend.
$externalUserId = false; // The external user id.
$result = CheckoutService::redeemVoucher($voucherCode, $customerId, $externalUserId);

// This method returns true if the user has already bought the product.
$hasUserBought = UserService::hasUserBought($productId);
if ($hasUserBought === FALSE) {
    // Since he has not bought the product, we need to build the
    // checkout snippet so that he can do the flow on the plenigo
    // site and buy.
    $prodToChkOut = new ProductId($productId);
    $snippet = (new CheckoutSnippetBuilder($prodToChkOut))->build();
}
?>
```

#### Page logic

```html

```

## ´Buying´ a free product with SDKs

Similarly if you want to allow the purchase of the free product previously assigned to a campaign, you can do so by using the `CheckoutService::buyFreeProduct()` with these parameters:

### Java

#### Use case Java

#### Server logic

#### Page logic

### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id |
| $customerId     | yes     | string         | The customer id |
| $externalUserId     | yes     | boolean         | The external user id |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj';  // The secret key of your specific company.
$companyId = '12NuCmdZUTRRkQiCqP2Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: 'Buying' a free product.
$productId = "EgLUrT56328991046641"; // The free product id. (Price of the product 0.00)
$customerId = "12345"; // You can obtain it from the currently logged in user or external customer management.
$useExternalUserId = false; // The external user id.
$result = CheckoutService::buyFreeProduct($productId, $customerId, $useExternalUserId);
```

#### Use case PHP

Use case for implementing 'Buying' a free product. 

#### Server logic

```php
<?php
require_once __DIR__ . '/plenigo/Plenigo.php';

use plenigo\builders\CheckoutSnippetBuilder;
use plenigo\models\ProductId;
use plenigo\services\UserService;
use plenigo\services\CheckoutService;
use plenigo\services\VoucherService;

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:12NuCmdZUTRRkQiCqP2Q).
\plenigo\PlenigoManager::configure("QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj", "12NuCmdZUTRRkQiCqP2Q");

// 2.Step: Generate and redeem the voucher.
$name = "Test campaign"; // The name of the campaign.
$productId = "EgLUrT56328991046641"; // The free product id. (Price of the product 0.00).
$startDate = '2017-11-03'; // The start date.
$expirationDate = "2090-12-31"; // The expiration date.
$type = 'SINGLE'; // The voucher type, it can be 'SINGLE' or 'MULTI'.
$amount = 100; // The amount of the voucher.
$funnels = array(
    "Test channel 1",
    "Test channel 2",
    "Test channel 3"
);

// 3.Step: Redeem a voucher.
$result = VoucherService::generateCampaign($name, $productId, $startDate , $expirationDate, $type, $amount, $funnels);
$channels = $result->getChannelVouchers(); 
$channelYT = $channels[0]; // Test channel 1.
$ytVouchers = $channelYT->getIds(); // Array of strings with 100 voucher ids.
$customerId = "12345";  
$useExternalUserId = true; // The external user id.
$test = CheckoutService::redeemVoucher($ytVouchers[0], $customerId, true);
$hasUserBought = UserService::hasUserBought($productId);

// This method returns true if the user has already bought the product.
if ($hasUserBought === FALSE) {
    $prodToChkOut = new ProductId($productId);
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
    <!--
         Let's use concrete values
         company id = e.g. "12NuCmdZUTRRkQiCqP2Q"
    -->    <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/12NuCmdZUTRRkQiCqP2Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<?php if (!$hasUserBought ) { ?>
    <article>After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
            Leanne Spaulding landed a job at a Virginia-based trade association, working her way to a master's degree from
            Duke University in environmental management.
    </article>
    <h2> Do you want to read this article ?</h2>
    <span> Please buy a subscription</span>
    <button onclick="<?php echo $snippet ?>"> Buy now</button>
<?php } else { ?>
    <article>
            After serving a tour in the sticky rice and fruit fields of northeast Thailand for the Peace Corps,
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
            pre-recession peak, a costly investment that is not without risk: the city could be vulnerable to an economic downturn.
    </article>
<?php } ?>
</body>
</html>
```

## 'Buying' a free product without SDKs

Another possibility to create a voucher - can be a direct call to our REST API:

* ['Buying' a free product](https://api.plenigo.com/#!/checkout/checkoutFreeProduct)