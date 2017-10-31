import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';
import * as actions from '../../../actions';
import styles from './styles.scss';

const Dropzone = ({
  children,
  onDrop,
  mimeTypes,
  disableClick,
}) => {
  if (!children) {
    return (
      <ReactDropzone
        onDrop={onDrop}
        accept={mimeTypes}
        className={styles.dropzone}
        activeClassName={styles.active}
        acceptClassName={styles.accept}
        rejectClassName={styles.reject}
      >
        <h4>Drop your files here or click to select</h4>
      </ReactDropzone>
    );
  }

  return (
    <ReactDropzone
      onDrop={onDrop}
      accept={mimeTypes}
      className={styles.dropzoneAsWrapper}
      activeClassName={styles.active}
      acceptClassName={styles.accept}
      rejectClassName={styles.reject}
      disableClick={disableClick}
    >
      {children}
    </ReactDropzone>
  );
};

Dropzone.defaultProps = {
  children: null,
  onDrop: null,
  mimeTypes: null,
  disableClick: false,
};

Dropzone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onDrop: PropTypes.func,
  mimeTypes: PropTypes.string,
  disableClick: PropTypes.bool,
};

const styledComponent = CSSModules(Dropzone, styles);
export default connect(null, actions)(styledComponent);
