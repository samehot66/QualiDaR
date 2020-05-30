import React from 'react';
import classes from './Navbar.css';

const navbar = (props) => (
    <header className={classes.Navbar}>
        <div className={classes.Dashboard}><a href="/">Dashboard</a></div>
        <div className={classes.Upload}><a href="/upload">Upload</a></div>
        <div className={classes.Projects}><a href="/projects">Projects</a></div>
        <div className={classes.Shared}><a href="/sharedwithme">Shared with me</a></div>
    </header>
);

export default navbar;