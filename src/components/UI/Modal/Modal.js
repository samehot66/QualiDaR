import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Blackdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    return (
        <Auxi>
            <Blackdrop show={props.show} clicked={props.modalClosed} />
            <div className={classes.Modal} onClick={props.clicked}
                style={{
                    transfrom: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    display: props.show ? 'block' : 'none'
                }}>

                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">{props.name}</h3>
                    </div>
                    <div className="card-body">
                        {props.children}
                    </div>
                    <div className="card-footer">
                </div>
                </div>
            </div>
        </Auxi>
    )
};

export default Modal;