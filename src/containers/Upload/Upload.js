import React,{useState} from 'react';
import classes from './Upload.css';
import { Link } from 'react-router-dom';

const upload = (props) => {
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
   
    
    return ( 
        isauth? 
        <div style={{  marginTop: '67px'}}>This is route from UploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUploadUpload</div>
    :
    <Link to="/" ><div className={classes.Pleaselogin}>Please login</div></Link>
    ) 
};

export default upload;