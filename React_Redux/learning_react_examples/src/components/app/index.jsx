import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import ColorPicker from '../colorPicker';

const App = () => (
  <div>
    <ColorPicker />
  </div>
);

export default CSSModules(App, styles);
