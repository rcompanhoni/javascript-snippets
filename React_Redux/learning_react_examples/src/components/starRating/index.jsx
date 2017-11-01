import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { v4 } from 'uuid';
import styles from './styles.scss';

import Star from './star';

class StarRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starsSelected: props.starsSelected,
    };

    this.change = this.change.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const status = (this.state.starsSelected > prevState.starsSelected) ? 'better' : 'worse';
    console.log(`This color is getting ${status}`); //eslint-disable-line
  }

  change(starsSelected) {
    this.setState({ starsSelected });
  }

  render() {
    const { totalStars } = this.props;
    const { starsSelected } = this.state;

    return (
      <div>
        {
          [...Array(totalStars)].map((n, i) =>
            (<Star
              key={v4()}
              selected={i < starsSelected}
              onClick={() => this.change(i + 1)}
            />))
        }

        <p>{starsSelected} of {totalStars} stars</p>
      </div>
    );
  }
}

StarRating.propTypes = {
  totalStars: PropTypes.number,
  starsSelected: PropTypes.number,
};

StarRating.defaultProps = {
  totalStars: 5,
  starsSelected: 0,
};

export default CSSModules(StarRating, styles);
