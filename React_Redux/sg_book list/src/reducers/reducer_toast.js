import { TOAST } from '../actions';

export default function (state = null, action) {
    switch(action.type) {
        case TOAST:
            return action.payload;
    }

    return state;
}