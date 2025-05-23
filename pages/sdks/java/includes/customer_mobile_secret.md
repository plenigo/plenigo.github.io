### Allow a third party to access the customer id using a mobile secret

As a company, if you want to allow a third party so that they can query the customer ID of a specific , you can do this using the sdk. 

There are a couple of steps that you have to do in order to do this:

1. Configure an application ID
2. Create a mobile secret
3. Request the customer ID

#### Configure an application id(only companies can do this)

As a company, you have to add this using the Frisbii Media management interface, through the account menu, inside the extended settings tab.

#### Create a mobile secret(only companies can do this)

You can use the `com.plenigo.sdk.services.MobileService#createMobileSecret` method for this purpose:

```java
//2. Create a mobile secret, the object com.plenigo.sdk.models.MobileSecretInfo contains
//the necessary information to request the customer id of the customer, the second parameter
//is the size of the mobile secret, the minimum is 6 and max is 40
MobileSecretInfo mobileSecretInfo = MobileService.createMobileSecret("customerId", 6);
```

***
Once you have the mobile secret information, you can give this to the third party and they can reuse this as many times as they would like.
***

## 3. Request the customer id(companies and third parties can do this)

As a third party, once we have all the information provided above, we can query the customer id, a code sample of how to do this is provided below:

***
You must configure the Frisbii Media manager once before doing any sdk method call, but we configure it in this example in order to clarify where to put the application id provided by the company.

Also companies can use their own secret instead of the application id to call this method.
***

```java
//We must configure the Frisbii Media manager so that it contains the company ID and the application ID that the //company provided, please note that application id is the one provided above in the first step
PlenigoManager.get().configure("applicationIdOrSecret","companyId");

//With the mobile secret information, we can request the customer ID
String customerId = MobileService.verifyMobileSecret("email", "mobileSecret");
```
## Query customer mobile secret(companies can do this)

As a company you can request the mobile secret of a specific customer.

In order to do this, you can use the `com.plenigo.sdk.services.MobileService#getMobileSecret` method, an example is provided below:

```java
//This method will return the mobile secret information of the specified customer
MobileSecretInfo mobileSecretInfo = MobileService.getMobileSecret("customerId");
```

## Remove a mobile secret of a customer(only companies can do this)

As a company, if you would like to remove a mobile secret of a customer, you can do this with the Mobile  service.

In order to do this, you must use the `com.plenigo.sdk.services.MobileService#deleteMobileSecret` method, an example is provided below:

```java
//As long as this method does not return an exception, this will delete the mobile secret for the specific customer
boolean isDeleted = MobileService.deleteMobileSecret("customerId");
```
