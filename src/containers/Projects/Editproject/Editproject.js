import React, { useState, useEffect } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from 'axios';
import config from '../../../config.json';

const editProj = (props) => {


    const [projForm, setprojForm] = useState(
        {
            name:
            {
                elementType: 'input',
                elementLabel: 'Project Name',
                elementConfig:
                {
                    type: 'text',
                    placeholder:props.pname
      
                },
                value: props.pname,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 50
                },
                valid: false,
                error: ''
            },
            description:
            {
                elementType: 'textarea',
                elementLabel: 'Description',
                elementConfig:
                {
                    type: 'text',
                    placeholder: props.description
                },
                value: props.description,
                validation: {
                    required: false,
                    minLength: 0,
                    maxLength: 200
                },
                valid: false,
                error: ''
            }
        })
    const [FormIsValid, setFromIsValid] = useState(false);


    const checkValidity = (value, rules) => {
        let isValid = true;
        let checkArray = [];
        let error = '';

        checkArray.push({
            Isvalid: isValid,
            Error: error
        })

        if (!rules) {
            return checkArray;
        }

        if (value.length < rules.minLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Minimum length is ' + rules.minLength;
        }

        if (value.length > rules.maxLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Maximum length is ' + rules.maxLength;
        }

        if (rules.required) {
            if (!(value.trim() !== "")) {
                checkArray[0].Isvalid = false;
                checkArray[0].Error = 'Must not empty!';
            }
        }

        return checkArray;
    }

    const editProjHandler = async (event) => {
    
        const formDataArray = [];
        for (let formElementIdentifier in projForm) {
            formDataArray[formElementIdentifier] = { value: projForm[formElementIdentifier].value }
        }
        let data = {
            "uid": localStorage.getItem("uid"),
            "pname": formDataArray["name"].value,
            "description": formDataArray["description"].value,
            "access_token": localStorage.getItem("access_token"),
            "pid":props.pid
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.put(config.URL + '/api/projects', data, axiosConfig)
        await onGetprojects();
    }

    const onGetprojects = async () => {
        const loadprojects = [];
        let data = {
          params: {
            "uid": localStorage.getItem("uid"),
            "access_token": localStorage.getItem("access_token")
          }
        }
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        await axios.get(config.URL + '/api/projects', data, axiosConfig)
          .then((res) => {
            props.onGetprojects(res.data);
          })
          .catch((err) => {
            alert("Show all projects Failed");
          })
    }
    
    const formElementsArray = [];
    for (let key in projForm) {
        formElementsArray.push({
            id: key,
            config: projForm[key]
        })
    }

    const checkErrorFunc = (error) => {
        if (error === '') {
            return 'No';
        }
        else {
            return 'Yes';
        }
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedprojForm = {
            ...projForm
        };

        const updatedFormElement = {
            ...updatedprojForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)[0].Isvalid;
        updatedFormElement.error = checkValidity(updatedFormElement.value, updatedFormElement.validation)[0].Error;
        updatedprojForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        if (updatedprojForm['name'].valid === false) {
            formIsValid = false;
        }

        setprojForm({ ...updatedprojForm });
        setFromIsValid(formIsValid);
    }

    return (
        <Auxi>
            <form onSubmit={editProjHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        elementLabel={formElement.config.elementLabel}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        error={formElement.config.error}
                        checkError={checkErrorFunc(formElement.config.error)} />
                ))}
                <Button btnType="Success" disabled={!FormIsValid} clicked={props.cancel} >Edit</Button>
            </form>
            <Button btnType="Editproj" clicked={props.cancel}>Cancel</Button>
        </Auxi>
    )
};
export default editProj;


