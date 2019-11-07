---
layout: default
title: plenigo API Changelog
permalink: /changelog/apiV3
---
# API v3 Changelog

Changelog for plenigo API version 3.



## 2019-11-07 - 3.0.0 Beta 2

Invoice cancellation via API was added.

**New:**

* **Invoice cancellation**  
    Invoices can now be cancelled via API.

## 2019-11-02 - 3.0.0 Beta 1

A subscription chain can now handle additional data.

**New:**

* **Additional chain data**  
    Additional data can now be added to a subscription chain.

## 2019-10-23 - 3.0.0 Alpha 9

This release is feature release.

**Changed:**
 
**New:**

* **Add voucher methods**  
    It is now possible to create and modify campaings and to validate vouchers.
    
## 2019-10-17 - 3.0.0 Alpha 8

This release is a bug fixing release.

**Changed:**
 
* **Successful deletion repsonse**  
    All deletion methods are now returning a 202 status code in case of success.
* **Moved discount percentage from order to order item**  
    The discount percentage is offered per order item not for a complete order.
* **Add search parameters to invoices search**  
    The invoices search function now also takes an order id or a subscription item id as search parameter.
    
    
## 2019-09-26 - 3.0.0 Alpha 7

This release is a bug fixing release.

**Changed:**
 
* **Incorrect order address reference**  
    The order and order item incorrectly referenced to the invoice and delivery address of the customer.
    This may be incorrect because the address could have changed since the original order which doesn't impact the
    order itself. Now the complete address is returned instead.
* **Incorrect invoice address reference**  
    The invoice and invoice item incorrectly referenced to the invoice and delivery address of the customer.
    This may be incorrect because the address could have changed since the invoice creation which doesn't impact the
    order itself. Now the complete address is returned instead.
* **Customer creation returns included addresses**  
    The return value of customer creation now returns the complete addresses including address ids that were included
    in the creation process


## 2019-09-25 - 3.0.0 Alpha 6

The main goal of this release is to complete existing functions and add new functionality.

**New:**

* **Enhanced customer creation**  
    During the creation of a customer you can now pass all addresses you already
    have from the customer. Also the additional data blob can be filled immediately.
* **Additional customer values**  
    The customer now has additional fields: invoiceEmail, birthday, status. The first
    two can be passed during creation and modified via customer change request.
* **Add additional customer data**  
    It is now possible to add additional data to customer.
* **Add mandate to to bank account**   
    Bank account entities missed the mandate fields that identify the mandate for SEPA.

**Changed:**
 
* **Missing required annotations**  
    Some mandatory fields missed the required annotation.


## 2019-09-21 - 3.0.0 Alpha 5

We released a new Alpha-Version of our API that has multiple changes.

**New:**

* **Added "changedDate"-Field to entities**  
    Every entity now delivers a "changedDate"-Field that contains the
    time of the last change. A change can also be the creation of the
    entity itself. So even entities that cannot be changed, e.g. orders,
    have a a change date. In that case it will never change at all. This
    way you should be able to handle all cases more easily within your
    software.
* **Change payment method associated with a subscription**  
    You can now change the payment method that is associated with a
    subscription.
* **Subscription chain endpoints**  
    A subscription chain is the chain that represents the complete
    lifetime of a subscription customer relation ship. If the user
    changes to a new subscription e.g. via upselling the chain id of the
    subscription will still be the same. This way you can easily track
    the whole life cycle of a customer's product journey.
* **Customer order and subscription endpoints**  
    It is now possible to request all subscriptions or orders of a
    specific customer
* **Invoice cancellation**  
    Invoices can now be canceled via API.
* **Additional subscription chain and order data**  
    For each order additional can be saved. This includes analytic data
    like "affiliatedId", "partnerId", "utm" parameters but also freely
    definable fields. This data will be associated with the order and
    the subscription chain.
* **Additional customer data**  
    Many customers use as their SSO solution so a often requested
    feature was to save additional data to a user not related to plenigo
    itself. We (finally) heard your screams and added a kind of data
    blob to the user entity. A user has an associated data blog that
    contains a HashMap which is currently limited to 50 entries that are
    complete free to fill.

**Changed:**

 * **Authorize-Header-Token renamed to "X-plenigo-api-token"**  
    We had to rename our Authorize-Header-Token to prevent confusion and
    conflicts with our existing header tokens. The new name should
    properly reflect the usage and allow developers to easily
    differentiate between the available token types.
 * **Improved description of the "startTime"-Parameter and the
    "endTime"-Parameter**  
    One feedback we got from you was that the description of the
    "startTime"-Parameter and the "endTime"-Parameter is misleading. We
    now made clear that these fields target the updated date of an
    entity. It does not differentiate between creation and update. A
    creation of an entity is also an update.
* **Splitting up payment methods**  
    After some discussions with API test users and internal reviews we
    came to the conclusion that we have to split up the payment
    endpoints. This way it is easier to request only payment methods of
    a specific type. Also the parsing in API client software is much
    easier. Another advantage is that additional payment methods can
    never break existing implementations and can be added without any
    migration process by the API client. We also think that this API is
    much more self explaining and the error handling on API clients is
    simplified.

In conclusion we are coming closer to a final first release of the new 
API. Thank you very much to all of you for giving us so many valuable 
feedback.
