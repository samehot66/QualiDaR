'use strict';

var db = require('./config/db.config');
var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('./config/config');
var User = db.user;
const Op = db.Sequelize.Op

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret
    },
    function (accessToken, refreshToken, profile, done) {
        console.log('profile: ' + JSON.stringify(profile))
        User.findOne({
            where: {
                'googleId': profile.id
            }
        }).then((user) => {
            //no user found then create new
            //console.log(user)
            if(user == null) {
                try{
                    console.log('1111')
                    return User.create({
                        googleId: profile.id ,
                        email: profile.emails[0].value,
                        access_token: accessToken
                    })
                }catch(err){
                    console.log(err)
                    return done(null, user)
                }              
            }else{
                User.update(
                    {access_token: accessToken},
                    {where: {'email':profile.emails[0].value}
                    }
                  )

               
                
                User.findOne({
                    where: {
                        'email':profile.emails[0].value
                    }
                }).then((data) => {
                    console.log(JSON.stringify(data))
                    return done(null, data)
                })
            }
        })
    }));
};