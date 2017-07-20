import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import IssueList from '../containers/issue_list';
import Loader from '../containers/loader';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <IssueList />
        <Loader />
      </div>
    );
  }
}
