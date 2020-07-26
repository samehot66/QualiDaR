import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <NavLink to="/dashboard" className="nav-link">Home</NavLink>
                </li>
            </ul>
           
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" role="button"><i className="fas fa-user"/></NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header;