import React, { useState, useEffect } from 'react';
import Errorpage from '../../../components/UI/Errorpage/Errorpage';
import Fileupload from '../../Upload/FileUpload';
import classes from './Oneproject.css';
import { NavLink } from 'react-router-dom';
import Modal from '../../../components/UI/Modal/Modal';
import axios from 'axios';
import config from '../../../config.json';
import Files from './Files/Files';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Addtopic from './Topics/Addtopics';
import Topic from './Topics/Topics';

const oneproject = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [checkaccess,setcheckaccess] =useState(false);
    const [role, setrole] = useState('');
    const [projectdetail, setprojectdetail] = useState([]);
    const [owner,setowner] =useState('');
    const [allpeople, setallpeople] = useState([]);
    const [searchallpeople, setsearchallpeople] = useState('');
    const [allpeoplefilterserch, setallpeoplefiltersearch] = useState([]);

    const [Newtopicemodal, setNewtopicmodal] = useState(false);
    const shownewtopicModal = () => { setNewtopicmodal(true) };
    const closenewtopicModal = () => { setNewtopicmodal(false) };

    const [Uploadmodal, setUploadmodal] = useState(false);
    const showUploadModal = () => { setUploadmodal(true) };
    const closeUploadModal = () => { setUploadmodal(false) };

    const [files,setfiles] = useState([]);
    const [searchfiles, setsearchfiles] = useState('');
    const [filesfilterserch, setfilesfiltersearch] = useState([]);

    const [topic,settopic] = useState([]);
    const [searchtopic, setsearchtopic] = useState('');
    const [topicfiltersearch, settopicfiltersearch] = useState([]);

    useEffect(() => {

        let source = axios.CancelToken.source();
        const people = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid": props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
          axios.get(config.URL + '/api/projects/people', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
        
                for (const index in res.data.users) {
                   
                    if(res.data.users[index].project_roles.role == "owner")
                    {
                        setrole(res.data.users[index].email);
                     setowner(res.data.users[index].email);
                    }

                    if(res.data.users[index].project_roles.role == "guest")
                    {
                        setrole(res.data.users[index].email);
                    }

                    people.push({
                        peopleid: res.data.users[index].uid,
                        email: res.data.users[index].email,
                        role :  res.data.users[index].project_roles.role 
                    });
                   
                }
                setallpeople(people);
            })
            .catch((err) => {
                alert("Show people Failed");
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])

    useEffect(() => {
        setallpeoplefiltersearch(
            allpeople.filter(people => {
                return people.email.toString().toLowerCase().includes(searchallpeople.toLowerCase())
            })
        )
    }, [searchallpeople, allpeople])

    const deletepeopleHandler = async (event) => {
        let data = {
          params: {
            "uid": localStorage.getItem("uid"),
            "access_token": localStorage.getItem("access_token"),
            "pid": props.match.params.id,
            "peopleid": event.target.id
          }
        }
        let axiosConfig = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    
        await axios.delete(config.URL + '/api/projects/people', data, axiosConfig)
          .then((res) => {
            alert("Delete Successful");
          })
          .catch((err) => {
            alert("Delete Failed");
          })
          await handleGetpeople();
      }

      const handleGetpeople = async () => {
        const people = [];
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid": props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.get(config.URL + '/api/projects/people', data, axiosConfig)
            .then((res) => {
                for (const index in res.data.users) {
                    people.push({
                        peopleid: res.data.users[index].uid,
                        email: res.data.users[index].email,
                        role :  res.data.users[index].project_roles.role 
                    });
                  
                }
                setallpeople(people);
            })
            .catch((err) => {
                alert("Show people Failed");
            })
    }

    useEffect(() => {   
     
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid": props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    axios.get(config.URL  + '/api/projects/checkaccess', data, axiosConfig)
            .then((res) => {
                if(res.data.status==true)
                {
                    setcheckaccess(true);
                }
                else  
                {   
                    setcheckaccess(false);
                }
            })
            .catch((err) => {
            })
    }, [])

    useEffect(() => {   
        let projectdetail = [];
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL  + '/api/projects/'+props.match.params.id, data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                projectdetail.push(res.data.pid);
                projectdetail.push(res.data.pname);
                projectdetail.push(res.data.description);    
                setprojectdetail(projectdetail);
            })
            .catch((err) => {
            })
        return ()=>
        {
            source.cancel();
        }
    }, [])

    useEffect(() => {   
        let loadfiles = [];
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid":props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL  + '/api/files', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                for (const index in res.data) {
                    loadfiles.push({
                      pdfid: res.data[index].id,
                      filename: res.data[index].pdffile.pdfname,
                      description: res.data[index].pdffile.description,
                      uploadedby: res.data[index].user.email,
                      role: res.data[index].user.user[0].role,
                      progress: res.data[index].pdffile.done,
                      size: res.data[index].pdffile.size,
                    });
                 
            }
          setfiles(loadfiles);
        })
            .catch((err) => {
                console.log(err)
            })
        return ()=>
        {
            source.cancel();
        }
    }, [])
    const Getfiles=()=>{
        let loadfiles = [];
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid":props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL  + '/api/files', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
         
                for (const index in res.data) {       
                    loadfiles.push({
                      pdfid: res.data[index].id,
                      filename: res.data[index].pdffile.pdfname,
                      description: res.data[index].pdffile.description,
                      uploadedby: res.data[index].user.email,
                      role: res.data[index].user.user[0].role,
                      progress: res.data[index].pdffile.done,
                      size: res.data[index].pdffile.size,
                    });
                  
            }
         setfiles(loadfiles);
        })
            .catch((err) => {
               
            })
     
    }
    useEffect(() => {
        setfilesfiltersearch(
           files.filter(file => {
                return file.filename.toString().toLowerCase().includes(searchfiles.toLowerCase())
            })
        )
    }, [searchfiles, files])

    const handleGetfiles = async (newProjState) => {
        
        let loadfiles = [];
        for (const index in newProjState) {
        loadfiles.push({
              pdfid: newProjState[index].id,
              filename: newProjState[index].pdffile.pdfname,
              description: newProjState[index].pdffile.description,
              uploadedby: newProjState[index].user.email,
              role: newProjState[index].user.user[0].role,
              progress: newProjState[index].pdffile.done,
              size: newProjState[index].pdffile.size,
            });
        }
        setfiles(loadfiles);
    }


    useEffect(() => {   
        let loadtopics = [];
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid":props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL  + '/api/topics', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
               
                for (const index in res.data) {
                    loadtopics.push({
                      tid: res.data[index].tid,
                      tname: res.data[index].tname,
                      createdby: res.data[index].user.email,
                      role: res.data[index].user.projects[0].project_roles.role,
                      status: res.data[index].done
                    })
                    
                 
            }  settopic(loadtopics);})
            .catch((err) => {
            })
        return ()=>
        {
            source.cancel();
        }
    }, [])
    const Gettopic= async ()=>
    {
        let loadtopics = [];
     
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token"),
                "pid":props.match.params.id
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
       axios.get(config.URL  + '/api/topics', data, axiosConfig)
            .then((res) => { 
                for (const index in res.data) {
                    loadtopics.push({
                      tid: res.data[index].tid,
                      tname: res.data[index].tname,
                      createdby: res.data[index].user.email,
                      role: res.data[index].user.projects[0].project_roles.role,
                      status: res.data[index].done
                    })
                  
            }
         settopic(loadtopics);
        })
            .catch((err) => {
            })
      
    }
    useEffect(() => {
        settopicfiltersearch(
          topic.filter(topics => {
                return topics.tname.toString().toLowerCase().includes(searchtopic.toLowerCase())
            })
        )
    }, [searchtopic,topic])


  

    const handlerGettopic = (newState) => {
        let loadtopic = [];
        for (const index in newState) {
            loadtopic.push({
                tid: newState[index].tid,
                tname: newState[index].tname,
                createdby: newState[index].user.email,
                role: newState[index].user.projects[0].project_roles.role,
                status: newState[index].done
            });
        }
        settopic(loadtopic);
    }

  
    return (
        isauth ?
            <div style={{display: checkaccess ? "block":"none"}}>
                <div className="content-header" style={{ padding: "1px .5rem" }}>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">{projectdetail[1]}</h1>
                                <span>Description : {projectdetail[2]=="" ? "-" : projectdetail[2]} </span>
                            </div>


                          <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    
                                         
                                         {owner == localStorage.getItem("email") ?  <li className="breadcrumb-item">
                                         <NavLink to="/projects">Project(s)</NavLink></li> : <li className="breadcrumb-item">
                                         <NavLink to="/sharedwithme">Shared with me project(s)</NavLink></li>}
                                    <li className="breadcrumb-item active">{projectdetail[1]}   </li>
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
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={e => setsearchallpeople(e.target.value)}  />
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Role</th>
                                                <th>Tool</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                   

                                        {allpeoplefilterserch.map(people => (
            
                <tr key={people.peopleid}>
    
                <td style={{color: people.role == "owner" ? "#007bff" : "#66bfed" }}>
                
                <i className="fa fa-fw fa-user"  ></i>   {people.email}
                </td>
                <td style={{color:"#ccc" }}>
                
                {people.role}
              </td>
                <td style={{color: people.role == "owner" ? "#ccc" : "black" }}>
                {
                  owner==localStorage.getItem("email")?
                   people.role == "owner" ? null:
                  
              <i id={people.peopleid} key={people.peopleid} className="fa fa-fw fa-trash" style={{ fontSize: "18px" }}  onClick={(event) => deletepeopleHandler(event)} data-toggle="tooltip" data-placement="top" title={"Delete"}></i>  
    :null
      }
         
         
         </td>
              </tr>

                 
            ))}
                                               
                                     
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
                                <i className="fa fa-fw fa-history" style={{ fontSize: "18px", left:"69px", position:"relative" }} data-toggle="tooltip" data-placement="top" title={"Refresh"} onClick={Getfiles}></i>
                                 <button type="button" className={["btn btn-block btn-success", classes.Uploadmodal].join(" ")} onClick={showUploadModal} style={{ backgroundColor: "#007bff", borderColor: "#52a5ff" }}> + File</button>
                                </h3>
                                <div className="card-tools">
                               
                                   <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={(e)=>setsearchfiles(e.target.value)}/>
                                  </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }} >
                                        <thead>
                                            <tr> 
                                                
                                                <th>File name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Size</th> 
                                                <th>Tool</th>
                                                <th>Uploaded by</th>
                                                <th>Role</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filesfilterserch.map(file => (
                                            <Files  owner={owner} key={file.pdfid} onGetfiles={handleGetfiles} filename={file.filename} webid={props.match.params.id} description={file.description} uploadedby={file.uploadedby} progress={file.progress} size={file.size} pdfid={file.pdfid} role={file.role}/>
                                       
                                        
                                         ))}
                                         </tbody>
                                    </table>
                                </div>
                                {/* /.table-responsive */}
                            </div>
                            {/* /.card-body */}
                        </div>
                         
                        <Modal show={Uploadmodal} modalClosed={closeUploadModal} name="Upload file to project">
                                                    <Fileupload pid={props.match.params.id} role={role} onGetfiles={handleGetfiles} webid={props.match.params.id}/>
                                 </Modal>
                                {/* /.card */}
                            </div>
                            {/* /.col-md-6 */}
                            <div className="col-lg-6">
                            <div className={["card ", classes.Box2].join(' ') }>
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem" , backgroundColor:"#66bfed"}}>
                                <h3 className="card-title" style={{color:"white"}}>Topic(s)
                                <i className="fa fa-fw fa-history" style={{ fontSize: "18px", left:"69px", position:"relative" }} data-toggle="tooltip" data-placement="top" title={"Refresh"} onClick={Gettopic}></i>
                                <button type="button" className={["btn btn-block btn-success", classes.AddTopic].join(" ")} onClick={shownewtopicModal} style={{ backgroundColor: "#52a5ff", borderColor: "#52a5ff" }}> + Topic</button>
                                    <Modal show={Newtopicemodal} modalClosed={closenewtopicModal} name="Add new topic to project">
                                            <Addtopic webid={props.match.params.id} cancel={closenewtopicModal}  onGettopic={handlerGettopic}/>
                                    </Modal>
                                </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={(e)=>setsearchtopic(e.target.value)}/>
                                </div>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div >
                                    <table className="table m-0 text-nowrap" style={{ overflow: "scroll" }}>
                                        <thead>
                                            <tr>
                                                <th>Topic name</th>  
                                                <th>Status</th>
                                                <th>Tools</th>  
                                                <th>Created by</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody> 
                                        {  topicfiltersearch.map(top => (
                                          
  <Topic owner={owner} pname={projectdetail[1]} webid={props.match.params.id} tname={top.tname} email={top.createdby} role={top.role} done={true} tid={top.tid} key={top.tid} onGettopics={handlerGettopic}/>
                                     //  <Topic webid={props.match.params.id} tname={top.tname} email={top.createdby} role={top.role} done={top.status} tid={top.tid} key={top.tid} onGettopics={handlerGettopic}/>
                                        ))}
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
            </div>
            :
            <Errorpage></Errorpage>
    )
};

export default oneproject;