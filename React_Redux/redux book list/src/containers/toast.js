import React, { Component } from "react";
import { connect } from 'react-redux';

class Toast extends Component {
  render() {
    if (!this.props.message) {
      return null;
    }

    return (
      <li style={{ backgroundColor: this.props.color }}>
        <p>{this.props.message}</p>

        <button onClick={this.props.onDismissClick}>x</button>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
      message: state.toastMessage 
  };
}

export default connect(mapStateToProps)(Toast);