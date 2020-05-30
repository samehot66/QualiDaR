import React from 'react';
import classes from './Navbar.css';

const navbar = (props) => (
    <header className={classes.Navbar}>
        <div>Dashboard</div>
        <div>Upload</div>
        <div>Projects</div>
        <div>Shared with me</div>
    </header>
);

export default navbar;