const mongoose = require('mongoose')


const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  }
})

const Order = module.exports = mongoose.model('Order', OrderSchema)



module.exports.addOrder = function(newOrder, callback){
      newOrder.save(callback)
}
