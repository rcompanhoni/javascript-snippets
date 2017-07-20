import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.getRepoIssues(this.state.term);
        this.setState({ term: '' });
    }

    render() {
        return (
            <form id="search-bar-form" onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Inform a GitHub repository (e.g. facebook/react)"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />

                <span className="input-group-btn">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </span>
            </form>
        );
    }
}

export default connect(null, actions)(SearchBar);