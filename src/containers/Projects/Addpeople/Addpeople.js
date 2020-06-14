import React, { useState } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from 'axios';
import config from '../../../config.json';
import classes from './Addpeople.css';
import Allpeople from './Allpeople/Allpeople';
const addpeople = (props) => {

    const [projForm, setprojForm] = useState(
        {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Input your team e-mail...'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                error: ''
            }
        })
    const [FormIsValid, setFromIsValid] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const checkValidity = (value) => {
        let isValid = true;
        let checkArray = [];
        let error = '';

        checkArray.push({
            Isvalid: isValid,
            Error: error
        })

        if (!validateEmail(value)) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Invalid E-mail';
        }

        return checkArray;
    }

    const addPeopleHandler = (event) => {
        event.preventDefault();
        const formDataArray = [];
        for (let formElementIdentifier in projForm) {
            formDataArray[formElementIdentifier] = { value: projForm[formElementIdentifier].value }
        }

        // let data = {
        //     "uid": sessionStorage.getItem("uid"),
        //     "pid": props.pid,
        //      "email" : formDataArray["email"].value,
        //     "access_token": sessionStorage.getItem("access_token")
        // }

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        // axios.post(config.URL + '/api/projects', data, axiosConfig)
        //     .then((res) => {
        //         console.log("RESPONSE RECEIVED: ", res);
        //     })
        //     .catch((err) => {
        //         console.log("AXIOS ERROR: ", err);
        //     })
    }

    // const deleteEmail =(id) =>
    // {
    //     console.log("Hello");
    // }

    const formElementsArray = [];
    for (let key in projForm) {
        formElementsArray.push({
            id: key,
            config: projForm[key]
        })
    }

    const checkErrorFunc = (x) => {
        if (x === '') {
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
        if (updatedprojForm['email'].valid === false) {
            formIsValid = false;
        }

        setprojForm({ ...updatedprojForm });
        setFromIsValid(formIsValid);
    }

    return (
        <Auxi>
            <form onSubmit={addPeopleHandler}>
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
                <Button btnType="Success" disabled={!FormIsValid} clicked={props.cancel} >Add</Button>
            </form>
            <Button btnType="DangerEmail" clicked={props.cancel}>Cancel</Button>
            <div className={classes.Peopleinthis}>People in this project</div>

            <Allpeople pid={props.pid} />
        </Auxi>
    )
};
export default addpeople;


