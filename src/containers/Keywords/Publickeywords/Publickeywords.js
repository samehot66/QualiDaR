import React, { useState } from 'react';

import Auxi from '../../../hoc/Auxi';

import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';
import config from '../../../config.json';

const Publickeywords = (props) => {

    const subscribeHandler = async () => {
        let data = {
            "uid": localStorage.getItem("uid"),
            "access_token": localStorage.getItem("access_token"),
            "keywordgroupsid": props.groupid
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post(config.URL + '/api/keywords/groups', data, axiosConfig)
            .then((res) => {
                onGetpubgroups();

            })
            .catch((err) => {
                onGetpubgroups();
            })
    }

    const onGetpubgroups = async () => {
        const pubkeywords = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "shared": true
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.get(config.URL + '/api/keywords', data, axiosConfig)
            .then((res) => {
                props.onGetpubgroups(res.data);
            })
            .catch((err) => {
                alert("Show public keyword groups Failed");
            })
        }

        const removeHandler = () => {
            let data = {
                params: {
                    "uid": localStorage.getItem("uid"),
                    "access_token": localStorage.getItem("access_token"),
                    "keywordgroupsid": props.groupid
                }
            }
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            axios.delete(config.URL + '/api/keywords/groups', data, axiosConfig)
                .then((res) => {
                    onGetsubgroups();
                })
                .catch((err) => {
            
                    onGetsubgroups();
                })
        } 
        const onGetsubgroups = async () => {
            const subscribekeywords = [];
            let data = {
                params: { "uid":localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") }
            }
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
           await axios.get(config.URL + '/api/keywords/groups', data, axiosConfig)
                .then((res) => {
                    props.onGetsubgroups(res.data);
                    
                })
                .catch((err) => {
                    alert("Show subscribe keyword groups Failed");
                })
            }
    return (
        <Auxi>
            <tr>
                <td style={{ color: "#007bff" }}>
                    <i class="fa fa-fw fa-folder"></i>
                    {props.gname}

                </td>
                <td style={{ color: "#ccc" }}>
                    {props.owner}
                </td>
                <td>
                    { props.type === "member" ? 
                          <i class="fa fa-fw fa-minus-square" style={{ color: "#dc3545", fontSize: "20px" }} onClick={removeHandler}></i>
                        :
                      <i class="fa fa-fw fa-plus-square" style={{ color: "#28a745", fontSize: "20px" }} onClick={subscribeHandler}></i>
                    }
                </td>
            </tr>
        </Auxi>
    )
};

export default Publickeywords;