export const BOOK_SELECTED = 'BOOK_SELECTED';
export const TOAST = 'TOAST';

export function selectBook(book) {
  return {
    type: BOOK_SELECTED,
    payload: book,
  };
}

export function createToast(message) {
  return {
    type: TOAST,
    payload: message,
  };
}
