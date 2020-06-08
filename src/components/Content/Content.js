import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Upload from '../../containers/Upload/Upload';
import Projects from '../../containers/Projects/Projects';
import Sharedwithme from '../../containers/Sharedwithme/Sharedwithme';
import Oneproject from '../../containers/Projects/Oneproject/Oneproject';

const content = () => {  
    
    return (
    <div>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/upload" component={Upload} /> 
            <Route path="/projects/:id" component={Oneproject} />
            <Route path="/projects/" component={Projects} />
            <Route path="/sharedwithme" component={Sharedwithme} />
            <Route render={() => <p>Error: Not found!</p>} />
        </Switch>
    </div>
    )
}

export default content;