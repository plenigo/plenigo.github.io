---
layout: default
title: plenigo custom integration
permalink: /custom_integration
---

# plenigo custom integration

If you are not able to use one of the existing SDKs you can also implement the functionality of the [plenigo API](https://api.plenigo.com) by yourself.

There are some additional things you have to implement besides the API to use the full feature set of plenigo.

> plenigo relies heavily on correct date times so make sure your servers time is up to date. Running NTP is strongly recommended.

## Plenigo Token

{% include_relative includes/plenigo_token.md %}

## Metered Views

{% include_relative includes/metered_views.md %}

## Encrypted checkout string

{% include_relative includes/checkout_string.md %}

## Single sign on (SSO)

{% include_relative includes/single_sign_on.md %}