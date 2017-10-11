const express = require('express');
const router = express.Router();
var multer = require('multer');
const Product = require('../models/product');


router.get('/', (req, res, next) => { //pasport atsimena nustatyta tokena ir islieka aktyvus profilis
  res.json({product: "veikia"});
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
    console.log(req.file.filename)
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
  console.log('call from front')
  let newProduct = new Product({
    title: req.body.title,
    type: req.body.type,
    picUrl: req.body.picUrl,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description
  });
  console.log(newProduct)
  Product.addProduct(newProduct, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'Product added'});
    }
  });
});


module.exports = router;
