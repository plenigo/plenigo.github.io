---
layout: default
title: configure your  environment
permalink: /configure_environment
---

# Configure your environment 

> plenigo relies heavily on correct date times so make sure your servers time is up to date. Running NTP is strongly recommended.

> Please keep in mind that you need to include the plenigo JavaScript-SDK in every HTML page you would like to use plenigo functionality. The necessary information can be found in the JavaScript documentation.


### Implementation with SDKS

In order to configure the SDK, you have to execute the following steps.

##### Java

|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| companyId     | yes     | string         | The secret key for your specific company(Plenigo Backend-> Settings->Company data) |
| secret     | yes     | string         | The company ID of your specific company (Plenigo Backend-> Settings->Company data) |

In order to configure the SDK, you must do the following: You must require and call `com.plenigo.sdk.PlenigoManager#configure ` method.

```java
//Replace the secret and the company id with the correct ones you get from the plenigo backend.(Settings -> Company data)
String companyId = "COMPANY_ID";
String secret = "SECRET";
PlenigoManager.get().configure(secret, companyId );
```
##### PHP

In order to configure the SDK, you must do the following: You must require and call `\plenigo\PlenigoManager::configure()` method.


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $companyId     | yes     | string         | It is a String that represents the secret key for your specific company |
| $secret     | yes     | string         | It is a String that represents the company ID used |

```php
//Replace the secret and the company id with the correct ones you get from the plenigo backend.(Settings -> Company data)
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';

//define constants:
$companyId = 'COMPANY_ID';
$secret = 'SECRET';

//configure plenigo:
\plenigo\PlenigoManager::configure($secret, $companyId);
?>
```

### Implementation without plenigo SDKS

If you are using a programming language that is not supported by one of our SDKs you have to implement the functionality of the plenigo API by yourself.

Every request to the plenigo API is protected by a so called "plenigo Token". The plenigo token is a JWT with Hash Algorithm HS256. Use your plenigo merchant
secret key as key for the hash function.

The JWT itself contains the following payload

|Parameter|Description|
|:--------|:----------|
|jti|Unique identifier for this request. This identifier is there to prevent reply attacks so you must not reuse it|
|aud|Must be the string "plenigo"|
|exp|Validity time for the JWT. We recommend the current timestamp plus 5 minutes|
|companyId|Your company id from the plenigo merchant backend|


##### C#

```c#
class Plenigo 
{ 
    public static string CreatePlenigoToken()
    {
        var unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        var now = Math.Round((DateTime.UtcNow - unixEpoch).TotalSeconds);
        var payload = new Dictionary<string, object>()
        {
            { "jti", System.Guid.NewGuid().ToString()},
            { "aud", "plenigo"},
            { "exp",    Math.Floor((now + 5 * 60 * 1000) / 1000)},
            { "companyId", "COMPANY_ID"}
        };
    
        var secretKey = "secret";
        string token = JsonWebToken.Encode(payload, secretKey, JWT.JwtHashAlgorithm.HS256);
        return token;
    }
}

WebClient client = new WebClient();
client.Headers.Add("plenigoToken", Plenigo.CreatePlenigoToken());

// call API function
```
##### GO

```go
import(
   jwt "github.com/dgrijalva/jwt-go"
   "github.com/satori/go.uuid"
   "time"
)

func generateToken(companyId string, companySecret string) string {
   token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
      "companyId": companyId,
      "exp":       time.Now().Add(time.Minute * time.Duration(5)).Unix(),
      "aud":       "plenigo",
      "jti":       uuid.NewV4(),
   })
   
   // Sign and get the complete encoded token as a string using the company secret
   tokenString, err := token.SignedString([]byte(companySecret))

   if err != nil {
      // handle error
   }
}
```




