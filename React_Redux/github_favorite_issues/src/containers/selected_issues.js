import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedIssues extends Component {
    renderSelectedIssue(issue) {
        return (
            <tr key={issue.id}>
                <td>
                    {issue.id}
                </td>
                <td>
                    {issue.state}
                </td>
                <td>
                    <strong>{issue.title}</strong>
                </td>
            </tr>
        );
    }

    renderSelectedIssuesTable(item) {
        return (
            <div key={item.repository} className="panel panel-default">
                <div className="panel-heading">
                    <h4>{item.repository}</h4>
                </div>

                <div className="panel-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>State</th>
                                <th>Title</th>
                            </tr>
                        </thead>

                        <tbody>
                            {item.issues.map(this.renderSelectedIssue.bind(this))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    render() {
        if (this.props.selectedIssues.length == 0) {
            return <h4>No issues selected</h4>;
        }

        return (
            <div>
                {this.props.selectedIssues.map(this.renderSelectedIssuesTable.bind(this))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedIssues: state.selectedIssues
    };
}

export default connect(mapStateToProps)(SelectedIssues);