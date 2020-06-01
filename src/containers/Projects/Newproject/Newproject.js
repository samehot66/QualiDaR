import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';


const newProj = (props) => {
    return (
        <Auxi>
            <div>Name : </div>
            <div>Description : </div>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success">Create</Button> 
            
        </Auxi>
    )
};
export default newProj;