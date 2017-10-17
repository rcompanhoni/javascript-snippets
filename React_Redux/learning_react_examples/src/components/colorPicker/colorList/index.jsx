import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import Color from './color';

const ColorList = ({ colors }) => {
  const items = colors.map(color => (
    <Color
      key={color.id}
      {...color}
    />
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
};

ColorList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
};

export default CSSModules(ColorList, styles);
