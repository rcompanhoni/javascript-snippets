import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Home from './components/home';
import SelectedIssues from './containers/selected_issues';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/selected-issues" component={SelectedIssues} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
