import React from 'react';
import classes from './Header.css';

const header = () => (
    <header className={classes.Header}>
        <span className={classes.DocRR}>DocR&R</span>
        <span className={classes.Name}>Name</span>
        <span> 
        <img className={classes.Auth} src={require('./icon/Human.png')} alt="Auth"/>
        </span>
    </header>
);

export default header;