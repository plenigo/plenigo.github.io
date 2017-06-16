> Please keep in mind that you need to include the plenigo JavaScript-SDK in every HTML page you would like to use plenigo functionality. The necessary information can be found in the [JavaScript documentation](/sdks/javascript).

In order to configure the SDK, you must do the following:
You must require and call `\plenigo\PlenigoManager::configure()` method.

```php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

//define constants:
$secret = 'SECRET';
$companyId = 'COMPANY_ID';

//configure plenigo:
\plenigo\PlenigoManager::configure($secret, $companyId);
```

In this call we are using two parameters:

|nam        | description                                                            |
|:----------|:-----------------------------------------------------------------------|
|$secret    | It is a String that represents the secret key for your specific company|
|$companyId | It is a String that represents the company ID used                     |

This class will contain the configuration and will be used by all the calls that need these variables, such as creating a checkout snippet.

After you have called this method, you are now ready to communicate with plenigo.

### Test transactions

If you want to test your integration without doing real production transactions (This is if you want to mock credit card transactions for example), you can set the test mode flag to true, below there are examples of how to do this.

You can also pass a third parameter of the `\plenigo\PlenigoManager::configure()` method to configure the test flag.

```php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

//define constants:
$secret = 'SECRET';
$companyId = 'COMPANY_ID';
$isTestMode = true;

//configure plenigo:
\plenigo\PlenigoManager::configure($secret, $companyId, $isTestMode);
```