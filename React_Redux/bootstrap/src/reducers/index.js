import { combineReducers } from 'redux';
import { Reducers as gridReducers } from 'react-redux-grid';
import ToastReducer from './reducer_toast';
import OverlayReducer from './reducer_overlay';

const rootReducer = combineReducers({
  ...gridReducers,
  alert: ToastReducer,
  loading: OverlayReducer,
});

export default rootReducer;
