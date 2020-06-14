var Client = require('../services/APIservice')

module.exports = {
   clientApiKeyValidation: async (req, res, next) => {

      if ((req.body.uid && req.body.access_token) || (req.query.uid && req.query.access_token)) {
         try {
            let clientDetails = null;
            if (req.body.access_token) {
               clientDetails = await Client.getUserDetails(req.body.uid, req.body.access_token);
            }
            if (req.query.access_token) {
               clientDetails = await Client.getUserDetails(req.query.uid, req.query.access_token);
            }
            if (clientDetails) {
               next();
            }
         } catch (e) {
            console.log('%%%%%%%% error :', e);
            return res.status(401).send({
               status: false,
               response: "Unauthorized user!"
            });
         }
      } else {
         return res.status(400).send({
            status: false,
            response: "Missing token!"
         });
      }
   }
};