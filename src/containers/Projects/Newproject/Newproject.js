import React, { useState } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

const newProj = (props) => {

    const [projForm, setprojForm] = useState(
        {
            name:
            {
                elementType: 'input',
                elementLabel: 'Project Name',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Input your project name...'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 30
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
                    placeholder: 'Input your description details...'
                },
                value: '',
                validation: {
                    required: false,
                    minLength: 0,
                    maxLength: 200
                },
                valid: false,
                error: ''
            },/*,
            drop:
            {
                elementType: 'select',
                elementLabel: 'xxx',
                elementConfig:
                {
                    options:[
                        {value:'x', displayValue:'x'},
                        {value:'xx', displayValue:'xx'},
                    ]
                },
                value: ''
            }*/
        })
        const [FormIsValid,setFromIsValid] =  useState(false);

    const checkValidity = (value, rules) => {
        let isValid = true;
        let checkArray = [];
        let error = '';

        checkArray.push({
            Isvalid: isValid,
            Error: error
        })

        if(!rules)
        {
            return checkArray;
        }

        if (value.length < rules.minLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Minimum length ' + rules.minLength;
        }

        if (value.length > rules.maxLength) {
            checkArray[0].Isvalid = false;
            checkArray[0].Error = 'Maximum length ' + rules.maxLength;
        }

        if (rules.required) {
            if (!(value.trim() !== "")) {
                checkArray[0].Isvalid = false;
                checkArray[0].Error = 'Must not empty!';
            }
        }

        return checkArray;
    }

    const newProjHandler = (event) => {
        event.preventDefault();
        const formDataArray = [];
        for (let formElementIdentifier in projForm) {
            formDataArray[formElementIdentifier] = { value: projForm[formElementIdentifier].value }
        }
        console.log(formDataArray);
        //name
        console.log(formDataArray["name"].value);
        console.log(formDataArray["description"].value);
    }

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
        for (let inputIdentifier in updatedprojForm)
        {
            formIsValid = updatedprojForm[inputIdentifier].valid && formIsValid;
        }

        setprojForm({ ...updatedprojForm });
        setFromIsValid(formIsValid);
    }

    return (
        <Auxi>
            <form>
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
                <Button btnType="Success" disabled={!FormIsValid} >Create</Button>
            </form>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Auxi>
    )
};
export default newProj;