---
layout: default
title: Company information
permalink: /company_information
---

# Company information

Company Service allows you to get structured information about your company's customers in order to show it or use it at your site/app.

* [Get a paginated list of customers ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get users by the user ids ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get orders ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get failed payments ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get incoming payments ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get invoices ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Get a paginated list of customers

In order to get a paginated list of customers, you can call the company listing service. It will return a paginated list of company users.

### Implementation with SDKs

#### Java

For Java you can use `com.plenigo.sdk.services.CompanyService#getUserList()` method, which requires a `com.plenigo.sdk.models#PageRequest` object  and returns a `com.plenigo.sdk.models.CompanyUser` object.

| name       | description                                                                   |
|:-----------|:------------------------------------------------------------------------------|
| pageRequest| It is a `com.plenigo.sdk.models#PageRequest` object                     |

```java
int pageNumber = 0; // First page
int pageSize = 10; // 10 results per page
PageRequest pageRequest = new PageRequest(pageNumber, pageSize):
ElementList<CompanyUser> list = CompanyService.getUserList(pageRequest);
```

#### PHP

For PHP you can use `com.plenigo.sdk.services.CompanyService::getUserList()` method, which returns a `\plenigo\models\CompanyUser` object.

| $pageNumber     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $pageSize     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |

```php
<?php
$pageNumber = 0; // First page
$pageSize = 30;  // 30 results per page

try {
     $userList = CompanyService::getUserList($pageNumber, $pageSize);
} catch (PlenigoException e) {
    // Error Handling here
}
```
**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

### Implementation without SDKs

Another possibility to get a paginated list of customers - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/company/getCompanyUsers)


## Get users by user ids

In order to get all users by user ids, you can call the company listing service. It will return a paginated list of company users.

### Implementation with SDKs

#### Java 

For Java you can use `com.plenigo.sdk.services.CompanyService#getUserList()` method, which returns a `com.plenigo.sdk.models.CompanyUser` object.


| name        | description                                                                        |
|:------------|:-----------------------------------------------------------------------------------|
| userList    | List of user ids you want to search for |

```java
String userIds [] = {"XXXC9XXVZX6J", "QTYYW6EBDXXV", "XXXVBX3SN2EI", "RRZ1XX3WRPV5"};// The customer ids
List  = new ArrayList(Arrays.asList(userIds));
List<CompanyUser> list = CompanyService.getUserList(list);
```
#### PHP

For PHP you can use `com.plenigo.sdk.services.CompanyService::getUserList()` method, which returns a `\plenigo\models\CompanyUser` object.


| name        | description                                                                        |
|:------------|:-----------------------------------------------------------------------------------|
| userList    | List of user ids you want to search for |

```php
<?php
$ids = "XXXC9XXVZX6J, QTYYW6EBDXXV, XXXVBX3SN2EI, RRZ1XX3WRPV5"; // The customer ids

try {
     $userList = CompanyService::getUserList($ids);
} catch (PlenigoException e) {
    // Error Handling here
}
```

**NOTE:** These Customer Ids can be obtained by logging in to our company dashboard, and searching by several filters.

### Implementation without SDKs

Another possibility to get by user ids - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/company/getCompanyUsersFromUserIds)

## Get failed payments

In order to get a paginated list of failed payments, you can call the company listing service. It will return a paginated list of failed payments.

### Implementation with SDKs 

#### Java 

SDK feht

#### PHP

For PHP you can use `com.plenigo.sdk.services.CompanyService::getUserList()` method, which returns a `\plenigo\models\CompanyUser` object.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $start     | yes     | string         | The start date of the interval (Format: YYYY-MM-DD) |
| $end     | yes     | string         | The end date of the interval (Format: YYYY-MM-DD) |
| $status     | yes     | string         | The status of the failed payment (FAILED, FIXED, FIXED_MANUALLY) |
| $page     | yes     | int         | Is a zero-based number of page to be returned (default: 0) |
| $size     | yes     | int         | The size of the page (default 10). It has to be a number between 10 and 100 |


```php
<?php
$start = '2016-01-01'; // The start date
$end = '2016-04-01'; // The end date
$status = 'FAILED';// The status of the payment
$page = 0; // First page
$size = 10; // 30 results per page
try {
     $failedPaymentList = CompanyService::getFailedPayments($start, $end, $status, $pageNumber, $pageSize);
} catch (PlenigoException e) {
    // Error Handling here
}
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

### Implementation without SDKs

Another possibility to get a paginated list of customers - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/company/getCompanyFailedPayments)

## Get orders

In order to get a paginated list of orders, you can call the company listing service. It will return a paginated list of orders.

### Implementation with SDKs
__
#### Java 

SDK feht
#### PHP

For PHP you can use `CompanyService::getOrders())` method, which returns a `\plenigo\models\CompanyUser` object.

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

### Implementation without SDKs

Another possibility to get a paginated list of orders - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/order/getOrders)


## Get subscriptions

In order to get a paginated list of subscriptions, you can call the company listing service. It will return a paginated list of subscriptions.

### Implementation with SDKs

#### Java

SDK fehlt

#### PHP

The `CompanyService::getSubscriptions()` method receives five parameters

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

### Implementation without SDKs

Another possibility to get a paginated list of subscriptions - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/subscription/getSubscriptions)

#### Handling the result

The result of above methods will be a composition (`CompanyUserList`, `FailedPaymentList` or `OrderList`) object that also has paging information. The actual element array returned by the `getElements()` methods are `CompanyUser`, `FailedPayment` or `Order` objects.

```php
<?php
$userListPage = CompanyService::getUserList($pageNumber, $pageSize); // from the sample avobe

$totalUsers = $userListPage->getTotalElements(); // Returns the number of total users in the company (or in your id list)
$currentPage = $userListPage->getPageNumber(); // Zero-based page number
$pageSize = $userListPage->getSize(); // Returned for convenience

$users = $userListPage->getElements(); // The actual CompanyUser objects

foreach ($users as $user) {
    $email = $user->getEmail(); // get the User's email address
    // (other data includes name, firstName, gender, country, etc.)
}
```
## Get incoming payments

In order to get incoming payments , you can call the company listing service. It will return a paginated list of incoming payments.

### Implementation with SDKs

#### Java

#### PHP

### Implementation without SDKs

Another possibility to get a paginated list of incoming payments - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/incoming_payments/getIncomingPayments)

## Get invoices

### Implementation with SDKs

#### Java

#### PHP

### Implementation without SDKs

Another possibility to get a paginated list of invoices - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/invoices/getInvoices)