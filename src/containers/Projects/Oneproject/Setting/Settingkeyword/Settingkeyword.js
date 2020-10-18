import React, { useState, useEffect } from "react";
import Errorpage from "../../../../../components/UI/Errorpage/Errorpage";
import classes from "./Settingkeyword.css";
import Auxi from "../../../../../hoc/Auxi";
//import config from "../../../../../config.json";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Setkeyword = (props) => {
  const [isauth, setisauth] = useState(localStorage.getItem("isAuth"));
  const [keywordgroup, setkeywordgroup] = useState([]);
  const [keywordgroupinuse, setkeywordgroupinuse] = useState([]);

  useEffect(() => {
    const addkeywordgroup = [];
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),

        tid: props.tid,
      },
    };
    console.log(data)
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(process.env.REACT_APP_URL + "/api/keywords/usergroups/topic", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {

        for(const index in res.data)
        {
              addkeywordgroup.push({
            keywordgroupsid: res.data[index].keywordgroupsid,
            groupname: res.data[index].groupname,
          });
        }
        // for (const index in res.data[0].keywordgroups) {
        //   addkeywordgroup.push({
        //     keywordgroupsid: res.data[0].keywordgroups[index].keywordgroupsid,
        //     groupname: res.data[0].keywordgroups[index].groupname,
        //   });
        // }
        // for (const index in res.data[0].subscribes) {
        //   addkeywordgroup.push({
        //     keywordgroupsid:
        //       res.data[0].subscribes[index].keywordgroup.keywordgroupsid,
        //     groupname: res.data[0].subscribes[index].keywordgroup.groupname,
        //   });
        // }

        setkeywordgroup(addkeywordgroup);
      })
      .catch((err) => {
        //console.log("Show keyword groups Failed");
      });
    return () => {
      source.cancel();
    };
  }, []);

  const addGroupHandler = async (keywordgroupsid,index) => {
   
    var x = [...keywordgroup];
    x.splice(index, 1);
    setkeywordgroup(x);
    
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      tid: props.tid,
      keywordgroupsid: keywordgroupsid,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(process.env.REACT_APP_URL + "/api/keywords/topic", data, axiosConfig)
      .then((res) => {})
      .catch((err) => {
        //console.log("Add keyword group Failed");
      });
    //await onGetgroup();
    await onGetgroupinuse();
  };
  const onGetgroup = async () => {
    const addkeywordgroup = [];

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
      .get(process.env.REACT_APP_URL + "/api/keywords/usergroups/topic", data, axiosConfig)
      .then((res) => {

        for(const index in res.data)
        {
              addkeywordgroup.push({
            keywordgroupsid: res.data[index].keywordgroupsid,
            groupname: res.data[index].groupname,
          });
        }
        // for (const index in res.data[0].keywordgroups) {
        //   addkeywordgroup.push({
        //     keywordgroupsid: res.data[0].keywordgroups[index].keywordgroupsid,
        //     groupname: res.data[0].keywordgroups[index].groupname,
        //   });
        // }
        // for (const index in res.data[0].subscribes) {
        //   addkeywordgroup.push({
        //     keywordgroupsid:
        //       res.data[0].subscribes[index].keywordgroup.keywordgroupsid,
        //     groupname: res.data[0].subscribes[index].keywordgroup.groupname,
        //   });
        // }

        setkeywordgroup(addkeywordgroup);
       // console.log(keywordgroup)
      })
      .catch((err) => {
       // console.log("Show keyword groups Failed");
      });
  };
  const onGetgroupinuse = async () => {
    const addkeywordgroupinuse = [];

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
      .get(process.env.REACT_APP_URL + "/api/keywords/topic", data, axiosConfig)
      .then((res) => {
        for (const index in res.data.keywordgroups) {
          addkeywordgroupinuse.push({
            keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
            groupname: res.data.keywordgroups[index].groupname,
          });
        }

        setkeywordgroupinuse(addkeywordgroupinuse);
      })
      .catch((err) => {
        //console.log("Show keyword groups Failed");
      });
  };

  useEffect(() => {
    const addkeywordgroupinuse = [];
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
      .get(process.env.REACT_APP_URL + "/api/keywords/topic", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        for (const index in res.data.keywordgroups) {
          addkeywordgroupinuse.push({
            keywordgroupsid: res.data.keywordgroups[index].keywordgroupsid,
            groupname: res.data.keywordgroups[index].groupname,
          });
        }

        setkeywordgroupinuse(addkeywordgroupinuse);
      })
      .catch((err) => {
       // console.log("Show keyword groups Failed");
      });
    return () => {
      source.cancel();
    };
  }, []);

  const removeGroupHandler = async (keywordgroupsid) => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        tid: props.tid,
        keywordgroupsid: keywordgroupsid,
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .delete(process.env.REACT_APP_URL + "/api/keywords/topic", data, axiosConfig)
      .then((res) => {})
      .catch((err) => {
       // console.log("Remove keyword group Failed");
      });
    await onGetgroup();
    await onGetgroupinuse();
  };

  return isauth ? (
    <Auxi>
      <div className={["card card-primary", classes.Box].join(" ")}>
        <div
          className="card-header border-transparent "
          style={{ padding: "0.2rem 1rem" }}
        >
          <h3 className="card-title">Keyword group(s) </h3>
          <div className="card-tools">
            <NavLink to="/keywords">
              <i
                className="fa fa-fw fa-plus-square"
                data-toggle="tooltip"
                data-placement="top"
                title="Add"
              ></i>
            </NavLink>
          </div>
        </div>
        <div className="card-body p-0 " style={{ overflow: "auto" }}>
          <table
            className="table m-0 text-nowrap"
            style={{ overflow: "scroll" }}
          >
            <thead>
              <tr>
                <th>Keyword group name</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              {keywordgroup.map((k,index) => (
                <tr key={k.keywordgroupsid}>
                  <td style={{ color: "#17a2b8" }}>
                    {" "}
                    <i className="fa fa-fw  fa-folder"></i> {k.groupname}
                  </td>
                  <td>
                    <i
                      id={k.keywordgroupsid}
                      className="fa fa-fw fa-plus-square"
                      style={{ fontSize: "18px", color: "#007bff" }}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                      onClick={(e) => addGroupHandler(e.target.id,index)}
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
          <h3 className="card-title">Keyword group(s) in this topic</h3>
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
                  <th>Keyword group name</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody>
                {keywordgroupinuse.map((k) => (
                  <tr key={k.keywordgroupsid}>
                    <td style={{ color: "#17a2b8" }}>
                      {" "}
                      <i className="fa fa-fw  fa-folder"></i> {k.groupname}
                    </td>
                    <td>
                      <i
                        id={k.keywordgroupsid}
                        className="fa fa-fw fa-minus-square"
                        style={{ fontSize: "18px", color: "#dc3545" }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Remove"
                        onClick={(e) => removeGroupHandler(e.target.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Auxi>
  ) : (
    <Errorpage></Errorpage>
  );
};

export default Setkeyword;
