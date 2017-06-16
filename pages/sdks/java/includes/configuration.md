In order to configure the SDK, you have to execute the following steps. 

You must call the `com.plenigo.sdk.PlenigoManager#configure` method:
 
```java
String secret = "SECRET";
String companyId = "COMPANY_ID";
PlenigoManager.get().configure(secret, companyId );
```

In this call we are using two parameters:

| name       | description                                                             |
|:-----------|:------------------------------------------------------------------------|
| secret     | It is a String that represents the secret key for your specific company |
| companyId  | It is a String that represents the company ID used                      |

This class will contain the configuration and will be used by all the calls that need these variables, such as creating a checkout snippet.

After you have called this method, you are now ready to communicate with plenigo.

### Test transactions

If you want to test your integration without doing real production transactions (This is if you want to mock credit card transactions for example), you can set the test mode flag to true, below there are examples of how to do this.

You can use the overloaded com.plenigo.sdk.PlenigoManager#configure method that contains the test flag:

```java
String secret = "SECRET";
String companyId = "COMPANY_ID";
boolean isTestMode = true;
PlenigoManager.get().configure(secret, companyId, isTestMode );
```