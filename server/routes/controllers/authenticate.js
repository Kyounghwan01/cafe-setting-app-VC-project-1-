const passport = require('passport');

exports.loginGithub = passport.authenticate('github');

exports.githubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  sucessRedirect: '/'
});

exports.logout = (req, res) => {
  req.logOut();
  res.status(302).redirect('/login');
};
