import _ from 'lodash';
import { 
    TOGGLE_SELECTED_ISSUE 
} from '../actions/types';

function toggleSelectedIssue(selectedIssues, repository, issue) {
    const repositoryIssues = selectedIssues.find(s => {
        return s.repository === repository;
    });

    if (!repositoryIssues) {
        selectedIssues.push({ repository, issues: [issue] })
    } else {
        const issueExists = repositoryIssues.issues.some(i => i.id === issue.id);
        if (issueExists) {
            repositoryIssues.issues = repositoryIssues.issues.filter(i => i.id !== issue.id);

            // all repository issues removed -- remove company
            if (repositoryIssues.issues.length == 0) {
                _.remove(selectedIssues, c => c.repository === repositoryIssues.repository);
            }
        } else {
            repositoryIssues.issues.push(issue);
        }
    }

    return selectedIssues;
}

export default function(state = [], action) {
    switch(action.type) {
        case TOGGLE_SELECTED_ISSUE: 
            return toggleSelectedIssue(state, action.payload.repository, action.payload.issue); 
    }
    
    return state;
}