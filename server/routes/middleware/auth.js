const jwt = require('jsonwebtoken');
const User = require('../../models/User');

async function verifyToken(req, res, next) {
  try {
    const decoded = await jwt.verify(req.params.id, process.env.YOUR_SECRET_KEY);
    const findUser = await User.find({email:decoded});
    console.log("user!",findUser);
    if (!findUser.length) {
      console.log("에러")
      res.redirect('/')
    }
    next();
  } catch (err) {
    res.json({ error: 'unauthorized' });
  }
}

exports.verifyToken = verifyToken;
