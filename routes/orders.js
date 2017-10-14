const express = require('express');
const router = express.Router();
const Order = require('../models/order')


router.post('/createOrder', (req, res, next) => {

  let newOrder = new Order({
    user: req.body.userId,
    product: req.body.productId,
    quantity: req.body.quantity,
    createdOn: req.body.createdOn
  });

  Order.addOrder(newOrder, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to create order', err});
    } else {
      res.json({success: true, msg:'Product added'});
    }
  });
});

router.post('/postTest', (req, res, next) => {
Order.findOne({_id: req.body._id})
.populate('user')
.exec(function(err, post) {
  res.json({success: true, msg:'Product added'});
    console.log(post)
});
});



module.exports = router;
