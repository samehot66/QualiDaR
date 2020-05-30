import React from 'react';
import classes from './Navbar.css';
import { Link } from 'react-router-dom';

const navbar = (props) => (
    <header className={classes.Navbar}>
        <div className={classes.Dashboard}><Link to="/">Dashboard</Link></div>
        <div className={classes.Upload}><Link to={{pathname: "/upload"}}>Upload</Link></div>
        <div className={classes.Projects}><Link to={{pathname: "/projects"}}>Projects</Link></div>
        <div className={classes.Shared}><Link to={{pathname: "/sharedwithme"}}>Shared with me</Link></div>
    </header>
);

export default navbar;