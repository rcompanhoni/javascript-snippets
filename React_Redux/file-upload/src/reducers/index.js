import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';
import ToastReducer from './reducer_toast';

const rootReducer = combineReducers({
  alert: ToastReducer,
  grid: gridReducers.grid,
  dataSource: gridReducers.dataSource,
});

export default rootReducer;
