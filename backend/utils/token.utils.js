var jwt = require('jsonwebtoken');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      req.token = createToken(req.auth);
      console.log('5454544')
      return next();
  },
  sendToken: function(req, res) {
      res.setHeader('x-auth-token', req.token);
      console.log(req.token)
      res.end();
      return res.status(200).send(JSON.stringify(req.user));
  }
};