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
  sendCafeDataToAll
} = require('./controllers/seat.controllers');
const { verifyToken } = require('./middleware/auth');
const Cafes = require('../models/Cafes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/view', sendCafeDataToAll);

router.get('/:id', checkAdmin);

router.get('/view/:id', verifyToken, sendCafeData);

router.post('/signup', signup);

router.post('/login', login);

router.post('/cafes/seats/:id', verifyToken, changeSeats);

router.post('/seats/:id', verifyToken, async (req, res, next) => {
  try {
    const cafes = await Cafes.findOne({});
    cafes.arrangemenet = req.body.cafeArrange;
    await cafes.save();
    res.status(200).send({status : 'success'});
  } catch (e) {
    res.status(500).send({ status: 'remote db server error' });
  }
});

module.exports = router;
