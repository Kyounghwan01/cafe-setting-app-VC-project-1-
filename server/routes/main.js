var express = require('express');
var router = express.Router();
const {login, signup, sendCafeData, checkAdmin, sendSeats} = require('../routes/controllers/authenticate');
const {verifyToken} = require('./middleware/auth');
const Cafes = require('../models/Cafes');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/:id', checkAdmin);

router.get('/view/:id', verifyToken, sendCafeData)

router.get('/views', async (req, res, next) => {
  console.log("qwe");
  // const cafeData = await Cafes.find({});
  // console.log(cafeData);
  // return res.json({ cafeData: cafeData });
});

router.post('/signup', signup);

router.post('/login', login);

router.post('/cafes/seats/:id',verifyToken, async (req, res, next) => {
  const decoded = await jwt.verify(req.params.id, process.env.YOUR_SECRET_KEY);
  const objectId = await User.find({email:decoded});
  try{
    const cafes = await Cafes.findOne({owner:objectId[0]._id});
    cafes.arrangemenet = req.body.cafeArrange;
    await cafes.save();
    res.status(200).send({status : 'success'});
  } catch (e) {
    res.status(500).send({status:'remote db server error'})
  }
})


module.exports = router;
