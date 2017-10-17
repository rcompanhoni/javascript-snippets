import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import HeaderNavigation from '../header_navigation';

// import Body from './Body';
// import Footer from './Footer';

const App = () => (
  <div>
    <HeaderNavigation />
  </div>
);

export default CSSModules(App, styles);
