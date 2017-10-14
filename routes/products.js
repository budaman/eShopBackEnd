const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product');


router.get('/show', (req, res) => {
    var database = []
    Product.find({}, function (err, foundData) {
      if(err) {
        console.log(err)
        res.status(500).send()
      } else {
        var responseObject = foundData
        res.send(responseObject)
      }
    })
});



router.delete('/delete:id', (req, res)=>{
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

router.put('/update:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/getproduct', (req, res) => {
console.log(req.body._id)
Product.findById(req.body._id, (err, product) => {
  if(err){
    res.json({success: false, msg:'Failed to register user'});
  } else {
    res.json(product);
  }
});
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
var upload = multer({ storage: storage }).single('photo');



router.post('/upload', function(req, res, next){
  var path = ''
  var fileName = ''
  upload(req, res, function(err){
    if(err) {
      console.log(err)
      return res.status(422).send('an Error occured')
    }
    path = req.file.path
    fileName = req.file.filename
    return res.send(fileName)
  })
})

router.post('/add', (req, res, next) => {

  let newProduct = new Product({
    title: req.body.title,
    type: req.body.type,
    picUrl: req.body.picUrl,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description
  });

  Product.addProduct(newProduct, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'Product added'});
    }
  });
});


module.exports = router;
