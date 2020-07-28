import React from 'react';
import classes from './Allsharedwithme.css';
import Auxi from '../../../../hoc/Auxi';
import { NavLink } from 'react-router-dom';

const allprojects = (props) => {

  return (
    <Auxi>
      <NavLink to={'/projects/' + props.pid}>
        <div id={props.pid} className={classes.Projects} >
          {props.pname}
        </div>
      </NavLink>
    </Auxi>
  )
};

export default allprojects;