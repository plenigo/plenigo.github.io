---
layout: default
title: external user management Java
permalink: /error_handling_java
---



# Error handling 

All the errors are handled through the `com.plenigo.sdk.PlenigoException` object, which extends `java.lang.Exception` meaning you are required to catch/throw it, the SDK helps you with many formatting errors and validations, but it is advised to catch this exception for any other types of error that might happen like access token expiration, etc.