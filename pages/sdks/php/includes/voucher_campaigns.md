### Create loyalty campaigns by giving vouchers as giveaways

As a company if you want to give free access to customers you can generate a voucher campaign (by creating voucher Ids that can be redeemed as a free purchase of a product.

Vouchers are numbered and limited in nature (up to 10 thousand per channel) but if you are looking for an unlimited free giveaway, you can create and allow purchase of a free (as in $0-. price) product.

#### Campaigns

Campaigns are a set of channels with an amount of vouchers generated for each channel. Campaigns contain a _name_ and a _date range_ when that campaign will be active. After the expiration date or before the start date, the vouchers will not be able to be redeemed.
Some examples:

* "YouTube Channel push campaign"
* "New product campaign"
* "New advertising push"
* "New branding acquisition"

#### Channels

Channels are a way to funnel your customers in order to measure statistics on the redemption of vouchers. You can name the channel anything you want and assign that channel to a product when creating the campaign.
Some examples:

* "Facebook Group"
* "Newsletter giveaway"
* "Mobile users"
* "People at the mall in downtown New Jersey"

#### Creating a voucher campaign

A voucher can be used to put a "tag" on a free product purchase. Also, if you only provide the purchase though Voucher Redemption, it means that when the voucher Ids are redeemed, then there is no more purchases left for the product.

You can create a campaign programmatically by calling the `VoucherService::generateCampaign()` method with these parameters:

|Parameter|Required|Value type|Description|
|:--------|:-------|: --------|:----------|
| $name     | no     | string         | The name you wish to give this campaign. Campaigns can have several channels (user acquisition funnels) |
| $productId     | yes     | string         | (default: 1, max: 10000) The amount of vouchers to generate for each channel, will always be 1 for SINGLE voucher types. |
| $startDate     | no     | string         | The start date of the campaign in the following format: YYYY-MM-DD. |
| $expirationDate     | no     | string         | The expiration date of the campaign in the following format: YYYY-MM-DD. |
| $type     | optional     | string         |(default: 'SINGLE') the voucher type, it can be 'SINGLE' or 'MULTI' |
| $amount     | optional     | string         | (default: 1, max: 10000) The amount of vouchers to generate for each channel, will always be 1 for SINGLE voucher types. |
| $channels     | optional     | array(string)         | Array of channel names (string[]) |

```php
<?php
$name = "New e-book release campaign"; // The name of the campaign
$prodId = "my_product_id"; // You (free) product id
$funnels = array(
  "YouTube channel users",
  "Facebook lurkers",
  "Newsletter readers"
); // Channel names
$amount = 100; // vouchers per channel
$result = VoucherService::generateCampaign($name, $prodId, '2001-01-01', '2090-12-31', "MULTI", 100, $funnels);

// $result of type \plenigo\models\CampaignResponse
$channels = $result->getChannelVouchers();
$channelYT = $channels[0]; // "Youtube channel users" object of type \plenigo\models\ChannelVouchers
$ytVouchers = $channelYT->getIds(); // array of strings with 100 voucher ids

```

#### Redeeming a voucher

Once you got the voucher code you can redeem it using the `CheckoutService::redeemVoucher()` with these parameters:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $voucherCode     | yes     | string         | The voucher code you got when creating the campaign |
| $customerId     | yes     | string         | The customer id you can get from the `UserService::getCustomerInfo()` method. |
| $externalUserid     | no     | boolean         | TRUE to specify you are using [[external user management|UserManagement]] |

> IMPORTANT: as with all the methods in the SDK, errors are handled as Exceptions. This method will return TRUE if the purchase was successful

```php
<?php
$customerId = "my_customer_id"; // You can obtain it from the currently logged in user or external customer management
$result = CheckoutService::redeemVoucher($ytVouchers[0], $customerId, false);

if($result){
  // Profit!
}

```

#### 'Buying' a free product

Similarly if you want to allow the purchase of the free product previously assigned to a campaign, you can do so by using the `CheckoutService::buyFreeProduct()` with these parameters:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $productId     | yes     | string         | The product id of a free product |
| $customerId     | yes     | string         | The customer id you can get from the `UserService::getCustomerInfo()` method. |
| $externalUserid     | no     | boolean         | TRUE to specify you are using [[external user management|UserManagement]] |

> IMPORTANT: as with all the methods in the SDK, errors are handled as Exceptions. This method will return TRUE if the purchase was successful

```php
<?php
$prodId = "my_product_id"; // Your free product ID
$customerId = "my_customer_id"; // You can obtain it from the currently logged in user or external customer management
$result = CheckoutService::buyFreeProduct($prodId, $customerId, false);

if($result){
  // Profit!
}
```