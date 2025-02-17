import React, { Component } from "react";
import classes from "./Authentication.css";
import { GoogleLogin } from "react-google-login";
//import config from "../../config.json";
import Button from "../../components/UI/Button/Button";

class authentication extends Component {
  constructor() {
    super();
    {
      localStorage.setItem("iSAuth", false);
    }
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.clear();
    window.location.reload();
  };

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
    fetch(process.env.REACT_APP_URL + "/api/auth/google", options)
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
        {/* <div className={classes.Btn}>
          <button
            type="button"
            className="btn btn-block btn-danger"
            onClick={this.logout}
          >
            Log out
          </button>
        </div> */}
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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
}

export default authentication;
