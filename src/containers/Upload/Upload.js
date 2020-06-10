import React,{useState} from 'react';
import classes from './Upload.css';
import { Link } from 'react-router-dom';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';

const upload = (props) => {
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
   
    
    return ( 
        isauth? 
        <div style={{  marginTop: '67px'}}>This is route from UploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUpload</div>
    :
    <Pleaselogin/>
    ) 
};

export default upload;