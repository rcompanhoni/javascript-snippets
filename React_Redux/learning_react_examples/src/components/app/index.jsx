import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import HiddenMessages from '../hiddenMessages/hiddenMessages';
import CountryList from '../countryList/countryList';

const App = () => (
  <div>
    <HiddenMessages />
    <CountryList />
  </div>
);

export default CSSModules(App, styles);
