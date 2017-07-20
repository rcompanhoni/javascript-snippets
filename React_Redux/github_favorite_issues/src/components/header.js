import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render () {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" id="logo" className="navbar-brand"><i className="fa fa-github" aria-hidden="true"></i>My GitHub Favorite Issues</Link>

                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/selected-issues" className="nav-link">Selected Issues</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;