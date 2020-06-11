var express = require('express');
var router = express.Router();
//var { generateToken, sendToken } = require('../../utils/token.utils');
var passport = require('passport');
var db = require('../../config/db.config');
var request = require('request');
var jwt = require('jsonwebtoken');
require('../../passport')();

router.post('', (req, res, next) => {passport.authenticate('google-token', {session: false}, (err, user, info) => {
        console.log("asdasd", user)
        console.log('err', err)
        console.log('info', info)
        if (user) {
            console.log(user)
            var token = jwt.sign({
                id: user.googleId
            }, 'my-secret',
            {
                expiresIn: 60 * 120
            });
            res.setHeader('x-auth-token', token);
            console.log(token)
            //res.end();
            return res.status(200).send(JSON.stringify(user));
        } else {
            console.log('null')
            return res.status(401).send({message: 'User Not Authenticated'});
        }
        //console.log(JSON.stringify(req))
        /*if (req == null) {
            console.log('jjjjj')
            return res.send(401, 'User Not Authenticated');
        }
        req = {
            id: req.uid
        };
        console.log('err')
        next();*/
    }) (req, res, next)}/*, generateToken, sendToken*/) ;

module.exports = router;