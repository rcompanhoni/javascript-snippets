import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { jsdom } from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../src/reducers';
import reduxThunk from 'redux-thunk';

// uses jsdom to set up the testing environment to run like a browser in the command line
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window);

// helper that should render a given react class with a 'official' React utilitary called TestUtils.renderIntoDocument
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStoreWithMiddleware(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

// helper for simulating events with TestUtils.Simulate[eventName](HTML element)
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// set up chai-jquery
chaiJquery(chai, chai.util, $);

export {renderComponent, expect};
