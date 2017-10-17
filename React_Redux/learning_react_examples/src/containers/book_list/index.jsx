import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v4 } from 'uuid';
import { selectBook, createToast } from '../../actions/index';

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => (
      <li key={v4()}>
        <button
          onKeyPress={f => f}
          onClick={() => {
            this.props.selectBook(book);
            this.props.createToast('A new book was selected!');
            }
          }
          tabIndex="0"
        >
          {book.title}
        </button>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

BookList.defaultProps = {
  selectBook: f => f,
  createToast: f => f,
  books: [],
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    pages: PropTypes.number,
  })),
  selectBook: PropTypes.func,
  createToast: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    books: state.books,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectBook,
      createToast,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
