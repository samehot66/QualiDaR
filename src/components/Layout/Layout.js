import React from 'react';
import Auxi from '../../hoc/Auxi';
import Header from '../Navigation/Header/Header';
import Content from '../Content/Content';

const layout = () => (
    <Auxi>
        <Header />
        <Content />
    </Auxi>
);

export default layout;