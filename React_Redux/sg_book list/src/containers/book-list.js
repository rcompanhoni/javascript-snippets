import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return <li 
                key={book.title}
                onClick = {() => {
                        this.props.selectBook(book);
                        this.props.setToast('A new book was selected!');

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

export default connect(mapStateToProps, actions)(BookList);