import React, { useState, useEffect } from "react";
import Errorpage from "../../../../../components/UI/Errorpage/Errorpage";
import classes from "./Settingfile.css";
import Auxi from "../../../../../hoc/Auxi";
//import config from "../../../../../config.json";

import axios from "axios";

const Setfile = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [file, setfile] = useState([]);
  const [fileinuse, setfileinuse] = useState([]);
  useEffect(() => {
    const allfiles = [];
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid:props.tid,
        pid: props.pid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(process.env.REACT_APP_URL + "/api/files/topic/except", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
    
       for (const index in res.data) {
        if (res.data[index].done) {
            allfiles.push({
        
              pdfid: res.data[index].pdfid,
             
              filename: res.data[index].pdfname,
            });
          }
        }
        setfile(allfiles);
      })
      .catch((err) => {
        //console.log("Show files Failed");
      });
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    const allfilesinuse = [];
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),

        tid: props.tid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(process.env.REACT_APP_URL + "/api/files/topic", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        for (const index in res.data.pdffiles) {
          if (res.data.pdffiles[index].done) {
            allfilesinuse.push({
              pdfid: res.data.pdffiles[index].pdfid,
              filename: res.data.pdffiles[index].pdfname,
            });
          }
        }

        setfileinuse(allfilesinuse);
      })
      .catch((err) => {
        //console.log("Show files Failed!");
      });
    return () => {
      source.cancel();
    };
  }, []);

  const addFileHandler = async (pdfid) => {
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      pdfid: pdfid,
      tid: props.tid,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(process.env.REACT_APP_URL + "/api/files/topic", data, axiosConfig)
      .then((res) => {})
      .catch((err) => {
        //console.log("Add files Failed");
      });
    await onGetfile();
    await onGetfileinuse();
  };

  const onGetfile = async () => {
    const allfiles = [];

    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid:props.tid,
        pid: props.pid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(process.env.REACT_APP_URL + "/api/files/topic/except", data, axiosConfig)
      .then((res) => {
        for (const index in res.data) {
          if (res.data[index].done) {
              allfiles.push({
          
                pdfid: res.data[index].pdfid,
               
                filename: res.data[index].pdfname,
              });
            }
          }
        setfile(allfiles);
      })
      .catch((err) => {
       // console.log("Show files Failed");
      });
  };
  const onGetfileinuse = async () => {
    const allfilesinuse = [];

    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),

        tid: props.tid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(process.env.REACT_APP_URL + "/api/files/topic", data, axiosConfig)
      .then((res) => {

        for (const index in res.data.pdffiles) {
          allfilesinuse.push({
            pdfid: res.data.pdffiles[index].pdfid,
            filename: res.data.pdffiles[index].pdfname,
          });
        }

        setfileinuse(allfilesinuse);
      })
      .catch((err) => {
        //console.log("Show files in use Failed");
      });
  };

  const removeFileHandler = async (pdfid) => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pdfid: pdfid,
        tid: props.tid,
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .delete(process.env.REACT_APP_URL + "/api/files/topic", data, axiosConfig)
      .then((res) => {})
      .catch((err) => {
        //console.log("Remove files Failed");
      });
    await onGetfile();
    await onGetfileinuse();
  };
  return isauth ? (
    <Auxi>
      <div className={["card card-primary", classes.Box].join(" ")}>
        <div
          className="card-header border-transparent "
          style={{ padding: "0.2rem 1rem" }}
        >
          <h3 className="card-title">File(s) </h3>
          <div className="card-tools">


          <button
                      type="button"
                      className={[
                        "btn btn-block btn-success",
                        classes.Refresh,
                      ].join(" ")}
                      onClick={onGetfile}
                      style={{
                        backgroundColor: "white",
                        borderColor: "#52a5ff",
                        color: "#007bff",
                      }}
                    >
                      <img
                        style={{
                          position: "relative",
                          width: "11px",
                          height: "11px",
                          top: "-1px",
                          left: "0px",
                        }}
                        src={require("../../Topics/icon/Refresh.png")}
                      />
                      Refresh
                    </button>
          </div>
        </div>
        <div className="card-body p-0 " style={{ overflow: "auto" }}>
          <table
            className="table m-0 text-nowrap"
            style={{ overflow: "scroll" }}
          >
            <thead>
              <tr>
                <th>File name</th>

                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              {file.map((f) => (
                <tr key={f.pdfid}>
                  <td style={{ color: "#007bff" }}>
                    {" "}
                    <i className="fa fa-fw  fa-file-pdf"></i> {f.filename}
                  </td>
                  <td>
                    <i
                      id={f.pdfid}
                      className="fa fa-fw fa-plus-square"
                      style={{ fontSize: "18px", color: "#007bff" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                      onClick={(e) => addFileHandler(e.target.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={["card card-info", classes.Box].join(" ")}>
        <div
          className="card-header border-transparent "
          style={{ padding: "0.2rem 1rem" }}
        >
          <h3 className="card-title">File(s) in this topic</h3>
          <div className="card-tools"></div>
        </div>
        <div className="card-body p-0 " style={{ overflow: "auto" }}>
          <div>
            <table
              className="table m-0 text-nowrap"
              style={{ overflow: "scroll" }}
            >
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody>
                {fileinuse.map((f) => (
                  <tr key={f.pdfid}>
                    <td style={{ color: "#007bff" }}>
                      {" "}
                      <i className="fa fa-fw  fa-file-pdf"></i> {f.filename}
                    </td>
                    <td>
                      <i
                        id={f.pdfid}
                        className="fa fa-fw fa-minus-square"
                        style={{ fontSize: "18px", color: "#dc3545" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Remove"
                        onClick={(e) => removeFileHandler(e.target.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* /.table-responsive */}
        </div>
      </div>
    </Auxi>
  ) : (
    <Errorpage></Errorpage>
  );
};

export default Setfile;
