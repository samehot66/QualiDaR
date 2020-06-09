import React,{useState} from 'react';

const dashboard = (props) => {
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
   
    
    return ( 
        isauth? 
        <div style={{  marginTop: '67px'}}>This is route from DashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboardDashboard</div>
    :
        <div style={{  marginTop: '67px'}}>Please login</div>
    ) 
};

export default dashboard;