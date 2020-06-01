import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

const newProj = (props) => {
    return (
        <Auxi>
            <form>
                <Input inputtype="input" type="text" name="name" placeholder=" Input project name..." label="Project Name"/>
                <Input inputtype="input" type="text" name="desc" placeholder=" Input desciption details..." label="Description"/>
                <Button btnType="Success">Create</Button>
            </form>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Auxi>
    )
};
export default newProj;