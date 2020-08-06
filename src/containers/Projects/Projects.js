import React, { useState, useEffect } from 'react';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import Auxi from '../../hoc/Auxi';
import config from '../../config.json';
import axios from 'axios';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Project from './Allprojects/Allprojects';
import { NavLink } from 'react-router-dom';

const Projects = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
    const [Newprojmodal, setNewprojmodal] = useState(false);
    const showModal = () => { setNewprojmodal(true) };
    const closeModal = () => { setNewprojmodal(false) };
    const [projects, setprojects] = useState([]);
    const [search, setsearch] = useState('');
    const [projectsfiltersearch, setprojectsfiltersearch] = useState([]);

    useEffect(() => {
        const loadprojects = [];        
        let source = axios.CancelToken.source();
        let data = {
            params: {
                "uid": localStorage.getItem("uid"),
                "access_token": localStorage.getItem("access_token")
            }
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get(config.URL  + '/api/projects', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                for (const index in res.data) {
                    loadprojects.push({
                        id: res.data[index].pid,
                        pname: res.data[index].pname
                    });
                }
                setprojects(loadprojects);
            })
            .catch((err) => {
                alert("Show all projects Failed");
            })
        return ()=>
        {
            source.cancel();
        }
    }, [])

    const handleGetprojects = async (newProjState) => {
        let loadprojects = [];
        for (const index in newProjState) {
            loadprojects.push({
                id: newProjState[index].pid,
                pname: newProjState[index].pname
            });
        }
        await setprojects(loadprojects);
    }

    useEffect(() => {
        setprojectsfiltersearch(
            projects.filter(project => {
                return project.pname.toString().toLowerCase().includes(search.toLowerCase())
            })
        )
       
    }, [search, projects])
      
    return (
        isauth ?
            <Auxi>
                <div className="content-header" style={{ padding: "1px .5rem" }}>
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Project(s)</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><NavLink to="/dashboard">Home</NavLink></li>
                                <li className="breadcrumb-item active">Project(s)</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">

                        <div className={["card", classes.Box].join(' ')} >
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem", backgroundColor: "#66bfed" }}>
                                <h3 className="card-title" style={{ color: "white" }}>All your project(s) </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={e => setsearch(e.target.value)} />
                                </div>
                            </div>
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div className={classes.NewProjects}>
                                    <div className={classes.NewProject} onClick={showModal}>+</div>
                                    <Modal show={Newprojmodal} modalClosed={closeModal} name="Create new project">
                                        <Newproj cancel={closeModal} onGetprojects={handleGetprojects} />
                                    </Modal>
                                    {projectsfiltersearch.map(project => (
                                        <div key={project.id} >
                                            <Project pname={project.pname} pid={project.id} onGetprojects={handleGetprojects} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Auxi>
            :
            <Errorpage></Errorpage>
    )
};

export default Projects;