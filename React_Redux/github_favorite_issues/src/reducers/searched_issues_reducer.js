import _ from 'lodash';
import {
    FETCH_ISSUES,
    TOGGLE_SEARCHED_ISSUE,
    SORT_BY,
    ISSUES_ERROR,
    PROCESSING
} from '../actions/types';

function toggleSearchedIssue(issues, selectedIssue) {
    return issues.map(issue => {
        if (issue.id == selectedIssue.id) {
            issue.selected = !issue.selected;
        }

        return issue;
    });
}

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ISSUES:
            return { repository: action.payload.repository, issues: action.payload.issues };

        case TOGGLE_SEARCHED_ISSUE:
            return { ...state, issues: toggleSearchedIssue(state.issues, action.payload) }

        case SORT_BY:
            return { ...state, issues: _.sortBy(state.issues, action.payload) }

        case ISSUES_ERROR:
            return { ...state, error: action.payload }

        case PROCESSING:
            return { ...state, processing: action.payload }
    }

    return state;
}