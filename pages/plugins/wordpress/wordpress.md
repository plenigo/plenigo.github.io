---
layout: default
title: plenigo Wordpress plugin
permalink: /plugins/wordpress
---

# plenigo Wordpress plugin

plenigo offers a plugin for the Wordpress to integrate and enable plenigo out-of-the-box. The plugin uses the plenigo [PHP-SDK](https://github.com/plenigo/plenigo_php_sdk/wiki).
This way all the functionality that is available in the plenigo PHP-SDK can also be added manually.

## Installation 

The plenigo Wordpress plugin is a standardised Wordpress plugin that can be found in the plugins section.

You only have to log in into your Wordpress go to 'Add New' in the menu 'Plugins' and search for 'plenigo'. In the search result click 'Install Now'.

![plugin_section](/assets/images/wp/wp_install_plenigo.png)

After the installation succeeded you have to activate the plugin. To activate the plugin open the plugin section again and click the 'Activate' link below the plugin name.

![plugin_section](/assets/images/wp/wp_activate_plenigo.png)

If the activation was successful you should see a new menu entry on the right side called 'Plenigo'.

## Configure OAuth2 login

OAuth2 enables your WordPress installation to get the plenigo user information passed after the user was authenticated with the plenigo system. This way you also
get a WordPress user in addition to the plenigo user.

plenigo recommends to install a plugin that disables the default WordPress user profile for the default user role if you enable the OAuth2 login.

### WordPress configuration

Open the tab "OAuth Login" in the plenigo plugin and change the settings the following way:

* Use OAuth Login -> Use plenigo Authentication Provider
* Enable Wordpress Login -> Only show plenigo login form
* Override WP Profile data -> Override Wordpress profile data with the plenigo data

To finish up you have to set an "OAuth2 redirect URL". This is needed because OAuth2 is a standardized protocol that needs a server to server communication.
The URL you enter here will be called after the authentication process on plenigo is finished. The target page processes the values returned by plenigo and
is going to redirect the user. Normally this page will never be seen by the user so you should choose on that is rendered very fast. The default WordPress login
form is a good start.

![plugin_section](/assets/images/wp/wp_plenigo_oauth.png)

### plenigo merchant backend

To finish up the configuration you have to enter the plenigo merchant backend and navigate to "Settings" -> "Oauth2". On this page you have to enter
the URL you entered in the WordPress plugin above.

## Configure premium content

To continue you have to have configured some products in the plenigo merchant backend.

This pages allows you to link plenigo products to different WordPress tags. These tags can be added to an article.

Start with creating a new tag. Call "Posts"->"Tags" and enter a new tag. You can also use an existing tag, our example assumes a new tag.

Create a new tag with the name "premium". The actual name doesn't matter. After that open the plenigo plugin tab "Premium Content". Enter the tag name "premium" into the first field. Warning: Don't copy the tag name start writing and accept the appropriate suggestion otherwise your tag won't be recognized correctly.
The first field should contain "payment{payment}" now. In the second field add the product ids of the plenigo backend product overview. You can add more than one product id to one tag. To do so separate them with a comma. Click save and your paywall will be activated for every content the tag is assigned to.

## Configure metered views

Metered views are controlled over the plenigo merchant backend. This page allows you to enter a link where the metered view functionality is explained.

> If metered is deactivated in the plenigo merchant backend you must also deactivate it in the WordPress backend.

## Configure curtain customization

### Customization of the PayWall

These settings enable you to adjust the PayWall curtain. The first two fields are for customers which are not logged in. The next two fields are for customers
 which are logged in but do not have an active subscription.

"Curtain Button Scheme" defines which buttons should be shown on the PayWall.

For a standard setting [Login Button] [Custom Button] will be enough. The link behind the "Customer Button" should link to a page where you can select the kind
of subscription you want to buy.

### Creating a subscription page

To create your subscription create a new post entry. The plenigo plugins adds additional buttons to the WordPress editor that allows you to insert plenigo
checkout buttons to your blog entry ("Product Checkout Button").

### Show preview

To define which text a user will be shown before the PayWall is shown you have two options:

* Use the normal WordPress read more tag
* You use the new added "plenigo Teaser Separator" in the editor

### Auto renewed subscriptions

You can create auto renewable subscriptions in the plenigo merchant backend. However some payment methods don't support automatic renewable subscriptions.
SofortÜberweisung for example needs to have a user interaction each time.

To allow renewable subscriptions with these payment methods the editor offers the "Subscription Renewal Button". You have to create a renewal button 
for each subscription you want to renew. You can add all buttons on one page or place them on different pages.

To finish up you have to enter the link of this page into the product details in the plenigo merchant backend. If the subscription renewal is reached, the user 
will get a email with a payment request and the link to the page you created.