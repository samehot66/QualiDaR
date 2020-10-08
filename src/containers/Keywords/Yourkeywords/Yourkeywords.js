import React, { useState, useEffect } from "react";
import Input from "../../../components/UI/Input/Input";
import Auxi from "../../../hoc/Auxi";
import Modal from "../../../components/UI/Modal/Modal";
import Button from "../../../components/UI/Button/Button";
import classes from "../Yourkeywords/Yourkeywords.css";
import axios from "axios";
import config from "../../../config.json";
import Editgroup from "../Editgroup/Editgroup";

const yourkeywords = (props) => {
  const [Deletemodal, setDeletemodal] = useState(false);
  const showDeleteModal = () => {
    setDeletemodal(true);
  };
  const closeDeleteModal = () => {
    setDeletemodal(false);
  };

  const [keywordsmodal, setkeywordsmodal] = useState(false);
  const showkeywordsModal = () => {
    setkeywordsmodal(true);
  };
  const closekeywordsModal = () => {
    setkeywordsmodal(false);
  };

  const [editmodal, seteditmodal] = useState(false);
  const showEditModal = () => {
    seteditmodal(true);
  };
  const closeEditModal = () => {
    seteditmodal(false);
  };

  const deleteHandler = async () => {
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
      .delete(process.env.REACT_APP_URL + "/api/keywords/subscribe", data, axiosConfig)
      .then((res) => {
        onGetyourgroups();
      })
      .catch((err) => {
        onGetyourgroups();
        //console.log("Delete your group Failed");
      });
    await closeDeleteModal();
  };

  const onGetyourgroups = async () => {
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
      .get(process.env.REACT_APP_URL + "/api/keywords/mygroups", data, axiosConfig)
      .then((res) => {
        props.onGetyourgroups(res.data);
      })
      .catch((err) => {
        //console.log("Show all your keyword groups Failed");
      });
  };

  const [keywordForm, setkeywordForm] = useState({
    keyword: {
      elementType: "input",
      elementLabel: "Input new keyword...",
      elementConfig: {
        type: "text",
        placeholder: "",
      },
      value: "",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
      },
      valid: false,
      error: "",
    },
  });

  const [FormIsValid, setFromIsValid] = useState(false);
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
      .get(process.env.REACT_APP_URL + "/api/keywords/private", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        //console.log(res.data)
        for (const index in res.data) {
          keywords.push({
            kid: res.data[index].kid,
            keywordtext: res.data[index].keywordtext,
          });
        }
        setallkeywords(keywords);
      })
      .catch((err) => {
        //alert("Show keywords Failed");
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

  const checkValidity = (value, rules) => {
    let isValid = true;
    let checkArray = [];
    let error = "";

    checkArray.push({
      Isvalid: isValid,
      Error: error,
    });

    if (!rules) {
      return checkArray;
    }

    if (value.length < rules.minLength) {
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Minimum length is " + rules.minLength;
    }

    if (value.length > rules.maxLength) {
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Maximum length is " + rules.maxLength;
    }

    if (rules.required) {
      if (!(value.trim() !== "")) {
        checkArray[0].Isvalid = false;
        checkArray[0].Error = "Must not empty!";
      }
    }

    return checkArray;
  };

  const addKeywordHandler = async (event) => {
    event.preventDefault();
    const formDataArray = [];
    for (let formElementIdentifier in keywordForm) {
      formDataArray[formElementIdentifier] = {
        value: keywordForm[formElementIdentifier].value,
      };
    }

    let data = {
      uid: localStorage.getItem("uid"),
      keywordgroupsid: props.groupid,
      access_token: localStorage.getItem("access_token"),
      keywordtext: formDataArray["keyword"].value,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(process.env.REACT_APP_URL + "/api/keywords/private", data, axiosConfig)
      .then((res) => {
        onGetKeywords();
      })
      .catch((err) => {
        alert("Add failed, Keyword has already exist");
        onGetKeywords();
      });
  };

  const onGetKeywords = async () => {
    const keywords = [];
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
    await axios
      .get(process.env.REACT_APP_URL + "/api/keywords/private", data, axiosConfig)
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
        //alert("Show keywords Failed");
        localStorage.clear();
      });
  };

  const formElementsArray = [];
  for (let key in keywordForm) {
    formElementsArray.push({
      id: key,
      config: keywordForm[key],
    });
  }

  const checkErrorFunc = (error) => {
    if (error === "") {
      return "No";
    } else {
      return "Yes";
    }
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedkeywordForm = {
      ...keywordForm,
    };

    const updatedFormElement = {
      ...updatedkeywordForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )[0].Isvalid;
    updatedFormElement.error = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    )[0].Error;
    updatedkeywordForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    if (updatedkeywordForm["keyword"].valid === false) {
      formIsValid = false;
    }

    setkeywordForm({ ...updatedkeywordForm });
    setFromIsValid(formIsValid);
  };
  const deletekeywordHandler = (e) => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        kid: e.target.id,
      },
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .delete(process.env.REACT_APP_URL + "/api/keywords", data, axiosConfig)
      .then((res) => {
        onGetKeywords();
      })
      .catch((err) => {
        onGetKeywords();
        alert("Delete Failed");
      });
  };

  const handlerEdityourgroup = async (newYourState) => {
    await props.onGetyourgroups(newYourState);
  };
  return (
    <Auxi>
      <td className={classes.Gname} onClick={showkeywordsModal}>
        <i className="fa fa-fw fa-folder"></i>
        {props.gname}
      </td>
      <td style={{ color: "#ccc" }}>me</td>
      <td>
        <i
          className="fa fa-fw fa-edit"
          style={{ fontSize: "18px" }}
          onClick={showEditModal}
        ></i>
        <Modal
          show={editmodal}
          modalClosed={closeEditModal}
          name="Edit keyword group"
        >
          <Editgroup
            gname={props.gname}
            groupid={props.groupid}
            cancel={closeEditModal}
            shared={props.shared}
            onGetyourgroups={handlerEdityourgroup}
          />
        </Modal>

        <i
          className="fa fa-fw fa-trash"
          style={{ fontSize: "18px" }}
          onClick={showDeleteModal}
        ></i>
        <Modal
          show={Deletemodal}
          modalClosed={closeDeleteModal}
          name="Delete keyword group"
        >
          <div className={classes.Delete}>
            Are you sure to delete
            <span style={{ color: "blue" }}> {props.gname} </span> group?
          </div>
          <Button btnType="Successdeletegroup" clicked={deleteHandler}>
            Delete
          </Button>
          <Button btnType="Danger" clicked={closeDeleteModal}>
            Cancel
          </Button>
        </Modal>

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
                Add a keyword
              </h3>
            </div>
            <div
              className="card-body p-0 "
              style={{ overflow: "auto", margin: "4px", height: "108px" }}
            >
              <div>
                <Auxi>
                  <form onSubmit={addKeywordHandler}>
                    {formElementsArray.map((formElement) => (
                      <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        elementLabel={formElement.config.elementLabel}
                        changed={(event) =>
                          inputChangedHandler(event, formElement.id)
                        }
                        error={formElement.config.error}
                        checkError={checkErrorFunc(formElement.config.error)}
                      />
                    ))}
                    <Button btnType="Successaddkeyword" disabled={!FormIsValid}>
                      Add
                    </Button>
                  </form>
                  <Button btnType="DangerEmail" clicked={closekeywordsModal}>
                    Cancel
                  </Button>
                </Auxi>
              </div>
            </div>
          </div>
          <div className={["card ", classes.Box].join(" ")}>
            <div
              className="card-header border-transparent "
              style={{ padding: "0.2rem 1rem", backgroundColor: "#17a2b8" }}
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
                      <th>Tool</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allkeywordsfilterserch.map((keywords) => (
                      <tr key={keywords.kid}>
                        <td>
                          <i
                            className="fa fa-fw fa-file-word"
                            style={{ color: "#17a2b8" }}
                          ></i>
                          {keywords.keywordtext}
                        </td>
                        <td>
                          <i
                            id={keywords.kid}
                            key={keywords.kid}
                            className="fa fa-fw  fa-minus-square"
                            style={{ color: "#FF5533" }}
                            onClick={(event) => deletekeywordHandler(event)}
                          ></i>
                        </td>
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

export default yourkeywords;
