If you want a user to register at plenigo you can simply use the [Javscript SDK](/sdks/javascript#registration---open-the-plenigo-registration-window), or you can use this PHP-wrapper-method for this function

These are the ways you can provide a registration for your customers.

### Standard

This is the simplest way to register, below there are examples of how to generate the snippet.

You can use the `\plenigo\builders\RegisterSnippetBuilder` class to build the snippet.

```php
<?php
$builder = new \plenigo\builders\RegisterSnippetBuilder();
//This will generate the login snippet of the following format:
//plenigo.login();
$snippet = $builder->build();

// this generates a Javascript-Snippet with configuration-Object inside
// one have to call it before the register-link is displayed
// use the parameter to wrap the Javascript-Object with a <script>-tag
$config = $builder->writeOptions(true);

// now we can use this snippet in a link or button
echo '<a href="#" onclick="'.$snippet.'return false;">Register</a>';
```

This will create a snippet that can be used in a javascript event(such as onclick) and it will start the register flow when used in a webpage (html, jsp, gsp, php, etc) that has the plenigo Javascript SDK included as a script and initialized correctly.
