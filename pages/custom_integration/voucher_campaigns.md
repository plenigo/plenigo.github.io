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


## ´Buying´ a free product with SDKs

Similarly if you want to allow the purchase of the free product previously assigned to a campaign, you can do so by using the `CheckoutService::buyFreeProduct()` with these parameters:


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

## 'Buying' a free product without SDKs

Another possibility to create a voucher - can be a direct call to our REST API:

* ['Buying' a free product](https://api.plenigo.com/#!/checkout/checkoutFreeProduct)