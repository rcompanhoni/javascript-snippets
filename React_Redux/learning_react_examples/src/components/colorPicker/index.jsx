import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { v4 } from 'uuid';

import AddColorForm from './addColorForm';
import ColorList from './colorList';

import styles from './styles.scss';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: [],
    };

    this.addColor = this.addColor.bind(this);
  }

  addColor(title, color) {
    const colors = [
      ...this.state.colors,
      {
        id: v4(),
        title,
        color,
        rating: 0,
      },
    ];

    this.setState({ colors });
  }

  render() {
    const { colors } = this.state;

    return (
      <div className="app">
        <AddColorForm onNewColor={this.addColor} />
        <ColorList colors={colors} />
      </div>
    );
  }
}

export default CSSModules(ColorPicker, styles);
