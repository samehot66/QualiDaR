import React, { useState } from "react";
import Auxi from "../../../hoc/Auxi";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import axios from "axios";
import config from "../../../config.json";

const editgroup = (props) => {
  const [groupForm, setgroupForm] = useState({
    gname: {
      elementType: "input",
      elementLabel: "Group Name",
      elementConfig: {
        type: "text",
        placeholder: "Input your keyword group name...",
      },
      value: props.gname,
      validation: {
        required: true,
        minLength: 5,
        maxLength: 23,
      },
      valid: false,
      error: "",
    },
    shared: {
      elementType: "select",
      elementLabel: "Share to public?",
      elementConfig: {
        options: [
          { value: false, displayValue: "No" },
          { value: true, displayValue: "Yes" },
        ],
      },
      value: props.shared,
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

  const editGroupHandler = (event) => {
    event.preventDefault();
    const formDataArray = [];
    for (let formElementIdentifier in groupForm) {
      formDataArray[formElementIdentifier] = {
        value: groupForm[formElementIdentifier].value,
      };
    }

    let data = {
      uid: localStorage.getItem("uid"),
      access_token: localStorage.getItem("access_token"),
      groupname: formDataArray["gname"].value,
      shared: formDataArray["shared"].value,
      keywordgroupsid: props.groupid,
    };
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .put(config.URL + "/api/keywords", data, axiosConfig)
      .then((res) => {
        onGetyourgroups();
      })
      .catch((err) => {
        console.log("Edit Failed");
        onGetyourgroups();
      });
  };

  const onGetyourgroups = async () => {
    const yourkeywords = [];
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
      .get(config.URL + "/api/keywords/mygroups", data, axiosConfig)
      .then((res) => {
        props.onGetyourgroups(res.data);
      })
      .catch((err) => {
        console.log("Show all your keyword groups Failed");
      });
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedgroupForm = {
      ...groupForm,
    };

    const updatedFormElement = {
      ...updatedgroupForm[inputIdentifier],
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
    updatedgroupForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    if (updatedgroupForm["gname"].valid === false) {
      formIsValid = false;
    }

    setgroupForm({ ...updatedgroupForm });
    setFromIsValid(formIsValid);
  };

  const checkErrorFunc = (error) => {
    if (error === "") {
      return "No";
    } else {
      return "Yes";
    }
  };

  const formElementsArray = [];
  for (let key in groupForm) {
    formElementsArray.push({
      id: key,
      config: groupForm[key],
    });
  }

  return (
    <Auxi>
      <form onSubmit={editGroupHandler}>
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
          Edit
        </Button>
      </form>
      <Button btnType="DangerEmail" clicked={props.cancel}>
        Cancel
      </Button>
    </Auxi>
  );
};
export default editgroup;
