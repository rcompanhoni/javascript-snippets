import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDropzone from 'react-dropzone';
import * as actions from '../../../actions';
import styles from './styles.scss';

class Dropzone extends Component {
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      this.props.createAlert({ type: 'danger', headline: 'Error', message: 'The provided file is not valid.' });
    } else {
      this.props.createAlert({ type: 'success', headline: 'File Uploaded', message: 'A file was uploaded successfully.' });
    }
  }

  render() {
    return (
      <ReactDropzone
        accept="image/png, image/jpeg"
        className={styles.dropzone}
        activeClassName={styles.active}
        acceptClassName={styles.accept}
        rejectClassName={styles.reject}
        onDrop={this.onDrop}
      >
        <h4>Drop your files here or click to select</h4>
      </ReactDropzone>
    );
  }
}

Dropzone.defaultProps = {
  createAlert: null,
};

Dropzone.propTypes = {
  createAlert: PropTypes.func,
};

const styledComponent = CSSModules(Dropzone, styles);
export default connect(null, actions)(styledComponent);
