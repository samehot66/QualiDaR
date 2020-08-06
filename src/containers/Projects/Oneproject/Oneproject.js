import React, { useState, useEffect } from 'react';
import Auxi from '../../../hoc/Auxi';
import Errorpage from '../../../components/UI/Errorpage/Errorpage';
import Fileupload from '../../Upload/FileUpload';
import classes from './Oneproject.css';
import { NavLink } from 'react-router-dom';
import Modal from '../../../components/UI/Modal/Modal';
import Addpeople from '../Addpeople/Addpeople';

const oneproject = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [checkaccess, setcheckaccess] = useState(false);

    const [Newpeoplemodal, setNewpeoplemodal] = useState(false);
    const shownewpeopleModal = () => { setNewpeoplemodal(true) };
    const closenewpeopleModal = () => { setNewpeoplemodal(false) };

    
    const [Newtopicemodal, setNewtopicmodal] = useState(false);
    const shownewtopicModal = () => { setNewtopicmodal(true) };
    const closenewtopicModal = () => { setNewtopicmodal(false) };
    // useEffect(() => {
    //     const checkaccess = [];        
    //     let source = axios.CancelToken.source();
    //     let data = {
    //         params: {
    //             "uid": localStorage.getItem("uid"),
    //             "access_token": localStorage.getItem("access_token"),
    //             "pid": props.match.params.id
    //         }
    //     }
    //     let axiosConfig = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     axios.get(config.URL  + '/api/projects', data, axiosConfig,{ cancelToken: source.token})
    //         .then((res) => {
    //             for (const index in res.data) {
    //                 checkaccess.push({
    //                     status: res.data[index].status,
    //                 });
    //             }
    //             setprojects(loadprojects);
    //         })
    //         .catch((err) => {
    //             alert("Show all projects Failed");
    //         })
    //     return ()=>
    //     {
    //         source.cancel();
    //     }
    // }, [])

    const check = async (uid) => {
        if (uid == 1) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        isauth && check(localStorage.getItem("uid")) ?
            <Auxi>
                <div className="content-header" style={{ padding: "1px .5rem" }}>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">{props.match.params.id}    <i className="fa fa-fw fa-edit" style={{ fontSize: "18px" }} ></i></h1>
                            </div>
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><NavLink to="/projects">Projects</NavLink></li>
                                <li class="breadcrumb-item active">{props.match.params.id} </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6">
                           
                               
                                    <div className={["card card-info", classes.Box].join(' ')}>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" }}>
                                <h3 className="card-title">People in this project
                                <button type="button" className={["btn btn-block btn-success", classes.AddPeople].join(" ")} onClick={shownewpeopleModal} > + People</button>
                                    <Modal show={Newpeoplemodal} modalClosed={closenewpeopleModal} name="Add new people to project">
                                        <Addpeople pid={props.match.params.id} cancel={closenewpeopleModal} comefrom={"Oneproject"} />
                                    </Modal>
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 " style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Tools</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                                <td>kanokpol.thongsem@gmail.com</td>
                                                <td>Owner</td>
                                                <td>
                                            
                                                    <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} ></i>
                                                 </td>
                                        </tr>
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                   
                             
                                <div className="card" style={{ height: "300px" }}>
                                    <div className="card-header border-0" style={{ backgroundColor: "#007bff" , padding:".15rem 1.25rem"}}>
                                        <div className="d-flex justify-content-between">
                                            <h3 className="card-title " style={{ color: "white" }}>Upload</h3>
                                        </div>
                                    </div>
                                    <div className="card-body" >
                                        <div className="d-flex">
                                            <p className="d-flex flex-column" style={{ width: "700px", position: "relative", top: "3px"}}>
                                                <span>
                                                    <Fileupload pid={props.match.params.id} />
                                                </span>
                                            </p>

                                        </div>
                                        {/* /.d-flex */}


                                    </div>
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col-md-6 */}
                            <div className="col-lg-6">
                            <div className={["card ", classes.Box].join(' ') }>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" , backgroundColor:"#66bfed"}}>
                                <h3 className="card-title" style={{color:"white"}}>Topic(s)
                                <button type="button" className={["btn btn-block btn-success", classes.AddTopic].join(" ")} onClick={shownewtopicModal} style={{ backgroundColor: "#52a5ff", borderColor: "#52a5ff" }}> + Topic</button>
                                    <Modal show={Newtopicemodal} modalClosed={closenewtopicModal} name="Add new topic to project">
                                
                        
                                    </Modal>
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 " style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Topic name</th>
                                                <th>Created by</th>
                                                <th>Role</th>
                                                <th>Tools</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                                <td>Environment</td>
                                                <td>kanokpol.thongsem@cmu.ac.th</td>
                                                <td>Owner</td>
                                                <td>
                                                    <i className="fa fa-fw fa-edit" style={{ fontSize: "18px" }} ></i>
                                                    <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} ></i>
                                                 </td>
                                        </tr>
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>

                      
                        <div className={["card ", classes.Box].join(' ') }>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" , backgroundColor:"#52a5ff"}}>
                                <h3 className="card-title" style={{color:"white"}}>File(s) in this project
                     
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 " style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>File name</th>
                                                <th>Uploaded by</th>
                                                <th>Role</th>
                                                <th>Tools</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                                <td>Environment</td>
                                                <td>kanokpol.thongsem@cmu.ac.th</td>
                                                <td>Owner</td>
                                                <td>
                                                   
                                                    <i className="fa fa-fw fa-trash" style={{ fontSize: "18px" }} ></i>
                                                 </td>
                                        </tr>
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                            </div>
                            {/* /.col-md-6 */}
                        </div>
                        {/* /.row */}
                    </div>







                </div>
            </Auxi>
            :
            <Errorpage></Errorpage>
    )
};

export default oneproject;