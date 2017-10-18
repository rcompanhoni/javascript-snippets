import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Button, Modal } from 'react-bootstrap/lib';

import styles from './styles.scss';

class LearnMore extends Component {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);

    this.state = {
      open: false,
    };
  }

  closeModal() {
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <p>
        <Button bsStyle="primary" bsSize="large" onClick={this.openModal}>Learn more »</Button>

        <Modal show={this.state.open} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Learn More</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            This demonstrates how to use the Modal component from React-Bootstrap
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </p>
    );
  }
}

export default CSSModules(LearnMore, styles);
