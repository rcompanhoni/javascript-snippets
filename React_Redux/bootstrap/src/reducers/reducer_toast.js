import { CREATE_ALERT } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_ALERT: {
      return {
        display: true,
        type: action.payload.type,
        headline: action.payload.headline,
        message: action.payload.message,
      };
    }

    default:
      return state;
  }
}
