var db = require('../config/db.config')

module.exports = {getUserDetails: (userId, token) => {
    return new Promise((resolve, reject) => {
       db.user
         .findOne( {where: { 'uid': userId, 'access_token':  token}})
         .then((data) => {
            if(data){
               resolve(data);
            }else{
               reject(false);
            }
         });
    });
 }
};