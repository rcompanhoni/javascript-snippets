import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './overlay.scss';

const Overlay = () => (
  <div styleName="overlay">
    <div styleName="loader" />
  </div>
);

export default CSSModules(Overlay, styles);
