---
layout: default
title: Configuration
permalink: /configuration_php
---

# Configuration

In order to use the PHP DSK you need to configure it.

> Please keep in mind that you need to include the plenigo JavaScript-SDK in every HTML page you would like to use plenigo functionality. The necessary information can be found in the [JavaScript documentation](/sdks/javascript).

For PHP integration you can use the `\plenigo\PlenigoManager::configure()`method in order to configure the SDK.

|name       | description                                                            |
|:----------|:-----------------------------------------------------------------------|
|$secret    | It is a String that represents the secret key for your specific company (from the plenigo backend)|
|$companyId | It is a String that represents the company ID used (from the plenigo backend)                    |

This class will contain the configuration and will be used by all the calls that need these variables, such as creating a checkout snippet.

After you have called this method, you are now ready to communicate with plenigo.


```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

//define constants:
$secret = 'SECRET'; // The secret key of your specific company. 
$companyId = 'COMPANY_ID'; // The company id of your specific company.

//configure plenigo:
\plenigo\PlenigoManager::configure($secret, $companyId);
```
## Example 


This is an example where you only need to replace the company id(e.g.23NuCmdPoiRRkQiCqP9Q ), the secret(e.g.QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj).

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
// 1.Step: Configure the PHP SDK: The secret (e.g. secret:Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID (e.g.:23NuCmdPoiRRkQiCqP9Q).
$secret = 'Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj'; // The secret key of your specific company.
$companyId = '23NuCmdPoiRRkQiCqP9Q'; // The company ID of your specific company.
\plenigo\PlenigoManager::configure($secret, $companyId);
```

# Test transactions

If you want to test your integration without doing real production transactions (This is if you want to mock credit card transactions for example), you can set the test mode flag to true, below there are examples of how to do this.

You can also pass a third parameter of the `\plenigo\PlenigoManager::configure()` method to configure the test flag.

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

//define constants:
$secret = 'SECRET';  // The secret key of your specific company. 
$companyId = 'COMPANY_ID'; // The company id of your specific company.
$isTestMode = true; // Flag indicating if it is in test mode.

//configure plenigo:
\plenigo\PlenigoManager::configure($secret, $companyId, $isTestMode);
```