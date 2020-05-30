import React from 'react';
import classes from './Header.css';

const header = (props) => (
    <header className={classes.Header}>
        <span className={classes.DocRR}>DocR&R</span>
        <span className={classes.Name}>Name</span>
        <span className={classes.Auth}>Auth</span>
    </header>
);

export default header;