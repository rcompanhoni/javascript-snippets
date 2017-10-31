import React from 'react';
import { Button } from 'react-bootstrap/lib/';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import ReactDropzone from 'react-dropzone';

import styles from './styles.scss';

const UploadButton = ({
  text,
  bsStyle,
  onDrop,
  mimeTypes,
}) => {
  let input;

  const openFileDialog = () => {
    input.fileInputEl.click();
  };

  return (
    <div>
      <Button
        bsStyle={bsStyle}
        onClick={openFileDialog}
      >{text}
      </Button>

      <ReactDropzone
        onDrop={onDrop}
        accept={mimeTypes}
        className={styles.dropzone}
        ref={(ref) => { input = ref; }}
      />
    </div>
  );
};

UploadButton.defaultProps = {
  text: 'Upload',
  bsStyle: 'default',
  onDrop: f => f,
  mimeTypes: null,
};

UploadButton.propTypes = {
  text: PropTypes.string,
  bsStyle: PropTypes.string,
  onDrop: PropTypes.func,
  mimeTypes: PropTypes.string,
};

const styledComponent = CSSModules(UploadButton, styles);
export default styledComponent;
