import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Toast extends Component {
  render() {
    if (!this.props.message) {
      return null;
    }

    return (
      <div className="alert alert-warning">
        <p>{this.props.message}</p>
        <button onClick={() => this.props.setToast(null) }>x</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      message: state.toastMessage 
  };
}

export default connect(mapStateToProps, actions)(Toast);