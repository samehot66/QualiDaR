import React, { useState, useEffect } from "react";
import Modal from "../../../../components/UI/Modal/Modal";
//import config from "../../../../config.json";
import Button from "../../../../components/UI/Button/Button";
import axios from "axios";

const file = (props) => {
  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => {
    setDeletemodal(true);
  };
  const closeDeleteModal = () => {
    setDeletemodal(false);
  };

  const deleteHandler = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pdfid: props.pdfid,
        pid:  props.webid
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
   
    await axios.delete(process.env.REACT_APP_URL + '/api/files', data, axiosConfig)
    .then((res) => {
    })
    .catch((err) => {
      alert("Delete failed! File has already in used");
     
    });
    await onGetfiles();
    closeDeleteModal();
  };

  const onGetfiles = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.webid
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(process.env.REACT_APP_URL + "/api/files", data, axiosConfig)
      .then((res) => {
        props.onGetfiles(res.data);
      })
      .catch((err) => {
        //alert("Show all files Failed");
        localStorage.clear();
      });
  };
  return (
    <tr>
      <td>
        <i className="fa fa-fw  fa-file-pdf" style={{ color: "#007bff" }}></i>
        <a
          href={"/upload/" + props.webid + "/" + props.filename}
          target="_blank"
        >
          {props.filename}
        </a>
      </td>
      <td>{props.description}</td>

      {props.progress ? (
        <td style={{ color: "green" }}>Done</td>
      ) : (
        <td style={{ color: "red" }}>Extracting...</td>
      )}
      <td>{Number((props.size/1024)/1024).toFixed(2)} MB</td>

      <td>
        {props.owner == localStorage.getItem("email") && props.progress ? (
          <i
            id={props.pdfid}
            key={props.pdfid}
            className="fa fa-fw fa-trash"
            style={{ fontSize: "18px" }}
            onClick={showDeleteModal}
            data-toggle="tooltip"
            data-placement="top"
            title={"Delete"}
          ></i>
        ) : null}
        <Modal
          show={Deletemodal}
          modalClosed={closeDeleteModal}
          name="Delete a file from project"
        >
          <div style={{ fontSize: "22px", textAlign: "center" }}>
            Are you sure to delete
            <span style={{ color: "blue" }}> {props.filename} </span>
            file?
          </div>
          <Button btnType="Success" clicked={deleteHandler}>
            Delete
          </Button>
          <Button btnType="Danger" clicked={closeDeleteModal}>
            Cancel
          </Button>
        </Modal>{" "}
      </td>
      <td>{props.uploadedby}</td>
      <td style={{ color: "#ccc" }}>{props.role}</td>
    </tr>
  );
};

export default file;
