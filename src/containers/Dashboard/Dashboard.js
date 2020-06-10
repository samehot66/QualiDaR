import React,{useState} from 'react';
import classes from './Dashboard.css';
import { Link } from 'react-router-dom';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';

const dashboard = (props) => {
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
   
    
    return ( 
        isauth? 
        <div style={{  marginTop: '67px'}}>This is route from DashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboard</div>
    :
    <Pleaselogin/>
    ) 
};

export default dashboard;