import React, { useState, useEffect } from 'react';
import Errorpage from '../../../../../components/UI/Errorpage/Errorpage';
import classes from './Settingkeyword.css';
import Auxi from '../../../../../hoc/Auxi';
import config from '../../../../../config.json';

import axios from 'axios';


const Setkeyword = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [keywordgroup,setkeywordgroup]=useState([]);
    useEffect(() => {
        const addkeywordgroup = [];
        let source = axios.CancelToken.source();
        let data = {
            params: { "uid": localStorage.getItem("uid"), "access_token": localStorage.getItem("access_token") 
        
            ,"pid": props.pid
        
        }

        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get(config.URL + '/api/keywords/usersgroups', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {

                for (const index in res.data) {
                   console.log(res.data);
                }

                setkeywordgroup(addkeywordgroup);
            })
            .catch((err) => {
                console.log("Show keyword groups Failed");
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])
    return (
        isauth ?
            <Auxi>

                        <div className={["card card-primary", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">Keyword group(s) </h3>
                                <div className="card-tools">
                                   
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }}>
                                    <thead>
                                        <tr>
                                            <th>Keyword group name</th>
                                            <th>Tool</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                               <td>fwef</td></tr>
                                    </tbody>
                                </table>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                        <div className={["card card-info", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">Keyword group(s) in this project
                          
                                 
                                </h3>
                                <div className="card-tools">
                                
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Keyword group name</th>
                                                <th>Tool</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           
                                        <tr>
                                               <td>fwef</td></tr>
                                           
                                           
                                           </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                       
                  
             
            </Auxi>
            :
            <Errorpage></Errorpage>
    )
};

export default Setkeyword;