import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';
import ToastReducer from './reducer_toast';

const rootReducer = combineReducers({
  alert: ToastReducer,

  bulkAction: gridReducers.bulkAction,
  dataSource: gridReducers.dataSource,
  editor: gridReducers.editor,
  errorHandler: gridReducers.errorHandler,
  grid: gridReducers.grid,
  loader: gridReducers.loader,
  menu: gridReducers.menu,
  pager: gridReducers.pager,
  selection: gridReducers.selection,
});

export default rootReducer;
