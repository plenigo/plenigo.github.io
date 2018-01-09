---
layout: default
title: manage_user_access_rights
permalink: /manage_user_access_rights
---
# Manage user's access rights

Manage user's access rights allow you to add or delete access rights to one or multiple products.

* [Give access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Give  access rights to user's

By managing user's access rights you are allowed to add or delete access rights to one or multiple products.

### PHP

For PHP integration you can use `plenigo\services\AccessService::grantUserAccess` method in order to give users access rights.

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

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company id of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Give user access.
$customerId = 'WMAQRX4EQ7R5'; // The customer ID from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer ID.
$startTime = '2019-11-06'; // The start date.
$endTime = '2099-11-06'; // The end time.
$productIds = 'EgLUrT56328991046641'; // The product ids from the plenigo backend.
AccessService::grantUserAccess($customerId, $useExternalCustomerId, $startTime, $endTime, array($productIds));
```

## Add a product access to an existing user without SDK

Another possibility to allow a third party access - is a direct call to our REST API:

* [Grant access rights](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Remove access rights 

Remove user' s access to one or multiple products.


### PHP

For PHP integration you can use the `plenigo\services\AccessService::removeUserAccess` method in order to remove access rights.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer ID |
| $useExternalCustomerId     | yes     | boolean         | Flag indicating external customer ID|
| $productIds     | yes     | string         |The product IDs |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

// 1.Step: Configure the PHP SDK. The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);

// 2.Step: Remove user access.
$customerId = 'WMAQRX4EQ7R5'; // The customer ID from the plenigo backend.
$useExternalCustomerId = 'false'; // The external customer ID.
$productIds = 'EgLUrT56328991046641'; // The product IDs from the plenigo backend.
AccessService::removeUserAccess($customerId, $useExternalCustomerId, array($productIds));
```

## Remove access rights without SDK

Another possibility to remove access rights - is a direct call to our REST API:

* [Remove access rights ](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)