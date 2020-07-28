import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from '../../containers/Authentication/Auththentication';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Keywords from '../../containers/Keywords/Keywords';
import Errorpage from '../UI/Errorpage/Errorpage';

const Content = (props) => {

    return (
        <div className="content-wrapper" style={{minHeight: "700px", height:"700px"}}>
           <Switch>
                <Route path="/" exact component={Authentication} />  
                <Route path="/dashboard"  component={Dashboard} />
                <Route path="/keywords"  component={Keywords} />    
                <Route path="/projects"  component={Authentication} />
                <Route path="/sharedwithme"  component={Authentication} />    
                <Route render={() => <Errorpage></Errorpage>} />




            </Switch>
        </div>
    )
}

export default Content;