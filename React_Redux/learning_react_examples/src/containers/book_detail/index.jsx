import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BookDetail = ({ book }) => {
  if (!book) {
    return <div>Select a book to get started</div>;
  }

  return (
    <div>
      <h3>Details for:</h3>
      <div>Title: {book.title}</div>
      <div>Pages: {book.pages}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    book: state.activeBook,
  };
}

BookDetail.defaultProps = {
  book: null,
};

BookDetail.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    pages: PropTypes.number,
  }),
};

export default connect(mapStateToProps)(BookDetail);
