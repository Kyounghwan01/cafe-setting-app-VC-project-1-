var express = require('express');
var router = express.Router();
const {
  login,
  signup,
  checkAdmin
} = require('../routes/controllers/authenticate');
const {
  changeSeats,
  sendCafeData,
  sendCafeDataToAll,
  choiceSeat,
  extendTime
} = require('./controllers/seat.controllers');
const { verifyToken } = require('./middleware/auth');
const Cafes = require('../models/Cafes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var moment = require('moment');

router.get('/view', sendCafeDataToAll);

router.get('/:id', checkAdmin);

router.get('/view/:id', verifyToken, sendCafeData);

router.post('/signup', signup);

router.post('/login', login);

router.post('/cafes/seats/:id', verifyToken, changeSeats);

router.post('/seats/:id', verifyToken, choiceSeat);

router.post('/extend/:id', verifyToken, extendTime);

// router.get()

module.exports = router;
