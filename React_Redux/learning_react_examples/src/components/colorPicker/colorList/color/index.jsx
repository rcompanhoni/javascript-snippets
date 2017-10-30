import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import StarRating from '../../../starRating';

const Color = ({
  title,
  color,
  rating,
  onRemove,
}) => (
  <section>
    <h1>{title}</h1>
    <button onClick={onRemove}>X</button>
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
  onRemove: f => f,
};

Color.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  rating: PropTypes.number,
  onRemove: PropTypes.func,
};

export default CSSModules(Color, styles);
