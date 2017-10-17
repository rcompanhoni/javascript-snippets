import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import BookList from '../../containers/book_list';
import BookDetail from '../../containers/book_detail';

const App = () => (
  <div>
    <BookList />
    <BookDetail />
  </div>
);

export default CSSModules(App, styles);
