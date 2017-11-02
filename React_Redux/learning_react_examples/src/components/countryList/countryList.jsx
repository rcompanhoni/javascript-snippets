import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import v4 from 'uuid';
import axios from 'axios';
import styles from './countryList.scss';

class CountryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryNames: [],
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    const url = 'https://restcountries.eu/rest/v1/all';
    axios.get(url)
      .then((response) => {
        const countryNames = response.data.map(country => country.name);

        this.setState({
          countryNames,
          loading: false,
        });
      });
  }

  render() {
    const { countryNames, loading } = this.state;

    if (loading) {
      return <div>Loading Country Names...</div>;
    }

    if (!countryNames.length) {
      return <div>No country Names</div>;
    }

    return (
      <ul>
        {countryNames.map(country => <li key={v4()}>{country}</li>)}
      </ul>
    );
  }
}

export default CSSModules(CountryList, styles);
