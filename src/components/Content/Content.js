import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Authentication from "../../containers/Authentication/Auththentication";
import Dashboard from "../../containers/Dashboard/Dashboard";
import Keywords from "../../containers/Keywords/Keywords";
import Errorpage from "../UI/Errorpage/Errorpage";
import Projects from "../../containers/Projects/Projects";
import Oneproject from "../../containers/Projects/Oneproject/Oneproject";
import Sharedwithme from "../../containers/Sharedwithme/Sharedwithme";
import Topics from "../../containers/Topics/Topics";
import Excel from "../../containers/Excel/Excel";

const Content = (props) => {
  return (
    <div
      className="content-wrapper"
      style={{ minHeight: "700px", height: "700px" }}
    >
      <Switch>
       {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/keywords" component={Keywords} />
        <Route path="/projects/:pname/:id/:tname/:tid" component={Topics} />
        <Route path="/projects/:pname/:id/excel" component={Excel} />
        <Route path="/projects/:pname/:id" component={Oneproject} />
        <Route path="/projects" component={Projects} />
        <Route path="/sharedwithme" component={Sharedwithme} />       
         <Route path="/" exact component={Authentication} />
        <Route render={() => <Errorpage></Errorpage>} />
      </Switch>
    </div>
  );
};

export default Content;
