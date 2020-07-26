var db = require('../config/db.config')

module.exports = {getUserDetails: (userId, token) => {
    return new Promise((resolve, reject) => {
       console.log(userId+' '+token)
       db.user
         .findOne( {where: { 'uid': userId, 'access_token': token}})
         .then((data) => {
            console.log(data)
            if(data){
               resolve(data);
            }else{
               reject(false);
            }
         });
    });
 }
};