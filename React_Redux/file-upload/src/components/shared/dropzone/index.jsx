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

    this.state = {
      files: [],
    };
  }

  onDrop(acceptedFiles, rejectedFiles) {
    if (rejectedFiles.length > 0) {
      this.props.createAlert({ type: 'danger', headline: 'Error', message: 'The provided file is not valid.' });
    } else {
      this.props.createAlert({ type: 'success', headline: 'File Uploaded', message: 'A file was uploaded successfully.' });
    }

    this.setState({ files: acceptedFiles });
  }

  render() {
    return (
      <section>
        <ReactDropzone
          accept="image/png, image/jpeg"
          className={styles.dropzone}
          activeClassName={styles.active}
          acceptClassName={styles.accept}
          rejectClassName={styles.reject}
          onDrop={this.onDrop}
        >
          <h4>Drop your files here or double click to select</h4>
        </ReactDropzone>

        <aside>
          <h4>Dropped files</h4>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
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
