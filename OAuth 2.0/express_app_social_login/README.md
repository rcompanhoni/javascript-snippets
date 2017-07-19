# Express App OAuth 2.0 Social Login

Tutorial from https://scotch.io/tutorials/easy-node-authentication-setup-and-local. A simple Express application that demonstrates how to use the following Passport strategies: 
* *LocalStrategy*
* *FacebookStrategy*
* *TwitterStrategy*
* *GoogleStrategy*

You'll have to create a developer account in each OAuth 2.0 provider (i.e. Google, Facebook...) and configure the provided key, secret and callback in the */config/auth.js* file

### PACKAGES USED

* **passport**: authentication middleware for Node.js
* **connect-flash**: The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
* **morgan**: HTTP request logger middleware for node.js
* **cookie-parser**: Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.


