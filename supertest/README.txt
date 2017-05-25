Supertest

From the book "Express in Action" by Evan M Hahn. This application 

Uses the 'supertest' module to make integration tests on an Express API. “What’s My User Agent?” is a simple application for getting the User Agent string of your users. 
It will support a classic HTML view when you visit it in a browser. You’ll also be able to get the user’s User Agent as plain text. There will be just one route for these two responses. 

* If a visitor comes to the root of your site (at /) and doesn’t request HTML (as most web browsers would), they’ll be shown their User Agent as plain text. 
* If they visit the same URL but their Accepts header mentions HTML (as web browsers do), they’ll be given their User Agent as an HTML page.

TOPICS COVERED

> Mocha: testing framework
> Chai: assertion library
> Supertest: library for testing node.js HTTP servers using a fluent API
> Cheerio: is jQuery for Node -- useful for manipulating HTML DOM elements used to verify HTML responses, in tests


