var express = require('express');
var router = express.Router();
const User = require('../models/User');
const {
  signup,
  loginGithub,
  githubCallback
} = require('./controllers/authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/:id', function(req, res, next) {
  const email = jwt.verify(req.params.id, process.env.YOUR_SECRET_KEY);
  res.json({ email: email });
});

router.post('/signup', async (req, res, next) => {
  try {
    const checkDupName = await User.find({ email: req.body.email });
    console.log(checkDupName);
    if (checkDupName.length) {
      return res.redirect('/signup?dupId');
    }
    if (req.body.password !== req.body.password2) {
      return res.redirect('/signup?wrongpassword');
    }
    const hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
    await User.create({
      email: req.body.email,
      password: hash
    });
    return res.redirect('/login');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const checkEmail = await User.find({ email: req.body.email });
    if (!checkEmail.length) {
      return res.redirect('/login?nonemail');
    }
    const result = await bcrypt.compare(
      req.body.password,
      checkEmail[0].password
    );
    if (!result) {
      return res.redirect('/login?wrongpassword');
    } else {
      const tocken = jwt.sign(checkEmail[0].email, process.env.YOUR_SECRET_KEY);
      console.log(tocken);
      return res.redirect(`/?${tocken}`);
    }
  } catch (error) {
    return next(error);
  }
});

// router.get('/signup', signup);

// app.get('/api/getUsername', function(req,res){
//   console.log("getyser");
//   res.send({username:"노경환"});
// })

router.get('/login/github', loginGithub);
router.get('/login/github/callback', githubCallback, (req, res) => {
  console.log('로그인됨');
  res.redirect('/');
});

module.exports = router;
