import { combineReducers } from 'redux';
import ToastReducer from './reducer_toast';

const rootReducer = combineReducers({
  alert: ToastReducer,
});

export default rootReducer;
