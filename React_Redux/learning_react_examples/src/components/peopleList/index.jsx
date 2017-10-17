import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import fetch from 'isomorphic-fetch';
import { v4 } from 'uuid';
import styles from './styles.scss';

class PeopleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });

    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(obj => obj.results)
      .then(data => this.setState({
        loading: false,
        data,
      }));
  }

  render() {
    const { data, loading } = this.state;

    return (loading) ?
      <div>Loading...</div> :
      <ol>
        {data.map((person) => {
          const { first, last } = person.name;
          return <li key={v4()}>{first} {last}</li>;
        })}
      </ol>;
  }
}

export default CSSModules(PeopleList, styles);
