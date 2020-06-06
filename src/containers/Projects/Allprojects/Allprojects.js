import React from 'react';
import classes from './Allprojects.css';
import useFitText from "use-fit-text";
import Button from '../../../components/UI/Button/Button';

const allprojects = (props) => {
 const { fontSize, ref } = useFitText({maxFontSize: 200 ,minFontSize: 20});
    return (
        <div id={props.id} className={classes.Projects}>
            <div ref={ref} style={{ fontSize }}  >{props.pname} </div>
            <div>
                <Button>edit</Button>
                <Button>delete</Button>
             </div>
        </div>
    )
};

export default allprojects;