### Allow a third party to access customer information for a specific product(only companies can do this)

As a company, if you want to register a third party so that they can query product access of a specific customer, you can do this using the sdk. 

There are a couple of steps that you have to do in order to do this:

1. Configure an application id
1. Request an access token
1. Request a customer application access

#### Configure an application id

As a company, you have to add this using the Frisbii Media management interface, through the account menu, inside the extended settings tab.

#### Request an access token and a customer application access(only companies can do this)

You can use the `com.plenigo.sdk.services.AppManagement#requestAppToken` method for this purpose, followed by the com.plenigo.sdk.services.AppManagement#requestAppId method:

```java
//2. Request an access token
//This object is used to request the token, you specificy the customer id, the product and the description
AppTokenRequest tokenRequest = new AppTokenRequest("customerId", "productId", "Tablet Access");
AppAccessToken appAccessToken = AppManagementService.requestAppToken(tokenRequest);
//3. Request a customer application access with the AppAccessToken object
//Once you have the access token, you can use this to request a customer application id for the third party
AppAccessData appAccessData = AppManagementService.requestAppId(appAccessToken);
```

***
Once you have the application access data, you can give this information to the third party and they can reuse this as many times as they would like.
***

***
There is a limit of how many customer application ids you can request, but you can configure that in the company management interface of Frisbii Media.
***

### Sample usage of customer application id for third parties(companies and third parties can do this)

As a third party, once we have all the information provided above, we can query information, a code sample of how to do this is provided below:

***
You must configure the Frisbii Media manager once before doing any sdk method call, but we configure it in this example in order to clarify where to put the application id provided by the company.

Also companies can use their own secret instead of the application id to call this method.
***

```java
//We must configure the Frisbii Media manager so that it contains the company id and the application id that the //company provided, please note that application id is the one provided above in the first step, and customer //application id is provided in the third step
PlenigoManager.get().configure("applicationIdOrSecret","companyId");

//With the customer application id you can query product information, in the example below, we are requesting to see
//if an user has bought a product.
ProductAccessRequest request = new ProductAccessRequest("customerId", "productId", "customerAppId");
//This returns a boolean that will tell you if the user did buy the product(true) or not(false).
Boolean hasUserBought = AppManagementService.hasUserBought(request);
```
### Query customer application ids(companies and third parties can do this)

As a company or a third party, you can request the current applications that you have registered for a specific customer(As a third party, you must configure the application id in the Frisbii Media manager to do this, for more information see the "Sample usage of customer application id for third parties" in this wiki).

In order to do this, you can use the `com.plenigo.sdk.services.AppManagement#getCustomerApps` method, an example is provided below:

```java
//This method will return a list of customer application access information
List<AppAccessData> appTokenData = AppManagementService.getCustomerApps(new CustomerAppRequest("customerId"));
```

### Remove an application id for a customer(only companies can do this)

As a company, if you would like to remove a customer application id, you can do this with the Application management service.

In order to do this, you must use the `com.plenigo.sdk.services.AppManagement#deleteCustomerApp` method, an example is provided below:

```java
DeleteAppIdRequest request = new DeleteAppIdRequest("customerId", "customerAppId");
//As long as this method does not return an exception, this will delete the customer app id for the specific //customer
AppManagementService.deleteCustomerApp(request);
```
