import React,{useState} from 'react';
import classes from './Dashboard.css';
import { Link } from 'react-router-dom';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';

const dashboard = (props) => {
    
    const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 
   
    return ( 
        isauth? 
        <div >This is route from DashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboard</div>
    :
    <div>please login</div>
    ) 
};

export default dashboard;