import React, { useState, useEffect } from 'react';
import classes from './Sharedwithme.css';
import Auxi from '../../hoc/Auxi';
import Project from '../Projects/Allprojects/Allprojects';
import { NavLink, Link } from 'react-router-dom';

const projects = (props) => {

    const [projects, setprojects] = useState([]);
    const [isauth,setisauth] =  useState(sessionStorage.getItem('isAuth')); 
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
       <Link to="/" ><div className={classes.Pleaselogin}>Please login</div></Link>
    )
}

export default projects;