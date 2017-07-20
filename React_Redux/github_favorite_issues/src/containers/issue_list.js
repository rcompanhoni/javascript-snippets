import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class IssueList extends Component {
    renderIssue(issue) {
        return (
            <tr key={issue.id} onClick={() => this.props.toggleIssueSelection({ repository: this.props.repository, issue })}>
                <td>
                    {issue.selected ? <i className="fa fa-star selected-star" aria-hidden="true"></i> : <i className="fa fa-star-o selected-star" aria-hidden="true"></i>} 
                </td>

                <td>
                    <div className="media">
                        <i className={"fa fa-exclamation-circle pull-left issue-state-icon " + (issue.state === 'open' ? 'open-issue' : 'closed-issue')} aria-hidden="true"></i>

                        <div className="media-body">
                            <h4 className="title">
                                {issue.title}
                                <span className="pull-right">{issue.state}</span>
                            </h4>

                            <p className="summary">Issue <strong>#{issue.number}</strong>, created at {moment(issue.created_at).format('YYYY-MM-DD')}</p>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    renderTable() {
        return (
            <section className="content">
                <h1><a href={`https://github.com/${this.props.repository}/issues?utf8=%E2%9C%93&q=`} target="_blank">{this.props.repository}</a></h1>

                <div className="panel panel-default">
                    <div id="order-by-options" className="pull-right">
                        <label>Sort By:</label>
                        <div className="btn-group">
                            <button type="button" className="btn btn-success" onClick={() => this.props.sortBy('state')}>State</button>
                            <button type="button" className="btn btn-warning" onClick={() => this.props.sortBy('id')}>Id</button>
                            <button type="button" className="btn btn-default" onClick={() => this.props.getRepoIssues(this.props.repository)}>All</button>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="table table-hover">
                            <tbody>
                                {this.props.issues.map(this.renderIssue.bind(this))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }

    render() {
        if (this.props.error) {
            return (
                <div className="alert alert-danger" role="alert">
                    <span className="fa fa-exclamation-circle error-icon" aria-hidden="true"></span>
                    {this.props.error}
                </div>
            );
        }

        if (this.props.issues) {
            return (
                <div>
                    {this.props.issues.length == 0 ? <h4>No issues in this repository</h4> : this.renderTable()}
                </div>
            )
        }

        return (
            <div className="jumbotron">
                <h1>Welcome</h1>
                <p>Search for your favorite repositories and select some issues. </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        repository: state.searchedIssues.repository,
        issues: state.searchedIssues.issues,
        error: state.searchedIssues.error
    };
}

export default connect(mapStateToProps, actions)(IssueList);