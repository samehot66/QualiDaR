import React from 'react';
import Auxi from '../../hoc/Auxi';
import Header from '../Navigation/Header/Header';
import Navbar from '../Navigation/Navbar/Navbar';
import Content from '../Content/Content';

const layout = () => (
    <Auxi>
        <Header />
        <Navbar />
        <Content />
    </Auxi>
);

export default layout;