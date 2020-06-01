import React, { useState } from 'react';
import classes from './Content.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Upload from '../../containers/Upload/Upload';
import Projects from '../../containers/Projects/Projects';
import Sharedwithme from '../../containers/Sharedwithme/Sharedwithme';

const content = () => {  
    
    const [Sidebar, setSidebar] = useState(true);
    const showSidebar = () => { setSidebar(false) };
    const closeSidebar = () => { setSidebar(true) };
    
    return (
    <div className={classes.Content} style={{ left: Sidebar ? '306px' : '0px' }}>
        <div onClick={showSidebar} style={{ display: Sidebar ? 'block' : 'none'}}>
            <img className={classes.MenuIcon} src={require('./icon/Menu.png')} alt="Menu" />
        </div>
        <div onClick={closeSidebar} style={{ display: Sidebar ? 'none' : 'block'}} > 
            <img className={classes.MenuIcon}  src={require('./icon/Close.png')} alt="Menu" /> 
        </div>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/upload" component={Upload} />
            <Route path="/projects" component={Projects} />
            <Route path="/sharedwithme" component={Sharedwithme} />
            <Route render={() => <p>Error: Not found!</p>} />
        </Switch>
    </div>
    )
}

export default content;