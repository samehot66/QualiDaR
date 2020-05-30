import React from 'react';
import classes from './Navbar.css';
import { NavLink } from 'react-router-dom';

const navbar = (props) => (
    <header className={classes.Navbar}>
        <div className={classes.Dashboard}>
            <NavLink to="/" exact activeStyle={{ color: '#036294', fontSize: '30px' }}>Dashboard</NavLink>
        </div>
        <div className={classes.Upload}>
            <NavLink to={{ pathname: "/upload" }} activeStyle={{ color: '#036294', fontSize: '30px'}}>Upload</NavLink>
        </div>
        <div className={classes.Projects}>
            <NavLink to={{ pathname: "/projects" }} activeStyle={{ color: '#036294', fontSize: '30px'}}>Projects</NavLink>
        </div>
        <div className={classes.Shared}>
            <NavLink to={{ pathname: "/sharedwithme" }} activeStyle={{ color: '#036294', fontSize: '30px'}}>Shared with me</NavLink>
        </div>
    </header>
);

export default navbar;