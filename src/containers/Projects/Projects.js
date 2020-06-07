import React, { useState, useEffect } from 'react';
import classes from './Projects.css';
import Modal from '../../components/UI/Modal/Modal';
import Newproj from './Newproject/Newproject';
import Auxi from '../../hoc/Auxi';
import Project from './Allprojects/Allprojects';

const projects = (props) => {

    const [Newprojmodal, setNewprojmodal] = useState(false);
    const showModal= () => { setNewprojmodal(true) };
    const closeModal= () => { setNewprojmodal(false) };
    const [projects, setprojects] = useState([]);
    
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
  
    useEffect(() =>{
        const loadprojects =[];
        loadprojects.push({
           id:1,
            pname:"y03fR3Lbs0PTIQE4kfAPnFFoKJ5tHjyry1JR93N4zrtJ0UwMBq"
        });
        loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         }); loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });loadprojects.push({
            id:2,
             pname:"hello2"
         });
        setprojects(loadprojects);

    },[])


    return (
        <Auxi>
            <div className={classes.Yourproj}>Your Project(s)</div>
            <div className={classes.Projects}>    
        
                <div className={classes.Project} onClick={showModal}>+</div>
                    <Modal show={Newprojmodal} modalClosed={closeModal} name="Create New Project">
                        <Newproj cancel={closeModal}/>
                    </Modal>
                    {projects.map(project => (<Project pname={project.pname} id={project.id}/>))}
            </div> 
        </Auxi>
    )
}

export default projects;