import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import DataComponent from '../HOC/dataComponent/dataComponent';

import HiddenMessages from '../hiddenMessages/hiddenMessages';
import CountryDropdown from '../countryDropdown/countryDropdown';

const ComposedCountryDropdown = DataComponent(CountryDropdown, 'https://restcountries.eu/rest/v1/all');

const App = () => (
  <div>
    <HiddenMessages />
    <ComposedCountryDropdown />
  </div>
);

export default CSSModules(App, styles);
