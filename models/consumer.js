const mongoose = require('mongoose')
const Schema = mongoose.Schema

const consumerSchema = new Schema({
  id: {
    type: Number,
    index: true,
  },
  name: String,
  score: Number,
}, {
  _id: false,
})

module.exports = consumerSchema
