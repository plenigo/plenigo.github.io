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
$customerID = 4711; // you're working with external customers, this ist your unique ID of this customer
$order = [
  ['productId' => 'P_amrSQ6154783308456', // not optional
    'title' => 'some blue shoes', // optional, will be displayed on invoice
    'description' => 'Size 8, special design', // optional, will be displayed on ivoice
    'amount' => 4 // optional, defaults to 1
  ],
];
$customerCountry = 'DE'; // required. Sets country of user to calculate taxes. If user has an address in plenigo, this address is used
$paymentMethod = 'INVOICE'; // optional, defaults to 'PREFERRED'
$useMerchantCustomerId = true; // optional, defaults to false
$ipAddress = '1.1.1.1'; // optional, defaults to $_SERVER['HTTP_CLIENT_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']

/**
 * @param string $customerId ID of plenigo-customer, or external customer, if $useMerchantCustomerId is set to true
 * @param array $order
 * @param string $customerCountry ISO-CODE of country 'DE' for example
 * @param string $paymentMethod
 * @param bool $useMerchantCustomerId
 * @param string $ipAddress IP-Address of the customer
 * @return string OrderID
 * @throws RegistrationException | PlenigoException
 */
$orderID = \plenigo\services\CheckoutService::purchase($customerID, $order, $customerCountry, $paymentMethod, $useMerchantCustomerId, $ipAddress);
```
