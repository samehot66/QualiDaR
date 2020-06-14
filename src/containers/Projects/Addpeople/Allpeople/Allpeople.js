import React, { useState } from 'react';
import classes from './Allpeople.css';
import Auxi from '../../../../hoc/Auxi';
const allpeople = (props) => {
    
    return (
        <Auxi>
            <div className={classes.Allpeople}>

                <div className={classes.Email}>{props.pid}samekrub@hotmail.com</div>
                <span id={props.pid} className={classes.Delete}>X</span>
            </div>
        </Auxi>
    )
};

export default allpeople;