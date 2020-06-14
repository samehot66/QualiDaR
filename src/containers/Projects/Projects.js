import React, { useState, useEffect, useRef } from 'react';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Auxi from '../../hoc/Auxi';
import Project from './Allprojects/Allprojects';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';
import axios from 'axios';
import config from '../../config.json';

const projects = (props) => {

    const [isauth, setisauth] = useState(sessionStorage.getItem('isAuth'));
    const [Newprojmodal, setNewprojmodal] = useState(false);
    const showModal = () => { setNewprojmodal(true) };
    const closeModal = () => { setNewprojmodal(false) };
    const [projects, setprojects] = useState([]);

    // function useInterval(callback, delay) {
    //     const savedCallback = useRef();

    //     // remember latest callback
    //     useEffect(() => {
    //       savedCallback.current = callback;
    //     }, [callback]);

    //     // setup the interval
    //     useEffect(() => {
    //       function tick() {
    //         savedCallback.current();
    //       }

    //       if (delay !== null) {
    //         let id = setInterval(tick, delay);
    //         return () => clearInterval(id);
    //       }
    //     }, [delay]);
    //   }

    //useInterval(() => {

    useEffect(() => {
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
                for (const index in res.data) {
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
    //}, 1000);

    return (
        isauth ?
            <Auxi>
                <div className={classes.Yourproj}>Your Project(s)</div>
                <div className={classes.NewProjects}>
                    <div className={classes.NewProject} onClick={showModal}>+</div>

                    <Modal show={Newprojmodal} modalClosed={closeModal} name="Create New Project">
                        <Newproj cancel={closeModal} />
                    </Modal>

                    {projects.map(project => (
                        <div key={project.id} >
                            <Project pname={project.pname} pid={project.id} />
                        </div>
                    ))}
                </div>
            </Auxi>
            :
            <Pleaselogin />
    )
}

export default projects;