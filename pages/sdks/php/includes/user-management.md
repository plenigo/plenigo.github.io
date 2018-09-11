### get Customers

Sometimes you want to get the users with the latest changes, to sync them into your systems.
```
$secret = 'XXX';
$companyId = 'XXXX';
// Configure SDK
\plenigo\PlenigoManager::configure($secret, $companyId);


  /**
   * Returns a list of users of the specified company.
   *
   * @param string $startDate date od the startdate of selection (format YYYY-MM-DD)
   * @param string $endDate date od the enddate of selection - must be greater then $startDate (format YYYY-MM-DD)
   * @param int $page Number of the page (starting from 0)
   * @param int $size Size of the page - must be between 10 and 100
   *
   * @return array  A list of users (Objects) of the specified company
   */
$users = \plenigo\services\CompanyService::getChangedUsers('-1 week');

```

### get some Customers by ID

If you have some CustomerIds, you can get the user data with this method:
```
$secret = 'XXX';
$companyId = 'XXXX';
// Configure SDK
\plenigo\PlenigoManager::configure($secret, $companyId);

  /**
   * Returns a list of users based on the given ids.
   * 
   * @param string $userIds a comma separated list if ids
   * @param boolean $useExternalCustomerId (optional) Flag indicating if customer id sent is the external customer id
   *
   * @return CompanyUserList A  list of users of the specified company with the given ids
   */
$users =  \plenigo\services\CompanyService::getUserByIds("userID1, userID2");

```

### update users address data

You can change the address data:

```
$secret = 'XXX';
$companyId = 'XXXX';
// Configure SDK
\plenigo\PlenigoManager::configure($secret, $companyId);

$address = [
  "gender"=> "FEMALE",
  "firstName" =>"Monika",
  "name" =>"Mustermann",
  "company" =>"Muster AG",
  "additionalCompanyInfo" =>"We make musters",
  "street" =>"Musterstr 7",
  "additionalAddressInfo" =>"co. Hanns Mustermann",
  "postCode" =>"12345",
  "city" =>"Musterstadt",
  "state" =>"Germany",
  "country" =>"DE"
];

  /**
   * Change address of an existing user.
   *
   * @param string $customerId Customer id of the user to change address for
   * @param array $address
   * @param bool $useExternalCustomerId Flag indicating if customer id sent is the external customer id
   *
   * @return bool TRUE address changed
   *
   * @throws PlenigoException In case of communication errors or invalid parameters
   */
$success = \plenigo\services\UserManagementService::changeAddress($customerId, $address);

```


