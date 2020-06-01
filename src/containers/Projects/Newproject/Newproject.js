import React, { useState } from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

const newProj = (props) => {

    const [projFrom, setprogFrom] = useState(
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
            }
        })

    const formElementsArray = [];
    for (let key in projFrom) {
        formElementsArray.push({
            id: key,
            config: projFrom[key]
        })
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
                        elementLabel={formElement.config.elementLabel} />
                ))}
                <Button btnType="Success">Create</Button>
            </form>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Auxi>
    )
};
export default newProj;