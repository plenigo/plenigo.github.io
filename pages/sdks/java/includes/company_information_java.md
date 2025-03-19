---
layout: default
title: Company information
permalink: /company_information_java
---

# Company information

Company Service allows you to get structured information about your company's customers in order to show it or use it at your site/app.

* [Get a paginated list of customers ?](https://plenigo.github.io/company_information_java#get-a-paginated-list-of-customers)
* [Get users by the user ids ?](https://plenigo.github.io/company_information_java#get-users-by-user-ids)

## Get a paginated list of customers 

In order to get a paginated list of customers, you can call the company listing service. It will return a paginated list of company users.

### Java

For Java you can use `plenigo\services\AppManagement#getUserList()` method for this purpose:

| name       | description                                                                   |
|:-----------|:------------------------------------------------------------------------------|
| pageRequest| It is a `com.plenigo.sdk.models#PageRequest` object                     |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:12NuCmdZUTRRkQiCqP2Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company.
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Get paginated list of customers
int pageNumber = 0; // First page
int pageSize = 30; // 30 results per page
PageRequest pageRequest = new PageRequest(pageNumber, pageSize):
ElementList<CompanyUser> list = CompanyService.getUserList(pageRequest);
```

**NOTE:** The method will not fail for page and size values that are out of range, instead, the values are going to be clamped to the limits established above.

## Get a paginated list of customers without SDK

Another possibility to get a paginated list of customers - can be a direct call to our REST API:

* [Get paginated list of customers](https://api.plenigo.com/#!/company/getCompanyUsers)

## Get users by user IDs 

In order to get all users by user IDs, you can call the company listing service. It will return a paginated list of company users.


For Java you can use `com.plenigo.sdk.services.CompanyService#getUserList()` in order to get user by IDs.

| name        | description                                                                        |
|:------------|:-----------------------------------------------------------------------------------|
| userList    | List of user IDs you want to search for |

```java
// 1.Step: Configure the Java SDK: The secret (e.g. secret:QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj) and the company ID (e.g.:12NuCmdZUTRRkQiCqP2Q).
String secret = "QrrDfmzRQcQie3Pp3twzNP8LHsV78TngrY5TTvj";  // The secret key of your specific company.
String companyId = "12NuCmdZUTRRkQiCqP2Q"; // The company ID of your specific company.
PlenigoManager.get().configure(secret, companyId );

// 2.Step: Get user by ids.
String userIds [] = {"XXXC9XXVZX6J", "QTYYW6EBDXXV", "XXXVBX3SN2EI", "RRZ1XX3WRPV5"}; // The customer IDs from the Frisbii Media Backend.
List  = new ArrayList(Arrays.asList(userIds));
List<CompanyUser> list = CompanyService.getUserList(list);
```

**NOTE:** These Customer Ids can be obtained by logging in to our company dashboard, and searching by several filters.

### Get users by user ids without SDKs

Another possibility to get by user IDs - is direct call to our REST API:

* [Get user by id](https://api.plenigo.com/#!/company/getCompanyUsersFromUserIds)
