## Supertest

From the book "Express in Action" by Evan M Hahn. 

This application uses the 'supertest' module to make integration tests on an Express API. “What’s My User Agent?” is a simple application for getting the User Agent string of your users. It will support a classic HTML view when you visit it in a browser. You’ll also be able to get the user’s User Agent as plain text. There will be just one route for these two responses. 

* If a visitor comes to the root of your site (at /) and doesn’t request HTML (as most web browsers would), they’ll be shown their User Agent as plain text. 
* If they visit the same URL but their Accepts header mentions HTML (as web browsers do), they’ll be given their User Agent as an HTML page.

### PACKAGES USED

* **mocha**: a feature-rich JavaScript test framework running on Node.js and in the browser
* **chai**: a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework
* **supertest**: provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent
    * **superagent**: is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features
* **cheerio**: Fast, flexible & lean implementation of core jQuery designed specifically for the server -- useful for manipulating HTML DOM elements used to verify HTML responses, in tests
