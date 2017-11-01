import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';
import ToastReducer from './reducer_toast';

const rootReducer = combineReducers({
  ...gridReducers,
  alert: ToastReducer,
});

export default rootReducer;
