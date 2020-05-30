import React from 'react';
import classes from './Content.css';
import { Route } from 'react-router-dom';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Upload from '../../containers/Upload/Upload';
import Projects from '../../containers/Projects/Projects';
import Sharedwithme from '../../containers/Sharedwithme/Sharedwithme';

const content = (props) => (
    <div className={classes.Content}>
        <Route path="/" exact component={Dashboard} />
        <Route path="/upload" component={Upload} />
        <Route path="/projects" component={Projects} />
        <Route path="/sharedwithme" component={Sharedwithme} />
    </div>
);

export default content;