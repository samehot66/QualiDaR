import React,{useState} from 'react';
import classes from './Pleaselogin.css';
import { Link } from 'react-router-dom';

const pleaselogin = () => {
    return  (
    <Link to="/" ><div className={classes.Pleaselogin}>Please login</div></Link>
    )
};

export default pleaselogin;