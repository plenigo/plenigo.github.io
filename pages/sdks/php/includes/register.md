If you want a user to register at Frisbii Media you can simply use the [Javascript SDK](/sdks/javascript#registration---open-the-plenigo-registration-window), or you can use this PHP-wrapper-method for this function

These are the ways you can provide a registration for your customers.

### Standard

This is the simplest way to register, below there are examples of how to generate the snippet.

You can use the `\plenigo\builders\RegisterSnippetBuilder` class to build the snippet.

```php
<?php
$builder = new \plenigo\builders\RegisterSnippetBuilder();
//This will generate the login snippet of the following format:
//plenigo.registration();
$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

This will create a snippet that can be used in a javascript event(such as onclick) and it will start the register flow when used in a webpage (html, jsp, gsp, php, etc) that has the Frisbii Media Javascript SDK included as a script and initialized correctly.

### Merge existing user
If you already imported your users to our system, you can merge the registered user with his subscriber ID by passing the following parameter:

```php
<?php
// see all available config-options here: https://plenigo.github.io/sdks/javascript#registration---open-the-plenigo-registration-window
$builder = new \plenigo\builders\RegisterSnippetBuilder(array('loginIdentifier' => true));

//This will generate the login snippet of the following format:
//plenigo.registration({loginIdentifier: true});
$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

### Single sign on (OAuth2)

#### Register Flow

Whenever you want to access user information, you can use this way of registration, the user will agree to share his information with you during the registartion flow, and then he gets redirected to the page you specified in the redirectionUri parameter, where you will receive an access code.

Below there are examples of how to generate this snippet.

In order to create the snippet you must fill a \plenigo\models\LoginConfig object with the following information.

```php
<?php

$builder = new  \plenigo\builders\RegisterSnippetBuilder(array(
    'ssoRedirectURL' => "https://www.example.com", // Redirect URL for the OAuth2 login process if OAuth2 is used.
    'scope' => "profile", // Scope of the OAuth2 login process. Currently the only available scope is profile   
));

$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// display the javascript configuration
echo $config;

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

### Using a template engine

If you're using a template engine you can't use the SDK this way. Just use the config-Object this way:

your controller logic:
```php
<?php

$builder = new  \plenigo\builders\RegisterSnippetBuilder(array(
    // any parameters you need   
));

$snippet = $builder->build();

// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(false);

echo $twig->render('template.twig', array(
    'plenigo' => array(
        'registerConfig' => $config,
        'registerButton' => $snippet,        
    ),
));
```
your twig-template:
{% raw %}
```html
...
<head>
    <script>
        // your javascript
        {{ plenigo.registerConfig }}
    </script>
</head>
<body>
...
    <a href="#" onclick="{{ plenigo.registerButton }}">Register</a>
...
</body>

```
{% endraw %}
