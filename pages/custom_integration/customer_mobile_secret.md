---
layout: default
title: customer_mobile_secret
permalink: /customer_mobile_secret
---
# Customer mobile secret

* [Create a mobile secret ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Test if the mobile secret is correct ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Get the mobile secrets ?](https://api.plenigo.com/#!/user/hasBoughtProduct)
* [Remove customer mobile secret ?](https://api.plenigo.com/#!/user/hasBoughtProduct)

## Create a mobile secret (only companies can to this)

### Implementation with SDKs

#### Java

You can use `com.plenigo.sdk.services.MobilService#createMobilSecret` method, which returns a `com.plenigo.sdk.models.MobileSecretInfo` object.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |
| size     | yes     | int         | The size of the mobile secret the minimum is 6 and max is 40  |

```java
String customerId = "RgKUHT78563989856641";
int size = 6;
//This method returns the object com.plenigo.sdk.models.MobileSecretInfo 
//This object contains the email address of the customer and the mobile secret  
MobileSecretInfo mobileSecretInfo = MobileService.createMobileSecret(customerId, size);
```

Returned MobilSecretInfo object:

```text
{
  "email": "test+968267249454239@plenigo.com",
  "mobileAppSecret": "965979"
}
```

#### PHP

You can use the `com.plenigo.sdk.services.MobileService::createMobileSecret` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |
| $size     | yes     | int         | The size of the mobile secret the minimum is 6 and max is 40 |

```php
<?php
$customerId = 'RgKUHT78563989856641';
$size = 6 ;
//This method returns the object com.plenigo.sdk.models.MobileSecretInfo 
//This object contains the email address of the customer and the mobile secrets  
$mobileSecretInfo = MobileService::createMobileSecret($customerId, $size);
```

Returned MobilSecretInfo object:
```text
{
  "email": "test+968267249454239@plenigo.com",
  "mobileAppSecret": "965979"
}
```

### Implementation without SDKs

Another possibility to create mobile secret - can be a direct call to our REST API:

* [Create mobile secret](https://api.plenigo.com/#!/mobile_secret/createMobileSecret)


## Test if the mobile secret is correct

### Implementation with SDKs

#### Java

You can use the `com.plenigo.sdk.services.MobileService#verifyMobileSecret` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| email     | yes     | string         | The email address of the customer |
| mobileSecret     | yes     | int         | The mobile secret |

```java
String email = "test+968267249454239@plenigo.com"; 
String mobileSecret = "965979";
//This method returns the customer id given the mobile secret
String customerId = MobileService.verifyMobileSecret(email,mobileSecret);
```

Returned customerId:
```text
{
  "customerId": "319842"
}
```

#### PHP

You can use the `com.plenigo.sdk.services.MobileService#verifyMobileSecret` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $email     | yes     | string         | The email address of the customer |
| $mobileSecret     | yes     | int         | The mobile secret |

```php
<?php
$customerId = 'RgKUHT78563989856641';
$size = 6 ;
//This method returns the customer id given the mobile secret
$mobileSecretInfo = MobileService::verifyMobileSecret($customerId, $size);
```

Returned customerId:
```text
{
  "customerId": "319842"
}
```

### Implementation without SDKs

Another possibility to test if the mobile secret is correct - can be a direct call to our REST API:

* [Verify Mobile Secret](https://api.plenigo.com/#!/mobile_secret/verifyMobileSecret)

## Query customer mobile secret(companies can do this)

As a company you can request the mobile secret of a specific customer.

### Implementation with SDKs

#### Java

You can use the `com.plenigo.sdk.services.MobileService#getMobileSecret` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerId     | yes     | string         | The customer id |

```java
String customerId = "RgKUHT78563989856641";
//This method returns the object com.plenigo.sdk.models.MobileSecretInfo 
//This object contains the email address of the customer and the mobile secret  
MobileSecretInfo mobileSecretInfo = MobileService.getMobileSecret(customerId);
```
Returned MobilSecretInfo object:

```text
{
  "email": "test+968267249454239@plenigo.com",
  "mobileAppSecret": "965979"
}
```
#### PHP

You can use the `com.plenigo.sdk.services.MobileService::getMobileSecret` method for this purpose:

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |

```php
<?php
$customerId = "RgKUHT78563989856641";
//This method returns the object com.plenigo.sdk.models.MobileSecretInfo 
//This object contains the email address of the customer and the mobile secret
$mobileSecretInfo = MobileService::getMobileSecret($customerId);
```

Returned MobilSecretInfo object:

```text
{
  "email": "test+968267249454239@plenigo.com",
  "mobileAppSecret": "965979"
}
```

### Implementation without SDKs

Another possibility to test if the mobile secret is correct - can be a direct call to our REST API:

* [Get mobile secret](https://api.plenigo.com/#!/mobile_secret/getMobileSecret)

## Delete a mobile secret of a customer(only companies can do this)

As a company you cam remove a moible secret of a customer.

### Implementation with SDKs

#### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |

```java
String customerId = "RgKUHT78563989856641";
//This method returns true if the mobile secret was deleted otherwise false.
boolean test = MobileService.deleteMobileSercet(customerId);
```

#### PHP

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $customerId     | yes     | string         | The customer id |

```php
<?php
//This method returns true if the mobile secret was deleted otherwise false.
$customerId = 'RgKUHT78563989856641';
$test = MobileService::deleteMobileSecret($customerId);
```

### Implementation without SDKs

Another possibility to test if the mobile secret is correct - can be a direct call to our REST API:

* [Delete mobile secret](https://api.plenigo.com/#!/mobile_secret/deleteMobileSecret)