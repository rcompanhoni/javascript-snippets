import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBook from './reducer_active_book';
import ToastReducer from "./reducer_toast";

const rootReducer = combineReducers({
	books: BooksReducer,
	activeBook: ActiveBook,
	toastMessage: ToastReducer
});

export default rootReducer;