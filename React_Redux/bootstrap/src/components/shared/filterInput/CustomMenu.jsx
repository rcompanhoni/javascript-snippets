/* eslint-disable */
import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap/lib/';

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: ''
    };
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child => !value.trim() || child.props.children.indexOf(value) !== -1
          )}
        </ul>
      </div>
    );
  }
}

export default CustomMenu;
