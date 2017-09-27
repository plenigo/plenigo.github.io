---
layout: default
title: configure your  environment
permalink: /configure_environment
---

# Configure your environment 

> plenigo relies heavily on correct date times so make sure your servers time is up to date. Running NTP is strongly recommended.

> Please keep in mind that you need to include the plenigo JavaScript-SDK in every HTML page you would like to use plenigo functionality. The necessary information can be found in the JavaScript documentation.

### Implementation with SDKS

#### Java

In order to configure the SDK, you have to execute the following steps.

1. Get the company secret and id from the plenigo backend

![Company data](/assets/images/ci/company_data.png)

2. Configure your environment 


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| companyId     | yes     | string         | The secret key for your specific company (Plenigo Backend-> Settings->Company data) |
| secret     | yes     | string         | The company ID of your specific company (Plenigo Backend-> Settings->Company data) |

In order to configure the SDK, you must do the following: You must require and call `com.plenigo.sdk.PlenigoManager#configure ` method.

```java
String companyId = "12NuCmdZUTRRkQiCqP2Q"; //the company id of your specific company 
String secret = "RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj"; //the secret key of your specific company
PlenigoManager.get().configure(secret, companyId );
```
#### PHP

In order to configure the SDK, you must do the following: You must require and call `\plenigo\PlenigoManager::configure()` method.


|Parameter|Required|Value type|Description|
|:--------|:-------|:---------|:----------|
| $companyId     | yes     | string         | The secret key for your specific company(Plenigo Backend-> Settings->Company data) |
| $secret     | yes     | string         |  The company ID of your specific company (Plenigo Backend-> Settings->Company data) |

```php
<?php
require_once 'libs/php_sdk/plenigo/Plenigo.php';
$companyId = '12NuCmdZUTRRkQiCqP2Q'; //the company id of your specific company 
$secret = 'RrrDfmzUTcQiY8PpLtwzNP8LHsV78TngrY5TTvj'; //the secret key of your specific company 
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


#### C#

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
            { "companyId", "12NuCmdZUTRRkQiCqP2Q"}
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
#### GO

```go
import(
   jwt "github.com/dgrijalva/jwt-go"
   "github.com/satori/go.uuid"
   "time"
)

func generateToken(companyId string, companySecret string) string {
   token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
      "companyId": "12NuCmdZUTRRkQiCqP2Q",
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




