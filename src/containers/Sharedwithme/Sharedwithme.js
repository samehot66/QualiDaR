import React, { useState, useEffect } from 'react';
import Errorpage from '../../components/UI/Errorpage/Errorpage';
import Auxi from '../../hoc/Auxi';
import config from '../../config.json';
import axios from 'axios';
import classes from './Sharedwithme.css';
import Sharedwithmeproject from '../Projects/Allprojects/Allsharedwithme/Allsharedwithme';
import { NavLink } from 'react-router-dom';

const Sharedwithme = (props) => {

    const [isauth, setisauth] = useState(localStorage.getItem('isAuth'));
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

        axios.get(config.URL + '/api/projects/shared', data, axiosConfig,{ cancelToken: source.token})
            .then((res) => {
                for (const index in res.data.projects) {
                    loadprojects.push({
                        id: res.data.projects[index].pid,
                        pname: res.data.projects[index].pname
                    });
                }
                setprojects(loadprojects);
            })
            .catch((err) => {
                alert("Show all shared projects Failed");
            })
            return ()=>
            {
                source.cancel();
            }
    }, [])

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
                                <h1 className="m-0 text-dark">Shared with me project(s)</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><NavLink to="/dashboard">Home</NavLink></li>
                                <li className="breadcrumb-item active">Shared with me project(s)</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">

                        <div className={["card", classes.Box].join(' ')} >
                            <div className="card-header border-transparent " style={{ padding: "0.2rem 1rem", backgroundColor: "#2981e9" }}>
                                <h3 className="card-title" style={{ color: "white" }}>All your project(s) </h3>
                                <div className="card-tools">
                                    <input type="text" className="form-control" style={{ height: "1.25rem" }} placeholder="Search..." onChange={e => setsearch(e.target.value)} />
                                </div>
                            </div>
                            <div className="card-body p-0 " style={{ overflow: "auto" }}>
                                <div className={classes.Projects}>
                                    {projectsfiltersearch.map(project => (
                                        <div key={project.id} >
                                            <Sharedwithmeproject pname={project.pname} pid={project.id} />
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

export default Sharedwithme;