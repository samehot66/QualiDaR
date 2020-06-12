import React, { useState, useEffect, useRef } from 'react';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Auxi from '../../hoc/Auxi';
import Project from './Allprojects/Allprojects';
import { NavLink} from 'react-router-dom';
import Pleaselogin from '../../components/UI/Pleaselogin/Pleaselogin';
import axios from 'axios';
import config from '../../config.json';


const projects = (props) => {
    const [isauth, setisauth] = useState(sessionStorage.getItem('isAuth'));
    const [Newprojmodal, setNewprojmodal] = useState(false);
    const showModal = () => { setNewprojmodal(true) };
    const closeModal = () => { setNewprojmodal(false) };
    const [projects, setprojects] = useState([]);

    const [Addmodal, setAddmodal] = useState(false);
    const showAddModal = () => { setAddmodal(true) };
    const closeAddModal = () => { setAddmodal(false) };

    const [Deletemodal, setDeletemodal] = useState(false);
    const showDeleteModal = () => { setDeletemodal(true) };
    const closeDeleteModal = () => { setDeletemodal(false) };

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
            forceUpdate();
    }, [])
  
        // ...
      //}, 1000);
    return (
        isauth ?
            <Auxi>
                <div className={classes.Yourproj}>Your Project(s)</div>
                <div className={classes.Projects}>

                    <div className={classes.Project} onClick={showModal}>+</div>
                    <Modal show={Newprojmodal} modalClosed={closeModal} name="Create New Project">
                        <Newproj cancel={closeModal} />
                    </Modal>
                    {projects.map(project => (
                        <div key={project.id}>
                            <div className={classes.Menu} >
                                <img onClick={showDeleteModal} className={classes.TrashIcon} src={require('./icon/Trash.png')} alt="Trash" />
                                <Modal show={Deletemodal} modalClosed={closeDeleteModal} name="Delete Project">

                                </Modal>

                                <img onClick={showAddModal} className={classes.AddpeopleIcon} src={require('./icon/Addpeople.png')} alt="Add people" />
                                <Modal show={Addmodal} modalClosed={closeAddModal} name="Add people to Project">

                                </Modal>
                            </div>
                          <NavLink to={'/projects/' + project.id}>
                                <Project pname={project.pname} id={project.id} />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </Auxi>
            :
            <Pleaselogin />
    )
}

export default projects;