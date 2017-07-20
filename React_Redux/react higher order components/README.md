## React Higher Order Components

Tutorial from Udemy's 'Advanced React and Redux' by Stephen Grider.

MODULES/PACKAGES USED

* *HOC (higher order component)*: A special React component that adds additional behavior to a regular React component
* *context*: A React object that provides access to data anywhere in the current tree of components. In this example it's used in the Authentication component in order to redirect the user to "/" if he is not authenticated.

* *React lifecycle methods*: The Authentication HOC uses 2 lifecycle methods
    * *componentWillMount*: called just before the component being rendered in the DOM, if the user is not authenticated then he will be redirected to the "/" (using the router object obtained from context)
    * *componentWillUpdate*:  called just before the component is about to be handed a new set of props. In this case, when the state property 'authenticated' is updated this method will be triggered. This is useful because, if the user is in a restricted page and the logs out, then he will be 'kicked' to the '/'.
