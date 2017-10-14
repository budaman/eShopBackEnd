const express = require('express');
const router = express.Router();
const Order = require('../models/order')


router.post('/createOrder', (req, res, next) => {

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
});


//just example how referience is working
router.post('/postTest', (req, res, next) => {
Order.findOne({_id: req.body._id})
.populate('user')
.exec(function(err, post) {
  res.json({success: true, msg:'Product added'});
    console.log(post)
});
});



module.exports = router;
