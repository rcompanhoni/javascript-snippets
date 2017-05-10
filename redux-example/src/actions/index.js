// This is an action creator and returns an action -- actions usually have a type and a payload
export function selectBook(book) {
    return {
        type: 'BOOK_SELECTED',
        payload: book
    }
}