const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  picUrl: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Product = module.exports = mongoose.model('Product', UserSchema)

module.exports.addProduct = function(newProduct, callback){
      newProduct.save(callback)
}
