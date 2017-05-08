import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component {
    renderList() {
        console.log(this.props.books);
        return this.props.books.map((book) => {
            
            <li key={book.title} className="list-group-item">{book.title}</li>
        });
    }

    render() {
        return(
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

// converts the application state object to props object in BookList
function mapStateToProps(state) {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps)(BookList);