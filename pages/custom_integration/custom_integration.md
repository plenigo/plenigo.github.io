---
layout: default
title: plenigo custom integration
permalink: /custom_integration
---

# Start integration

If you are not able to use one of the existing SDKs you can also implement the functionality of the [plenigo API](https://api.plenigo.com) by yourself.

There are some additional things you have to implement besides the API to use the full feature set of plenigo.

> plenigo relies heavily on correct date times so make sure your servers time is up to date. Running NTP is strongly recommended.
 
## Plenigo Token

{% include_relative includes/plenigo_token.md %}

## Metered views

{% include_relative includes/paywall.md %}

## External User Management

{% include_relative includes/external_user_management.md %}

## Single sign on (SSO)

{% include_relative includes/single_sign_on.md %}

## Products

{% include_relative includes/products.md %}

## Checkout

{% include_relative includes/checkout.md %}

## Encrypted checkout string

{% include_relative includes/checkout_string.md %}

## Voucher Campaigns

{% include_relative includes/voucher_campaigns.md %}
