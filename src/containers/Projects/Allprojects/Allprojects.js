import React from 'react';
import classes from './Allprojects.css';


 const allprojects = (props) => { 
 
    return (
        <div id={props.key} className={classes.Projects} > 
          {props.pname}   
        </div> 

    )
};

export default allprojects;