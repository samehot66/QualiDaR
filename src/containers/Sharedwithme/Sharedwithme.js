import React, { useState, useEffect } from 'react';
import classes from './Sharedwithme.css';
import Auxi from '../../hoc/Auxi';
import Project from '../Projects/Allprojects/Allprojects';
import { NavLink } from 'react-router-dom';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';
import axios from 'axios';
import config from '../../config.json';

const projects = (props) => {

    const [projects, setprojects] = useState([]);
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
    
    useEffect(() =>{
        const loadprojects = [];

        let data = {
            params: {
                "uid": sessionStorage.getItem("uid"),
                "access_token": sessionStorage.getItem("access_token")
            }
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get(config.URL + '/api/projects', data, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res); 
                for(const index in res.data)
                {
                    loadprojects.push({
                        id: res.data[index].pid,
                        pname: res.data[index].pname
                    });
                }
                setprojects(loadprojects);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }, [])

    return (
        isauth ?
        <Auxi>
            <div className={classes.Sharedwithme}>Shared with me</div>
            <div className={classes.Projects}>
                {projects.map(project => (
                    <div key={project.id}>
                        <NavLink to={'/projects/' + project.id}>
                            <Project pname={project.pname} id={project.id} />
                        </NavLink>
                    </div>
                ))}
            </div>
        </Auxi>
       : 
       <Pleaselogin/>
    )
}

export default projects;