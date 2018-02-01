---
layout: default
title: external user management Java
permalink: /external_user_management_java
---

# External user management

It is possible to use your own registration and login process and only login users into plenigo via so called “Login Token”. Therefore you have to register the user into the plenigo system. After that you have to create a Login Token to indicate a successful login.

* [Register an external user ?](https://plenigo.github.io/external_user_management_java#register-an-external-user)
* [Create a Login Token for an external user ? ](https://plenigo.github.io/external_user_management_java#create-login-token)
* [Change email address of an existing user ?](https://plenigo.github.io/external_user_management_java#change-email-address-of-an-existing-user)


## General Workflow external user management 

![General Workflow External User Management](/assets/images/ci/ExternalUser.png)

(A) Register external user in the plenigo system: -> [Register External User](https://api.plenigo.com/#!/external_user_management/registerExternalUser)

## Register an external user 
First of all you have to register the user into the plenigo system.


For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#registerUser` in order to register the external user.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| email     | yes     | string         | The email of the user to register |
| language     | yes     | string         | The language |
| externalUserID       | yes   | long        | The external user ID for the new customer |
| firstName       | yes   | string        | The given name for the new customer |
| name       | yes   | string        | The name of the new customer|

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company. 
String companyID = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company. 
PlenigoManager.get().configure(secret, companyID );

// 2.Step: Fill in the data for the registerUser() method.
String email = "testAddNewUser@mail.com";  // The email address of the customer.
String language = "en"; // The language.
String externalUserID = "A1BKAFZZ3H0H"; // The external customer ID e.g "A1BKAFZZ3H0H" that the customer should have.
String firstName = "new"; // The first name of the customer.
String name = "user"; // The name of the customer.

// Returns the customer ID.
String registerUser = UserManagementService.registerUser(email, language, externalUserID, firstName, name); 
```

## Implementation without SDK 

Another possibility to register an external user into the plenigo system - is a direct call to our REST API:

* [Register external user](https://api.plenigo.com/#!/external_user_management/registerExternalUser)


## Create Login Token 

To indicate a successful login to the plenigo system you need to create a so called “Login Token”. This Login Token is valid for 5 minutes and can be passed e.g. to the build()-method of the `\plenigo\builders\CheckoutSnippetBuilder`.

For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#createLoginToken` in order to create a Login Token.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerID     | yes     | string         | The customer ID |
| useExternalCustomerID     | yes     | boolean         | The external customer ID|

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj"; // The secret key of your specific company.
String companyID = "23NuCmdPoiRRkQiCqP9Q"; // The company ID of your specific company. 
PlenigoManager.get().configure(secret, companyID );

// 2.Step: Fill in the data for the createLoginToken() method.
String customerId = "56202510"; // The customer ID.
String useExternalCustomerID = "12345";  // The external customer ID.

// 3.Step: This method returns a Login Token for the customer.
String loginToken = UserManagementService.createLoginToken(String customerID, String useExternalCustomerID);
```
### Use case 

Use case for external user management with a checkout. 

#### Server logic

```java
@Controller
public class ExternalUser_Management {

    @PostConstruct
    public void config() {
        // 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend , in Test Mode(true).
        PlenigoManager.get().configure("Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj", "23NuCmdPoiRRkQiCqP9Q", true);
    }
    
    public void registerExternalUser(HttpServletRequest request, Model model, ExternalUser externalUser ) throws PlenigoException, InvalidDataException {
        // 2.Step: Register the external user.
        String registerExternalUser = UserManagement.registerUser(externalUser);
        externalUser.setPlenigoId(registerExternalUser);
        // 3.Step: Create a Login Token for this user by getting his plenigo ID.
        UserManagement.createLoginToken(registerExternalUser.getPlenigoId);
        model.addAttribute("externalUser", registerExternalUser);
        }
    }
}
```

#### Page logic

```html
html>
<head>
    <title> The title  </title>
        <!-- import the plenigo Javascript SDK
               Let's use concrete values:
               company ID = e.g. "23NuCmdPoiRRkQiCqP9Q"
        -->          <script type="application/javascript"
            src="https://static.plenigo.com/static_resources/javascript/23NuCmdPoiRRkQiCqP9Q/plenigo_sdk.min.js" data-lang="en">
    </script>
</head>
<body>
<button onclick="${externalUser}">Login</button>
</body>
</html>

```

### Implementation without SDK 

Another possibility to create Login Token - can be a direct call to our REST API:

* [Create Login Token](https://api.plenigo.com/#!/external_user_management/createLoginToken)

## Change email address of an existing user

It is very important for the plenigo system to know the correct email address of the user. Otherwise invoices, etc. cannot sent to the user. If the user or one of your support agents changes the email of the user in your user management system you have to inform the plenigo system about the changes.


For Java integration you can use the `com.plenigo.sdk.services.UserManagementService#changeEmail` in order to change the e-mail address of an existing user.

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| customerID     | yes     | string         | The customer ID |
| email     | yes     | string         | The new email address for that customer |
| useExternalCustomerID    | yes     | boolean         | The external customer ID|

```java
// 1.Step: Configure the Java SDK: Provide the secret(e.g.Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj) and the company ID(e.g. 23NuCmdPoiRRkQiCqP9Q) from the plengio backend.
String secret = "Q11DfmzRQcQie3Pp3twzKO32HsV78TngrY2ddvj";  // The secret key of your specific company.
String companyId = "23NuCmdPoiRRkQiCqP9Q";  // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyID );

// 2.Step: Fill in the data for changeEmail() mehtod.
String email =  "testChangeEMail@mail.com"; // The new email address for that customer.

// 3.Step:  This method returns true if the email was changed successfully otherwise it will return false.
boolean useExternalCustomerID = false; // Flag indicating if customer ID sent is the external customer ID.
boolean changeEmail = UserManagementService.changeEmail(String customerID, String email, useExternalCustomerID);
```

### Implementation without SDK

Another possibility to change an email address of an existing user - is a direct call to our REST API:

* [Change email address of an existing user](https://api.plenigo.com/#!/external_user_management/changeExternalUserEmail)
