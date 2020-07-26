import React from 'react';
import Auxi from '../../hoc/Auxi';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

const Layout = () => (
    <Auxi>
        <Header/>
        <Menu/>
        <Content/>
        <Footer/>
    </Auxi>
);

export default Layout;