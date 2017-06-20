Every request to the plenigo API is protected by a so called "plenigo Token". The plenigo token is a JWT with Hash Algorithm HS256. Use your plenigo merchant
secret key as key for the hash function.

The JWT itself contains the following payload

|Parameter|Description|
|:--------|:----------|
|jti|Unique identifier for this request. This identifier is there to prevent reply attacks so you must not reuse it|
|aud|Must be the string "plenigo"|
|exp|Validity time for the JWT. We recommend the current timestamp plus 5 minutes|
|companyId|Your company id from the plenigo merchant backend|

Following an example in VB.NET:

```vb
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