import React, { Component } from 'react'
import { connect } from 'react-redux';

class Loader extends Component {
	render() {
		if (this.props.processing)
			return (
				<div className="overlay">
					<div className="loader"></div>
				</div>
			);

		return null; 
	}
}

function mapStateToProps(state) {
    return {
        processing: state.searchedIssues.processing,
    };
}

export default connect(mapStateToProps)(Loader);