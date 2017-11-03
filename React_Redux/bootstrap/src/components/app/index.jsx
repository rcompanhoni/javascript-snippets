import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import HeaderNavigation from '../header_navigation';
import Body from '../body';
import Footer from '../footer';
import Toast from '../shared/toast';
import Overlay from '../shared/overlay/overlay';

const App = () => (
  <div>
    <Overlay />
    <HeaderNavigation />
    <Toast />
    <Body />
    <Footer />
  </div>
);

export default CSSModules(App, styles);
