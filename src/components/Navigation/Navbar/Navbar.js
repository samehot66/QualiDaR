import React from 'react';
import classes from './Navbar.css';
import { NavLink } from 'react-router-dom';

const navbar = () => {
    return (
    <nav className={classes.Navbar}>  
        <div className={classes.Dashboard}>
            <NavLink to="/" exact activeStyle={{color: '#036294', fontSize: '27px', textDecoration: 'underline'}}>
                <img className={classes.DashboardIcon} src={require('./icon/Dashboard.png')} alt="Dashboard" />
                Dashboard
            </NavLink>
        </div>
        <div className={classes.Upload}>
            <NavLink to={{pathname: "/upload"}} activeStyle={{color: '#036294', fontSize: '28px', textDecoration: 'underline'}}>
                 <img className={classes.UploadIcon} src={require('./icon/Upload.png')} alt="Upload"/> 
                 Upload
            </NavLink>
        </div>
        <div className={classes.Projects}>
            <NavLink to={{pathname: "/projects"}} activeStyle={{ color: '#036294', fontSize: '28px', textDecoration: 'underline'}}>
                <img className={classes.ProjectsIcon} src={require('./icon/Projects.png')} alt="Projects"/> 
                Projects
            </NavLink>
        </div>
        <div className={classes.Shared}>
            <NavLink to={{pathname: "/sharedwithme"}} activeStyle={{color: '#036294', fontSize: '28px', textDecoration: 'underline'}}>
            <img className={classes.SharedwithmeIcon} src={require('./icon/Sharedwithme.png')} alt="Sharedwithme"/>     
                Shared with me
            </NavLink>
        </div>
    </nav>)
}

export default navbar;