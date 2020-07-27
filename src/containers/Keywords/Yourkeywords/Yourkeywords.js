import React, { useState } from 'react';

import Auxi from '../../../hoc/Auxi';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import classes from '../Yourkeywords/Yourkeywords.css';
import axios from 'axios';
import config from '../../../config.json';
const yourkeywords = (props) => {

    const [Deletemodal, setDeletemodal] = useState(false);
    const showDeleteModal = () => { setDeletemodal(true) };
    const closeDeleteModal = () => { setDeletemodal(false) };

    const deleteHandler = async () => {
        let data = {
          params: {
            "uid": localStorage.getItem("uid"),
            "access_token": localStorage.getItem("access_token"),
            "keywordgroupsid": props.groupid
          }
        }
    
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        axios.delete(config.URL + '/api/keywords/subscribe', data, axiosConfig)
          .then((res) => {
            onGetyourgroups();
          })
          .catch((err) => {
            onGetyourgroups();
            console.log("Delete your group Failed");
          })
        await closeDeleteModal();
      }
    
      const onGetyourgroups = async () => {
        const yourkeywords = [];
        let data = {
          params: { "uid": localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") }
        }
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        await axios.get(config.URL + '/api/keywords/mygroups', data, axiosConfig)
          .then((res) => {
            props.onGetyourgroups(res.data);
          })
          .catch((err) => {
            console.log("Show all your keyword groups Failed");
          })
      }
    return (
        <Auxi>
            <Auxi>
                <tr>
                    <td className={classes.Gname}>
                        <i className="fa fa-fw fa-folder"></i>
                        {props.gname}

                    </td>
                    <td style={{ color: "#ccc" }}>
                        me
                </td>
                    <td>
                        <i className="fa fa-fw fa-edit" style={{ fontSize: "18px" }} ></i>
                        <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} onClick={showDeleteModal} ></i>
                        <Modal show={Deletemodal} modalClosed={closeDeleteModal} name="Delete keyword group">
          <div className={classes.Delete}>Are you sure to delete
                        <span style={{ color: "blue" }}> {props.gname} </span> group?
                     </div>
          <Button btnType="Successdeletegroup" clicked={deleteHandler} >Delete</Button>
          <Button btnType="Danger" clicked={closeDeleteModal}>Cancel</Button>
        </Modal>
                    </td>
                </tr>
            </Auxi>
        </Auxi>
    )
};

export default yourkeywords;