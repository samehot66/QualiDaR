import React,{useState} from 'react';
import classes from './Dashboard.css';
import { Link } from 'react-router-dom';
import Errorpage from '../../components/UI/Errorpage/Errorpage';

const dashboard = (props) => {
    
    const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 
   
    return ( 
        isauth? 
       
        <div >This is route from DashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboard</div>
    :
  <Errorpage></Errorpage>
    ) 
};

export default dashboard;