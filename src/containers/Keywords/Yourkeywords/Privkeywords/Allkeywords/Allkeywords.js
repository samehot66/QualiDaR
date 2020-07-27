import React from 'react';
import classes from './Allkeywords.css';
import Auxi from '../../../../../hoc/Auxi';
import axios from 'axios';
import config from '../../../../../config.json';

const allpeople = (props) => {

  const deleteHandler = () => {

    let data = {
      params: {
        "uid": sessionStorage.getItem("uid"),
        "access_token": sessionStorage.getItem("access_token"),
        "kid": props.kid
      }
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.delete(config.URL + '/api/keywords', data, axiosConfig)
      .then((res) => {
      onGetKeywords();
      })
      .catch((err) => {
        alert("Delete Failed");
        onGetKeywords();
      })
  }

  const onGetKeywords = async () => {
    let data = {
        params: {
            "uid": sessionStorage.getItem("uid"),
            "access_token": sessionStorage.getItem("access_token"),
            "keywordgroupsid": props.groupid
        }
    }
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios.get(config.URL + '/api/keywords/private', data, axiosConfig)
        .then((res) => {
          props.onGetKeywords(res.data);
        })
        .catch((err) => {
            alert("Show keywords Failed");
        })
}

  return (
     <Auxi>
     <div className={classes.Allkeywords}>
       <div >{props.keywordtext}</div>
       <span id={props.kid} className={classes.Delete} onClick={deleteHandler}>X</span>
     </div>
   </Auxi>
  )
};

export default allpeople;