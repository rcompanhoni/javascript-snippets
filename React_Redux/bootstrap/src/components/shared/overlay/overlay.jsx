import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './overlay.scss';

const Overlay = ({ loading }) => {
  if (loading) {
    return (
      <div styleName="overlay">
        <div styleName="loader" />
      </div>
    );
  }

  return null;
};

Overlay.propTypes = {
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

const styledComponent = CSSModules(Overlay, styles);
export default connect(mapStateToProps)(styledComponent);
