# Oauth2orize Example

This application demonstrates how to use oauth2orize along with the passport module to implement 3 (out of 4) OAuth 2.0 authorization grants

* *authorization code*
* *implicit*
* *password credentials* 

### IMPLEMENTATION OVERVIEW

Two controllers are used in conjunction to implement the OAuth 2.0 authorization flows:

* **controllers/authController**: implements the BasicStrategy and BearerStrategy passport strategies.
* **controllers/oauth2Controller**: implements the oauth 2.0 authorization server with the oauth2orize module.

In the *app.js* file there are 3 routes related to the authorization flows:

* **authorization code**: 
    * **route**: *router.get('/oauth2/authorize', authController.isAuthenticated, oauth2Controller.authorization);*    
    * **example URL**: *http://localhost:3000/api/oauth2/authorize?response_type=code&client_id=test_application_id&redirect_uri=http://localhost:3000&scope=read*
    
* **implicit**: 
    * **route**: *router.post('/oauth2/authorize', authController.isAuthenticated, oauth2Controller.decision);*
    * **example URL**: *http://localhost:3000/api/oauth2/authorize?response_type=token&client_id=test_application_id&client_secret=test_application_secret&redirect_uri=http://localhost:3000*
    
* **password credentials**: 
    * **route**: *router.post('/oauth2/token', authController.isClientAuthenticated, oauth2Controller.token);*
    * **example URL**: *http://localhost:3000/api/oauth2/authorize?response_type=password&username=Rafael&password=123*

### PACKAGES USED

* **passport-http**: lets you authenticate HTTP requests using the standard basic and digest schemes in your Node.js applications. By plugging into Passport, support for these schemes can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.
* **passport-http-bearer**: lets you authenticate HTTP requests using bearer tokens, as specified by RFC 6750, in your Node.js applications. Bearer tokens are typically used protect API endpoints, and are often issued using OAuth 2.0.


