import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Blackdrop from '../Backdrop/Backdrop';
import useFitText from "use-fit-text";

const modal = (props) => {

    const { fontSize, ref } = useFitText({maxFontSize: 130 ,minFontSize: 20});

    return (
        <Auxi>
            <Blackdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal}
                style={{
                    transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    display: props.show ? 'block' : 'none'
                }}>
                <div ref={ref} style={{ fontSize }} className={classes.Name}>{props.name}</div>
                <div>
                    {props.children}
                </div>
            </div>
        </Auxi>
    )
};

export default modal;