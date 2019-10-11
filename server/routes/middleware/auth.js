const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');

/*

  TODO: Fill in the token validation middleware below

  - https://expressjs.com/ko/guide/using-middleware.html
  - JWT (jsonwebtoken): https://github.com/auth0/node-jsonwebtoken
  - use sign, verify methods in the jsonwebtoken module

*/
function verifyToken(req, res, next) {
  try {
    const decoded = jwt.verify(req.headers['vc-client-token'], process.env.YOUR_SECRET_KEY);
    const userEmail = User.findIndex(user => {
      return user.email === decoded.email;
    });

    if (userEmail === -1) {
      throw new Error();
    }
    next();
  } catch (err) {
    res.status(401).send({ error: 'unauthorized' });
  }
}

exports.verifyToken = verifyToken;
