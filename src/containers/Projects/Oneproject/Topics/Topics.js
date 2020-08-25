import React, { useState, useEffect } from 'react';
import Modal from '../../../../components/UI/Modal/Modal';
import config from '../../../../config.json';
import Button from '../../../../components/UI/Button/Button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Edittopic from './Edittopics';
import Settingfile from '../Setting/Setttingfile/Settingfile';
import Settingkeyword from '../Setting/Settingkeyword/Settingkeyword';

const topic= (props) => {

  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => { setDeletemodal(true) };
  const closeDeleteModal = () => { setDeletemodal(false) };

  const [Editmodal, setEditmodal] = useState(false);
  const showEditModal = () => { setEditmodal(true) };
  const closeEditModal = () => { setEditmodal(false) };

  const [Settingmodal, setSettingmodal] = useState(false);
  const showSettingModal = () => { setSettingmodal(true) };
  const closeSettingModal = () => { setSettingmodal(false) };
  const closeSettingModal2 = () => { setSettingmodal(false); alert("Start extracting...")};

  const [Setfilemodal, setSetfilemodal] = useState(false);
  const showSetfileModal = () => { setSetfilemodal(true) };
  const closeSetfileModal = () => { setSetfilemodal(false) };

  const [Setkeywordgroupmodal, setSetkeywordgroupmodal] = useState(false);
  const showSetkeywordgroupModal = () => { setSetkeywordgroupmodal(true) };
  const closeSetkeywordgroupModal = () => { setSetkeywordgroupmodal(false) };

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
 
   
    { !props.done ?
     <td style={{color:"green"}}>Done</td>
    :
    <td style={{color:"red" }}>Wait start/Extracting...</td>
    }
    <td>
      {props.owner==localStorage.getItem("email") ?
        <i className="fa fa-fw fa-play" style={{ fontSize: "18px" }} onClick={showSettingModal} data-toggle="tooltip" data-placement="top" title={"Start"}></i>
     :null
      }  
      
      
      <i className="fa fa-fw fa-key" style={{ fontSize: "18px" }} onClick={showSetkeywordgroupModal} data-toggle="tooltip" data-placement="top" title={"Set keyword group to topic"}></i>
        <i className="fa fa-fw fa-file" style={{ fontSize: "18px" }} onClick={showSetfileModal} data-toggle="tooltip" data-placement="top" title={"Set file to topic"}></i>
        <i className="fa fa-fw fa-edit" style={{ fontSize: "18px" }} onClick={showEditModal} data-toggle="tooltip" data-placement="top" title={"Edit"}></i>
        {props.owner==localStorage.getItem("email") ?
        <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} onClick={showDeleteModal}data-toggle="tooltip" data-placement="top" title={"Delete"} ></i>
        :null
      }  

        <Modal show={Setkeywordgroupmodal} modalClosed={closeSetkeywordgroupModal} name="Set keyword group(s) to topic">
          <Settingkeyword  pid={props.webid} tid={props.tid}/>
        </Modal> 
        <Modal show={Setfilemodal} modalClosed={closeSetfileModal} name="Set file(s) to topic">
        <Settingfile pid={props.webid} tid={props.tid}/>
        </Modal> 



        <Modal show={Settingmodal} modalClosed={closeSettingModal} name="Comfirm to start">
        <div  style={{fontSize: "22px",textAlign: "center"}}>   
        Are you sure to start processing this topic?
           </div>
        <Button btnType="Success" clicked={closeSettingModal2} >Start</Button>
          <Button btnType="Start" clicked={closeSettingModal}>Cancel</Button>
        </Modal> 


        <Modal show={Editmodal} modalClosed={closeEditModal} name="Edit a topic name">
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