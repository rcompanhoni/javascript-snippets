import { CREATE_ALERT, CLOSE_ALERT } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_ALERT:
      return action.payload;

    case CLOSE_ALERT:
      return action.payload;

    default:
      return state;
  }
}
