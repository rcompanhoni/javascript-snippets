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

  onDrop(files) {
    this.props.createAlert({ type: 'success', headline: 'File Uploaded', message: 'A file was uploaded.' });
    this.setState({ files });
  }

  render() {
    return (
      <section>
        <ReactDropzone styleName="dropzone" onDrop={this.onDrop}>
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
