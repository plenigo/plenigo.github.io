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
 * @param \DateTime $endTime time when access should end
 * @param array $productIds ids of the products to grant customer access to
 *
 * @throws PlenigoException
*/
\plenigo\services\AccessService::grantUserAccess($customerId, $useExternalCustomerId, $endTime, $productIds)
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