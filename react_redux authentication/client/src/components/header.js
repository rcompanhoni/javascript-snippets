import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks() { 
        if (this.props.authenticated) {
            return <li className="nav-item">
                <Link to="/signout" className="nav-link">Sign Out</Link>
            </li>
        } else {
            return [
            <li className="nav-item">
                <Link to="/signin" className="nav-link" key="{1}">Sign In</Link>
            </li>,

            <li className="nav-item">
                <Link to="/signup" className="nav-link" key="{2}">Sign Up</Link>
            </li>
            ];
        }
    }

    render() {
        return(
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>

                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);