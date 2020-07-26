import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from '../../containers/Authentication/Auththentication';

const Content = (props) => {

    return (
        <div className="content-wrapper">
           <Switch>
                <Route path="/" exact component={Authentication} />  
            </Switch>
        </div>
    )
}

export default Content;