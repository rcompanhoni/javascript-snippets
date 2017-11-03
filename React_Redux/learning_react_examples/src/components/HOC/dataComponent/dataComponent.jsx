import React, { Component } from 'react';
import axios from 'axios';

export default (ComposedComponent, url) =>
  class DataComponentWrapper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        response: null,
        loading: true,
      };
    }

    componentWillMount() {
      this.setState({ loading: true });
    }

    componentDidMount() {
      axios.get(url)
        .then((response) => {
          this.setState({
            response,
            loading: false,
          });
        });
    }

    render() {
      return <ComposedComponent {...this.state} />;
    }
  };
