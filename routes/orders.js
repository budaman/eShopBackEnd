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
    let newOrder = new Order({
      user: req.body.user._id,
      product: req.body.product._id,
      quantity: req.body.quantity,
      createdOn: req.body.createdOn
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



module.exports = router;
