import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import HeaderNavigation from '../header_navigation';
import Body from '../body';
import Footer from '../footer';

const App = () => (
  <div>
    <HeaderNavigation />
    <Body />
    <Footer />
  </div>
);

export default CSSModules(App, styles);
