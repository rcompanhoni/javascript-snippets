import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';
import * as actions from '../../../actions';
import styles from './styles.scss';

const Dropzone = ({ children, onDrop }) => {
  if (!children) {
    return (
      <ReactDropzone
        accept="image/png, image/jpeg"
        className={styles.dropzone}
        activeClassName={styles.active}
        acceptClassName={styles.accept}
        rejectClassName={styles.reject}
        onDrop={onDrop}
      >
        <h4>Drop your files here or click to select</h4>
      </ReactDropzone>
    );
  }

  return (
    <ReactDropzone
      className={styles.dropzoneAsWrapper}
      activeClassName={styles.active}
      onDrop={onDrop}
      acceptClassName={styles.accept}
      rejectClassName={styles.reject}
      disableClick
    >
      {children}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  children: null,
  onDrop: null,
};

Dropzone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onDrop: PropTypes.func,
};

const styledComponent = CSSModules(Dropzone, styles);
export default connect(null, actions)(styledComponent);
