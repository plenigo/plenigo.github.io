### Integrate your site with predefined views of your plenigo customers

Handling login and users in plenigo is easy but sometimes can be bothersome for users to edit their profile in a site that's not yours. With snippets we can help you achieve that "white label" experience, so they can interact with plenigo without leaving your site.

This is the list of snippets available so far:

1. PERSONAL_DATA: A user profile visualization and editor, so the customers have their data updated in your site.
2. ORDER: A view of the user's orders, their status and details.
3. SUBSCRIPTION: A list of the user subscriptions and their status.
4. PAYMENT_METHODS: An editor to change their payment method preferences, like bank account or credit card data.
5. ADDRESS_DATA: A page that allows to change shipping and billing addresses fotr the user.

#### Prerequisites
In order to user the snippets with the PHP SDK there are a couple of requisites:

1. Install and configure the PHP SDK with your company data. See [Installation instructions](/sdks/php)
2. Create the pages that will host the snippets (i.e.: /user/profile, /user/orders, /user/subscriptions, etc.)
3. (Optional) create elements that will serve as containers of the snippets (i.e.: `<div id="plenigoUserData"></div>`)

> **TIP:** You can place several snippets in a single page, like tab sections or a complete personal profile in a single page

#### Using the PlenigoSnippetBuilder

In order to use the class `PlenigoSnippetBuilder` you will have to include it in your use clause:

```php
use plenigo\builders\PlenigoSnippetBuilder;
```

Before instantiate it we should include and instantiate a configuration object to provide to the builder's constructor method:

```php
use plenigo\models\SnippetConfig;

(...)

$config = new SnippetConfig($elementId, $snippetId, $redirectUrl); //optional also a fourth patameter $loginToken, see below
```

##### Parameter list

|Parameter|Required|Value type|Description                                                                                                                               |
|:--------|:-------|:---------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| $elementId     | optional     | string         | The id of the HTML element the snippet should be rendered into. If null is given, the build string will contain an HTML DIV element to render the snippet.                                   |
| $snippetId     | required     | string         | Altough this is a string parameter it needs to ve one of the components on the SnippetType enum. You can call the class statically (i.e: `SnippetType::PERSONAL_DATA`)                       |
| $redirectUrl   | required     | url (string)   | It is strongly recommended that you check if a user is logged in before showing a snippet.  If you don't do this check the user will be redirected to this URL if the user is not logged in. |
| $loginToken    | optional     | string         | This is required only if you are using external user management and not plenigo internal user management.                                                                                    |


The builder object now get to be instantiated and upon a call to the `build()` method, it will return a string that should be placed in the output of the page. For example:

```php
<?php
$elementId = "plenigoPersonalProfile";
$snippetId = SnippetType::PERSONAL_DATA;
$redirectUrl = "https://www.mysite.com/login";

// creating the config
$config = new SnippetConfig($elementId, $snippetId, $redirectUrl);

// now the builder
$builder = new PlenigoSnippetBuilder($config);
$snippetScript = $builder->build();
?>
<div id="plenigoPersonalProfile"></div>
(...)
<?php echo $snippetScript; ?>
(...)
```

This is good practice for initialization reasons, like deferred initialization of scripts, jQuery, etc.

Also as stated before, you can simply avoid the elementId value so the builder will build it for you. For example:

```php
<?php
$elementId = null;
$snippetId = SnippetType::PERSONAL_DATA;
$redirectUrl = "https://www.mysite.com/login";

// creating the config
$config = new SnippetConfig($elementId, $snippetId, $redirectUrl);

// now the builder
$builder = new PlenigoSnippetBuilder($config);
$snippetScript = $builder->build();
?>
(...)
<?php echo $snippetScript; ?>
(...)
```

And that is all for showing up the plenigo snippets on your site. Be creative and test different combinations. You can instantiate as many builders as you want. The sky is the limit