### Handle In app purchases

If it comes to native apps, it may be a good approach, to use native mobile API for payment for the best user experience. 
If you're using this process, you will get at least a **receipt**, to check a [purchase against](https://developer.apple.com/library/archive/releasenotes/General/ValidateAppStoreReceipt/Introduction.html#//apple_ref/doc/uid/TP40010573).

#### external purchases
Since we're able to implement even subscriptions via app store, we want to create products one can pay via mobile device and use on the desktop.
To check users access on any device, you simply have to push the purchase as an access right to plenigo, and put the **receipt** into this right:
```php
// a list of AccessRights
$accessRights = [];

// add a new right
$accessRights[] = [
  'productId' => 'innAppPurchase', // id of accessright. Your Paywalls have to check against this right
  'receipt'   => 'ewoJInNpZ25hdHVyZSIgPSAiQXBkeEpkdE53UFUyckE1L2NuM2tJTzFPVGsyN', // receipt from any appstore
  'source'    => 'i-tunes', // Source of this purchase to determine, which API to use for validation
];

 /**
     * Grant a user the right to access one or multiple products with details.
     * Use this method to add things like receipts to each access right.
     * @see https://api.plenigo.com/#!/access/addUserAccessDetail
     *
     * @param string $customerId The Customer ID
     * @param boolean $useExternalCustomerId flag indicating if customer id is an external customer id
     * @param string $startTime time when access should start in the format Y-m-d
     * @param string $endTime time when access should end in the format Y-m-d
     * @param array $accessRights ids of the products to grant customer access to
     *  $accessRights = [
     *      [
     *      'productId' => (string, optional): Product id to add access for. ,
     *      'receipt'   => (string, optional): Receipt of the user. ,
     *      'source'    => (string, optional): Access right source.
     *      ],
     * ]
     *
     * @throws PlenigoException
     */
    AccessService::grantUserAccessWithDetails('ZV5UDDLRWLF8', false, date('Y-m-d'), date('Y-m-d', strtotime("+4 days")), $accessRights);
```

