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

router.post('/cafes/menu/:id', verifyToken, async (req, res, next) => {
  const changeData = await Cafes.findOne({});
  changeData.menu.map(el => {
    if (el.id === req.body.id) {
      el.name = req.body.name;
      el.price = req.body.price;
    }
  });
  await changeData.save();
  res.send({ value: 'awdawd' });
});

router.post('/cafes/menu/new/:id', verifyToken, async(req, res, next)=>{
  console.log(req.body);
  res.redirect(`/${req.params.id}`);

})

module.exports = router;
