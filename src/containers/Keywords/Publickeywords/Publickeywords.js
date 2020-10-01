import React, { useState, useEffect } from "react";
import Auxi from "../../../hoc/Auxi";
import classes from "./Publickeywords.css";
import Modal from "../../../components/UI/Modal/Modal";
import axios from "axios";
import config from "../../../config.json";

const Publickeywords = (props) => {
  const [keywordsmodal, setkeywordsmodal] = useState(false);
  const showkeywordsModal = () => {
    setkeywordsmodal(true);
  };
  const closekeywordsModal = () => {
    setkeywordsmodal(false);
  };

  const subscribeHandler = async () => {
    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      keywordgroupsid: props.groupid,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(process.env.REACT_APP_URL + "/api/keywords/groups", data, axiosConfig)
      .then((res) => {
        onGetpubgroups();
      })
      .catch((err) => {
        onGetpubgroups();
      });
  };

  const onGetpubgroups = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        shared: true,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(process.env.REACT_APP_URL + "/api/keywords", data, axiosConfig)
      .then((res) => {
        props.onGetpubgroups(res.data);
      })
      .catch((err) => {
        //alert("Show public keyword groups Failed");
        localStorage.clear();
      });
  };

  const removeHandler = () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        keywordgroupsid: props.groupid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(process.env.REACT_APP_URL + "/api/keywords/groups", data, axiosConfig)
      .then((res) => {
        onGetsubgroups();
      })
      .catch((err) => {
        onGetsubgroups();
      });
  };
  const onGetsubgroups = async () => {
    const subscribekeywords = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(process.env.REACT_APP_URL + "/api/keywords/groups", data, axiosConfig)
      .then((res) => {
        props.onGetsubgroups(res.data);
      })
      .catch((err) => {
        //alert("Show subscribe keyword groups Failed");
        localStorage.clear();
      });
  };

  const [allkeywords, setallkeywords] = useState([]);
  const [search, setsearch] = useState("");
  const [allkeywordsfilterserch, setallkeywordsfilterserch] = useState([]);

  useEffect(() => {
    const keywords = [];
    let source = axios.CancelToken.source();
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        keywordgroupsid: props.groupid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get(process.env.REACT_APP_URL + "/api/keywords/public", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        for (const index in res.data) {
          keywords.push({
            kid: res.data[index].kid,
            keywordtext: res.data[index].keywordtext,
          });
        }
        setallkeywords(keywords);
      })
      .catch((err) => {
        //alert("Show keywords Failed!");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    setallkeywordsfilterserch(
      allkeywords.filter((keywords) => {
        return keywords.keywordtext
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, allkeywords]);

  return (
    <Auxi>
      <td className={classes.Gname} onClick={showkeywordsModal}>
        <i className="fa fa-fw fa-folder"></i>
        {props.gname}
      </td>
      <td style={{ color: "#ccc" }}>{props.owner}</td>
      <td>
        {props.type === "member" ? (
          <i
            className="fa fa-fw fa-minus-square"
            style={{ color: "#dc3545", fontSize: "20px" }}
            onClick={removeHandler}
          ></i>
        ) : (
          <i
            className="fa fa-fw fa-plus-square"
            style={{ color: "#007bff", fontSize: "20px" }}
            onClick={subscribeHandler}
          ></i>
        )}
        <Modal
          show={keywordsmodal}
          modalClosed={closekeywordsModal}
          name={props.gname}
        >
          <div className="card">
            <div
              className="card-header border-transparent "
              style={{ padding: "0.2rem 1rem", backgroundColor: "#007bff" }}
            >
              <h3 className="card-title" style={{ color: "white" }}>
                Information{" "}
              </h3>
            </div>
            {/* /.card-header */}
            <div className="card-body p-0 " style={{ overflow: "auto" }}>
              <table
                className="table m-0 text-nowrap"
                style={{ overflow: "scroll" }}
              >
                <thead>
                  <tr>
                    <th>Group name</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ color: "#007bff" }}>
                      <i className="fa fa-fw fa-file-word"></i>
                      {props.gname}
                    </td>
                    <td style={{ color: "#ccc" }}>{props.owner}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={["card ", classes.Box].join(" ")}>
            <div
              className="card-header border-transparent "
              style={{ padding: "0.2rem 1rem", backgroundColor: "#4c96ed" }}
            >
              <h3 className="card-title" style={{ color: "white" }}>
                Keyword(s) in group{" "}
              </h3>
              <div className="card-tools">
                <input
                  type="text"
                  className="form-control"
                  style={{ height: "1.25rem" }}
                  placeholder="Search..."
                  onChange={(e) => setsearch(e.target.value)}
                />
              </div>
            </div>

            <div className="card-body p-0 " style={{ overflow: "auto" }}>
              <div>
                <table
                  className="table m-0 text-nowrap"
                  style={{ overflow: "scroll" }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Tool(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allkeywordsfilterserch.map((keywords) => (
                      <tr key={keywords.kid}>
                        <td>
                          <i
                            className="fa fa-fw fa-file-word"
                            style={{ color: "#4c96ed" }}
                          ></i>
                          {keywords.keywordtext}
                        </td>
                        <td style={{ color: "#ccc" }}>none</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </td>
    </Auxi>
  );
};

export default Publickeywords;
