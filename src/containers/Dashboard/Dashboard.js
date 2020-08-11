import React,{useState} from 'react';
import classes from './Dashboard.css';
import { Link } from 'react-router-dom';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import Fileview from '../Upload/Fileview/Fileview';

const dashboard = (props) => {
    
    const [isauth,setisauth] =  useState(localStorage.getItem('isAuth')); 
   
    return ( 
        isauth? 
       
       <Fileview/>
    :
  <Errorpage></Errorpage>
    ) 
};

export default dashboard;