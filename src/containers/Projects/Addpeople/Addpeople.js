import React, { useState, useEffect, useRef } from "react";
import Auxi from "../../../hoc/Auxi";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import axios from "axios";
import config from "../../../config.json";
import classes from "./Addpeople.css";

const addpeople = (props) => {
  const [peopleForm, setpeopleForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Input your team e-mail...",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      error: "",
    },
  });

  const [FormIsValid, setFromIsValid] = useState(false);
  const [allpeople, setallpeople] = useState([]);
  const [search, setsearch] = useState("");
  const [allpeoplefilterserch, setallpeoplefilterserch] = useState([]);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checkValidity = (value) => {
    let isValid = true;
    let checkArray = [];
    let error = "";

    checkArray.push({
      Isvalid: isValid,
      Error: error,
    });

    if (!validateEmail(value)) {
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Invalid E-mail";
    }
    return checkArray;
  };

  const addPeopleHandler = async (event) => {
    event.preventDefault();
    const formDataArray = [];
    for (let formElementIdentifier in peopleForm) {
      formDataArray[formElementIdentifier] = {
        value: peopleForm[formElementIdentifier].value,
      };
    }
    let data = {
      uid: localStorage.getItem("uid"),
      pid: props.pid,
      email: formDataArray["email"].value,
      access_token: localStorage.getItem("access_token"),
      role: "guest",
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post(process.env.REACT_APP_URL + "/api/projects/people/add", data, axiosConfig)
      .then((res) => {
        alert("Add Successed");
      })
      .catch((err) => {
        alert("Add failed, e-mail didn't existed");
      });
    await handleGetpeople();
  };

  const handleGetpeople = async () => {
    const people = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.pid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(process.env.REACT_APP_URL + "/api/projects/people", data, axiosConfig)
      .then((res) => {
        for (const index in res.data.users) {
          people.push({
            peopleid: res.data.users[index].uid,
            email: res.data.users[index].email,
          });
        }
        setallpeople(people);
      })
      .catch((err) => {
        //alert("Show people Failed");
        localStorage.clear();
      });
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    const people = [];
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.pid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(process.env.REACT_APP_URL + "/api/projects/people", data, axiosConfig, {
        cancelToken: source.token,
      })
      .then((res) => {
        for (const index in res.data.users) {
          people.push({
            peopleid: res.data.users[index].uid,
            email: res.data.users[index].email,
          });
        }
        setallpeople(people);
      })
      .catch((err) => {
        //alert("Show people Failed");
        localStorage.clear();
      });
    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    setallpeoplefilterserch(
      allpeople.filter((people) => {
        return people.email
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    );
  }, [search, allpeople]);

  const formElementsArray = [];
  for (let key in peopleForm) {
    formElementsArray.push({
      id: key,
      config: peopleForm[key],
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
    const updatedpeopleForm = {
      ...peopleForm,
    };

    const updatedFormElement = {
      ...updatedpeopleForm[inputIdentifier],
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
    updatedpeopleForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    if (updatedpeopleForm["email"].valid === false) {
      formIsValid = false;
    }

    setpeopleForm({ ...updatedpeopleForm });
    setFromIsValid(formIsValid);
  };
  const deleteHandler = async (event) => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.pid,
        peopleid: event.target.id,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .delete(process.env.REACT_APP_URL + "/api/projects/people", data, axiosConfig)
      .then((res) => {
        alert("Delete Successful");
      })
      .catch((err) => {
        alert("Delete Failed");
      });
    await handleGetpeople();
  };

  return (
    <Auxi>
      {props.comefrom == "Oneproject" ? (
        <Auxi>
          <form onSubmit={addPeopleHandler}>
            {formElementsArray.map((formElement) => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                elementLabel={formElement.config.elementLabel}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                error={formElement.config.error}
                checkError={checkErrorFunc(formElement.config.error)}
              />
            ))}
            <Button
              btnType="Success"
              disabled={!FormIsValid}
              clicked={props.cancel}
            >
              Add
            </Button>
          </form>
          <Button btnType="DangerEmail" clicked={props.cancel}>
            Cancel
          </Button>
        </Auxi>
      ) : (
        <div className="card">
          <div
            className="card-header border-transparent "
            style={{ padding: "0.2rem 1rem", backgroundColor: "#007bff" }}
          >
            <h3 className="card-title" style={{ color: "white" }}>
              Add a person
            </h3>
          </div>
          
          <div
            className="card-body p-0 "
            style={{ overflow: "auto", margin: "4px", height: "108px" }}
          >
            <div>
              <Auxi>
                <form onSubmit={addPeopleHandler}>
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
                  <Button
                    btnType="Success"
                    disabled={!FormIsValid}
                    clicked={props.cancel}
                  >
                    Add
                  </Button>
                </form>
                <Button btnType="DangerEmail" clicked={props.cancel}>
                  Cancel
                </Button>
              </Auxi>
            </div>
          </div>
        </div>
      )}
      {props.comefrom == "Oneproject" ? null : (
        <div className={["card ", classes.Box].join(" ")}>
          <div
            className="card-header border-transparent "
            style={{ padding: "0.2rem 1rem", backgroundColor: "#17a2b8" }}
          >
            <h3 className="card-title" style={{ color: "white" }}>
              People in this project{" "}
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
                    <th>E-mail</th>
                    <th>Tool(s)</th>
                  </tr>
                </thead>
                <tbody>
                  {allpeoplefilterserch.map((people) =>
                    people.email !== localStorage.getItem("email") ? (
                      <tr key={people.peopleid}>
                        <td>
                          <i
                            className="fa fa-fw fa-user"
                            style={{ color: "#17a2b8" }}
                          ></i>
                          {people.email}
                        </td>
                        <td>
                          <i
                            id={people.peopleid}
                            key={people.peopleid}
                            className="fa fa-fw  fa-minus-square"
                            style={{ color: "#FF5533" }}
                            onClick={(event) => deleteHandler(event)}
                          ></i>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Auxi>
  );
};
export default addpeople;
