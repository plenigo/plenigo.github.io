Every request to the Frisbii Media API is protected by a so called "Frisbii Media Token". The Frisbii Media token is a JWT with Hash Algorithm HS256. Use your Frisbii Media merchant
secret key as key for the hash function.

The JWT itself contains the following payload

|Parameter|Description|
|:--------|:----------|
|jti|Unique identifier for this request. This identifier is there to prevent reply attacks so you must not reuse it|
|aud|Must be the string "plenigo"|
|exp|Validity time for the JWT. We recommend the current timestamp plus 5 minutes|
|companyId|Your company id from the Frisbii Media merchant backend|

Test

**C#**

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
**GO**

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

