import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case DELET_POST:
            return _.omit(state, action.payload); // if state object has the deleted id then it's removed from the state object

        case FETCH_POST:
            // Updates the application state object with id: data where 'id' is the fetched post ID and 'data' are the fetched contents

            // Commented code is ES5 equivalent
            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            return { ...state, [action.payload.data.id]:action.payload.data }

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');

        default:
            return state;
    }
}