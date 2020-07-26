import React, { useState }  from 'react';
import Modal from '../UI/Modal/Modal';
import { NavLink } from 'react-router-dom';
import Auxi from '../../hoc/Auxi';

const Menu = () => {
    const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 

    return (
        <aside className="main-sidebar sidebar-light-primary elevation-4">
            {/* Brand Logo */}
            <NavLink to="index3.html" className="brand-link">
                <img src={require('./icon/logo.png')} alt="QualiDaR" className="brand-image" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">QualiDaR</span>
            </NavLink>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}     
                { isauth ?
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    <img src={require('./icon/user.png')} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <NavLink to="/profile" className="d-block">Alexander Pierce</NavLink>
                    </div> 
                </div> :  
                  null
               }

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
             with font-awesome or any other icon font library */}
                       {isauth ? <Auxi> <li className="nav-item">
                            <NavLink to="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-th-large" />
                                <p>
                                    Dashboard
                                </p>
                            </NavLink >
                        </li>
                        <li className="nav-item">
                             <NavLink to="/keywords"  className="nav-link">
                                <i className="nav-icon fas fa-key" />
                                <p>
                                    Keywords
                                </p>
                            </NavLink >
                        </li>
                        <li className="nav-item">
                            <NavLink to="/projects"  className="nav-link">
                                <i className="nav-icon fas fa-folder" />
                                <p>
                                    Projects
                                </p>
                            </NavLink >
                        </li>
                        <li className="nav-item">
                             <NavLink to="/sharedwithme" className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Shared With Me
                                </p>
                            </NavLink >
                        </li></Auxi>
                        :
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>
                                   Sign Up/Sign In
                                </p>
                            </NavLink > 
                        </li> }
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>

    )
}

export default Menu;