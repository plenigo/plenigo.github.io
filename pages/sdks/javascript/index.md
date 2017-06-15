---
layout: default
title: Client side JavaScript-SDK
permalink: /sdk/javascript
---

# JavaScript SDK client side integration

The plenigo JavaScript-SDK offers the possibility to implement the plenigo functionality without a need for a server side request. 

## PayWall functionality

If you plan to use the PayWall functionality of plenigo you have to choose between three different use cases:

1. [Hide content afterwards](/sdk/javascript/hide_content_afterwards)

   The content will be visible on the page from the beginning and the plenigo JavaScript-SDK is going to hide it if the user is not allowed to see the content.
   If JavaScript is disabled or the user blocks the plenigo JavaScript-SDK she can access the whole page without any restrictions. [...](/sdk/javascript/hide_content_afterwards)
   
2. [Hide content by default](/sdk/javascript/hide_content_by_default)

   The content will be placed in an HTML element that is hidden. After the user was verified to be allowed to see the content the content will be made visible
   by the plenigo JavaScript-SDK. The user is still able to access the content in the HTML sources. [...](/sdk/javascript/hide_content_by_default)
   
3. [Load content afterwards](/sdk/javascript/load_content_afterwards)

   The content to be protected isn't on the site at all. After the user was verified to be allowed to see the content the content will be loaded by another URL.
   If the user disables JavaScript or blocks the plenigo JavaScript-SDK he will not be able to see the content. It is also not visible in the HTML sources. [...](/sdk/javascript/load_content_afterwards)
   

[back](/)