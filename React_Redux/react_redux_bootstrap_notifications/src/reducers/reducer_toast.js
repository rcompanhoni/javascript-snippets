import { CREATE_ALERT, CLOSE_ALERT } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_ALERT:
      return [...state, action.payload];

    case CLOSE_ALERT:
      return state.filter(({ message }) => message !== action.payload);

    default:
      return state;
  }
}
