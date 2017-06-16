### Handle products that require payment

In a case where you need to handle if a user has bought a product, it can be done easily.

#### Server logic

```php
<?php
//the product id that the user wants to buy, remember that there are
//limits for the amount of characters
$pid = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_ENCODED);
$companyId = PlenigoManager::get()->getCompanyId();
//we fill the id with the correct product
$returnPage = "news.php";
//The id must not be empty
if (is_null($pid) || $pid === FALSE || trim($pid) === '') {
    $returnPage = "error.php";
}
try {
    //This method returns true if the user has already bought the
    //product.
    $isNewsPaid = UserService::hasUserBought($pid);
    if ($isNewsPaid === FALSE) {
        //In this example, the product costs 0.99 euros and is a non
        //managed plenigo product. The description usually is filled
        //depending on the product, but for simplicity, we will
        //hardcode it
        $prodToChkOut = new ProductBase($pid, "Sample news title description",0.99 , "EUR");
        //Since he has not bought the product, we need to build the
        //checkout snippet so that he can do the flow on the plenigo
        //site and buy
        $snippet = new CheckoutSnippetBuilder($prodToChkOut)->build();
    }
}catch(PlenigoException $exc){
    //error handling for PlenigoExceptions
    $returnPage = "error.php";
}
```

#### Page logic

```html
<html>
<head>
    <title><?php echo $pid; ?></title>
    <!-- import the Plenigo Javascript SDK -->
    <script type="application/javascript" src="https://www.plenigo.com/static_resources/javascript/<?php echo $companyId; ?>/plenigo_sdk.min.js"></script>
</head>
<body>
    <?php if($isNewsPaid){ ?>
        <p>This is the news content</p>
    <?php }else{ ?>
        <p>Information about message that has to be paid here.</p>
        <button onclick="<?php echo $snippet; ?>">
            You must buy this news in order to watch the content
        </button>
    <?php } ?>
</body>
</html>
```

### Get user information

To get this information you must do part of the Single Sign On until you finish the Login Flow part, after this the user will be redirected to the url you specified in the login request, you can use this code in the servlet or controller that will receive this request in order to obtain user information.

```php
<?php
$code = filter_input(INPUT_GET, 'code', FILTER_SANITIZE_SPECIAL_CHARS);
//this url must be registered in plenigo
$redirectUrl = "https://example.com/given_path";
if(!is_null($code) && FALSE !== $code){
    //TokenData contains both the refresh and access token, so you can
    //use it
    $data = TokenService::getAccessToken($code,$redirectUrl);
    $userData = UserService::getUserData($data->getAccessToken());
    //Use the user data for any logic that you require
}
```