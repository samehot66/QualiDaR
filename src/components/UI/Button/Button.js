import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked} 
        key={props.id}
        
        disabled={props.disabled}>{props.children}
       
    </button>
);

export default button;