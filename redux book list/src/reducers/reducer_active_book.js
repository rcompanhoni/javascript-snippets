// state argument is not the whole application state, only the part of the main state managed by this reducer
export default function (state = null, action) {
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }

    return state;
}