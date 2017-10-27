import React from 'react';
import CSSModules from 'react-css-modules';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import InlineLogin from './inline_login';

import styles from './styles.scss';

const HeaderNavigation = () => {
  const brand = <a href="http://www.google.com">Project Name</a>;

  return (
    <Navbar brand={brand} fixedTop inverse>
      <Nav>
        <InlineLogin className="navbar-form" />
      </Nav>
    </Navbar>
  );
};

export default CSSModules(HeaderNavigation, styles);
