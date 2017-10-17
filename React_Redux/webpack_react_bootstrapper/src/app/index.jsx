import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Clock from '../clock';

const App = () => (
  <div>
    <h1 styleName="app-title">Webpack/React Bootstrapper Project</h1>
    <Clock />
  </div>
);

export default CSSModules(App, styles);
