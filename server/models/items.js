const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  stock: {
    type: Number
  },
  tags: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model('Item', itemSchema)