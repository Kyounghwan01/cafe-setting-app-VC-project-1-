var express = require('express');
var router = express.Router();
const {login, signup, sendCafeData, checkAdmin} = require('../routes/controllers/authenticate');
const {verifyToken} = require('./middleware/auth');

router.get('/:id', checkAdmin);

router.get('/view/:id', verifyToken, sendCafeData)

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;
