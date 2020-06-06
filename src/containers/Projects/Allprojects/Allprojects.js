import React from 'react';
import classes from './Allprojects.css';
import useFitText from "use-fit-text";


const allprojects = (props) => {
 const { fontSize, ref } = useFitText({maxFontSize: 200 ,minFontSize: 20});
    return (
            <div ref={ref} style={{ fontSize }} className={classes.Projects} >{props.pname} </div>
    )
};

export default allprojects;