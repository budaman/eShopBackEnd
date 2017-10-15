const express = require('express');
const router = express.Router();
const Order = require('../models/order')
const Product = require('../models/product')
const User = require('../models/user')


router.post('/createOrder', (req, res, next) => {
  let quantity = req.body.product.quantity - req.body.quantity
  let money = req.body.user.money - (req.body.product.price * req.body.quantity)

  if(quantity < 0) {
    res.json({quantityProblem: true})
  } else if (money < 0) {
    res.json({moneyProblem: true})
  } else {
    var gmtRe = /GMT([\-\+]?\d{4})/; // Look for GMT, + or - (optionally), and 4 characters of digits (\d)
var d = new Date().toString();
var tz = gmtRe.exec(d)[1];
    let newOrder = new Order({
      user: req.body.user._id,
      product: req.body.product._id,
      quantity: req.body.quantity,
      createdOn: Date.now()
    });
    Order.addOrder(newOrder, (err, order) => {
      if(err){
        res.json({success: false, msg:'Failed to create order', err});
      } else {
        res.json(order);
      }
    });
    updProduct = req.body.product
    updProduct.quantity = quantity
    updUser = req.body.user
    updUser.money = money
    Product.findByIdAndUpdate(req.body.product._id, updProduct, function (err, post) {
      if (err) return next(err);
    });
    User.findByIdAndUpdate(req.body.user._id, updUser, function (err, post) {
      if (err) return next(err);
    });
  }
});

//just example how referience is working not sure if I will be using in this project
router.post('/postTest', (req, res, next) => {
Order.findOne({_id: req.body._id})
.populate('user')
.exec(function(err, post) {
  res.json({success: true, msg:'Product added'});
    console.log(post)
});
});

router.get('/getOrders', (req, res) => {
    var database = []
    Order.find({}, function (err, foundData) {
      if(err) {
        console.log(err)
        res.status(500).send()
      } else {
        var responseObject = foundData
        res.send(responseObject)
      }
    })
});

module.exports = router;
