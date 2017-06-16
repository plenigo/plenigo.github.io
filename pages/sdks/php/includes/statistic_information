## Using the new Company Services

Company Service allows you to get structured information about your company's customers in order to show it or use it at your site/app. Basically it allows you to:

* Get a paginated list of customers
* Get users by the user ids
* Get a paginated list of orders
* Get a paginated list of failed payments

Remember you have to first have the [SDK configuration](https://github.com/plenigo/plenigo_php_sdk/wiki/Configuration) done before start using the _CompanyService_ class

### Get a paginated list of customers

The `CompanyService::getUserList()` method receives two parameters

| name        | description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| $page       | Is a zero-based number of page to be returned (default: 0)                    |
| $size       | Is the size of the page (default 10). It has to be a number between 10 and 100|

Both parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
    $pageNumber = 0; // First page
    $pageSize = 30;  // 30 results per page

    try {
         $userList = CompanyService::getUserList($pageNumber, $pageSize);
    } catch (PlenigoException e) {
        // Error Handling here
    }
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

### Get users by user ids

Sometimes you have a specific set of users you want to get information from. This method allows you to provide a comma-separated list of user IDs and it will return the matching list if any of them were found.

The `CompanyService::getUserByIds()` method receives a single parameter

| name        | description                                                                        |
| ----------- | ---------------------------------------------------------------------------------- |
| $userIds    | A string containing a comma-separated list of Customer IDs to get information from |

```php
    $ids = "XXXC9XXVZX6J, QTYYW6EBDXXV, XXXVBX3SN2EI, RRZ1XX3WRPV5"; // Out special Customers

    try {
         $userList = CompanyService::getUserList($ids);
    } catch (PlenigoException e) {
        // Error Handling here
    }
```

**NOTE:** These Customer Ids can be obtained by logging in to our company dashboard, and searching by several filters.

### Get a paginated list of failed payments

The `CompanyService::getFailedPayments()` method receives five parameters

| name        | description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| $start      | A String representation of the start date of the interval (Format: YYYY-MM-DD) |
| $end        | A String representation of the end date of the interval (Format: YYYY-MM-DD)   |
| $status     | A string with the status of the failed payment (FAILED, FIXED, FIXED_MANUALLY) |
| $page       | Is a zero-based number of page to be returned (default: 0)                     |
| $size       | Is the size of the page (default 10). It has to be a number between 10 and 100 |


**NOTE:** `$start` and `$end` dates must be in the past and can not be more than 6 months apart.

`$page` and `$size` parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
    $pageNumber = 0; // First page
    $pageSize = 30;  // 30 results per page

    try {
         $failedPaymentList = CompanyService::getFailedPayments('2016-01-01', '2016-04-01', 'FAILED', $pageNumber, $pageSize);
    } catch (PlenigoException e) {
        // Error Handling here
    }
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.


### Get a paginated list of orders

The `CompanyService::getOrders()` method receives five parameters

| name        | description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| $start      | A String representation of the start date of the interval (Format: YYYY-MM-DD) |
| $end        | A String representation of the end date of the interval (Format: YYYY-MM-DD)   |
| $testMode   | TRUE is only test mode orders should be retrieved, FALSE otherwise             |
| $page       | Is a zero-based number of page to be returned (default: 0)                     |
| $size       | Is the size of the page (default 10). It has to be a number between 10 and 100 |


`$page` and `$size` parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
    $pageNumber = 0; // First page
    $pageSize = 30;  // 30 results per page

    try {
         $orderList = CompanyService::getOrders('2016-01-01', '2016-04-01', FALSE, $pageNumber, $pageSize);
    } catch (PlenigoException e) {
        // Error Handling here
    }
```

### Get a paginated list of subscriptions

The `CompanyService::getSubscriptions()` method receives five parameters

| name        | description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| $start      | A String representation of the start date of the interval (Format: YYYY-MM-DD) |
| $end        | A String representation of the end date of the interval (Format: YYYY-MM-DD)   |
| $testMode   | TRUE is only test mode orders should be retrieved, FALSE otherwise             |
| $page       | Is a zero-based number of page to be returned (default: 0)                     |
| $size       | Is the size of the page (default 10). It has to be a number between 10 and 100 |


`$page` and `$size` parameters are optional with default values, but setting these parameters is strongly recommended. In order to get page 2 and the rest, just maintain the same page size and the the value of `$page` to a zero-based page number (ie: `1` for page 2, etc.).

```php
    $pageNumber = 0; // First page
    $pageSize = 30;  // 30 results per page

    try {
         $subscriptionList = CompanyService::getSubscriptions('2016-01-01', '2016-04-01', FALSE, $pageNumber,
$pageSize);
    } catch (PlenigoException e) {
        // Error Handling here
    }
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.
**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

### Handling the result

The result of above methods will be a composition (`CompanyUserList`, `FailedPaymentList` or `OrderList`) object that also has paging information. The actual element array returned by the `getElements()` methods are `CompanyUser`, `FailedPayment` or `Order` objects.

```php
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
