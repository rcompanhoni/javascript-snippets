import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './hiddenMessage.scss';

const HiddenMessage = ({ children, hide }) => (
  <p>
    {(hide) ? children.replace(/[a-zA-Z0-9]/g, 'x') : children}
  </p>
);

HiddenMessage.propTypes = {
  hide: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

HiddenMessage.defaultProps = {
  hide: true,
  children: null,
};

export default CSSModules(HiddenMessage, styles);
