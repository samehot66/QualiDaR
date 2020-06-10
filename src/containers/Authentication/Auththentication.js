import React, { Component } from 'react';
import classes from './Authentication.css';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import Button from '../../components/UI/Button/Button';

class authentication extends Component {

    constructor() {
        super();
        { sessionStorage.setItem('iSAuth', false) }
        this.state = { isAuthenticated: false, user: null, token: '' };
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
        sessionStorage.clear();
        window.location.reload();
    };

    onFailure = (error) => {
        alert("Login Failed");
    };

    googleResponse = (response) => {
     console.log("FRONTEND TOKEN: "+response.accessToken )
      const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        }; 
        //req to express
        fetch(config.URL+'/api/auth/google', options)
        //response from express
        .then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({ isAuthenticated: true, user, token });
                    sessionStorage.setItem('iSAuthenticated', true);
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('uid', user.uid);
                    sessionStorage.setItem('access_token', response.accessToken);
                    sessionStorage.setItem('isAuth', true);
                   window.location.reload();
                }
            });
        })
    };

    render() {
        let content = !!sessionStorage.getItem('isAuth') ?
            (
                <div>
                    <div className={classes.Yourlogin}>Your login name</div>
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
                    <div className={classes.Welcome}>Welcome to DocR&R!</div>
                    <div className={classes.Qbdrrs}>The Qualitative Business Data Retrieval and Repository System</div>
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
}

export default authentication;

