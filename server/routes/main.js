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
const Category = require('../models/Category');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var moment = require('moment');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

router.get('/view', sendCafeDataToAll);

router.get('/:id', checkAdmin);

router.get('/view/:id', verifyToken, sendCafeData);

router.post('/signup', signup);

router.post('/login', login);

router.post('/cafes/seats/:id', verifyToken, changeSeats);

router.post('/seats/:id', verifyToken, choiceSeat);

router.post('/extend/:id', verifyToken, extendTime);

router.post('/cafes/menu/:id', verifyToken, async (req, res, next) => {
  let price = Math.floor(req.body.price / 100) * 100;

  const changeData = await Cafes.findOne({});
  changeData.menu.map(el => {
    if (el.id === req.body.id) {
      el.name = req.body.name;
      el.price = price;
      el.desc = req.body.desc
    }
  });
  await changeData.save();
  res.send({ value: 'awdawd' });
});

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEYID,
  region: 'ap-northeast-2'
});

router.post('/cafes/menu/new/:id',async (req, res, next) => {
  const cafes = await Cafes.findOne({});
  const category = await Category.find({});
  let price = Math.floor(req.body.price / 100) * 100;

  let answer = -1;
  for (let i = 0; i < category.length; i++) {
    if (category[i].name.indexOf(req.body.category) !== -1) {
      answer = i;
    }
  }
  if (answer !== -1) {
    cafes.menu.push({
      name: req.body.name,
      price: price,
      category: category[answer]._id,
      desc : req.body.desc
    });
    await cafes.save();
  } else {
    const newCategory = new Category({
      name: req.body.category
    });
    await newCategory.save();

    cafes.menu.push({
      name: req.body.name,
      price: price,
      category: newCategory._id,
      desc : req.body.desc
    });
    await cafes.save();
  }
  res.redirect(`/change/menu?${req.params.id}`);
});

router.delete('/cafes/menu/:id', async (req, res, next) => {
  try {
    const changeData = await Cafes.findOne({});

    let result = false;
    for (let i = 0; i < changeData.menu.length; i++) {
      if (String(changeData.menu[i]._id) === req.params.id) {
        result = changeData.menu[i].category;
        changeData.menu.splice(i, 1);
      }
    }
    if (!result) {
      return res
        .status(500)
        .send({ status: '잘못된 메뉴 id입니다 관리자에게 문의하세요' });
    } else {
      for (let i = 0; i < changeData.menu.length; i++) {
        if (String(changeData.menu[i].category) === String(result)) {
          result = false;
        }
      }
    }
    if (result) {
      await Category.findByIdAndRemove({ _id: result });
    }
    await changeData.save();
    return res.status(200).send({ status: 'success' });
  } catch (e) {
    res.status(500).send({ status: 'remote db server error' });
  }
});

module.exports = router;
