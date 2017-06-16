***
#### Checkout process includes login

It is not necessary to be logged in to use this snippet, the checkout flow is smart enough to identify when the user is not, and asks him to do so before. 
***

Plenigo's checkout flow is done in their own site, and it can easily be started by using the Javascript SDK, there is a quick way of creating a snippet of this call in the SDK.

## Types of checkout

Depending on which type of product you want to checkout, there is a different amount of data that must be filled in, below there are examples:

### Plenigo Managed Product

If the product is managed by the plenigo and was configured in the plenigo website, only the product id is required for checkout.

By using the \plenigo\builders\CheckoutSnippetBuilder class, you can create snippets easily by filling out the \plenigo\models\ProductBase class with the required information.

```php
// creating a Plenigo-managed product
$product = new \plenigo\models\ProductBase('item-123');

// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Buy this Product</a>';
```

### Other Products

For these products, you have to specify more information such as tax, description, currency, etc. Below there are examples.

```php
//creating the product ($productId, $productTitle, $price, $currency)
$product = new \plenigo\models\ProductBase('item-123', 'the best product',15.00,'USD');

//the custom product can then be configured
//Type of the product that defines the taxes
$product->setType(ProductBase::TYPE_EBOOK);
//creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
//now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Buy this Product</a>';
```

Both of these examples will create a snippet that can be used in a javascript event(such as onclick) and it will start the checkout flow when used in a webpage (html, jsp, gsp, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.

### Subscription renewal

If the product correspond to the subscription renewal, there is a flag in the **Product** object. This way you can create a subscription renewal button in your site easily setting this flag:

```php
// creating a Plenigo-managed product
$product = new \plenigo\models\ProductBase('item-123');
// setting the subscription renewal flag
$product->setSubscriptionRenewal(true);
    
// creating the checkout snippet for this product
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```

### Failed Payments

If you want to create a button/link to the "Failed Payments" listing for the customer you can do it by creating a special product object like this:

```php
// creating special product object for "Failed Payments"
$product = \plenigo\models\ProductBase::buildFailedPaymentProduct();
    
// creating the checkout snippet
$checkout = new \plenigo\builders\CheckoutSnippetBuilder($product);
$plenigoCheckoutCode = $checkout->build();
// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$plenigoCheckoutCode.'return false;">Renew your subscription</a>';
```

## Using CSRF Token

For a more secure way to communicate with the server you can generate a cross-site request forgery token so that when the user is redirected to the page, you can ensure that the redirect comes from the website you requested it to, below there are examples of how to generate the snippet.

You can use the \plenigo\services\TokenService::createCsrfToken() method to generate a token.

```php
// creating a Plenigo-managed product
$product = new \plenigo\models\ProductBase('PLENIGO_ITEM_ID');
// generating a random CSRF Token
$csrfToken = TokenService::createCsrfToken();

//creating and configuring the snippet builder
$builder = new CheckoutSnippetBuilder($product);
$snippet = $builder->build(array('csrfToken'=>$csrfToken));
//now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Buy this Product</a>';
```

## Checkout combined with OAuth2
```php
// creating a Plenigo-managed product
$product = new \plenigo\models\ProductBase('PLENIGO_ITEM_ID');
// generating a random CSRF Token
$csrfToken = TokenService::createCsrfToken();

//creating and configuring the snippet builder
$builder = new CheckoutSnippetBuilder($product);
// Adding an OAuth2 redirect url
$snippet = $builder->build(array('csrfToken'=>$csrfToken, 'oauth2RedirectUrl'=>'http://example.com'));
//now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Buy this Product</a>';
```

## Showing a registration screen instead of login

If you want the checkout process to show a registration screen as the first screen instead of the login screen (when no login token is provided. See: [Customer Administration](https://github.com/plenigo/plenigo_php_sdk/wiki/UserManagement)) you can pass a thid parameter to the build() function.

```php
// creating a product
$product = new \plenigo\models\ProductBase('PLENIGO_ITEM_ID');
// other settings like CSRF token, etc
$settings = array();

//creating and configuring the snippet builder
$builder = new CheckoutSnippetBuilder($product);
// Creating checkout code with no (NULL) login token and with 
// (TRUE) showing of the registration screen first
$snippet = $builder->build($settings, null, TRUE);
//now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Buy this Product</a>';
```