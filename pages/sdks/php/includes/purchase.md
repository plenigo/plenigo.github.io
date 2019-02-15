---
layout: default
title: API PURCHASE PHP
permalink: /api_purchase_php
---

### Handle purchases via API

Some of you want to handle the checkout process in your very own look and feel. Some others want to start a purchase to a given time - not real time. From now on you can use the purchase method, to let your customer buy some product.

#### purchase, external customer
If you're working with external customers, use this example:

```php

$customerID = 4711; // you're working with external customers, thos ist your unique ID of this customer
$order = [
  ['product_id' => 'P_amrSQ6154783308456', // not optional
    'title' => 'some blue shoes', // optional, will be displayed on invoice
    'description' => 'Size 8, special design', // optional, will be displayed on ivoice
    'amount' => 4 // optional, defaults to 1
  ],
];
$paymentMethod = 'INVOICE'; // optional, defaults to 'PREFFERED'
$useMerchantCustomerId = true; // optional, defaults to false

/**
 * @param string $customerId ID of plenigo-customer, or external customer, if $useMerchantCustomerId is set to true
 * @param array $order
 * @param string $paymentMethod
 * @param bool $useMerchantCustomerId
 * @return string OrderID
 * @throws PlenigoException
 */
$orderID = \plenigo\services\CheckoutService::purchase($customerID, $order, $paymentMethod, $useMerchantCustomerId);
```
