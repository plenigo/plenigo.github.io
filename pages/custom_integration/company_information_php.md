---
layout: default
title: Company information PHP
permalink: /company_information_php
---

# Company information

Company Service allows you to get structured information about your company's customers in order to show it or use it at your site/app.

* [Get a paginated list of customers ?](https://plenigo.github.io/company_information#get-a-paginated-list-of-customers)
* [Get users by the user ids ?](https://plenigo.github.io/company_information#get-users-by-user-ids)
* [Get failed payments ?](https://plenigo.github.io/company_information#get-failed-payments)
* [Get orders ?](https://plenigo.github.io/company_information#get-orders)
* [Get subscriptions ?](https://plenigo.github.io/company_information#get-subscriptions)

## Get a paginated list of customers 

In order to get a paginated list of customers, you can call the company listing service. It will return a paginated list of company users.

### PHP

For PHP you can use `plenigo\services\CompanyService::getUserList()` method for this purpose:

| $pageNumber     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $pageSize     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company from the plenigo backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company id of your specific company from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Get paginated list of customers
$pageNumber = 0; // First page
$pageSize = 30;  // 30 results per page

try {
     $userList = CompanyService::getUserList($pageNumber, $pageSize);
} catch (PlenigoException e) {
    // Error Handling here
}
```
**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

## Get a paginated list of customers without SDKs

Another possibility to get a paginated list of customers - can be a direct call to our REST API:

* [Get paginated list of customers](https://api.plenigo.com/#!/company/getCompanyUsers)


## Get users by user ids 

In order to get all users by user ids, you can call the company listing service. It will return a paginated list of company users.

### PHP

For PHP integration you can use `plenigo\services\AppManagement#requestAppToken`` method for this purpose:


| name        | description                                                                        |
|:------------|:-----------------------------------------------------------------------------------|
| userList    | List of user ids you want to search for |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company from the plenigo backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company id of your specific company from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2,Step : Get user by ids.
$ids = "XXXC9XXVZX6J, QTYYW6EBDXXV, XXXVBX3SN2EI, RRZ1XX3WRPV5"; // The customer ids from the plenigo backend.
try {
     $userList = CompanyService::getUserList($ids);
} catch (PlenigoException e) {
    // Error Handling here
}
```

**NOTE:** These Customer Ids can be obtained by logging in to our company dashboard, and searching by several filters.

### Get users by user ids without SDKs

Another possibility to get by user ids - can be a direct call to our REST API:

* [Get user by id](https://api.plenigo.com/#!/company/getCompanyUsersFromUserIds)

## Get failed payments  

In order to get a paginated list of failed payments, you can call the company listing service. It will return a paginated list of failed payments.


### PHP

For PHP integration you can use `plenigo\services\CompanyService::getFailedPayments()` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $start     | yes     | string         | The start date of the interval (Format: YYYY-MM-DD) |
| $end     | yes     | string         | The end date of the interval (Format: YYYY-MM-DD) |
| $status     | yes     | string         | The status of the failed payment (FAILED, FIXED, FIXED_MANUALLY) |
| $page     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $size     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |


```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company from the plenigo backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company id of your specific company from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

$start = '2016-01-01'; // The start date
$end = '2016-04-01'; // The end date
$status = 'FAILED';// The status of the payment
$page = 0; // First page
$size = 10; // 10 results per page
try {
     $failedPaymentList = CompanyService::getFailedPayments($start, $end, $status, $pageNumber, $pageSize);
} catch (PlenigoException e) {
    // Error Handling here
}
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

### Get failed payments  without SDKs

Another possibility to get a paginated list of customers - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/company/getCompanyFailedPayments)

## Get orders 

In order to get a paginated list of orders, you can call the company listing service. It will return a paginated list of orders.


### PHP

For PHP integration you can use `plenigo\services\CompanyService::getOrders()` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $start     | yes     | string         | The start date of the interval (Format: YYYY-MM-DD) |
| $end     | yes     | string         | The end date of the interval (Format: YYYY-MM-DD) |
| $status     | yes     | string         | The status of the failed payment (FAILED, FIXED, FIXED_MANUALLY) |
| $page     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $size     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |


`$page` and `$size` parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company from the plenigo backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company id of your specific company from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

$start = '2016-01-01'; // The start date
$end = '2016-04-01'; // The end date
$testMode = FALSE; // The test mode
$page = 0; // First page
$size = 30;  // 30 results per page
try {
     $orderList = CompanyService::getOrders($start, $end , $testMode, $page, $size);
} catch (PlenigoException e) {
    // Error Handling here
}
```

##  Get orders without SDKs

Another possibility to get a paginated list of orders - can be a direct call to our REST API:

* [Get orders](https://api.plenigo.com/#!/order/getOrders)


## Get subscriptions 

In order to get a paginated list of subscriptions, you can call the company listing service. It will return a paginated list of subscriptions.


### PHP

For PHP integration you can use `plenigo\services\CompanyService::getSubscriptions()` method for this purpose:


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $start     | yes     | string         | The start date of the interval (Format: YYYY-MM-DD) |
| $end     | yes     | string         | The end date of the interval (Format: YYYY-MM-DD) |
| $status     | yes     | string         | The status of the failed payment (FAILED, FIXED, FIXED_MANUALLY) |
| $page     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $size     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |

`$page` and `$size` parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company id (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company from the plenigo backend.
$companyId = '23NuCmdPoiRRkQiCqP9Q';  // The company id of your specific company from the plenigo backend.
\plenigo\PlenigoManager::configure($secret, $companyId);

$start = '2016-01-01'; // The start date
$end = '2016-04-01'; // The end date
$testMode = FALSE; // The test mode
$page = 0; // First page
$size = 30;  // 30 results per page

try {
     $subscriptionList = CompanyService::getSubscriptions($start, $end, $testMode, $pageNumber, $pageSize);
} catch (PlenigoException e) {
    // Error Handling here
}
```
**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

## Get subscriptions without SDKs

Another possibility to get a paginated list of subscriptions - can be a direct call to our REST API:

* [Get subscriptions ](https://api.plenigo.com/#!/subscription/getSubscriptions)
