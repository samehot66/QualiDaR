<<<<<<< HEAD
import React, { Component } from 'react';
import classes from './Authentication.css';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';

class authentication extends Component {

    constructor() {
        super();
        { sessionStorage.setItem('iSAuth', false) }
        this.state = { isAuthenticated: false, user: null, token: '', data: null };
=======
import React, { Component } from "react";
import classes from "./Authentication.css";
import { GoogleLogin } from "react-google-login";
import config from "../../config.json";
import Button from "../../components/UI/Button/Button";

class authentication extends Component {
  constructor() {
    super();
    {
      localStorage.setItem("iSAuth", false);
>>>>>>> origin/master
    }
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

<<<<<<< HEAD
     /*componentDidMount(){
        const response =  axios.get('http://localhost:4000/api/phrases/test?access_token=ya29.a0AfH6SMCsws9ZjauSRrvY0l7g-yNIYRVS33E5IJBIolFDSVkKCgWbvaUG4UjYzLLgcOZVmWQw9g_uHYMsnb9QCjZVNv_JYRaV7PR-oR0BCjtD11MT-gMp8BnU2ekWfsLlaXr-k70eQ7lv247gITbKD86N06cNW43K4RFF9g&uid=1')
        .then(response.data)
        this.setState({data:data})
        console.log('first ',this.state.data)
    }*/

    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
        sessionStorage.clear();
        window.location.reload();
    };

    onFailure = (error) => {
        alert("Login Failed");
    };
=======
  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.clear();
    window.location.reload();
  };
>>>>>>> origin/master

  onFailure = (error) => {
    alert("Login Failed");
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };
    fetch(config.URL + "/api/auth/google", options)
      .then((r) => {
        const token = r.headers.get("x-auth-token");
        r.json().then((user) => {
          if (token) {
            this.setState({ isAuthenticated: true, user, token });
            localStorage.setItem("iSAuthenticated", true);
            localStorage.setItem("email", user.email);
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("access_token", response.accessToken);
            localStorage.setItem("isAuth", true);
            window.location.reload();
          }
        });
      });
  };

<<<<<<< HEAD
    render() {
        //const listItems = this.state.data.map((item) =>{item.map((num)=><li>{num.text}</li>)});
        let content = !!sessionStorage.getItem('isAuth') ?
            (
                <div>
                    <div className={classes.Yourlogin}>You are currently logging name as</div>
                    <div className={classes.Name}> {sessionStorage.getItem('email')} </div>
                    <div>
                        <Button clicked={this.logout} btnType="Logout">
                            Log out
                        </Button>
                    </div>
                </div>
            ) :
            (
                <div>
                    
                    <div className={classes.Welcome}>Welcome to QualiDaR!</div>
                    <div className={classes.Qbdrrs}>The Qualitative Business Data Repository System</div>
                    <div className={classes.Lets}>Let's start your analysis...</div>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        scope="profile email"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );

        return (
            <div className={classes.App}>
                {content}
            </div>
        );
    }
=======
  render() {
    let content = !!localStorage.getItem("iSAuthenticated") ? (
      <div style={{ top: "-23px", position: "relative" }}>
        <img
          src={require("./img/icon.png")}
          style={{ width: "150px" }}
          alt="QualiDaR"
        />
        <div className={classes.Yourlogin}>
          You are currently logging name as
        </div>
        <div className={classes.Name}> {localStorage.getItem("email")} </div>
        <div className={classes.Btn}>
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={this.logout}
          >
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div style={{ top: "-23px", position: "relative" }}>
        <img
          src={require("./img/icon.png")}
          style={{ width: "150px" }}
          alt="QualiDaR"
        />
        <div className={classes.Welcome}>Welcome to QualiDaR!</div>
        <div className={classes.Qbdrrs}>
          The Qualitative Business Data Repository System
        </div>
        <div className={classes.Lets}>Let's start your analysis...</div>
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          scope="profile email"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
          cookiePolicy={"single_host_origin"}
          prompt="select_account"
        />
      </div>
    );
    return <div className={classes.App}>{content}</div>;
  }
>>>>>>> origin/master
}

export default authentication;
