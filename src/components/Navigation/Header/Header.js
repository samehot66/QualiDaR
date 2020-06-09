import React, { useState } from 'react';
import classes from './Header.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const header = (props) => {

    const [Sidebar, setSidebar] = useState(true);
    const showSidebar = () => { setSidebar(false) };
    const closeSidebar = () => { setSidebar(true) };

    return (
        <header className={classes.Header}>
            <div onClick={showSidebar} style={{ display: Sidebar ? 'block' : 'none' }}>
                <img className={classes.MenuIcon} src={require('./icon/Menu.png')} alt="Menu" />
            </div>
            <div onClick={closeSidebar} style={{ display: Sidebar ? 'none' : 'block' }} >
                <img className={classes.MenuIcon} src={require('./icon/Close.png')} alt="Menu" />
            </div>
            <Link to="/dashboard" > <span className={classes.DocRR}>DocR&R</span> </Link>
            {
            !!sessionStorage.getItem('iSAuthenticated') ? 
            <span className={classes.Name}>{ sessionStorage.getItem('email')}</span> 
            : <span className={classes.Name}>Name</span>}

            <span>
            <Link to="/" ><img className={classes.Auth} src={require('./icon/Human.png')} alt="Auth" /> </Link>
            </span>
            <span style={{ display: Sidebar ? 'block' : 'none' }}><Navbar /></span>
        </header>)
};

export default header;