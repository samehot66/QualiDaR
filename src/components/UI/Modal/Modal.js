import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Blackdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Auxi>
        <Blackdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={{
                transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Auxi>
);

export default modal;