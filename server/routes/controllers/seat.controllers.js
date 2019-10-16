const User = require('../../models/User');
const Cafes = require('../../models/Cafes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var moment = require('moment');

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
  const cafeData = await Cafes.findOne({});
  return res.json({ value: req.params.id, cafeData: cafeData , userData : userData});
};

exports.sendCafeDataToAll = async (req, res, next) => {
  const cafeData = await Cafes.findOne({});
  console.log(cafeData);

  for(let i = 0; i < cafeData.arrangemenet.length; i++){
    if(cafeData.arrangemenet[i] && cafeData.arrangemenet[i].sittingTime){
      if(moment().format('YYYY-MM-DDTHH:mm') > cafeData.arrangemenet[i].sittingTime){
        cafeData.arrangemenet[i] = {
          img:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAA1BMVEXi4uIvUCsuAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABODcYhAAEl463hAAAAAElFTkSuQmCC',
          order: 1,
          board: 'table',
          type: 'table',
          sittingTime: Date,
          userId: null
        }
      }
    }
  }

  await Cafes.findByIdAndUpdate({_id : '5da6d24f032c4d034d1cd6ce'},
    {$set:{arrangemenet : cafeData.arrangemenet}});

  const cafeData1 = await Cafes.findOne({});
  console.log(cafeData1)
  res.status(200).send({cafeData: cafeData});
}

exports.choiceSeat = async (req, res, next) => {
  try {
    const cafes = await Cafes.findOne({});
    cafes.arrangemenet = req.body.cafeArrange;
    await cafes.save();
    res.status(200).send({status : 'success'});
  } catch (e) {
    res.status(500).send({ status: 'remote db server error' });
  }
}