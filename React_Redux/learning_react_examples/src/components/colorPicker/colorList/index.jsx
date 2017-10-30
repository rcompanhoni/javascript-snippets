import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Color from './color';

const ColorList = ({ colors, onRemoveColor }) => {
  const items = colors.map(color => (
    <Color key={color.id} {...color} onRemove={() => onRemoveColor(color.id)} />
  ));

  return (
    <ul>
      {
        (colors.length === 0) ?
          <p>No Colors Listed. (Add a Color)</p> :
          items
      }
    </ul>
  );
};

ColorList.defaultProps = {
  colors: [],
  onRemoveColor: f => f,
};

ColorList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  onRemoveColor: PropTypes.func,
};

export default CSSModules(ColorList, styles);
