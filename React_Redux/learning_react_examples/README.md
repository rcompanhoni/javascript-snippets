# Learning React Examples

Examples from (or based on) the book 'Learning React', by Alex Banks and Eve Porcello.

## HOW TO USE

```
yarn install
yarn start (runs webpack-dev-server)
```

After that just import and use the component in the main App component:

```javascript
import HiddenMessages from '../hiddenMessages/hiddenMessages';

const App = () => (
  <div>
    <HiddenMessages />
  </div>
);
```

## COMPONENTS

* **Clock**: a simple clock that sets a timer and rerenders every second
* **ColorPicker**: Allows the user to select a color and creates a new component that indicates its rate. Demonstrates how to nest components and the inverse data flow.
* **CountryList**: Demonstrates how to fetch data from an API (lifecycle
methods)
* **HiddenMessages**: Displays three messages simultenously but only one is not encrypted at a time. A timer controls
* **PeopleList**: Demonstrates how to fetch data from an API (lifecycle methods)
* **StarRating**: Displays stars that can be clicked and used as a rating interface.
* **DataComponent**: HOC for executing a GET requests on the provided URL prop.
