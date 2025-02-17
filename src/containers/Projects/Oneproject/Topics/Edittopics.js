import React, { useState } from "react";
import Auxi from "../../../../hoc/Auxi";
import Button from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";
import axios from "axios";
//import config from "../../../../config.json";

const edittopic = (props) => {
  const [topicForm, settopicForm] = useState({
    name: {
      elementType: "input",
      elementLabel: "Topic name",
      elementConfig: {
        type: "text",
        placeholder: "Input topic name...",
      },
      value: props.tname,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      valid: false,
      error: "",
    },
  });
  const [FormIsValid, setFromIsValid] = useState(false);

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

  const editHandler = async (event) => {
    event.preventDefault();
    const formDataArray = [];
    for (let formElementIdentifier in topicForm) {
      formDataArray[formElementIdentifier] = {
        value: topicForm[formElementIdentifier].value,
      };
    }
    let data = {
      uid: localStorage.getItem("uid"),
      tname: formDataArray["name"].value,
      access_token: localStorage.getItem("access_token"),
      tid: props.tid,
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(process.env.REACT_APP_URL + "/api/topics", data, axiosConfig);
    await onGetTopic();
  };

  const onGetTopic = async () => {
    let data = {
      params: {
        uid: localStorage.getItem("uid"),
        access_token: localStorage.getItem("access_token"),
        pid: props.webid,
      },
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .get(process.env.REACT_APP_URL + "/api/topics", data, axiosConfig)
      .then((res) => {
        props.onGettopicafteredit(res.data);
      })
      .catch((err) => {
        //alert("Show all topics Failed");
        localStorage.clear();
      });
  };

  const formElementsArray = [];
  for (let key in topicForm) {
    formElementsArray.push({
      id: key,
      config: topicForm[key],
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
    const updatedprojForm = {
      ...topicForm,
    };

    const updatedFormElement = {
      ...updatedprojForm[inputIdentifier],
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
    updatedprojForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    if (updatedprojForm["name"].valid === false) {
      formIsValid = false;
    }

    settopicForm({ ...updatedprojForm });
    setFromIsValid(formIsValid);
  };

  return (
    <Auxi>
      <form onSubmit={editHandler}>
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
          Save
        </Button>
      </form>
      <Button btnType="Editproj" clicked={props.cancel}>
        Cancel
      </Button>
    </Auxi>
  );
};
export default edittopic;
