import React, { Component } from 'react';
import classes from './App.css';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';

class authentication extends Component {
   
 
   
    constructor() {
        super();  
        { sessionStorage.setItem('iSAuth',false)}
        this.state = { isAuthenticated: false, user: null, token: '' };
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
        sessionStorage.clear();
        window.location.reload();
    };

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:4000/api/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({ isAuthenticated: true, user, token });
                    console.log(user);
                    sessionStorage.setItem('iSAuthenticated', true);
                    sessionStorage.setItem('email', user.email);
                    sessionStorage.setItem('uid', user.uid);
                    sessionStorage.setItem('googleid', user.googleId);
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('isAuth',true); 
                    window.location.reload();
                }
            });
        })
    };

    render() {
        let content = !!sessionStorage.getItem('isAuth')  ?
            (
                <div>
                    <div>Your login name</div>
                    <div>
                    {sessionStorage.getItem('email')}
                    {sessionStorage.getItem('uid')}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (  
                <div>
                    <div>Welcome to DocRR Please login</div>
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

