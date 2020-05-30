import React from 'react';
import classes from './Navbar.css';
import { NavLink } from 'react-router-dom';

const navbar = (props) => (
    <header className={classes.Navbar}>
        <div className={classes.Dashboard}>
            <NavLink to="/" exact activeStyle={{ color: 'black', textDecoration: 'underline' }}>Dashboard</NavLink>
        </div>
        <div className={classes.Upload}>
            <NavLink to={{ pathname: "/upload" }} activeStyle={{ color: 'black', textDecoration: 'underline' }}>Upload</NavLink>
        </div>
        <div className={classes.Projects}>
            <NavLink to={{ pathname: "/projects" }} activeStyle={{ color: 'black', textDecoration: 'underline' }}>Projects</NavLink>
        </div>
        <div className={classes.Shared}>
            <NavLink to={{ pathname: "/sharedwithme" }} activeStyle={{ color: 'black', textDecoration: 'underline' }}>Shared with me</NavLink>
        </div>
    </header>
);

export default navbar;