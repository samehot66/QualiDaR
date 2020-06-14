import React, { useState } from 'react';
import classes from './Allprojects.css';
import Modal from '../../../components/UI/Modal/Modal';
import Addpeople from '../Addpeople/Addpeople';
import Auxi from '../../../hoc/Auxi';
import { NavLink } from 'react-router-dom';

const allprojects = (props) => {

  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => { setDeletemodal(true) };
  const closeDeleteModal = () => { setDeletemodal(false) };

  const [Addmodal, setAddmodal] = useState(false);
  const showAddModal = () => { setAddmodal(true) };
  const closeAddModal = () => { setAddmodal(false) };

  const x = () => {
    closeDeleteModal();
  }

  return (
    <Auxi>
      <div className={classes.Menu}>
        <img onClick={showDeleteModal} className={classes.TrashIcon} src={require('../icon/Trash.png')} alt="Trash" />
        <Modal show={Deletemodal} modalClosed={closeDeleteModal} name="Delete Project">
          <button onClick={x}>{props.pid}Delete</button>
          <button onClick={closeDeleteModal}>Cancel</button>
        </Modal>

        <img onClick={showAddModal} className={classes.AddpeopleIcon} src={require('../icon/Addpeople.png')} alt="Add people" />
        <Modal show={Addmodal} modalClosed={closeAddModal} name="Add people to Project">
          <Addpeople pid={props.pid} cancel={closeAddModal} />
        </Modal>
      </div>
      
      <NavLink to={'/projects/' + props.pid}>
        <div id={props.pid} className={classes.Projects} >
          {props.pname}
        </div> 
      </NavLink>
    </Auxi>
  )
};

export default allprojects;