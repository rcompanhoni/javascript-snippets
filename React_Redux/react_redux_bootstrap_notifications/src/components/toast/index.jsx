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
    let { alerts } = nextProps;

    if (alerts.length > 0) {
      // TODO - filter here, keeping in upcoming 'alerts' only the ones that are not already present in this.state.alerts

      alerts = alerts.map((alert) => {
        const newAlert = {
          id: v4(),
          type: alert.type,
          headline: alert.headline,
          message: alert.message,
        };

        return newAlert;
      });
    }

    this.setState({
      alerts: [...this.state.alerts, ...alerts],
    });

    return null;
  }

  render() {
    return (
      <AlertList
        position="top-right"
        alerts={this.state.alerts}
        dismissTitle="Begone!"
        onDismiss={(alert) => { this.props.closeAlert(alert.message); }}
      />
    );
  }
}

Toast.defaultProps = {
  alerts: null,
  closeAlert: null,
};

Toast.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    headline: PropTypes.string,
    message: PropTypes.string,
  })),
  closeAlert: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
  };
}

const styledComponent = CSSModules(Toast, styles);
export default connect(mapStateToProps, actions)(styledComponent);
