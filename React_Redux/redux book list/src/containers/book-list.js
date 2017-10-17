import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectBook, createToast } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return <li 
                key={book.title}
                onClick = {() => {
                        this.props.selectBook(book);
                        this.props.createToast('A new book was selected!');

                    }   
                }
                className="list-group-item">{book.title}</li>
        });
    }

    render() {
        return(
            <div>
                <ul className="list-group col-sm-4">
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

// converts the application state object to props object in BookList
function mapStateToProps(state) {
    return {
        books: state.books
    };
}

// binds the result of the action creators (i.e. the action) to reducers -- in this case selectBook will be available as props in this React container
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        selectBook: selectBook,
        createToast: createToast
    }, 
    dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);