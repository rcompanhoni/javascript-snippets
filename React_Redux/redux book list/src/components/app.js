import React from 'react';
import { Component } from 'react';

import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';
import Toast from '../containers/toast';

export default class App extends Component {
    render() {
        return (
            <div>
                <BookList />
                <BookDetail />
                <Toast />
            </div>
        );
    }
}


