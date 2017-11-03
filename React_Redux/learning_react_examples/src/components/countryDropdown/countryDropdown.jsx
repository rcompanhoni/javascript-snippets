import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import v4 from 'uuid';
import styles from './countryDropdown.scss';

class CountryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryNames: null,
      loading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { response, loading } = nextProps;
    const countryNames = response.data.map(country => country.name);
    this.setState({
      countryNames,
      loading,
    });
  }

  render() {
    const { countryNames, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!countryNames.length) {
      return <div>No country Names</div>;
    }

    return (
      <select>
        {countryNames.map(name => <option key={v4()} value={name}>{name}</option>)}
      </select>
    );
  }
}

CountryDropdown.defaultProps = {
  response: null,
};

CountryDropdown.propTypes = {
  loading: PropTypes.bool.isRequired,
  response: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default CSSModules(CountryDropdown, styles);
