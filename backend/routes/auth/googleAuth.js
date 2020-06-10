var express = require('express');
var router = express.Router();
//var { generateToken, sendToken } = require('../../utils/token.utils');
var passport = require('passport');
var config = require('../../config/config');
var request = require('request');
var jwt = require('jsonwebtoken');
require('../../passport')();

router.post('', (req, res, next) => {passport.authenticate('google-token', {session: false}, (err, user, info) => {
        console.log(user)
        if (user != null) {
            console.log(user.dataValues)
            var token = jwt.sign({
                id: user.dataValues.googleId
            }, 'my-secret',
            {
                expiresIn: 60 * 120
            });
            res.setHeader('x-auth-token', token);
            console.log(token)
           // res.end();
            return res.status(200).send(JSON.stringify(user.dataValues));
        } else {
            console.log('null')
            return res.send(401, 'User Not Authenticated');
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