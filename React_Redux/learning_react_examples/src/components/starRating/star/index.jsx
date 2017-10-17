import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Star = ({ selected, onClick }) => (
  <div
    styleName={(selected) ? 'selected-star' : 'star'}
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex="0"
  />
);

Star.defaultProps = {
  selected: false,
  onClick: f => f,
};

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CSSModules(Star, styles);
