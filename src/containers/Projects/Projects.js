import React, { useState } from 'react';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Auxi from '../../hoc/Auxi';

const projects = (props) => {

    const [Newprojmodal, setNewprojmodal] = useState(false);
    const showModal= () => { setNewprojmodal(true) };
    const closeModal= () => { setNewprojmodal(false) };
    return (
        <Auxi>
            <div className={classes.Yourproj}>Your Project(s)</div>
            <div>
                <div className={classes.New} onClick={showModal}>+</div>
                    <Modal show={Newprojmodal} modalClosed={closeModal}>
                        <Newproj />
                    </Modal>
            </div>
        </Auxi>
    )
}

export default projects;