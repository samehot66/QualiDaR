var Client = require('../services/APIservice')

module.exports = {clientApiKeyValidation: async (req,res,next) => {
    if(!req.body.accessToken){
        return res.status(400).send({
           status:false,
           response:"Missing token!"
        });
     }
try {
      let clientDetails = await Client.getUserDetails(req.body.uid, req.body.accessToken);
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
}
};