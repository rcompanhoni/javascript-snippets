/* eslint-disable */
import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap/lib/';

class CustomToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <FormGroup style={{ marginBottom: 0 }}>
        <FormControl type="text" onClick={this.handleClick}/>
      </FormGroup>
    );
  }
}

export default CustomToggle;
