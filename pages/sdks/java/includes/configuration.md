---
layout: default
title: Configuration
permalink: /configuration_java
---

# Configuration 

In order to configure the Java SDK, you have to execute the following steps. 

> Please keep in mind that you need to include the Frisbii Media JavaScript-SDK in every HTML page you would like to use Frisbii Media functionality. The necessary information can be found in the [JavaScript documentation](/sdks/javascript).


You must call the `com.plenigo.sdk.PlenigoManager#configure` method.

In this call we are using two parameters:

| name       | description                                                             |
|:-----------|:------------------------------------------------------------------------|
| secret     | It is a String that represents the secret key for your specific company |
| companyId  | It is a String that represents the company ID used                      |

This class will contain the configuration and will be used by all the calls that need these variables, such as creating a checkout snippet.

After you have called this method, you are now ready to communicate with Frisbii Media.


```java
String secret = "SECRET"; // The secret key of your specific company.
String companyId = "COMPANY_ID"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );
```

# Test transactions

If you want to test your integration without doing real production transactions (This is if you want to mock credit card transactions for example), you can set the test mode flag to true, below there are examples of how to do this.

You can use the overloaded com.plenigo.sdk.PlenigoManager#configure method that contains the test flag:

```java
String secret = "SECRET"; // The secret key of your specific company. 
String companyId = "COMPANY_ID"; // The company ID of your specific company.
boolean isTestMode = true; // The test flag.
PlenigoManager.get().configure(secret, companyId, isTestMode );
```
