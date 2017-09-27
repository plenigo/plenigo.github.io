---
layout: default
title: Encrypt Checkout String
permalink: /checkout_string
---
# Encrypt Checkout String 

The [checkout functionality of the JavaScript-SDK](/sdks/javascript#checkout---start-a-plenigo-checkout) request an encrypted and signed string as `paymentData` value.
This string can be received from the product management page of the plenigo merchant backend or be generated on the fly. The encrypted string itself can handle
different configurations so it is suggested to generate it on the server side.

Base information:

* Decrypted data is formatted the following way {key}=>{value}&{key}=>{value}&{key}=>{value}...
* The key to use for encryption is the MD5 hash of your company secret from the plenigo merchant backend.
* Encryption method to use is AES/CTR/NoPadding 128 bit. The encrypted byte string is converted to a hexadecimal string
* Initialization vector to use is 16 bit long and converted to a hexadecimal string
* Add the initialization vector hexadecimal string to the end of the encrypted data hexadecimal string (Hex.encode(encryptedData) + Hex.encode(iv))
* Create a HmacSHA256 checksum of the concatenated string and add it to the end of the string separated by a dot (.). The secret key to use is your company secret from the plenigo merchant backend.

The encrypted payment data can include the following parameter. The mandatory parameters change if the plenigo is managed by the plenigo backend or
if you create a product dynamically on the fly by every checkout. Non plenigo managed products can only be one time purchases. Subscriptions must be
managed over the plenigo merchant backend.

## Parameters plenigo managed products

These are the parameters of the plenigo managed products:

  |Parameter|Mandatory|Description|
  |:--------|:--------|:----------|
  |pi|Yes|plenigo product id of the product in the plenigo merchant backend|
  |ts|Yes|flag indicating if checkout should run in test mode, must be `true` or `false`|
  |pr|No|Price of the product (only usable for single purchases, not for subscriptions)|
  |cu|No|Currency identifier - ISO 4217 (only usable for single purchases, not for subscriptions)|
  |pt|No|Type identifier that indicates the type of the product - Important for tax rates (available values below)|
  |ti|No|Title to overwrite product title with|
  |ci|No|plenigo category id of the category in the plenigo merchant backend to provide additional settings to the product|
  |sso|No|OAuth2 redirect url if OAuth2 should be used|
  |csrf|No|OAuth2 csrf token|
  |rs|No|Flag indicating if the checkout is for a product renewal - necessary for payment methods that don't support auto recurring e.g. SOFORT-Überweisung (only usable for subscription products)|
  |fp|No|Flag indicating if the checkout should be a failed payment checkout process that allows the user to close his open debts|
  |sc|No|Shipping costs (only usable for single purchases, not for subscriptions)|
  |om|No|Flag indicating if you want to use a plenigo managed product but still want to overwrite the price, the title, and the product id - the plenigo product only delivers the base information that are going to be overwritten dynamically|
  |pir|No|Product id to overwrite the plenigo product id with. Only usable in combination with the `om`-Flag|
  |si|No|Unique id of the price segment to use - the price segment passed here will be used no matter of user country or anything else|
  |pa|No|Flag indicating if the customers billing address should be pre filled with the name and first name saved by the personal user data|

## Parameters foreign product

These are the parameter of the external products:

  |Parameter|Mandatory|Description|
  |:--------|:--------|:----------|
  |pi|Yes|Your unique product id for this product|
  |ts|Yes|flag indicating if checkout should run in test mode, must be `true` or `false`|
  |pr|Yes|Price of the product|
  |cu|Yes|Currency identifier - ISO 4217|
  |pt|Yes|Type identifier that indicates the type of the product - Important for tax rates (available values below)|
  |ti|Yes|Product title|
  |ci|No|plenigo category id of the category in the plenigo merchant backend to provide additional settings to the product|
  |sso|No|OAuth2 redirect url if OAuth2 should be used|
  |csrf|No|OAuth2 csrf token|
  |sc|No|Shipping costs|
  |pa|No|Flag indicating if the customers billing address should be pre filled with the name and first name saved by the personal user data|
    
Available product type identifier:
* `EBOOK`
* `DIGITALNEWSPAPER`
* `DOWNLOAD`
* `VIDEO`
* `MUSIC`
* `DIGITALPRODUCT`
* `BOOK`
* `NEWSPAPER`
* `SHIPPINGCOSTS`
* `MEMBERSHIP`