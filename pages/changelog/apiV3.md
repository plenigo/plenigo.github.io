---
layout: default
title: plenigo API Changelog
permalink: /changelog/apiV3
---
# API v3 Changelog

Changelog for plenigo API version 3.

## 2019-09-21 - 3.0.0 Alpha 5

We released a new Alpha-Version of our API that has multiple changes:

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