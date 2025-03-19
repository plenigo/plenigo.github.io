The SDK enables you to add access rights for a product to a user.

### Grant access rights
To grant a user access to one or multiple products use the method `\plenigo\services\AccessService::grantUserAccess`.

```php
<?php
/**
 * Grant a user the right to access one or multiple products.
 *
 * @param string $customerId The Customer ID
 * @param boolean $useExternalCustomerId flag indicating if customer id is an external customer id
 * @param \DateTime $startTime time when access should start
 * @param \DateTime $endTime time when access should end
 * @param array $productIds ids of the products to grant customer access to
 *
 * @throws PlenigoException
*/
\plenigo\services\AccessService::grantUserAccess($customerId, $useExternalCustomerId, $startTime, $endTime, $productIds)
```

### Remove access rights
To remove a user's access to one or multiple products use the method `\plenigo\services\AccessService::removeUserAccess`.

```php
<?php
/**
 * Removes a user's access right from one or multiple products.
 *
 * @param string $customerId The Customer ID
 * @param boolean $useExternalCustomerId flag indicating if customer id is an external customer id
 * @param array $productIds ids of the products to grant customer access to
 *
 * @throws PlenigoException
 */
\plenigo\services\AccessService::removeUserAccess($customerId, $useExternalCustomerId, $productIds)
```

### Example

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

use \plenigo\services\AccessService;

// define constants:
$secret = 'SECRET';
$companyId = 'COMPANY_ID';

// one time configuration of the PlenigoManager-Singleton 
\plenigo\PlenigoManager::configure($secret, $companyId);

// .... some code that creates a user, checks login state, or something else

// we assume the user is a user not managed by Frisbii Media for the rest of this example
// this user will be granted endless access to two products that are not managed by Frisbii Media
// in real life your customer id and product ids will most likly be dynamic
AccessService::grantUserAccess('MY_CUSTOMER_ONE', true, null, array('productOne', 'productTwo')); 
 
// no we are going to remove the access rights of a customer for a product
AccessService::removeUserAccess('MY_CUSTOMER_ONE', true, array('productThree'));
```
