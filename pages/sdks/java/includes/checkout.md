***
**Checkout process includes login**

It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. 
***

Plenigo's checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

### Types of checkout

Depending on which type of product you want to checkout, there is a different amount of data that must be filled in, below there are examples:

#### Plenigo Managed Product

If the product is managed by the plenigo and was configured in the plenigo website, only the product id is required for checkout.

By using the `com.plenigo.sdk.builders.CheckoutSnippetBuilder` class, you can create snippets easily by filling out the com.plenigo.sdk.models.Product class with the required information:

```java
 // id of the product
Product product = new Product("news2014");
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
#### Other Products

For these products, you have to specify more information such as tax, description, currency, etc. Below there are examples.

```java
// price of the product, description, id, currency and  the tax percentage (28% in this case) of tax that should be calculated for this product
Product product = new Product(5.00,"Important News 2014","news-2014","USD", 28.00);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
Both of these examples will create a snippet that can be used in a javascript event(such as onclick) and it will start the checkout flow when used in a webpage (html, jsp, gsp, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

#### Failed Payments

If you want to create a button/link to the "Failed Payments" listing for the customer you can do it by creating a special product object like this:

```java
//just create a checkout snippet with a no args build
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the _Product_ object. This way you can create a subscription renewal button in your site easily setting this flag:

```java
 // id of the product
Product product = new Product("news2014");
//set the renewal flag
product.setSubscriptionRenewal(true);
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```

#### Override mode

This is used when you want to replace the regular price of a plenigo managed product for another one of your liking:

```java
 // id of the product and the custom price, this will override the regular price of the product for that
 // checkout
Product product = new Product("news2014", 25.00);
//set the override mode
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product).withOverrideMode();
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.build();
```
#### Login Token

This is used when your company is registered as a Closed User Group and you want to provide access to a specific user so that he can do a checkout:

```java
 // id of the product
Product product = new Product("news2014");
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//then we proceed to register an user and create a login token to use in the checkout
String userId = UserManagementService.registerUser("email@example.com");
String loginToken = UserManagementService.createLoginToken(userId);
//now we add the login token to the checkout snippet builder by calling the following method
snippetBuilder.withLoginToken(loginToken);
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE','LOGIN_TOKEN_HERE');
String snippet = snippetBuilder.build();
```
### Using CSRF Token

For a more secure way to communicate with the server you can generate a cross-site request forgery token so that when the user is redirected to the page, you can ensure that the redirect comes from the website you requested it to, below there are examples of how to generate the snippet.

You can use the `com.plenigo.sdk.services.TokenService#createCsrfToken()` method to generate a token:

```java
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder();
String csrfToken = TokenService.createCsrfToken();
String snippet = snippetBuilder.withCSRFToken(csrfToken).build(); 
```

### Checkout combined with OAuth2

```java
 // id of the product
Product product = new Product("news2014");
CheckoutSnippetBuilder snippetBuilder = new CheckoutSnippetBuilder(product);
//We create a CSRF random token with the TokenService
String csrfToken = TokenService.createCsrfToken();
//This url must be registered within plenigo prior to being used
String redirectUrl = "http://example.com";
//The snippet will have the following format: plenigo.checkout('ENCRYPTED_STRING_HERE');
String snippet = snippetBuilder.withCSRFToken(csrfToken).withSSO(redirectUrl).build();
```