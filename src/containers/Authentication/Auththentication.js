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
    }

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

    googleResponse = (response) => {

        const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        //req to express
        fetch(config.URL + '/api/auth/google', options)
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
}

export default authentication;

