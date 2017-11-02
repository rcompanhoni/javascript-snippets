import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import HiddenMessages from '../hiddenMessages/hiddenMessages';

const App = () => (
  <div>
    <HiddenMessages />
  </div>
);

export default CSSModules(App, styles);
