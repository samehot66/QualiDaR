import React, { useState } from "react";
import Auxi from "../../../../../hoc/Auxi";
import Button from "../../../../../components/UI/Button/Button";
import Input from "../../../../../components/UI/Input/Input";
import axios from "axios";
//import config from "../../../../../config.json";

const addtopic = (props) => {
  const [topicForm, settopicForm] = useState({
    name: {
      elementType: "input",
      elementLabel: "How long of text you want to read?",
      elementConfig: {
        type: "number",
        placeholder: "Input text length such as 500 letters",
      },
      value: 500,
      validation: {
        required: true,
        minLength: 500,
        maxLength: 1000,
      },
      valid: false,
      error: "",
    },
  });
  const [FormIsValid, setFromIsValid] = useState(true);

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

    if(!Number.isInteger(Number(value))){
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Please input number!";
    }

    if (Number(value) < rules.minLength) {
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Minimum text long is " + rules.minLength+" letters!";
    }

    if (Number(value) > rules.maxLength) {
      checkArray[0].Isvalid = false;
      checkArray[0].Error = "Maximum text long is " + rules.maxLength+" letters!";
    }

    if (rules.required) {
      if (!(value.trim() !== "")) {
        checkArray[0].Isvalid = false;
        checkArray[0].Error = "Must not empty!";
      }
    }

    return checkArray;
  };

  const newTopicHandler = async (event) => {
    event.preventDefault();
    const formDataArray = [];
    for (let formElementIdentifier in topicForm) {
      formDataArray[formElementIdentifier] = {
        value: topicForm[formElementIdentifier].value,
      };
    }
    props.onSetwordlength(formDataArray["name"].value);
    props.cancel();
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
      <form onSubmit={newTopicHandler}>
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

{/* <button type="button"  disabled={!FormIsValid} >my button</button> */}
        <Button
          btnType="Next"
          disabled={!FormIsValid}
          
        >
          Next
        </Button>
      </form>
    </Auxi>
  );
};
export default addtopic;
