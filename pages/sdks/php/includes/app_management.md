## Allow a third party to access customer information for a specific product(only companies can do this)


As a company, if you want to register a third party so that they can query product access of a specific customer, you can do this using the sdk. 

There are a couple of steps that you have to do in order to do this:

1. Configure an application id
2. Request an access token
3. Request a customer application access

###1. Configure an application id

As a company, you have to add this using the plenigo management interface, through the account menu, inside the extended settings tab.

###2-3. Request an access token and a customer application access(only companies can do this)

You can use the com.plenigo.sdk.services.AppManagement#requestAppToken method for this purpose, followed by the com.plenigo.sdk.services.AppManagement#requestAppId method:

```php
//2. Request an access token
//This object is used to request the token, you specificy the customer id, the product and the description
$appAccessToken = AppManagementService::requestAppToken("customerId", "productId", "Tablet Access");
//3. Request a customer application access with the AppTokenData object
//Once you have the access token, you can use this to request a customer application id for the third party
$appAccessData = AppManagementService::requestAppId($appAccessToken->getCustomerId(), $appAccessToken->getAppToken());
```

***
Once you have the application access data, you can give this information to the third party and they can reuse this as many times as they would like.
***

***
There is a limit of how many customer application ids you can request, but you can configure that in the company management interface of plenigo.
***

## Sample usage of customer application id for third parties(companies and third parties can do this)

As a third party, once we have all the information provided above, we can query information, a code sample of how to do this is provided below:

***
You must configure the plenigo manager once before doing any sdk method call, but we configure it in this example in order to clarify where to put the application id provided by the company.

Also companies can use their own secret instead of the application id to call this method.
***

```php
//With the customer application id you can query product information, in the example below, we are requesting to see
//if an user has bought a product.
//This returns a boolean that will tell you if the user did buy the product(true) or not(false).
$hasUserBought = AppManagementService::hasUserBought("customerId", "productId", "customerAppId");
```
## Query customer application ids(companies and third parties can do this)

As a company or a third party, you can request the current applications that you have registered for a specific customer(As a third party, you must configure the application id in the plenigo manager to do this, for more information see the "Sample usage of customer application id for third parties" in this wiki).

In order to do this, you can use the com.plenigo.sdk.services.AppManagement#getCustomerApps method, an example is provided below:

```php
//This method will return a list of customer application access information
$appsData = AppManagementService::getCustomerApps("customerId");
```

## Remove an application id for a customer(only companies can do this)

As a company, if you would like to remove a customer application id, you can do this with the Application management service.

In order to do this, you must use the com.plenigo.sdk.services.AppManagement#deleteCustomerApp method, an example is provided below:

```php
//As long as this method does not return an exception, this will delete the customer app id for the specific //customer
AppManagementService::deleteCustomerApp("customerId", "customerAppId");
```