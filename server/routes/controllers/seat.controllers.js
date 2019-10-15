const User = require('../../models/User');
const Cafes = require('../../models/Cafes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.changeSeats = async (req, res, next) => {
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
}

exports.sendCafeData = async (req, res, next) => {
  const email = jwt.verify(req.params.id, process.env.YOUR_SECRET_KEY);
  const userData = await User.find({ email: email });
  const cafeData = await Cafes.find({});
  return res.json({ value: req.params.id, cafeData: cafeData , userData : userData});
};

exports.sendCafeDataToAll = async (req, res, next) => {
  const cafeData = await Cafes.find({});
  return res.send({cafeData: cafeData});
}