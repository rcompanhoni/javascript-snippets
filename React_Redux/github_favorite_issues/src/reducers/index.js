import { combineReducers } from 'redux';
import SearchedIssuesReducer from './searched_issues_reducer';
import SelectedIssuesReducer from './selected_issues_reducer';

const rootReducer = combineReducers({
  searchedIssues: SearchedIssuesReducer,
  selectedIssues: SelectedIssuesReducer
});

export default rootReducer;
