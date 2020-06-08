import React, { useState, useEffect } from 'react';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Auxi from '../../hoc/Auxi';
import Project from './Allprojects/Allprojects';
import { NavLink } from 'react-router-dom';

const projects = (props) => {

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

    /* useEffect(() =>{
        #1 fetch data from database
        #2 assign data to array loadprojects
        #3 setstate hooks
 
         const loadprojects =[];
         for(const key in x)
         {
             loadprojects.push({
                 id:KeyboardEvent,
                 pname: x[key].pname
             });
         }
         setprojects(loadprojects);
     },[])*/

    //####Use in return() for show each Project element
    //{projects.map(project => (<Project  />))}

    useEffect(() => {
        const loadprojects = [];
        loadprojects.push({
            id: 1,
            pname: "y03fR3Lbs0PTIQE4kfAPnFFoKJ5tHjyry1JR93N4zrtJ0UwMBq"
        });
        loadprojects.push({
            id: 2,
            pname: "hello2"
        });
        setprojects(loadprojects);

    }, [])

    return (
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
    )
}

export default projects;