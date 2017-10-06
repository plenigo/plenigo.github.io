---
layout: default
title: external user management
permalink: /external_user_management
---

# External user management

It is possible to use your own registration and login process and only login users into plenigo via so called “Login Tokens”.

* [Register an external user ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Change email address of an existing user ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Create a login token for an external user ? ](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Create a multiple login token for an external user ? ](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Giving a customer more access ids ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Add external user id ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Register an external user

To register an external user into the plenigo system you should use the `com.plenigo.sdk.services.UserManagementService#registerUser` for java and for php `\plenigo\services\UserManagementService::registerUser`. This method returns you the plenigo-user-id of the external user in the plenigo system. This user id will only be used for internal references. In the whole checkout process the user will only see the id you passed as external user id parameter to the method.

## General Workflow external user management 

![General Workflow External User Management](/assets/images/ci/ExternalUser.png)

(A) Register external user in the plenigo system: -> [Register External User](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

### Implementation with SDKs  

#### Java

For Java you can use the `com.plenigo.sdk.services.UserManagementService#registerUser` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| email     | yes     | string         | The email of the user to register |
| language     | yes     | string         | The language |
| externalUserId       | yes   | long        | the external user id for the new user |
| firstName       | yes   | string        | The given name for the new user |
| name       | yes   | string        | The name of the new user|

```java
//1.Step: Configure the Java SDK
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; //Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; //Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

//2.Step: Register an external user
String email = "testAddNewUser@mail.com"; //The email address of the customer
String language = "en"; //The langauge
long externalUserId = "A1BKAFZZ3H0H"; //The external customer id e.g "A1BKAFZZ3H0H"
String firstName = "new"; //The first name of the customer 
String name = "user"; //The name of the customer
//This method returns true if the external user was registrated successfully otherwise it will return false.
String registerUser = UserManagementService.registerUser(email, language, externalUserId, firstName, name); // Returns true if customer was registrated otherwise false.
```

#### PHP

For PHP you can use the `com.plenigo.sdk.services.UserManagementService::registerUser` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $email     | yes     | string         | The email of the user to register |
| $language     | yes     | string         | The language |
| $externalUserId       | yes   | int        | the external user id for the new user |
| $firstName       | yes   | string        | The given name for the new user |
| $name       | yes   | string        | The name of the new user|
   
```php
<?php
$email = "testAddNewUser@mail.com"; //The email address of the customer
$language = "en"; //The langauge
$externalUserId = "12345"; //The external customer id e.g "12345"
$firstName = "new"; //The first name of the customer 
$name = "user"; //The name of the customer
$registerUser = UserManagementService::registerUser($email, $language , $externalUserId, $firstName , $name );
```

### Implementation without SDKs 

Another possibility to register an external user into the plenigo system - can be a direct call to our REST API:

* [Register external user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

## Create login token for an external user

To indicate a successful login to the plenigo system you need to create a so called “Login Token”. This login token is valid for 5 minutes and can be passed e.g. to the build()-method of the `\plenigo\builders\CheckoutSnippetBuilder`.

### Implementation with SDKs

#### Java

For Java you can use the `com.plenigo.sdk.services.UserManagementService#createLoginToken` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```java
String loginToken = UserManagementService.createLoginToken(String customerId, String useExternalCustomerId);
```

#### PHP

For PHP you can use the `com.plenigo.sdk.services.UserManagementService::createLoginToken` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```php
$loginToken = \plenigo\services\UserManagementService::createLoginToken($customerId, $useExternalCustomerId)
```
### Implementation without SDKs 

Another possibility to create login token - can be a direct call to our REST API:

* [Create login token](https://api.plenigo.com/#!/external_user_management/createLoginToken)

## Change email address of an existing user

It is very important for the plenigo system to know the correct email address of the user. Otherwise invoices, etc. cannot sent to the user. If the user or one of your support agents changes the email of the user in your user management system you have to inform the plenigo system about the changes.

### Implementation with SDKs

#### Java

For Java you can use the `com.plenigo.sdk.services.UserManagementService#changeEmail` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| email     | yes     | string         | The new email address for that customer |
| useExternalCustomerId     | yes     | boolean         | The external customer id|

```java
//1.Step: Configure the Java SDK
String secret = "BZTzF7qJ9y0uuz2Iw1Oik3ZMLVeYKq9yXh7liOPL"; //Replace this with your secret from the plenigo backend.
String companyId = "g4evZZUXvhaLVHYoie2Z"; //Replace this with your company id from the plenigo backend.
PlenigoManager.get().configure(secret, companyId );

//2.Step: Change email address of an existing user
String customerId = "12345" //The customer id of the user to change email address for
String email =  "testChangeEMail@mail.com"; //The new email address for that customer
//This method returns true if the email was changed successfully otherwise it will return false.
boolean useExternalCustomerId = false;
boolean changeEmail = UserManagementService.changeEmail(String customerId, String email, useExternalCustomerId);
```
#### PHP

For PHP you can use the `com.plenigo.sdk.services.UserManagementService::changeEmail` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $email     | yes     | string         | The new email address for that customer |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|


```php
<?php
$customerId = "12345";
$email = "testChangeEMail@mail.com";
$useExternalCustomerId = false;
$changeEmail = \plenigo\services\UserManagementService::changeEmail($customerId, $email, $useExternalCustomerId);
//$changeEmail will be TRUE if the email address was changed successfully
```
### Implementation without SDKs

Another possibility to change an email address of an existing user - can be a direct call to our REST API:

* [Change email address of an existing user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)


## Giving a customer more access ids

With this functionality the company can provide several access ids to a given customer. This is useful if the company has internal systems for billing, CRM, customer engagement, etc. With this data entered, you can use any of these Ids to check for access to products below.

### Implementation with SDKs

#### Java

For Java you can use the `com.plenigo.sdk.services.UserManagementService#importCustomerAccess` method for this purpose.

```
Java sdk Folgt
```

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|
| $customerIds     | yes     | String         | Array of one of four customer access ids |

#### PHP

For PHP you can use the `com.plenigo.sdk.services.UserManagementService::importCustomerAccess` method for this purpose.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|
| $customerIds     | yes     | String         | Array of one of four customer access ids |

```php
<?php
$importCustomerAccess = UserManagementService::importCustomerAccess($customerId, $isExternal, $customerIds);
//$importCustomerAccess will be TRUE if the customer access added successfully
```
## Add external user id

Add an external user id to a user that doesn't have one yet. This functionality is only available for companies with closed user groups.

### Implementation with SDKs

#### Java

```java

```
#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $useExternalCustomerId     | yes     | boolean         | The external customer id|
| $customerIds     | yes     | String         | Array of one of four customer access ids |

```php
<?php
$addExternalCustomerId = UserManagementService::

($customerId, $externalCustomerId);
//$addExternalCustomerId will be TRUE if the user is added successfully
```
### Implementation with SDKs

Another possibility to add external user id - can be a direct call to our REST API:

* [Add external user id](https://api.plenigo.com/#!/external_user_management/createMultipleLoginTokens)