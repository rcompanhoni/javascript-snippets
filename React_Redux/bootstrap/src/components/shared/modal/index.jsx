import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap/lib';
import styles from './styles.scss';

class ReactModal extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.display,
    });
  }

  closeModal() {
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <Modal show={this.state.open} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>TITLE</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          TODO
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ReactModal.defaultProps = {
  display: false,
};

ReactModal.propTypes = {
  display: PropTypes.bool,
};

export default CSSModules(ReactModal, styles);
