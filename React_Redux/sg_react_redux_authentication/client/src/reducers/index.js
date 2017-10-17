/* The redux-form is a React library that provides its own reducer. Here it's being aliased as 'form'. In the combineReducers config object, since the key 
   <stateValue, reducer> would be form: form we use ES6 simplified sytax making it simply just 'form'
*/

import { combineReducers } from 'redux';
import { reducer as formReducer  } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer
});

export default rootReducer;
