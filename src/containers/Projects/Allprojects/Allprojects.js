import React from 'react';
import classes from './Allprojects.css';


 const allprojects = (props) => { 
 
    return (
        <div id={props.id} className={classes.Projects} > 
          {props.pname}   
        </div> 

    )
};

export default allprojects;