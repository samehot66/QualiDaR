import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/UI/Modal/Modal';
import config from '../../../../config.json';
import Button from '../../../../components/UI/Button/Button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Edittopic from './Edittopics';
const topic= (props) => {

  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => { setDeletemodal(true) };
  const closeDeleteModal = () => { setDeletemodal(false) };

  const [Editmodal, setEditmodal] = useState(false);
  const showEditModal = () => { setEditmodal(true) };
  const closeEditModal = () => { setEditmodal(false) };

  const deleteHandler = async () => {
    let data = {
      params: {
        "uid": localStorage.getItem("uid"),
        "access_token": localStorage.getItem("access_token"),
        "tid": props.tid
      }
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    //await axios.delete(config.URL + '/api/topics', data, axiosConfig)
    await onGettopics();
   closeDeleteModal();
  }

  const onGettopics = async () => {
    let data = {
        params: {
            "uid": localStorage.getItem("uid"),
            "access_token": localStorage.getItem("access_token"),
            "pid":props.webid
        }
    }
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    await axios.get(config.URL + '/api/topics', data, axiosConfig)
      .then((res) => {
        props.onGettopics(res.data);
      })
      .catch((err) => {
        alert("Show all files Failed");
      })
  }
return(
    <tr> 
        { props.done ?
    <td><i className="fa fa-fw  fa-archive" style={{ color: "#007bff" }}></i>
     <NavLink to={"/projects/"+props.pname+"/"+props.webid+"/"+props.tname+"/"+props.tid} > {props.tname}</NavLink></td>
   :
   <td style={{ color: "#007bff" }}><i className="fa fa-fw  fa-archive" ></i> {props.tname}</td>
    }
 
   
    { props.done ?
     <td style={{color:"green"}}>Done</td>
    :
    <td style={{color:"red" }}>Extracting...</td>
    }
    <td>
        <i className="fa fa-fw fa-cog" style={{ fontSize: "18px" }} ></i>
        <i className="fa fa-fw fa-edit" style={{ fontSize: "18px" }} onClick={showEditModal}></i>
        <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} onClick={showDeleteModal} ></i>
     
        <Modal show={Editmodal} modalClosed={closeEditModal} name="Delete a topic from project">
        <Edittopic tid={props.tid} tname={props.tname} cancel={closeEditModal} onGetprojects={onGettopics} />
        </Modal> 
 <Modal show={Deletemodal} modalClosed={closeDeleteModal} name="Delete a topic from project">
          <div  style={{fontSize: "22px",textAlign: "center"}}>Are you sure to delete
           <span style={{ color: "blue" }}> {props.tname} </span>
           topic?
           </div>
          <Button btnType="Success" clicked={deleteHandler} >Delete</Button>
          <Button btnType="Danger" clicked={closeDeleteModal}>Cancel</Button>
        </Modal> </td> 
          <td>{props.email}</td>
    <td style={{color:"#ccc" }}>{props.role}</td>
</tr>);
};

export default topic;