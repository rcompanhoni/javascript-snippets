import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { AlertList } from 'react-bs-notifier';
import * as actions from '../../actions';
import styles from './styles.scss';

class Toast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alerts: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { alert } = nextProps;

    if (!alert) {
      return null;
    }

    if (alert.id) {
      const idx = this.state.alerts.indexOf(alert);

      if (idx >= 0) {
        this.setState({
          alerts: [...this.state.alerts.slice(0, idx), ...this.state.alerts.slice(idx + 1)],
        });
      }
    } else {
      alert.id = v4();

      this.setState({
        alerts: [...this.state.alerts, alert],
      });
    }

    return null;
  }

  render() {
    return (
      <AlertList
        position="top-right"
        alerts={this.state.alerts}
        dismissTitle="Begone!"
        onDismiss={(alert) => { this.props.closeAlert(alert); }}
      />
    );
  }
}

Toast.defaultProps = {
  alert: null,
  closeAlert: null,
};

Toast.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    headline: PropTypes.string,
    message: PropTypes.string,
  }),
  closeAlert: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}

const styledComponent = CSSModules(Toast, styles);
export default connect(mapStateToProps, actions)(styledComponent);
