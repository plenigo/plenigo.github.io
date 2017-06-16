All the errors are handled through the `\plenigo\PlenigoException` object, which extends `\Exception` meaning you are required to catch/throw it, the SDK helps you with many formatting errors and validations, but it is advised to catch this exception for any other types of error that might happen like access token expiration, etc.

In addition to that, the PHP log will be populated with `E_USER_NOTICE`, `E_USER_WARNING` and `E_USER_ERROR` messages in order to be able to debug with third party plugins and frameworks
