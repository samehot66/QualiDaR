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
                value: ''
            },
            description:
            {
                elementType: 'input',
                elementLabel: 'Description',
                elementConfig:
                {
                    type: 'text',
                    placeholder: 'Input your description details...'
                },
                value: ''
            }/*,
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

    const formElementsArray = [];
    for (let key in projForm) {
        formElementsArray.push({
            id: key,
            config: projForm[key]
        })
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedprojForm = {
            ...projForm
        };

        const updatedFormElement = {
            ...updatedprojForm[inputIdentifier]
        };
        
        updatedFormElement.value = event.target.value;
        updatedprojForm[inputIdentifier] = updatedFormElement;
        setprojForm({ ...updatedprojForm });
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
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">Create</Button>
            </form>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Auxi>
    )
};
export default newProj;