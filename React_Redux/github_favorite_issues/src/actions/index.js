import axios from 'axios';
import {
    FETCH_ISSUES,
    TOGGLE_SEARCHED_ISSUE,
    TOGGLE_SELECTED_ISSUE,
    SORT_BY,
    ISSUES_ERROR,
    PROCESSING
} from './types';

const ROOT_URL = `https://api.github.com`;

export function getRepoIssues(repository) {
    return function (dispatch, getState) {
        displayLoader(dispatch, true);
        const url = `${ROOT_URL}/repos/${repository}/issues?state=all`;

        if (!repository) {
            dispatch({
                type: FETCH_ISSUES,
                payload: {
                    issues: null
                }
            })
        } else {
            axios.get(url)
                .then(response => {
                    // set all searched issues that are in selectedIssues as selected
                    const selectedIssues = getState().selectedIssues;
                    let issues = response.data;

                    if (selectedIssues.length > 0) {
                        const repositoryIssues = selectedIssues.find(selection => selection.repository == repository);
                        if (repositoryIssues) {
                            issues.map(issue => issue.selected = repositoryIssues.issues.find(i => i.id == issue.id));
                        }
                    }

                    dispatch({
                        type: FETCH_ISSUES,
                        payload: {
                            repository: repository,
                            issues: issues
                        }
                    })
                })
                .catch(error => createError(dispatch, "The informed repository was not found. Please inform a repository name in the following format: 'company/repository'"))
                .then(() => displayLoader(dispatch, false))
        }
    }
}

export function toggleIssueSelection(selectedIssue) {
    return function (dispatch) {
        dispatch({
            type: TOGGLE_SEARCHED_ISSUE,
            payload: selectedIssue.issue
        });

        dispatch({
            type: TOGGLE_SELECTED_ISSUE,
            payload: selectedIssue
        });
    }
}

export function sortBy(criteria) {
    return function (dispatch) {
        dispatch({
            type: SORT_BY,
            payload: criteria
        })
    }
}

function displayLoader(dispatch, display) {
    dispatch({
        type: PROCESSING,
        payload: display
    });
}

function createError(dispatch, message) {
    dispatch({
        type: ISSUES_ERROR,
        payload: message
    });
} 