import { combineReducers } from 'redux';
import ToastReducer from './reducer_toast';

const rootReducer = combineReducers({
  alerts: ToastReducer,
});

export default rootReducer;
