import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import StarRating from '../../../starRating';

const Color = ({ title, color, rating }) => (
  <section>
    <h1>{title}</h1>

    <div
      styleName="color"
      style={{ backgroundColor: color }}
    />

    <div>
      <StarRating starsSelected={rating} />
    </div>
  </section>
);

Color.defaultProps = {
  title: '',
  color: '#FFF',
  rating: 0,
};

Color.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
};

export default CSSModules(Color, styles);
