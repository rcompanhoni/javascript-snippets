import { CREATE_ALERT, CLOSE_ALERT } from '../actions';

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_ALERT: {
      return {
        display: true,
        alert: {
          type: action.payload.type,
          headline: action.payload.headline,
          message: action.payload.message,
        },
      };
    }

    case CLOSE_ALERT: {
      return {
        display: false,
        alert: {
          id: action.payload.id,
          type: action.payload.type,
          headline: action.payload.headline,
          message: action.payload.message,
        },
      };
    }

    default:
      return state;
  }
}
