import React from 'react';
import classes from './Allprojects.css';
import Button from '../../../components/UI/Button/Button';

 const allprojects = (props) => { 
 
    return (
        <div id={props.id} className={classes.Projects} > {props.pname} 
       
             <div> <Button>edit</Button>
               <Button>delete</Button>
            </div>
        </div>
    )
};

export default allprojects;