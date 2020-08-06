import React, { useState } from 'react';
import classes from './Allprojects.css';
import Modal from '../../../components/UI/Modal/Modal';
import Addpeople from '../Addpeople/Addpeople';
import Auxi from '../../../hoc/Auxi';
import { NavLink } from 'react-router-dom';
import config from '../../../config.json';
import axios from 'axios';
import Button from '../../../components/UI/Button/Button';

const allprojects = (props) => {

  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => { setDeletemodal(true) };
  const closeDeleteModal = () => { setDeletemodal(false) };

  const [Addmodal, setAddmodal] = useState(false);
  const showAddModal = () => { setAddmodal(true) };
  const closeAddModal = () => { setAddmodal(false) };

  const deleteHandler = async () => {
    let data = {
      params: {
        "uid": localStorage.getItem("uid"),
        "access_token": localStorage.getItem("access_token"),
        "pid": props.pid
      }
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await axios.delete(config.URL + '/api/projects', data, axiosConfig)
    await onGetprojects();
    await closeDeleteModal();
  }

  const onGetprojects = async () => {
    const loadprojects = [];
    let data = {
      params: {
        "uid": localStorage.getItem("uid"),
        "access_token": localStorage.getItem("access_token")
      }
    }
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios.get(config.URL + '/api/projects', data, axiosConfig)
      .then((res) => {
        props.onGetprojects(res.data);
      })
      .catch((err) => {
        alert("Show all projects Failed");
      })
  }

  return (
    <Auxi>
      <div className={classes.Menu} >
        <img onClick={showDeleteModal} className={classes.TrashIcon} src={require('../icon/Trash.png')} alt="Trash" />
        <Modal show={Deletemodal} modalClosed={closeDeleteModal} name="Delete project">
          <div className={classes.Delete}>Are you sure to delete
           <span style={{ color: "blue" }}> {props.pname} </span>
           project?
           </div>
          <Button btnType="Success" clicked={deleteHandler} >Delete</Button>
          <Button btnType="Danger" clicked={closeDeleteModal}>Cancel</Button>
        </Modal>

        <img onClick={showAddModal} className={classes.AddpeopleIcon} src={require('../icon/Addpeople.png')} alt="Add people" />
        <Modal show={Addmodal} modalClosed={closeAddModal} name="Add people to project">
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