import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from '../../containers/Authentication/Auththentication';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Keywords from '../../containers/Keywords/Keywords';

const Content = (props) => {

    return (
        <div className="content-wrapper">
           <Switch>
                <Route path="/" exact component={Authentication} />  
                <Route path="/dashboard"  component={Dashboard} />
                <Route path="/keywords"  component={Keywords} />    
                <Route path="/projects"  component={Authentication} />
                <Route path="/sharedwithme"  component={Authentication} />    
            </Switch>
        </div>
    )
}

export default Content;