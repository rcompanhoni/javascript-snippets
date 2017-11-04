import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class Expandable extends Component {
    constructor(props) {
      super(props);

      this.expandCollapse = this.expandCollapse.bind(this);

      this.state = {
        collapsed: (props.hidden && props.hidden === true),
      };
    }

    expandCollapse() {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    render() {
      return (
        <ComposedComponent
          expandCollapse={this.expandCollapse}
          {...this.state}
          {...this.props}
        />
      );
    }
  }

  Expandable.defaultProps = {
    hidden: true,
  };

  Expandable.propTypes = {
    hidden: PropTypes.string,
  };
};

