---
layout: default
title: manage_user_access_rights
permalink: /manage_user_access_rights
---
# Manage user access rights

Manage user access rights allows you to add or delete access rights to one or multiple products.

* [Grant access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove access rights ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Grant user product access to an existing user with SDKs

Grant a user access to one or multiple products.

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

## Add a product access to an existing user without SDKs

Another possibility to allow a third party access to information - can be a direct call to our REST API:

* [Grant access rights](https://api.plenigo.com/#!/app_management/getCustomerApps)

## Remove access rights with SDKs

Remove user' s access to one or multiple products.


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

## Remove access rights without SDKs

Another possibility to remove access rights - can be a direct call to our REST API:

* [Remove access rights ](https://api.plenigo.com/#!/app_management/verifyCustomerAppAccess)