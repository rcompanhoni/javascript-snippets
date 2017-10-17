export const BOOK_SELECTED = 'BOOK_SELECTED';
export const TOAST = 'TOAST';

export function selectBook(book) {
    console.log(book);
    return {
        type: BOOK_SELECTED,
        payload: book
    }
}

export function setToast(message) {
    return {
        type: TOAST,
        payload: message
    }
}